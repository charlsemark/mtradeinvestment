"use client";

import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { fetchPlans } from "@/services/fetchPlans";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SpinLoading from "../Loader/pageLevel";

export default function AllPlans() {
  UserDetailsContext();
  const { user } = useContext(GlobalContext);
  const [plans, setPlans] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlansData();
  }, [fetchPlans]);

  function isUserLoggedIn() {
    if (user) {
      const userLoggedIn = true;
      return userLoggedIn;
    } else {
      router.push("/login");
    }
  }

  async function fetchPlansData() {
    try {
      const plansData = await fetchPlans();
      setPlans(plansData);
    } catch (error) {
      console.error("Error fetching plans:", error);
    } finally {
      setLoading(false);
    }
  }
  // console.log(plans)

  const allPlans = plans?.plans;

  const handleInvestNow = () => {
    if (isUserLoggedIn()) {
      router.push("/dashboard/plans");
    } else {
      router.push("/login");
    }
  };
  return (
    <>
      <div className="bg-black py-18 px-4 flex flex-col items-center justify-center text-center gap-5">
        <div className="flex flex-col gap-2 pt-6">
          <p className=" mb-5 lg:mb-10 md:text-[17px] text-[#ff9100] md:w-3/4 lg:w-3/5">
            Our Investment Plans
          </p>
          <h1 className="text-2xl md:text-6xl lg:text-5xl font-bold mb-5 lg:mb-6 text-white -tracking-wide md:w-3/4 lg:3/5">
            CHOOSE YOUR PREFERRED TRADING PACKAGE
          </h1>
        </div>
        <div className="w-full mx-0 mb-8 relative">
          <div className="w-full flex items-center flex-col justify-center mt-5 mx-auto mb-0 space-y-6">
            <div className="flex gap-8 flex-col md:grid md: grid-cols-2 md:mx-auto items-center justify-center">
              {!plans ? (
                <div className="flex items-center justify-center">
                  <SpinLoading />
                </div>
              ) : (
                allPlans?.map((plan, idx) => (
                  <div
                    key={idx}
                    className="w-[320px] bg-transparent rounded-xl border-[0.6px] border-[#ff9100] h-auto flex flex-col items-center relative text-white"
                  >
                    <div className="w-full py-4 bg-[#ff9100] text-white text-center text-xl font-bold rounded-t-xl">
                      {plan.planName}
                    </div>
                    <div className="py-3">
                      <p>
                        Min. Investment: <b>${plan.minPrice}</b>
                      </p>
                    </div>
                    <div className="py-3">
                      <p>
                        Max. Investment: <b>${plan.maxPrice}</b>
                      </p>
                    </div>
                    <div className="py-3">
                      <p>
                        ROI: <b>{plan.roi}%</b>
                      </p>
                    </div>
                    <div className="py-3">
                      <p>
                        Profit: <b>{plan.roiPeriod}</b>
                      </p>
                    </div>
                    <div className="py-3">
                      <p>
                        Duration: <b>{plan.period} Days</b>
                      </p>
                    </div>
                    <button
                      onClick={handleInvestNow}
                      className="my-3 inline-block bg-[#ff9100] py-3 px-10 text-base font-medium tracking-wide text-white rounded-md"
                    >
                      Invest Now
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
