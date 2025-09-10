<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$url = 'https://api.test.inspectiamuncii.org/api/Salariat';

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

$prenume = $data['field5'] ?? '';
// $field4 = $data['field4'] ?? '';

// JSON body
$body = [
    '$type' => 'salariat',
    'header'=> [
      'messageId'=> '1365ecae-87c4-4b68-ab40-18c0ef0201bd',
      'clientApplication'=> 'SAP',
      'version'=> '5',
      'operation'=> 'ModificareSalariat',
      'authorId'=> '232f7dfc-0c36-4c23-aea7-271415372cde',
      'sessionId'=> '4cb5fe70-4626-42f8-b278-0255e377b9ea',
      'user'=> 'practice_reges',
      'timestamp'=> '2024-06-18T14:19:58.917Z',
    ],
    'referintaSalariat' => [
      'id' => 'f8495596-e9c3-4a60-98fe-1b3679cbeb6c'
    ],
    'info' => [
        'nume' =>  'Mihai', // Nume (pagina 1)
        'prenume' =>  $prenume, // Prenume (pagina 1)
        'nationalitate' =>  [
            'nume' => 'România' // Trebuie neaparat sa fie cu â
        ], // Cetatenia (pagina 1)
        'tipActIdentitate' => 'Pasaport', // Tip act de identitat (pagina 1)
        'cnp' => '1880924270070', // CNP/NIF/Altul  (pagina 1) - Toate pare ca sunt puse la cnp
        'dataNastere' => '1990-06-15T00:00:00', // Data nastere (pagina 1) 
        'gradHandicap' => 'Fara', // Grad handicap (pagina 1)
        'taraDomiciliu' => [
            'nume' => 'România'
        ], // Tara domiciliu/resedinta (pagina 2)
        // Judet nu l-am gasit in API. Posibil sa il ia din coduul localitatii
        'adresa' =>  'STR. SALARIATULUI, NR. 1', // Adresa de domiciliu (pagina 2)
        'localitate' => [
            'codSiruta' => 6137
        ],
    ],
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