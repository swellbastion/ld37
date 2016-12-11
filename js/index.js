'use strict';

var game = new Phaser.Game(700, 700);

var frog, cursors;
var collisionSprites = [];

game.state.add('play', {
  init: function() {
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.world.setBounds(0, 0, 2100, 2100);
  },

  preload: function() {
    this.load.image('bookShelf', 'images/book_shelf.png');
    this.load.image('bullet', 'images/bullet.png');
    this.load.image('lamp', 'images/lamp.png');
    this.load.image('piano', 'images/piano.png');
    this.load.image('room', 'images/room.png');
    this.load.spritesheet('bug', 'images/bug.png', 40, 40);
    this.load.spritesheet('frog', 'images/frog.png', 40, 40);
    this.load.spritesheet('soldier', 'images/soldier.png', 40, 40);
    this.load.audio('backgroundMusic', 'sounds/background_music.mp3');
    this.load.audio('shoot', 'sounds/shoot.mp3');
    this.load.audio('die', 'sounds/die.mp3');
  },

  create: function() {
    this.background = this.add.tileSprite(0, 0, 2100, 2100, 'room');

    frog = {direction: 'up', sprite: {}};
    frog.sprite = this.add.sprite(1050, 1270, 'frog');
    frog.sprite.anchor.set(.5, .5);
    this.camera.follow(frog.sprite);
    frog.sprite.animations.add('run');
    frog.sprite.animations.play('run', 10, true);
    this.physics.enable(frog.sprite);
    collisionSprites.push(frog.sprite);

    var invisibleWallCoords = [
      [790, 490, 220, 300],
      [490, 790, 300, 220],
      [1090, 490, 220, 300],
      [1310, 790, 300, 220],
      [490, 1090, 300, 220],
      [790, 1310, 220, 300],
      [1310, 1090, 300, 220],
      [1090, 1310, 220, 300]
    ];
    for (var i = 0; i < invisibleWallCoords.length; i++) {
      var invisibleWall = this.add.sprite(
        invisibleWallCoords[i][0],
        invisibleWallCoords[i][1]
      );
      this.physics.enable(invisibleWall);
      invisibleWall.width = invisibleWallCoords[i][2];
      invisibleWall.height = invisibleWallCoords[i][3];
      invisibleWall.body.immovable = true;
      collisionSprites.push(invisibleWall);
    }

    cursors = game.input.keyboard.createCursorKeys();
  },

  update: function() {
    if (cursors.up.isDown) {
      frog.direction = 'up';
      frog.sprite.rotation = 0;
    }
    else if (cursors.down.isDown) {
      frog.direction = 'down';
      frog.sprite.rotation = Math.PI;
    }
    else if (cursors.left.isDown) {
      frog.direction = 'left';
      frog.sprite.rotation = Math.PI * 1.5;
    }
    else if (cursors.right.isDown) {
      frog.direction = 'right';
      frog.sprite.rotation = Math.PI * .5;
    }

    frog.sprite.body.velocity.x = 0;
    frog.sprite.body.velocity.y = 0;
    switch (frog.direction) {
      case 'up':
        frog.sprite.body.velocity.y = -150;
        break;
      case 'down':
        frog.sprite.body.velocity.y = 150;
        break;
      case 'left':
        frog.sprite.body.velocity.x = -150;
        break;
      case 'right':
        frog.sprite.body.velocity.x = 150;
    }

    for (var sprite = 0; sprite < collisionSprites.length; sprite++)
      for (var otherSprite = 0; otherSprite < collisionSprites.length; otherSprite++)
        if (sprite != otherSprite)
          this.physics.arcade.collide(collisionSprites[sprite],
                                      collisionSprites[otherSprite]);
  }
}, true);
