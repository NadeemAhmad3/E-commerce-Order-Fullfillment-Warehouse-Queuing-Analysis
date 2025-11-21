// app/clo1/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Package, Activity, TrendingUp, Clock } from 'lucide-react';

export default function CLO1Page() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-12 h-20 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full">
            <Package className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-orange-400 font-medium">CLO 1: Order Processing Engine</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 md:px-10 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 mb-6">
              <Package className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                CLO 1: Order Processing Engine
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Advanced stochastic modeling for inter-arrival times and order processing 
              with exponential distributions and queue theory implementation
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Activity, label: 'Processing Speed', value: '12 min', color: 'orange' },
              { icon: TrendingUp, label: 'Accuracy Rate', value: '99.2%', color: 'blue' },
              { icon: Clock, label: 'Queue Time', value: '8 min', color: 'purple' },
              { icon: Package, label: 'Daily Orders', value: '5.6K+', color: 'green' }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div 
                  key={index}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all"
                >
                  <Icon className="w-8 h-8 text-orange-400 mb-4" />
                  <p className="text-3xl font-bold text-white mb-2">{metric.value}</p>
                  <p className="text-sm text-gray-400">{metric.label}</p>
                </div>
              );
            })}
          </div>

          {/* Content */}
          <div className="p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">Coming Soon</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              The CLO 1 Order Processing Engine module is currently under development. 
              This comprehensive learning outcome will cover exponential distribution modeling, 
              queue theory implementation, and real-time order flow optimization.
            </p>
            
            <div className="mt-8 p-6 bg-orange-500/10 border border-orange-500/20 rounded-xl">
              <p className="text-orange-400 font-medium">
                📊 This module will include interactive simulations, detailed analytics, 
                and hands-on exercises for mastering warehouse order processing optimization.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
