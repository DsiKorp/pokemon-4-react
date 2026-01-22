import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

//import { HooksApp } from './HooksApp';
import './index.css'
//import { TrafficLightWithEffect } from './02-userEffect/TrafficLightWithEffect';
//import { TrafficLightWithHook } from './02-userEffect/TrafficLightWithHook';
import { PokemonPage } from './03-examples/PokemonPage';
//port { FocusScreen } from './04-useRef/FocusScreen';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    <PokemonPage />
    {/* <FocusScreen /> */}
  </StrictMode>,
);
