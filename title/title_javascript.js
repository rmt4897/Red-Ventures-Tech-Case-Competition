function loadData(object) {
	document.getElementById("information").children[0].innerHTML = object.title;

	var production_companies = "";

	for (var i=0;i<object.production_companies.length;i++) {
		if (i <= object.production_companies.length-2) {
			production_companies += object.production_companies[i] + ", ";
		} else {
			production_companies += object.production_companies[i];
		}
	}

	document.getElementById("information").children[7].innerHTML = production_companies;

	var streaming_platforms = "Available on: ";

	for (var i=0;i<object.streaming_platform.length;i++) {
		if (i <= object.streaming_platform.length-2) {
			streaming_platforms += object.streaming_platform[i] + ", ";
		} else {
			streaming_platforms += object.streaming_platform[i];
		}
	}

	document.getElementById("information").children[9].innerHTML = streaming_platforms;
	document.getElementById("information").children[12].innerHTML = object.desc;
	document.getElementById("extra-information").children[4].children[0].innerHTML = object.vote_average;
	document.getElementById("extra-information").children[4].children[2].innerHTML = object.vote_count;

	if (type == "movie") {
		document.getElementById("extra-information").children[6].children[0].innerHTML = object.date;
		document.getElementById("information").children[4].innerHTML = object.rating;
	}

	applyImdbThumbnail(document.getElementById("poster-image"), true, object.id);
}
