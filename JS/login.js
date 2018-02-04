// Name and Password from the register-form
var nombre = document.getElementById('userRegistroNombre');
var password = document.getElementById('userRegistroPassword');

/**
 * Guardamos en local storage
 */

function store() {
    alert('Se ha registrado correctamente');
    localStorage.setItem('name', nombre.value);
    localStorage.setItem('pw', password.value);
}

/**
 * Comprobamos el login con los datos supuestamente registrados
 */

function check() {

    // Comprobar datos guardados del formulario registro
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    // entered data from the login-form
    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPassword');

    // check if stored data from register-form is equal to data from login form
    if(userName.value !== storedName || userPw.value !== storedPw) {
        alert('Error nombre de usuario o contraseña incorrecta volvemos al inicio.');
    }else {
        modalLogin.hide();
        $('#introduccion').addClass("star-wars-intro");
        alert('Bienvenido '+storedName);
        mostrarBotonStart();
    }
    
}

/**
 * Mostramos el boton de empezar el juego
 */

function mostrarBotonStart(){
    $('#botonesLogin #btnStartGame').show();
    $('#botonesLogin #btnRegistro').hide();
    $('#botonesLogin #btnLogin').hide();
}

