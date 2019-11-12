/* global $*/

// Array of all elements contained in the slideshow
var slideshowElements;

// The current index in the array that the slideshow is on
var currentIndex = 0;

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

// Run on script load
$(function() {
	// Get all elements that are slideshow objects
	slideshowElements = document.getElementsByClassName("slideshow-object");

	// Run the moveActiveFrame function every 5 seconds
	setInterval(moveActiveFrame, 5000);
});

// Function swapFeatured
// Param - index: the index of which to change the slideshow to
// Changes the active slide on the slideshow
function swapFeatured(index) {
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
