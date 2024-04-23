"use client";

import { TrophyIcon } from "lucide-react";

const AboutLead = () => {
  return (
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
            MTRADEINVESTMENTS HELPS YOU GROW YOUR CRYPTO ASSETS AND PORTFOLIOS
          </h3>
          <p>
            Mutual Trade Investment, a pioneer of commisssion free investing, gives
            you access to investing and more ways to make your Crypto Assets and
            Portfolios work harder for you. Whether you're new to investing or a
            seasoned pro, it's time to partner with a company that believes you
            could and should be getting more from your Crypto Assets and
            Portfolios.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutLead;
