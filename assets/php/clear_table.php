<?php
include('config.php');

$query = "DELETE FROM videos WHERE id > 0";
mysqli_query($conn, $query);

?>