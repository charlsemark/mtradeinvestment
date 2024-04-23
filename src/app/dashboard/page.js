"use client";

import MainDashboardComponent from "@/components/MainDashboardComp";
import NavigationBar from "@/components/NavigationBar";
import { GlobalContext } from "@/context";
import PrivateRoute from "@/context/PrivateRoute";
import UserDetailsContext from "@/context/useUser";
import { useContext, useEffect, useState } from "react";

export default function Dashboard() {
  UserDetailsContext()
  const { user, isAuthUser, setIsAuthUser } = useContext(
    GlobalContext
  );
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    // Update the isMobile state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // console.log(user?.balance)
  return (
    <PrivateRoute>
      <div className="flex bg-white">
        {isMobile ? (
          /* Main Component full screen on mobile */
          <div className="right-0 top-0 bottom-0 relative flex flex-2 flex-col gap-8 border border-l-0 border-t-0 border-r-1 w-full md:flex-1 left-0 md:left-[220px] overflow-x-auto overflow-scroll px-4 customized_scrollbar">
            <MainDashboardComponent setIsAuthUser={setIsAuthUser}
              isAuthUser={isAuthUser}
              username={user?.name}
              balance={user?.balance}
              totalInvestment={user?.plans?.length}
              profit={user?.profit}
              accountUpgrade={user?.accountUpgrade}
            />
          </div>
        ) : (
          /* NavigationBar for tablet and desktop */
          <div className="fixed left-0 h-screen">
            <NavigationBar
              setIsAuthUser={setIsAuthUser}
              isAuthUser={isAuthUser}
              username={user?.name}
            />
          </div>
        )}
        {/* Main Component for tablet and desktop */}
        <div className="fixed right-0 flex flex-2 flex-col border border-l-0 border-t-0 border-r-1 w-5/6 h-screen pt-3 px-4 overflow-scroll customized_scrollbar">
          {!isMobile && <MainDashboardComponent setIsAuthUser={setIsAuthUser}
            isAuthUser={isAuthUser}
            username={user?.name}
            balance={user?.balance}
            totalInvestment={user?.plans?.length}
            profit={user?.profit}
          />}
        </div>
      </div>
    </PrivateRoute>
  );
}
