"use client"

import { GlobalContext } from "@/context";
import { startNewPlan } from "@/services/plan";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import Notifications from "../Notifications";
import UserDetailsContext from "@/context/useUser";

const InitialFormData = {
    amount: "",
    // expectedReturn: 0
};

export default function StartInvestment({ plan, onClose }) {
    const [formData, setFormData] = useState(InitialFormData);
    const [expectedReturn, setExpectedReturn] = useState(0);
    UserDetailsContext()
    const { user } = useContext(GlobalContext);

    const calculateExpectedAmount = (amount, roi, period) => {
        const dailyRoi = roi / 100; // Convert ROI to a decimal
        const dailyRate = 1 + dailyRoi; // Calculate the daily rate

        // Convert the investment period from months to days
        const totalDays = period * 30;

        // Calculate the expected amount using compound interest formula
        const compoundAmount = amount * Math.pow(dailyRate, totalDays);

        return compoundAmount.toFixed(2); // Round to 2 decimal places
    };

    const handleAmountChange = (amount) => {
        setFormData({ ...formData, amount });
        const expectedAmount = calculateExpectedAmount(amount, plan.roi, plan.period);
        setExpectedReturn(expectedAmount);
    };

    const handleInvestment = async () => {
        try {
            const enteredAmount = parseFloat(formData.amount);

            if (isNaN(enteredAmount) || enteredAmount < plan.minPrice) {
                toast.error('Invalid amount entered. Please enter a valid amount.', {
                    position: "top-right",
                });
                return;
            }

            if (user?.balance >= Number(enteredAmount)) {
                const expectedAmount = calculateExpectedAmount(enteredAmount, plan.roi, plan.period);
                
                const response = await startNewPlan({
                    planId: plan._id,
                    amount: enteredAmount,
                    returnInvestment: expectedAmount,
                });
                
                console.log("Hello... chief...")
                // console.log(response);
                if (response?.success) {
                    toast.success(response.message, {
                        position: "top-right",
                    });
                    onClose(); // Close the modal on successful investment
                } else {
                    toast.error(response.message, {
                        position: "top-right",
                    });
                }
            } else {
                console.log('Insufficient Balnce')
                toast.error('Insufficient balance. Please deposit funds to your account.', {
                    position: "top-right",
                });
            }
        } catch (error) {
            console.log('Error during investment:', error);
            toast.error('Something went wrong. Please try again later.', {
                position: "top-right",
            });
        }
    }

    return (
        <div className="w-screen h-screen fixed bottom-0 left-0 bg-[rgba(39,39,39,0.47)] z-50 grid place-items-center md:h-screen">
            <div className="bg-white text-[#333] flex flex-col space-y-6 w-[320px] md:w-[520px] p-4 mt-20 mx-0 mb-0 rounded-lg">
                <div className="border-b-[1px] border-gray-600">
                    <div className="flex items-center px-4 py-6 justify-between">
                        <p className="font-semibold text-lg">Review & Confirm Investment</p>
                        <button className="bg-[#007bff] px-3 py-3 text-white text-sm tracking-wide rounded-md" onClick={onClose}>Close</button>
                    </div>
                </div>
                <div className="flex flex-col space-y-6">
                    <div className="flex items-center justify-between border-b-[1px] border-gray-600 pb-5">
                        <p>Selected Plan:</p>
                        <div className="border-[0.5px] border-gray-600 rounded-lg p-5">{plan.planName}</div>
                    </div>
                    <div className="flex items-center justify-between border-b-[1px] border-gray-600 pb-5">
                        <p>Amount:</p>
                        <p className="text-gray-500">
                            Min. Investment: ${plan.minPrice}
                            -
                            Max. Investment: ${plan.maxPrice}
                        </p>
                    </div>
                    <div className="flex items-center justify-between border-b-[1px] border-gray-600 pb-5">
                        <p>Enter Amount:</p>
                        <div className=" flex items-center justify-between border-[0.5px] border-gray-600 rounded-lg p-3">
                            <input className="focus:outline-none outline-none border-0 placeholder:text-gray-500" type="number" placeholder="Enter Amount" value={formData.amount}
                                onChange={(e) => handleAmountChange(e.target.value)} />
                            <span className="border-l-[0.5px] border-gray-600">USD</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-b-[1px] border-gray-600 pb-5">
                        <p>Return of Interest:</p>
                        <p className="text-gray-500">Daily {plan.roi}%</p>
                    </div>
                    <div className="flex items-center justify-between border-b-[1px] border-gray-600 pb-5">
                        <p>Duration:</p>
                        <p className="text-gray-500">{plan.period} Months</p>
                    </div>
                    <div className="flex items-center justify-between border-b-[1px] border-gray-600 pb-5">
                        <p>Expected Returns:</p>
                        <p className="font-semibold">${expectedReturn}</p>
                    </div>
                </div>
                <button onClick={handleInvestment} className="mt-1.5 inline-block bg-[#007bff] py-4 rounded-lg px-5 font-medium tracking-wide text-white">Start Investment</button>
            </div>
            <Notifications />
        </div>
    )
}