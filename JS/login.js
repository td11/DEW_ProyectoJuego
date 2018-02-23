// Name and Password from the register-form
var nombre = document.getElementById('userRegistroNombre');
var password = document.getElementById('userRegistroPassword');
var user = {
    nombre: '',
    password: '',
    puntuacion: 0
};
var nombreRecogido, passwordRecogida, registroDuplicado = false,
    userCheck;

/**
 * Guardamos en local storage el usuario registrado
 */
function store() {
    //alert('Se ha registrado correctamente');
    let sizeStorage = localStorage.length;
    user["nombre"] = $.trim(nombre.value);
    user["password"] = password.value;
    comprobarDuplicadoRegistro();
    if (sizeStorage == 0 && registroDuplicado == false) {
        alert('Se ha registrado correctamente');
        localStorage.setItem('user' + 0, JSON.stringify(user));
    } else if (registroDuplicado == false) {
        alert('Se ha registrado correctamente');
        localStorage.setItem('user' + sizeStorage, JSON.stringify(user));
    }

}

/* Recoger valores del campo registro y validarlos */
function validarCamposRegistro() {
    var nombreValidar = $.trim(nombre.value);
    if (nombreValidar == null || nombreValidar == '') {
        alert('Error: no pueden existir campos vacíos ni con espacios');
    } else {
        store();
    }
}

/* Comprobar registro */
function comprobarDuplicadoRegistro() {
    for (var i = 0; i < localStorage.length; i++) {
        userCheck = JSON.parse(localStorage.getItem('user' + i));
        if (userCheck['nombre'] == user['nombre']) {
            registroDuplicado = true;
            alert('Ya existe un usuario con ese nombre.');
            break;
        } else {
            registroDuplicado = false;
        }
    }
}

/**
 * Comprobamos el login con los datos supuestamente registrados
 */

function check() {

    var checkError = true;
    // Datos recogidos del usuario
    nombreRecogido = document.getElementById('userName');
    passwordRecogida = document.getElementById('userPassword');


    for (var i = 0; i < localStorage.length; i++) {
        userCheck = JSON.parse(localStorage.getItem('user' + i));
        // check if stored data from register-form is equal to data from login form
        if (nombreRecogido.value !== userCheck["nombre"] || passwordRecogida.value !== userCheck["password"]) {
            checkError = true;
        } else {
            checkError = false;
            modalLogin.hide();
            $('#introduccion').addClass("star-wars-intro");
            mostrarBotonStart();
            break;
        }
    }

    if (checkError == true)
        alert('Error nombre de usuario o contraseña incorrecta volvemos al inicio.');
    else
        alert('Bienvenido ' + nombreRecogido.value);


}

/**
 * Mostramos el boton de empezar el juego
 */

function mostrarBotonStart() {
    $('#botonesLogin #btnStartGame').show();
    $('#botonesLogin #btnRegistro').hide();
    $('#botonesLogin #btnLogin').hide();
}
