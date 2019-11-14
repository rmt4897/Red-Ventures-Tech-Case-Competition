/* global type, id */

// blank file that will retrieve a movie or show
// when a function is called with parameters
// (var type, var id), where 'type' is either
// "movie" or "show" and id is an imdb id

var _media;  // global variable declaration

function media_by_type_and_id(_type, _id) { // function header, takes in 2 strings

    var the_url = 'https://casecomp.konnectrv.io/' + _type + "/" + _id;  // setting up url for api
    var request = new XMLHttpRequest(); // setting up url/api call

    request.open('GET', the_url, true); // ...***...***...
    request.onload = function () { // ...***...***...
        // Begin accessing JSON data here
        var data = JSON.parse(this.response) // api data about specific request stored into 'data'
        if (_type == "movie") { // testing if it's a movie
            _media = {
                title: data.title, // saving movie name
                date: data.release_date,
                rating: data.rating,
                streaming_platform: data.streaming_platform,
                production_companies: data.production_companies,
                id: data.imdb,
                vote_count: data.vote_count,
                vote_average: data.vote_average,
                language: data.original_language,
                desc: data.overview
            };
        } else if (_type == "show") { // testing if show, b/c shows don't have date or stream. plat.
            _media = {
                title: data.title, // saving show name
                streaming_platform: data.streaming_platform,
                production_companies: data.production_companies,
                id: data.imdb,
                vote_count: data.vote_count,
                vote_average: data.vote_average,
                language: data.original_language,
                desc: data.overview
            };
        }

		loadData(_media);
    }
    request.send(); // ...***...***...
}

$(function() {
	media_by_type_and_id(type, id);
});

// test function calls
// media_by_type_and_id("movie", "tt8110640");
// media_by_type_and_id("show", "tt1844624");
