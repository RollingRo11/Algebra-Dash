import { TestLevel } from "./../scenes/TestLevel.js";

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1920,
	heigth: 1080,
	scale: {
	  mode: Phaser.Scale.RESIZE,
	  autoCenter: Phaser.Scale.CENTER_BOTH
	},
	scene: [TestLevel],
	physics: {
		default: "matter",
		matter: { 
		  		debug: true
		}
	}
  };
  
  const game = new Phaser.Game(config);