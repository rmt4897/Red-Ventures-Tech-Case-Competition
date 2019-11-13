// requests for getting data from API to create checkboxes
var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var requestFillerMovies = new XMLHttpRequest();

// holds the Production Companies
var allMovieProductions = [];
// holds the Streaming Platfomrs
var allMoviePlatforms = [];

// temporarily holds all the filter values of movie production company or platform, changes time new checks are set
var tempProductionMovie = []
var tempPlatformMovie = [];
// final array that holds values that are in both filters
var finalMovieArray = [];
// filler (at start) array
var fillerMovieArray = [];

//This variables changes when the movies or shows tab is clicked - it will load different things depending on what tab is clicked
var dataToFetch = "movie";



// uses API to create checkboxesf production companies
function productionMovieCheckboxes() {
  for (let i = 0; i < allMovieProductions.length; i++) {
    var name = allMovieProductions[i];
    $(".production-companies").append("<div class='pretty p-default p-curve p-smooth'><input value='" + name + "' type='checkbox' onmouseclick='updateMovieProductionFilters()'class='production-checkboxes' />" +
      "<div class='state p-warning-o'><label>" + name + "</label></div></div><br><br>");
  }

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

  });
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

  // this will update the movies filter by PLATFORM array and print it via user click
  $(".platform-checkboxes").click(function () {
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

  });
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
  $(".display-container").empty()
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
      alert("This filter does not include any movies")
    } else {
      finalMovieArray = tempProductionMovie;
    }
  }

  for (let i = 0; i < finalMovieArray.length; i++) {
    $(".display-container").append("<div class='biggest-div'> <div class='2nd-div'> <div class='3rd1-div'> <div class='movie-title-display'>" + finalMovieArray[i].title + "</div> </div> <div class='3rd2-div'> <div class='movie-overview-display'>" + finalMovieArray[i].overview + " </div> </div> </div></div><br><br>");
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


// toggles between shows and movies

$(".collection-filter-type").click(function () {
  $(".production-companies").empty();
  $(".streaming-platform").empty();

  var ifMovieActive = document.getElementsByClassName('collection-filter')[0].getAttribute('class')
  var ifShowActive = document.getElementsByClassName('collection-filter')[1].getAttribute('class')

  if (ifMovieActive === "collection-filter active") {
    dataToFetch = "movie"
    console.log(dataToFetch)
  } else if (ifShowActive === "collection-filter active") {
    dataToFetch = "show"
    console.log(dataToFetch)
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

})


