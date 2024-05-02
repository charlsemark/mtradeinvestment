import { GlobalContext } from "@/context";
import UserDetailsContext from "@/context/useUser";
import { fetchPlans } from "@/services/fetchPlans";
import {
  BarChart2Icon,
  BitcoinIcon,
  BoxIcon,
  ChevronLeft,
  ChevronRight,
  DollarSignIcon,
  LeafIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { TbChartCandleFilled } from "react-icons/tb";

const allPlans = [
  {
    planName: "Basic Plan - Beginner Group",
    maxPrice: 100000,
    minPrice: 10000,
    roiPeriod: "Weekly",
    roi: 45,
    period: "6",
  },
  {
    planName: "Business Plan - Professional Group",
    maxPrice: 350000,
    minPrice: 60000,
    roiPeriod: "Weekly",
    roi: 60,
    period: "6",
  },
  {
    planName: "Joint Plan - BOT Plan",
    maxPrice: 1000000,
    minPrice: 100000,
    roiPeriod: "Weekly",
    roi: 60,
    period: "12",
  },
  {
    planName: "Retirement Plan",
    maxPrice: 1000000,
    minPrice: 250000,
    roiPeriod: "Weekly",
    roi: 75,
    period: "12",
  },
  {
    planName: "Savings Plan",
    maxPrice: 500000,
    minPrice: 40000,
    roiPeriod: "Weekly",
    roi: 60,
    period: "6",
  },
  {
    planName: "Premium Plan",
    maxPrice: 1000000,
    minPrice: 75000,
    roiPeriod: "Daily",
    roi: 5,
    period: "6",
  },
];

const slideData = [
  {
    id: 1,
    image: "/carousel-1.jpg",
  },
  {
    id: 2,
    image: "/carousel-3.jpg",
  },
  {
    id: 3,
    image: "/carousel-2.jpg",
  },
];

const InvestmentProducts = () => {
  //   UserDetailsContext();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide2, setCurrentSlide2] = useState(0);
  const router = useRouter();

  const handleInvestNow = () => {
    router.push("/login");
  };

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % allPlans.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? allPlans.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentSlide]);

  // Next Slider
  const nextSlide2 = () => {
    setCurrentSlide2((prevSlide2) => (prevSlide2 + 1) % allPlans.length);
  };

  const prevSlide2 = () => {
    setCurrentSlide2((prevSlide2) =>
      prevSlide2 === 0 ? allPlans.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const intervalId2 = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(intervalId2); // Cleanup on component unmount
  }, [currentSlide2]);
  return (
    <>
      <div className="mx-auto flex flex-col items-center bg-[#01123c] text-white justify-center gap-10 py-20  w-full">
        <div className="flex flex-col md:flex-row gap-6 md:gap-12 divide-x-2 divide-white md:divide-x-0">
          <div className="flex flex-col items-center gap-6 px-4">
            <h2 className="font-bold text-white text-2xl md:text-3xl">
              Investment products
            </h2>
            <p className="text-md text-white leading-6 text-center md:max-w-[200px]">
              Choose from our array of 6 different investment packages and get
              started investing.
            </p>
          </div>
          <hr className="hidden" />
          <div className="grid grid-cols-3 md:grid-cols-3 items-center gap-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="bg-white p-6 rounded-full">
                <DollarSignIcon className="text-[#01123c] text-xl" />
              </span>
              <p className="text-white text-md md:text-lg font-semibold uppercase">
                Starter Plan
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="bg-white p-6 rounded-full">
                <BitcoinIcon className="text-[#01123c] text-xl" />
              </span>
              <p className="text-white text-md md:text-lg font-semibold uppercase">
                Premium Plan
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="bg-white p-6 rounded-full">
                <BarChart2Icon className="text-[#01123c] text-xl" />
              </span>
              <p className="text-white text-md md:text-lg font-semibold uppercase">
                Joint Plan
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="bg-white p-6 rounded-full">
                <TbChartCandleFilled className="text-[#01123c] text-xl" />
              </span>
              <p className="text-white text-md md:text-lg font-semibold uppercase">
                Savings Plan
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="bg-white p-6 rounded-full">
                <LeafIcon className="text-[#01123c] text-xl" />
              </span>
              <p className="text-white text-md md:text-lg font-semibold uppercase">
                Business Plan
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <span className="bg-white p-6 rounded-full">
                <BoxIcon className="text-[#01123c] text-xl" />
              </span>
              <p className="text-white text-md md:text-lg font-semibold uppercase">
                Retirement Plan
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-3">
            <h2 className="font-bold text-white text-2xl md:text-3xl">
              An account for everyone
            </h2>
            <p className="text-md text-white leading-6 text-center max-w-4xl px-4">
              Our goal is to make investing in financial markets more
              affordable, more intuitive, and more fun, no matter how much
              experience you have(or don't have) Whatever your circumstances, we
              offer wealth planning and investment management that is
              appropriate, personal, honest and clear. And whatever your
              ambitions, we are there to help you use investing in the financial
              markets to enrich your life.
            </p>
          </div>
        </div>
        <div className="">
          <div className="container w-full mx-4 md:mx-auto mb-8 overflow-hidden">
            <div className="px-4 w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-center mt-5 mx-0 mb-0 space-y-6">
              {allPlans.map((plan, index) => (
                <div
                  key={plan.id}
                  className={`flex-shrink-0 w-[280px] bg-[#01123c] rounded-xl border-[0.6px] border-gray-300 h-auto flex flex-col items-center text-white ml-2 mr-2`}
                >
                  <div className="w-full py-6 bg-[#01123c] text-white text-center text-xl font-bold rounded-t-xl">
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
                      Profit Period: <b>{plan.roiPeriod}</b>
                    </p>
                  </div>
                  <div className="py-3">
                    <p>
                      Profit: <b>{plan.roi}%</b>
                    </p>
                  </div>
                  <div className="py-3">
                    <p>
                      Duration: <b>{plan.period} Months</b>
                    </p>
                  </div>
                  <button
                    onClick={handleInvestNow}
                    className="my-3 inline-block bg-white py-3 px-5 text-base font-medium tracking-wide text-[#01123c] rounded-md"
                  >
                    Invest Now
                  </button>
                </div>
              ))}
              <button
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white hidden md:inline-block text-black px-4 py-2 rounded-full focus:outline-none z-99"
                onClick={prevSlide}
              >
                <ChevronLeft />
              </button>
              <button
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white hidden md:inline-block text-black px-4 py-2 rounded-full focus:outline-none"
                onClick={nextSlide}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[#1f263f] py-12 w-full">
          <div className="container mx-auto px-6">
            <div className="flex flex-col gap-5">
              <h2 className="font-bold text-2xl md:text-3xl">
                WE ARE COMMITTED TO OFFERING HIGH-PERFORMING INVESTMENT PACKAGES
                TO OUR INVESTORS.
              </h2>
              <p className="text-[#8f8f8f] leading-6 text-md">
                Our primary focus has been on emerging and rapid growth
                investment markets with an emphasis on Cryptocurrencies and
                other top performing investment solutions. We are proud to work
                to the highest ethical standards of Bitcoin mining and other
                trading strategies. We are pleased to offer some of the most
                dynamic and high-performing investment packages available.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-8 mt-6">
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-4">
                  <span className="bg-[#8f8f8f] w-3 h-8"></span>
                  <h1 className="font-bold text-2xl md:text-3xl">$617Bn+</h1>
                </div>
                <p className="font-thin text-md">IN ACTIVE INVESTMENTS</p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-4">
                  <span className="bg-[#8f8f8f] w-3 h-8"></span>
                  <h1 className="font-bold text-2xl md:text-3xl">113M+</h1>
                </div>
                <p className="font-thin text-md">ACTIVE INVESTMENT ACCOUNTS</p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-4">
                  <span className="bg-[#8f8f8f] w-3 h-8"></span>
                  <h1 className="font-bold text-2xl md:text-3xl">$408Bn+</h1>
                </div>
                <p className="font-thin text-md">
                  TOTAL GROSS INTEREST EARNED BY INVESTORS TO DATE
                </p>
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-4">
                  <span className="bg-[#8f8f8f] w-3 h-8"></span>
                  <h1 className="font-bold text-2xl md:text-3xl">13+</h1>
                </div>
                <p className="font-thin text-md">YEARS OF EXPERIENCE</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:justify-between">
            <div className="space-y-4">
              <h1 className="font-semibold text-xl leading-6 text-center">
                ABOUT MTRADEINVESTMENT
              </h1>
              <p className="">
                Mutual Trade Investment We are crypto trading investment organization.
                With our years of experience in trading on the financial market
                and with the help of our machines and experts operators have
                successfully built sustainable income for our partners and
                investors. We have our own office in United States and we are
                licensed and regulated by the financial bodies necessary. Those
                that invest and make profit with us, have an account manager who
                manages their funds and executes profitable trades for our
                investors.
              </p>
              <p>
                Mutual Trade Investment brings together the best aspects of crypto and
                the real economy in order to get to a qualitatively new
                level-composite economy. This means a simple integration of
                rules and customs of existing industries and segments of global
                and local economies. Utilizing the power of the global community
                and the sharing economy to tear down the barriers and
                revolutionize the old and inefficient financial systems.
              </p>
            </div>
            <div className="space-y-4">
              <h1 className="font-semibold text-xl leading-6 text-center">
                OUR VISION
              </h1>
              <p className="">
                Our vision is to create sustainable wealth and income for
                investors all round the world, and we have fulfilled this
                mandate for over four years, and we continue each day to make
                our platform much easier, safer and more profitable.
              </p>
              <p className="">
                We believe that the future of Crypto Assets and Portfolios is
                one where we, the people, are in control of our own economy. A
                future where there&apos;s no place for middle-men, hidden fees
                and fine print.
              </p>
              <p>
                At Mutual Trade Investment we understand that decentralized
                cryptocurrencies like Bitcoin, Ethereum, Dogecoin, litecoin, and
                Tron will change the way the world views and uses Crypto Assets
                and Portfolios so, we are spearheading a new financial system
                being built in real-time, and we believe this new worldwide
                crypto financial system will accelerate humanity for a long time
                into the future.
              </p>
            </div>
          </div>
        </div>
        <div className="container px-4 flex flex-col gap-4 items-center">
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
            <div className="relative h-[460px] w-auto overflow-hidden bg-transparent z-10">
              {slideData.map((slide2, index2) => (
                <div
                  key={slide2.id}
                  className={`w-full h-full transition-transform transform ${
                    index2 === currentSlide2
                      ? "translate-x-0"
                      : "translate-x-full"
                  }`}
                >
                  <img
                    src={slide2.image}
                    alt={`Slide ${slide2.id}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
              
            </div>
            <div className="space-y-4">
              <h1 className="font-semibold text-xl leading-6">
                THE REVOLUTION IN ASSET INVESTMENTS MANAGEMENT
              </h1>
              <div className="space-y-6">
                <p>
                  We offer our investors access to high-growth investment
                  opportunities in the financial markets through the utility of
                  state-of-the-art technical facilities and the implementation
                  of industry standard cryptocurrency trading strategies.
                </p>
                <p>
                  We&apos;re proud to be an asset management company whose
                  culture is driven by strong values and a long-term vision. At
                  Delight Asset Market Investments, our vision, mission and core
                  values serve as the catalyst in our relations with our
                  clients, employees, shareholders and in the communities in
                  which we live and work. They are our guiding compass in our
                  business each day.
                </p>
                <button className="uppercase text-lg px-4 py-2 border-[0.6px] border-white rounded-md bg-transparent text-white">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#1f263f] mx-auto py-6 w-full pt-6">
          <div className="container px-6 md:px-6 mx-auto flex flex-col items-center md:flex-row md:justify-around md:gap-10">
            <div className="w-[400px] md:w-[580px] h-[320px] md:h-[400px]">
              <img
                src="/awaardd.jpeg"
                width={800}
                height={800}
                className="object-cover"
              />
            </div>
            <div className="w-[400px] md:w-[580px] h-[400px]">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/GmOzih6I1zs"
                title="What is Bitcoin Mining?"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvestmentProducts;
