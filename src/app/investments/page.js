"use client"

import Footer from "@/components/Footer";
import SpinLoading from "@/components/Loader/pageLevel";
import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { fetchPlans } from "@/services/fetchPlans";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";


export default function Investments() {
    UserDetailsContext();
    const { user } = useContext(GlobalContext);
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchPlansData();
    }, [fetchPlans]);

    function isUserLoggedIn() {
        if (user) {
            const userLoggedIn = true;
            return userLoggedIn;
        } else {
            router.push('/login');
        }
    }


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
    console.log(plans)

    const allPlans = plans?.plans;
    console.log(allPlans)

    const handleInvestNow = () => {
        if (isUserLoggedIn()) {
            router.push('/dashboard/plans')
        } else {
            router.push('/login')
        }
    }
    return (
        <>
            <div className="pt-16 bg-white">
                <div>
                    <div className='relative h-[50vh] md:h-[80vh] overflow-hidden mb-10'>
                        <div className='absolute top-0 left-0 w-full h-full'>
                            <img src='https://leadassetmarket.com/site-images/51c1f80dfa55dcd562709024eae52281.png' alt='about' className='object-cover w-full h-full' />
                            <div className="absolute inset-0 bg-[#1567bed5] opacity-20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-center flex flex-col max-w-3xl gap-4 items-center">
                                    <h3 className="text-4xl font-bold">INVESTMENTS</h3>
                                    <p className='text-md font-medium'>
                                        Our investment are flexible and return of investment are daily. Select an investment now to start your journey.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="cr-widget-marquee"
                        data-coins="bitcoin,ethereum,tether,ripple,cardano"
                        data-theme="light"
                        data-show-symbol="true"
                        data-show-icon="true"
                        data-show-period-change="true"
                        data-period-change="24H"
                        data-api-url="https://api.cryptorank.io/v0"
                        className='w-full py-3'
                    >
                        <script src="https://cryptorank.io/widget/marquee.js"></script>
                    </div>
                </div>
                <div className="w-full mt-5 mx-0 mb-8 relative">
                    <div className="w-full flex items-center flex-col justify-center mt-10 mx-0 mb-0 space-y-6">
                        <div className="text-center py-5"><p className="text-xl text-[#007bff] font-medium">OUR PLANS</p></div>
                        <div className="flex gap-8 flex-col md:grid md: grid-cols-2 md:mx-auto items-center justify-center">
                            {!plans ? (<div className="flex items-center justify-center">
                                <SpinLoading />
                            </div>) : allPlans?.map(plan => (
                                <div key={plan.id} className="w-[320px] bg-white rounded-xl border-[0.6px] border-gray-300 h-auto flex flex-col items-center relative text-[#444]">
                                    <div className="w-full py-6 bg-[#007bff] text-white text-center text-xl font-bold rounded-t-xl">{plan.planName}</div>
                                    <div className="py-3">
                                        <p>Min. Investment: <b>${plan.minPrice}</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>Max. Investment: <b>${plan.maxPrice}</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>ROI: <b>Daily</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>Daily Profit: <b>{plan.roi}%</b></p>
                                    </div>
                                    <div className="py-3">
                                        <p>Duration: <b>{plan.period} Months</b></p>
                                    </div>
                                    <button onClick={handleInvestNow} className="my-3 inline-block bg-[#007bff] py-3 px-5 text-base font-medium tracking-wide text-white rounded-md">Invest Now</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}