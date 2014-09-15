<?php
 
function send_mail() {

	require_once "../lib/phpmailer/class.phpmailer.php";


	$text = "  
		<body>
			<div>
				<div style='color: #07e; font-weight: bold; font-size: 14px;'>HTML код</div>
				<div style='margin-bottom: 40px;'>".htmlspecialchars($_POST["codeHTML"])."</div>
				<div style='color: #c12; font-weight: bold; font-size: 14px;'>CSS код</div>
				<div>".$_POST["codeCSS"]."</div>
			</div>
		</body>
	";
	$mail = new PHPMailer();

	$mail->IsSMTP();
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'ssl';
	$mail->Host = "smtp.gmail.com";
	$mail->Port = 465;
	$mail->CharSet = "utf-8";

	$mail->Username = "denntroot@gmail.com";
	$mail->Password = "password";
	$mail->SetFrom("denntroot@gmail.com", "Денис");
	$mail->Subject = "CSS3 Button Code";
	$mail->MsgHTML($text);
	$mail->AddAddress($_POST['email'], "Натрову Денису");

	if (!$mail->Send()) {
		return "Не получилось!";
	} else {
		return "Письмо успешно отправлено!";
	}
 	
}

echo send_mail();