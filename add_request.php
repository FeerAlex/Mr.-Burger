<?php 
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$street = $_POST['street'];
	$data = array();
	
	
	if ($name === '' || $phone === '') {
		$data['status'] = 'error';
		$data['text'] = 'Ошибка! Заполнены не все поля!';
	} else {
		$data['status'] = 'OK';
		$data['text'] = 'Ура! Заявка отправлена!';
	}
	header("Content-Type: application/json");
	echo json_encode($data);
	exit;
 ?>