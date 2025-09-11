<?php
// Path to the JSON file
// $jsonFile = __DIR__ . '/contracts.json';
$jsonFile = '/Users/lolarucker/Downloads/contracte.json';

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
  $referintaContract = isset($contract['referintaContract']) ? $contract['referintaContract'] : 'N/A';
  $continut = $contract['continut'];
  $infoSalariat = $continut['infoSalariat'];

  // Extract other fields as needed
  // $name = isset($contract['name']) ? $contract['name'] : 'N/A';

  echo "=======================================" . PHP_EOL;
  echo "Contract ID: " . htmlspecialchars($referintaContract['id']) . PHP_EOL;
  echo "Numar contract: " . htmlspecialchars($continut['numarContract']) . PHP_EOL;
  echo "Nume: " . $infoSalariat['nume'] . ' ' . $infoSalariat['prenume'] . PHP_EOL;
  echo "CNP: " . $infoSalariat['cnp'] . PHP_EOL;
  // echo "Name: " . htmlspecialchars($name) . PHP_EOL;
  // Add more fields as needed
  echo "=======================================" . PHP_EOL . PHP_EOL;
}
?>