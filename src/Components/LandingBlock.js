'use client';

import String from '@/Strings/english';
import Image from 'next/image';
import Logo from '../../public/logo/logo2.png';
const LandingBlock = () => {
   return (
     <main className="w-full h-screen flex flex-col justify-center items-center">
     <div className="flex flex-col justify-end items-center w-full h-1/2">
     <Image src={Logo} alt='Logo' width={100} />
     <h1 className='text-6xl font-semibold mb-8 text-main'>{String.App}</h1>
     </div>
      <div className='flex flex-col justify-start items-center w-full h-1/2'> <h1 className='text-4xl mt-8 text-white'>{String.Tag1}</h1></div>
     </main>
   );
}
export default LandingBlock;