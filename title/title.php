<?php
	# pull id and type from the URL
	$id = $_GET['id'];
	$type = $_GET['type'];
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="utf-8">
	<meta id="movie-data" data="<?php echo $id; ?>" type="<?php echo $type; ?>">
	<title>MASFY - Movies and Shows for You</title>
	<link rel="stylesheet" href="../css.css">
	<link rel="stylesheet" href="title.css">
	<link rel="shortcut icon" type="image/x-icon" href="../imgs/favicon.ico">
</head>
<body>
	<div class="nav-bar">
		<div class="nav-container">
			<div class="logo-container">
				<a href="http://redventures.purple-techs.com"><img class="logo" src="../imgs/logo.png"></a>
			</div>
			<div class="spacer" width="50%"></div>
			<div class="links-container">
				<a href="../show.php?type=movie" class="nav-link">All Movies</a>
				<a href="../show.php?type=show" class="nav-link">All Shows</a>
				<a href="../recommended.html" class="nav-link">Recommended</a>
			</div>
		</div>
	</div>
	<div class="main-container">
		<div class="poster-container">
			<div id="poster-image" class="poster-image shine"></div>
		</div>
		<div id="information" class="information">
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
				Loading
			</div>
			<br>
			<div class="streaming-platforms">
				Available on: Loading
			</div>
			<br><br>
			<div class="overview">
				Loading
			</div>
		</div>
		<div id="extra-information" class="extra-information">
			<a href="<?php echo 'https://www.imdb.com/title/' . $id . '/'; ?>">View on IMDB</a>
			<br>
			<br><br>
			<div class="voting-container">
				<div class="vote-average">
					Loading
				</div>
				<br>
				<div class="vote-total">
					Loading
				</div>
			</div>
			<br>
			<div class="release-data-container">
				<div class="release-data">
					Loading
				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript">
		var id = $("#movie-data").attr("data");
		var type = $("#movie-data").attr("type");
	</script>
	<script type="text/javascript" charset="utf-8" src="../helper_scripts/imdb_crawler.js"></script>
	<script type="text/javascript" charset="utf-8" src="../title/title_javascript.js"></script>
	<script type="text/javascript" charset="utf-8" src="../helper_scripts/get_movie_or_show_by_id.js"></script>
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
			navigator.geolocation.getCurrentPosition(function (position) {
		
				db.collection('VisitorLocation').add({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				})
			});


			var typeOfFilm = type;
			var imdbID = id;
			var dupInDatabase = false;
			var comparisonFilmObject;

			var platformRequest = new XMLHttpRequest()
			platformRequest.open('GET', 'https://casecomp.konnectrv.io/' + typeOfFilm + '/' + imdbID, true);
			platformRequest.onload = function () {
				// Begin accessing JSON data here
				var data = JSON.parse(this.response)
				comparisonFilmObject = data;
				if (typeOfFilm === "movie") {
					db.collection("MovieDataCollection").get().then((snapshot) => {
						snapshot.docs.forEach(doc => {
							if (comparisonFilmObject.imdb === doc.data().imdb) {
								dupInDatabase = true;
							}
						})
						if (!dupInDatabase) {
							db.collection("MovieDataCollection").add({
								ClickCount: 1,
								imdb: comparisonFilmObject.imdb,
								title: comparisonFilmObject.title,
							})
						} else {
							var documentID;
							var clickCounter
							db.collection('MovieDataCollection').where("imdb", "==", imdbID).get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									clickCounter = doc.data().ClickCount + 1
									documentID = doc.id
									db.collection('MovieDataCollection').doc(documentID).update({ ClickCount: clickCounter, })
								})
							})
						}
					})
				}
				else if (typeOfFilm === "show") {
					db.collection("ShowDataCollection").get().then((snapshot) => {
						snapshot.docs.forEach(doc => {
							if (comparisonFilmObject.imdb === doc.data().imdb) {
								dupInDatabase = true;
							}
						})
						if (!dupInDatabase) {
							db.collection("ShowDataCollection").add({
								ClickCount: 1,
								imdb: comparisonFilmObject.imdb,
								title: comparisonFilmObject.title,
							})
						} else {
							var documentID;
							var clickCounter
							db.collection('ShowDataCollection').where("imdb", "==", imdbID).get().then(snapshot => {
								snapshot.docs.forEach(doc => {
									clickCounter = doc.data().ClickCount + 1
									documentID = doc.id
									db.collection('ShowDataCollection').doc(documentID).update({ClickCount: clickCounter,})
								})
							})
						}
					})
				}
			}
			platformRequest.send();
		})
	</script>
</body>

</html>
