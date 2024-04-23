import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { adminNavOptions, dashboardNavLinks } from "@/utils";
import Cookies from "js-cookie";
import { ChevronRight, TextCursorInput } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useContext, useState } from "react";


export default function NavigationBar({ username }) {
    const [activeNavIndex, setActiveNavIndex] = useState(0);
    UserDetailsContext();
    const { user, setIsAuthUser, setUser } = useContext(GlobalContext);
    const router = useRouter;
    const handleNavigation = () => {
        setActiveNavIndex(index)
    }
    const handleLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        Cookies.remove('token');
        localStorage.clear();
        router.push('/')
        window.location.reload()
    }
    return (
        <div className="flex flex-col border border-l-0 border-t-0 border-r-1 h-screen pt-3 px-4 relative">
            <div className="mt-2 w-full bg-gray-200 py-4 px-2 rounded-lg">
                <p>Welcome, <b>{username}</b></p>
            </div>
            {/* <div className="cursor-pointer w-7 h-7 flex items-center justify-center bg-[#fd961a] text-white rounded-full absolute -right-4 top-20">
                <ChevronRight />
            </div> */}
            <div className="mt-14 flex flex-col space-y-5">
                {
                    user?.role == 'client' ?
                        dashboardNavLinks.map((navItem, index) => (
                            <a href={navItem.path} key={navItem.index} className={`cursor-pointer flex items-center space-x-3 p-3 rounded-lg ${activeNavIndex === index ? "bg-[#007bff] text-white rounded-l-xl" : " "}`}>
                                <span>{navItem.icon}</span>
                                <span>{navItem.label}</span>
                            </a>
                        )) :
                        user?.role === 'admin' ?
                            adminNavOptions.map((navItem, index) => (
                                <a href={navItem.path} key={navItem.index} className={`cursor-pointer flex items-center space-x-3 p-3 rounded-lg ${activeNavIndex === index ? "bg-[#007bff] text-white rounded-l-xl" : " "}`}>
                                    <span>{navItem.icon}</span>
                                    <span>{navItem.label}</span>
                                </a>
                            )) : null
                }
                <div className="cursor-pointer flex items-center space-x-3 p-3" onClick={() => handleLogout}>
                    <TextCursorInput />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}