// Name and Password from the register-form
var nombre = document.getElementById('userRegistroNombre');
var password = document.getElementById('userRegistroPassword');

// storing input from register-form
function store() {
    localStorage.setItem('name', nombre.value);
    localStorage.setItem('pw', password.value);
}

// Comprobar el login con los datos cogidos del formulario registro guardados en local storage
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
        alert('Bienvenido '+storedName);
    }
    
}