<?php
include './../../db_connect.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

function clean_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $stmt = $conn->prepare("SELECT workhours.submission_id, users.email, workhours.time_in, 
                workhours.time_out, workhours.create_date, workhours.under_review, workhours.accepted 
                FROM workhours
                INNER JOIN users ON workhours.user_id = users.user_id
                WHERE users.user_id = ?");
            $stmt->bind_param("i", $id);
            $data = [];
            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
                echo json_encode(["message" => $message]);
            } else {
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
            }
        } else if (isset($_GET['email'])) {
            $email = $_GET['email'];
            $stmt = $conn->prepare("SELECT users.user_id, users.user_flags, users.fname, users.lname
            FROM users
            WHERE users.email = ?");
            $stmt->bind_param("s", $email);
            $data = [];

            if (!$stmt->execute()) {
                $message = "Execute failed: (" . $stmt->errno . ") " . $stmt->error;
                echo json_encode(["message" => $message]);
            } else {
                $result = $stmt->get_result();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
            }
        } else {
            $result = $conn->query("SELECT users.user_id, users.user_flags, users.email, users.fname, users.lname,
                SUM(TIMESTAMPDIFF(MINUTE, workhours.time_in, workhours.time_out) / 60) AS hours 
                FROM users 
                LEFT JOIN workhours 
                ON users.user_id = workhours.user_id 
                GROUP BY users.user_id, users.user_flags, users.email, users.fname, users.lname;");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

    case 'POST':
        $success = false;
        $message = "Account creation failed. Please try again.";

        foreach ($input as $key => $value) {
            if (!isset($value) || trim($value) === '') {
                http_response_code(400);
                echo json_encode([
                    "success" => false,
                    "message" => "Missing required field: $key"
                ]);
                exit();
            }
        }

        $email = clean_input($input['email']);
        $password = clean_input($input['password']);
        $user_flags = clean_input($input['user_flags']);
        $fname = clean_input($input['fname']);
        $lname = clean_input($input['lname']);

        // Constants
        $MAX_NAME_LENGTH = 50;
        $MAX_EMAIL_LENGTH = 100;
        $MIN_PASSWORD_LENGTH = 8;
        $MAX_PASSWORD_LENGTH = 16;

        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid email format."]);
            exit();
        }
        if (strlen($email) > $MAX_EMAIL_LENGTH) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Email must be less than $MAX_EMAIL_LENGTH characters."]);
            exit();
        }

        // Check if email already exists
        $checkStmt = $conn->prepare("SELECT user_id FROM users WHERE email = ?");
        $checkStmt->bind_param("s", $email);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            http_response_code(409);
            echo json_encode([
                "success" => false,
                "message" => "An account with this email already exists."
            ]);
            exit();
        }
        $checkStmt->close();

        // Validate password
        $passLength = strlen($password);
        if ($passLength < $MIN_PASSWORD_LENGTH || $passLength > $MAX_PASSWORD_LENGTH) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Password must be between $MIN_PASSWORD_LENGTH and $MAX_PASSWORD_LENGTH characters."]);
            exit();
        }

        // Validate names
        if (strlen($fname) > $MAX_NAME_LENGTH || strlen($lname) > $MAX_NAME_LENGTH) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "First and last names must be less than $MAX_NAME_LENGTH characters."]);
            exit();
        }

        // Hash password and insert
        $password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (email, user_flags, fname, lname, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sisss", $email, $user_flags, $fname, $lname, $password);

        if (!$stmt->execute()) {
            http_response_code(500);
            $message = "Database error: " . $stmt->error;
        } else {
            http_response_code(201);
            $message = "Account created successfully!";
            $success = true;
        }

        echo json_encode([
            "success" => $success,
            "message" => $message
        ]);
        break;
    case 'PUT':
        $rawInput = file_get_contents("php://input");
        $data = json_decode($rawInput, true);

        if (isset($data['id']) AND isset($data['user_flags'])) { 
            $user_id = $data['id'];
            $user_flags = $data['user_flags'];
            $stmt = $conn->prepare("UPDATE `users` SET `user_flags` = ? WHERE `users`.`user_id` = ?");
            $stmt->bind_param("ii", $user_flags, $user_id);
            if (!$stmt->execute()) {
                http_response_code(500);
                $message = "Database error: " . $stmt->error;
            } else {
                http_response_code(201);
                $message = "Account updated successfully!";
                $success = true;
            }
            echo json_encode(["success" => $success,"message" => $message]);
        }
        else{
            echo json_encode(["message" => "Invalid PUT request".json_encode($data)."."]);
        }
        break;
    case 'DELETE':
        $id = $_GET['id'];
        $conn->query("DELETE FROM users WHERE user_id=$id");
        echo json_encode(["message" => "Workhours deleted successfully"]);
        break;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>