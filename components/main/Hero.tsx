import React from "react";
import HeroContent from "../sub/HeroContent";

const Hero = () => {
  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      {/* {typeof window !== "undefined" && window.innerWidth >= 768 ? ( */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="rotate-180 absolute top-[-340px] h-full w-full left-0 z-[1] object-cover"
          preload="auto"
        >
          <source src="/blackhole.webm" type="video/webm" />
          {/* Fallback */}
          {/* Your browser does not support the video tag. */}
        </video>
      {/* ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-black z-[1]" />
      )} */}
      <HeroContent />
    </div>
  );
};

export default Hero;
