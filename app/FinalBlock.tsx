import React from "react";
import Image from "next/image";
import FadeInOnScroll from "./FadeInOnScroll";

const FinalBlock: React.FC = () => (
  <div className="relative w-full py-20 flex items-center justify-center mt-10">
    <div className="absolute inset-0 bg-black">
      <div className="w-full h-full" />
      <Image
        src="/images/hall.png"
        alt="background"
        fill
        priority
        className="w-full h-full object-cover blur-xs"
      />
    </div>
    <FadeInOnScroll y={30}>
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="w-24 h-0.5 bg-white mb-8 rounded-full" />
        <p className="text-2xl text-white text-center font-snell mb-8">
          Сіздерді қуанышымызға ортақтасуға шақырамыз!
        </p>
        <div className="text-3xl text-white text-center font-snell mb-2">Құрметпен той иелері</div>
        <div className="text-3xl text-white text-center font-snell mb-8">Ерқанат - Бақытгүл!</div>
        <div className="w-24 h-0.5 bg-white mt-4 rounded-full" />
      </div>
    </FadeInOnScroll>
  </div>
);

export default FinalBlock; 