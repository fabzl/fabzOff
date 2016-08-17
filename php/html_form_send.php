<?php
if(isset($_POST['email'])) {

	// CHANGE THE TWO LINES BELOW
	$email_to = "info@nullobject.org";

	$email_subject = "pre susbcription from nullobject.org";


	function died($error) {
		// your error code can go here
		echo "<h2 data-translatable>Lo sentimos //We are very sorry</h2><p class='description-text' data-translatable> Pero encontramos errores en el formulario. // But we found error(s) with the form you submitted.</p>";
		echo "<p data-translatable class='description-text'>Los errores aparecen abajo. // These errors appear below.</p>";
		echo $error."<br />";
		echo "<p class='description-text' data-translatable> Por favor arregla esos errores. // Please go back and fix these errors.</p>";
		die();
	}

	// validation expected data exists
	if(!isset($_POST['first_name']) ||
	   !isset($_POST['telephone']) ||
	   !isset($_POST['email']) ||
	   !isset($_POST['course'])) {
		died("<h2 data-translatable>Lo sentimos // We are really sorry</h2><p data-translatable class='description-text'>pero parece que hay un problema con tu formulario. // but there appears to be a problem with the form you submitted.</p>");
	}

	$first_name = $_POST['first_name']; // required
	$telephone = $_POST['telephone']; // required
	$email_from = $_POST['email']; // required
	$course = $_POST['course']; // required

	$error_message = "";
	$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
	if(!preg_match($email_exp,$email_from)) {
		$error_message .= "<p class='description-text' data-translatable>El correo ingresado no es valido. // The Email Address you entered does not appear to be valid.</p>";
	}
	$string_exp = "/^[A-Za-z .'-]+$/";
	if(!preg_match($string_exp,$first_name)) {
		$error_message .= "<p class='description-text' data-translatable>El nombre ingresado no es valido // The Name you entered does not appear to be valid.</p>";
	}
//	if(!preg_match($string_exp,$telephone)) {
//		$error_message .= "<p class='description-text'>The Last Name you entered does not appear to be valid.</p>";
//	}
	if(strlen($course) < 2) {
		$error_message .= "<p class='description-text'>The Course you entered do not appear to be valid.</p>";
	}
	if(strlen($error_message) > 0) {
		died($error_message);
	}
	$email_message = "La persona se ha identificado como :\n\n";

	function clean_string($string) {
		$bad = array("content-type","bcc:","to:","cc:","href");
		return str_replace($bad,"",$string);
	}

	$email_message .= "First Name: ".clean_string($first_name)."\n";
	$email_message .= "Telephone: ".clean_string($telephone)."\n";
	$email_message .= "Email: ".clean_string($email_from)."\n";
	$email_message .= "Course: ".clean_string($course)."\n";


// create email headers
	$headers = 'From: '.$email_from."\r\n".
	           'Reply-To: '.$email_from."\r\n" .
	           'X-Mailer: PHP/' . phpversion();
	$sent = mail($email_to, $email_subject, $email_message, $headers);

// check if mail function was executed without errors
	if($sent) { ?>
		<h2 data-translatable>Felicitaciones! // Congratulations!</h2>
		<p class='description-text' data-translatable>Ya estas pre-inscrito, pronto te contactaremos para revisar los detalles. // You are pre subscribed, we will contact you shortly </p>
		<p class='description-text' data-translatable>Muchas gracias // Many thanks </p>
	<?php
	} else {
		// otherwise deliver error message
		echo "<p class='description-text' data-translatable> Hubo un error al enviar tu mensaje, por favor intenta otra vez ! // There was an error to deliver your message, please try again!</p>";
	} 
}
