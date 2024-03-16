import { Game } from "./Game";
import { globalVar } from "./object";
import { Server } from "socket.io";


export class Ball {
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
        // if (this.positionX > this.game.lPlayer.positionX ){
        //     this.game.lPlayer.score += 1;
        //     console.log("score is :", this.game.lPlayer.score);
        //     this.resetBall();
        // }
        // if (this.positionX < this.game.rPlayer.positionX ){
        //     this.game.rPlayer.score += 1;
        //     console.log("score is :", this.game.rPlayer.score);
        //     this.resetBall();
        // }
    }
    resetBall(){
        this.game.Ball.positionX = 0;
        this.game.Ball.positionY = 0;
        this.velocityX = 7;
        this.velocityY = 7;
    }
    leftPlayer(){
        if ((this.positionX + (this.radius * 2))  > (this.game.lPlayer.positionX) &&
             ((this.positionY < (this.game.lPlayer.positionY + globalVar.PuddleHeight / 2))
              && (this.positionY > this.game.lPlayer.positionY - (globalVar.PuddleHeight / 2))))
            this.velocityX *= -1;
        if((this.positionY - this.radius) > this.game.lPlayer.positionY + globalVar.PuddleHeight / 2)
        {
            console.log(this.positionY - this.radius)
            console.log(this.game.lPlayer.positionY + globalVar.PuddleHeight / 2)
            // console.log("yes")
            this.velocityY *= -1;
        } 
    }
    rightPlayer(){
        if (((this.positionX - (this.radius * 2))  < (this.game.rPlayer.positionX) &&
         (this.positionY < (this.game.rPlayer.positionY + globalVar.PuddleHeight / 2))))
            this.velocityX *= -1;
    }

    updatePosition(io: Server) {
        this.positionX -= this.velocityX;
        this.positionY -= this.velocityY;
        this.checkCollision();
        this.leftPlayer();
        this.rightPlayer();
}
    start(io : Server){
            let interval = setInterval(() => {
                this.updatePosition(io)
                this.game.lPlayer.pushToOther();
                this.game.rPlayer.pushToOther();
                io.to(this.game.roomName).emit("startGame", this.positionX, this.positionY);
                if(this.game.lPlayer.score == 10 || this.game.rPlayer.score == 10)
                {
                    clearInterval(interval);
                    console.log("game is finished ");
                    delete(this.game)
                }
            }, 1000 / 30)
        }
};