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
        // this.server.emit("test", "world")

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
    onJoinGame(client: Socket) {
        joinRoom(this.server, client)
    }


    //     @SubscribeMessage('leaveGame')
    //     onLeaveGame(@MessageBody() data: any) {
    //         console.log(data)
    //         //TODO: leave room
    //     }
}

function QueueWaiting(io: Server, socket: Socket) {
    if (roomSetting.queue.includes(socket.id))
        // this.server.emit("test", "you are already existing in waiting room")
        console.log("this player already exists in waiting room")
    else if (checkSocket(socket))
        console.log("player already exists in other room")
    else {
        if (roomSetting.queue.length < 3) {
            roomSetting.queue.push(socket.id)
            console.log("id ", socket.id, "is waiting")
            if (roomSetting.queue.length == 1)
                io.to(roomSetting.queue).emit("playerIsWaiting", true)
        }
    }
}
function joinRoom(io: Server, socket: Socket) {
    const roomName = "room" + roomSetting.num
    const roomInfo = io.sockets.adapter.rooms
    QueueWaiting(io, socket)
    if (roomSetting.queue.length == 2) {
        const Id: Set<string> = new Set(roomSetting.queue)
        roomInfo.set(roomName, Id)
        roomSetting.Rooms.set(roomName, roomSetting.queue)
        io.to(roomName).emit("StartGame", true)
        roomSetting.queue = []
        console.log("players ready to play in ", roomName)
        roomSetting.num += 1
    }
};

function checkSocket(socket: Socket) {
    for (let tmp of roomSetting.Rooms.values()) {
        if (tmp.includes(socket.id))
            return (true)
    }
    return (false)
}

function leaveQueue(io: Server, socket: Socket) {
    roomSetting.queue.filter(value => value !== socket.id)
}