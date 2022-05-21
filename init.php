<?php

/*
* Начало работы сайта.
*/

define('ROOT',$_SERVER['DOCUMENT_ROOT']);

include ROOT.'/libs/mysqlo.php';
include ROOT.'/libs/func.php';

$Func = new Func();
$config = $Func->jsonLoad("config.json");

$Mysql = new Mysqlo($config['db']);