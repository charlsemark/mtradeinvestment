"use client"

import NavigationBar from "@/components/NavigationBar";
import PlansComponent from "@/components/DashboardComponents/PlansComponent";
import { GlobalContext } from "@/context";
import { useContext, useEffect, useState } from "react"
import UserDetailsContext from "@/context/useUser";



export default function Plans() {
    UserDetailsContext()
    const { user, isAuthUser, setIsAuthUser } = useContext(GlobalContext);
    const [shouldShowNavigationBar, setShouldShowNavigationBar] = useState(false);

    useEffect(() => {
        // Check if window is defined (to avoid SSR errors)
        if (typeof window !== 'undefined') {
            const handleResize = () => {
                setShouldShowNavigationBar(window.innerWidth > 768);
            };

            // Initial check and add resize event listener
            handleResize();
            window.addEventListener('resize', handleResize);

            // Clean up the event listener on component unmount
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);


    return (
        <div className="flex bg-white">
            {shouldShowNavigationBar && (
                    <div className="fixed left-0 h-screen">
                        <NavigationBar username={user?.name} />
                    </div>
                )}
            {/* Main Component */}
            <div className="mx-auto flex items-center justify-center flex-2 flex-col gap-8 max-w-[1200px] md:flex-1 left-0 md:left-[220px]  px-4 mt-8">
                <PlansComponent />
            </div>
        </div>
    )
}