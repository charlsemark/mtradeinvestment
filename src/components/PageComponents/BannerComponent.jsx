// BannerComponent.js

const BannerComponent = ({ title, sub }) => {
    return (
        <div className="relative h-[100px] md:h-320">
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-auto">
          <img src="/banner.jpg" alt="Banner" className="object-cover object-center" />
          {/* Overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-[#fd961a70]"></div>
        </div>
  
        {/* Centered Text Content */}
        <div className="absolute top-10 md:top-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h1 className="text-2xl md:text-4xl font-bold mb=2">{title}</h1>
          <p className="text-black font-semibold text-sm">{sub}</p>
        </div>
      </div>
    );
  };
  
  export default BannerComponent;
  