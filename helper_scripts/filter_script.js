var request = new XMLHttpRequest();
var request2 = new XMLHttpRequest();

// holds the Production Companies
var allMovieProductions = [];
// holds the Streaming Platfomrs
var allMoviePlatforms = [];

// temporarily holds all the filter values of movie production company, changes time new checks are set
var tempProductionMovie = []
// holds values of tempProductionMovie unduplicated
var uniqueProductionMovieArray = [];

// this array holds the imbd ID's of the filtered ID's
var uniqueProduction = [];

// gets the data to dynamically create production company checkboxes
request.open('GET', 'https://casecomp.konnectrv.io/production/movie', true)
request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      allMovieProductions = data;
    })
    console.log(allMovieProductions)
    productionMovieCheckboxes();
  } else {
    console.log('error')
  }
}
request.send();

// creates checkboxes and labels of production companies
function productionMovieCheckboxes() {
  for (let i = 0; i < allMovieProductions.length; i++) {
    {
      // this is the checkbox
      /*var checkbox = document.createElement("input");
      checkbox.setAttribute("name", "production-checkbox-name")
      checkbox.setAttribute("value", allMovieProductions[i])
      checkbox.setAttribute("type", "checkbox")
  
  
      // this will have the production company name
      var label = document.getElementById("");
      label.innerHTML = allMovieProductions[i];
  
      // this is the checkbox pretty divider
      var prettyDiv = document.createElement("div");
      prettyDiv.setAttribute("class", "pretty p-default p-curve p-smooth")
      prettyDiv.appendChild(checkbox);
      prettyDiv.appendChild(label);
  */
    }
    var name = allMovieProductions[i];
    $(".production-companies").append("<div class='pretty p-default p-curve p-smooth'><input value=" + name + " type='checkbox' />" +
      "<div class='state p-warning-o'><label>" + name + "</label></div></div><br><br>");
  }

  // this will update the movies filter by production companies array and print it via user click
  $(".production-checkboxes").click(function () {
    console.log("hi")
    updateMovieProductionFilters();
    productionMovieDisplay();

  });
}

// display movies of checked companies
function productionMovieDisplay() {
  $("#production-filter-movies").empty()

  for (let i = 0; i < tempProductionMovie.length; i++) {

    var display = document.getElementById('production-filter-movies')
    var li = document.createElement("li");
    li.setAttribute("type", "movie-production" + i)
    li.setAttribute("class", "movie-production-list")
    li.innerHTML = tempProductionMovie[i].title + " -- description: " + tempProductionMovie[i].overview;
    display.appendChild(li);
  }

}

// updates the movie filters when checkbox is clicked
function updateMovieProductionFilters() {
  tempProductionMovie = [];
  uniqueProductionMovieArray = [];

  var inputs = document.querySelectorAll("input.production-checkboxes");


  // this puts all the selcted movie data avlues in an array
  for (let i = 0; i < inputs.length; i++) {

    if (inputs[i].checked === true) {

      var request = new XMLHttpRequest()

      request.open('GET', 'https://casecomp.konnectrv.io/movie?production=' + inputs[i].value, true);


      request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        tempProductionMovie = tempProductionMovie.concat(data)


      }
      request.send();


    }
  }
}

request2.open('GET', 'https://casecomp.konnectrv.io/platform/movie', true)
request2.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)
  console.log("hi")
  if (request2.status >= 200 && request2.status < 400) {
    data.forEach(movie => {
      allMoviePlatforms = data;
    })
    console.log(allMoviePlatforms)
    platformMovieCheckboxes();
  } else {
    console.log('error')
  }
}
request2.send();


function platformMovieCheckboxes() {
  for (let i = 0; i < allMoviePlatforms.length; i++) {
    var name = allMoviePlatforms[i];
    name = name.replace("_", " ")
    name = titleCase(name)

    
    console.log(name)
    $(".streaming-platform").append("<div class='pretty p-default p-curve p-smooth'><input value=" + name + " type='checkbox' />" +
      "<div class='state p-warning-o'><label>" + name + "</label></div></div><br><br>");
  }
}

function titleCase(string) {
  var sentence = string.toLowerCase().split(" ");
  for (var i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  sentence = sentence.join(" ");
  return sentence;
}




