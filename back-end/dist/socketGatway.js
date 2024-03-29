"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const object_1 = require("./object");
const Game_1 = require("./Game");
let socketGateway = class socketGateway {
    constructor() {
        console.log("constructer called");
    }
    handleConnection(client) {
        console.log("user connected", client.id);
    }
    handleDisconnect(client) {
        console.log("user disconnected :", client.id);
        checkDectonnectin(this.server, client);
    }
    ontest(client, MessageBody) {
        console.log("getting the event name ", MessageBody);
    }
    onJoinGame(client) {
        joinRoom(this.server, client);
    }
    OneVSone(client) {
        OneGame(this.server, client);
    }
    onLeaveGame(client) {
        checkDectonnectin(this.server, client);
    }
};
exports.socketGateway = socketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], socketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('test'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "ontest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('onJoinGame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "onJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('OneVSone'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "OneVSone", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveGame'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", void 0)
], socketGateway.prototype, "onLeaveGame", null);
exports.socketGateway = socketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: true }),
    __metadata("design:paramtypes", [])
], socketGateway);
function QueueWaiting(io, socket) {
    if (object_1.roomSetting.queue.includes(socket.id))
        console.log("this player already exists in waiting room");
    else if (checkSocket(socket))
        console.log("player already exists in other room");
    else {
        if (object_1.roomSetting.queue.length < 3) {
            object_1.roomSetting.queue.push(socket.id);
            console.log("id ", socket.id, "is waiting");
        }
    }
}
function joinRoom(io, socket) {
    const roomName = "room" + object_1.roomSetting.num;
    const roomInfo = io.sockets.adapter.rooms;
    let game;
    QueueWaiting(io, socket);
    if (object_1.roomSetting.queue.length == 2) {
        const Id = new Set(object_1.roomSetting.queue);
        roomInfo.set(roomName, Id);
        object_1.roomSetting.Rooms.set(roomName, object_1.roomSetting.queue);
        io.to(roomName).emit("StartGame", true);
        console.log("players ready to play in ", roomName);
        game = new Game_1.Game(io, object_1.roomSetting.queue, roomName);
        io.to(object_1.roomSetting.queue[0]).emit("Puddle1", true);
        io.to(object_1.roomSetting.queue[1]).emit("Puddle2", true);
        object_1.roomSetting.Game.set(roomName, game);
        object_1.roomSetting.queue = [];
        object_1.roomSetting.num += 1;
        startGame(io, game);
    }
}
;
function checkDectonnectin(io, Socket) {
    const roomInfo = io.sockets.adapter.rooms;
    let RoomName;
    for (const [roomName, room] of roomInfo.entries()) {
        if (room.has(Socket.id)) {
            RoomName = roomName;
            Socket.leave(roomName);
            console.log(Socket.id, "leaved ", roomName);
            const socketId = Array.from(room);
            for (const socket of socketId) {
                const s = io.sockets.sockets.get(socket);
                if (s) {
                    console.log(s.id, "left ", roomName);
                    s.leave(roomName);
                }
            }
        }
    }
    leaveGame(RoomName);
}
function leaveGame(roomName) {
    for (const room of (object_1.roomSetting.Rooms.keys())) {
        if (room == roomName) {
            object_1.roomSetting.Game.delete(room);
            object_1.roomSetting.Rooms.delete(room);
        }
    }
}
function startGame(io, game) {
    game.Ball.start(io);
}
function checkSocket(socket) {
    for (let tmp of object_1.roomSetting.Rooms.values()) {
        if (tmp.includes(socket.id))
            return (true);
    }
    return (false);
}
function leaveQueue(io, socket) {
    object_1.roomSetting.queue.filter(value => value !== socket.id);
}
function OneGame(io, socket) {
    const RoomName = "duel" + object_1.roomSetting.duel;
    const roomInfo = io.sockets.adapter.rooms;
    if (Array.from(object_1.roomSetting.room.values()).includes(socket.id))
        console.log("you are already existing in one room");
    else {
        object_1.roomSetting.room.set(RoomName, socket.id);
        const tmp = new Set(socket.id);
        roomInfo.set(RoomName, tmp);
        if (io.sockets.adapter.rooms.get(RoomName)?.has(socket.id)) {
            console.log(`Socket ${socket.id} is in room ${RoomName}`);
        }
        else {
            console.log(`Socket ${socket.id} is NOT in room ${RoomName}`);
        }
        console.log(socket.id);
        console.log("room :", RoomName, " is created");
        io.emit("vsOne", true);
        object_1.roomSetting.duel += 1;
    }
}
//# sourceMappingURL=socketGatway.js.map