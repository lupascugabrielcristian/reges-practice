<?php
// Path to the JSON file
// $jsonFile = __DIR__ . '/contracts.json';
$jsonFile = '/Users/lolarucker/Downloads/salariati.JSON';

// Check if the file exists
if (!file_exists($jsonFile)) {
  die("JSON file not found.");
}

// Read the JSON file
$jsonData = file_get_contents($jsonFile);

// Decode JSON to associative array
$data = json_decode($jsonData, true);

if (json_last_error() !== JSON_ERROR_NONE) {
  die("Error decoding JSON: " . json_last_error_msg());
}

// Loop through each contract and extract fields
foreach ($data as $contract) {
  // Example: Extract 'id' field
  $referinta = isset($contract['referintaSalariat']) ? $contract['referintaSalariat'] : 'N/A';
  $continut = $contract['info'];

  // Extract other fields as needed
  // $name = isset($contract['name']) ? $contract['name'] : 'N/A';

  echo "=======================================" . PHP_EOL;
  echo "Salariat ID: " . htmlspecialchars($referinta['id']) . PHP_EOL;
  echo "Nume: " . $continut['nume'] . ' ' . $continut['prenume'] . PHP_EOL;
  echo "CNP: " . $continut['cnp'] . PHP_EOL;
  // echo "Name: " . htmlspecialchars($name) . PHP_EOL;
  // Add more fields as needed
  echo "=======================================" . PHP_EOL . PHP_EOL;
}
?>