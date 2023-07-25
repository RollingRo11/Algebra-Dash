import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene{
   key1;
   key2;
   
    constructor() {
        super("hellow")
    }

    preload(){
        this.load.image('background', 'MenuScreen');
        this.load.image('quit', 'QuitButton');
        this.load.image('settings', 'SettingsButton')
        this.load.image('play', 'PlayButton')
    }

    create(){
        this.key1 = Phaser.Input.Keyboard.KeyCodes.ENTER;
        if(this.key1.isDown){
            this.scene.start('LevelOne')
        }
    }
}