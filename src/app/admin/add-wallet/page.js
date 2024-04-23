"use client"
import axios from "axios";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";
import AddWalletAddress from "@/components/DashboardComponents/AddWalletAddress";
import UserDetailsContext from "@/context/useUser";

export default function AddWallet() {
    const { user } = useContext(GlobalContext);
    UserDetailsContext();

    const currentWallets = user?.wallet;
    console.log(currentWallets);
    return (
        <div className="px-6 pt-16 text-[#333]">
            <div className="flex items-center justify-between py-4 px-4">
                <p>Wallets</p>
                <button className="mt-1.5 inline-block bg-[#007bff] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl cursor-pointer">Add New Wallet</button>
            </div>
            <div>
                <ul className="flex flex-col space-y-4">
                    {/* {Object.entries(currentWallets).map(([currency, address]) => (
                        <li key={currency}>
                            <strong>{currency}:</strong> {address}
                        </li>
                    ))} */}
                </ul>
            </div>
            <AddWalletAddress />
        </div>
    )
}