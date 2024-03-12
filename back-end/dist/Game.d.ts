import { Server } from "socket.io";
export declare class Game {
    private server;
    listener: any;
    lPlayer: any;
    rPlayer: any;
    Ball: any;
    constructor(io: Server, client: any[]);
}
