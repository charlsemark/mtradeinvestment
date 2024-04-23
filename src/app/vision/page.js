"use client"

import Footer from "@/components/Footer"
import BannerComponent from "@/components/PageComponents/BannerComponent"



export default function Vision() {
    return (
        <>
            <div className="w-full">
                <BannerComponent title="Our Vision" sub="HOME / VISION" />
                <div className="px-6 flex flex-col md:flex-row items-center md:justify-between gap-10 justify-center my-8 md:my-40 md:mt-[240px]">
                    <div className="flex flex-col text-center items-center gap-5">
                        <h1 className="text-2xl font-bold tracking-wide hidden md:block">EXPLORE US FROM THE EXPERIENCE</h1>
                        <img src="/about-us.png" alt="About us" className="" />
                    </div>
                    <div className="flex flex-col space-y-5 w-2/3 text-base px-6">
                        <h1 className="text-2xl font-bold tracking-wide md:hidden">EXPLORE US FROM THE EXPERIENCE</h1>
                        <p>DELIGHTASSETMARKET is a premier investment firm that specializes in providing expert investment management services to individuals and institutions. Our team of seasoned investment professionals has decades of experience in the financial industry and is dedicated to helping clients achieve their financial goals.</p>
                        <p>At DELIGHTASSETMARKET, we understand that the investment landscape can be complex and ever-changing, which is why we offer a diverse range of investment products and services to meet the unique needs of our clients. Whether you are a seasoned investor or just starting out, we have the tools and expertise to help you succeed.</p>
                        <p>
                            Our investment philosophy is centered around three core principles: discipline, risk management, and transparency. We believe that disciplined investment strategies are key to long-term success, and we work closely with our clients to develop customized investment plans that align with their goals and risk tolerance.
                        </p>
                        <p>
                            At DELIGHTASSETMARKET, we believe that transparency is key to building trust with our clients. That's why we provide regular performance reports and open communication channels to keep our clients informed and engaged in the investment process.
                        </p>
                        <p>
                            Our investment products and services include a range of equity and fixed-income strategies, as well as alternative investments such as real estate, private equity, and hedge funds. We also offer comprehensive financial planning services to help clients achieve their long-term financial goals.
                        </p>
                        <p>
                            At DELIGHTASSETMARKET, we are committed to delivering exceptional investment management services that help our clients achieve their financial objectives. Contact us today to learn more about how we can help you succeed in the world of investing.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}