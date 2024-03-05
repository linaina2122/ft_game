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
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const object_1 = require("./object");
let socketGateway = class socketGateway {
    constructor() {
        console.log("constructer called");
    }
    handleConnection(client) {
        console.log("user connected", client.id);
    }
    handleDisconnect(client) {
        console.log("user disconnected :", client.id);
    }
    ontest(client, MessageBody) {
        console.log("getting the event name ", MessageBody);
    }
    onJoinGame(client) {
        joinRoom(this.server, client);
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
            if (object_1.roomSetting.queue.length == 1)
                io.to(object_1.roomSetting.queue).emit("playerIsWaiting", true);
        }
    }
}
function joinRoom(io, socket) {
    const roomName = "room" + object_1.roomSetting.num;
    const roomInfo = io.sockets.adapter.rooms;
    QueueWaiting(io, socket);
    if (object_1.roomSetting.queue.length == 2) {
        const Id = new Set(object_1.roomSetting.queue);
        roomInfo.set(roomName, Id);
        object_1.roomSetting.Rooms.set(roomName, object_1.roomSetting.queue);
        io.to(roomName).emit("StartGame", true);
        object_1.roomSetting.queue = [];
        console.log("players ready to play in ", roomName);
        object_1.roomSetting.num += 1;
    }
}
;
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
//# sourceMappingURL=socketGatway.js.map