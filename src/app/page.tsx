// app/page.tsx
import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Features from './components/Features';
import About from './components/About';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main className="bg-[#0a1929] min-h-screen">
      <Navbar />
      <HeroSection />
      <Features />
      <About />
      <Team />
      <Contact/>
      <Footer/>
    </main>
  );
}
