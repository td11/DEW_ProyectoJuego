var comprobarPanel = false; //si esta true significa que esta en el panel de eleccion al contrario es en el juego
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update
});
var platforms;
var player;
var cursors;
var hitButton;
var vg;
var jumpTimer;
var ground;

$(function () {

    resizeGame();
    //Borrar cuando termine la funcionalidad decentemente
    $('#botonesLogin #btnStartGame').hide();
    $("#modalLogin").hide();
    $("#modalRegistro").hide();
    $('#juego').hide();
    $('#elegirpersonaje').hide();

    $('#botonesLogin #btnStartGame').click(function () {
        $('#introduccion').hide();
        $('#juego').show();
        comprobarEstado();
    });


});

 function resizeGame() {
    game.scale.setGameSize($( window ).width(), $( window ).height());
}

$( window ).resize(function() {
    resizeGame();
}); 

function comprobarEstado() {
    if (comprobarPanel == true) {
        $('#juego').hide();
        $('#elegirpersonaje').show();
    } else {
        $('#juego').show();
        $('#elegirpersonaje').hide();
    }
}


/* Funciones para el panel de juego */


/* Precargamos los sprites que usaremos */
function preload() {
    game.load.image('fondo', 'Sprites/Mapas/background.jpg');
    game.load.image('ground', 'Sprites/Mapas/ground.png');
    game.load.spritesheet('luke', 'Sprites/Personajes/Luke/LosMovimientos2.png', 73, 70);

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'fondo');
    game.physics.arcade.gravity.y = 200;
    

    //Sprites
    ground = game.add.tileSprite(0, 650, this.game.width, 550, 'ground');
    // The player and its settings
    player = game.add.sprite(10, game.world.height - 600, 'luke');

    //Fisicas
    game.physics.arcade.enable([player, ground]);
    ground.body.immovable = true;
    ground.body.allowGravity = false;
    player.body.collideWorldBounds = true;
    

    //  Our two animations, walking left and right.
    player.animations.add('left', [28,29,30], 5, true);
    player.animations.add('right', [17,18,19], 5, true);
    player.animations.add('quieto', [0], 5, true);
    player.animations.add('jump', [65], 5, true);
    cursors = game.input.keyboard.createCursorKeys();
    

}

function update() {

    game.debug.body(player,"#9090ff", false);
    //  Reset the players velocity (movement)
    game.physics.arcade.collide(player, ground);
    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
        
    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }else if(cursors.up.isDown && player.body.touching.down ){
        
        player.body.velocity.y = -250;
        player.animations.play('jump');
             
    } else {
        //  Stand still
        player.animations.play('quieto');
    }


}
