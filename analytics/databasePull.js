
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
        })


        sortedShows= sort_by_click_count(arrayofShowData);

    })

    db.collection("MovieDataCollection").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            arrayofMovieData[arrayofMovieData.length] = doc.data();
        })


        sortedMovies = sort_by_click_count(arrayofMovieData);

    })

    db.collection("VisitorLocation").get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            arrayofGeolocation[arrayofGeolocation.length] = doc.data();
        });
		loadData(arrayofGeolocation);
    });


});
