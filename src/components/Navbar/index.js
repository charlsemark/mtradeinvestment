"use client"

import { GlobalContext } from "@/context";
import { adminNavOptions, dashboardNavLinks, navOptions } from "@/utils";
import Image from "next/image";
import { Fragment, useContext, useState } from "react";
import CommonModal from "../CommonModal";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import UserDetailsContext from "@/context/useUser";
import UserAlerts from "@/utils/usersAlert";
import { MenuIcon } from "lucide-react";
import {logo} from "../../../public/assests/loh.png";

// const isAdminView = false;
// const isAuthUser = true;
// const user = {
//     role: "admin"
// }
// const router = useRouter();

function NavItems({ isModalView = false }) {
    const { user } = useContext(GlobalContext);
    const { isAuthUser, setIsAuthUser, setUser } = useContext(GlobalContext);
    const router = useRouter();
    UserDetailsContext()
    const isAdminView = user?.role;
    console.log(isAdminView)

    const handleLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        router.push('/login')
        Cookies.remove('token');
        localStorage.clear();
        window.location.reload()
    }

    return (
        <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView ? "" : "hidden"}`} id="nav-items">
            <div className={`flex items-center flex-col p-4 md:p-0 mt-8 font-medium rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 ${isModalView ? "border-none" : "border border-gray-100"}`}>
                {/* {
                    isAdminView === "admin" ? (
                        adminNavOptions.map((item) => (
                            <a className="cursor-pointer block py-2 pl-3 pr-4 text-black md:p-0" key={item.id} href={item.path}>
                                {item.label}
                            </a>
                        ))
                    ) : (
                        navOptions.map((item) => (
                            <a className="cursor-pointer block py-2 pl-3 pr-4 text-black md:p-0" key={item.id} href={item.path}>
                                {item.label}
                            </a>
                        ))
                    )
                } */}
                {
                    isAdminView === "client" ?
                        dashboardNavLinks.map((item) => (
                            <a className="cursor-pointer block py-2 pl-3 pr-4 text-white md:p-0 md:text-white" key={item.id} href={item.path}>
                                {item.label}
                            </a>
                        ))
                        :
                        isAdminView === "admin" ?
                            adminNavOptions.map((item) => (
                                <a className="cursor-pointer block py-2 pl-3 pr-4 text-white md:p-0 md:text-white" key={item.id} href={item.path}>
                                    {item.label}
                                </a>
                            ))
                            :
                            navOptions.map((item) => (
                                <a className="cursor-pointer block py-2 pl-3 pr-4 text-white md:p-0 md:text-white" key={item.id} href={item.path}>
                                    {item.label}
                                </a>
                            ))
                }
                {
                    isAuthUser ? <button onClick={handleLogout} className="mt-1.5 inline-block bg-white py-3 px-5 text-sm font-medium tracking-wide text-[#007bff] rounded-md">Logout</button> : <button onClick={() => router.push('/login')} className="mt-1.5 inline-block bg-white py-3 px-5 text-sm font-medium tracking-wide text-[#007bff] rounded-md">Login</button>
                }
            </div>
        </div>
    )
}


export default function Navbar() {
    const { showNavModal, setShowNavModal } = useContext(GlobalContext);
    const { user, isAuthUser, setIsAuthUser, setUser } = useContext(GlobalContext);
    UserDetailsContext();
    const router = useRouter();
    const pathName = usePathname();

    console.log(pathName);

    const handleLogout = () => {
        setIsAuthUser(false);
        setUser(null);
        router.push('/login')
        Cookies.remove('token');
        localStorage.clear();
        window.location.reload()
    }

    const isAdminView = pathName.includes("admin")
    // const isAdminView = user?.role;
    // console.log(isAdminView)
    // //console.log(user)

    return (
        <>
            {/* {isUsersAlert && <UserAlerts />} */}
            <nav className="fixed bg-[#007bff] w-full z-20 top-0 left-0 border-b border-gray-200">
                <div className="w-screen flex flex-wrap items-center justify-between mx-auto p-4">
                    <div onClick={() => router.push('/')} className="flex items-center cursor-pointer mr-2">
                        <img src="./loh.png" className="h-8 w-auto mr-1" alt=" Logo" />
                        <span className="self-center text-base md:text-xl font-semibold whitespace-no-wrap text-white">Mtrade Investments</span>
                    </div>

                    <div className="flex items-center md:order- gap-2">
                        {/* {!isAdminView && isAuthUser ? (
                            <Fragment>
                                {/* <button className="mt-1.5 inline-block bg-[#fd961a] py-3 px-5 text-xs font-medium tracking-wide text-white">Account</button>
                                <button className="mt-1.5 inline-block bg-[#fd961a] py-3 px-5 text-xs font-medium tracking-wide text-white">Cart</button> 
                            </Fragment>
                        ) : null} 
                        */}
                        {/* {
                            user?.role === "admin" ?

                                <button onClick={() => router.push('/admin')} className="mt-1.5 inline-block bg-[#fd961a] py-3 px-5 text-xs font-medium tracking-wide text-white">Visit Dashboard</button> : ""
                        } */}
                        {/* {
                            user?.role === 'client' ? <button onClick={() => router.push('/dashboard')} className="mt-1.5 inline-block bg-[#fd961a] py-3 px-5 text-xs font-medium tracking-wide text-white">View Profile</button> : ""
                        } */}
                        {/* {
                            isAuthUser ? <button onClick={handleLogout} className="mt-1.5 inline-block bg-[#fd961a] py-3 px-5 text-sm font-medium tracking-wide text-white rounded-md">Logout</button> : <button onClick={() => router.push('/login')} className="mt-1.5 inline-block bg-[#fd961a] py-3 px-5 text-sm font-medium tracking-wide text-white rounded-md">Login</button>
                        } */}
                        <button onClick={() => setShowNavModal(!showNavModal)} className="md:hidden rounded-lg p-2 bg-[#0b2361] text-white transition-all duration-500 focus:outline-none focus:ring-2">
                            {/* <Image src="/menu.png" alt="menu icon" width={30} height={30} /> */}
                            <MenuIcon className="w-8 h-8" />
                        </button>
                    </div>
                    <NavItems user={user} isAdminView={isAdminView} router={router} />
                </div>
            </nav>
            <CommonModal user={user} setUser={setUser} isAuthUser={isAuthUser} router={router} showModalTitle={false} mainContent={<NavItems isModalView={true} />} show={showNavModal} setShow={setShowNavModal} isAdminView={isAdminView} />
        </>
    )
}