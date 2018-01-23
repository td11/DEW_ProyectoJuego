var cajaIntro = $('.star-wars-intro'),
    botonSkip = $('#saltarintro');
var modalLogin = $('#modalLogin');
var modalRegistro = $('#modalRegistro');
var btnLogin = $("#btnLogin");
var btnRegistro = $('#btnRegistro');
var span = $(".close");


$(function () {

    $("#btnStartGame").hide();
    $("#modalLogin").hide();
    $("#modalRegistro").hide();

    // Eventos para los botones de registro y login
    $("#btnLogin").click(function (event) {
        modalLogin.show();
        $('#introduccion').removeClass("star-wars-intro");

    });

    $("#btnRegistro").click(function (event) {
        modalRegistro.show();
        $('#introduccion').removeClass("star-wars-intro");
    });

    // When the user clicks on <span> (x), close the modal
    $(".close").click(function () {
        modalRegistro.hide();
        modalLogin.hide();
        $('#introduccion').addClass("star-wars-intro");
    });

});

//Ventanas modales
$(window).click(function (e) {
    if (event.target == modalLogin) {
        modalLogin.style.display = "none";
    } else if (event.target == modalRegistro) {
        modalRegistro.style.display = "none";
    }
});
