"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import CalendarBlock from "./CalendarBlock";
import CountdownBlock from "./CountdownBlock";
import SurveyForm from "./SurveyForm";
import FinalBlock from "./FinalBlock";

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleMusic = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <main className="bg-[#f9f9f9] overflow-x-hidden">
      <div className="h-dvh relative">
        <audio ref={audioRef} src="/alem.mp3" preload="auto" />
        <Image src="/images/hero.png" alt="background" fill className="object-cover" />
        <button
          onClick={handleMusic}
          className="absolute left-[72%] top-[54%] z-20 bg-transparent p-2 rounded-full hover:bg-white/20 transition"
          aria-label={playing ? "Остановить музыку" : "Включить музыку"}
          type="button"
          style={{ width: 80, height: 80, position: 'relative' }}
        >
          {/* Вращающийся текст по кругу */}
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg width="80" height="80" viewBox="0 0 80 80" className="animate-rotate-circle" style={{ position: 'absolute', inset: 0 }}>
              <defs>
                <path id="circlePath" d="M40,40 m-32,0 a32,32 0 1,1 64,0 a32,32 0 1,1 -64,0" />
              </defs>
              <text fill="#fff" fontSize="20" className="font-savoye">
                <textPath xlinkHref="#circlePath" startOffset="0">
                  Әнді қосу үшін • Әнді қосу үшін • 
                </textPath>
              </text>
            </svg>
          </span>
          <span style={{ position: 'absolute', inset: 20 }}>
            <Image
              src="/music.webp"
              alt="music"
              width={40}
              height={40}
              className={`transition-opacity duration-300 ${playing ? 'opacity-0' : 'opacity-100'}`}
              draggable={false}
              style={{ position: 'absolute', inset: 0 }}
            />
            <Image
              src="/pause.webp"
              alt="pause"
              width={40}
              height={40}
              className={`transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}
              draggable={false}
              style={{ position: 'absolute', inset: 0 }}
            />
          </span>
        </button>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-end pb-10">
          <h1 className="text-4xl font-bold text-white font-snell">Батырбек & Гузель</h1>
          <p className="text-white text-4xl font-snell mt-2">17.10.2025</p>
          <Image
            src="/arrow.webp"
            alt="decorative"
            width={65}
            height={12}
            className="mt-10 animate-bounce-vertical"
            unoptimized
            style={{ width: 65, height: 'auto' }}
          />
        </div>
      </div>
      <div className="py-14">
        <div className="px-4 flex flex-col items-center justify-center">
          <h1 className="text-3xl text-black font-snell">
            Құрметті қонақтар!
          </h1>
          <p className="text-black mt-6 text-center font-snell">
            Мы рады сообщить , что в нашей жизни состоится самое главное и торжественное событие - день свадьбы наших детей! 
          </p>
        </div>
        <div className="relative w-[110%] h-[90px] -ml-5 mt-6">
          <Image src="/line-heart.webp" alt="invitation" fill className="object-cover" />
        </div>
      </div>
      <CalendarBlock />
      <div className="py-14 flex flex-col items-center w-full">
        <div className="flex flex-col items-center gap-2 mt-8">
          <h3 className="text-3xl font-snell text-black">Мекенжайы:</h3>
          <p className="text-2xl font-snell text-black text-center">
            Павлодар қ. <br /> Иса Байзақов көшесi 186 көшесі
          </p>
          <p className="text-2xl font-snell text-black">
            <a href="https://maps.app.goo.gl/Nz3r49dVLfoFa5ct8" target="_blank" rel="noopener noreferrer">
              <span className="underline">Ресторан &ldquo;Марсель&ldquo;</span>
            </a>
          </p>
        </div>
        <div className="w-full max-w-4xl mt-4" style={{ aspectRatio: '4/3' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.2469002885055!2d76.95856081401674!3d52.27521943535626!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x42f9cb2ca8c0402b%3A0x5b7c16358febc8d9!2z0JzQsNGA0YHQtdC70Yw!5e0!3m2!1sru!2skz!4v1752548950159!5m2!1sru!2skz"
              style={{ width: '100%', height: '100%', border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
      </div>
      <CountdownBlock />
      <SurveyForm />
      <FinalBlock />
    </main>
  );
}
