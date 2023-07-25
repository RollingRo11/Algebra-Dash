import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene{
   key1;
   key2;
   
    constructor() {
        super("hellow")
    }

    preload(){
        
    }

    create(){
        this.key1 = Phaser.Input.Keyboard.KeyCodes.SHIFT;
        if(this.key1.isDown){
            this.scene.start('LevelOne')
        }
    }
}