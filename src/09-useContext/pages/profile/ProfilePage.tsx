import { UserContext } from "@/09-useContext/context/UseContext";
import { Button } from "@/components/ui/button"
import { use } from "react"


export const ProfilePage = () => {

    const { user, logout } = use(UserContext);

    // const handleLogout = () => {
    //     logout();
    // }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">Profile Page</h1>
            <hr />
            <pre className="my-4 overflow-x-auto w-[80%]">{JSON.stringify(user, null, 2)}</pre>
            <Button variant="destructive" onClick={logout}>Logout</Button>
        </div>
    )
}
