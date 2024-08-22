"use client"

import axios from "axios";
import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import PrivateRoute from "@/context/PrivateRoute";



export default function Admin() {
  UserDetailsContext();
  const { user, isAuthUser, setIsAuthUser } = useContext(
    GlobalContext
  );



  return (
    <PrivateRoute>
      <div className="flex flex-col space-y-6 px-4">
        <p className="text-lg my-5 py-4 border-b-[0.5px] border-gray-500">Welcome To Admin Dashboard</p>

        {/* <div className="border border-1 border-gray-400 h-[150px] flex flex-col justify-center p-4 rounded-lg">
        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1">

            <span>Total Balance: <b>$2000</b></span>
            <span>Total Users: <b>6</b></span>
            <span>Total Deposits: <b>4</b></span>
          </div>

        </div>
      </div> */}
        <a className="mt-1.5 inline-block bg-[#ff9100] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="/admin/users">
          All Users
        </a>
        <a className="mt-1.5 inline-block bg-[#ff9100] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="/admin/create-plans">
          Create Plans
        </a>
        <a className="mt-1.5 inline-block bg-[#ff9100] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="admin/transactions">
          All Transactions
        </a>
        <a className="mt-1.5 inline-block bg-[#ff9100] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="admin/investments">
          All Investments
        </a>
        <a className="mt-1.5 inline-block bg-[#ff9100] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="admin/add-wallet">
          Add Wallet Address
        </a>
        {/* <a className="mt-1.5 inline-block bg-[#fd961a] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl w-fit" href="admin/copiers">
        Create Copiers
      </a> */}
      </div>
    </PrivateRoute>
  )
}