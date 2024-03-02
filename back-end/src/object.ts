import { Socket } from "socket.io";

export var roomSetting = {
    num: 1,
    Rooms: new Map<string, string[]>(),
    Id: [],
    queue: []
};