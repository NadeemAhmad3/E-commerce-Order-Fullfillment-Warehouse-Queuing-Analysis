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
    <div className="relative min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929] overflow-hidden">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-orange-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content Section */}
          <div className="space-y-8">
            
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20 rounded-full">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-orange-400 font-medium">Stochastic Modeling Excellence</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="text-white">Transform Your</span>
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
                  Warehouse
                </span>
                <br />
                <span className="text-white">Operations</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-xl">
                Advanced stochastic modeling framework for e-commerce fulfillment centers. Predict, optimize, and dominate your order fulfillment pipeline.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2">
                <span>Explore Framework</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/5 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/10 hover:bg-white/10 hover:border-orange-500/50 transition-all">
                View Documentation
              </button>
            </div>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      activeMetric === index
                        ? 'bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/30'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                    onMouseEnter={() => setActiveMetric(index)}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${activeMetric === index ? 'text-orange-400' : 'text-gray-400'}`} />
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Visualization */}
          <div className="relative">
            <div className="relative w-full h-[600px]">
              
              {/* Main Container */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                <div className="space-y-6">
                  
                  {/* Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <h3 className="text-lg font-semibold text-white">Live Order Flow</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-400">Active</span>
                    </div>
                  </div>

                  {/* Flow Stages */}
                  {['Order Queue', 'Picking', 'Packing', 'Shipping'].map((stage, index) => (
                    <div key={stage} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-300 font-medium">{stage}</span>
                        <span className="text-xs text-gray-500">{Math.floor(Math.random() * 20 + 10)} orders</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000"
                          style={{
                            width: `${Math.random() * 40 + 50}%`,
                            animation: `pulse 2s ease-in-out infinite ${index * 0.3}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}

                  {/* Network Graph */}
                  <div className="pt-6 mt-6 border-t border-white/10">
                    <div className="relative h-48 flex items-center justify-center">
                      <Network className="w-32 h-32 text-orange-500/30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-4xl font-bold text-white">5,600</p>
                          <p className="text-sm text-gray-400 mt-1">Orders Analyzed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Card 1 */}
              <div className="absolute -top-6 -right-6 w-48 h-32 bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-lg rounded-2xl border border-orange-500/30 p-4 shadow-xl">
                <BarChart3 className="w-8 h-8 text-orange-400 mb-2" />
                <p className="text-sm text-gray-300 font-medium">Predictive Analytics</p>
                <p className="text-xs text-gray-500 mt-1">ML-powered forecasting</p>
              </div>

              {/* Floating Card 2 */}
              <div className="absolute -bottom-6 -left-6 w-48 h-32 bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-lg rounded-2xl border border-blue-500/30 p-4 shadow-xl">
                <Activity className="w-8 h-8 text-blue-400 mb-2" />
                <p className="text-sm text-gray-300 font-medium">Real-time Monitoring</p>
                <p className="text-xs text-gray-500 mt-1">Live performance tracking</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;