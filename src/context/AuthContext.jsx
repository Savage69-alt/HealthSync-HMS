import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getCurrentUser();

    }, []);

    async function getCurrentUser() {

        const {
            data: { user: authUser },
        } = await supabase.auth.getUser();

        if (!authUser) {

            setLoading(false);
            return;

        }

        const { data } = await supabase

            .from("profiles")

            .select("*")

            .eq("id", authUser.id)

            .single();

        setUser(data);

        setLoading(false);

    }

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshUser: getCurrentUser,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}