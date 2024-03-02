import { Injectable, Logger, Post } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { error } from "console";
import { Http2ServerRequest } from "http2";
import { map } from "rxjs";
import { Socket, Server } from "socket.io";
import { roomSetting } from "./object";
import { exit } from "process";

@WebSocketGateway({ cors: true }) // decorator telling that this class is hundelling websocket
export class socketGateway {
    @WebSocketServer()
    server: Server;
    constructor() {
        console.log("constructer called");
    }

    handleConnection(client: Socket) {
        console.log("user connected", client.id)

    }
    handleDisconnect(client: Socket) {
        console.log("user disconnected :", client.id)
    }
    @SubscribeMessage('test')
    ontest(client: Socket, MessageBody: string) {
        console.log("getting the event name ", MessageBody);
        // this.server.emit("test", "responding from backend ")
    }

    @SubscribeMessage('onJoinGame')
    onJoinGame(client: Socket, data: string) {
        joinRoom(this.server, client)
        this.server.emit("test", "world")
    }

    //     @SubscribeMessage('leaveGame')
    //     onLeaveGame(@MessageBody() data: any) {
    //         console.log(data)
    //         //TODO: leave room
    //     }
}

function QueueWaiting(socket: Socket) {
    if (roomSetting.queue.includes(socket.id))
        console.log("this player already exists in waiting room")
    else {
        if (roomSetting.queue.length < 3) {
            roomSetting.queue.push(socket.id)
            console.log("id ", socket.id, "is waiting")
        }
    }
}
function joinRoom(io: Server, socket: Socket) {
    const roomName = "room" + roomSetting.num
    const roomInfo = io.sockets.adapter.rooms
    QueueWaiting(socket)
    if (roomSetting.queue.length == 2) {
        const Id: Set<string> = new Set(roomSetting.queue)
        roomInfo.set(roomName, Id)
        roomSetting.Rooms.set(roomName, roomSetting.queue)
        roomSetting.queue = []
        console.log("players ready to play in ", roomName)
        io.to(roomName).emit("test", "hello")
        roomSetting.num += 1
    }
};


function leaveQueue(io: Server, socket: Socket) {
    roomSetting.queue.filter(value => value !== socket.id)
}