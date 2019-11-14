// requests for getting data from API to create checkboxes
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var requestFillerMovies = new XMLHttpRequest();

// holds the Production Companies
var allMovieProductions = [];
// holds the Streaming Platfomrs
var allMoviePlatforms = [];
// this array will hold default values
var defaultFilms = [];

// temporarily holds all the filter values of movie production company or platform, changes time new checks are set
var tempProductionMovie = []
var tempPlatformMovie = [];
// final array that holds values that are in both filters
var finalMovieArray = [];
// unique array - derived from final Movie Array to get rid of duplicate values
var uniqueArray = [];


//This variables changes when the movies or shows tab is clicked - it will load different things depending on what tab is clicked
var dataToFetch;

$(function() {
	dataToFetch = $("#initial-type").attr("data");

	// loads the checkboxes at the beginning
	request.open('GET', 'https://casecomp.konnectrv.io/production/' + dataToFetch, true)
	request.onload = function () {
	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response)

	  if (request.status >= 200 && request.status < 400) {
	    data.forEach(movie => {
	      allMovieProductions = data;
	    })
	    productionMovieCheckboxes();
	  } else {
	    console.log('error')
	  }
	}
	request.send();

	request2.open('GET', 'https://casecomp.konnectrv.io/platform/' + dataToFetch, true)
	request2.onload = function () {
	  // Begin accessing JSON data here
	  var data = JSON.parse(this.response)
	  if (request2.status >= 200 && request2.status < 400) {
	    data.forEach(movie => {
	      allMoviePlatforms = data;
	    })
	    platformMovieCheckboxes();
	  } else {
	    console.log('error')
	  }
	}
	request2.send();
});



// uses API to create checkboxesf production companies
function productionMovieCheckboxes() {
  for (let i = 0; i < allMovieProductions.length; i++) {
    var name = allMovieProductions[i];
    $(".production-companies").append("<div class='pretty p-default p-curve p-smooth'><input value='" + name + "' type='checkbox' onmouseclick='updateMovieProductionFilters()'class='production-checkboxes' />" +
      "<div class='state p-warning-o'><label>" + name + "</label></div></div><br><br>");
  }
}

// display the movie platform checkboxes
function platformMovieCheckboxes() {
  for (let i = 0; i < allMoviePlatforms.length; i++) {
    var name = allMoviePlatforms[i];
    var titleCaseName = name;
    titleCaseName = titleCaseName.replace("_", " ")
    titleCaseName = titleCase(titleCaseName)

    $(".streaming-platform").append("<div class='pretty p-default p-curve p-smooth'><input value='" + name + "' class='platform-checkboxes' type='checkbox' />" +
      "<div class='state p-warning-o'><label>" + titleCaseName + "</label></div></div><br><br>");
  }
}

// convert to titleCase
function titleCase(string) {
  var createUpperCase = string.toLowerCase().split(" ");
  for (var i = 0; i < createUpperCase.length; i++) {
    createUpperCase[i] = createUpperCase[i][0].toUpperCase() + createUpperCase[i].slice(1);
  }
  createUpperCase = createUpperCase.join(" ");
  return createUpperCase;
}

// display movies of checked companies
function movieDisplay() {
  finalMovieArray = [];
  uniqueArray = [];
  $(".display-container").empty()
  // This huge if else statement will check which checkboxes are checked to know what to display
  if (!($('.production-checkboxes').is(':checked')) && !($('.platform-checkboxes').is(':checked'))) {
    for (let i = 0; i < defaultFilms.length; i++) {
      finalMovieArray[finalMovieArray.length] = defaultFilms[i];
    }
  } else {
    if ($('.platform-checkboxes').is(':checked') && $('.production-checkboxes').is(':checked')) {
      for (let i = 0; i < tempProductionMovie.length; i++) {
        for (let j = 0; j < tempPlatformMovie.length; j++) {
          if (tempProductionMovie[i].title === tempPlatformMovie[j].title) {
            finalMovieArray[finalMovieArray.length] = tempProductionMovie[i];
          }
        }
      }
    } else if ($('.platform-checkboxes').is(':checked') && !($('.production-checkboxes').is(':checked'))) {
      finalMovieArray = tempPlatformMovie;
    } else if ($('.production-checkboxes').is(':checked') && !($('.platform-checkboxes').is(':checked'))) {
      if (tempProductionMovie.length === 0) {
      } else {
        finalMovieArray = tempProductionMovie;
      }
    }
  }
  // create a function that removes duplicates

  var list = [];

  for (var i = 0; i < finalMovieArray.length; i++) {
    var dup = false;
    for (var j = 0; j < finalMovieArray.length; j++) {
      if (finalMovieArray[i].title === finalMovieArray[j].title && i != j) {
        dup = true;
      }
    }

    if (!dup) {
      list.push(finalMovieArray[i]);
    }
  }

  // This will add the elements into the HTML
  for (let i = 0; i < list.length; i++) {
	$(".display-container").append("<a href='title/title.php?id=" + finalMovieArray[i].imdb + "&type=" + dataToFetch + "' class='item'> <div class='item-image-container'> <div class='item-image-container'> <div id=" + finalMovieArray[i].imdb + " class='item-image shine'></div> </div> <div class='item-title-container'> <div class='item-title'>" + finalMovieArray[i].title + " </div> </div> </div></a><br><br>");
	applyImdbThumbnail(document.getElementById(finalMovieArray[i].imdb), false, finalMovieArray[i].imdb);
  }


}

