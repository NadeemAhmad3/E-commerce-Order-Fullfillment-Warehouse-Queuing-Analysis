// components/Footer.tsx
'use client';

import React from 'react';
import { Github, Mail, Boxes, Sparkles, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a1929] border-t border-white/10">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-5 group cursor-pointer" onClick={scrollToTop}>
              <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 p-2 shadow-lg">
                <div className="absolute inset-0 bg-white/20 rounded-lg"></div>
                <Boxes className="w-7 h-7 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  StochFlow
                </h1>
                <p className="text-xs text-gray-400 -mt-1">Warehouse Analytics</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              A research-backed stochastic modeling framework built on 28 days of real warehouse data 
              to optimize e-commerce order fulfillment.
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © 2025 StochFlow. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Learning Outcomes', href: '#features' },
                { label: 'Team', href: '#team' },
                { label: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="/Stoch_Report.pdf" target="_blank" className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group">
                  <Sparkles className="w-4 h-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Full Research Paper (PDF)
                </a>
              </li>
              <li>
                <a href="https://github.com/NadeemAhmad3/E-commerce-Order-Fullfillment-Warehouse-Queuing-Analysis" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group">
                  <Github className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="mailto:team@nadeemahmad2703@gmail.com" className="text-gray-400 hover:text-orange-400 transition-colors text-sm flex items-center gap-2 group">
                  <Mail className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  team@stochflow.dev
                </a>
              </li>
            </ul>
          </div>

          {/* University & Back to Top */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-white mb-5">Developed At</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              National University of Computer<br />
              & Emerging Sciences (FAST-NUCES)<br />
              Islamabad Campus, Pakistan
            </p>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="mt-8 group w-full py-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-orange-500/40 transition-all flex items-center justify-center gap-3"
            >
              <ChevronUp className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
              <span className="text-sm font-medium text-gray-400 group-hover:text-orange-400">
                Back to Top
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            Built with passion by Nadeem Ahmad, Iman Fatima, Bisam Ahmad, Hamdan Ahmad & Ayesha Naseer
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/NadeemAhmad3/E-commerce-Order-Fullfillment-Warehouse-Queuing-Analysis" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-orange-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="mailto:team@nadeemahmad2703@gmail.com" className="text-gray-500 hover:text-orange-400 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
