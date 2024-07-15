'use client';

import React, { useState, useEffect, useRef  } from "react";
import { FiArrowRight, FiBarChart2, FiChevronDown, FiHome, FiPieChart } from "react-icons/fi";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Logo from "../../public/logo/hor_logo2.png";
import String from "@/Strings/english";
import Image from "next/image";
import Contact from "@/Components/Button";
import Link from "next/link";
//#region Render Navigation
const Navigation = () => {
  const [drawerState, setDrawerState] = useState({ active: false, count: 0 });
  const [scrollBg, setScrollBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrollBg(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleToggle = () => {
    setDrawerState((prev) => ({ active: !prev.active, count: prev.count + 1 }));
  };

  return (
    <>
      <div className={`hidden md:flex fixed top-0 left-0 right-0 w-screen justify-between px-20 text-white z-20 ${scrollBg ? 'bg-main/20 backdrop-blur-lg' : ''}`}>
        <Link href="/" className="p-4">
          <Image src={Logo} alt={String.Img.Logo} height={60} />
        </Link>
        <div className="flex justify-center items-center">
          <Tabs />
        </div>
        <div className="p-4">
          <Contact text={String.Nav.g} onclick={null} />
        </div>
      </div>

      <div className="flex md:hidden fixed top-0 left-0 right-0 w-screen z-20 justify-between backdrop-blur bg-main/25">
        <Link href="/" className="p-1">
          <Image src={Logo} alt={String.Img.Logo} height={70} />
        </Link>
        <AnimatedHamburgerButton active={drawerState.active} onClick={handleToggle} />
      </div>
      <NavDrawer active={drawerState.active} count={drawerState.count} />
    </>
  );
};

Navigation.displayName = "Navigation";
//#endregion

//#region Desktop Navigation
const Tabs = () => {
  const [selected, setSelected] = useState(null);

  const handleSetSelected = (tabId) => {
    setSelected(tabId === selected ? null : tabId);
  };

  return (
    <div className="relative flex h-fit gap-10">
      {TABS.map((tab) => (
        <Tab
          key={tab.id}
          tab={tab}
          selected={selected === tab.id}
          handleSetSelected={handleSetSelected}
        />
      ))}
      <AnimatePresence>
        {selected && (
          <Content
            key={selected}
            selectedTab={TABS.find((tab) => tab.id === selected)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const Tab = ({ tab, selected, handleSetSelected }) => {
  return (
    <div
      onMouseEnter={() => handleSetSelected(tab.id)}
      className={`flex cursor-pointer text-xl items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${selected ? 'bg-neutral-800 text-main' : 'text-white'}`}
    >
      <span>{tab.title}</span>
      <FiChevronDown className={`transition-transform ${selected ? 'rotate-180' : ''}`} />
      
    </div>
  );
};

const Content = ({selectedTab }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true); // Ensure content is visible when selectedTab changes
  }, [selectedTab]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="absolute w-full backdrop-blur-lg bg-white/5 left-0 top-[calc(100%_+_24px)] w-96 rounded-lg border border-neutral-600 bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-800 p-4"
        >
      <Bridge />
      <Nub selected={selectedTab} />
          <div className="overflow-hidden">
            {selectedTab && <selectedTab.Component />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
Content.displayName = "Content";

const Bridge = () => <div className="absolute-top-[24px] left-0 right-0 h-[24px]" />;

Bridge.displayName = "Bridge";

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    const moveNub = () => {
      if (selected) {

        const hoveredTab = document.getElementById(`shift-tab-${selected}`);
        const overlayContent = document.getElementById("overlay-content");

        if (!hoveredTab || !overlayContent) return;

        const tabRect = hoveredTab.getBoundingClientRect();
        const contentRect = overlayContent.getBoundingClientRect();
        const tabCenter = tabRect.left + tabRect.width / 2 - contentRect.left;
        console.log(tabRect.width);
        setLeft(tabCenter);
      }
    };

    moveNub();
  }, [selected]);

  return (
    <motion.span
      style={{
        clipPath: "polygon(0 0, 100% 0, 50% 50%, 0% 100%)",
      }}
      animate={{ left }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl border border-neutral-600 bg-neutral-900"
    />
  );
};

Nub.displayName = "Nub";

const Services = () => {
  return (
    <div>
      <div className="flex justify-between ">
        <div>
          <h3 className="mb-2 text-sm font-medium">{String.Services.Tech}</h3>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t1}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t2}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t3}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t4}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t5}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t6}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t7}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t8}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.TechUl.t9}
          </Link>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{String.Services.BPO}</h3>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b1}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b2}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b3}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b4}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b5}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b6}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b7}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.BPOUl.b8}
          </Link>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">{String.Services.Cons}</h3>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.ConsUl.c1}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.ConsUl.c2}
          </Link>
          <Link href="#" className="mb-1 block text-sm text-white hover:text-main">
            {String.Services.ConsUl.c3}
          </Link>
        </div>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm hover:text-main">
        <span>View all services</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

Services.displayName = "Services";

const Industries = () => {
  return (
    <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
      <a href="#" className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50">
        <FiHome className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Startup</span>
      </a>
      <a href="#" className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50">
        <FiBarChart2 className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Scaleup</span>
      </a>
      <a href="#" className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50">
        <FiPieChart className="mb-2 text-xl text-indigo-300" />
        <span className="text-xs">Enterprise</span>
      </a>
    </div>
  );
};

Industries.displayName = "Industries";

const LearnMore = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <a href="#">
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.</p>
        </a>
        <a href="#">
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.</p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-2">
        <a href="#">
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.</p>
        </a>
        <a href="#">
          <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
          <p className="text-xs text-neutral-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo quidem eos.</p>
        </a>
      </div>
      <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
        <span>View more</span>
        <FiArrowRight />
      </button>
    </div>
  );
};

LearnMore.displayName = "LearnMore";

const TABS = [
  {
    title: String.Nav.s,
    Component: Services,
  },
  {
    title: String.Nav.i,
    Component: Industries,
  },
  {
    title: String.Nav.l,
    Component: LearnMore,
  },
  {
    title: String.Nav.a,
    Component: About,
  },
].map((n, idx) => ({ ...n, id: idx + 1 }));
//#endregion

//#region Mobile Navigation
const AnimatedHamburgerButton = ({ active, onClick }) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={onClick}
        className="relative h-20 w-20 rounded-full bg-white/0 transition-colors hover:bg-white/20"
      >
        <motion.span
          variants={VARIANTS.top}
          className="absolute h-1 w-10 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className="absolute h-1 w-10 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className="absolute h-1 w-5 bg-white"
          style={{
            x: "-50%",
            y: "50%",
            bottom: "35%",
            left: "calc(50% + 10px)",
          }}
        />
      </motion.button>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};

const NavDrawer = ({ active }) => {
  const variants = {
    open: { x: 0 },
    closed: { x: "100%" },
  };
  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 w-screen md:hidden h-screen backdrop-blur bg-main/25"
      initial={false}
      animate={active ? "open" : "closed"}
      variants={variants}
      transition={{ type: "spring", stiffness: 100 }}
    >
      {/* Add drawer content here */}
    </motion.div>
  );
};

NavDrawer.displayName = "NavDrawer";
//#endregion

export default Navigation;
