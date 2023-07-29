import { Enemy } from './../scripts/Enemy.js';

export class TestLevel extends Phaser.Scene{
    preload() {
        this.load.image('background', './src/assets/images/skies.png');
        this.load.atlas("player", './src/assets/spritesheets/Xsheet.png', './src/assets/spritesheets/Xsheet.json');
        this.load.image('gun', './src/assets/images/SQRT.png');
        this.load.image('middle', './src/assets/images/middle.png');
        this.load.image('bullet', './src/assets/images/Bullet.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', './src/assets/tilemaps/Level1AlgebraDashRealest.json');

        //load tilesets
        this.load.image('tileset', './src/assets/tilesets/tileset.png');
        this.load.image('RainforestTileset', './src/assets/tilesets/Tileset (1).png');
        this.load.image('sunnylandProps', './src/assets/tilesets/props.png');
        //this.load.image('PlatformDemo(1)', './src/assets/tilesets/PlatformDemo(1).png');
        this.load.image('Cave Tileset', './src/assets/tilesets/mainlev_build.png');
        this.load.image('Cave Props 2', './src/assets/tilesets/props2.png');
        this.load.image('Cave Props', './src/assets/tilesets/props1.png');
        this.load.image('LavaTile set (1)', './src/assets/tilesets/LavaTile set (1).png');
        this.load.image('Lava', './src/assets/tilesets/Lava_64x32 (1).png');
        //this.load.image('PlatformBurnt (1)', './src/assets/tilesets/PlatformBurnt (1).png');
        //load the gun images
        this.load.image('sqrtBL', './src/assets/images/SQRT_BottomLeft.png');
        this.load.image('sqrtBR', './src/assets/images/SQRT_BottomRight.png');
        this.load.image('sqrtTL', './src/assets/images/SQRT_TopLeft.png');
        this.load.image('sqrtTR', './src/assets/images/SQRT_TopRight.png');
        this.load.image('sqrtR', './src/assets/images/SQRT_Right.png');
        this.load.image('sqrtL', './src/assets/images/SQRT_Left.png');
        this.load.image('sqrtU', './src/assets/images/SQRT_UpLeft.png');
        this.load.image('sqrtD', './src/assets/images/SQRT_DownRight.png');

        this.load.atlas('Gamma', './src/assets/spritesheets/Gamma_spritesheet.png', './src/assets/spritesheets/Gamma_spritesheet.json')
        
    }
    
    sayOuch(obj1, obj2) {
      console.log("Ouch");
    }

