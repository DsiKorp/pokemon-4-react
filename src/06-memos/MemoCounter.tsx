import { useCounter } from "@/03-examples/hooks/useCounter";
import { useMemo } from "react";

const heavyStuff = (iterationNumber: number) => {
    console.log('start Heavy_Stuff_started');
    console.time('Heavy_Stuff_started');

    for (let i = 0; i < iterationNumber; i++) {
        console.log('Ahi vamos...');
    }

    console.timeEnd('Heavy_Stuff_started');
    console.log('End Heavy_Stuff_started');
    return `${iterationNumber} iterations done`;
};

export const MemoCounter = () => {
    const { counter, increment } = useCounter(3_000);
    const { counter: counter2, increment: increment2 } = useCounter(10);

    //const myHeavyValue = heavyStuff(counter);
    // useMemo: memoriza el resultado de una función, solo se vuelve a calcular si cambian 
    // las dependencias
    // memoriza el valor retornado de la función heavyStuff cuando counter cambia 
    // y no se vuelve a ejecutar en cada render
    const myHeavyValue = useMemo(() => heavyStuff(counter), [counter]);
    //const myHeavyValue = heavyStuff(counter);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h1 className="text-2xl font-bold"> Memo - useMemo - {myHeavyValue}</h1>
            <hr />

            <h4>Counter: {counter}</h4>
            <h4>Counter2: {counter2}</h4>

            <button onClick={increment} className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer">+1</button>
            <button onClick={increment2} className="bg-blue-500 text-white px-4 rounded-md py-2 cursor-pointer">+1 Counter2</button>
        </div>
    )
}
