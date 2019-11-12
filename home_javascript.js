var slideshowElements;
var currentIndex = 0;

function moveActiveFrame() {
	currentIndex++;

	if (currentIndex == slideshowElements.length) {
		currentIndex = 0;
	}

	swapFeatured(currentIndex);
}

$(function() {
	slideshowElements = document.getElementsByClassName("slideshow-object");

	setInterval(moveActiveFrame, 5000);
});

function swapFeatured(index) {
	for (var i=0;i<slideshowElements.length;i++) {
		$(slideshowElements[i]).removeClass("active");
		$(slideshowElements[i]).addClass("inactive");
	}

	$(slideshowElements[index]).removeClass("inactive");
	$(slideshowElements[index]).addClass("active");
}
