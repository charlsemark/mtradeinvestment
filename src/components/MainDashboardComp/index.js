import { useRouter } from "next/navigation";
import TradingViewWidget from "../DashboardComponents/TradeViewComp";
import { PlusIcon } from "lucide-react";
import Link from "next/link";


export default function MainDashboardComponent({ username, accountUpgrade, balance, totalInvestment, profit, bonus }) {

    const router = useRouter();

    return (
        <div className="flex flex-col pt-10 pb-10">
            <div className="flex flex-col gap-4">
                <span className="text-xl text-black">Welcome trader;</span>
                <div className="flex items-center justify-between">
                    <b className="text-[#1f2937]">{username}</b>
                    <Link className="bg-[#1f2937] p-4 text-xs font-medium tracking-wide text-white rounded-lg flex items-center gap-1 w-fit" href="/dashboard/deposit">Deposit</Link>
                </div>
                {accountUpgrade === 'isNeeded' && (
                    <div className="flex items-center justify-between gap-6 px-3 pt-1">
                        <p className="text-sm">Your account needs to be upgraded, please contact your admin <a className="underline text-[#ff9100] cursor-pointer" href="mailto:support@spiketrader.online">via mail</a></p>
                    </div>
                )}
                <div className="flex flex-col items-start gap-3 md:flex-row space-x-8">
                    <div className="bg-gradient-to-r from-[#ff9100] to-[#1f2937] h-auto flex flex-col gap-3 justify-center p-4 rounded-md w-full text-white text-xl">


                        <div className="text-white flex flex-col items-start justify-between pr-2 md:pr-0 max-w-md w-full">
                            <div className="flex items-center justify-between py-2 px-1 w-full text-base">
                                <span>Investments</span>
                                <span><b>{totalInvestment}</b></span>
                            </div>
                            <div className="w-full flex items-center gap-3 justify-between py-2 px-1 whitespace-nowrap text-base">
                                <span>Balance</span>
                                <span><b>${balance}</b></span>
                            </div>
                            <div className="w-full flex items-center gap-3 justify-between py-2 px-1 whitespace-nowrap text-base">
                                <span>Profit</span>
                                <span><b>${profit}</b></span>
                            </div>
                            <div className="w-full flex items-center gap-3 justify-between py-2 px-1 whitespace-nowrap text-base">
                                <span>Account Level</span>
                                <span><b>Level 1</b></span>
                            </div>
                            <div className="flex items-center justify-between w-full py-2">
                                <span className="text-sm md:text-base text-white"><b>{" "}</b></span>
                                <Link className="whitespace-nowrap w-fit flex items-end text-[#1f2937] justify-between text-sm py-1 px-3 rounded-md bg-[#fff]" href="/dashboard/plans">Invest now</Link>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-[#1f2937] to-[#141414e3] text-white p-4 rounded-xl">
                        <p className="font-bold tracking-wide text-lg">Trading Bonus</p>
                        <p className="font-semibold text-gray-200 text-lg mt-1">Bonus: <span>{`$${bonus}`}</span></p>
                        <marquee className="mt-1 text-gray-400">Start your first investment now and receive 30% bonus ✨✨</marquee>
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
                    <TradingViewWidget />
                </div>
            </div>
        </div>
    )
}