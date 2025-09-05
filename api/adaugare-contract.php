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
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Content-Type: application/json',
];

$formData = [
    '$type' => 'contract',
    'header' => [
        'messageId' => '117f9b03-9efb-4f5a-8ebb-7ab3b0c792ae',
        'clientApplication' => 'SAP',
        'version' => '5',
        'operation' => 'AdaugareContract',
        'authorId' => '232f7dfc-0c36-4c23-aea7-271415372cde',
        'sessionId' => '117f9b04-9efb-4f5e-8ebb-7ab3b0c792cf',
        'user' => 'ion',
        'timestamp' => '2024-06-18T14:19:58.917Z'
    ],
    'continut' => [
        '$type' => 'continutContract',
        'referintaSalariat' => [
            '$type' => 'referinta',
            'id' => '166a4935-e219-432d-aae1-5edea0cbf672'
        ],
        'cor' => [
            'cod' => 251204,
            'versiune' => 10
        ],
        'dataConsemnare' => '2024-06-18T14:19:58.917Z',
        'dataContract' => '2024-10-30T14:19:58.917Z',
        'dataInceputContract' => '2024-10-30T14:19:58.917Z',
        'exceptieDataSfarsit' => 'Art83LitH',
        'numarContract' => '9022',
        'radiat' => false,
        'salariu' => 4800,
        'salariuValuta' => 800,
        'moneda' => 'EUR',
        'nivelStudii' => 'MG',
        'stareCurenta' => [],
        'timpMunca' => [
            'norma' => 'NormaIntreaga840',
            'durata' => 8,
            'intervalTimp' => 'OrePeZi',
            'repartizare' => 'OreDeZi',
            'repartizareMunca' => 'Zilnic',
            'inceputInterval' => '2024-01-01T10:30:00.000',
            'sfarsitInterval' => '2024-01-01T18:30:00.000',
            'notaRepartizareMunca' => 'Miercuri vine de la 12:00',
            'tipTura' => 'Alta',
            'observatiiTipTuraAlta' => 'Program flexibil'        
        ],
        'tipContract' => 'ContractIndividualMunca',
        'tipDurata' => 'Nedeterminata',
        'tipNorma' => 'NormaIntreaga',
        'tipLocMunca' => 'Mobil',
        'judetLocMunca' => 'AG',
        'aplicaL153' => true,
        'detaliiL153' => [
            'anexaL153' => '1',
            'capitolL153' => '1.0',
            'literaL153' => '01',
            'clasificareSuplimentaraL153' => 'XX',
            'functieL153' => '11.001XX001.01.1',
            'specialitateFunctieL153' => '1',
            'structuraAprobataL153' => '2',
            'specialitateStructuraAprobataL153' => '3',
            'gradProfesionalL153' => '4',
            'gradatieL153' => '5',
            'denumireAltaFunctieL153' => 'Alta functie',
            'explicatieFunctieL153' => 'Nu este in nomenclator',
            'altGradProfesionalL153' => 'Alt grad profesional'
        ]
    ]
];
$jsonData = json_encode($formData);

// suprascriu cu ce vine din request
$field1 = $data['field1'] ?? '';
$field2 = $data['field2'] ?? '';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
$error_msg = curl_error($ch);

curl_close($ch);

if (curl_errno($ch)) 
{
    echo 'cURL Error: ' . $error_msg;
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
    error_log('call ok: ' . json_encode($response) );
    echo json_encode([
        'status' => 2000,
        'response' => $response,
        'error' => ''
    ]);
}

?>