"use client"

import { fetchPlans } from "@/services/fetchPlans";
import Image from "next/image";
import { useEffect, useState } from "react";
import StartInvestment from "../StartInvestment";
import SpinLoading from "@/components/Loader/pageLevel";

export default function PlansComponent() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchPlansData();
    }, []);

    async function fetchPlansData() {
        try {
            const plansData = await fetchPlans();
            setPlans(plansData);
        } catch (error) {
            console.error('Error fetching plans:', error);
        } finally {
            setLoading(false);
        }
    }

    const allPlans = plans?.plans;
    console.log(allPlans);

    const handleInvestNow = (plan) => {
        setSelectedPlan(plan);
        console.log(plan);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedPlan(null);
        setIsModalOpen(false);
    };

    return (
        <>
            {selectedPlan && isModalOpen && (
                <StartInvestment plan={selectedPlan} onClose={handleCloseModal} />
            )}
            <div className="w-full mt-2 mx-auto mb-10 relative">
                <div className="w-full flex items-center flex-col justify-center mt-10 mx-0 mb-0 space-y-6">
                    <div className="">
                        <h3 className="text-[#ff9100] font-medium text-lg">OUR PLANS</h3>
                    </div>
                    <div className="flex gap-8 flex-col md:grid md: grid-cols-2 md:mx-auto items-center justify-center">
                        {loading ? (
                            <SpinLoading />
                        ) : (
                            allPlans?.map(plan => (
                                <div key={plan.id} className="w-[320px] rounded-xl border-[0.6px] border-gray-300 h-auto flex flex-col items-center relative">
                                    {/* <div className="absolute -top-10">
                                        <Image src={plan.imageUrl} width={200} height={200} alt="Plans image" className="rounded-full object-cover" />
                                    </div> */}
                                    <div className="w-full py-6 bg-[#ff9100] text-white text-center text-xl font-bold rounded-t-xl">{plan.planName}</div>
                                    <div className="py-3">
                                        <p>Min. Investment: <b>${plan.minPrice}</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>Max. Investment: <b>${plan.maxPrice}</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>ROI: <b>{plan.roi}%</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>Profit: <b>{plan.roiPeriod}</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>Duration: <b>{plan.period} Days</b></p>
                                    </div>
                                    <button className="my-3 inline-block bg-[#ff9100] py-3 px-5 text-base font-medium tracking-wide text-white rounded-md" onClick={() => handleInvestNow(plan)}>Invest Now</button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
