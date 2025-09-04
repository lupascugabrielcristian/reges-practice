<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Process the message
$userId = $data['userId'] ?? '';
$password = $data['password'] ?? '';  

// POST call to https://sso.dev.inspectiamuncii.org/realms/API/protocol/openid-connect/token with userId and password in body
$formData = [
  'grant_type' => 'password',
  'client_id' => 'reges-api',
  'username' => $userId,
  'client_secret' => 'FjtrYvDTGZKiyHGdSWymOvxhqifTJ7Em',
  'password' => $password
];
error_log("Payload: " . json_encode($formData));

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://sso.dev.inspectiamuncii.org/realms/API/protocol/openid-connect/token');
// Set the cURL options
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Execute the POST request
$response = curl_exec($ch);

// error_log("Response: " . $response);

// Asa dau tot raspunsul
// echo json_encode($response);
echo json_encode($response);

curl_close($ch);

