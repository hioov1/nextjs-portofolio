"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const CardStack = ({ items, offset, scaleFactor }: { items: Card[]; offset?: number; scaleFactor?: number }) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);
  const startFlipping = () => {
    interval = setInterval(() => {
      setCards((prevCards: Card[]) => {
        const newArray = [...prevCards]; // create a copy of the array
        newArray.unshift(newArray.pop()!); // move the last element to the front
        return newArray;
      });
    }, 5000);
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm xl:max-w-md mx-auto" style={{ height: `${60 + (cards.length - 1) * CARD_OFFSET}px` }}>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="absolute bg-gray-300 dark:bg-black h-60 w-full rounded-3xl p-4 sm:p-5 shadow-xl border border-gray-500/[0.1] dark:border-white/[0.1] shadow-gray-500/[0.1] dark:shadow-white/[0.05] flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR,
              zIndex: cards.length - index,
            }}
          >
            <div className="font-normal text-black dark:text-white text-sm sm:text-base leading-relaxed overflow-hidden">
              {card.content}
            </div>
            <div className="mt-3">
              <p className="text-black font-medium dark:text-white text-base sm:text-lg">{card.name}</p>
              <p className="text-black font-normal dark:text-white text-sm opacity-80">{card.designation}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
