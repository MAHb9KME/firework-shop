<?
	include $_SERVER['DOCUMENT_ROOT'].'/wp-load.php';
	
	$headers[] = 'content-type: text/html';
	
	$name = xs_format($_POST['xs_name']);
	$phone = xs_format($_POST['xs_phone']);
	$send_it = xs_format($_POST['send_it']);
	$xs_theme = xs_format($_POST['xs_theme']);
	$link = xs_format($_POST['xs_link']);
	$email = xs_format($_POST['xs_email']);
	$data = $_POST['data'];

	if($send_it == 'y')
	{
		if(!empty($phone))
		{
			$message = "<table border='1px' cellspasing='0' cellpadding='5px'>";

			$message .= "<tr><td>Имя</td><td>".$name."</td><tr>";
			$message .= "<tr><td>Телефон</td><td>".$phone."</td><tr>";
			$message .= "<tr><td>Тема обращения</td><td>".$xs_theme."</td><tr>";
			$message .= "<tr><td>Страница, с которой отправлено</td><td><a href='".$link."'>".$link."</a></td><tr>";
			
			if(!empty($email))
				$message .= "<tr><td>Email</td><td>".$email."</td><tr>";

			if(count($data) > 0)
			{
				foreach($data as $key => $val)
				{
					$message .= "<tr><td>".xs_format($key)."</td><td>".xs_format($val)."</td><tr>";
				}
			}
			
			$message .= "</table><br/>";
			
			if(empty($xs_theme))
				$xs_theme = 'Заявка с сайта бизнес сайта';
			
			$result = wp_mail("alexey@simanov.pro", $xs_theme, $message, $headers); 
			//$result = wp_mail("agrika-nn@yandex.ru", $xs_theme, $message, $headers); 
			
			if($result) 
				echo "<p class='good'><br/>Ваша заявка успешно сформирована. В ближайшее время с Вами свяжется наш менеджер для уточнения деталей. Спасибо за Ваше обращение!<br/><br/></p>";
			else 
				echo 'error';
		}
		else
			echo 'error';
	}
	
?>