/* global loadShows */

// top shows for recommended shows page
var _shows = [];   // blank show array
var request = new XMLHttpRequest(); // ...***...***...

request.open('GET', 'https://casecomp.konnectrv.io/show', true); // ...***...***...

request.onload = function() { // ...***...***...
    // Begin accessing JSON data here
    var data = JSON.parse(this.response) // api data about all movies stored into 'data'
    for (i = 0; i < 5; i++) { // for loop for all the shows
        var _show = {
            name: data[i].title,             // saving show name
            id: data[i].imdb,                   // saving imdb id
            vote_avg: data[i].vote_average      // saving vote average
        };
        _shows[i] = _show; // saving individual movie details into array
    } // end for loop
    // console.log(_shows); // this contains the unsorted list of show ids/vote_avg
    function sort_helper(show_a, show_b) { // sort help function
        // sorting objects, this function specifies that we're sorting by vote_avg
        return (show_b.vote_avg - show_a.vote_avg); // sorting in descending order
    }
    _shows.sort(sort_helper); // sort function call
    // console.log(_shows); // this contains the sorted list of shows ids/vot_avg

	loadShows();

}
request.send(); // ...***...***...

// these functions need to be tinkered with ...***... (just like in the rec. movie file)

// returns 1 movie at specified index
function get_one_recommended_show(index) {
    return _shows[index];
}
