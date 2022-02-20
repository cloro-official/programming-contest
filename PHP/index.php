<html>
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Regsiter</title>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    </head>
    <body>
        <h1 id="test">test</h1>
        <form class="register" id="register" method="post" action="<?php echo $_SERVER['PHP_SELF'];?>">
            <label for="referral">Input Referal Code:</label><br>
            <input type="text" id="referral" name="referral"><br>
            <label for="name">Input Name:</label><br>
            <input type="text" id="name" name="name"><br>
            <label for="contactnum">Input Contact Number:</label><br>
            <input type="number" id="contactnum" name="contactnum"><br>
            <label for="email">Input Email:</label><br>
            <input type="email" id="email" name="email"><br>
            <input type="submit" id="submit" name="submit">
        </form>
        <?php include 'ajax.js'; ?>
    </body>
</html>
