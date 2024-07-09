'use client';
import Link from 'next/link';
import Image from 'next/image'
import Logo from '../../public/logo.png';
import Buttons from '@/components/Button';
import Strings from '@/strings/primary';
export default function Header(){
    return(
  <header className='flex justify-between p-4'>
    <div className='px-4 w-100'>
    <Image
      src={Logo}
      width={130}
      height={130}
      alt="Logo"
    />
    </div>
     <nav className='w-full flex gap-4 items-center text-light text-xl justify-end'>
         <Link href="/pallettes">{Strings.Nav.home}</Link>
         <Link href="/pallettes">{Strings.Nav.service}</Link>
         <Link href="/pallettes">{Strings.Nav.industries}</Link>
         <Link href="/pallettes">{Strings.Nav.learn}</Link>
         <Buttons text={Strings.Nav.contact} />
       </nav>
  </header>
    );
}