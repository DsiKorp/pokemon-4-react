import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

import { useContext, useState } from "react"
import { UserContext } from "@/09-useContext/context/UseContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"



export const LoginPage = () => {

    const { login } = useContext(UserContext);
    const [userId, setUserId] = useState('');

    const navigation = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const resultLogin = login(Number(userId));
        console.log({ resultLogin });

        if (!resultLogin) {
            toast.error('User not found', { description: 'Try again!' });
            return;
        }

        navigation('/profile');
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">Login Page</h1>
            <hr />

            <form className="flex flex-col gap-2 my-10"
                // onSubmit={event => handleSubmit(event)}>
                onSubmit={handleSubmit}>

                <Input type="number" placeholder="User ID"
                    value={userId}
                    onChange={event => setUserId(event.target.value)} />

                <Input type="password" placeholder="Password" />

                <Button className="w-fit mx-auto bg-blue-500 hover:bg-blue-600" type="submit">Login</Button>
            </form>
            <Link to="/about" className="text-blue-500 hover:text-blue-600">
                <Button variant="ghost">Go to About</Button>
            </Link>
        </div>
    )
}
