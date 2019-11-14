/* global $ */
/* global applyImdbThumbnail */
/* global get_one_recommended_movie */
/* global get_one_recommended_show */

var items = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

// Load all the items in the page
$(function() {
	items = document.getElementsByClassName("item");
});

// Loaded movies based on recommend movies
function loadMovies() {
	// Loop through first half array
	for (var i=0;i<items.length/2;i++) {
		var object = get_one_recommended_movie(i);

		items[i].children[0].children[1].children[0].innerHTML = object.name;

		// Set link to go to the indiviual title page
		$(items[i]).attr("href", "title/title.php?id=" + object.id + "&type=movie");

		// Apply imdb poster image
		applyImdbThumbnail(items[i].children[0].children[0].children[0], false, object.id);
	}
}

// Load shows based on recommended show
function loadShows() {
	for (var i=0;i<items.length/2;i++) {
		var object = get_one_recommended_show(i);

		items[i+items.length/2].children[0].children[1].children[0].innerHTML = object.name;

		// Set link to go to the indiviual title page
		$(items[i+items.length/2]).attr("href", "title/title.php?id=" + object.id + "&type=show");

		// Apply imdb poster image
		applyImdbThumbnail(items[i+items.length/2].children[0].children[0].children[0], false, object.id);
	}
}
