'use client';

import Navigation from '@/Components/Navigation';
import dynamic from 'next/dynamic';
import LandingBlock from '@/Components/LandingBlock';
const Background = dynamic(() => import('@/Components/Background'), { ssr: false });

export default function Home() {
  return (
  <>
  <Background />
  <Navigation />
  <LandingBlock />
    </>
  );
}
