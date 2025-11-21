import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

export default function Home() {
  return (
    <main className="bg-[#0a1929]">
      <Navbar />
      <HeroSection />
      {/* Add more sections here later */}
      {/* <FeaturesSection /> */}
      {/* <AboutSection /> */}
      {/* <TeamSection /> */}
      {/* <Footer /> */}
    </main>
  );
}
