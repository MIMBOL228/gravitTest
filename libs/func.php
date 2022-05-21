<?php
/*
* Вспомогательные функции
*/
class Func{

    function __construct () {

    }
    
    function jsonLoad (String $file, $isHomeUrl = true, $assoc = true) {
        $path = ($isHomeUrl ? ROOT."/" : "").$file;
        return json_decode(file_get_contents($path),$assoc);
    }

}