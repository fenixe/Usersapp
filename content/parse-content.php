<?php

// Parsing horoscope site for

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$dates = $request->dates;
$zodiac = $request->zodiac;
$out_array = [];

foreach ($dates as $key => $value) {
    $url = 'http://my.horoscope.com/astrology/' . $value . '-horoscope-' . $zodiac . '.html';
    $content = file_get_contents($url);
    $pattern = '/id="textline">(.*?)<\/div>/i';
    preg_match($pattern, $content, $data);
    array_push($out_array, array('date' => $key, 'zodiac' => $zodiac, 'horoscope' => $data[1]));
}
echo json_encode($out_array);

