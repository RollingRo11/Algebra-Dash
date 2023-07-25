import { Player } from "./player"

var config = {
	type: Phaser.WEBGL,
	parent: 'app',
	width: 1920,
	height: 1080,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},

	scene: [LevelOne],
}

var game = new Phaser.Game(config);
