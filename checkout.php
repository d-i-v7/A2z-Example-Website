<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $amount = $_POST['amount'];
    $account = $_POST['account'];
    $return_url = 'http://' . $_SERVER['HTTP_HOST'] . '/checkout-success.html';

    $apiUrl = 'https://api.sifalopay.com/gateway/';
    $apiUsername = 'Affans7xE';
    $apiPassword = '4433027d7ff06a93b05ada61eb69b8ed99ca67ea';
    
    $postData = array(
        'amount' => $amount,
        'gateway' => 'checkout',
        'currency' => 'USD',
        'return_url' => $return_url
    );

    $options = array(
        'http' => array(
            'header' => "Content-Type: application/json\r\n" .
                        "Authorization: Basic " . base64_encode("$apiUsername:$apiPassword") . "\r\n",
            'method' => 'POST',
            'content' => json_encode($postData),
            'timeout' => 60 // Timeout in seconds
        )
    );

    $context = stream_context_create($options);
    $response = file_get_contents($apiUrl, false, $context);

    if ($response === FALSE) {
        die('Error initiating checkout.');
    }

    $responseData = json_decode($response, true);

    if (isset($responseData['key']) && isset($responseData['token'])) {
        $key = $responseData['key'];
        $token = $responseData['token'];
        $checkoutUrl = "https://pay.sifalo.com/checkout/?key=$key&token=$token";
        header("Location: $checkoutUrl");
        exit();
    } else {
        echo "Error initiating checkout: " . json_encode($responseData);
    }
}
?>
