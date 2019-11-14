// Function loadData
// Param - object: The movie/show object where the data is being loaded from
function loadData(object) {
	// Set the title element
	document.getElementById("information").children[0].innerHTML = object.title;

	var production_companies = "";

	// Loop through the production companies and append them to the string
	for (var i=0;i<object.production_companies.length;i++) {
		if (i <= object.production_companies.length-2) {
			production_companies += object.production_companies[i] + ", ";
		} else {
			production_companies += object.production_companies[i];
		}
	}

	// Set the element to hold the string of production companies
	document.getElementById("information").children[7].innerHTML = production_companies;

	var streaming_platforms = "Available on: ";

	// Loop through the streaming platforms and append to string
	for (var i=0;i<object.streaming_platform.length;i++) {
		if (i <= object.streaming_platform.length-2) {
			streaming_platforms += object.streaming_platform[i] + ", ";
		} else {
			streaming_platforms += object.streaming_platform[i];
		}
	}

	// Set the element to hold streaming platforms
	document.getElementById("information").children[9].innerHTML = streaming_platforms;

	// Update remaining elements to hold their respective values
	document.getElementById("information").children[12].innerHTML = object.desc;
	document.getElementById("extra-information").children[4].children[0].innerHTML = object.vote_average + " / 10";
	document.getElementById("extra-information").children[4].children[2].innerHTML = object.vote_count + " Votes";

	// If the type is movie then show the rating and the release date
	if (type == "movie") {
		document.getElementById("extra-information").children[6].children[0].innerHTML = object.date;
		document.getElementById("information").children[4].innerHTML = object.rating;
	} else {
		// If the type is not movie (ie: show) then hide the elements that arent provided
		document.getElementById("extra-information").children[6].children[0].style.visibility = "hidden";
		document.getElementById("information").children[4].style.visibility = "hidden";
	}

	// Apply the IMDB poster image
	applyImdbThumbnail(document.getElementById("poster-image"), true, object.id);
}
