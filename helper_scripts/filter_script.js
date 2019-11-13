var request = new XMLHttpRequest()

// holds the Production Companies
var allMovieProductions = [];

// temporarily holds all the filter values of movie production company, changes time new checks are set
var tempProductionMovie = []
// holds values of tempProductionMovie unduplicated
var uniqueProductionMovieArray = [];

// gets the data to dynamically create checkboxes
request.open('GET', 'https://casecomp.konnectrv.io/production/movie', true)
  request.onload = function () {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    if (request.status >= 200 && request.status < 400) {
      data.forEach(movie => {
        allMovieProductions = data;
      })
      console.log(allMovieProductions)
      productionCompanySearch();
    } else {
      console.log('error')
    }
  }
request.send();

// creates checkboxes and labels of production companies
function productionCompanySearch() {
  for (let i = 0; i < allMovieProductions.length; i++) {
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
    var name = allMovieProductions[i];
    console.log(allMovieProductions[i]);
    $(".production-companies").append("<div class='pretty p-default p-curve p-smooth'><input value=" + name + " type='checkbox' />" +
    "<div class='state p-warning-o'><label>" + name + "</label></div></div><br><br>");
      
  }
  $(".production-companies").click(function () {
    console.log("hi");
  })

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


  // this puts all the selcted values in an array

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


