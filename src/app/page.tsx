// app/page.tsx
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';

import Team from './components/Team';


export default function Home() {
  return (
    <main className="bg-[#0a1929] min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <Team />
    </main>
  );
}
