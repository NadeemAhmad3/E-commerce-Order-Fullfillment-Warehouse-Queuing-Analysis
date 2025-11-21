// components/HeroSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { BarChart3, Activity, TrendingUp, Network, ChevronRight } from 'lucide-react';

const HeroSection = () => {
  const [activeMetric, setActiveMetric] = useState(0);

  const metrics = [
    { label: 'Order Accuracy', value: '99.2%', icon: BarChart3 },
    { label: 'Avg Processing', value: '12min', icon: Activity },
    { label: 'SLA Compliance', value: '94.8%', icon: TrendingUp }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % metrics.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="h-screen w-full flex items-center bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929] relative overflow-hidden pt-20">
      {/* Subtle Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Main Content - Reduced left padding, balanced grid */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Side - Tighter, Cleaner */}
          <div className="space-y-7 max-w-lg">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              <span className="text-white block">Transform Your</span>
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent block">Warehouse</span>
              <span className="text-white block">Operations</span>
            </h1>

            <p className="text-base md:text-lg text-gray-400 leading-relaxed">
              Advanced stochastic modeling framework for e-commerce fulfillment centers. Predict, optimize, and dominate your order fulfillment pipeline.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-7 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2">
                <span>Explore Framework</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-7 py-3.5 bg-white/5 border border-white/10 text-white rounded-lg font-medium hover:bg-white/10 hover:border-orange-500/50 transition-all">
                View Documentation
              </button>
            </div>

            {/* Compact Metrics */}
            <div className="grid grid-cols-3 gap-4">
              {metrics.map((metric, i) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border transition-all ${
                      activeMetric === i 
                        ? 'bg-orange-500/10 border-orange-500/40 shadow-sm' 
                        : 'bg-white/5 border-white/10'
                    }`}
                    onMouseEnter={() => setActiveMetric(i)}
                  >
                    <Icon className={`w-6 h-6 mx-auto mb-2 ${activeMetric === i ? 'text-orange-400' : 'text-gray-500'}`} />
                    <p className="text-xl font-bold text-white text-center">{metric.value}</p>
                    <p className="text-xs text-gray-500 text-center mt-1">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Slightly Larger & Better Proportioned */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xl">
              {/* Main Dashboard Card - Increased Size */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-7 shadow-2xl">
                <div className="flex justify-between items-center mb-5 pb-3 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white">Live Order Flow</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-400">Active</span>
                  </div>
                </div>

                <div className="space-y-5">
                  {['Order Queue', 'Picking', 'Packing', 'Shipping'].map((stage) => (
                    <div key={stage}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-gray-300">{stage}</span>
                        <span className="text-gray-500">{Math.floor(Math.random() * 18 + 10)} orders</span>
                      </div>
                      <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-1000"
                          style={{ width: `${58 + Math.random() * 32}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Network className="w-24 h-24 mx-auto text-orange-500/25" />
                  <p className="text-3xl font-bold text-white mt-3">5,600+</p>
                  <p className="text-sm text-gray-400">Orders Analyzed Today</p>
                </div>
              </div>

              {/* Floating Cards - Balanced Size */}
              <div className="absolute -top-5 -right-5 w-40 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-2xl border border-orange-500/30 p-4 shadow-xl">
                <BarChart3 className="w-8 h-8 text-orange-400 mb-2" />
                <p className="text-sm font-medium text-gray-200">Predictive Analytics</p>
                <p className="text-xs text-gray-500">ML-powered</p>
              </div>

              <div className="absolute -bottom-5 -left-5 w-40 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl border border-blue-500/30 p-4 shadow-xl">
                <Activity className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-sm font-medium text-gray-200">Real-time Monitoring</p>
                <p className="text-xs text-gray-500">Live tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
