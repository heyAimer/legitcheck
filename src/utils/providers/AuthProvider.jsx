"use client";

import { createContext, useContext } from "react";
import { useAuth } from "../hooks/useAuth";
import FullPageLoader from "../FullPageLoader";

const AuthContext = createContext(null);

export default function AuthProvider({ children }) {

    const auth = useAuth();

    if (auth.isLoading) {
        return <FullPageLoader/>
    }

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext(){
    return useContext(AuthContext);
}