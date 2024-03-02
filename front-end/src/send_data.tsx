import { io, Socket } from "socket.io-client"
// import { player } from "./objects"


const socket: Socket = io('http://localhost:3000', { autoConnect: true });
export class initSocket {

    SendData() {
        socket.emit("onJoinGame", "hello");
    }

    sendtest() {
        console.log("here")
        if (socket) {
            socket.on("test", (data: string) => {
                console.log(data);
            })
        }
    }
}
// export function receiveData() {
//     socket.on("hello", (data: string) => {
//         console.log(data)
//     })
// }