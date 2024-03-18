
import { io, Socket } from "socket.io-client"
import { useEffect, useState } from "react";
import './style/WaitingPage.css'
import { fromBack } from "./objects";
import { InitSetup } from './rander_scene';
import { Duel } from "./Duel";

let leftPlayerScore = 0;
let rightPlayerScore = 0;
export const Player: Socket = io('http://localhost:3000', { autoConnect: true });
function SendData() {
  Player.emit("onJoinGame");
}

// function onVs(){
//   Player.emit("OneVSone")
// }


function App() {
  const [connect, setSocket] = useState(false)
  const [isWaiting, setWaiting] = useState(false)
  const [isStart, setStart] = useState(false)
  
  
  // const [isDuo, setDuo] = useState(false)
  const [BposX, setPosX] = useState(0)
  const [BposY, setPosY] = useState(0)
  useEffect(()=>{
  function isConnect() {
    Player.connected
    setSocket(true)
  }
  Player.on("connect", isConnect)
},[])
  Player.on("playerIsWaiting", (data: boolean) => {
    setWaiting(data)
  })
  Player.on("StartGame", (data: boolean) => {
    setWaiting(data)
    setStart(true)
  })
  Player.on("startGame", (dataX, dataY)=>{
    setPosX(dataX);
    setPosY(dataY);
    fromBack.posX = BposX;
    fromBack.posY = BposY;
  })

  // Player.on("vsOne", (data)=>{
  //   setDuo(data)
  // })
  useEffect(()=>{
  Player.on("Lplayer_score", (data : boolean)=>{
    leftPlayerScore++;
    console.log("lscore", leftPlayerScore);
  })
  Player.on("Rplayer_score", (data : number)=>{
    rightPlayerScore++;
    console.log("rscore :", rightPlayerScore);
  })},[])
  return (
    <div>
      {!isStart ? (
        <div id="StartButton" className="StartButton">
          <button className="btn" onClick={SendData}>START GAME</button>
          {isWaiting ? (
            <div className="Try">waitingPage...</div>
          ) : (
            null 
          )}
        </div>
      ) : (
        <InitSetup />
      )}
    </div>
  );
}
export default App;