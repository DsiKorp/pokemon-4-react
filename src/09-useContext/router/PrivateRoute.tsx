import { use, type JSX } from "react";
import { Navigate } from "react-router";

import { UserContext } from "../context/UseContext";


interface Props {
    element: JSX.Element;
    // React.ReactNode    
}

export const PrivateRoute = ({ element }: Props) => {

    const { authStatus } = use(UserContext);

    if (authStatus === 'checking') {
        return (
            <div>Checking authentication...</div>
        )
    }

    if (authStatus === 'authenticated') {
        return (
            element
        )
    }

    // replace = no history in browser
    return (
        <Navigate to="/login" replace />
    )
}
