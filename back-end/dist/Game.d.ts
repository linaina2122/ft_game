import { Server } from "socket.io";
export declare class Game {
    private server;
    roomName: string;
    lPlayer: any;
    rPlayer: any;
    Ball: any;
    constructor(io: Server, client: any[], roomName: string);
}
