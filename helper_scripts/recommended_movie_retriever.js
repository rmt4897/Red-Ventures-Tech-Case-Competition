// top movies for recommended movies page
var _movies = [];   // blank movie array
var request = new XMLHttpRequest(); // ...***...***...
request.open('GET', 'https://casecomp.konnectrv.io/movie', true); // ...***...***...
request.onload = function() { // ...***...***...
    // Begin accessing JSON data here
    var data = JSON.parse(this.response) // api data about all movies stored into 'data'
    for (i = 0; i < data.length; i++) { // for loop for all the movies
        var _movie = {
            // name: data[i].title,             // saving movie name
            id: data[i].imdb,                   // saving imdb id
            vote_avg: data[i].vote_average      // saving vote average
        };
        _movies[i] = _movie; // saving individual movie details into array
    } // end for loop
    // console.log(_movies); // this contains the unsorted list of movie ids/vote_avg
    function sort_helper(movie_a, movie_b) { // sort help function 
        // sorting objects, this function specifies that we're sorting by vote_avg
        return (movie_b.vote_avg - movie_a.vote_avg); // sorting in descending order
    }
    _movies.sort(sort_helper); // sort function call
    // console.log(_movies); // this contains the sorted list of movie ids/vot_avg

}
request.send(); // ...***...***...

// these functions need to be tinkered with ...***...
function get_all_recommended_movies() {
    return _movies;
}
function get_one_recommended_movie(index) {
    return _movies[index];
}