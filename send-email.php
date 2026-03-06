<?php
/**
 * Aquatronic - Contact Form Handler
 * Simple PHP script to send contact form data to comercial@aquatronic.com.br
 */

// Allow CORS (Adjust if needed for production)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(["message" => "Dados inválidos."]);
        exit;
    }

    // Sanitize inputs
    $firstName = filter_var($data['firstName'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $lastName  = filter_var($data['lastName'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $email     = filter_var($data['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $whatsapp  = filter_var($data['whatsapp'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $subject   = filter_var($data['subject'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $message   = filter_var($data['message'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);

    $fullName = trim($firstName . ' ' . $lastName);

    // Email recipient
    $to = "comercial@aquatronic.com.br";
    
    // Email subject
    $email_subject = "Contato Site Aquatronic: " . $subject;

    // Email body
    $email_body = "Você recebeu uma nova mensagem do formulário de contato do site.\n\n";
    $email_body .= "Nome: $fullName\n";
    $email_body .= "E-mail: $email\n";
    $email_body .= "WhatsApp: $whatsapp\n";
    $email_body .= "Assunto: $subject\n";
    $email_body .= "Mensagem:\n$message\n";

    // Email headers
    $headers = "From: no-reply@aquatronic.com.br\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Send email
    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode(["success" => true, "message" => "Mensagem enviada com sucesso!"]);
    } else {
        http_response_code(500);
        echo json_encode(["success" => false, "message" => "Ocorreu um erro ao enviar a mensagem."]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido."]);
}
?>
