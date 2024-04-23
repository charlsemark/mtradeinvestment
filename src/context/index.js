"use client"

import { fetchLoginUser } from "@/services/user";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
    const [showNavModal, setShowNavModal] = useState(false);
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState({ loading: false, id: '' });
    const [isAuthUser, setIsAuthUser] = useState(null);
    const [user, setUser] = useState(null);

    // //console.log(user)

    useEffect(() => {

        // const userData = fetchLoginUser();
        // console.log(userData)
        

        if (user) {
            setUser(user);
            setIsAuthUser(true);
        } else {
            setIsAuthUser(false);
        }
    }, [isAuthUser]);

    return (
        <GlobalContext.Provider value={{ showNavModal, setShowNavModal, pageLevelLoader, setPageLevelLoader, isAuthUser, setIsAuthUser, user, setUser, componentLevelLoader, setComponentLevelLoader }}>{children}</GlobalContext.Provider>
    )
}