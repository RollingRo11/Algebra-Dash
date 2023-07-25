class Npc extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'Texture', 'Frame');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.5);
        this.setBounce(1, 1);
        this.setCollideWorldBounds(true);
        }
    
}