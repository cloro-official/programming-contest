<?php 
    $connection = mysqli_connect("localhost", "root", "", "programming_contest");

    $name = $_POST['name'];
    $mobile = $_POST['contactnum'];
    $email = $_POST['email'];
    $referral = $_POST['referral'];

    $query = "INSERT INTO `attendees`(`Name`, `Contact Number`, `Email`, `Referral Code`) VALUES ('$name','$mobile','$email','$referral')";
    $query_run = mysqli_query($connection, $query);

    if($query_run){
        echo "success";
    }
    else{
        echo "failed";
    }
?>