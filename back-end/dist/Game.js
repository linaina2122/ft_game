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
        this.cloneX = 0;
        this.cloneY = 0;
        this.radius = 25;
        this.segment = 100;
        this.velocityX = 7;
        this.velocityY = 7;
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