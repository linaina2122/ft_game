import { threadId } from "worker_threads";
import { Game } from "./Game";
import { globalVar } from "./object";
import { Server } from "socket.io";


export class Ball {
    game: Game;
    positionX = 0;
    positionY = 0;
    radius = 25;
    segment = 100;
    velocityX = 5;
    velocityY = 5;
    speed = 1;

    constructor(game: Game) {
        this.game = game;
    }
    checkCollision(){
        if ((this.positionY - this.radius) * -1 > (globalVar.Height / 2) - 5)
            this.velocityY *= -1;
        if ((this.positionY + this.radius)  > (globalVar.Height / 2) - 5)
            this.velocityY *= -1;
        if (this.positionX < this.game.rPlayer.positionX - 25){
            this.game.lPlayer.score += 1;
            console.log("score is :", this.game.lPlayer.score);
            this.resetBall();
        }
        if (this.positionX > this.game.lPlayer.positionX  + 25){
            this.game.rPlayer.score += 1;
            console.log("score is :", this.game.rPlayer.score);
            this.resetBall();
        }
    }
    resetBall(){
        this.game.Ball.positionX = 0;
        this.game.Ball.positionY = 0;
        this.velocityX = 5;
        this.velocityY = 5;
        this.speed = 0.1;
    }

    leftPlayer(){
        if(this.positionX > 0){
        if ((this.positionX + (this.radius * 2))  >= (this.game.lPlayer.positionX) &&
             ((this.positionY <= (this.game.lPlayer.positionY + globalVar.PuddleHeight / 2))
              && (this.positionY >= this.game.lPlayer.positionY - (globalVar.PuddleHeight / 2)))){
            this.velocityX *= -1 ;
            this.velocityX += this.speed;
            this.velocityY += this.speed;
        }
        if((this.positionX > this.game.lPlayer.positionX && this.positionY > 0 ) &&  
        (this.positionY - this.radius) < this.game.lPlayer.positionY + globalVar.PuddleHeight / 2){
            this.positionY += this.radius;
            this.velocityY *= -1;
        }
        if((this.positionX > this.game.lPlayer.positionX && this.positionY < 0 ) &&  
        (this.positionY + this.radius) > this.game.lPlayer.positionY - globalVar.PuddleHeight / 2){
            this.positionY += this.radius;
            this.velocityY *= -1;
        }
    }
    }
    rightPlayer(){
        if (((this.positionX - (this.radius * 2))  <= (this.game.rPlayer.positionX) &&
         (this.positionY <= (this.game.rPlayer.positionY + globalVar.PuddleHeight / 2))) &&
          (this.positionY >= this.game.rPlayer.positionY - (globalVar.PuddleHeight / 2))){
            this.velocityX *= -1 ;
            this.velocityX += this.speed;
            this.velocityY += this.speed; 
        }
    }

    updatePosition(io: Server) {
        this.positionX += this.velocityX;
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
                if(this.game.lPlayer.score == 5 || this.game.rPlayer.score == 5)
                {
                    clearInterval(interval);
                    console.log("game is finished ");
                    delete(this.game)
                }
            }, 1000 / 30)
        }
};