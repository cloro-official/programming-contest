<script>
    $(document).ready(function(){
        $('#submit').click(function (e){   
            e.preventDefault();
            $.ajax({
                type: "post",
                url: "insertdata.php",
                data: $('register').serialize,
                dataType: "text",
                success: function(response){
                    $('test').text(response);
                }
            })
        })
    });
</script>