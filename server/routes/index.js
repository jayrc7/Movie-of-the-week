var express = require('express');
var router = express.Router();
var dbIndex = require('../db/functions');
var db = require('../db/index');

router.post('/SuggestMovie', async function (req, res) {
    var result = db.suggestMovie(req.body.movie, req.body.name, req.body.movieNote);
    result.then((val) => {
        res.jsonp({success: true, val: val.movie, movieIdx: val.movieIdx});
    }).catch((err) => {
        res.jsonp({success: false, val: err.toString()});
    });
});

router.get('/WatchedMovie', function (req, res) {
    dbIndex.watchedMovie()
        .then(() => {
            res.jsonp({success: true, val: "Movie of the Week has been cleared."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success: false, val: error.toString()});
        })
});

router.get('/ChooseMovie', function (req, res) {
    dbIndex.chooseMovie()
        .then((movie) => {
            res.jsonp({success: true, val: movie + " has been chosen."});
        })
        .catch((error) => {
            console.log(error);
            res.jsonp({success:false, val: error.toString()});
        });
});

router.get('/HomeData', function (req, res) {
    db.getHomeData()
        .then((data) => {
            res.jsonp({success: true, movieOTW: data.movieOTW, watchedMovies: data.watchedMovies, upcomingMovies: data.upcomingMovies, currentPool: data.currentPool});
        })
        .catch((error) => {
            res.jsonp({success: false, val: error.toString()});
        }); 
});

module.exports = router;