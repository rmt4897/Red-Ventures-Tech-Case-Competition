<?php
	$url = (isset($_GET['url'])) ? $_GET['url'] : false;

	if(!$url)
		exit;

	header('Content-Type: text/html');
	$string = file_get_contents($url);
	$first_step = explode( '<div class="poster">' , $string);
	$second_step = explode("</div>" , $first_step[1] );

	echo $second_step[0];
?>
