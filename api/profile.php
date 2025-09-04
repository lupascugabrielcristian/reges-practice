<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// De aici
// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Process the message
$authToken = $data['authToken'] ?? '';  

$url = 'https://api.test.inspectiamuncii.org/api/Profile';

// Replace this with your actual Bearer token.
// $bearerToken = 'your_bearer_token_here';

// 2. Initialize cURL session
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Set the HTTP headers, including the Authorization header with the Bearer token
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Accept: application/json'
];
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

// 4. Execute the cURL request
$response = curl_exec($ch);

echo json_encode($response);

curl_close($ch);

error_log("Response: " . json_encode($response) );

?>