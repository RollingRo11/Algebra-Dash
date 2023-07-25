import Phaser, { Game } from "phaser";
import { Game as GameType } from "phaser";
import StartGameScene from "./scenes/MenuScene";
import LevelOne from "./scenes/LevelOneScene";

const config: Phaser.Types.Core.GameConfig = {
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

	scene: [StartGameScene, LevelOne],
}

var game = new Phaser.Game(config);
