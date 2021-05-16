<?php
include('config.php');

if(isset($_POST['title'])){

    $title = $_POST['title'];
    $date = $_POST['publishedAt'];

    $query = "INSERT INTO videos (videos.title, videos.date) VALUES ('$title', '$date')";
    mysqli_query($conn, $query);
    exit("ok");
} else {
    exit("error");
}
?>