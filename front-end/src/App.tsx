
import { io, Socket } from "socket.io-client"
import './App.css'
import { useState } from "react";
import './style/WaitingPage.css'
import { fromBack } from "./objects";

import { InitSetup } from './rander_scene';

// import { useRef, useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

export const Player: Socket = io('http://localhost:3000', { autoConnect: true });
function SendData() {
  Player.emit("onJoinGame");
}


function App() {
  const [connect, setSocket] = useState(false)
  const [isWaiting, setWaiting] = useState(false)
  const [isStart, setStart] = useState(false)
  const [BposX, setPosX] = useState(0)
  const [BposY, setPosY] = useState(0)
  
  
  function isConnect() {
    Player.connected
    setSocket(true)
  }
  Player.on("connect", isConnect)
  console.log("Here")

  Player.on("playerIsWaiting", (data: boolean) => {
    setWaiting(data)
  })

  Player.on("StartGame", (data: boolean) => {
    setWaiting(data)
    setStart(true)
  })
  // Player.on("startGame", (dataX, dataY)=>{
  //   setPosX(dataX);

  //   setPosY(dataY);
  // })
  Player.on("startGame", (dataX, dataY)=>{
    setPosX(dataX);
    setPosY(dataY);
    fromBack.posX = BposX;
    fromBack.posY = BposY;
    console.log("**********", fromBack.posX)
    console.log("----------",fromBack.posY)
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