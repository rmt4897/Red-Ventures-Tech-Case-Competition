<?php
	$id = $_GET['id'];
	$type = $_GET['type'];
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="utf-8">
	<meta id="movie-data" data="<?php echo $id ?>" type="<?php echo $type ?>">
	<title>Name of the App</title>
	<link rel="stylesheet" href="../css.css">
	<link rel="stylesheet" href="title.css">
	<script type="text/javascript">
		var id = $("#movie-data").attr("data");
		var type = $("#movie-data").attr("type");
	</script>
</head>
<body>
	<div class="nav-bar">
		<div class="nav-container">
			<div class="logo-container">

			</div>
			<div class="spacer" width="50%"></div>
			<div class="links-container">
				<a href="" class="nav-link">All Movies</a>
				<a href="" class="nav-link">All Shows</a>
				<a href="" class="nav-link">Recommended</a>
			</div>
		</div>
	</div>
	<div class="main-container">
		<div class="poster-container">
			<div class="poster-image shine"></div>
		</div>
		<div class="information">
			<a class="title">
				Loading
			</a>
			<hr>
			<br>
			<br>
			<div class="rating">
				Loading
			</div>
			<br><br>
			<div class="production-companies">
				Fox, Purple, Orange
			</div>
			<br>
			<div class="streaming-platforms">
				Available on: Netflix, HBO
			</div>
			<br><br>
			<div class="overview">
				Loading
			</div>
		</div>
		<div class="extra-information">
			<a href="<?php echo 'https://www.imdb.com/title/' . $id . '/'; ?>">View on IMDB</a>
			<hr>
			<br><br>
			<div class="voting-container">
				<div class="vote-average">
					8.5 / 10
				</div>
				<br>
				<div class="vote-total">
					1620934 votes
				</div>
			</div>
			<br>
			<div class="release-data-container">
				<div class="release-data">
					10/10/19
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="../helper_scripts/imdb_crawler.js"></script>
	<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>

	<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-analytics.js"></script>

	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-firestore.js"></script>

	<script>
		var firebaseConfig = {
			apiKey: "redventure-case-comp",
			authDomain: "redventure-case-comp.firebaseapp.com",
			databaseURL: "https://redventure-case-comp.firebaseio.com",
			projectId: "redventure-case-comp",
			storageBucket: "redventure-case-comp.appspot.com",
			messagingSenderId: "sender-id",
			appId: "app-id",
			measurementId: "G-measurement-id",
		};

		// Initialize Firebase
		firebase.initializeApp(firebaseConfig);
		const db = firebase.firestore();

		$(document).ready(function () {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {
					db.collection('VisitorLocation').add({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					})
					// console.log("Found your location \nLat : " + position.coords.latitude + " \nLang :" + position.coords.longitude);
				});
			}
		})

		$(document).ready(function () {
			var typeOfFilm = type;
			var imbdID = id;


			var platformRequest = new XMLHttpRequest();
			platformRequest.open('GET', 'https://casecomp.konnectrv.io/' + typeOfFilm + '/' + imbdID, true);
			platformRequest.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
					console.log(data);
			}
			platformRequest.send();


			if (typeOfFilm === "movie") {
				console.log(db.collection("MovieDataCollection").length);

			} else {

			}
		})
	</script>
</body>

</html>
