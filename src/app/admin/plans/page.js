"use client"

import SpinLoading from "@/components/Loader/pageLevel";
import { fetchPlans } from "@/services/fetchPlans";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Plans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlansData();
    }, [fetchPlans]);


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
    console.log(allPlans)
    return (
        <div className="w-full pt-24 mx-0 mb-0 relative text-[#333]">
            <div className="w-full flex items-center flex-col justify-center mt-10 mx-0 mb-0 space-y-6">
                <div className="flex gap-8 flex-col md:grid md: grid-cols-2 md:mx-auto items-center justify-center">
                    {!allPlans ? (
                        <div className="flex items-center justify-center">
                            <SpinLoading />
                        </div>
                    ) : (
                        allPlans?.map(plan => (
                            <div key={plan.id} className="w-[320px] rounded-xl border-[0.6px] border-gray-600 h-auto flex flex-col items-center relative">
                                {/* <div className="absolute -top-10">
                                    <Image src={plan.imageUrl} width={200} height={200} alt="Plans image" className="rounded-full object-cover" />
                                </div> */}
                                <div className="w-full py-6 bg-[#007bff] text-white text-center text-xl font-bold rounded-t-xl">{plan.planName}</div>
                                <div className="py-3">
                                    <p>Min. Investment: <b>${plan.minPrice}</b></p>
                                </div>
                                <div className="py-3">
                                    <p>Max. Investment: <b>${plan.maxPrice}</b></p>
                                </div>
                                <div className="py-3">
                                    <p>Profit Period: <b>{plan.roiPeriod}</b></p>
                                </div>
                                <div className="py-3">
                                    <p>Profit: <b>{plan.roi}%</b></p>
                                </div>
                                <div className="py-3">
                                    <p>Duration: <b>{plan.period} Months</b></p>
                                </div>
                                <button className="my-3 inline-block bg-[#007bff] py-3 px-5 text-base font-medium tracking-wide text-white rounded-md">Invest Now</button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}