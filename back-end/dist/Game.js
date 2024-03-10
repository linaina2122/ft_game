"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const object_1 = require("./object");
class Game {
    constructor(io, client) {
        this.server = io;
        this.player = client;
        this.Ball = new Ball();
    }
}
exports.Game = Game;
class Ball {
    constructor() {
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
    constructor(Id) {
        this.height = 200;
        this.width = 50;
        this.positionX = ((object_1.globalVar.Width / -2) + 25);
        this.positionY = 0;
        this.velocity = 10;
        this.score = 0;
        this.socket = Id;
    }
}
;
class left_player {
    constructor(Id) {
        this.height = 200;
        this.width = 50;
        this.positionX = ((object_1.globalVar.Width / +2) + 25);
        this.positionY = 0;
        this.velocity = 10;
        this.score = 0;
    }
}
//# sourceMappingURL=Game.js.map