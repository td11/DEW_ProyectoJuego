var cajaIntro = $('.star-wars-intro'),
    botonSkip = $('#saltarintro');
var modalLogin = $('#modalLogin');
var modalRegistro = $('#modalRegistro');
var btnLogin = $("#btnLogin");
var btnRegistro = $('#btnRegistro');
var span = $(".close");
var eleccionDificultad;

/**
 * Inicio de la intro
 */
$(function () {

    //$("#my_audio").get(0).play();
    $('#botonesLogin #btnStartGame').hide();
    $('#botonesLogin #btnReiniciar').hide();
    $('#botonesLogin #btnMarcador').hide();
    $("#modalLogin").hide();
    $("#modalRegistro").hide();
    $('#modalMarcador').hide();
    $('#juego').hide();
    $('#elegirpersonaje').hide();
    $('#login_btn').prop("disabled",true);
    $('#juego').hide();

    // Eventos para los botones de registro y login
    $("#btnLogin").click(function (event) {
        modalLogin.show();
        $('#introduccion').removeClass("star-wars-intro");
    });
    
    $('input[type=radio][name=dificultad]').change(function() {
        if (this.value == '1') {
            eleccionDificultad=1;
            $('#login_btn').prop("disabled",false);
        } else if (this.value == '2') {
            eleccionDificultad=2;
            $('#login_btn').prop("disabled",false);
        } else if (this.value == '3') {
            eleccionDificultad=3;  
            $('#login_btn').prop("disabled",false);
        }
    });


    $("#btnRegistro").click(function (event) {
        modalRegistro.show();
        $('#introduccion').removeClass("star-wars-intro");
    });

    $("#btnStartGame").click(function (event) {
        $('#btnLogin').hide();
        $('#btnRegistro').hide();
        $('#btnStartGame').hide();
        $('#introduccion').hide();
        $('#btnReiniciar').show();
        $('#btnMarcador').show();
        $('<script>')
            .attr('src', 'JS/juego.js')
            .appendTo('body');
        //$("#my_audio").get(0).stop();

    });


    // When the user clicks on <span> (x), close the modal
    $(".close").click(function () {
        modalRegistro.hide();
        modalLogin.hide();
        $('#modalMarcador').hide();
        $('#introduccion').addClass("star-wars-intro");
    });
    
    // Boton reiniciar el juego
    $("#btnReiniciar").click(function () {
        window.location.reload();
    });
    
    $("#btnMarcador").click(function () {
        $('#modalMarcador').show();
        //Limpiamos marcador
        $('ul #puntuacion').empty();
        guardarPuntuacion();
        recogerPuntuacion();
        actualizarMarcador();
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
