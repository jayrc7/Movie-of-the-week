(this.webpackJsonpmovie=this.webpackJsonpmovie||[]).push([[0],{34:function(e,t,n){},54:function(e,t,n){},72:function(e,t,n){},73:function(e,t,n){},84:function(e,t,n){"use strict";n.r(t);var i=n(1),o=n(0),a=n.n(o),s=n(20),r=n.n(s),c=(n(54),n(10)),l=n(11),d=n(13),u=n(12),j=(n(34),n(22)),h=n.n(j),b=(n(72),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={movieSuggestion:"",user:"",movieNote:""},e.submitSuggestion=function(){if(0!==e.state.movieSuggestion.length)if(0!==e.state.user.length){var t=e.state.movieSuggestion,n=e.state.user;h()({method:"post",url:"http://movieotw.herokuapp.com/SuggestMovie",data:{movie:t,name:n,movieNote:e.state.movieNote}}).then((function(t){t.data.success?(e.setState({movieSuggestion:"",movieNote:""}),window.alert("Successfully added "+t.data.val+".\nMovie ID: "+t.data.ticketNum)):window.alert(t.data.val)})).catch((function(e){console.log(e)}))}else window.alert("User not selected.");else window.alert("Movie name cannot be empty.")},e.updateMovie=function(t){e.setState({movieSuggestion:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.updateNote=function(t){e.setState({movieNote:t.target.value})},e.showReviewForm=function(){window.alert("clicked")},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:" Suggest a Movie "}),Object(i.jsx)("label",{children:" Title: "}),Object(i.jsx)("input",{value:this.state.movieSuggestion,onChange:this.updateMovie}),Object(i.jsx)("br",{}),Object(i.jsx)("label",{children:" Suggested By: "}),Object(i.jsxs)("select",{name:"Name",defaultValue:"Choose here",onChange:this.updateUser,children:[Object(i.jsx)("option",{value:"Choose here",disabled:!0,hidden:!0,children:"Choose here"}),Object(i.jsx)("option",{value:"Felix",children:"Felix"}),Object(i.jsx)("option",{value:"Hector",children:"Hector"}),Object(i.jsx)("option",{value:"Jason",children:"Jason"}),Object(i.jsx)("option",{value:"Jesse",children:"Jesse"}),Object(i.jsx)("option",{value:"Jorge",children:"Jorge"}),Object(i.jsx)("option",{value:"Juan",children:"Juan"}),Object(i.jsx)("option",{value:"Octavio",children:"Octavio"})]}),Object(i.jsx)("br",{}),Object(i.jsx)("label",{children:" Teaser Note (optional): "}),Object(i.jsx)("textarea",{value:this.state.movieNote,onChange:this.updateNote}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{onClick:this.submitSuggestion,children:" Suggest "})]})}}]),n}(a.a.Component)),v=(n(73),function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={displayReviewForm:!1,reviewSubmitted:!1,reviewScoreInput:-1,finalReviewScore:-1,user:""},e.displayReviewForm=function(){e.setState({displayReviewForm:!0})},e.cancelReview=function(){e.setState({displayReviewForm:!1})},e.updateReviewScore=function(t){e.setState({reviewScore:t.target.value})},e.updateUser=function(t){e.setState({user:t.target.value})},e.submitReview=function(){try{var t=parseFloat(e.state.reviewScore);window.alert(t)}catch(n){return void window.alert("Error")}e.setState({reviewSubmitted:!0})},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)("div",{className:"container",children:[Object(i.jsxs)("p",{children:[" Movie title: ",this.props.movieTitle," "]}),Object(i.jsxs)("p",{children:[" Suggested by: ",this.props.addedBy," "]}),Object(i.jsxs)("p",{children:[" Watched on: ",this.props.dateWatched," "]}),Object(i.jsxs)("p",{children:[" Teaser Note: ",this.props.teaser," "]})]})}}]),n}(a.a.Component)),O=n(88),p=n(90),m=n(89),g=n(87),x=n(45),f=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)(O.a,{bg:"light",expand:"lg",children:[Object(i.jsx)(O.a.Brand,{href:"#home",children:"Movie Of The Week"}),Object(i.jsx)(O.a.Toggle,{"aria-controls":"basic-navbar-nav"}),Object(i.jsxs)(O.a.Collapse,{id:"basic-navbar-nav",children:[Object(i.jsxs)(p.a,{className:"mr-auto",children:[Object(i.jsx)(p.a.Link,{href:"#home",children:"Leaderboard"}),Object(i.jsx)(p.a.Link,{href:"#home",children:"Suggestions"})]}),Object(i.jsx)(m.a,{inline:!0,children:Object(i.jsx)(x.LinkContainer,{to:"/login",children:Object(i.jsx)(g.a,{color:"blue",variant:"secondary",children:"Login"})})})]})]})}}]),n}(a.a.Component),w=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={isMovieSelected:!1,movieOTW:"",userOTW:"",noteOTW:"",previousMovies:[],currentPool:[],upcomingMovies:[],isLoading:!0},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){var e=this;h()({method:"get",url:"https://movieotw.herokuapp.com/HomeData"}).then((function(t){var n=t.data.movieOTW,i=n.movieOTW,o=n.addedBy,a=n.note,s=0!==n.movieOTW.length,r=t.data.movies;e.setState({previousMovies:r,isLoading:!1,isMovieSelected:s,movieOTW:i,userOTW:o,noteOTW:a,upcomingMovies:t.data.upcomingMovies,currentPool:t.data.currentPool})})).catch((function(e){window.alert("Unable to load previous movies: "+e)}))}},{key:"render",value:function(){return this.state.isLoading?Object(i.jsx)("h1",{style:{textAlign:"center"},children:" Loading... "}):Object(i.jsxs)("div",{className:"App",children:[Object(i.jsx)(f,{}),Object(i.jsx)("h1",{children:" Selected Movie "}),this.state.isMovieSelected?Object(i.jsxs)("div",{children:[Object(i.jsxs)("p",{children:[" Movie of the week is: ",this.state.movieOTW," "]}),Object(i.jsxs)("p",{children:[" Added by: ",this.state.userOTW," "]}),0===this.state.noteOTW.length?null:Object(i.jsxs)("p",{children:[" Teaser: ",this.state.noteOTW," "]}),Object(i.jsxs)("p",{children:[" Watch it ",Object(i.jsx)("a",{href:"#",children:"Here"})]})]}):Object(i.jsx)("p",{children:" No movie selected yet for this week."}),Object(i.jsx)("h1",{children:" Current Pool "}),this.state.currentPool.map((function(e,t){return Object(i.jsxs)("p",{children:[" ",e.suggestion," - ",e.name," "]},t)})),Object(i.jsx)(b,{}),Object(i.jsx)("br",{}),Object(i.jsx)("h1",{children:" Upcoming Movies "}),this.state.upcomingMovies.map((function(e,t){return Object(i.jsx)("div",{children:Object(i.jsxs)("p",{children:[" ",e.name," - ",e.user," "]},t)})})),Object(i.jsx)("h1",{children:" Movies Watched so Far "}),this.state.previousMovies.map((function(e,t){return Object(i.jsx)(v,{movieTitle:e.name,teaser:e.teaser,addedBy:e.addedBy,dateWatched:e.dateWatched},t)})),Object(i.jsx)("p",{children:" Features/Improvements to be added soon: "}),Object(i.jsxs)("ul",{children:[Object(i.jsx)("li",{children:" Change order of/delete your suggested movies "}),Object(i.jsx)("li",{children:" Review movies previously watched "}),Object(i.jsx)("li",{children:" Show a movie leaderboard filtered by highest score first "}),Object(i.jsx)("li",{children:" Redesign UI "}),Object(i.jsx)("li",{children:" Make UI friendly for all screen sizes "})]}),Object(i.jsx)("p",{children:" Let me know of features or improvements you'd like to be added"})]})}}]),n}(a.a.Component),y=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={},e}return Object(l.a)(n,[{key:"render",value:function(){return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h1",{children:" Login "}),Object(i.jsx)("label",{children:" email: "}),Object(i.jsx)("input",{onChange:this.updateMovie}),Object(i.jsx)("br",{}),Object(i.jsx)("label",{children:" password: "}),Object(i.jsx)("input",{onChange:this.updateMovie}),Object(i.jsx)("br",{}),Object(i.jsx)("button",{onClick:function(){window.alert("hi")},children:" Login "})]})}}]),n}(a.a.Component),S=n(19),M=n(6);n(81).config();var k=function(e){Object(d.a)(n,e);var t=Object(u.a)(n);function n(){var e;Object(c.a)(this,n);for(var i=arguments.length,o=new Array(i),a=0;a<i;a++)o[a]=arguments[a];return(e=t.call.apply(t,[this].concat(o))).state={},e}return Object(l.a)(n,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){return Object(i.jsxs)(S.BrowserRouter,{children:[Object(i.jsx)(M.d,{path:"/",exact:!0,render:function(e){return Object(i.jsx)(w,{})}}),Object(i.jsx)(M.d,{path:"/login",exact:!0,render:function(e){return Object(i.jsx)(y,{})}})]})}}]),n}(a.a.Component),C=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,91)).then((function(t){var n=t.getCLS,i=t.getFID,o=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),i(e),o(e),a(e),s(e)}))};r.a.render(Object(i.jsx)(S.BrowserRouter,{children:Object(i.jsx)(k,{})}),document.getElementById("root")),C()}},[[84,1,2]]]);
//# sourceMappingURL=main.c0c2cf1f.chunk.js.map