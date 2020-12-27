const db = require('./index');
const firebase = require('firebase');

// update database using transaction for atomicity, reads first then writes as specified by firebase
function addMovieTransaction(parsedMovie, movie, user, note) {
    return db.runTransaction((transaction) => {
        return new Promise((resolve, reject) => {
            var movieRef = db.collection("movies").doc(parsedMovie);
            var idxRef = db.collection("stats").doc("stats");
            var userRef = db.collection("users").doc(user);
            var newUserTotalMovies = -1;
            var newUserUnwatchedMovies = -1;
            var totalMovies = -1;

            // duplicate check
            transaction.get(movieRef).then((doc) => {
                if (doc.exists) {
                    if (doc.data().watched) {
                        throw new Error("Movie has already been watched. Consult with the others if they'd like to rewatch it.")
                    } else {
                        throw new Error("Movie has been added by someone else, but has not been watched yet.");
                    }
                }
            }).then(() => {     // doing reads first
                // read user data
                return transaction.get(userRef).then((doc) => {
                    // error if user doesn't exist
                    if (!doc.exists) {
                        throw new Error("User does not exist.");
                    }

                    newUserTotalMovies = doc.data().total_movies + 1;
                    newUserUnwatchedMovies = doc.data().unwatched_movies + 1;
                })
            }).then(() => {
                // now read total movie count and get new movie idx
                return transaction.get(idxRef).then((result) => {
                    totalMovies = result.data().totalMovies;
                })
            }).then(() => { // doing writes now
                // update the user's total movie count and unwatched movie count
                transaction.update(userRef, {total_movies: newUserTotalMovies, unwatched_movies: newUserUnwatchedMovies});

                // update overall total movie count 
                transaction.update(idxRef, {totalMovies: totalMovies + 1});

                // add to movies collection
                transaction.set(movieRef, {
                    movie: movie,
                    addedBy: user,
                    note: note, 
                    watched: false,
                    date: getDate(),
                    movieIdx: totalMovies 
                });

                // success
                resolve();
            }).catch((error) => {
                reject (error)});
        }); 
    });
}

function suggestMovie(movie, user, note) {
    return new Promise((resolve, reject) => {
        const parsedMovie = parseString(movie);

        // add movie and update user info
        addMovieTransaction(parsedMovie, movie, user, note).then(() => {
            // successfully added movie
            resolve();
        }).catch((error) => {reject(error); }) 
    });
}

function chooseMovieTransaction(user) {
    return db.runTransaction((transaction) => {
        return new Promise((resolve, reject) => {
            var movieRef = db.collection("movies");
            var userRef = db.collection("users").doc(user);
            var allUsersRef = db.collection("users");
            var motwIdx = db.collection("stats").doc("stats");
            var chosenMovie = null;
            var user_unwatchedCount = -1;

            // select the unwatched movie suggested by the user that's been in the db for the longest time
            // doing reads first
            movieRef.where("addedBy", "==", user).where("watched", "==", false).get(movieRef).then((movies) => {
                var movieIdx = Number.MAX_SAFE_INTEGER;
                movies.forEach((movie) => {
                    let currIdx = movie.data().movieIdx;
                    if (currIdx < movieIdx) {
                        movieIdx = currIdx;
                        chosenMovie = movie.data();
                    }
                });

                // error if no movie was selected
                if (chosenMovie == null) 
                    throw new Error("User does not have any unwatched movies.");

            }).then(() => {
                // increment unselected count for each user
                return allUsersRef.get().then((results) => {
                    results.forEach((u) => {
                        // get value of unwatched count so it can be decremented later if user
                        if (user === u.data().name) {
                            user_unwatchedCount = u.data().unwatched_movies;
                        } else {
                            // increment unselected counter for the users that weren't selected
                            transaction.update(db.collection("users").doc(u.data().name), {unselected_counter: u.data().unselected_counter + 1});
                        }
                    })
                });
            }).then(() => {
                // decrement user's unwatched movies amount by 1 and reset counter
                transaction.update(userRef, {unwatched_movies: user_unwatchedCount - 1, unselected_counter: 0});
                
                // update movie of the week and user
                transaction.update(motwIdx, {movieOTW: chosenMovie.movie, note: chosenMovie.note, addedBy: user});

                // success
                resolve(chosenMovie.movie);
            }).catch((error) => {
                reject(error);
            })
        });
    });
}

