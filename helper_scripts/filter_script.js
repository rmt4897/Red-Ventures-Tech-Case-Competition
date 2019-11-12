var request = new XMLHttpRequest()

// holds the Production Companies
var allMovieProductions = [];

// temporarily holds all the filter values of movie production company, changes time new checks are set
var tempProductionMovie = []
// holds values of tempProductionMovie unduplicated
var uniqueProductionMovieArray = [];


// creates checkboxes and labels of production companies
function productionCompanySearch() {
  for (let i = 0; i < allMovieProductions.length; i++) {
    $(".production-companies").appendChild()
    var checkbox = document.createElement("input");
    var label = document.createElement("label");
    var br = document.createElement("br");
    var prettyDiv = document.createElement("div");

    <div class="pretty p-icon p-round">
						<input type="checkbox" />
						<div class="state">
						<i class="icon mdi mdi-check"></i>
            <label>Purple</label>
        </div>
    </div>

    label.innerHTML = allMovieProductions[i];
    

    checkbox.setAttribute("name", "production-checkbox-name")
    checkbox.setAttribute("value", allMovieProductions[i])

    checkbox.setAttribute("type", "checkbox")
    checkbox.setAttribute("class", "production-checkboxes")

    prettyDiv.appendChild(checkbox);
    prettyDiv.appendChild(label);
    prettyDiv.appendChild(br);
  }

  $(".production-checkboxes").click(function () {
      console.log("hi")
    updateMovieProductionFilters();
    productionMovieDisplay();
    
  });
}



// display movies of checked companies
function productionMovieDisplay() {
  console.log("poo")
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


request.open('GET', 'https://casecomp.konnectrv.io/production/movie', true)

request.onload = function () {
  // Begin accessing JSON data here
  var data = JSON.parse(this.response)

  if (request.status >= 200 && request.status < 400) {
    data.forEach(movie => {
      allMovieProductions = data;
    })
  } else {
    console.log('error')
  }
}

request.send()