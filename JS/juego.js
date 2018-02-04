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
var hit;
var score = 0;
var scoreString = '';
var scoreText;
var lives = 3;
var enemyBullet;
var bulletTime = 0;
var bullets;
var soldados;
var stateText;
var numeroSoldados = 2;
var livingEnemies = [];
var firingTimer = 0;
var attackplayer = false;
//enemigo solitario
var enemy1, enemy1Walk = true,
    enemy1Stand = false,
    enemy1Punch = false,
    enemy1Alive, enemy1Count = 1;


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
    game.scale.setGameSize($(window).width(), $(window).height());
}

$(window).resize(function () {
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
    game.load.spritesheet('luke', 'Sprites/Personajes/Luke/movimientoslineales.png', 74, 80);
    game.load.spritesheet('soldados', 'Sprites/Enemigos/Soldados/StormTroppers/movimientosImperiales.png', 35, 70);
    // revisar para fisicas game.load.physics("fisicasluke", "Sprites/Personajes/Luke/fisicasluke.json");

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'fondo');
    game.physics.arcade.gravity.y = 200;


    // Sprites
    //Floor
    ground = game.add.tileSprite(0, 650, this.game.width, 550, 'ground');
    // Player
    player = game.add.sprite(10, game.world.height - 600, 'luke');

    //Enemy bullets
    enemyBullet = game.add.group();
    enemyBullet.enableBody = true;
    enemyBullet.physicsBodyType = Phaser.Physics.ARCADE;
    enemyBullet.createMultiple(30, 'balaSoldado');
    enemyBullet.setAll('anchor.x', 0.5);
    enemyBullet.setAll('anchor.y', 1);
    enemyBullet.setAll('outOfBoundsKill', true);
    enemyBullet.setAll('checkWorldBounds', true);


    //Soldados
    /*soldados = game.add.group();
    soldados.enableBody = true;
    soldados.physicsBodyType = Phaser.Physics.ARCADE; */
    //createSoldados();
    enemy1 = this.add.sprite(10, this.world.height - 600, 'soldados');
    game.physics.arcade.enable([enemy1, ground]);
    enemy1.body.setSize(40, 60, 0, 0);
    enemy1.body.collideWorldBounds = true;
    enemy1.animations.add('walk', [8, 9, 10], 10, true);
    enemy1.animations.add('stand', [13], 10, true);
    game.add.existing(enemy1);
    enemy1Alive = true;



    //Puntuacion
    scoreString = 'Puntuación: ';
    scoreText = game.add.text(10, 10, scoreString + score, {
        font: '34px Arial',
        fill: '#fff'
    });

    //Vidas
    lives = game.add.group();
    game.add.text(game.world.width - 100, 10, 'Vidas: ', {
        font: '34px Arial',
        fill: '#fff'
    });

    // Text
    stateText = game.add.text(game.world.centerX, game.world.centerY, ' ', {
        font: '84px Arial',
        fill: '#fff'
    });
    stateText.anchor.setTo(0.5, 0.5);
    stateText.visible = false;

    for (var i = 0; i < 3; i++) {

        var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
        ship.anchor.setTo(0.5, 0.5);
        ship.angle = 90;
        ship.alpha = 0.4;
    }


    // Physics
    game.physics.arcade.enable([player, ground]);
    ground.body.immovable = true;
    ground.body.allowGravity = false;
    player.body.collideWorldBounds = true;


    //  Player animations Luke use the forces
    player.animations.add('left', [8, 9], 5, true);
    player.animations.add('right', [17, 18], 5, true);
    player.animations.add('quieto', [12], 5, true);
    player.animations.add('jump', [1], 5, true);
    player.animations.add('hit', [5, 21], 5, true);
    cursors = game.input.keyboard.createCursorKeys();
    hit = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function Enemy1Stand() {
    enemy1Stand = true;
    enemy1.animations.play('stand');
}

function Enemy1Fire() {
    enemy1Punch = true;
    //enemy1.animations.play();
}




function createSoldados() {

    for (var x = 0; x < 10; x++) {

        var soldado = soldados.create(x * 100, game.world.height - 350, 'soldados');
        soldado.anchor.setTo(0.5, 0.5);
        soldado.animations.add('move', [8, 9, 10], 10, true);
        soldado.play('move');
        soldado.body.moves = false;
    }

    soldado.x = 100;
    soldado.y = 0;

}

function update() {
    
    //Esto sirve para ver el hitbox de los elementos
    //game.debug.body(player, "#9090ff", false);
    //game.debug.body(enemy1, "#9090ff", false);
    //  Reset the players velocity (movement)
    game.physics.arcade.collide(player, ground);
    game.physics.arcade.collide(enemy1, ground);
    player.body.velocity.x = 0;

    movimientosJugador();

    //if(attackplayer==true){}

    if (enemy1Walk == true && enemy1Alive == true) {

        enemy1.animations.play('walk');
        enemy1.body.velocity.x = 100;

    }

    if (attackplayer == true) {
        this.game.physics.arcade.collide(player, enemy1, playerHitsEnemy(), null, this);
    }


}

function playerHitsEnemy() {

    if (enemy1.x >= 415 && enemy1Walk == true && enemy1Alive == true) {
        enemy1Stand = true;
        enemy1Walk = false;
        enemy1.destroy();
        score++;
        scoreText.destroy();
        scoreText = game.add.text(10, 10, scoreString + score, {
            font: '34px Arial',
            fill: '#fff'
        });
        this.game.state.restart();
    }

}

function enemyFires() {

    enemyBullet = enemyBullet.getFirstExists(false);

    livingEnemies.length = 0;

    soldados.forEachAlive(function (soldado) {
        livingEnemies.push(soldado);
    });

    if (enemyBullet && livingEnemies.length > 0) {
        var random = game.rnd.integerInRange(0, livingEnemies.length - 1);

        var shooter = livingEnemies[random];
        enemyBullet.reset(shooter.body.x);

        game.physics.arcade.moveToObject(enemyBullet, player, 120);
        firingTimer = game.time.now + 2000;
    }

}

function fireBullet() {
    if (game.time.now > bulletTime) {

        bullet = bullets.getFirstExists(false);

        if (bullet) {

            bullet.reset(player.x);
            bullet.body.velocity.x = -400;
            bulletTime = game.time.now + 200;

        }
    }
}

function resetBullet(bullet) {

    bullet.kill();

}

function restart() {

    lives.callAll('revive');
    soldados.removeAll();
    numeroSoldados = numeroSoldados + 2;
    createSoldados();

    player.revive();
    stateText.visible = false;

}



function movimientosJugador() {

    if (cursors.left.isDown) {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');

    } else if (cursors.right.isDown) {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    } else if (cursors.up.isDown && player.body.touching.down) {

        player.body.velocity.y = -250;
        player.animations.play('jump');

    } else if (hit.isDown) {
        attackplayer = true;
        player.animations.play('hit');

    } else {
        attackplayer = false;
        //  Stand still
        player.animations.play('quieto');
    }

}
