export class Enemy extends Phaser.Physics.Arcade.Sprite
    {
        health = 3;
        constructor(scene, x, y)
        {
            super(scene, x, y, 'Gamma');
            scene.add.existing(this);
            scene.physics.add.existing(this);
            //this.setScale(2);
            this.setCollideWorldBounds(true);
            //this.setGravityY(3000); //We will set gravity *per object* rather than for the scene!
        }
        /*takeDamage(object){
            health--;
            if(health === 0){
                console.log("Ouch");
            }
        }*/
    }