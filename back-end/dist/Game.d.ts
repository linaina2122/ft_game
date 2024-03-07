import { Server } from "socket.io";
export declare class Game {
    private server;
    private player;
    rPlayer: right_player;
    constructor(io: Server, client: any[]);
    initPlayer(): void;
}
declare class right_player {
    constructor();
    height: number;
    width: number;
    positionX: number;
    positionY: number;
    velocity: number;
}
export {};
