import { Server } from "socket.io";
import { globalVar } from "src/object";

export class Game {
    private server: Server
    private player: any[]
    listener: any
    lPlayer: any;
    rPlayer: any;
    Ball : any;
    constructor(io: Server, client: any[]) {
        this.server = io;
        this.player = client;
        this.Ball = new Ball();
        this.lPlayer = new left_player(this.player[0]);
        this.rPlayer = new right_player(this.player[1]);
        // this.listener = this.server.on("lPlayer", (data)=>{
        //     console.log(data)
        // })
    }
}

class Ball {
    positionX = 0;
    positionY = 0;
    cloneX = 0;
    cloneY = 0;
    radius = 25;
    segment = 100;
    velocityX = 2;
    velocityY = 2;

    constructor() { }
};

class right_player {
    socket:any;

    height = 200;
    width = 50;
    positionX = ((globalVar.Width / - 2) + 25);
    positionY = 0;
    velocity = 10;
    score = 0;

    constructor(Id: any) {
        this.socket = Id;
    }
};

class left_player {
    constructor(Id: any) { }
    height = 200;
    width = 50;
    positionX = ((globalVar.Width / + 2) + 25);
    positionY = 0;
    velocity = 10;
    score = 0;
}
