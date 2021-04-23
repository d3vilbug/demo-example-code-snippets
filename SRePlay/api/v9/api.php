<?php

session_start();

function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}

//header("Content-Type: application/json");

// Create a new CSRF token.
if (! isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = base64_encode(generateRandomString(32));
}

function genToken(){
	$_SESSION['csrf_token'] = base64_encode(generateRandomString(32));
	return $_SESSION['csrf_token'];
}

if (isset($_POST['csrf_token']) && $_POST['csrf_token'] === $_SESSION['csrf_token']) {
    // POST data is valid.
	unset($_SESSION['csrf_token']);
	$q = '';
	
	if(isset($_POST['q']) && !empty($_POST['q'])){
		$q = $_POST['q'];
	}
	
	$data = 'Select car';
	
	switch($q){
		case "volvo":
			$data = 'Volvo revolvo';
			break;
		case "saab":
			$data = 'Saab besaab';
			break;
		case "mercedes":
			$data = 'Mercedes ease';
			break;
		case "audi":
			$data = 'Audi body';
			break;
	}
	
	$res = array("success"=>true, "data"=>$data, "token"=>genToken());

} else {
	$res = array("success"=>false, "data"=>"Invalid Token");
}

echo json_encode($res);

?>