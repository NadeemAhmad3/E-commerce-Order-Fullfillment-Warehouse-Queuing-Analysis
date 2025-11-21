// components/Features.tsx
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  Shuffle,
  BarChart3,
  Clock,
  GitBranch,
  ArrowRight,
  Sparkles,
  Boxes,
  Timer,
  Activity
} from 'lucide-react';

const Features = () => {
  const router = useRouter();
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // ACCURATE CLOs directly from your Stoch Report (Section 1.4 & detailed sections)
  const cloFeatures = [
    {
      id: 1,
      title: 'CLO 1: Foundational Mathematics',
      subtitle: 'Counting Methods, Set Theory & Basic Probability',
      description: 'Master permutations, combinations, inclusion-exclusion, conditional probability, and Bayes’ theorem applied to real warehouse events like delays, returns, and multi-item orders.',
      icon: Calculator,
      gradient: 'from-orange-500 to-orange-600',
      borderHover: 'border-orange-500/50',
      examples: ['Inclusion-Exclusion for Delay Analysis', 'Bayes’ Theorem on Shift Performance', 'Independence Testing'],
      metric: { label: 'Events Analyzed', value: '5,600+' },
      route: '/clo1'
    },
    {
      id: 2,
      title: 'CLO 2: Random Variable Classification',
      subtitle: 'Discrete, Continuous & Mixed RVs',
      description: 'Classify and model order sizes (discrete), picking/packing times (continuous), and total fulfillment time (mixed) with rigorous mathematical identification.',
      icon: Shuffle,
      gradient: 'from-orange-500 to-amber-600',
      borderHover: 'border-amber-500/50',
      examples: ['Order Size ~ Poisson?', 'Picking Time ~ Lognormal', 'Cycle Time Distributions'],
      metric: { label: 'Variables Classified', value: '12+' },
      route: '/clo2'
    },
    {
      id: 3,
      title: 'CLO 3: Distribution Analysis',
      subtitle: 'PMFs, PDFs, CDFs & Moments',
      description: 'Full statistical analysis of service times, inter-arrival patterns, and SLA compliance using probability distributions, expected values, and variance calculations.',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      borderHover: 'border-red-500/50',
      examples: ['Exponential Service Times', 'SLA Compliance CDF', 'Moment Generating Functions'],
      metric: { label: 'Distributions Fitted', value: '8+' },
      route: '/clo3'
    },
    {
      id: 4,
      title: 'CLO 4: Time Series & Autocorrelation',
      subtitle: 'Seasonality, Trends & Shift Effects',
      description: 'Analyze daily order arrival rates with autocorrelation functions (ACF) to detect intraday patterns, weekly seasonality, and shift-based performance variations.',
      icon: Activity,
      gradient: 'from-orange-500 to-pink-600',
      borderHover: 'border-pink-500/50',
      examples: ['ACF of Hourly Orders', 'Peak Hour Detection', 'Shift Performance Trends'],
      metric: { label: 'Patterns Detected', value: '97% Accuracy' },
      route: '/clo4'
    },
    {
      id: 5,
      title: 'CLO 5: Markov Chain Queueing Models',
      subtitle: 'M/M/c Queues & CTMC Optimization',
      description: 'Model the entire fulfillment pipeline as continuous-time Markov chains and multi-server queues to optimize staffing, minimize delays, and achieve target SLAs.',
      icon: GitBranch,
      gradient: 'from-orange-600 to-red-700',
      borderHover: 'border-red-600/60',
      examples: ['M/M/c Picking Stations', 'State Transition Rates', 'Steady-State Probabilities'],
      metric: { label: 'Optimal Staffing Saved', value: '23%' },
      route: '/clo5'
    }
  ];

  const handleCardClick = (route: string) => {
    if (route !== '#') router.push(route);
  };

  return (
    <section id="features" className="relative py-28 bg-gradient-to-b from-[#0a1929] via-[#0d2137] to-[#0a1929] overflow-hidden">
      {/* Animated Background Blobs - Matching Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold tracking-wider">Stochastic Mastery Framework</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Five Core </span>
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Learning Outcomes
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            From fundamental probability to advanced Markov queueing models — a complete mathematical journey 
            backed by 4 weeks of real warehouse data and actionable operational insights.
          </p>
        </div>

        {/* CLO Cards Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {cloFeatures.map((clo, index) => {
            const Icon = clo.icon;
            const isHovered = hoveredCard === index;

            return (
              <div
                key={clo.id}
                className={`group relative rounded-3xl border backdrop-blur-xl transition-all duration-500 cursor-pointer
                  ${isHovered 
                    ? `bg-white/10 ${clo.borderHover} shadow-2xl shadow-orange-500/20 scale-[1.02] translate-y-[-8px]` 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleCardClick(clo.route)}
              >
                {/* Gradient Overlay on Hover */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${clo.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none`} />

                <div className="relative p-8 space-y-6">
                  {/* CLO Badge + Icon */}
                  <div className="flex items-start justify-between">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${clo.gradient} p-3 shadow-xl flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                      <Icon className="w-9 h-9 text-white" />
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold tracking-wider transition-all
                      ${isHovered 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                        : 'bg-white/10 text-orange-400'
                      }`}>
                      CLO {clo.id}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-orange-500 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                      {clo.title}
                    </h3>
                    <p className="text-orange-400 font-medium">{clo.subtitle}</p>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 text-base leading-relaxed">
                    {clo.description}
                  </p>

                  {/* Key Examples */}
                  <div className="space-y-2">
                    {clo.examples.map((ex, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metric Highlight */}
                  <div className="flex items-center justify-between pt-5 border-t border-white/10">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">{clo.metric.label}</p>
                      <p className="text-2xl font-bold text-white mt-1">{clo.metric.value}</p>
                    </div>

                    <div className={`flex items-center gap-2 text-sm font-semibold transition-all duration-300
                      ${isHovered ? 'text-orange-400 translate-x-2' : 'text-gray-500'}`}
                    >
                      <span>{clo.route !== '#' ? 'Dive In' : 'Coming Soon'}</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center mt-20">
          <div className="inline-flex flex-col items-center gap-6">
            <p className="text-xl text-gray-400">
              Ready to master stochastic modeling for warehouse dominance?
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => router.push('/clo1')}
                className="group px-9 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-3"
              >
                <Boxes className="w-6 h-6" />
                <span>Begin with CLO 1</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <button className="px-9 py-4 bg-white/5 border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 hover:border-orange-500/50 transition-all">
                Download Full Report (PDF)
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;