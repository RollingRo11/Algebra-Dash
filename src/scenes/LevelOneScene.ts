import Phaser from "phaser";
import {Player} from "./../Player";

export default class LevelOne extends Phaser.Scene{
    user;
    X;

    constructor() {
        super("hellow")
        this.user =  new Player(LevelOne, 0, 1);
    }

    preload(){
        this.load.image('background', );
        this.load.image('tilemap', );
        this.load.image('tileset', );
        this.load.image('player', './assets/x');
    }

    create(){
        this.add.image(0, 0, 'background')

        this.createPlayer()
        
    }
    createPlayer()
	{
        this.user.setBounce(0.2)
		this.user = this.physics.add.sprite(100, 450, this.X)
		this.user.setCollideWorldBounds(true)

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers(this.X, { start: 0, end: 3 }),
			frameRate: 10,
			repeat: -1
		})
		
		this.anims.create({
			key: 'turn',
			frames: [ { key: this.X, frame: 4 } ],
			frameRate: 20
		})
		
		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers(this.X, { start: 5, end: 8 }),
			frameRate: 10,
			repeat: -1
		})

    }
}