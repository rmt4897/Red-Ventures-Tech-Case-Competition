function applyImdbThumbnail() {

}


$.ajax({
	url: "pull_site.php?url=https://www.imdb.com/title/tt8110640/",
	type: 'GET',
	success: function(response) {
		console.log(response);
	}
});