function chooseMovie() {
    return new Promise((resolve, reject) => {
        // fetch users
        var userRef = db.collection("users");

        // find user that has been chosen the least recently
        var max = 0;
        var leastUser = null;
        userRef.get().then((queryResults) => {
            queryResults.forEach((doc) => {
                const unselected_counter = doc.data().unselected_counter;
                const unwatched_movies = doc.data().unwatched_movies;
                if ((unselected_counter > max || leastUser == null) && unwatched_movies > 0) {
                    max = unselected_counter;
                    leastUser = doc.data();
                }
            });

            // throw error if nobody has unwatched movies
            if (leastUser == null) {
                throw new Error("Every movie added has been watched.");
            }
        })
        .then(() => {
            return chooseMovieTransaction(leastUser.name);
        })
        .then((movie) => {
            resolve(movie);
        })
        .catch((error) => {
            reject(error);
        });
    });
}

function getHomeData() {
    return new Promise((resolve, reject) => {
        var movies = []
        var movieOTW = null;
        db.collection("stats").doc("stats").get().then((result) => {
            movieOTW = result.data();
        }).then(() => {
            return db.collection("movies").where("watched", "==", true).get().then((queryResults) => {
                queryResults.forEach((doc) => {
                    movies.push({name: doc.data().movie, teaser: doc.data().note, addedBy: doc.data().addedBy, dateWatched: doc.data().date});
                });
            })
        }).then(() => {
            if (movieOTW == null) 
                throw new Error("Unable to retrieve movie of the week.");

            if (movies.length == null) 
                throw new Error("Unable to retrieve previously watched movies.");
            resolve({movieOTW, movies});
        }).catch((error) => reject(error));
    });
}

function getMovieOTW() {
    return new Promise((resolve, reject) => {
        db.collection("stats").doc("stats").get().then((result) => {
            if (!result.exists)
                throw new Error("Stats don't exist.");
            
            // success
            resolve(doc.data().movieOTW);
        })
        .catch((error) => {reject(error);});
    });
}

function watchedMovie() {
    return new Promise((resolve, reject) => {
        // getting value of movie of the week
        var previousMotw = '';
        const statsRef = db.collection("stats").doc("stats");
        statsRef.get().then((result) => {
            if (result.data().movieOTW === '') 
                throw new Error("Movie of the Week was empty.");

            previousMotw = result.data().movieOTW;
        }).then(() => {
            // clearing movie of the week
            return statsRef.update({movieOTW: ''});
        }).then(() => {
            // updating movie of the week as watched
            const parsedMovie = parseString(previousMotw);
            const movieRef = db.collection("movies").doc(parsedMovie);
            return movieRef.update({watched: true, date: getDate()});
        }).then(() => { 
            resolve();
        }).catch((error) => { reject(error) });
    });
}

function parseString(movie) {
    // cleaning string for duplicate check
    var punctuation = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~ ';
    const letters = movie.toLowerCase().split('');

    // removing punctuation and whitespace from movie name
    const parsedArray = letters.filter(function(letter) {
    return punctuation.indexOf(letter) == -1; 
    });
    
    // invalid length check
    if (parsedArray.length >= 40) {
        throw new Error("Movie length exceeded.");
    }

    // combining filtered movie array into string
    parsedMovie = "";
    for (i in parsedArray) {
        parsedMovie += parsedArray[i];
    }   

    return parsedMovie;
}

function getDate() {
    // create date instance
    var date = new Date().toString();
    var split_date = date.split(" ");
    date = "";
    for (i in split_date) {
        if (i >= 1 && i <= 3) {
            date += (i == 3) ? split_date[i] : split_date[i] + " ";
        }
    }

    return date;
}

module.exports = {suggestMovie, chooseMovie, getHomeData, watchedMovie, getMovieOTW};