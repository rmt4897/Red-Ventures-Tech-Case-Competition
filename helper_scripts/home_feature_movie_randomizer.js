/* global loadData */

var r_movies = [];      // declaring blank array for movies
var request = new XMLHttpRequest();     // ...***...***...

request.open('GET', 'https://casecomp.konnectrv.io/movie', true);   // ...***...***...

request.onload = function () {    // ...***...***...
  // Begin accessing JSON data here
  var data = JSON.parse(this.response) // api data about all movies stored into 'data'
  for (i=0; i<3; i++) {  // for loop for 3 movies
            // gen. random number from 0 to total number of movies in api
    var x = Math.floor(Math.random() * data.length);
    var _movie ={
                   name: data[x].title,             // saving movie name
                   date: data[x].release_date,      // "" release date
                   rating: data[x].rating,          // "" rating
                   desc: data[x].overview,          // "" description
                   id: data[x].imdb,                // "" imdb id
                   vote_avg: data[x].vote_average   // "" vote average
                };
    r_movies[i] = _movie;    // saving individual movie details into array
  }
    function sort_helper(movie_a, movie_b) {    // sort help function
    // sorting objects, this function specifies that we're sorting by vote_avg
        return (movie_b.vote_avg - movie_a.vote_avg); // sorting in descending order
    }
    r_movies.sort(sort_helper); // sort function call
	loadData();
    //console.log(r_movies);

}
request.send(); // ...***...***...

// function for retrieving movies, that are
// sorted by vote ave, by a specified index
function get_featured_movies(index) {
    return r_movies[index];
}
