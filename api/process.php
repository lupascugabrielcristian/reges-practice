<?php
header('Content-Type: application/json');

// Allow CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Get the raw POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Process the message
$message = isset($data['message']) ? $data['message'] : '';
$response = array(
    'response' => 'You sent: ' . htmlspecialchars($message)
);

// Send response back
echo json_encode($response);
