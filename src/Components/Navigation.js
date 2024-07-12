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
     <header className="w-screen items-center flex px-12 shadow-lg justify-between fixed backdrop-blur-md">
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
     <MenuButton className="inline-flex w-full justify-center gap-x-1.5  text-white shadow-sm">
          {String.Nav.s}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
      </MenuButton>
      
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-8 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Account settings
            </a>
          </MenuItem>
        </div>
      </MenuItems>
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