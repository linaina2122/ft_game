"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const object_1 = require("./object");
class Game {
    constructor(io, client) {
        this.server = io;
        this.Ball = new Ball(this);
        this.lPlayer = new left_player(io, client[0], client[1]);
        this.rPlayer = new right_player(io, client[1], client[0]);
    }
}
exports.Game = Game;
class Ball {
    constructor(game) {
        this.positionX = 0;
        this.positionY = 0;
        this.radius = 25;
        this.segment = 100;
        this.velocityX = 0.3;
        this.velocityY = 0.3;
        this.game = game;
    }
    Ball(io) {
        this.positionX += this.velocityX;
        this.positionY -= this.velocityY;
        if ((this.positionY - this.radius) > (object_1.globalVar.Height / 2) - (this.radius * 2))
            this.velocityY *= -1;
        if ((this.positionY + this.radius) * -1 > (object_1.globalVar.Height / 2) - (this.radius * 2))
            this.velocityY *= -1;
        if (this.positionY > this.game.lPlayer.positionY + (object_1.globalVar.PuddleHeight / 2) ||
            this.positionY < (this.game.lPlayer.positionY - (object_1.globalVar.PuddleHeight / 2))) {
            this.game.lPlayer.score += 1;
        }
        else {
            if (this.positionX + (this.radius * 2) > this.game.lPlayer.positionX)
                this.velocityX *= -1;
            if (this.game.Ball.positionX - (this.game.Ball.radius * 2) < this.game.rPlayer.positionX)
                this.velocityY *= -1;
        }
        let interval2 = setInterval(() => {
            this.Ball(io);
        }, 10000 / 20);
        let interval = setInterval(() => {
            this.game.lPlayer.pushToOther();
            this.game.rPlayer.pushToOther();
            io.emit("startGame", this.positionX, this.positionY);
        }, 1000 / 20);
    }
}
;
class right_player {
    constructor(server, myId, otherId) {
        this.height = 200;
        this.width = 50;
        this.positionX = ((object_1.globalVar.Width / -2) + 25);
        this.positionY = 0;
        this.velocity = 10;
        this.score = 0;
        this.server = server;
        this.socket = otherId;
        let rPlayer = (data) => {
            this.positionY = data.y;
        };
        let listen = server.sockets.sockets.get(myId);
        listen.on("rPlayer", rPlayer);
    }
    pushToOther() {
        this.server.to(this.socket).emit("right", this.positionY);
    }
}
;
class left_player {
    constructor(server, myId, otherId) {
        this.height = 200;
        this.width = 50;
        this.positionX = ((object_1.globalVar.Width / +2) + 25);
        this.positionY = 0;
        this.velocity = 10;
        this.score = 0;
        this.server = server;
        this.socket = otherId;
        let lPlayer = (data) => {
            this.positionY = data.y;
        };
        let listen = server.sockets.sockets.get(myId);
        listen.on("lPlayer", lPlayer);
    }
    pushToOther() {
        this.server.to(this.socket).emit("left", this.positionY);
    }
}
//# sourceMappingURL=Game.js.map