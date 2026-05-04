<?php
/**
 * Aquatronic - Contact Form Handler
 * Envia dados do formulário de simulação para vini.webd@gmail.com
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método não permitido']);
    exit();
}

// Get JSON data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit();
}

// Extract and sanitize form fields
$nome = isset($data['nome']) ? filter_var(trim($data['nome']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$telefone = isset($data['telefone']) ? filter_var(trim($data['telefone']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$email = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$estado = isset($data['estado']) ? filter_var(trim($data['estado']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$cidade = isset($data['cidade']) ? filter_var(trim($data['cidade']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$tipoServico = isset($data['tipoServico']) ? filter_var(trim($data['tipoServico']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$tipoAplicacao = isset($data['tipoAplicacao']) ? filter_var(trim($data['tipoAplicacao']), FILTER_SANITIZE_SPECIAL_CHARS) : '';

// Optional fields
$volumePiscina = isset($data['volumePiscina']) ? filter_var(trim($data['volumePiscina']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$termica = isset($data['termica']) ? filter_var(trim($data['termica']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$coberta = isset($data['coberta']) ? filter_var(trim($data['coberta']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$externa = isset($data['externa']) ? filter_var(trim($data['externa']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$marcaCloro = isset($data['marcaCloro']) ? filter_var(trim($data['marcaCloro']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$quantidadeCloro = isset($data['quantidadeCloro']) ? filter_var(trim($data['quantidadeCloro']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$tempoFiltragem = isset($data['tempoFiltragem']) ? filter_var(trim($data['tempoFiltragem']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$vazao = isset($data['vazao']) ? filter_var(trim($data['vazao']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$tempoBomba = isset($data['tempoBomba']) ? filter_var(trim($data['tempoBomba']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$tratamentoAtual = isset($data['tratamentoAtual']) ? filter_var(trim($data['tratamentoAtual']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$quantidadeInsumo = isset($data['quantidadeInsumo']) ? filter_var(trim($data['quantidadeInsumo']), FILTER_SANITIZE_SPECIAL_CHARS) : '';

// UTM Parameters (Marketing tracking)
$utm_source = isset($data['utm_source']) ? filter_var(trim($data['utm_source']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$utm_medium = isset($data['utm_medium']) ? filter_var(trim($data['utm_medium']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$utm_campaign = isset($data['utm_campaign']) ? filter_var(trim($data['utm_campaign']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$utm_content = isset($data['utm_content']) ? filter_var(trim($data['utm_content']), FILTER_SANITIZE_SPECIAL_CHARS) : '';
$utm_term = isset($data['utm_term']) ? filter_var(trim($data['utm_term']), FILTER_SANITIZE_SPECIAL_CHARS) : '';

// Validate required fields
if (empty($nome) || empty($email) || empty($telefone) || empty($estado) || empty($cidade) || empty($tipoServico) || empty($tipoAplicacao)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Preencha todos os campos obrigatórios']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'E-mail inválido']);
    exit();
}

// Map service types to labels
$tipoServicoLabels = [
    'compra-equipamento' => 'Compra de Equipamento',
    'manutencao' => 'Manutenção Técnica',
    'locacao' => 'Locação de Equipamentos',
    'suporte-treinamento' => 'Suporte e Treinamento',
    'consultoria' => 'Consultoria em Projetos',
    'outro' => 'Outro serviço'
];

$tipoAplicacaoLabels = [
    'piscina' => 'Piscina',
    'eta-ete' => 'ETA/ETE'
];

$tipoServicoLabel = isset($tipoServicoLabels[$tipoServico]) ? $tipoServicoLabels[$tipoServico] : $tipoServico;
$tipoAplicacaoLabel = isset($tipoAplicacaoLabels[$tipoAplicacao]) ? $tipoAplicacaoLabels[$tipoAplicacao] : $tipoAplicacao;

// Build HTML email
$emailHTML = '
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Novo Contato - Aquatronic</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, \'Helvetica Neue\', Arial, sans-serif; background-color: #f5f5f5;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">

                    <!-- Header com Logo e Gradiente -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #006ba3 0%, #00a0e3 100%); padding: 40px 30px; text-align: center;">
                            <img src="https://aquatronic.com.br/images/logo-aquatronic-branco.png" alt="Aquatronic" style="height: 40px; width: auto; margin-bottom: 16px;">
                            <h1 style="color: #ffffff; font-size: 24px; margin: 0; font-weight: 600;">Novo Contato Recebido</h1>
                            <p style="color: rgba(255,255,255,0.9); font-size: 14px; margin: 8px 0 0 0;">Formulário de Simulação</p>
                        </td>
                    </tr>

                    <!-- Dados de Contato -->
                    <tr>
                        <td style="padding: 30px;">
                            <h2 style="color: #006ba3; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
                                Dados de Contato
                            </h2>

                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #00a0e3; margin-bottom: 8px;">
                                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Nome</div>
                                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($nome) . '</div>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #00a0e3;">
                                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">E-mail</div>
                                        <div style="font-size: 16px; color: #1e2d3b;">
                                            <a href="mailto:' . htmlspecialchars($email) . '" style="color: #0080c0; text-decoration: none;">' . htmlspecialchars($email) . '</a>
                                        </div>
                                    </td>
                                </tr>
                                <tr><td style="height: 8px;"></td></tr>
                                <tr>
                                    <td>
                                        <table width="100%" cellpadding="0" cellspacing="0">
                                            <tr>
                                                <td width="49%" style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #00a0e3;">
                                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Telefone</div>
                                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($telefone) . '</div>
                                                </td>
                                                <td width="2%"></td>
                                                <td width="49%" style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #00a0e3;">
                                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Localização</div>
                                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($cidade) . ' - ' . htmlspecialchars($estado) . '</div>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Informações do Serviço -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #006ba3; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
                                Informações do Serviço
                            </h2>

                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td width="49%" style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #00a0e3;">
                                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Tipo de Serviço</div>
                                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($tipoServicoLabel) . '</div>
                                    </td>
                                    <td width="2%"></td>
                                    <td width="49%" style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #00a0e3;">
                                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Tipo de Aplicação</div>
                                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($tipoAplicacaoLabel) . '</div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>';

// Add pool-specific fields
if ($tipoAplicacao === 'piscina' && ($volumePiscina || $termica || $coberta || $externa || $marcaCloro || $quantidadeCloro || $tempoFiltragem)) {
    $emailHTML .= '
    <tr>
        <td style="padding: 0 30px 30px 30px;">
            <h2 style="color: #006ba3; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
                Detalhes da Piscina
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0">';

    if ($volumePiscina) {
        $emailHTML .= '
                <tr>
                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0; margin-bottom: 8px;">
                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Volume</div>
                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($volumePiscina) . ' m³</div>
                    </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>';
    }

    if ($termica || $coberta || $externa) {
        $emailHTML .= '
                <tr>
                    <td>
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>';

        $count = 0;
        if ($termica) {
            $emailHTML .= '
                                <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Térmica</div>
                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . ($termica === 'sim' ? 'Sim ✓' : 'Não') . '</div>
                                </td>';
            $count++;
            if ($coberta || $externa) $emailHTML .= '<td width="2%"></td>';
        }
        if ($coberta) {
            $emailHTML .= '
                                <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Coberta</div>
                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . ($coberta === 'sim' ? 'Sim ✓' : 'Não') . '</div>
                                </td>';
            $count++;
            if ($externa) $emailHTML .= '<td width="2%"></td>';
        }
        if ($externa) {
            $emailHTML .= '
                                <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Externa</div>
                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . ($externa === 'sim' ? 'Sim ✓' : 'Não') . '</div>
                                </td>';
        }

        $emailHTML .= '
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>';
    }

    if ($marcaCloro) {
        $emailHTML .= '
                <tr>
                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Marca de Cloro Atual</div>
                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($marcaCloro) . '</div>
                    </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>';
    }

    if ($quantidadeCloro) {
        $emailHTML .= '
                <tr>
                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Quantidade de Cloro/Dia</div>
                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($quantidadeCloro) . '</div>
                    </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>';
    }

    if ($tempoFiltragem) {
        $emailHTML .= '
                <tr>
                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Tempo de Filtragem</div>
                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($tempoFiltragem) . '</div>
                    </td>
                </tr>';
    }

    $emailHTML .= '
            </table>
        </td>
    </tr>';
}

// Add ETA/ETE-specific fields
if ($tipoAplicacao === 'eta-ete' && ($vazao || $tempoBomba || $tratamentoAtual || $quantidadeInsumo)) {
    $emailHTML .= '
    <tr>
        <td style="padding: 0 30px 30px 30px;">
            <h2 style="color: #006ba3; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
                Detalhes ETA/ETE
            </h2>
            <table width="100%" cellpadding="0" cellspacing="0">';

    if ($vazao || $tempoBomba) {
        $emailHTML .= '
                <tr>
                    <td>
                        <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>';
        if ($vazao) {
            $emailHTML .= '
                                <td width="49%" style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Vazão</div>
                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($vazao) . ' m³</div>
                                </td>';
            if ($tempoBomba) $emailHTML .= '<td width="2%"></td>';
        }
        if ($tempoBomba) {
            $emailHTML .= '
                                <td width="49%" style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                                    <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Tempo de Bomba</div>
                                    <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($tempoBomba) . ' horas/dia</div>
                                </td>';
        }
        $emailHTML .= '
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>';
    }

    if ($tratamentoAtual) {
        $emailHTML .= '
                <tr>
                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Tratamento Atual</div>
                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($tratamentoAtual) . '</div>
                    </td>
                </tr>
                <tr><td style="height: 8px;"></td></tr>';
    }

    if ($quantidadeInsumo) {
        $emailHTML .= '
                <tr>
                    <td style="padding: 12px; background-color: #f8fbff; border-left: 3px solid #4dbef0;">
                        <div style="font-size: 11px; color: #006ba3; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Quantidade de Insumo/Dia</div>
                        <div style="font-size: 16px; color: #1e2d3b; font-weight: 500;">' . htmlspecialchars($quantidadeInsumo) . '</div>
                    </td>
                </tr>';
    }

    $emailHTML .= '
            </table>
        </td>
    </tr>';
}

// Add UTM tracking section if any UTM is present
if ($utm_source || $utm_medium || $utm_campaign || $utm_content || $utm_term) {
    $emailHTML .= '
                    <!-- UTM Tracking -->
                    <tr>
                        <td style="padding: 0 30px 30px 30px;">
                            <h2 style="color: #006ba3; font-size: 18px; margin: 0 0 20px 0; font-weight: 600; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">
                                Rastreamento de Origem (UTMs)
                            </h2>
                            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fff7ed; border: 1px solid #fed7aa; border-radius: 8px; padding: 16px;">
                                <tr>
                                    <td style="padding: 0;">';

    $utmItems = [];
    if ($utm_source) $utmItems[] = '<strong>Origem:</strong> ' . htmlspecialchars($utm_source);
    if ($utm_medium) $utmItems[] = '<strong>Meio:</strong> ' . htmlspecialchars($utm_medium);
    if ($utm_campaign) $utmItems[] = '<strong>Campanha:</strong> ' . htmlspecialchars($utm_campaign);
    if ($utm_content) $utmItems[] = '<strong>Conteúdo:</strong> ' . htmlspecialchars($utm_content);
    if ($utm_term) $utmItems[] = '<strong>Termo:</strong> ' . htmlspecialchars($utm_term);

    $emailHTML .= '
                                        <div style="font-size: 13px; color: #92400e; line-height: 1.8;">
                                            ' . implode(' • ', $utmItems) . '
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>';
}

$emailHTML .= '
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f8fbff; padding: 20px 30px; text-align: center; border-top: 1px solid #e0f2fe;">
                            <p style="margin: 0; font-size: 12px; color: #6b8399; line-height: 1.5;">
                                Este e-mail foi enviado através do formulário de contato do site <strong>Aquatronic</strong><br>
                                Recebido em <strong>' . date('d/m/Y \à\s H:i:s') . '</strong>
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>';

// Email configuration
$to = 'comercial@aquatronic.com.br';
$subject = "Novo Contato - $nome - $tipoServicoLabel";

// Important: Set friendly "From" name
$headers = "From: Contato Site Aquatronic <noreply@aquatronic.com.br>\r\n";
$headers .= "Reply-To: $nome <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
$success = mail($to, $subject, $emailHTML, $headers);

if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'E-mail enviado com sucesso!'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Erro ao enviar e-mail. Por favor, tente novamente.'
    ]);
}
