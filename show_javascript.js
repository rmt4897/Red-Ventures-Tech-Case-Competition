var largeFilters;

// Load the big filters, movies shows
$(function() {
	largeFilters = document.getElementsByClassName("collection-filter");
});

// change which filter has the active styling
function swapActiveLargeFilter(index) {
	for (var i=0;i<largeFilters.length;i++) {
		$(largeFilters[i]).removeClass("active");
	}

	$(largeFilters[index]).addClass("active");
}
