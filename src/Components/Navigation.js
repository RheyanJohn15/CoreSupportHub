'use client';

import React, { useState, useEffect, useRef  } from "react";
import { FiArrowRight, FiBarChart2, FiChevronDown, FiHome, FiPieChart } from "react-icons/fi";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import Logo from "../../public/logo/hor_logo2.png";
import String from "@/Strings/english";
import Image from "next/image";
import Contact from "@/Components/Button";
import Link from "next/link";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";

import { BiChip, BiBulb, BiHeadphone   } from "react-icons/bi";
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
      <div className={`hidden md:flex fixed top-0 left-0 right-0 transition-all duration-200 ease-in-out w-screen justify-between px-20 text-white z-20 ${scrollBg ? 'bg-main/20 backdrop-blur-lg' : ''}`}>
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

      <div className="flex md:hidden fixed top-0 left-0 right-0 w-full z-20 justify-between backdrop-blur bg-main/25">
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
      id={`shift-tab-${tab.id}`}
      onMouseEnter={() => handleSetSelected(tab.id)}
      className={`flex cursor-pointers text-xl items-center gap-1 rounded-full px-3 py-1.5 text-sm transition-colors ${selected ? 'bg-neutral-800 text-main' : 'text-white'}`}
    >
      <span>{tab.title}</span>
      <FiChevronDown className={`transition-transform ${selected ? 'rotate-180' : ''}`} />
      
    </div>
  );
};


const Content = ({ selectedTab }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsVisible(true); // Ensure content is visible when selectedTab changes
  }, [selectedTab]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
         id={`overlay-content-${selectedTab.id}`}
          ref={contentRef}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="fixed w-[90vw] backdrop-blur-lg z-20 bg-white/5 left-12 top-[13vh] rounded-lg border p-4"
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

const Bridge = () => <div className="absolute-top-[24px] left-0 right-0 h-[24px]" />;

const Nub = ({ selected }) => {
  const [left, setLeft] = useState(0);

  useEffect(() => {
    if (selected) {
      const hoveredTab = document.getElementById(`shift-tab-${selected.id}`);
      const overlayContent = document.getElementById(`overlay-content-${selected.id}`);

      if (!hoveredTab || !overlayContent) return;
      const tabRect = hoveredTab.getBoundingClientRect();
      const contentRect = overlayContent.getBoundingClientRect();
      const tabCenter = tabRect.left + tabRect.width / 2 - contentRect.left;
      setLeft(tabCenter);
    }
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
      <Link href={'/'} className="text-main text-xl mb-4 flex items-center gap-1 hover:underline"><span>Our Services</span> <FiArrowRight /></Link>
      <div className="grid grid-cols-3 gap-4 divide-x">
        <div className="flex-col pl-4"> 
          <h3 className="mb-2 text-2xl font-medium">{String.Services.Tech}</h3>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
         <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
         </svg>
         {String.Services.TechUl.t1}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          {String.Services.TechUl.t2}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
          </svg>
          {String.Services.TechUl.t3}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
          </svg>
          {String.Services.TechUl.t4}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
          </svg>
          {String.Services.TechUl.t5}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
          </svg>
          {String.Services.TechUl.t6}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          {String.Services.TechUl.t7}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
          {String.Services.TechUl.t8}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z" />
          </svg>{String.Services.TechUl.t9}
          </Link>
        </div>
        <div  className="flex-col pl-4">
          <h3 className="mb-2 text-2xl font-medium">{String.Services.BPO}</h3>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
          </svg>
          {String.Services.BPOUl.b1}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
          </svg>{String.Services.BPOUl.b2}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
          </svg>
          {String.Services.BPOUl.b3}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          {String.Services.BPOUl.b4}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z" />
          </svg>
            {String.Services.BPOUl.b5}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
          </svg>
          {String.Services.BPOUl.b6}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          {String.Services.BPOUl.b7}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
          </svg>
          {String.Services.BPOUl.b8}
          </Link>
        </div>
        <div  className="flex-col pl-4">
          <h3 className="mb-2 text-2xl font-medium">{String.Services.Cons}</h3>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
          </svg>
          {String.Services.ConsUl.c1}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
          </svg>
          {String.Services.ConsUl.c2}
          </Link>
          <Link href="#" className="mb-1 flex gap-2 text-base text-white hover:text-main">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          {String.Services.ConsUl.c3}
          </Link>
        </div>
      </div>
    
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
      className="fixed top-20 right-0 bottom-0 w-full z-20 md:hidden h-screen backdrop-blur bg-main/25"
      initial={false}
      animate={active ? "open" : "closed"}
      variants={variants}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <AccordionCustomIcon />
    </motion.div>
  );
};

NavDrawer.displayName = "NavDrawer";
function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-90" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
}

