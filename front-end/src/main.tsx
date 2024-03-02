
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
// import { Try } from './rander_scene.tsx'
// import { SendData } from './send_data.tsx';

import "./App.css";




const Cont = document.getElementById('root');
if(Cont){
    const root = createRoot(Cont);
    root.render(<App />)}
else {
    console.error("element id not found!!");
}


