/* global loadData */

var r_movies = [];      // declaring blank array for movies
var index_array = [-1, -1, -1]; // setting index values to -1 since we don't generate less than 0
var request = new XMLHttpRequest();     // ...***...***...
request.open('GET', 'https://casecomp.konnectrv.io/movie', true);   // ...***...***...

request.onload = function () {    // ...***...***...
    // Begin accessing JSON data here
    var data = JSON.parse(this.response) // api data about all movies stored into 'data'
    for (i = 0; i < 3; i++) {  // for loop for 3 movies
        // gen. random number from 0 to total number of movies in api
        var x = Math.floor(Math.random() * data.length);
        /* while loop that just checks to see if 
        we have used any of the index's already */
        while (x == index_array[0] || x == index_array[1]) {
            x = Math.floor(Math.random() * data.length); // if we have used it, we just gen. another and loop again
        } // end while loop
        index_array[i] = x; // saving unique index into array
        var _movie = {
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
