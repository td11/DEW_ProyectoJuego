var cajaIntro = $('.star-wars-intro'),
    botonSkip = $('#saltarintro');
var modalLogin = $('#modalLogin');
var modalRegistro = $('#modalRegistro');
var btnLogin = $("#btnLogin");
var btnRegistro = $('#btnRegistro');
var span = $(".close");

/**
 * Inicio de la intro
 */
$(function () {

    $("#my_audio").get(0).play();
    $('#botonesLogin #btnStartGame').hide();
    $("#modalLogin").hide();
    $("#modalRegistro").hide();
    $('#juego').hide();
    $('#elegirpersonaje').hide();

    // Eventos para los botones de registro y login
    $("#btnLogin").click(function (event) {
        modalLogin.show();
        $('#introduccion').removeClass("star-wars-intro");
    });

    $("#btnRegistro").click(function (event) {
        modalRegistro.show();
        $('#introduccion').removeClass("star-wars-intro");
    });

    $("#btnStartGame").click(function (event) {
        $('#botonesLogin').hide();
        $('#introduccion').hide();
        $('<script>')
            .attr('src', 'JS/juego.js')
            .appendTo('body');
        $("#my_audio").get(0).stop();

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
