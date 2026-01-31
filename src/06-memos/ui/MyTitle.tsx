import React from "react";

interface Props {
    titleT: string;
}

// memo evita re-renderizados innecesarios, es una función que recibe un funcional component 
export const MyTitle = React.memo(({ titleT }: Props) => {
    console.log('MyTitle re-render ' + titleT)
    return (
        <div className="bg-yellow-500 text-3xl">{titleT}</div>
    )
})
