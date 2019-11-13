/* global $ */
/* global applyImdbThumbnail */
/* global get_one_recommended_movie */
/* global get_one_recommended_show */
/* global removeShine */

var items;

$(function() {
	items = document.getElementsByClassName("item");
});

function loadMovies() {
	for (var i=0;i<items.length/2;i++) {
		var object = get_one_recommended_movie(i);

		items[i].children[0].children[1].children[0].innerHTML = object.name;

		applyImdbThumbnail(items[i].children[0].children[0].children[0], false, object.id, removeShine);
	}
}

function loadShows() {
	for (var i=0;i<items.length/2;i++) {
		var object = get_one_recommended_show(i);

		items[i+items.length/2-1].children[0].children[1].children[0].innerHTML = object.name;

		applyImdbThumbnail(items[i].children[0].children[0].children[0], false, object.id, removeShine);
	}
}
