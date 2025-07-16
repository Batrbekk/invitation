import Image from "next/image";
import FadeInOnScroll from "./FadeInOnScroll";

export default function CalendarBlock() {
  // Дни недели на казахском
  const weekDays = ["Дс", "Сс", "Ср", "Бс", "Жм", "Сб", "Жс"];
  // Числа для отображения: последние дни сентября, октябрь, первые дни ноября
  const days = [
    { day: 29, type: "prev" }, { day: 30, type: "prev" },
    { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5 },
    { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 },
    { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17, type: "current" }, { day: 18 }, { day: 19 },
    { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 },
    { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 }, { day: 1, type: "next" }, { day: 2, type: "next" }
  ];
  return (
    <div className="w-full px-4 flex flex-col items-center">
      <FadeInOnScroll y={30}>
        <div className="flex flex-col items-center mb-6 w-full">
          <div className="flex items-center w-full justify-between max-w-2xl mx-auto mb-2">
            <div className="flex-1 border-t border-black mr-2" />
            <span className="text-xl text-black font-snell">Жұма</span>
            <div className="flex-1 border-t border-black ml-2" />
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl text-black mr-2 font-snell">қазан</span>
            <span className="text-5xl text-black mx-2 font-snell">17</span>
            <span className="text-xl text-black ml-2 font-snell">2025</span>
          </div>
          <div className="flex items-center w-full justify-between max-w-2xl mx-auto mt-2">
            <div className="flex-1 border-t border-black mr-2" />
            <span className="text-xl text-black font-snell">16:00</span>
            <div className="flex-1 border-t border-black ml-2" />
          </div>
        </div>
      </FadeInOnScroll>
      <FadeInOnScroll y={30} delay={0.15}>
        <div className="bg-transparent flex flex-col items-center w-full">
          <div className="grid grid-cols-7 gap-2 text-center text-gray-800 text-base select-none w-full max-w-2xl">
            {weekDays.map((d, i) => (
              <div key={d} className="text-gray-800 uppercase">{d}</div>
            ))}
            {days.map((item, idx) => {
              if (item.type?.includes("prev") || item.type?.includes("next")) {
                return <div key={idx} className="text-gray-400">{item.day}</div>;
              }
              if (item.type === "current") {
                return (
                  <div key={idx} className="relative flex items-center justify-center" style={{width: '100%', height: '100%'}}>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Image src="/heart.webp" alt="heart" width={38} height={38} className="animate-pulse-heart" />
                      <span className="absolute inset-0 flex items-center justify-center select-none" style={{fontWeight: 'normal', fontSize: 'inherit', lineHeight: 1}}>
                        {item.day}
                      </span>
                    </div>
                  </div>
                );
              }
              return <div key={idx}>{item.day}</div>;
            })}
          </div>
        </div>
      </FadeInOnScroll>
    </div>
  );
} 