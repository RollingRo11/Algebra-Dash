export default class TestLevel extends Phaser.Scene{
    preload() {
        this.load.image('background', './src/assets/clouds.png');
        //tileset this.load.image('tiles', 'tileset.png');
        //this.load.tilemapTiledJSON('map', '');
        this.load.image('player', './src/assets/X.png')
    }
      
    create() {
        //const map = this.make.tilemap({ key: 'map' });
        //const tileset = map.addTilesetImage('tiles');
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 1);
        //const platforms = map.createStaticLayer('Platforms', tileset, 0, 200);
        //platforms.setCollisionByExclusion(-1, true);
      
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
       // this.physics.add.collider(this.player, platforms);
      
        /*
        this.anims.create({
          key: 'walk',
          frames: this.anims.generateFrameNames('player', {
            prefix: 'variable-boi',
            start: 2,
            end: 3,
          }),
          frameRate: 10,
          repeat: -1
        });
      
        this.anims.create({
          key: 'idle',
          frames: [{ key: 'player', frame: 'variable_boi_0' }],
          frameRate: 10,
        });
      
        this.anims.create({
          key: 'jump',
          frames: [{ key: 'player', frame: 'variable_boi_1' }],
          frameRate: 10,
        });
        */
        this.cursors = this.input.keyboard.createCursorKeys();
      }
      
    update() {
        if (this.cursors.left.isDown) {
          this.player.setVelocityX(-200);
          if (this.player.body.onFloor()) {
            this.player.play('walk', true);
          }
        } else if (this.cursors.right.isDown) {
          this.player.setVelocityX(200);
          if (this.player.body.onFloor()) {
            this.player.play('walk', true);
          }
        } else {
          this.player.setVelocityX(0);
          //if (this.player.body.onFloor()) {
          //  this.player.play('idle', true);}
        }
      
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
          this.player.setVelocityY(-350);
          this.player.play('jump', true);
        }
      
        if (this.player.body.velocity.x > 0) {
          this.player.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
          this.player.setFlipX(true);
        }
      }
}


