<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$url = 'https://sso.dev.inspectiamuncii.org/realms/API/protocol/openid-connect/token';

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Process the message
$userId = $data['userId'] ?? '';
$password = $data['password'] ?? '';  

// POST call to https://sso.dev.inspectiamuncii.org/realms/API/protocol/openid-connect/token with userId and password in body
$formData_au = [
  'grant_type' => 'password',
  'client_id' => 'reges-api',
  'username' => $userId,
  'client_secret' => 'FjtrYvDTGZKiyHGdSWymOvxhqifTJ7Em',
  'password' => $password
];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($formData_au));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if (curl_errno($ch)) 
{
    echo 'cURL Error: ' . $curl_error($ch);
    $error_msg = curl_error($ch);

    echo json_encode([
        'status' => 200,
        'response' => $response,
        'error' => $error_msg
    ]);
} 
else if ($response == '') 
{
    error_log('Response is empty');
    // Daca raspunsul este gol, inseamna ca status code arata ce eroare a fost
    $status_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    // echo json_encode(['status_code' => $status_code] );
    echo json_encode([
        'status' => $status_code, 
        'response' => '',
        'error' => ''
    ]);
}
else {
  echo json_encode($response);
}


curl_close($ch);

?>