// updates, using API, the movie filters when checkbox is clicked
function updateMovieProductionFilters() {

  var inputs = document.querySelectorAll("input.production-checkboxes");


  // this puts all the selcted movie data values in an array
  for (let i = 0; i < inputs.length; i++) {

    if (inputs[i].checked === true) {

      var request = new XMLHttpRequest()

      request.open('GET', 'https://casecomp.konnectrv.io/' + dataToFetch + '?production=' + inputs[i].value, true);


      request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        tempProductionMovie = tempProductionMovie.concat(data)


        movieDisplay();

      }

      request.send();


    }
  }

}

// uses api to find all movies within a selected
function updateMoviePlatformFilters() {
  var inputs = document.querySelectorAll("input.platform-checkboxes");

  // this puts all the selcted movie data values in an array
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].checked === true) {
      var platformRequest = new XMLHttpRequest()

      platformRequest.open('GET', 'https://casecomp.konnectrv.io/' + dataToFetch + '?platform=' + inputs[i].value, true);


      platformRequest.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        tempPlatformMovie = tempPlatformMovie.concat(data)

        movieDisplay()


      }
      platformRequest.send();


    }
  }
}


// toggles between shows and movies and updates the checkboxes - updates if it is a movie or show in firebase
$(".collection-filter-type").click(function () {


  $(".production-companies").empty();
  $(".streaming-platform").empty();
  var ifMovieActive = document.getElementsByClassName('collection-filter')[0].getAttribute('class')
  var ifShowActive = document.getElementsByClassName('collection-filter')[1].getAttribute('class')

  if (ifMovieActive === "collection-filter active") {
    dataToFetch = "movie"
    $(".display-container").empty();
    db.collection("isThisMovieOrShow").doc("FilmType").update({
      Type: "movie"
    })

  } else if (ifShowActive === "collection-filter active") {
    dataToFetch = "show"
    $(".display-container").empty();

    db.collection("isThisMovieOrShow").doc("FilmType").update({
      Type: "show"
    })
  }

  // gets the data to dynamically create production company checkboxes
  request.open('GET', 'https://casecomp.konnectrv.io/production/' + dataToFetch, true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      data.forEach(movie => {
        allMovieProductions = data;
      })
      productionMovieCheckboxes();
    } else {
      console.log('error')
    }
  }
  request.send();


  // gets data using API for movie platform checkboxes
  request2.open('GET', 'https://casecomp.konnectrv.io/platform/' + dataToFetch, true)
  request2.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    if (request2.status >= 200 && request2.status < 400) {
      data.forEach(movie => {
        allMoviePlatforms = data;
      })
      platformMovieCheckboxes();
    } else {
      console.log('error')
    }
  }
  request2.send();

  fetchAll();
})


// this will update the movies filter by production companies array and print it via user click
$(".production-companies").click(function () {
  $(".display-container").empty()

  if ($('.platform-checkboxes').is(':checked')) {
    tempPlatformMovie = [];
    updateMoviePlatformFilters();
  }
  // checks if the others are checked
  if ($('.production-checkboxes').is(':checked')) {
    tempProductionMovie = []
    updateMovieProductionFilters();
  }

  if (!($('.production-checkboxes').is(':checked')) && !($('.platform-checkboxes').is(':checked'))) {
    tempPlatformMovie = [];
    fetchAll();
  }

});

// this will update the movies filter by PLATFORM array and print it via user click
$(".streaming-platform").click(function () {
  $(".display-container").empty()
  if ($('.platform-checkboxes').is(':checked')) {
    tempPlatformMovie = [];
    updateMoviePlatformFilters();
  }
  // checks if the others are checked
  if ($('.production-checkboxes').is(':checked')) {
    tempProductionMovie = []
    updateMovieProductionFilters();
  }

  if (!($('.production-checkboxes').is(':checked')) && !($('.platform-checkboxes').is(':checked'))) {
    defaultFilms = [];
    fetchAll();
  }

});

// this will display all of the movies at start, or if there are no filters selected
function fetchAll() {
  var fetchAll = new XMLHttpRequest()
  fetchAll.open('GET', 'https://casecomp.konnectrv.io/' + dataToFetch, true);
  fetchAll.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
    defaultFilms = defaultFilms.concat(data)
    movieDisplay()
  }
  fetchAll.send();
  defaultFilms = []
}

$(function () {
  fetchAll();
});

// firebase config
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
