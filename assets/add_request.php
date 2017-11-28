<?php 
	$name		= $_POST['name'];
	$phone		= $_POST['phone'];
	$pay		= $_POST['pay'];
	$message	= $_POST['message'];
	$disturb	= $_POST['call'];

	$street		= $_POST['street'];
	$house		= $_POST['house'];
	$housing	= $_POST['housing'];
	$flat		= $_POST['flat'];
	$floor		= $_POST['floor'];

	$disturb	= isset($disturb) ? 'НЕТ' : 'ДА';
	$data		= array();

	if ($name === '' || $phone === '') {
		$data['status'] = 'error';
		$data['text'] = 'Заполните имя и телефон!';
	} else {
		$mail_message = '
		<html>
			<head>
				<title>Заявка</title>
			</head>
			<body>
				<h2>Заказ</h2>
				<ul>
					<li>Имя: ' . $name . '</li>
					<li>Телефон: ' . $phone . '</li>
					<li>Способ оплаты: ' . $pay . '</li>
					<li>Комментарии к заказу: ' . $message . '</li>
					<li>Нужно ли перезванивать клиенту: ' . $disturb . '</li>
				</ul>
				<h3>Дополнительные сведения:</h3>
				<ul>
					<li>Улица: ' . $street . '</li>
					<li>Дом: ' . $house . '</li>
					<li>Корпус: ' . $housing . '</li>
					<li>Квартира: ' . $flat . '</li>
					<li>Этаж: ' . $floor . '</li>
				</ul>
			</body>
		</html>    
		';

		$headers = "From: Администратор бургеров <pertik@list.ru>\r\n".
		"MIME-Version: 1.0" . "\r\n" .
		"Content-type: text/html; charset=UTF-8" . "\r\n";
	
		$mail = mail('pertik@list.ru', 'Заказ', $mail_message, $headers);

		if($mail) {
			$data['status'] = 'OK';
			$data['text'] = 'Заявка отправлена!';
		} else {
			$data['status'] = 'error';
			$data['text'] = 'Произошла ошибка при отправке!';
		}
	}

	echo json_encode($data);
 ?>