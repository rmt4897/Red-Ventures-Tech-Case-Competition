<?php
	$type = $_GET['type'];

	if (strcmp($type, "movie") == 0) {
		$movies = "active";
		$shows = "";
	} else {
		$movies = "";
		$shows = "active";
	}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
	<meta charset="utf-8">
	<meta id="initial-type" data="<?php echo $type; ?>">
	<title>MASFY - Movies and Shows for You</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pretty-checkbox@3.0/dist/pretty-checkbox.min.css">
	<link rel="stylesheet" href="css.css">
	<link rel="stylesheet" href="show.css">
	<link rel="shortcut icon" type="image/x-icon" href="imgs/favicon.ico">
</head>

<body>
	<div class="nav-bar">
		<div class="nav-container">
			<div class="logo-container">
				<img class="logo" src="imgs/logo.png">
			</div>
			<div class="spacer" width="50%"></div>
			<div class="links-container">
				<a href="show.php?type=movie" class="nav-link">All Movies</a>
				<a href="show.php?type=show" class="nav-link">All Shows</a>
				<a href="recommended.html" class="nav-link">Recommended</a>
			</div>
		</div>
	</div>

	<div class="main-container">
		<div class="filter-panel">
			<div class="filters">
				<div class="filter-header">
					<h1>Filters</h1>
					<img src="imgs/filter-outline.png" alt="">
				</div>
				<div class="filters-container">
					<label for="production-companies">By Production Company:</label>
					<div class="production-companies filter-list">

					</div>
					<br><br>
					<label for="streaming-platform">By Streaming Platform:</label>
					<div class="streaming-platform filter-list">

					</div>
				</div>
			</div>
		</div>
		<div class="display-panel">
			<div class="collection-type-container">
				<div class="collection-filter-type">
					<img class="logo" src="imgs/logo.png">
					<div class="collection-filter <?php echo $movies; ?>" onclick="javascript:swapActiveLargeFilter(0);">
						Movies
					</div>
				</div>
				<div class="collection-filter-type" onclick="javascript:swapActiveLargeFilter(1);">
					<div class="collection-filter <?php echo $shows; ?>">
						Shows
					</div>
				</div>
			</div>
			<div class="display">
				<div class="display-container list">

				</div>
			</div>
		</div>
	</div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
	<script type="text/javascript" charset="utf-8" src="helper_scripts/imdb_crawler.js"></script>

	<script type="text/javascript" charset="utf-8" src="show_javascript.js"></script>
	<!-- Firebase App (the core Firebase SDK) is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-app.js"></script>

	<!-- If you enabled Analytics in your project, add the Firebase SDK for Analytics -->
	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-analytics.js"></script>

	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-auth.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.3.0/firebase-firestore.js"></script>

	<script type="text/javascript" charset="utf-8" src="helper_scripts/filter_script.js"></script>
</body>

</html>
