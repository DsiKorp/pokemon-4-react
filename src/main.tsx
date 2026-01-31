import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'sonner';

//import { HooksApp } from './HooksApp';
//import { TrafficLightWithEffect } from './02-userEffect/TrafficLightWithEffect';
//import { TrafficLightWithHook } from './02-userEffect/TrafficLightWithHook';
//import { PokemonPage } from './03-examples/PokemonPage';
//import { FocusScreen } from './04-useRef/FocusScreen';
//import { TasksApp } from './05-useReducer/TaskApp';
//import { MemoHook } from './06-memos/MemoHook';
//import { MemoCounter } from './06-memos/MemoCounter';
//import { InstagromApp } from './07-useOptimistic/InstagromApp';
import { ClientInformation } from './08-use-suspense/ClientInformation';
import { getUserAction } from './08-use-suspense/api/get-user.action';
import './index.css'
  ;


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster />
    {/* <HooksApp /> */}
    {/* <TrafficLight /> */}
    {/* <TrafficLightWithEffect /> */}
    {/* <TrafficLightWithHook /> */}
    {/* <PokemonPage /> */}
    {/* <FocusScreen /> */}
    {/* <TasksApp /> */}
    {/* <MemoHook /> */}
    {/* <MemoCounter /> */}
    {/* <InstagromApp /> */}
    <Suspense fallback={
      <div className="bg-gradient flex flex-col">
        <h2 className="text-4xl font-bold text-white">Loading...</h2>
      </div>
    }>
      <ClientInformation getUser={getUserAction(100)} />
    </Suspense>
  </StrictMode>,
);
