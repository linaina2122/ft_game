
import { useEffect } from "react";
import { initSocket } from "./send_data";
import './style/WaitingPage.css'
// import { buttonStyle } from './objects';


export function RequestForStart() {
    i : initSocket
    // useEffect(() => {
        i.sendtest
    // }), [];

    return (
        < div id="StartButton" className="StartButton" >
            < button className="btn" onClick={SendData} > START GAME</button >
        </div >
    )
}