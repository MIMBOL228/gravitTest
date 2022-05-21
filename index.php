<?php
ini_set('display_errors','1');
error_reporting(E_ALL);
include 'init.php';
var_dump($Mysql->query("SELECT * FROM users",[],true));