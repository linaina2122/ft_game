"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ball = void 0;
const object_1 = require("./object");
class Ball {
    constructor(game) {
        this.positionX = 0;
        this.positionY = 0;
        this.radius = 25;
        this.segment = 100;
        this.velocityX = 5;
        this.velocityY = 5;
        this.game = game;
    }
    checkCollision() {
        if ((this.positionY - this.radius) * -1 > (object_1.globalVar.Height / 2) - 5)
            this.velocityY *= -1;
        if ((this.positionY + this.radius) > (object_1.globalVar.Height / 2) - 5)
            this.velocityY *= -1;
    }
    resetBall() {
        this.game.Ball.positionX = 0;
        this.game.Ball.positionY = 0;
        this.velocityX = 7;
        this.velocityY = 7;
    }
    leftPlayer() {
        if ((this.positionX + (this.radius * 2)) > (this.game.lPlayer.positionX) &&
            ((this.positionY < (this.game.lPlayer.positionY + object_1.globalVar.PuddleHeight / 2))
                && (this.positionY > this.game.lPlayer.positionY - (object_1.globalVar.PuddleHeight / 2))))
            this.velocityX *= -1;
        if ((this.positionY - this.radius) > this.game.lPlayer.positionY + object_1.globalVar.PuddleHeight / 2) {
            console.log(this.positionY - this.radius);
            console.log(this.game.lPlayer.positionY + object_1.globalVar.PuddleHeight / 2);
            this.velocityY *= -1;
        }
    }
    rightPlayer() {
        if (((this.positionX - (this.radius * 2)) < (this.game.rPlayer.positionX) &&
            (this.positionY < (this.game.rPlayer.positionY + object_1.globalVar.PuddleHeight / 2))))
            this.velocityX *= -1;
    }
    updatePosition(io) {
        this.positionX -= this.velocityX;
        this.positionY -= this.velocityY;
        this.checkCollision();
        this.leftPlayer();
        this.rightPlayer();
    }
    start(io) {
        let interval = setInterval(() => {
            this.updatePosition(io);
            this.game.lPlayer.pushToOther();
            this.game.rPlayer.pushToOther();
            io.to(this.game.roomName).emit("startGame", this.positionX, this.positionY);
            if (this.game.lPlayer.score == 10 || this.game.rPlayer.score == 10) {
                clearInterval(interval);
                console.log("game is finished ");
                delete (this.game);
            }
        }, 1000 / 30);
    }
}
exports.Ball = Ball;
;
//# sourceMappingURL=Ball.js.map