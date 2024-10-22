<?php

    $numEmpleado = $_POST['numEmpleado'];
    $rfc = $_POST['rfc'];

    $conexion = new PDO('mysql:host=localhost;dbname=novares_users', 'root', '');

    $validate = $conexion->prepare("SELECT * FROM users WHERE numEmpleado = '$numEmpleado' AND rfc = '$rfc'");
    $validate->execute();
    $validate = $validate->fetch();

    if ($validate) {
        echo "true";
    } else {
        echo "false";
    }

?>