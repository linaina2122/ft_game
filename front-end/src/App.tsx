
import { io, Socket } from "socket.io-client"
import './App.css'
import { useEffect, useRef, useState } from "react";
import './style/WaitingPage.css'

import { InitSetup } from './rander_scene';

// import { useRef, useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

export const socket: Socket = io('http://localhost:3000', { autoConnect: true });
function SendData() {
  socket.emit("onJoinGame");
}

function App() {
  const [connect, setSocket] = useState(false)
  const [isWaiting, setWaiting] = useState(false)
  const [isStart, setStart] = useState(false)

  function isConnect() {
    socket.connected
    setSocket(true)
  }
  socket.on("connect", isConnect)

  socket.on("playerIsWaiting", (data: boolean) => {
    setWaiting(data)
    console.log(isWaiting)
  })

  socket.on("StartGame", (data: boolean) => {
    setWaiting(data)
    console.log(isWaiting)
    setStart(true)
  })

  return (
    <div>
      {!isStart ? (
        <div id="StartButton" className="StartButton">
          <button className="btn" onClick={SendData}>START GAME</button>
          {isWaiting ? (
            <div className="Try">waitingPage...</div>
          ) : (
            null // Render nothing if not waiting
          )}
        </div>
      ) : (
        <InitSetup />
      )}
    </div>
  );
}
export default App;