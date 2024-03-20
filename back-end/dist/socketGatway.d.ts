import { Socket, Server } from "socket.io";
export declare class socketGateway {
    server: Server;
    constructor();
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    ontest(client: Socket, MessageBody: string): void;
    onJoinGame(client: Socket): void;
    OneVSone(client: Socket): void;
    onLeaveGame(client: Socket): void;
}
