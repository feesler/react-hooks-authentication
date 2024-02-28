<?php

require_once("./utils.php");

if (!session_id()) {
    session_start();
}


if (isset($_SESSION["auth_tokens"])) {
    $tokens = decode($_SESSION["auth_tokens"] ?? "[]");
} else {
    $tokens = [];
}

$isPOST = $_SERVER["REQUEST_METHOD"] == "POST";

if ($isPOST) {
    $input = file_get_contents("php://input");
    $requestData = decode($input);

    $login = $requestData["login"];
    $password = $requestData["password"];

    $user = findUserByLogin($users, $login);
    if (!$user) {
        header("HTTP/1.1 400 No Content", true, 400);
        return;
    }

    $res = checkLoginData($users, $login, $password);
    if (!$res) {
        header("HTTP/1.1 400 Not authorized", true, 400);
        return;
    }

    $token = uuidv4();

    $tokens[$token] = $login;

    $response = [
        "token" => $token,
    ];
    echo encode($response);
}

$_SESSION["auth_tokens"] = encode((array)$tokens);
