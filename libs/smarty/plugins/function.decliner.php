<?php
/*
    Источники: 
        https://htmler.ru/2014/01/31/sklonenie-chislitelnyih-v-smarty/
        https://itinsanity.wordpress.com/2010/07/25/%D0%BF%D0%BB%D0%B0%D0%B3%D0%B8%D0%BD-%D0%B4%D0%BB%D1%8F-smarty-%D0%B4%D0%BB%D1%8F-%D1%81%D0%BA%D0%BB%D0%BE%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F-%D1%81%D1%83%D1%89%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D1%82%D0%B5/
    Подкорректировал: MIMBOL
*/
function smarty_function_decliner($in, &$smarty)
{
    if (empty($in['word'])) {
        $smarty->trigger_error("Должны быть слова!");
        return;
    }
    if (empty($in['count']))
        $in['count']=0;

    $words=explode(',',$in['word']);
    $number=round($in['count']);
    $cases = [2, 0, 1, 1, 1, 2];
    return $words[ ($number%100>4 && $number%100<20)? 2 : $cases[min($number%10, 5)] ];
}