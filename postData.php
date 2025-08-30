<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "growlab-db";
$port = 3306;

$conn = mysqli_connect($host, $user, $pass, $db, $port);

if (mysqli_connect_errno()) {
    die(json_encode(['error' => "Failed to connect to MySQL: " . mysqli_connect_error()]));
}

$op = isset($_GET['op']) ? $_GET['op'] : '';

switch ($op) {
    case 'add_pelamar':
        add_pelamar();
        break;
    case 'get_pelamar':
        get_pelamar();
        break;
    default:
        echo json_encode(['error' => 'Invalid operation']);
        break;
}

function add_pelamar() {
    global $conn;

    $inputData = file_get_contents("php://input");
    if ($inputData === false) {
        die(json_encode(['error' => 'Error reading input data']));
    }

    $data = json_decode($inputData, true);
    if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
        die(json_encode(['error' => 'JSON decode error: ' . json_last_error_msg(), 'received' => $inputData]));
    }

    $responses = [];

    foreach ($data as $item) {
        $nama_lengkap = mysqli_real_escape_string($conn, $item['nama_lengkap']);
        $email = mysqli_real_escape_string($conn, $item['email']);
        $alamat_domisili = mysqli_real_escape_string($conn, $item['alamat_domisili']);
        $nomor_telepon = mysqli_real_escape_string($conn, $item['nomor_telepon']);
        $tempat_tanggalLahir = mysqli_real_escape_string($conn, $item['tempat_tanggalLahir']);
        $jenis_kelamin = mysqli_real_escape_string($conn, $item['jenis_kelamin']);
        $status_pendidikan = mysqli_real_escape_string($conn, $item['status_pendidikan']);
        $jenjang_pendidikan = mysqli_real_escape_string($conn, $item['jenjang_pendidikan']);
        $nama_perguruanTinggi = mysqli_real_escape_string($conn, $item['nama_perguruanTinggi']);
        $program_studi = mysqli_real_escape_string($conn, $item['program_studi']);
        $pengalaman = mysqli_real_escape_string($conn, $item['pengalaman']);

        $query = "INSERT INTO pelamars (nama_lengkap, email, alamat_domisili, nomor_telepon, tempat_tanggalLahir, jenis_kelamin, status_pendidikan, jenjang_pendidikan, nama_perguruanTinggi, program_studi, pengalaman) 
                  VALUES ('$nama_lengkap', '$email', '$alamat_domisili', '$nomor_telepon', '$tempat_tanggalLahir', '$jenis_kelamin', '$status_pendidikan', '$jenjang_pendidikan', '$nama_perguruanTinggi', '$program_studi', '$pengalaman')";

        if (mysqli_query($conn, $query)) {
            $responses[] = ['success' => "New record created successfully for $nama_lengkap"];
        } else {
            $responses[] = ['error' => "Error: " . mysqli_error($conn)];
        }
    }

    echo json_encode($responses);
}

function get_pelamar() {
    global $conn;

    $query = "SELECT * FROM pelamars";
    $result = mysqli_query($conn, $query);

    if ($result) {
        $data = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $data[] = $row;
        }
        header('Content-Type: application/json');
        echo json_encode($data, JSON_PRETTY_PRINT);
    } else {
        echo json_encode(['error' => "Error: " . mysqli_error($conn)]);
    }
}

mysqli_close($conn);
?>
