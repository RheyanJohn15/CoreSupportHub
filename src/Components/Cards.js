import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Image from "next/image";
import Img from '../../public/techIcon.png';
import { GrTechnology } from "react-icons/gr";
import { useState } from 'react';

const Example = () => {
  return (
    <div className="bg-neutral-800">
      <div className="flex h-1 items-center justify-center">
        {/* <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span> */}
      </div>
      <HorizontalScrollCarousel />
      <div className="flex h-1 items-center justify-center">
        {/* <span className="font-semibold uppercase text-neutral-500">
          Scroll up
        </span> */}
      </div>
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-90%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-neutral-900">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <h1 className="pl-5 text-4xl text-quicksand text-main md:text-5xl lg:text-6xl whitespace-nowrap">
          Our Services
        </h1>
        <motion.div style={{ x }} className="flex gap-20">
          {cards.map((card) => {
            return <Cardss card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Cardss = ({ card }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      key={card.id}
      className={`h-auto w-96 rounded shadow-xl bg-gradient-to-br p-7 from-yellow to-darkOrange transition duration-100 hover:shadow-main hover:from-main hover:to-yellow hover:text-white`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardBody>
        <div className="mb-4">
          {/* Conditional icon color based on hover state */}
          <GrTechnology
            size={35}
            className={`${isHovered ? 'text-yellow' : 'black'} cursor-pointer`}
          />
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

export default Example;

const cards = [
  {
    url: Img,
    title: "Title 1",
    id: 1,
    body: 'This is some text within a card body. It provides brief information about the content of the card.',
  },
  {
    url: Img,
    title: "Title 2",
    id: 2,
    body: 'This is some text within a card body. It provides brief information about the content of the card.',
  },
  {
    url: Img,
    title: "Title 3",
    id: 3,
    body: 'This is some text within a card body. It provides brief information about the content of the card.',
  },
  {
    url: Img,
    title: "Title 4",
    id: 4,
    body: 'This is some text within a card body. It provides brief information about the content of the card.',
  },
];
