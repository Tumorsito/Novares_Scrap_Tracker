/* Php post numEmpleado and RFC */
<?php

    $num_empleado = $_POST['numEmpleado'];
    $rfc = $_POST['rfc'];

    /* Informacion de la base de datos 
    database host = localhost
    database name = novares_users
    database table = users
    database columns = (primary key autoincremental id), numEmpleado, RFC
    */

    /* Mas informacion
    Servidor: 127.0.0.1 via TCP/IP
    Tipo de servidor: MariaDB
    Conexión del servidor: No se está utilizando SSL Documentación
    Versión del servidor: 10.4.32-MariaDB - mariadb.org binary distribution
    Versión del protocolo: 10
    Usuario: root@localhost
    Conjunto de caracteres del servidor: UTF-8 Unicode (utf8mb4)
    */

    $conexion = new PDO('mysql:host=localhost;dbname=novares_users', 'root', '');

    $validate = $conexion->prepare("SELECT * FROM users WHERE num_empleado = '$num_empleado' AND RFC = '$rfc'");
    $validate->execute();
    $validate = $validate->fetch();

    if ($validate) {
        echo "true";
    } else {
        echo "false";
    }

?>