const AccordionCustomIcon = () => {
  const [openParent, setOpenParent] = React.useState(0);
  const [openNested, setOpenNested] = React.useState(0);

  const handleOpenParent = (value) => setOpenParent(openParent === value ? 0 : value);
  const handleOpenNested = (value) => setOpenNested(openNested === value ? 0 : value);

  return (
    <div className="text-white p-8">
      <Accordion open={openParent === 1} icon={<Icon id={1} open={openParent} />}>
        <AccordionHeader onClick={() => handleOpenParent(1)}>{String.Nav.s}</AccordionHeader>
        <AccordionBody className="p-0">
          <Accordion className="w-[83%] ml-4" open={openNested === 1} icon={<Icon id={1} open={openNested} />}>
            <AccordionHeader onClick={() => handleOpenNested(1)}><BiChip />{String.Services.Tech}</AccordionHeader>
            <AccordionBody className="flex flex-col gap-2 p-0">
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t1}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t2}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t3}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t4}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t5}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t6}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t7}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t8}</Link>
              <Link href="" className="text-base hover:text-dark hover:text-xl"> {String.Services.TechUl.t9}</Link>
            </AccordionBody>
          </Accordion>
          <Accordion className="w-[83%] ml-4" open={openNested === 2} icon={<Icon id={2} open={openNested} />}>
            <AccordionHeader onClick={() => handleOpenNested(2)}> <BiHeadphone  /> {String.Services.BPO}</AccordionHeader>
            <AccordionBody className="flex flex-col gap-2 p-0">
              <Link href="" className="text-base"> {String.Services.BPOUl.b1}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b2}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b3}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b4}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b5}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b6}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b7}</Link>
              <Link href="" className="text-base"> {String.Services.BPOUl.b8}</Link>
            </AccordionBody>
          </Accordion>
          <Accordion className="w-[83%] ml-4" open={openNested === 3} icon={<Icon id={3} open={openNested} />}>
            <AccordionHeader onClick={() => handleOpenNested(3)}><BiBulb />{String.Services.Cons}</AccordionHeader>
            <AccordionBody className="flex flex-col gap-2 p-0">
              <Link href="" className="text-base"> {String.Services.ConsUl.c1}</Link>
              <Link href="" className="text-base"> {String.Services.ConsUl.c2}</Link>
              <Link href="" className="text-base"> {String.Services.ConsUl.c3}</Link>
            </AccordionBody>
          </Accordion>
        </AccordionBody>
      </Accordion>

      <Accordion open={openParent === 2} icon={<Icon id={2} open={openParent} />}>
        <AccordionHeader onClick={() => handleOpenParent(2)}>
          How to use Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          <Accordion open={openNested === 4} icon={<Icon id={4} open={openNested} />}>
            <AccordionHeader onClick={() => handleOpenNested(4)}>Nested Accordion</AccordionHeader>
            <AccordionBody>
              This is a nested accordion inside the second accordion.
            </AccordionBody>
          </Accordion>
        </AccordionBody>
      </Accordion>

      <Accordion open={openParent === 3} icon={<Icon id={3} open={openParent} />}>
        <AccordionHeader onClick={() => handleOpenParent(3)}>
          What can I do with Material Tailwind?
        </AccordionHeader>
        <AccordionBody>
          <Accordion open={openNested === 5} icon={<Icon id={5} open={openNested} />}>
            <AccordionHeader onClick={() => handleOpenNested(5)}>Nested Accordion</AccordionHeader>
            <AccordionBody>
              This is a nested accordion inside the third accordion.
            </AccordionBody>
          </Accordion>
        </AccordionBody>
      </Accordion>
    </div>
  );
}

//#endregion

export default Navigation;
