
// import { Start_Button } from './component';
// import { SendData } from './send_data';
import './App.css'
import { RequestForStart } from './waitingPage';

// import { InitSetup } from './rander_scene';

// import { useRef, useState } from 'react';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

function App() {// you must connect and protect socket before any atmpte to send or recieve data (socket first)
  // const [isButtonClicked, setButtonClicked] = useState(true);
  return (
    <div>
      <div>
        {/* { var
          (
            component
          ): (
            component
            )
        } */}
        {/* <button onClick={SendData}>START</button> */}
        {/* <Start_Button /> */}
        {/* <InitSetup /> */}
        <RequestForStart />
        {/* </div> */}
        {/* <div id="player_1" className="player_1">
        PLAYER 
      </div>
      <div id="player_2" className="player_2">
        PLAYER  */}
      </div>
    </div>
  )
}
export default App;


// import './App.css'
// import { RequestForStart } from './waitingPage'

// function App() {
//   return (
//     <div>
//       <div>

//       </div>
//     </div>
//   )
// }
