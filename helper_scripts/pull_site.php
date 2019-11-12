<?php
	$url = (isset($_GET['url'])) ? $_GET['url'] : false;

	if(!$url)
		exit;

	header('Content-Type: text/html');
	$string = file_get_contents($url);
	echo $string;
?>
