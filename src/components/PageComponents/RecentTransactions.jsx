"use client";

import { PlusSquare } from "lucide-react";

const depositArray = [
  {
    ststus: "Pending",
    amount: "120",
    wallet: "xs23232s2ss2siuh29h22mnin929s22",
  },
  {
    ststus: "Pending",
    amount: "1000",
    wallet: "sd2s3223d3ervtj67j4f4fd4efd33dd",
  },
  {
    ststus: "Completed",
    amount: "800",
    wallet: "r3we222223d3ervtj67j4f4fd4efd33dd",
  },
  {
    ststus: "Completed",
    amount: "1040",
    wallet: "inewiunhu93923w23w2hu29iwhu2u2h9idw",
  },
  {
    ststus: "Completed",
    amount: "7720",
    wallet: "2ws22wmoi2nso9mlo2nmnjxliuwokn22soi",
  },
  {
    ststus: "Completed",
    amount: "550",
    wallet: "chs322s2s2soi2220jis2m2is20js22ojis",
  },
  {
    ststus: "Pending",
    amount: "990",
    wallet: "2ws2s2s2nsi2jnxixnw2kjmjwkwijdewde",
  },
  {
    ststus: "Completed",
    amount: "4500",
    wallet: "j83ss3s3s2oj20ojs2m2o0mw209wimwwx2",
  },
  {
    ststus: "Completed",
    amount: "800",
    wallet: "r3we222223d3ervtj67j4f4fd4efd33dd",
  },
  {
    ststus: "Completed",
    amount: "650",
    wallet: "ojjjkwi2s92sj2smj2oisj29isj22si2ojs2",
  },
  {
    ststus: "Completed",
    amount: "7220",
    wallet: "233dj3oid3ojsmlwkxmlwmxowxowwxwe232w",
  },
  {
    ststus: "Completed",
    amount: "115",
    wallet: "xmokjmwokmwomsowsowijswmsowmsoiwsw",
  },
  {
    ststus: "Pending",
    amount: "1200",
    wallet: "w22w2oi2oi02wmlk2soi2skp2ksp22psks",
  },
  {
    ststus: "Completed",
    amount: "7500",
    wallet: "jj222s29s29s2snj2si2si2si2jsiu2jsi",
  },
];
const withdrawArray = [
  {
    ststus: "Completed",
    amount: "1200",
    wallet: "xs23232s2ss2siuh29h22mnin929s22",
  },
  {
    ststus: "Completed",
    amount: "1000",
    wallet: "sd2s3223d3ervtkjewdnjweindjeniwe",
  },
  {
    ststus: "Pending",
    amount: "8000",
    wallet: "xascece23d3ervtj67j4f4fd4efd33dd",
  },
  {
    ststus: "Completed",
    amount: "1400",
    wallet: "iunhu93923w23w2hu29iwhu2u2h9idwed",
  },
  {
    ststus: "Pending",
    amount: "5120",
    wallet: "u282ni2ussj2ks2ois2jok2siuiusnw02",
  },
  {
    ststus: "Completed",
    amount: "5500",
    wallet: "nh20920ooijoij2983yo2kidoihi2lwen",
  },
  {
    ststus: "Pending",
    amount: "99000",
    wallet: "keoiekjwdije9e8jw29e8u02ejejejed3",
  },
  {
    ststus: "Pending",
    amount: "45000",
    wallet: "xmoi239smwslpwnp9du2ijd2mj2j2i2i2",
  },
  {
    ststus: "Completed",
    amount: "8000",
    wallet: "9jij3is9iu32jdi3jo9jso9jdi2jsdi2k3",
  },
  {
    ststus: "Completed",
    amount: "8500",
    wallet: "32uh982h2ij2js928jiwunjhwd22sh22sh",
  },
  {
    ststus: "Completed",
    amount: "100,220",
    wallet: "8si2jhsiu2hs2jsjsinskjskwjs9ijkijwd",
  },
  {
    ststus: "Pending",
    amount: "115,000",
    wallet: "yuhy3282929892su2ijs2s2ijs92ijs92ij",
  },
  {
    ststus: "Completed",
    amount: "1,200,000",
    wallet: "32993kjid89230kd2oi3jd92j302kisik3s",
  },
  {
    ststus: "Completed",
    amount: "7,000,500",
    wallet: "x02s2soiu2sj2sjo2kslkmsoolkw2odwoido",
  },
];

export default function RecentTransactions() {
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center md:justify-between md:flex-row pt-10 pb-10 md:px-20">
        {/* <div className="flex flex-col gap-4"> */}
        <div className="flex flex-col gap-6 w-full px-5">
          <h1 className="flex items-center gap-3 text-lg text-green-600 bg-white rounded-md py-5 w-full px-10">
            <PlusSquare />
            Latest Deposits
          </h1>
          <div className="h-[600px] w-auto border-[0.5px] border-gray-300 scrollingTable">
            <div className="container mx-auto">
              <table className="w-full flex flex-col  transform marquee">
                <thead>
                  <tr className="flex items-center">
                    <th className="p-2">Status</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Wallet Address</th>
                  </tr>
                </thead>
                <tbody>
                  {depositArray.map((info, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="flex items-center border border-gray-300 px-3"
                    >
                      <td className={`${info.ststus === 'Completed' ? 'bg-green-600' : 'bg-[#fd961a]'} rounded-md my-2  py-2 px-2`}>
                        {info.ststus}
                      </td>
                      <td className=" py-2 px-2 my-2">${info.amount}</td>
                      <td className="  py-2 px-2 my-2">{info.wallet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}
        {/* <div className=""> */}
        <div className="flex flex-col gap-6 w-full px-5">
          <h1 className="flex items-center gap-3 text-lg text-red-600 bg-white rounded-md py-5 px-3">
            <PlusSquare />
            Latest Withdraws
          </h1>
          <div className="h-[600px] border-[0.5px] border-gray-300 scrollingTable">
            <div className="container mx-auto">
              <table className="w-full flex flex-col  transform marquee">
                <thead>
                  <tr className="flex items-center">
                    <th className="p-2">Status</th>
                    <th className="p-2">Amount</th>
                    <th className="p-2">Wallet Address</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawArray.map((info, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className="flex gap-4 items-center border border-gray-300 px-3"
                    >
                      <td className={`${info.ststus === 'Completed' ? 'bg-green-600' : 'bg-[#fd961a]'} rounded-md my-2  py-2 px-2`}>
                        {info.ststus}
                      </td>
                      <td className=" py-2 px-2 my-2">${info.amount}</td>
                      <td className="  py-2 px-2 my-2">{info.wallet.trim(2, 8)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}
