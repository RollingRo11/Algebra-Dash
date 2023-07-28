import TestLevel from "./TestLevel.js";
console.log("Hi");
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
	  default: 'arcade',
	  arcade: {
		gravity: { y: 400 },
	  },
	}
  };
  
  const game = new Phaser.Game(config);