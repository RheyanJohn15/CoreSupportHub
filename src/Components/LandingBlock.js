'use client';

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import String from '@/Strings/english';

const LandingBlock = () => {
  return (
    <section className="w-full mt-24 px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-20 max-w-6xl mx-auto">
      <div>
        <span className="block mb-4 text-sm text-white font-medium">
          {String.App}
        </span>
        <h3 className="text-4xl md:text-6xl font-semibold">
          {String.Tag1}
        </h3>
        <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
         {String.SubTag1}
        </p>
    
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "/tech/laravel.png",
  },
  {
    id: 2,
    src: "/tech/php.png",
  },
  {
    id: 3,
    src: "/tech/c_sharp.png",
  },
  {
    id: 4,
    src: "/tech/django.png",
  },
  {
    id: 5,
    src: "/tech/react.png",
  },
  {
    id: 6,
    src: "/tech/javascript.png",
  },
  {
    id: 7,
    src: "/tech/python.png",
  },
  {
    id: 8,
    src: "/tech/node.png",
  },
  {
    id: 9,
    src: "/tech/flutter.png",
  },
  {
    id: 10,
    src: "/tech/ionic.png",
  },
  {
    id: 11,
    src: "/tech/docker.png",
  },
  {
    id: 12,
    src: "/tech/firebase.png",
  },
  {
    id: 13,
    src: "/tech/tailwind.png",
  },
  {
    id: 14,
    src: "/tech/next.png",
  },
  {
    id: 15,
    src: "/tech/dotnet.png",
  },
  {
    id: 16,
    src: "/tech/mysql.png",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "contain",
        backgroundPosition:"center",
        backgroundRepeat: "no-repeat",
        backgroundColor: 'rgba(15,15,15, 0.7)',
        borderRadius: '20px',
        backdropFilter: 'blur(40px)'
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 7000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default LandingBlock;