<?php 
    $connection = mysqli_connect("localhost", "root", "", "programming_contest");

    $name = isset($_POST['name']) ?$_POST['name'] : null; 
    $mobile = $_POST['#contactnum'];
    $email = $_POST['#email'];
    $referral = $_POST['#referral'];

    $query = "INSERT INTO `attendees`(`Attendee ID`, `Name`, `Contact Number`, `Email`, `Referral Code`) VALUES ('[value-1]','$name','$mobile','$email','$referral')";
  
    $query_run = mysqli_query($connection, $query);

    if($query_run){
        echo "success";
    }
    else{
        echo "failed";
    }
?>