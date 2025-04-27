"use client";
import { useEffect, useState } from "react";
import HeroContent from "../sub/HeroContent";

export default function HeroSection() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setIsMobileDevice(isMobile);
  }, []);

  return (
    <div className="relative flex flex-col h-full w-full" id="about-me">
      {/* {!isMobileDevice && (
        <video
          autoPlay
          muted
          loop
          playsInline
          className="rotate-180 absolute top-[-340px] h-full w-full left-0 z-[1] object-cover"
          preload="auto"
          poster="/fallback-image.jpg"
        >
          <source src="/blackhole.webm" type="video/webm" />
        </video>
      )} */}

      <HeroContent />
    </div>
  );
}
