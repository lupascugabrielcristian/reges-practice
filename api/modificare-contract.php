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

$field1 = $data['field1'] ?? '';
$field2 = $data['field2'] ?? '';

// JSON body
$body = [
    '$type' => 'contract',
    'header'=> [
      'messageId'=> '1365ecae-87c4-4b68-ab40-18c0ef0201bd',
      'clientApplication'=> 'SAP',
      'version'=> '5',
      'operation'=> 'ModificareContract',   // Asta este diferit fata de apelul adaugare contract
      'authorId'=> '232f7dfc-0c36-4c23-aea7-271415372cde',
      'sessionId'=> '4cb5fe70-4626-42f8-b278-0255e377b9ea',
      'user'=> 'practice_reges',
      'timestamp'=> '2024-06-18T14:19:58.917Z',
    ],
    'referintaContract' => [
        '$type' => 'referinta',
        'id' => '88951c68-9a01-41c3-b457-a4d040b44aa1' // Este necesar asta. Se obtine cu exportul din interfata web. Am facut un parser in /script
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
        'tipContract' => 'ContractIndividualMunca', // Tip (pagina 2)
        'tipDurata' => 'Nedeterminata', // Durata (pagina 2)
        'tipNorma' => 'NormaIntreaga', // Tip norma (pagina 3)
        'tipLocMunca' => 'Fix', // Loc de munca (pagina 3)
        'judetLocMunca' =>  'AG', // Judet loc de munca (pagina 3). Aparent localitatea nu se da din api :))
        'localitateLocMunca' => [
            'codSiruta' => 123905,     // Judetul loc munca va fi luat din codul asta. Nomenclator localitate
            'judetLocMunca' =>  'AG' // Fara asta nu merge, dar nici nu il in considerare pentru "Judet loc de munca" ci foloseste judetul localitatii cu codul dat
        ], // Loc de munca (pagina 3) Nomenclator: Localitate
        'stareCurenta' => [],   // Trimite o eroare de la server daca nu este adaugat
        'timpMunca' =>  [
            'norma' => 'NormaIntreaga840', // Durata timp munca (pagina 2)
            'durata' =>  5, // Numar ore (pagina 2)
            'intervalTimp' => 'OrePeZi', // Tip interval repartizare (pagina 2)
            'repartizare' => 'OreDeZi', // bifa de la pagina 2
            'repartizareMunca' => 'Zilnic', // Repartizare timp munca (pagina 2)
            'inceputInterval' => '2024-01-01T10:30:00.000', // De la ora (pagina 2)
            'sfarsitInterval' => '2024-01-01T18:30:00.000', // Pana la ora (pagina 2)
        ],
        'numarContract' => '9025', // Numar contract (pagina 3)
        'dataConsemnare' => '2025-11-01T14:19:58.917Z',      // Este obligatorie pentru moficare contract
        'dataInceputContract' => '2025-10-30T14:19:58.917Z', // Data inceput (pagina 3)
        'dataContract' => '2025-10-30T14:19:58.917Z', 
        'detaliiL153' => [
            // "clasificareSuplimentaraL153": "XX", 
            'functieL153' => '11.001XX001.01.1', // Functie/ocupatie (pagina 3)
            // "specialitateFunctieL153": "1",
            // "structuraAprobataL153": "2",
            // "specialitateStructuraAprobataL153" : "3",
            // "gradProfesionalL153": "4",
            // "gradatieL153": "5",
            // "denumireAltaFunctieL153":"Alta functie",
            // "explicatieFunctieL153": "Nu este in nomenclator",
            // "altGradProfesionalL153": "Alt grad profesional"
        ],
        'salariu' => 4800, // Salariu brut lunar (pagina 4)
        'nivelStudii' => 'MG', // Nivel studii post (pagina 3)
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