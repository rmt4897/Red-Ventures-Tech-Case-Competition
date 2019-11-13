var largeFilters;

$(function() {
	largeFilters = document.getElementsByClassName("collection-filter");
});

function swapActiveLargeFilter(index) {
	for (var i=0;i<largeFilters.length;i++) {
		$(largeFilters[i]).removeClass("active");
	}

	$(largeFilters[index]).addClass("active");
}
