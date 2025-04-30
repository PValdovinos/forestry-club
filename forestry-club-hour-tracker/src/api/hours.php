<?php
include './../../db_connect.php';

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    case 'GET':
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            $result = $conn->query("SELECT * FROM workhours WHERE submission_id =$id");
            $data = $result->fetch_assoc();
            echo json_encode($data);
        } else if (isset($_GET['username'])) {
            $username = "'" . $_GET['username'] . "'";
            $result = $conn->query(
                "SELECT users.user_id, users.user_flags, users.username, users.fname, users.lname, 
                workhours.time_in, workhours.time_out, workhours.under_review, workhours.accepted,
                DATE(workhours.time_out) AS date_worked, workhours.submission_id,
                TIMESTAMPDIFF(MINUTE, workhours.time_in, workhours.time_out) / 60 AS hours
                FROM users 
                LEFT JOIN workhours
                ON users.user_id = workhours.user_id
                Where users.username=$username");
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            echo json_encode($data);
        } else {
            $result = $conn->query("SELECT * FROM workhours");
            $users = [];
            while ($row = $result->fetch_assoc()) {
                $users[] = $row;
            }
            echo json_encode($users);
        }
        break;

    case 'POST':
        $time_in = $input['time_in'];
        $time_out = $input['time_out'];
        $user_id = $input['user_id'];
        $under_review = $input['under_review'];
        $accepted = $input['accepted'];
        $conn->query("INSERT INTO workhours (time_in, time_out, user_id, under_review, accepted) VALUES ($time_in, time_out, user_id, under_review, accepted)");
        echo json_encode(["message" => "Workhours added successfully"]);
        break;

    case 'PUT':
        $id = $_GET['id'];
        $time_in = $input['time_in'];
        $time_out = $input['time_out'];
        $update_id = $input['update_id'];
        $under_review = $input['under_review'];
        $accepted = $input['accepted'];
        $conn->query("UPDATE workhours
            SET time_in = $time_in, time_out = $time_out 
            WHERE submission_id = $update_id");
        echo json_encode(["message" => "Workhours updated successfully"]);
        break;

    // case 'DELETE':
    //     $id = $_GET['id'];
    //     $conn->query("DELETE FROM workhours WHERE id=$id");
    //     echo json_encode(["message" => "Workhours deleted successfully"]);
    //     break;

    default:
        echo json_encode(["message" => "Invalid request method"]);
        break;
}

$conn->close();
?>