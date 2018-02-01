var comprobarPanel = false; //si esta true significa que esta en el panel de eleccion al contrario es en el juego
var game = new Phaser.Game(1600, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var platforms;

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
        comprobarEstado();    
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


/* Precargamos los sprites que usaremos */
function preload(){
    game.load.image('fondo', '/Sprites/Mapas/background.jpg');
    game.load.image('ground', '/Sprites/Mapas/ground.png');
    game.load.spritesheet('luke', '/Sprites/Personajes/Luke/MovimientoNormal.png', 45,79);
    
}

function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0,0,'fondo');
    platforms = game.add.group();
    platforms.enableBody = true;
    
    var ground = platforms.create(0, game.world.height - 64, 'ground');
    
    ground.scale.setTo(10,10);
    
    ground.body.inmovable=true;
    
    var ledge = platforms.create(400,400,'ground');
    
    ledge.body.inmovable = true;
    
    ledge = platforms.create(-150,250, 'ground');
    
    ledge.body.inmovable = true;
    
    
    // The player and its settings
    player = game.add.sprite(42, game.world.height - 150, 'luke');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [4,5,6,7], 10, true);
    player.animations.add('right', [9,10,11,12], 10, true);
    
}

function update(){
 
    var cursors = game.input.keyboard.createCursorKeys();
     //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }
    
}