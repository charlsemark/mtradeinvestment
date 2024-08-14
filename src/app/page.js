"use client"

// import fetchLoginUser from "@/services/user";

import Alert from "@/components/Alerts/WelcomeAlert";
import Footer from "@/components/Footer";
// import Carousel from "@/components/PageComponents/HeroCarousel/Carousell";
import Customers from "@/components/PageComponents/CustomersCard";
import HeroSection from "@/components/PageComponents/HeroSection";
import HowItWorks from "@/components/PageComponents/HowItWorks";
import ViewAllPlans from "@/components/PageComponents/ViewAllPlans";
import fetchLoginUser from "@/services/user";
import UserAlerts from "@/utils/usersAlert";
import { useState } from "react";
import MarketBased from "@/components/PageComponents/MarketBasedTrades";
import AllPlans from "@/components/PageComponents/Investments";
import RecentTransactions from "@/components/PageComponents/RecentTransactions";
import Carousel from "@/components/PageComponents/HeroCarousel/Carousell";
import AboutLead from "@/components/PageComponents/AboutLead";
import InvestmentProducts from "@/components/PageComponents/InvestmentProducts/InvestmentProducts";
import LanguageTranslate from "@/components/LanguageTranslate";

// import { fetchLoginUser } from "@/services/user";


export default function Home() {
  // const [isAlertOpen, setIsAlertOpen] = useState(true)
  return (
    <>
    
    {/* { isAlertOpen && <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} />} */}
      <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#222] text-white">
        <Carousel />
        <AboutLead />
        <HeroSection />
        <InvestmentProducts />
        <HowItWorks />
        <AllPlans />
        {/* <MarketBased /> */}
        <Customers />
        {/* <RecentTransactions /> */}
        <ViewAllPlans />
        <LanguageTranslate />
        <Footer />
      </div>
    </>
  )
}
