'use client';
import Image from "next/image";
import Logo from "../../public/logo/hor_logo2.png";
import String from "@/Strings/english";
import Link from "next/link";
import Contact from '@/Components/Button';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const Navigation = () => {
    return (
     <header className="w-full items-center flex justify-between fixed backdrop-blur">
       <div className="p-4">
       <Image
          src={Logo}
          alt={String.Img.Logo}
          height={50}
        />
       </div>
   
   <Menu as="div" className="flex gap-20">
     <Link className="text-white" href="/">{String.Nav.h}</Link>
     <Link className="text-white" href="/">
     <MenuButton className="inline-flex w-full justify-center gap-x-1.5 text-sm text-white shadow-sm">
          {String.Nav.s}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
     </Link>
     <Link className="text-white" href="/">{String.Nav.i}</Link>
     <Link className="text-white" href="/">{String.Nav.l}</Link>
     <Link className="text-white" href="/">{String.Nav.a}</Link>
   </Menu>

  <div className="p-4">
  <Contact text={String.Nav.g} onclick={null} />
  </div>
     </header>
    );
}

export default Navigation;