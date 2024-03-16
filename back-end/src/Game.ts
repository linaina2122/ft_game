import { Server } from "socket.io";
import { globalVar, roomSetting } from "src/object"

export class Game {
    private server: Server
    roomName: string;
    lPlayer: any;
    rPlayer: any;
    Ball: any;
    constructor(io: Server, client: any[], roomName: string) {
        this.server = io;
        this.roomName = roomName;
        this.Ball = new Ball(this);
        this.lPlayer = new left_player(io, client[0], client[1]);
        this.rPlayer = new right_player(io, client[1], client[0]);
    }
}

class Ball {
    positionX = 0;
    positionY = 0;
    radius = 25;
    segment = 100;
    velocityX = 5;
    velocityY = 5;
    game: Game;

    constructor(game: Game) {
        this.game = game;
    }
    checkCollision(){
        if ((this.positionY - this.radius) * -1 > (globalVar.Height / 2) - 5)
            this.velocityY *= -1;
        if ((this.positionY + this.radius)  > (globalVar.Height / 2) - 5)
            this.velocityY *= -1;
        if (this.positionY > this.game.lPlayer.positionY + (globalVar.PuddleHeight / 2))
            // this.positionY < (this.game.lPlayer.positionY - (globalVar.PuddleHeight / 2)))
            this.game.lPlayer.score += 1;
            // console.log("score is :", this.game.lPlayer.score);}
    }

    updatePosition(io: Server) {
        this.positionX += this.velocityX;
        this.positionY -= this.velocityY;
        this.checkCollision();
        // console.log("ball x pos: ", this.positionX);
        // console.log("padll x pos: ", this.game.lPlayer.positionX);
        if ((this.positionX + (this.radius * 2))  > (this.game.lPlayer.positionX) && (this.positionY < (this.game.lPlayer.positionY + globalVar.PuddleHeight / 2)))
            this.velocityX *= -1;
//             if (this.game.Ball.positionX - (this.game.Ball.radius * 2) < this.game.rPlayer.positionX)
//                 this.velocityY *= -1;
}

    start(io : Server){
            let interval = setInterval(() => {
                this.updatePosition(io)
                this.game.lPlayer.pushToOther();
                this.game.rPlayer.pushToOther();
                io.to(this.game.roomName).emit("startGame", this.positionX, this.positionY);
            }, 1000 / 30)
        }

};

class right_player {
    server: any;
    socket: any;

    height = 200;
    width = 50;
    positionX = ((globalVar.Width / -2) + 25);
    positionY = 0;
    velocity = 10;
    score = 0;

    constructor(server: Server, myId: any, otherId: any) {
        this.server = server;
        this.socket = otherId;
        let rPlayer = (data: { y: number }) => {
            this.positionY = data.y;
        }
        let listen = server.sockets.sockets.get(myId);
        listen.on("rPlayer", rPlayer);
    }

    pushToOther() {
        this.server.to(this.socket).emit("right", this.positionY);
    }
};

class left_player {
    server: any;
    socket: any;

    height = 200;
    width = 50;
    positionX = ((globalVar.Width / 2) - 25);
    positionY = 0;
    velocity = 10;
    score = 0;

    constructor(server: Server, myId: any, otherId: any) {
        this.server = server;
        this.socket = otherId;
        let lPlayer = (data: { y: number }) => {
            this.positionY = data.y;
        }
        let listen = server.sockets.sockets.get(myId);
        listen.on("lPlayer", lPlayer);
    }

    pushToOther() {
        this.server.to(this.socket).emit("left", this.positionY);
    }
}
