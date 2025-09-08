<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// api/Status/ReadMessage
$url = 'https://api.test.inspectiamuncii.org/api/Status/ReadMessage';


$json = file_get_contents('php://input');
$data = json_decode($json, true);
$authToken = $data['authToken'] ?? '';
error_log(sprintf("Auth token received: %s \n" . $authToken,  date('Y-m-d H:i')));
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Accept: */*',
    'Content-Type: application/json',
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);


$response = curl_exec($ch);


 // = RASPUNS ===========================================

$status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
echo json_encode([
    'status' => $status_code, 
    'response' => $response,
    'error' => ''
], true);

curl_close($ch);

?>