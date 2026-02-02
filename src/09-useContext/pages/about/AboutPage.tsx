import { use } from "react";
import { Link } from "react-router"
import { UserContext } from "@/09-useContext/context/UseContext";
import { Button } from "@/components/ui/button";


export const AboutPage = () => {

    const { isAuthenticated, logout } = use(UserContext);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">AboutPage</h1>
            <hr />
            <div className="flex flex-col gap-2">

                {/* perfil de usuario si tiene sesion */}
                {isAuthenticated &&
                    <Link to="/profile" className="hover:text-blue-500 underline text-2xl">Profile</Link>
                }

                {/* botones de login y logout */}
                {isAuthenticated ? (
                    <Button className="mt-4" variant="destructive">
                        <Link to="/" className="hover:text-blue-500 underline text-2xl" onClick={logout}>LogOut</Link>
                    </Button>
                ) : (
                    <Button className="mt-4">
                        <Link to="/login" className="hover:text-blue-500 underline text-2xl">Login</Link>
                    </Button>
                )}

            </div>
        </div>
    )
}
