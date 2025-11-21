// app/clo1/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Calculator, 
  Hash, 
  Layers, 
  Brain, 
  ChevronRight, 
  Sparkles, 
  Copy, 
  Check,
  Package
} from 'lucide-react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export default function CLO1Page() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('introduction');
  const [copied, setCopied] = useState<string | null>(null);

  // Real data from your report
  const totalOrders = 5600;
  const delayed = 840;
  const multiItem = 2240;
  const returned = 280;
  const delayedAndMulti = 336;
  const delayedAndReturned = 112;
  const multiAndReturned = 168;
  const allThree = 56;

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const sections = [
    { id: 'introduction', label: 'Introduction', icon: Sparkles },
    { id: 'counting', label: 'Counting Principles', icon: Hash },
    { id: 'permutations', label: 'Permutations', icon: Calculator },
    { id: 'combinations', label: 'Combinations', icon: Layers },
    { id: 'set-theory', label: 'Set Theory & Events', icon: Layers },
    { id: 'probability', label: 'Basic Probability', icon: Brain },
    { id: 'conditional', label: 'Conditional Probability', icon: Brain },
    { id: 'total-probability', label: 'Law of Total Probability', icon: Calculator },
    { id: 'bayes', label: "Bayes' Theorem", icon: Brain },
    { id: 'independence', label: 'Independence Testing', icon: Check },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections.slice().reverse()) {
        const el = document.getElementById(section.id);
        if (el && scrollPos >= el.offsetTop - 100) {
          setActiveSection(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929]">
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 text-gray-400 hover:text-orange-400 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3 px-5 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
              <Package className="w-5 h-5 text-orange-400" />
              <span className="text-orange-400 font-bold">CLO 1</span>
            </div>
            <h1 className="text-xl font-bold text-white hidden md:block">
              Foundational Mathematics
            </h1>
          </div>

          <a
            href="/clo2"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/20 rounded-xl hover:bg-white/10 hover:border-orange-500/50 transition-all"
          >
            <span className="text-sm font-medium">Next: CLO 2</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>
      </nav>

      <div className="flex pt-20">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-20 bottom-0 w-80 bg-[#0a1929]/80 backdrop-blur-xl border-r border-white/10 overflow-y-auto hidden lg:block">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-8">CLO 1 Contents</h2>
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all ${
                      activeSection === section.id
                        ? 'bg-orange-500/10 border border-orange-500/40 text-orange-400 shadow-lg shadow-orange-500/20'
                        : 'text-gray-400 hover:bg-white/5 hover:text-orange-400 border border-transparent'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-80 px-6 md:px-10 lg:px-20 py-10">
          <div className="max-w-5xl mx-auto space-y-24">

            {/* Introduction */}
            <section id="introduction" className="scroll-mt-32">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-orange-500/10 border border-orange-500/30 rounded-full mb-8">
                  <Package className="w-6 h-6 text-orange-400" />
                  <span className="text-xl font-bold text-orange-400">CLO 1: Foundational Mathematics</span>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                  Counting • Sets • Probability • Bayes • Independence
                </h1>
                <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Applied to <strong className="text-orange-400">5,600 real warehouse orders</strong> over 28 days
                </p>
              </div>
            </section>

            {/* Counting Principles */}
            <section id="counting" className="scroll-mt-32">
              <h2 className="text-4xl font-bold text-white mb-10">Counting Principles</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-orange-400 mb-6">Multiplication Rule</h3>
                  <BlockMath math="n_1 \times n_2 \times \cdots \times n_k" />
                  <p className="text-gray-300 mt-6 text-lg">3 zones × 4 stations × 2 carriers = <strong className="text-orange-400">24 unique paths</strong></p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-orange-400 mb-6">Addition Rule</h3>
                  <BlockMath math="n_1 + n_2 \quad (\text{mutually exclusive})" />
                  <p className="text-gray-300 mt-6 text-lg">Express OR Standard shipping</p>
                </div>
              </div>
            </section>

            {/* Permutations & Combinations */}
            <section id="combinations" className="scroll-mt-32">
              <h2 className="text-4xl font-bold text-white mb-10">Permutations & Combinations</h2>
              <div className="space-y-8">
                <div className="p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/40 rounded-3xl">
                  <h3 className="text-2xl font-bold text-white mb-4">Picking Sequence (5 items)</h3>
                  <BlockMath math="P(5,5) = 5! = 120" />
                  <p className="text-gray-300 mt-4">120 possible sequences → affects travel time</p>
                </div>
                <div className="p-8 bg-white/5 border border-white/10 rounded-3xl">
                  <h3 className="text-2xl font-bold text-orange-400 mb-4">Team Assignment</h3>
                  <BlockMath math="C(8,3) = \binom{8}{3} = 56 \text{ possible teams}" />
                </div>
              </div>
            </section>

            {/* Set Theory + Real Data */}
            <section id="set-theory" className="scroll-mt-32">
              <h2 className="text-4xl font-bold text-white mb-10">Set Theory & Inclusion-Exclusion</h2>
              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-orange-400 mb-8">Real Warehouse Events (5,600 Orders)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  <div className="p-6 bg-orange-500/10 border border-orange-500/30 rounded-2xl text-center">
                    <p className="text-4xl font-bold text-white">840</p>
                    <p className="text-gray-400">Delayed</p>
                  </div>
                  <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl text-center">
                    <p className="text-4xl font-bold text-white">2,240</p>
                    <p className="text-gray-400">Multi-item</p>
                  </div>
                  <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-center">
                    <p className="text-4xl font-bold text-white">280</p>
                    <p className="text-gray-400">Returned</p>
                  </div>
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-2xl text-center">
                    <p className="text-4xl font-bold text-white">56</p>
                    <p className="text-gray-400">All Three</p>
                  </div>
                </div>
                <div className="p-8 bg-black/40 rounded-2xl">
                  <BlockMath math="|D \cup M| = 840 + 2240 - 336 = 2744" />
                  <p className="text-3xl font-bold text-orange-400 mt-6">49% of orders are delayed OR multi-item</p>
                </div>
              </div>
            </section>

            {/* Bayes' Theorem */}
            <section id="bayes" className="scroll-mt-32">
              <h2 className="text-4xl font-bold text-white mb-10">Bayes' Theorem — Night Shift Insight</h2>
              <div className="p-10 bg-gradient-to-br from-orange-600/20 to-red-600/10 border border-orange-500/50 rounded-3xl">
                <BlockMath math="P(N|D) = \frac{P(D|N) \cdot P(N)}{P(D)} = \frac{0.25 \times 0.25}{0.1445} \approx 0.4326" />
                <div className="mt-8 text-center">
                  <p className="text-6xl font-bold text-orange-400">43.26%</p>
                  <p className="text-2xl text-gray-200 mt-4">of delayed orders came from night shift</p>
                  <p className="text-lg text-gray-400 mt-2">(despite only 25% of total volume)</p>
                </div>
                <div className="mt-8 p-6 bg-red-500/20 border border-red-500/50 rounded-2xl text-center">
                  <p className="text-xl font-bold text-red-400">Night shift needs immediate training & supervision</p>
                </div>
              </div>
            </section>

            {/* Independence */}
            <section id="independence" className="scroll-mt-32">
              <h2 className="text-4xl font-bold text-white mb-10">Independence Testing</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-8 bg-green-500/10 border border-green-500/40 rounded-3xl text-center">
                  <h3 className="text-2xl font-bold text-green-400 mb-4">Delay vs Multi-item</h3>
                  <BlockMath math="P(D|M) = 0.15 \approx P(D)" />
                  <p className="text-2xl font-bold text-white mt-6">Independent</p>
                </div>
                <div className="p-8 bg-red-500/10 border border-red-500/40 rounded-3xl text-center">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">Delay vs Return</h3>
                  <BlockMath math="P(R|D) = 0.1333 \gg P(R) = 0.05" />
                  <p className="text-2xl font-bold text-white mt-6">Strongly Dependent</p>
                  <p className="text-orange-400 text-lg">2.67× more returns</p>
                </div>
              </div>
            </section>

            {/* Final CTA */}
            <section className="text-center py-20">
              <h2 className="text-4xl font-bold text-white mb-8">Ready for Random Variables?</h2>
              <a
                href="/clo2"
                className="inline-flex items-center gap-4 px-10 py-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xl font-bold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
              >
                <span>Continue to CLO 2 → Random Variable Classification</span>
                <ChevronRight className="w-8 h-8" />
              </a>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
