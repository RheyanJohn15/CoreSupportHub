'use client';

import Navigation from '@/Components/Navigation';
import dynamic from 'next/dynamic';
import LandingBlock from '@/Components/LandingBlock';
import String from '@/Strings/english';
import Services from '@/Components/Services';
import Tools from '@/Components/Tools';
const Background = dynamic(() => import('@/Components/Background'), { ssr: false });

export default function Home() {
  return (
  <>
  <Background />
  <Navigation />
  <LandingBlock />
  <Services />
  <Tools />
    </>
  );
}
