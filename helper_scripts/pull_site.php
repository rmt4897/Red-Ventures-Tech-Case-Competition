<?php
	# get the url to pull from
	$url = (isset($_GET['url'])) ? $_GET['url'] : false;

	# if there is no url then exit script
	if(!$url)
		exit;

	# pull file contents from URL
	header('Content-Type: text/html');
	$string = file_get_contents($url);

	# extract the poster div
	$first_step = explode( '<div class="poster">' , $string);
	$second_step = explode("</div>" , $first_step[1] );

	# print the contents in the poster div
	echo $second_step[0];
?>
