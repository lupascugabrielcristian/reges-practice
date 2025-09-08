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
error_log(sprintf("Auth token received: %s \n" . $authToken,  date('Y-m-d H:i')));
$headers = [
    'Authorization: Bearer ' . $authToken,
    'Accept: */*',
    'Content-Type: application/json',
];

// JSON body
$body = '{
  "$type" : "contract",
  "header": {
    "messageId": "117f9b03-9efb-4f5a-8ebb-7ab3b0c792ae",
    "clientApplication": "SAP",
    "version": "5",
    "operation": "AdaugareContract",
    "authorId": "232f7dfc-0c36-4c23-aea7-271415372cde",
    "sessionId": "117f9b04-9efb-4f5e-8ebb-7ab3b0c792cf",
    "user": "ion",
    "timestamp": "2024-06-18T14:19:58.917Z"
  },
  "continut": {
    "$type": "continutContract",
    "referintaSalariat": {
        "$type" : "referinta",
        "id": "166a4935-e219-432d-aae1-5edea0cbf672"
    },
    "cor": {
        "cod":251204,
        "versiune":10
    },
    "dataConsemnare":"2024-06-18T14:19:58.917Z",
    "dataContract":"2024-10-30T14:19:58.917Z",
    "dataInceputContract":"2024-10-30T14:19:58.917Z",
    "exceptieDataSfarsit": "Art83LitH",
    "numarContract":"9022",
    "radiat":false,
    "salariu":4000,
    "salariuValuta":800,
    "moneda": "EUR",
    "nivelStudii":"MG",
    "sporuriSalariu": [
        {
            "isProcent": true,
            "valoare": 2100,
            "tip": {
                "$type" : "spor",
                "referinta": {
                    "$type" : "referinta",
                    "id": "7178F5A4-687F-4DA7-928C-1395EC531879"
                },                
                "nume" : "Salariu de merit"
            }
        },
        {
            "isProcent": false,
            "valoare": 1000,
            "moneda":"EUR",
            "tip": {
                "$type" : "sporAngajator",
                "referinta": {
                    "$type" : "referinta",
                    "id": "30195246-89CE-4E33-AC15-F4E8628CAB4D"
                },
                "nume" : "Salariu de merit angajator"
            }
        }
    ],
    "stareCurenta": {},
    "timpMunca": {
        "norma":"NormaIntreaga840",
        "durata": 8,
        "intervalTimp":"OrePeZi",
        "repartizare":"OreDeZi",
        "repartizareMunca":"Zilnic",
        "inceputInterval":"2024-01-01T10:30:00.000",
        "sfarsitInterval":"2024-01-01T18:30:00.000",
        "notaRepartizareMunca": "Miercuri vine de la 12:00",
        "tipTura": "Alta",
        "observatiiTipTuraAlta": "Program flexibil"        
    },
    "tipContract":"ContractIndividualMunca",
    "tipDurata":"Nedeterminata",
    "tipNorma":"NormaIntreaga",
    "tipLocMunca": "Mobil",
    "judetLocMunca": "AG",
    "aplicaL153": true,
    "detaliiL153": {
        "anexaL153": "1",
        "capitolL153": "1.0",
        "literaL153": "01",
        "clasificareSuplimentaraL153": "XX",
        "functieL153": "11.001XX001.01.1",
        "specialitateFunctieL153": "1",
        "structuraAprobataL153": "2",
        "specialitateStructuraAprobataL153" : "3",
        "gradProfesionalL153": "4",
        "gradatieL153": "5",
        "denumireAltaFunctieL153":"Alta functie",
        "explicatieFunctieL153": "Nu este in nomenclator",
        "altGradProfesionalL153": "Alt grad profesional"
    }
  }
}';
// $jsonData = json_encode($formData_ac);

// suprascriu cu ce vine din request
$field1 = $data['field1'] ?? '';
$field2 = $data['field2'] ?? '';

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
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
        'status' => 2000,
        'response' => $response,
        'error' => ''
    ], true);
}

curl_close($ch);

?>