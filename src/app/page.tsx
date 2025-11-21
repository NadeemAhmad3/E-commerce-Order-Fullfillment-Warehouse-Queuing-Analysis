// app/page.tsx
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <main className="bg-[#0a1929] min-h-screen">
      <Navbar />
      <HeroSection />
    </main>
  );
}
