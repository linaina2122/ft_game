import { Game } from "./Game";
import { Server } from "socket.io";
export declare class Ball {
    game: Game;
    positionX: number;
    positionY: number;
    radius: number;
    segment: number;
    velocityX: number;
    velocityY: number;
    speed: number;
    constructor(game: Game);
    checkCollision(): void;
    resetBall(): void;
    leftPlayer(): void;
    rightPlayer(): void;
    updatePosition(io: Server): void;
    start(io: Server): void;
}
