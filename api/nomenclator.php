<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// HTTP headers sunt de tipul:
// Authorization:Bearer {{AuthToken}}
// Accept:application/json
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$authToken = $data['authToken'] ?? '';  
error_log(sprintf("Auth token received: %s \n" . $authToken,  date('Y-m-d H:i')));
$tip = $data['tip'] ?? '';
error_log(sprintf("tip received: | %s \n" . $tip,  date('Y-m-d H:i')));
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Accept: application/json'
];

$url = 'https://api.test.inspectiamuncii.org/api/Nomenclator?tip=' . $tip;

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);

error_log(sprintf("Response received: %o \n" . $response,  date('Y-m-d H:i')));

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
    ], true);
}
else {
    echo json_encode([
        'status' => 2000,
        'response' => $response,
        'error' => ''
    ], true);
}

curl_close($ch);

?>