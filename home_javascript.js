var slideshowElements;

$(function() {
	slideshowElements = document.getElementsByClassName("slideshow-object")
});

function swapFeatured(index) {
	for (var i=0;i<slideshowElements.length;i++) {
		$(slideshowElements[i]).removeClass("active");
		$(slideshowElements[i]).addClass("inactive");
	}

	$(slideshowElements[index]).removeClass("inactive");
	$(slideshowElements[index]).addClass("active");
}
