"use client"

import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser"
import { useContext, useState } from "react"
import SpinLoading from "../Loader/pageLevel";
import { updateUser } from "@/services/user";

export default function MyTransactionsComp() {
    UserDetailsContext();
    const { user, componentLevelLoader } = useContext(GlobalContext);
    const [messageOne, setMessageOne] = useState(false);

    const AllTransactions = user?.transactions;
    // console.log(AllPlans);



    // useEffect(() => {
    // const calculateRemainingDays = ({elapseTime, investmentId, status}) => {
    //     const elapseTimeDate = new Date(elapseTime);
    //     const today = new Date();
    //     const timeDifference = elapseTimeDate.getTime() - today.getTime();
    //     const remainingDays = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //     if(remainingDays <= 0 && status?.isActive){
    //         updateUser({ investment: {
    //             investmentId: investmentId,
    //             status: {
    //                 isCompleted: true
    //             }
    //         } }, user?._id)
    //     }
    //     return remainingDays;
    // };

    const convertDate = (created) => {
        const dateObj = new Date(created);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear());

        return `${day}-${month}-${year}`;
    }
    return (
        <div className="bg-white py-5 rounded-lg px-3">
            <h2 className="mb-4">All my transactions</h2>
            {/* Content for Profile Details tab */}
            <div className="space-y-8 h-screen">
                {!user ? (
                    <div className="flex items-center justify-center">
                        <SpinLoading />
                    </div>
                ) : (
                    <div className="space-y-6">
                        {AllTransactions?.map(transaction => (
                            <div key={transaction?._id} className={`border-t-4 border-cyan-600 rounded-md p-3 shadow-lg  ${messageOne ? 'border-gray-400' : 'border-slate-600 '}`}>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex flex-col items-start gap-2">
                                            <p className="text-base tracking-wide font-semibold">{transaction?.transactionType}</p>
                                            <div className="flex flex-col gap-1">
                                            <p className="text-xs"><span className="font-semibold">Date:</span> {convertDate(transaction?.created)}</p>
                                                <div className="flex items-center gap-2">
                                                    <p className="text-xs"><span className="font-semibold">Wallet:</span> {transaction?.walletName}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <p className="text-xs"><span className="font-semibold">Status:</span>  {transaction?.status?.isPending ? 'Pending' :
                                            transaction?.status?.isDeclined ? 'Declined' :
                                                'Approved'}</p>
                                        <button className={`text-xs px-3 py-2 text-white font-semibold rounded-md transition-all ease-in-out duration-400 ${transaction?.status?.isPending ? 'bg-red-800' :
                                            transaction?.status?.isDeclined ? 'bg-gray-400' :
                                                'bg-green-400'}`}>${transaction?.amount}</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}