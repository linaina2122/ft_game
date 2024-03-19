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
    checkCollision(io: Server): void;
    resetBall(): void;
    rightPlayer(): void;
    leftPlayer(): void;
    updatePosition(io: Server): void;
    start(io: Server): void;
}
