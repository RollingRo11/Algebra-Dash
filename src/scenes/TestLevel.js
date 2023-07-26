export default class TestLevel extends Phaser.Scene{
    preload() {
        this.load.image('background', './src/assets/images/clouds.png');
        this.load.atlas("player", './src/assets/spritesheets/Xsheet.png', './src/assets/spritesheets/Xsheet.json');
        //this.load.image('tilesheet', './src/assets/tilesets/tileset.png');
        //this.load.tilemapTiledJSON('tilemap', './src/assets/tilemaps/Level1AlgebraDash.json');
    }
      
    create() {

        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 1);

        //TILESET STUFF (PUT IN AFTER TILESET/MAP IS IMPORTED)
        /*
        const map = this.make.tilemap({ key: 'tilemap' });
        const tileset = map.addTilesetImage('levelOneTiles', 'tilesheet');
        map.createStaticLayer('Image Layer 1', tileset)
        map.createStaticLayer('Imagxe Layer 2', tileset)
        map.createStaticLayer('Tile Layer 6', tileset)
        map.createStaticLayer('Tile Layer 5', tileset)
        map.createStaticLayer('Prop Tile', tileset)
        map.createStaticLayer('Enemy Markers', tileset)
        map.createStaticLayer('Tile Layer 2', tileset)
        map.createStaticLayer('Ground Layer', tileset)
        //platforms.setCollisionByExclusion(-1, true);
        */
      
        this.player = this.physics.add.sprite(50, 300, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        //this.physics.add.collider(this.player, platforms);
        var isCurling;
        var isRolling;

        this.anims.create({
          key: "curl",
          frames: this.anims.generateFrameNames("player", {
            prefix: "Curl",
            end: 9,
            zeroPad: 0,
          }),
          repeat: 0,
          framerate: 10,
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
          framerate: 20,
        });


        this.anims.create({
          key: "jump",
          frames: this.anims.generateFrameNames("player", {
            prefix: "Curl",
            end: 0,
            zeropad: 0,
          }),
          repeat: 0,
        });

        this.cursors = this.input.keyboard.createCursorKeys();
        this.keys = this.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D', space: 'SPACE' });
      }

      curlFinished() {
        this.player.play('roll');
        this.isCurling = false;
        console.log('delayed')
        this.isRolling = true;
        
      }
      
    update() {
      this.isCurling = false;
      
        if ((this.keys.left.isDown) && (this.isCurling = false)) {
          console.log('left key tapped')
          if (this.player.body.onFloor()) {console.log('floored')}
            this.player.play('curl')
            this.isCurling = true;
            console.log('curling')
            this.time.delayedCall(1000, this.curlFinished, [], this);

        } else if (this.keys.left.isDown){
          this.player.setVelocityX(-200)
          
        } else if ((this.keys.right.isDown) && (this.isCurling)) {
          console.log('right key tapped')
          if (this.player.body.onFloor()) {console.log('floored')}
            this.player.play('curl')
            this.isCurling = true;
            console.log('curling')
            this.time.delayedCall(1000, this.curlFinished, [], this);

        } else if (this.isCurling = false){
          this.player.setVelocityX(0);
          if (this.player.body.onFloor()) {
            this.player.play('idle', true);}
        } else {
          this.player.setVelocityX(0);
        }
      
        if ((this.keys.space.isDown || this.keys.up.isDown) && this.player.body.onFloor()) {
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


