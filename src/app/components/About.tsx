// components/About.tsx
'use client';

import React from 'react';
import { Boxes, BarChart3, Timer, Activity, GitBranch, Sparkles, ChevronRight } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="relative py-32 bg-gradient-to-b from-[#0a1929] via-[#0d2137] to-[#0a1929] overflow-hidden">
      {/* Animated Background Blobs - Matching the rest of the site */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold tracking-wider">Research-Backed Framework</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Real-World Stochastic Modeling</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              For Modern E-commerce Fulfillment
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-5xl mx-auto leading-relaxed">
            A comprehensive mathematical framework built on <strong>28 days of live warehouse data</strong> — 
            analyzing over <strong>5,600 real customer orders</strong> to deliver proven, data-driven operational excellence.
          </p>
        </div>

        {/* Core Mission Card */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white">
              From Chaos to Predictive Control
            </h3>
            <p className="text-lg text-gray-300 leading-relaxed">
              Traditional deterministic models fail in the face of real-world randomness — variable order arrivals, 
              fluctuating processing times, staffing uncertainties, and unpredictable delays. 
              <strong> StochFlow</strong> replaces guesswork with rigorous stochastic science.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              This isn’t simulation. This is <strong>mathematical truth</strong> extracted from your actual operations — 
              turning raw timestamps, fulfillment logs, and service transitions into actionable intelligence.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                <Timer className="w-10 h-10 text-orange-400 mb-3" />
                <p className="text-3xl font-bold text-white">28</p>
                <p className="text-sm text-gray-400">Days of Continuous Data</p>
              </div>
              <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl">
                <Boxes className="w-10 h-10 text-orange-400 mb-3" />
                <p className="text-3xl font-bold text-white">5,600+</p>
                <p className="text-sm text-gray-400">Orders Analyzed</p>
              </div>
            </div>
          </div>

          {/* Visual Pipeline */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              <h4 className="text-xl font-bold text-white mb-8 text-center">Stochastic Fulfillment Pipeline</h4>
              <div className="space-y-8">
                {[
                  { icon: Activity, label: 'Order Arrival', desc: 'Poisson Process Modeling', color: 'from-orange-500 to-orange-600' },
                  { icon: BarChart3, label: 'Picking & Packing', desc: 'Exponential Service Times', color: 'from-orange-500 to-amber-600' },
                  { icon: GitBranch, label: 'Queue States', desc: 'Continuous-Time Markov Chains', color: 'from-orange-600 to-red-600' },
                  { icon: Timer, label: 'SLA Compliance', desc: 'CDF-Based Delay Prediction', color: 'from-orange-500 to-pink-600' },
                ].map((stage, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${stage.color} p-3 flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform`}>
                      <stage.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-white">{stage.label}</h5>
                      <p className="text-sm text-gray-400">{stage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Key Outcomes Grid */}
        <div className="mb-20">
          <h3 className="text-4xl font-bold text-center text-white mb-12">
            What This Framework Delivers
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Accurate Delay Forecasting',
                desc: 'Predict order delay probability using real distributions — not averages.',
                icon: Timer,
              },
              {
                title: 'Optimal Staffing Levels',
                desc: 'M/M/c queue analysis reveals exact worker requirements per shift.',
                icon: Activity,
              },
              {
                title: 'SLA Compliance Optimization',
                desc: 'Set realistic thresholds backed by cumulative distribution functions.',
                icon: BarChart3,
              },
            ].map((outcome, i) => (
              <div
                key={i}
                className="group p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:bg-white/10 hover:border-orange-500/40 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-3 mb-6 shadow-xl group-hover:scale-110 transition-transform">
                  <outcome.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{outcome.title}</h4>
                <p className="text-gray-300 leading-relaxed">{outcome.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-block p-12 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-3xl backdrop-blur-xl max-w-5xl">
            <h3 className="text-4xl font-bold text-white mb-6">
              Ready to Move Beyond Averages?
            </h3>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join the new era of warehouse operations — where probability drives performance, 
              and every decision is backed by mathematical certainty.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="#features"
                className="group px-10 py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all inline-flex items-center justify-center gap-3"
              >
                <Boxes className="w-6 h-6" />
                <span>Explore the Five CLOs</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </a>

              <a
                href="/Stoch_Report.pdf"
                target="_blank"
                className="px-10 py-5 bg-white/5 border border-white/20 text-white rounded-xl font-medium hover:bg-white/10 hover:border-orange-500/50 transition-all"
              >
                Download Complete Research Paper
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;