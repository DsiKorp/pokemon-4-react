import { useCallback, useState } from "react"
import { MyTitle } from "./ui/MyTitle"
import { MySubTitle } from './ui/MySubTitle';

// Función sin useCallback por que está afuera del componente y no se necesita 
// memorizar y no cambia entre renderizados
// const handleMyAPICall = (myValue: string) => {
//     console.log('Llamada a API' + myValue);
// };

export const MemoHook = () => {
    const [title, setTitle] = useState("Hola");
    const [subTitle, setSubTitle] = useState("Mundo");

    // useCallback memoriza la función y solo la vuelve a crear si alguna de sus dependencias cambia
    // recibe como argumento la función y un array de dependencias que se deben monitorizar
    const handleMyAPICall = useCallback(() => {
        console.log('Llamada a API', subTitle);
    }, [subTitle]);


    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-thin text-white">MemoApp Principal</h1>

            <MyTitle titleT={title} />

            <MySubTitle subtitle={subTitle}
                callMyAPI={handleMyAPICall}
            //callMyAPI={() => handleMyAPICall(subTitle)}
            />

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
                onClick={() => setTitle("Hello " + new Date().getTime())}>
                Cambiar título From Principal
            </button>

            <button className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
                // onClick={() => setSubTitle("World " + new Date().getTime())}>
                onClick={() => setSubTitle("World")}>
                Cambiar subtítulo from Principal
            </button>
        </div>
    )
}
