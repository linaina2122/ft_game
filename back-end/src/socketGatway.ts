import { Injectable, Logger, Post } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { error } from "console";
import { Http2ServerRequest } from "http2";
import { map } from "rxjs";
import { Socket, Server } from "socket.io";
import { roomSetting, globalVar } from "./object";
import { exit } from "process";
import { Game } from "./Game";
import { subscribe } from "diagnostics_channel";

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
    }

    @SubscribeMessage('onJoinGame')
    onJoinGame(client: Socket) {
        joinRoom(this.server, client)
    }
    // @SubscribeMessage('OneVSone')
    // OneVSone(client: Socket){
    //     OneGame(this.server, client);
    // }


    //     @SubscribeMessage('leaveGame')
    //     onLeaveGame(@MessageBody() data: any) {
    //         console.log(data)
    //         //TODO: leave room
    //     }
}

function QueueWaiting(io: Server, socket: Socket) {
    if (roomSetting.queue.includes(socket.id))
        console.log("this player already exists in waiting room")
    else if (checkSocket(socket))
        console.log("player already exists in other room")
    else {
        if (roomSetting.queue.length < 3) {
            roomSetting.queue.push(socket.id)
            console.log("id ", socket.id, "is waiting")
        }
    }
}

// function OneGame(io : Server, socket:Socket){
 
//     const RoomName = "duel" + roomSetting.duel;
//     const roomInfo = io.sockets.adapter.rooms;
//     if( Array.from(roomSetting.room.values()).includes(socket.id))
//         console.log("you are already existing in one room")
//     else{
//     roomSetting.room.set(RoomName, socket.id);
//     const tmp: Set<string> =new  Set(socket.id)
//     roomInfo.set(RoomName, tmp);
//     if (io.sockets.adapter.rooms.get(RoomName)?.has(socket.id)) {
//         console.log(`Socket ${socket.id} is in room ${RoomName}`);
//     } else {
//         console.log(`Socket ${socket.id} is NOT in room ${RoomName}`);
//     }
//     console.log(socket.id);
//     console.log("room :", RoomName , " is created")
//     io.emit("vsOne", true);
//     roomSetting.duel += 1;
// }
// }

function joinRoom(io: Server, socket: Socket) {
    const roomName = "room" + roomSetting.num
    const roomInfo = io.sockets.adapter.rooms
    QueueWaiting(io, socket)
    if (roomSetting.queue.length == 2) {
        const Id: Set<string> = new Set(roomSetting.queue)
        roomInfo.set(roomName, Id)
        roomSetting.Rooms.set(roomName, roomSetting.queue)
        io.to(roomName).emit("StartGame", true)
        console.log("players ready to play in ", roomName)
        const game  = new Game(io, roomSetting.queue)
        io.to(roomSetting.queue[0]).emit("Puddle1", true);
        io.to(roomSetting.queue[1]).emit("puddle2", true);
        roomSetting.Game.set(roomName, game)
        roomSetting.queue = []
        roomSetting.num += 1
        startGame(io, game);
    }
};

function startGame(io: Server, game : Game)
{
    let interval =  setInterval(()=>{
        game.Ball.positionX += game.Ball.velocityX ;
        game.Ball.positionY -= game.Ball.velocityY;
        if((game.Ball.positionY - game.Ball.radius) > (globalVar.Height / 2) - (game.Ball.radius * 2))
            game.Ball.velocityY *= -1
        if((game.Ball.positionY + game.Ball.radius) * -1  > (globalVar.Height / 2) - (game.Ball.radius * 2))
            game.Ball.velocityY *= -1;
        
        game.lPlayer.pushToOther();
        game.rPlayer.pushToOther();
        io.emit("startGame", game.Ball.positionX, game.Ball.positionY);
     },1000/20)
}

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