"use client"

import TradingViewWidgetTwo from "../DashboardComponents/TradeViewCompTwo"

export default function MarketBased(){
    return(
        <>
        <div className="flex flex-col items-center justify-center gap-18 px-14 py-20">
            <div className="text-center space-y-2">
                <h1 className="text-2xl tracking-wide font-medium">Analyzing the Market</h1>
                <p>You always get the best out from the market with <span className="text-[#fd961a]">superindextrade</span></p>
            </div>
            <div className="w-full py-8 px-4">
            <TradingViewWidgetTwo />
            </div>
        </div>
        </>
    )
}