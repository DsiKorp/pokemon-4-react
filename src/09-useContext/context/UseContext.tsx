import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { User } from "../data/user-mock.data";
import { users } from "../data/user-mock.data";

// interface UserContextProps {
//     children: React.ReactNode;
// }

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
    // state
    authStatus: AuthStatus;
    user: User | null;
    isAuthenticated: boolean;
    // methods
    login: (userId: number) => boolean;
    logout: () => void;
    // children

}

export const UserContext = createContext({} as UserContextProps);

// HOC = Higher Order Component
//export const UseContextProvider = ({ children }: UserContextProps) => {
export const UseContextProvider = ({ children }: PropsWithChildren) => {

    const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
    const [user, setUser] = useState<User | null>(null);

    const handleLogin = (userId: number): boolean => {

        const user = users.find(user => user.id === userId);

        if (!user) {
            console.log(`User ${userId} not found`);
            setUser(null);
            setAuthStatus('not-authenticated');
            return false;
        }

        setUser(user);
        setAuthStatus('authenticated');
        localStorage.setItem('userId', userId.toString());
        return true;
    }

    const handleLogout = (): void => {
        console.log('logOut')
        setUser(null);
        setAuthStatus('not-authenticated');
        localStorage.removeItem('userId');
    }

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            handleLogin(Number(storedUserId));
            return
        }

        handleLogout();
    }, [])

    return (
        <UserContext value={{
            authStatus,
            isAuthenticated: authStatus === 'authenticated',
            user,
            login: handleLogin,
            logout: handleLogout,
        }}>
            {children}
        </UserContext>
    )
}
