export default class TestLevel extends Phaser.Scene{
    preload() {
        this.load.image('background', './src/assets/images/clouds.png');
        this.load.atlas("player", './src/assets/spritesheets/Xsheet.png', './src/assets/spritesheets/Xsheet.json');
        this.load.image('tiles', './src/assets/tilesets/tileset.png');
    // Load the export Tiled JSON
    this.load.tilemapTiledJSON('map', './src/assets/tilemaps/test4.json');
    }
      
    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 1);

        //TILESET STUFF (PUT IN AFTER TILESET/MAP IS IMPORTED)
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('tileset', 'tiles');
        const platform = map.createLayer('Tile Layer 1', tileset, 0, 0);
        var camera;

        this.cameras.main.setBounds(0, 0, 3840, 1080, true);
        this.physics.world.setBounds(0, 0, 64000, 2240);




        //PLAYER PACKAGE:----------------------------------------------------------------
        
        this.player = this.physics.add.sprite(0, 0, 'player');
        this.gun = this.add.sprite(0, 0, 'gun');
        const playerPackage = this.add.container(0, 0, ['player', 'gun']);
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, platform);   
        map.setCollisionBetween(1, 999, true, 'Platform');   

        //this.cameras.main.setSize(1920, 1080);
        this.cameras.main.startFollow(this.player, true);


        

        this.anims.create({
          key: "curl",
          frames: this.anims.generateFrameNames("player", {
            prefix: "Curl",
            end: 9,
            zeroPad: 0,
          }),
          repeat: 0,
          framerate: 20,
        });

        this.anims.create({
          key: "recurl",
          frames: this.anims.generateFrameNames("player", {
            prefix: "Curl",
            end: 0,
            zeroPad: 0,
          }),
          frameRate: 60,
          repeat: -0,
        });

        this.anims.create({
          key: "idle",
          frames: this.anims.generateFrameNames("player", {
            prefix: "Curl",
            end: 0,
            zeroPad: 0,
          }),
          repeat: 0,
        });

        this.anims.create({
          key: "roll",
          frames: this.anims.generateFrameNames("player", {
            prefix: "Rolling",
            end: 2,
            zeroPad: 0,
          }),
          repeat: -1,
          framerate: 80,
        });
        
        //generate keys for user input
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', space: 'SPACE' });
      }

      curlFinished() {
        this.player.play('roll', true);
      }

      recurlFinished() {
        this.player.play('idle', true);
      }
      
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.left)){          
            this.player.play('curl')
            this.time.delayedCall(300, this.curlFinished, [], this);

        } else if (this.keys.left.isDown){
          this.player.setVelocityX(-500);
        
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)){
            this.player.play('curl')
            this.time.delayedCall(300, this.curlFinished, [], this);
          } else if (this.keys.right.isDown){
            this.player.setVelocityX(500);

        } else if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
            this.player.playReverse('curl');
            this.time.delayedCall(300, this.recurlFinished, [], this);
          this.player.setVelocityX(0);

        }
      
        if ((this.keys.space.isDown || this.keys.up.isDown) && this.player.body.onFloor()) {
          this.player.setVelocityY(-600);
        }
      
        if (this.player.body.velocity.x > 0) {
          this.player.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
          this.player.setFlipX(true);
        }
      }
}


