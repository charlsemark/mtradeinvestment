"use client";

import React, { useEffect } from "react";
import { TbArrowUpRight } from "react-icons/tb";
import "aos/dist/aos.css";
import AOS from "aos";
import Image from "next/image";

const HeroSection = () => {
  useEffect(() => {
    AOS.init({ duration: 200 });
  }, []);
  return (
    <div
      id="register"
      className="container text-white mx-auto flex  items-center flex-col gap-10 py-20 bg-white"
    >
      <div className="container flex md:flex-row items-center justify-between flex-col">
        <div className="w-[400px] md:w-[1800px] h-auto">
          <Image
            src="/about.jpg"
            alt="Square boxes"
            width={1200}
            height={1200}
            className="object-cover"
            data-aos="fade-left"
            data-aos-delay="200"
          />
        </div>
        <div
          className="px-6 flex flex-col items-center justify-center text-center text-[#01123c]"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <h1 className="text-xl md:text-3xl lg:text-3xl font-bold mb-5 lg:mb-6 -tracking-wide md:w-3/4 lg:3/5 text-[#01123c]">
            LUCRATIVE INVESTMENT OPPORTUNITY AT YOUR FINGERTIPS.
          </h1>
          <p
            className=" mb-5 lg:mb-4 md:text-[17px] md:w-3/4 lg:w-3/5 text-[#01123c]"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Spiketrade is dedicated to helping investors around the world reach
            their desired investment goals and broaden their financial horizons.
            We provide investment products and solutions to our clients across
            the world..
          </p>
          <p
            className="mb-5 lg:mb-10 md:text-[17px]  md:w-3/4 lg:w-3/5 text-[#01123c]"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Spiketrade was founded on a simple but revolutionary idea that an
            investment company should be run for the sole benefit of its
            investors. Spiketrade's success can only be measured by your
            success.
          </p>
          <button className="flex items-center space-x-1 bg-[#01123c] text-white text-[16px] px-5 py-3 hover:opacity-80 ease-in duration-200 rounded-md">
            <a href="/register">Get Started Now!</a>
            <TbArrowUpRight className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="container px-6 flex flex-col gap-3 items-center justify-center md:flex-row md:gap-6">
        <p>As seen on</p>
        <hr />
        <div
          className="grid grid-cols-3 md:grid-cols-5 items-center gap-6 justify-center"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <Image
            src="/cnbc.svg"
            alt="Square boxes"
            width={140}
            height={40}
            className="object-cover"
            // data-aos="fade-left"
            // data-aos-delay="200"
          />
          <Image
            src="/theguadian.svg"
            alt="Square boxes"
            width={140}
            height={40}
            className="object-cover"
            // data-aos="fade-left"
            // data-aos-delay="200"
          />
          <Image
            src="/bloomberg.svg"
            alt="Square boxes"
            width={140}
            height={40}
            className="object-cover"
            // data-aos="fade-left"
            // data-aos-delay="200"
          />
          <Image
            src="/maxwatch.svg"
            alt="Square boxes"
            width={140}
            height={40}
            className="object-cover"
            // data-aos="fade-left"
            // data-aos-delay="200"
          />
          <Image
            src="/cnbc.svg"
            alt="Square boxes"
            width={140}
            height={40}
            className="object-cover"
            // data-aos="fade-left"
            // data-aos-delay="200"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
