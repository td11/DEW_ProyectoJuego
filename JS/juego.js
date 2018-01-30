var comprobarPanel = false; //si esta true significa que esta en el panel de eleccion al contrario es en el juego
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

$(function () {

    //Borrar cuando termine la funcionalidad decentemente
    $('#botonesLogin #btnStartGame').hide();
    $("#modalLogin").hide();
    $("#modalRegistro").hide();
    $('#juego').hide();
    $('#elegirpersonaje').hide();
    
    $('#botonesLogin #btnStartGame').click(function () {
        $('#introduccion').hide();
        $('#juego').show();
        //comprobarEstado();    
    });
    

});
    
function comprobarEstado(){
    if(comprobarPanel==true){
        $('#juego').hide();
        $('#elegirpersonaje').show();
    }else{
        $('#juego').show();
        $('#elegirpersonaje').hide();
    }
}


/* Funciones para el panel de juego */

/* PRecargamos los sprites que usaremos */
function preload(){
    
    game.load.image('fondo', '/Sprites/Mapas/background.jpg');
    game.load.spritesheet('luke', '/Sprites/Personajes/Luke/luke.png', 13,105);
    
}

function create(){
    
}

function update(){
    
}