import { ArrowLeft, ChevronLeft, ChevronRight, ForwardIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const slidesData = [
  {
    id: 1,
    title: 'INVEST AND EARN WITH US',
    desc: `Invest with confidence on world's mutual trade management and investment platform.
    Your single point of access to professional asset investment and management solutions.
    Built for investors interested in stable returns and high liquidity.`,
    link1: '/register',
    link2: '/login',
    text1: 'Register',
    text2: 'Login',
    image: '/carousel-1.jpg',
  },
  {
    id: 2,
    title: 'TRADING EXPERTISE',
    desc: `Our goal is to enhance lives by providing a safe avenue, inspired by effective and innovative solutions for investing in the different, emerging financial markets in order to improve our investors' financial situation and ultimately provide them financial freedom.`,
    link1: '/register',
    link2: '/login',
    text1: 'Register',
    text2: 'Login',
    image: '/carousel-2.jpg',
  },
  {
    id: 3,
    title: 'HOW ABOUT EARNING MORE BY CRYPTO TRADING?',
    desc: `Welcome to Mutual Trade Investment! Smart Cryptocurrency trading on perfect conditions with Segregated Accounts and Rapid Execution with no re-quotes.`,
    link1: '/register',
    link2: '/login',
    text1: 'Register',
    text2: 'Login',
    image: '/carousel-3.jpg',
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slidesData.length - 1 : prevSlide - 1
    );
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentSlide]);

  return (
    <div className="relative h-[80vh] overflow-hidden">
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute top-0 left-0 w-full h-full transition-transform transform ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${slide.id}`}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-[#ff9100] opacity-20"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center flex flex-col max-w-3xl gap-4 items-center"> 
              <h3 className="text-4xl font-bold">{slide.title}</h3>
              <p className='text-lg font-medium'>{slide.desc}</p>
              <div className='flex flex-row items-center gap-2 md:gap-4'>
                <Link className='py-3 px-6 text-lg font-bold bg-[#ff9100] rounded-lg' href={slide.link1}>{slide.text1}</Link>
                <Link className='py-3 px-6 text-lg font-bold bg-[#ff9100] rounded-lg' href={slide.link2}>{slide.text2}</Link>
              </div>
            </div>
          </div>
        </div>
      ))}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white hidden md:inline-block text-black px-2 py-2 rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white hidden md:inline-block text-black px-2 py-2 rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default Carousel;
