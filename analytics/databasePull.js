
var firebaseConfig = {
    apiKey: "redventure-case-comp",
    authDomain: "redventure-case-comp.firebaseapp.com",
    databaseURL: "https://redventure-case-comp.firebaseio.com",
    projectId: "redventure-case-comp",
    storageBucket: "redventure-case-comp.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
};

var arrayofShowData = [];
var sortedShows = [];

var arrayofMovieData = [];
var sortedMovies = [];

var arrayofGeolocation = [];

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

$(document).ready(function() {
    db.collection("ShowDataCollection").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            arrayofShowData[arrayofShowData.length] = doc.data();
        });

        sortedShows= sort_by_click_count(arrayofShowData);
		loadShows(sortedShows);
    });

    db.collection("MovieDataCollection").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            arrayofMovieData[arrayofMovieData.length] = doc.data();
        });

        sortedMovies = sort_by_click_count(arrayofMovieData);
		loadMovies(sortedMovies);
    });

    db.collection("VisitorLocation").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            arrayofGeolocation[arrayofGeolocation.length] = doc.data();
        });

		loadData(arrayofGeolocation);
    });
});

function loadMovies(movies) {
	for (var i=0;i<movies.length;i++) {
		$("#movies").append("<a href='../title/title.php?id=" + movies[i].imdb + "&type=movie' class='item'> <div class='item-image-container'> <div class='item-image-container'> <div id=" + movies[i].imdb + " class='item-image shine'></div> </div> <div class='item-title-container'> <div class='item-title'>" + movies[i].title + " </div> </div> </div></a><br><br>");
	}
	applyImdbThumbnail(document.getElementById(movies[i].imdb), false, movies[i].imdb);
}

function loadShows(shows) {
	for (var i=0;i<shows.length;i++) {
		$("#shows").append("<a href='../title/title.php?id=" + shows[i].imdb + "&type=show' class='item'> <div class='item-image-container'> <div class='item-image-container'> <div id=" + shows[i].imdb + " class='item-image shine'></div> </div> <div class='item-title-container'> <div class='item-title'>" + shows[i].title + " </div> </div> </div></a><br><br>");
	}

	applyImdbThumbnail(document.getElementById(shows[i].imdb), false, shows[i].imdb);
}
