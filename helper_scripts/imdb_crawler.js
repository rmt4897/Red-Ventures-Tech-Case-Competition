applyImdbThumbnail();

function applyImdbThumbnail() {
	$.ajax({
		url: "redventures.purple-techs.com/helper_scripts/pull_site.php?url=https://www.imdb.com/title/tt8110640/",
		type: 'GET',
		success: function(response) {
			var html = $.parseHTML(response);

			console.log(html);

			var posterElement = loopElementsSearchForPoster(html);

			console.log(posterElement.children[0].children[0]);
		}
	});
}

function loopElementsSearchForPoster(array) {
	for (var i=0;i<array.length;i++) {
		if (array[i].className != "poster") {
			return loopElementsSearchForPoster(array[i].children);
		} else {
			return array[i];
		}
	}
}