    create() {
      var angle;

      this.background = this.add.tileSprite(0, 0, 6400, 2240, "background").setOrigin(0).setScrollFactor(0.1, 0.1);

        const arrayRange = (start, stop, step) =>
        Array.from({ length: (stop - start) / step + 1 },
        (value, index) => start + index * step
        );

        const map = this.make.tilemap({ key: 'map',});

        const Tileset = map.addTilesetImage('tileset', 'tileset');
        const RainforestTileset = map.addTilesetImage('RainforestTileset', 'RainforestTileset');
        const sunnyLandProps = map.addTilesetImage('sunnylandProps', 'sunnylandProps');
        const CaveTileset = map.addTilesetImage('Cave Tileset', 'Cave Tileset');
        const CaveProps2 = map.addTilesetImage('Cave Props 2', 'Cave Props 2');
        const CaveProps = map.addTilesetImage('Cave Props', 'Cave Props');
        const LavaTileset1 = map.addTilesetImage('LavaTile set (1)', 'LavaTile set (1)');
        const Lava = map.addTilesetImage('Lava', 'Lava');
        
        const tileys = [Tileset, RainforestTileset, sunnyLandProps, CaveTileset, CaveProps, CaveProps2, Lava, LavaTileset1]


        const GroundLayer = map.createLayer('Ground Layer', tileys, 0, 0);
        const WaterLayer = map.createLayer('Water Layer', tileys, 0, 0);
        const PropLayer = map.createLayer('Prop Layer', tileys, 0, 0);
        const BackgroundLayer = map.createLayer('Background Layer', tileys, 0, 0);
        const CrateLayer = map.createLayer('Crate Layer', tileys, 0, 0);

        //GroundLayer.resizeWorld();

        //GroundLayer.setCollisionByProperty({ collides: true });

        
        var camera;

        this.cameras.main.setBounds(0, -700, 64000, 100000, true);
        this.physics.world.setBounds(0, -700, 64000, 100000);
        map.setCollision(arrayRange(1, 10000, 1), true, false, 'Ground Layer', true);


        this.enemy1 = new Enemy(this, 300, 5400);
        this.physics.add.collider(this.enemy1, GroundLayer);

        this.playerBullets = [];
      this.playerBulletGroup = this.physics.add.group({
        collideWorldBounds: true,
        onCollide: true
      });
      this.physics.add.collider(this.playerBulletGroup, this.enemy1, this.sayOuch, null, this);

        //PLAYER PACKAGE:----------------------------------------------------------------
        
        this.player = this.physics.add.sprite(160, 5400, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platform);   
        map.setCollisionBetween(1, 999, true, GroundLayer);   
        this.cameras.main.startFollow(this.player, true);

        GroundLayer.setCollisionByExclusion([-1]);
        this.physics.add.collider(this.player, GroundLayer);

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
      	let PI = Math.PI;
      	const playerCenter = new Phaser.Math.Vector2(this.player.x, this.player.y);
        let temp = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.mousePointer.x + this.cameras.main.scrollX, this.input.mousePointer.y + this.cameras.main.scrollY);
        this.angle = temp*(180/PI);
    }

      calcDirection(){
        if(this.angle <= 22.5 && this.angle >= -22.5){
          this.gun.setTexture('sqrtR');
          return('right');
        } else if (this.angle < -22.5 && this.angle >= -67.5){
          this.gun.setTexture('sqrtTR');
          return('topright');
        } else if (this.angle < -67.5 && this.angle >= -112.5){
          this.gun.setTexture('sqrtU');
          return('up')
        } else if (this.angle < -112.5 && this.angle >= -157.5){
          this.gun.setTexture('sqrtTL');
          return('topleft')
        } else if (this.angle > 22.5 && this.angle <= 67.5){
          this.gun.setTexture('sqrtBR');
          return('bottomright');
        } else if (this.angle > 67.5 && this.angle <= 112.5){
          this.gun.setTexture('sqrtD');
          return('down');
        } else if (this.angle > 112.5 && this.angle <= 157.5){
          this.gun.setTexture('sqrtBL');
          return('bottomleft');
        } else{
          this.gun.setTexture('sqrtL');
          return('left');
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
      
        if (Phaser.Input.Keyboard.JustDown(this.keys.up) && this.player.body.onFloor()) {
          this.player.setVelocityY(-600);
          //this.gun.setVelocityY(-600);
        }

        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
          this.shootBullet();
        }
      
        if (this.player.body.velocity.x > 0) {
          this.player.setFlipX(false);
          //this.gun.setFlipX(false);
        } else if (this.player.body.velocity.x < 0) {
          this.player.setFlipX(true);
          //this.gun.setFlipX(true);
        }

        //gun stuff
        this.gun.x = this.player.x;
        this.gun.y = this.player.y;
        this.getAngle();
        this.calcDirection();

        //Bullet collision
        for(let i = this.playerBullets.length - 1; i >= 0; i--){
          if(this.playerBullets[i].x < this.player.x - 1000 || this.playerBullets[i].x > this.player.x + 1000 || this.playerBullets[i].x < this.player.y - 700 || this.playerBullets[i].x > this.player.x + 700){
            this.playerBullets.splice(i, 1);
          }
        }

      }

      shootBullet() {
        const bulletSpeed = 5000; // Adjust the bullet speed as needed
        const bulletOffset = 60; // Adjust the offset distance in front of the player as needed
        const bullet = this.physics.add.sprite(this.player.x, this.player.y, 'bullet');
        this.playerBullets.push(bullet);
      
        // Get the direction from calcDirection
        const direction = this.calcDirection();
      
        // Calculate the offset values based on the direction
        let xOffset = 0;
        let yOffset = 0;
      
        switch (direction) {
          case 'right':
            xOffset = bulletOffset;
            bullet.angle = 0;
            break;
          case 'topright':
            xOffset = bulletOffset * Math.cos(45);
            yOffset = -bulletOffset * Math.sin(45);
            bullet.angle = -45;
            break;
          case 'up':
            yOffset = -bulletOffset;
            bullet.angle = -90;
            break;
          case 'topleft':
            xOffset = -bulletOffset * Math.cos(45);
            yOffset = -bulletOffset * Math.sin(45);
            bullet.angle = -135;
            break;
          case 'bottomright':
            xOffset = bulletOffset * Math.cos(45);
            yOffset = bulletOffset * Math.sin(45);
            bullet.angle = 45;
            break;
          case 'down':
            yOffset = bulletOffset;
            bullet.angle = 90;
            break;
          case 'bottomleft':
            xOffset = -bulletOffset * Math.cos(45);
            yOffset = bulletOffset * Math.sin(45);
            bullet.angle = -45;
            break;
          default:
            xOffset = -bulletOffset;
            bullet.angle = 180;
            break;
        }
      
        // Calculate the initial position of the bullet based on the player's position and the offsets
        bullet.x += xOffset;
        bullet.y += yOffset;
      
        // Calculate the velocity components based on the direction only (ignoring mouse angle)
        switch (direction) {
          case 'right':
            bullet.body.velocity.x = bulletSpeed;
            bullet.body.velocity.y = 0;
            break;
          case 'topright':
            bullet.body.velocity.x = bulletSpeed * Math.cos(45);
            bullet.body.velocity.y = -bulletSpeed * Math.sin(45);
            break;
          case 'up':
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = -bulletSpeed;
            break;
          case 'topleft':
            bullet.body.velocity.x = -bulletSpeed * Math.cos(45);
            bullet.body.velocity.y = -bulletSpeed * Math.sin(45);
            break;
          case 'bottomright':
            bullet.body.velocity.x = bulletSpeed * Math.cos(45);
            bullet.body.velocity.y = bulletSpeed * Math.sin(45);
            break;
          case 'down':
            bullet.body.velocity.x = 0;
            bullet.body.velocity.y = bulletSpeed;
            break;
          case 'bottomleft':
            bullet.body.velocity.x = -bulletSpeed * Math.cos(45);
            bullet.body.velocity.y = bulletSpeed * Math.sin(45);
            break;
          default:
            bullet.body.velocity.x = -bulletSpeed;
            bullet.body.velocity.y = 0;
            break;
        }
      
        // You may want to add the bullet to a group for better management
        //this.playerBullets.add(bullet);
      }
      
      
      
      

    }


