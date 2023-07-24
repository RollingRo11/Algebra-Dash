import Phaser from "phaser";
import { Game as GameType } from "phaser";
import StartGameScene from "./scenes/MenuScene";

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
	scene: [StartGameScene],
}

export default new Phaser.Game(config)