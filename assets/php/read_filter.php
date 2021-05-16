<?php
$filters = array();
$fp = fopen("../filter/search_filter", "r");

while(!feof($fp)) {

array_push($filters, fgets($fp));

//$linea .= fgets($fp) . " ";

}

fclose($fp);

if($filters) {
    exit(json_encode($filters));
} else {
    exit("0");
}


?>