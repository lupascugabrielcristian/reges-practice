<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$url = 'https://api.test.inspectiamuncii.org/api/Profile';

// HTTP headers sunt de tipul:
// Authorization:Bearer {{AuthToken}}
// Accept:application/json
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$authToken = $data['authToken'] ?? '';  
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Accept: application/json'
];

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

curl_close($ch);

// error_log("Response: " . json_encode($response) );

if (curl_errno($ch)) 
{
    echo "cURL Error: " . $error_msg;
    $error_msg = curl_error($ch);
    echo json_encode(['error' => $error_msg]);
} 
else if ($response == '') 
{
    // Daca raspunsul este gol, inseamna ca status code arata ce eroare a fost
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    echo json_encode(['status_code' => $status_code] );
}
else {
    echo json_encode($response);
}

?>