import Phaser from 'phaser'
import { Player } from '../player';

export default class LevelOne extends Phaser.Scene
{
	constructor(){
		super('Level One')
	}

	preload(){
		this.load.image('background', 'clouds.png');
		this.load.image('player', 'X.png');
		this.load.image('platform', 'platform.png');
	}

	create(){
		let background = this.add.tileSprite(0, 0, game.scale.width, game.scale.height, "background").setOrigin(0, 0);

		createPlatforms(this);
		player = new Player(this, 400, 400);
		this.physics.add.collider(player, platforms);

		cursors = this.input.keyboard.createCursorKeys();
        keys = this.input.keyboard.addKeys("A, D");
        space = this.input.keyboard.addKey(
        Phaser.Input.Keyboard.KeyCodes.SPACE);

		space.on("down", jump);
	}

	update() {
        //Player will not move in the x-axis unless a movement key is being pressed
        player.setVelocityX(0);

        //Player has "drag" on the x-axis meaning they slide a bit after an input
        player.setDragX(1000);

        //This will reset the number of jumps available to the player whenever the player lands
        if (player.body.touching.down) {
          player.currentJumps = 0;
        }

    
        if (cursors.left.isDown || keys.A.isDown) {
          player.setVelocityX(-400);
        }

        if (cursors.right.isDown || keys.D.isDown) {
          player.setVelocityX(400);
        }
	}

	jump(event) {
        if (player.body.touching.down) {
          //If the player is on the ground, the player can jump
          player.setVelocityY(-1100);
          player.currentJumps++;
        } else if (player.currentJumps < player.totalJumps) {
          //If the player is not on the ground but has an available air jump, use that jump
          player.setVelocityY(-800);
          player.currentJumps++;
        }
      }
}