/* global $ */
/* global applyImdbThumbnail */
/* global get_featured_movies */

// Array of all elements contained in the slideshow
var slideshowElements = [0, 0, 0];

// The current index in the array that the slideshow is on
var currentIndex = 0;

// Slideshow update timer
var timer;

// Function moveActiveFrame
// Increases current index and moves the slideshow forward
function moveActiveFrame() {
	currentIndex++;

	// restart slideshow when reach end
	if (currentIndex == slideshowElements.length) {
		currentIndex = 0;
	}

	swapFeatured(currentIndex);
}

// Loads data onto the UI from the API
function loadData() {
	for (var i=0;i<slideshowElements.length;i++) {
		var object = get_featured_movies(i);

		// Apply text updates
		slideshowElements[i].children[1].children[0].innerHTML = object.name;
		slideshowElements[i].children[1].children[3].innerHTML = object.rating;
		slideshowElements[i].children[1].children[6].innerHTML = object.desc;

		$(slideshowElements[i].children[1].children[0]).attr("href", "title/title.php?id=" + object.id + "&type=movie");

		// Call imdb_crawler to pull poster images
		applyImdbThumbnail(slideshowElements[i].children[0].children[1], true, object.id);
	}
}

// Run on script load
$(function() {
	// Get all elements that are slideshow objects
	slideshowElements = document.getElementsByClassName("slideshow-object");

	// Run the moveActiveFrame function every 5 seconds
	timer = setInterval(moveActiveFrame, 10000);
});

// Function swapFeatured
// Param - index: the index of which to change the slideshow to
// Changes the active slide on the slideshow
function swapFeatured(index) {
	// Reset timer when slideshow is updated
	clearInterval(timer);
	timer = setInterval(moveActiveFrame, 10000);

	currentIndex = index;

	// Make all slides inactive
	for (var i=0;i<slideshowElements.length;i++) {
		$(slideshowElements[i]).removeClass("active");
		$(slideshowElements[i]).addClass("inactive");
	}

	// Make the slide at the index active
	$(slideshowElements[index]).removeClass("inactive");
	$(slideshowElements[index]).addClass("active");
}
