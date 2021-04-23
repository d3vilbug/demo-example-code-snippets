<?php

session_start();

// Create a new CSRF token.
if (! isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = base64_encode(openssl_random_pseudo_bytes(32));
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" /> 
    <title>PHP Replay Protection</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
	
	var token = "<?php echo $_SESSION['csrf_token']; ?>";
	
    </script>
	
<script>
$(document).ready(function(){
  $("#search").click(function(){
	event.preventDefault();
		var query = $("#q").val();
        $.post('/www/api/v9/api.php', { action: 'search', q: query, csrf_token: token  }, function(data) {
            console.log(data);
			var obj = JSON.parse(data);
			console.log(obj);
			token = obj.token;
			console.log(obj.token);
			alert(obj.data);
        });
  });
});
</script>
	
	
</head>
<body>
    <form action="/www/index.php" method="post" accept-charset="utf-8">
	
		<label for="q">Choose a car:</label>

		<select name="q" id="q">
		  <option value="volvo">Volvo</option>
		  <option value="saab">Saab</option>
		  <option value="mercedes">Mercedes</option>
		  <option value="audi">Audi</option>
		</select>
	
        <!--<input type="text" id="q" name="q" />-->
        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>" />
        <!--<input type="submit" id ="" value="Submit" />-->
		<button id="search">Get Something</button>
    </form>
</body>
</html>