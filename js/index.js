'use strict';

var game = new Phaser.Game(700, 700);

var frog, cursors;

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
    frog.sprite = this.add.sprite(1030, 1250, 'frog');
    this.camera.follow(frog.sprite);
    frog.sprite.animations.add('run');
    frog.sprite.animations.play('run', 5, true);
    this.physics.enable(frog.sprite);

    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function() {
    frog.sprite.body.velocity.x = -100;
  }
}, true);
