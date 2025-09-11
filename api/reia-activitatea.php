<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$url = 'https://api.test.inspectiamuncii.org/api/Contract';

// HTTP headers sunt de tipul:
// Authorization:Bearer {{AuthToken}}
// Accept:application/json
$json = file_get_contents('php://input');
$data = json_decode($json, true);
$authToken = $data['authToken'] ?? '';
// error_log(sprintf("Auth token received: %s \n" . $authToken,  date('Y-m-d H:i')));
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Accept: */*',
    'Content-Type: application/json',
];

$contractId = $data['field1'] ?? '';

// JSON body
$body = [
    '$type' => 'contract',
    'header'=> [
      'messageId'=> '1365ecae-87c4-4b68-ab40-18c0ef0201bd',
      'clientApplication'=> 'SAP',
      'version'=> '5',
      'operation'=> 'AnulareSuspendareContract',   // Asta este diferit fata de apelul adaugare contract
      'authorId'=> '232f7dfc-0c36-4c23-aea7-271415372cde',
      'sessionId'=> '4cb5fe70-4626-42f8-b278-0255e377b9ea',
      'user'=> 'practice_reges',
      'timestamp'=> '2024-06-18T14:19:58.917Z',
    ],
    'referintaContract' => [
        '$type' => 'referinta',
        'id' => $contractId // Este necesar asta. Se obtine cu exportul din interfata web. Am facut un parser in /script
    ],
    // 'documentJustificativ' => [
    //     'tipDocumentJustificativ' => 'HotarareJudecatoreasca',
    //     'numarDocumentJustificativ' => 'HJ12345',
    //     'dataDocumentJustificativ' => '2024-11-27T12:00:00'
    // ]
];
$jsonData = json_encode($body, JSON_FORCE_OBJECT); // Parametrul JSON_FORCE_OBJECT, pentru a transforma stareCurenta in {} in loc de []


$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

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
    ], true);
}
else {
    echo json_encode([
        'status' => curl_getinfo($ch, CURLINFO_HTTP_CODE),
        'response' => $response,
        'error' => ''
    ], true);
}

curl_close($ch);

?>