export default class TestLevel extends Phaser.Scene{
    preload() {
        this.load.image('background', './src/assets/images/skyBackground.png');
        this.load.atlas("player", './src/assets/spritesheets/Xsheet.png', './src/assets/spritesheets/Xsheet.json');
        this.load.image('tiles', './src/assets/tilesets/tileset.png');
        this.load.image('gun', './src/assets/images/SQRT.png');
        this.load.image('middle', './src/assets/images/middle.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', './src/assets/tilemaps/levelOne.json');

        this.load.image('sqrtBL', './src/assets/images/SQRT_BottomLeft');
        this.load.image('sqrtBR', './src/assets/images/SQRT_BottomRight');
        this.load.image('sqrtTL', './src/assets/images/SQRT_TopLeft');
        this.load.image('sqrtTR', './src/assets/images/SQRT_TopRight');
        this.load.image('sqrtR', './src/assets/images/SQRT_Right');
        this.load.image('sqrtL', './src/assets/images/SQRT_Left');
        this.load.image('sqrtU', './src/assets/images/SQRT_UpLeft');
        this.load.image('sqrtD', './src/assets/images/SQRT_DownRight');

        
    }
      
    create() {
      this.background = this.add.tileSprite(0, 0, 64000, 2240, "background")
      .setOrigin(0)
      .setScrollFactor(0, 1);


        //const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        //backgroundImage.setScale(2, 1);

        //TILESET STUFF (PUT IN AFTER TILESET/MAP IS IMPORTED)
        const arrayRange = (start, stop, step) =>
        Array.from({ length: (stop - start) / step + 1 },
        (value, index) => start + index * step
        );

console.log(arrayRange(1, 5, 1)); // [1,2,3,4,5]
        const map = this.make.tilemap({ key: 'map',});
        const tileset = map.addTilesetImage('tileset', 'tiles');
        
        this.platform = map.createLayer('Ground Layer', tileset, 0, 0);
        this.platform.setCollisionByProperty({ collides: true });

        const EnemyLayer = map.createLayer('Enemy Layer', tileset, 0, 0);
        const Water = map.createLayer('Extra Water', tileset, 0, 0);
        const props = map.createLayer('Prop Layer', tileset, 0, 0);
        const Fence = map.createLayer('Fence', tileset, 0, 0);
        const Crate = map.createLayer('Crate', tileset, 0, 0);
        
        var camera;

        this.cameras.main.setBounds(0, -700, 64000, 100000, true);
        this.physics.world.setBounds(0, -700, 64000, 100000);
        map.setCollision(arrayRange(1, 10000, 1), true, false, 'Ground Layer', true);



        //PLAYER PACKAGE:----------------------------------------------------------------
        
        this.player = this.physics.add.sprite(0, 0, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);   
        map.setCollisionBetween(1, 999, true, this.platform);   
        this.cameras.main.startFollow(this.player, true);

        this.gun = this.add.sprite(0, 0, 'gun');

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

      getAngle(){
        let angle = Phaser.Math.Angle.between(this.player.getCenter[0], this.player.getCenter[1], this.input.mousePointer.x , this.input.mousePointer.y)
        console.log(angle)
      }

      calcDirection(){
        if(angle <= 22.5 && angle >= -22.5){
          //orient gun right
          this.gun.setTexture('sqrtR');
        } else if (angle < -22.5 && angle >= -67.5){
          //orient gun top right
          this.gun.setTexture('sqrtTR');
        } else if (angle < -67.5 && angle >= -112.5){
          //orient gun up
          this.gun.setTexture('sqrtU');
        } else if (angle < -112.5 && angle >= -157.5){
          this.gun.setTexture('sqrtTL');
        } else if (angle > 22.5 && angle <= 67.5){
          this.gun.setTexture('sqrtBR');
        } else if (angle > 67.5 && angle <= 112.5){
          this.gun.setTexture('sqrtD');
        } else if (angle > 112.5 && angle <= 157.5){
          this.gun.setTexture('sqrtBL');
        } else{
          this.gun.setTexture('');
          //orient gun left
        }
      }
      
    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keys.left)){          
            this.player.play('curl')
            this.time.delayedCall(300, this.curlFinished, [], this);

        } else if (this.keys.left.isDown){
          this.player.setVelocityX(-500);
          //this.gun.setVelocityX(-500);
        
        } else if (Phaser.Input.Keyboard.JustDown(this.keys.right)){
            this.player.play('curl')
            this.time.delayedCall(300, this.curlFinished, [], this);
          } else if (this.keys.right.isDown){
            this.player.setVelocityX(500);
            //this.gun.setVelocityX(500);


        } else if (Phaser.Input.Keyboard.JustUp(this.keys.right) || Phaser.Input.Keyboard.JustUp(this.keys.left)) {
            this.player.playReverse('curl');
            this.time.delayedCall(300, this.recurlFinished, [], this);
          this.player.setVelocityX(0);
          //this.gun.setVelocityX(0);
        }
      
        if ((this.keys.space.isDown || this.keys.up.isDown) && this.player.body.onFloor()) {
          this.player.setVelocityY(-400);
          //this.gun.setVelocityY(-600);
        }
      
        if (this.player.body.velocity.x > 0) {
          this.player.setFlipX(false);
          this.gun.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
          this.player.setFlipX(true);
          this.gun.setFlipX(true);
        }

        //gun stuff
        this.gun.x = this.player.x;
        this.gun.y = this.player.y;


      }

}


