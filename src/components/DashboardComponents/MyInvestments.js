

import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser"
import { useContext, useEffect, useState } from "react"
import SpinLoading from "../Loader/pageLevel";
import { updateUser } from "@/services/user";
import Cookies from "js-cookie";
import axios from "axios";

export default function MyInvestmentsComp() {
    UserDetailsContext();
    const { user, componentLevelLoader } = useContext(GlobalContext);
    const [messageOne, setMessageOne] = useState(false);
    const [plans, setPlans] = useState([])

    const AllPlans = user?.plans;
    console.log(AllPlans);

    const updatePlanStatus = (userID, investmentId) => {
        const token = Cookies.get('token');
        try {
            const response = axios.put(`/api/admin/update-user/?user_id=${userID}`, {
                investment: {
                    investmentId: investmentId,
                    status: {
                        isCompleted: true
                    }
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error updating :', error);
            throw error;
        }
    }



    // useEffect(() => {
    const calculateRemainingDays = ({ elapseTime, investmentId, status }) => {
        const elapseTimeDate = new Date(elapseTime);
        const today = new Date();
        const timeDifference = elapseTimeDate.getTime() - today.getTime();
        const remainingDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

        // Check if the remaining days are less than or equal to 0 and the status is active
        if (remainingDays <= 0 && status?.isActive) {
            updatePlanStatus(user?._id, investmentId);
            // Set remainingDays to 0 so that it doesn't return a negative value
            return 0;
        }

        return remainingDays;
    };


    const handleCopyOne = () => {
        setMessageOne(true)
        setTimeout(() => {
            setMessageOne(false)
        }, 2000)
    }
    return (
        <div className="text-[#222] py-5 rounded-lg px-3">
            <h2 className="mb-4">All My Investments</h2>
            {/* Content for Profile Details tab */}
            <div className="space-y-8 h-screen">
                {!user ? (
                    <div className="flex items-center justify-center">
                        <SpinLoading />
                    </div>
                ) : (
                    <div className={`border-t-4 border-2 border-cyan-600 rounded-md p-3 shadow-lg  ${messageOne ? 'border-green-400' : 'border-cyan-600 '}`}>
                        {AllPlans?.map((plan, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col items-start gap-2">
                                        <p className="text-base tracking-wide font-semibold">Basic Plan</p>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-xs"><span className="font-semibold">Period:</span> {calculateRemainingDays({ elapseTime: plan?.elapseTime, investmentId: plan?._id, status: plan?.status })} Days</p>
                                            <div className="flex items-center gap-2">
                                                {/* <p className="text-xs"><span className="font-semibold">ROI:</span> 20%</p> */}
                                                <p className="text-xs"><span className="font-semibold">Amount:</span> ${plan?.amount}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end flex-col gap-3">
                                    <span><span className="font-semibold">Returns:</span> ${plan?.returnInvestment}</span>
                                    <p className={`text-xs px-3 py-2 text-white w-fit font-semibold rounded-md transition-all ease-in-out duration-400 ${messageOne ? 'bg-green-400' : 'bg-gray-400'}`}>
                                        {calculateRemainingDays({ elapseTime: plan?.elapseTime, investmentId: plan?._id, status: plan?.status }) === 0 ? 'Completed' : 'Active'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}