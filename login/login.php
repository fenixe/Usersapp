<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$user_date = $request->date;
$email = $request->email;

$out_array = array(
    'success' => true,
    'user' =>
        array(
            'date' => $user_date,
            'email' => $email,
            'friends' => array(
                array(
                    'date' => "1986-12-05",
                    'email' => "first@mail.ua",
                ),
                array(
                    'date' => "1975-05-03",
                    'email' => "second@mail.ua",
                ),
                array(
                    'date' => "1998-01-01",
                    'email' => "third@mail.ua",
                )
            )
        )
);
echo json_encode($out_array);