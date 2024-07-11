'use client';

import Navigation from '@/Components/Navigation';
import dynamic from 'next/dynamic';

const Background = dynamic(() => import('@/Components/Background'), { ssr: false });

export default function Home() {
  return (
  <>
  <Background />
  <Navigation />

    </>
  );
}
