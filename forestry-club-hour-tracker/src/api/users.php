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
            if (!isset($value) || empty($value)) {
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

        $password = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("INSERT INTO users (email, user_flags, fname, lname, password) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sisss", $email, $user_flags, $fname, $lname, $password);

        if (!$stmt->execute()) {
            http_response_code(500);
            $success = false;
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
    // case 'PUT':
    //     $id = $_GET['id'];
    //     $time_in = $input['time_in'];
    //     $time_out = $input['time_out'];
    //     $update_id = $input['update_id'];
    //     $under_review = $input['under_review'];
    //     $accepted = $input['accepted'];
    //     $conn->query("UPDATE workhours
    //         SET time_in = $time_in, time_out = $time_out 
    //         WHERE submission_id = $update_id");
    //     echo json_encode(["message" => "User updated successfully"]);
    //     break;

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