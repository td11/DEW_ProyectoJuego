// Name and Password from the register-form
var nombre = document.getElementById('userRegistroNombre');
var password = document.getElementById('userRegistroPassword');
var user = {
    nombre: nombre,
    password: password,
    puntuacion: 0
};





/**
 * Guardamos en local storage
 */

function store() {
    alert('Se ha registrado correctamente');
    let sizeStorage = localStorage.length;
    user["nombre"] = nombre.value;
    user["password"] = password.value;
    if (sizeStorage == 0)
        localStorage.setItem('user' + 0, JSON.stringify(user));
    else
        localStorage.setItem('user' + sizeStorage, JSON.stringify(user));

}

/**
 * Comprobamos el login con los datos supuestamente registrados
 */

function check() {

    var userCheck, checkError=true;
    // Datos recogidos del usuario
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPassword');


    for (var i = 0; i < localStorage.length; i++) {
        userCheck = JSON.parse(localStorage.getItem('user' + i));
        // check if stored data from register-form is equal to data from login form
        if (userName.value !== userCheck["nombre"] || userPw.value !== userCheck["password"]) {
            checkError = true;
        } else {
            checkError = false;
            modalLogin.hide();
            $('#introduccion').addClass("star-wars-intro");
            mostrarBotonStart();
        }
    }

    if (checkError == true)
        alert('Error nombre de usuario o contraseña incorrecta volvemos al inicio.');
    else
        alert('Bienvenido ' + userName.value);


}

/**
 * Mostramos el boton de empezar el juego
 */

function mostrarBotonStart() {
    $('#botonesLogin #btnStartGame').show();
    $('#botonesLogin #btnRegistro').hide();
    $('#botonesLogin #btnLogin').hide();
}
