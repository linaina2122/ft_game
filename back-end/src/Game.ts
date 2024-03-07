import { Server } from "socket.io";
import { globalVar } from "src/object";

export class Game{
    private server : Server
    private player : any[]
    rPlayer = new right_player()
    constructor(io : Server, client : any[] ){
        this.server = io;
        this.player = client
    }

    initPlayer(){
        console.log(this.rPlayer.positionX)
    }
}

class Ball{
    constructor(){}
    positionX = 0;
    positionY = 0;
    cloneX = 0;
    cloneY = 0;
    radius = 25;
    segment = 100;
    velocityX = 7;
    velocityY = 7;
};

class right_player{
    constructor(){}
    height = 200;
    width = 50;
    positionX = ((globalVar.Width / - 2) + 25);
    positionY = 0;
    velocity = 10;
};

class left_player{
    constructor(){}
    height = 200;
    width = 50;
    positionX = ((globalVar.Width / + 2) + 25);
    positionY = 0;
    velocity = 10;
}
