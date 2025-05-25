<?php
header('Content-Type: application/json');

function buscarDNI($dni) {
    $token = 'apis-token-12693.sjLj3f3GLyB6QfsGE6WfZQLTv7tP2Cpg';

    $curl = curl_init();

    curl_setopt_array($curl, array(
        CURLOPT_URL => 'https://api.apis.net.pe/v2/reniec/dni?numero=' . $dni,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => 0,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 2,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_CUSTOMREQUEST => 'GET',
        CURLOPT_HTTPHEADER => array(
            'Referer: https://apis.net.pe/consulta-dni-api',
            'Authorization: Bearer ' . $token
        ),
    ));

    $response = curl_exec($curl);
    curl_close($curl);
    
    // Convertir respuesta a JSON
    $persona = json_decode($response, true);

    if (!$persona) {
        echo json_encode(["error" => "No se encontró el DNI"]);
    } else {
        echo json_encode($persona);
    }
}

// Obtener el DNI desde los arguments de línea de comandos
$dni = $argv[1] ?? null;

if ($dni) {
    buscarDNI($dni);
} else {
    echo json_encode(["error" => "DNI no proporcionado"]);
}
