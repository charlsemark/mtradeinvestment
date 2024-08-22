import { useRouter } from "next/navigation";
import TradingViewWidget from "../DashboardComponents/TradeViewComp";
import { PlusIcon } from "lucide-react";


export default function MainDashboardComponent({ username, accountUpgrade, balance, totalInvestment, profit }) {

    const router = useRouter();

    return (
        <div className="flex flex-col pt-6 pb-10 px-2">
            <div className="flex flex-col gap-4">
                <span className="text-xl text-black">Welcome, <b className="text-[#007bff]">{username}</b></span>
                {accountUpgrade === 'isNeeded' && (
                    <div className="flex items-center justify-between gap-6 px-3 pt-1">
                        <p className="text-sm">Your account needs to be upgraded, please contact your admin <a className="underline text-[#007bff] cursor-pointer" href="mailto:support@spiketrader.online">via mail</a></p>
                    </div>
                )}
                <div className="flex flex-col items-start gap-3 md:flex-row space-x-8">
                    <div className="border border-1 border-gray-400 h-auto flex flex-col gap-3 justify-center p-4 rounded-lg w-full">
                        <div className="flex items-center justify-between gap-6 px-3 w-full">
                            <div className="flex flex-col">
                                <span className="text-sm md:text-base">Investments: <b>{totalInvestment}</b></span>
                            </div>
                            <a className="cursor-pointer" href="/dashboard/deposit">
                                <button className="bg-[#007bff] py-2 px-3 text-xs font-medium tracking-wide text-white rounded-xl cursor-pointer flex items-center gap-1 w-fit">
                                    <PlusIcon className="w-5 h-5 text-white" />
                                    <span>Fund</span>
                                </button>
                            </a>
                        </div>

                        <div className="flex flex-col items-start justify-between gap-2 pr-2 md:pr-0 max-w-md w-full">
                            <div className="border border-1 border-gray-400 w-full flex flex-col gap-3 justify-center p-4 rounded-lg whitespace-nowrap">
                                <span className="text-sm md:text-base">Balance: <b>${balance}</b></span>
                            </div>
                            <div className="border border-1 border-gray-400 w-full flex flex-col gap-3 justify-center p-4 rounded-lg whitespace-nowrap">
                                <span className="text-sm md:text-base">Profit: <b>${profit}</b></span>
                            </div>
                            <div className="whitespace-nowrap border border-1 border-gray-400 w-fit flex flex-col gap-3 justify-center p-3 rounded-lg bg-[#007bff]">
                                <span className="text-sm md:text-base text-white"><b>Need Upgrade</b></span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 border border-1 border-[#007bff] p-4 rounded-xl">
                        <p className="font-bold text-[#007bff] tracking-wide text-xl">Trading Bonus</p>
                        <p className="font-semibold text-gray-600 text-lg mt-1">Bonus: <span>{`$${bonus}`}</span></p>
                    <marquee className="mt-1 text-[#007bff]">Start your first investment now and receive 30% bonus ✨✨</marquee>
                    </div>

                    {/* <div className="-ml-8 border border-1 border-gray-400 h-[150px] flex flex-col justify-center p-4 rounded-lg">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex flex-col gap-1">
                                <span>My Investments</span>
                                <span>Total: <b>{totalInvestment}</b></span>
                            </div>
                            <button className="mt-1.5 inline-block bg-[#fd961a] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl">View All</button>
                        </div>
                    </div> */}
                    {/* <div className="border border-1 border-gray-400 h-[150px] flex flex-col justify-center p-4 rounded-lg">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex flex-col gap-1">
                                <span>Copy Traders</span>
                                <span><b>Start with the best!</b></span>
                            </div>
                            <button className="mt-1.5 inline-block bg-[#fd961a] py-2 px-5 text-xs font-medium tracking-wide text-white rounded-xl">See Traders</button>
                        </div>
                    </div> */}
                </div>
                <div className="mt-6">
                    <p>Live Chart</p>
                    <TradingViewWidget />
                </div>
            </div>
        </div>
    )
}