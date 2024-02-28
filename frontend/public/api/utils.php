<?php

function decode($str)
{
    $asArray = true;
    $depth = 512;
    $fdata = rawurldecode($str);

    return json_decode($fdata, $asArray, $depth, JSON_THROW_ON_ERROR);
}

function encode($obj)
{
    return json_encode($obj, JSON_UNESCAPED_UNICODE);
}

function findUserByLogin($usersArr, $login)
{
    return $usersArr[$login];
}

function findUserByToken($tokensArr, $token)
{
    return $tokensArr[$token];
}

function getSalt(string $str)
{
    $bfPrefix = "\$2y\$10\$";

    return $bfPrefix . substr(md5($str), 0, 20) . "..";
}

function getHash(string $str, string $salt)
{
    return substr(crypt($str, $salt), 28);
}

function checkHash(string $str, string $salt, string $hash)
{
    $full_hash = substr($salt, 0, 28) . $hash;

    return (crypt($str, $salt) == $full_hash);
}

function createHash(string $login, string $password)
{
    $salt = getSalt($login);
    $hashed = getHash($password, $salt);

    return getHash($hashed, $salt);
}

function checkLoginData($users, $login, $password)
{
    $user = findUserByLogin($users, $login);
    if (!$user) {
        return false;
    }

    $salt = getSalt($login);
    $hashed = getHash($password, $salt);

    return checkHash($hashed, $salt, $user["password"]);
}



function format_uuidv4($data)
{
    assert(strlen($data) == 16);

    $data[6] = chr(ord($data[6]) & 0x0f | 0x40); // set version to 0100
    $data[8] = chr(ord($data[8]) & 0x3f | 0x80); // set bits 6-7 to 10

    return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}

function uuidv4()
{
    return format_uuidv4(random_bytes(16));
}



$users = [
    "vasya" => [
        "id" => uuidv4(),
        "login" => "vasya",
        "name" => "Vasya",
        "password" => createHash("vasya", "password"),
        "avatar" => "https://i.pravatar.cc/40",
    ],
];
