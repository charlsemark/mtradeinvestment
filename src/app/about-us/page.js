"use client"

import React from 'react'
import { TrophyIcon } from "lucide-react";
import Footer from '@/components/Footer';

const About = () => {
    return (
        <>
            <div className="pt-16 text-white">
                <div>
                    <div className='relative h-[50vh] md:h-[80vh] overflow-hidden'>
                        <div className='absolute top-0 left-0 w-full h-full'>
                            <img src='https://leadassetmarket.com/site-images/WZMH-Architects-National-Bank-Trading-Floor-Toronto.jpg' alt='about' className='object-cover w-full h-full' />
                            <div className="absolute inset-0 bg-[#007bff] opacity-20"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-white text-center flex flex-col max-w-3xl gap-4 items-center">
                                    <h3 className="text-4xl font-bold">About Mutual Trade Investment</h3>
                                    <p className='text-lg font-medium'>
                                        Who We Are
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
                <div className="mx-auto flex flex-col items-center bg-[#01123c] text-white justify-center gap-10 py-20  w-full">
                    <div className="container md:px-40 flex flex-col items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                            <span className="bg-white p-6 rounded-full">
                                <TrophyIcon className="text-[#01123c] text-xl" />
                            </span>
                            <p className="text-white text-lg">Mutual Trade Investment</p>
                        </div>
                        <div className="flex flex-col text-center items-center gap-2 px-4">
                            <h3 className="text-xl md:text-3xl font-bold max-w-2xl">
                                WHY CHOOSE MUTUAL TRADE INVESTMENT?
                            </h3>
                            <p className='text-center text-sm'>
                                Mutual Trade Investment is a leading investment/ asset management company offering premium investment services to investors; both individuals and corporations. We pride ourselves in our guarantees and success track record in the trading/investment market.<br />
                                Our goal is to enhance lives by providing a safe avenue, inspired by effective and innovative solutions for investing in the different, emerging investment packages in order to improve our investors' financial situation and ultimately provide them financial freedom.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto bg-[#fff]  py-20 w-full">
                    <div className='flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 px-6'>
                        <div>
                            <img src='https://leadassetmarket.com/img/in-wave-image-2.jpg' alt='about' className='object-cover h-full' />
                        </div>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-4'>
                                <h3 className="text-[#012c6d] text-xl md:text-3xl font-bold max-w-2xl">
                                    TRUSTED BY MORE THAN 45 THOUSAND INVESTORS AROUND THE WORLD.
                                </h3>
                                <hr />
                                <div className='flex flex-col items-start gap-2'>
                                    <h4 className='text-[#012c6d] text-lg md:text-xl font-bold'>Fully regulated</h4>
                                    <p className='text-[#777] text-sm'>We adhere to the strictest regulatory standards, and are fully licensed and regulated across Europe, the Middle East and Asia.</p>
                                </div>
                                <div className='flex flex-col items-start gap-2'>
                                    <h4 className='text-[#012c6d] text-lg md:text-xl font-bold'>Multi-award winner</h4>
                                    <p className='text-[#777] text-sm'>We&apos;ve been consistently recognised by our industry and have won the highest accolades for our products, platform and investment services.</p>
                                </div>
                                <hr />
                                <div className='md:flex md:justify-between md:items-center hidden '>
                                    <div className='flex flex-col gap-2 items-center text-center'>
                                        <img src='https://leadassetmarket.com/img/in-wave-award.svg' alt='about' className='object-cover h-auto w-20' />
                                        <h6 className='text-[#012c6d] text-xs font-medium'>Most Reliable International Crypto Trading Platform</h6>
                                        <p className='text-[10px] text-[#777] font-light'>BTC TradeON Summit 2017</p>
                                    </div>
                                    <div className='flex flex-col gap-2 items-center text-center'>
                                        <img src='https://leadassetmarket.com/img/in-wave-award.svg' alt='about' className='object-cover h-auto w-20' />
                                        <h6 className='text-[#012c6d] text-xs font-medium'>Best Investments, Asset Management and Brokerage Platform</h6>
                                        <p className='text-[10px] text-[#777] font-light'>2017 International Business Magazine Awards</p>
                                    </div>
                                    <div className='flex flex-col gap-2 items-center text-center'>
                                        <img src='https://leadassetmarket.com/img/in-wave-award.svg' alt='about' className='object-cover h-auto w-20' />
                                        <h6 className='text-[#012c6d] text-xs font-medium'>Best Blockchain Accelerator and Execution Broker</h6>
                                        <p className='text-[10px] text-[#777] font-light'>AZTOMARKETS EXPO Dubai 2019</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto flex flex-col items-center bg-[#01123c] text-white justify-center gap-10 py-20  w-full">
                    <div className="container md:px-40 flex flex-col items-center gap-6">
                        <div className="flex flex-col text-center items-center gap-2 px-4">
                            <h3 className="text-xl md:text-3xl font-bold max-w-2xl">
                                ABOUT MUTUAL TRADE INVESTMENT
                            </h3>
                            <p className='text-center text-sm'>
                                Mutual Trade Investment We are crypto trading investment organization. With our years of experience in trading on the financial market and with the help of our machines and experts operators have successfully built sustainable income for our partners and investors. We have our own office in United States and we are licensed and regulated by the financial bodies necessary. Those that invest and make profit with us, have an account manager who manages their funds and executes profitable trades for our investors.<br /><br />
                                Mutual Trade Investment brings together the best aspects of crypto and the real economy in order to get to a qualitatively new level-composite economy. This means a simple integration of rules and customs of existing industries and segments of global and local economies. Utilizing the power of the global community and the sharing economy to tear down the barriers and revolutionize the old and inefficient financial systems.
                            </p>
                        </div>
                        <div className="flex flex-col text-center items-center gap-2 px-4">
                            <h3 className="text-xl md:text-3xl font-bold max-w-2xl">
                                OUR VISION
                            </h3>
                            <p className='text-center text-sm'>
                                Our vision is to create sustainable wealth and income for investors all round the world, and we have fulfilled this mandate for over four years, and we continue each day to make our platform much easier, safer and more profitable.<br /><br />
                                We believe that the future of Crypto Assets and Portfolios is one where we, the people, are in control of our own economy. A future where there&apos;s no place for middle-men, hidden fees and fine print.
                                <br /><br />
                                At Mutual Trade Investment we understand that decentralized cryptocurrencies like Bitcoin, Ethereum, Dogecoin, litecoin, and Tron will change the way the world views and uses Crypto Assets and Portfolios so, we are spearheading a new financial system being built in real-time, and we believe this new worldwide crypto financial system will accelerate humanity for a long time into the future.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="mx-auto bg-[#fff]  py-20 w-full">
                    <div className='flex flex-col gap-4 items-start px-6'>
                        <h3 className="text-[#012c6d] text-xl md:text-3xl font-bold max-w-2xl">
                            What We Do
                        </h3>
                        <p className='text-sm text-[#777] font-light'>We&apos;re proud to be an asset management company whose culture is driven by strong values and a long-term vision. At Mutual Trade Investment, our vision, mission and core values serve as the catalyst in our relations with our clients, employees, shareholders and in the communities in which we live and work. They are our guiding compass in our business each day.</p>
                        <p className='text-sm text-[#777] font-light'>Mutual Trade Investment is dedicated to helping investors around the world reach their desired investment goals and broaden their financial horizons.</p>
                        <p className='text-sm text-[#777] font-light'>We provide investment products and solutions to our clients across the world. Our breadth of investment capabilities is extensive and among the most innovative within the market.</p>
                        <p className='text-sm text-[#777] font-light'>We&apos;re a truly global asset manager, with offices in over 40 locations and investment centres in more than 20 locations.
                        </p>
                        <p className='text-sm text-[#777] font-light'>Investment involves risk. The value of investments, and the income from them, can go down as well as up and an investor may get back less than the amount invested. Past performance is not a guide to future results</p>
                        <p className='text-sm text-[#777] font-light'>Mutual Trade Investment was founded on a simple but revolutionary idea that an investment company should be run for the sole benefit of its investors. And so Mutual Trade Investment was designed to be different, removing outside owners and outside interests from the equation. Because of our investor-owned structure, Mutual Trade Investment&apos;s success can only be measured by your success.
                            Low costs, a long-term orientation, and focus on your goals are at the core of Mutual Trade Investment&apos;s investing philosophy, and not just because they sound good. They&apos;re essential to our approach because they&apos;re essential to the thing that really matters to you: the opportunity for investment success. So however you shape your portfolio, you can be sure that these principles run through everything we do</p>
                        <p className='text-sm text-[#777] font-light'>Mutual Trade Investment&apos;s mission is to help investors reach their goals, and that means access to advice that works for you. Whether through our own advisory services or supporting financial advisors, we stand firm in our belief that all investors deserve advice that can be trusted and puts your interests first. That&apos;s why we seek to provide the advice offerings you need to build your financial future.</p>
                        <p className='text-sm text-[#777] font-light'>Strategy matters. Mutual Trade Investment&apos;s approach to managing investments on behalf of our clients is to combine an in-depth appreciation of their unique circumstances and objectives with the investment capacity of a large-scale institutional investor. That means knowing when to apply traditional strategies and when to deviate to ensure consistent, strong risk-adjusted returns.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default About