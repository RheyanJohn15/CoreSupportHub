'use client';

import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import React from 'react';
import { FaMicrochip, FaHeadset, FaRegLightbulb } from "react-icons/fa";

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-1 items-center justify-center"></div>
      <HorizontalScrollCarousel />
      <div className="flex h-1 items-center justify-center"></div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {x
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Determine screen size to conditionally set x value
  const isSmallScreen = window.innerWidth < 768; // Adjust as per your design breakpoints

  // Adjust x value based on screen size and scrollYProgress
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    isSmallScreen ? ["3%", "-90%"] : ["7%", "-18%"]
  );

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <h1 className="pl-5 text-4xl text-quicksand text-main md:text-5xl lg:text-6xl whitespace-nowrap">
          Our Services
        </h1>
        <motion.div style={{ x }} className="flex gap-20">
          {cards.map((card) => {
            return <CardComponent card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const CardComponent = ({ card }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      key={card.id}
      className={`h-auto w-80 md:w-96 rounded shadow-xl bg-gradient-to-br p-7 from-yellow to-darkOrange transition duration-100 hover:shadow-main hover:from-main hover:to-yellow hover:text-white`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardBody>
        <div className="mb-4">
          {React.cloneElement(card.icon, {
            size: 35,
            className: `${isHovered ? 'text-yellow' : 'text-black'} cursor-pointer`,
          })}
        </div>
        <div>
          <div className="flex items-center mb-4">
            <Typography variant="h5" color="blue-gray" className="font-bold">
              {card.title}
            </Typography>
          </div>
          <Typography className="mb-4 text-gray-700">
            {card.body}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex justify-end">
        <Button variant="text" className="flex items-center">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8 ml-1">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Button>
      </CardFooter>
    </Card>
  );
};

// Your card data
const cards = [
  {
    icon: <FaMicrochip />,
    title: "IT Manage Services",
    id: 1,
    body: "Core Support Hub offers managed IT services including remote desktop support, system administration, and network monitoring to optimize your connectivity.",
  },
  {
    icon: <FaHeadset />,
    title: "Bpo",
    id: 2,
    body: "We design, build, and customize software and applications to enhance performance across operations, finance, HR, inventory, and business websites.",
  },
  {
    icon: <FaRegLightbulb />,
    title: "Consulting",
    id: 3,
    body: "Core Support Hub extends your business by understanding operations and delivering authentic brand ambassador services to your customers.",
  },
];

export default Example;
