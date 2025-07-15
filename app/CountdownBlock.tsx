"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const WEDDING_DATE = new Date("2025-10-17T18:00:00+06:00");

function getTimeLeft() {
  const now = new Date();
  const diff = WEDDING_DATE.getTime() - now.getTime();
  const total = Math.max(diff, 0);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function CountdownBlock() {
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTime(getTimeLeft()); // Сразу обновляем после маунта
    const timer = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[520px] flex items-end justify-center overflow-hidden">
      {/* Фоновое изображение Unsplash */}
      <Image
        src="/images/countdown.png"
        alt="wedding background"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      {/* Затемнение */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-10" />
      {/* Контент */}
      <div className="relative z-20 w-full flex flex-col items-center pb-16">
        <div className="text-white text-3xl md:text-4xl font-snell mb-6 text-center drop-shadow">Үйлену тойына дейін:</div>
        <div className="flex gap-6 md:gap-10 text-white text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold font-snell">{time.days}</div>
            <div className="text-base md:text-lg font-snell mt-1">күн</div>
          </div>
          <span className="text-4xl md:text-5xl font-bold font-snell">:</span>
          <div>
            <div className="text-4xl md:text-5xl font-bold font-snell">{String(time.hours).padStart(2, '0')}</div>
            <div className="text-base md:text-lg font-snell mt-1">сағат</div>
          </div>
          <span className="text-4xl md:text-5xl font-bold font-snell">:</span>
          <div>
            <div className="text-4xl md:text-5xl font-bold font-snell">{String(time.minutes).padStart(2, '0')}</div>
            <div className="text-base md:text-lg font-snell mt-1">минут</div>
          </div>
          <span className="text-4xl md:text-5xl font-bold font-snell">:</span>
          <div>
            <div className="text-4xl md:text-5xl font-bold font-snell">{String(time.seconds).padStart(2, '0')}</div>
            <div className="text-base md:text-lg font-snell mt-1">секунд</div>
          </div>
        </div>
      </div>
    </div>
  );
} 