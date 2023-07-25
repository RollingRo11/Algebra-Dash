export class Player extends Phaser.Physics.Arcade.Sprite
    {
        constructor(scene, x, y){
            super(scene, x, y, 'player');
            scene.add.existing(this);
            scene.physics.add.existing(this);
            this.setScale(2);
            this.setCollideWorldBounds(true);
            this.setGravityY(200);
        }
    }
