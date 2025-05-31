<?php
session_start();
include './../../db_connect.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

if ($method === 'POST') {
    $action = $input['action'] ?? '';

    if ($action === 'login') {
        $email = $input['email'] ?? '';
        $password = $input['password'] ?? '';

        $stmt = $conn->prepare("SELECT user_id, password, fname, lname, user_flags, email FROM users WHERE email = ?");
        $stmt->bind_param('s', $email);

        if (!$stmt->execute()) {
            echo json_encode(["success" => false, "message" => "Database error: " . $stmt->error]);
        } else {
            $result = $stmt->get_result();
            if ($result->num_rows === 1) {
                $user = $result->fetch_assoc();

                if (password_verify($password, $user['password']) && $user['user_flags'] % 2 === 1) {
                    $_SESSION['user'] = [
                        'user_id' => $user['user_id'],
                        'email' => $user['email'],
                        'fname' => $user['fname'],
                        'lname' => $user['lname'],
                        'user_flags' => $user['user_flags']
                    ];

                    echo json_encode([
                        "success" => true,
                        "message" => "Login successful",
                        "user" => $_SESSION['user']
                    ]);
                } else {
                    echo json_encode(["success" => false, "message" => "Invalid email or password"]);
                }
            } else {
                echo json_encode(["success" => false, "message" => "Invalid email or password"]);
            }
        }
    } else if ($action === 'logout') {
        $_SESSION = array();
        if (ini_get("session.use_cookies")) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000,
                $params["path"], $params["domain"],
                $params["secure"], $params["httponly"]
            );
        }
        session_destroy();
        echo json_encode(["success" => true, "message" => "Logout successful"]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid action"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Only POST requests are allowed"]);
}

$conn->close();
?>