import { Socket } from "socket.io";
import { Game } from "./Game";
export var roomSetting = {
    num: 1,
    Rooms: new Map<string, string[]>(),
    Id: [],
    queue: [],
    Game : new Map<string, Game>()
};

export const globalVar = {
    Width: 1600,
    Height: 600
}
 