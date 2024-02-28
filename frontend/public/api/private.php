<?php

require_once("./utils.php");

if (!session_id()) {
    session_start();
}

if (!isset($_SESSION["auth_tokens"])) {
    $tokens = [];
} else {
    $tokens = decode($_SESSION["auth_tokens"] ?? "[]");
}

$headers = getallheaders();
$authHeader = $headers["Authorization"];

$parts = explode(" ", $authHeader);
$token = $parts[1];

$user = findUserByToken($tokens, $token);
if (!$user) {
    header("HTTP/1.1 400 No Content", true, 400);
    return;
}

$route = $_GET["route"];

$news = [
    [
        "id" => uuidv4(),
        "title" => "Quam iure sunt repellat odit",
        "image" => 'https://placeimg.com/640/480/nature',
        "content" => "Quam iure sunt repellat odit, mollitia exercitationem nam, ad dolor voluptate blanditiis eum",
    ],
    [
        "id" => uuidv4(),
        "title" => "Lorem ipsum dolor sit amet",
        "image" => 'https://placeimg.com/640/480/arch',
        "content" => " Quam iure sunt repellat odit, mollitia exercitationem nam, ad dolor voluptate blanditiis eum, accusantium veniam neque quidem fugit ullam quaerat tenetur aliquam!",
    ],
    [
        "id" => uuidv4(),
        "title" => "Quam iure sunt repellat odit",
        "image" => 'https://placeimg.com/640/480/tech',
        "content" => "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam iure sunt repellat odit",
    ],
    [
        "id" => uuidv4(),
        "title" => "Quam iure sunt",
        "image" => 'https://placeimg.com/640/480/sepia',
        "content" => "Mollitia exercitationem nam, ad dolor voluptate blanditiis eum, accusantium veniam neque quidem fugit ullam quaerat tenetur aliquam!",
    ],
];


if ($route === "me") {
    echo (encode($user));
} elseif ($route === "news") {
    echo (encode($news));
}
