import { use, type Usable } from "react"
import { type User } from "./api/get-user.action"

interface Props {
    getUser: Usable<User>;
}
//const userPromise = getUserAction(1);

export const ClientInformation = ({ getUser }: Props) => {


    // usable: es la forma de enviar la promesa dentro de una fución 
    // use: es como usar el await dentro de una función que no es async
    const user = use(getUser);
    // console.log(user);

    // no recibe async await useEffect
    // useEffect(() => {
    //     //getUserAction(id).then((user) => {console.log(user);});
    //     getUserAction(id).then(console.log);
    // }, [id]);

    return (
        <div className="bg-gradient flex flex-col gap-4">
            <h2 className="text-4xl font-bold text-white">Información del cliente</h2>
            <p className="text-white text-2xl">Id     : {user.id}</p>
            <p className="text-white text-2xl">Nombre : {user.name}</p>
            <p className="text-white text-2xl">Ubicación: {user.location}</p>
            <p className="text-white text-xl">Rol    : {user.role}</p>
        </div>
    )
}
