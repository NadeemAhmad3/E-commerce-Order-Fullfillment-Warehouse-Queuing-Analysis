// components/Team.tsx
'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, GraduationCap, Brain, Code2, ChevronRight, Sparkles } from 'lucide-react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers = [
    {
      name: 'Nadeem Ahmad',
      role: 'Project Lead & Stochastic Architect',
      specialty: 'Advanced Queueing Theory & Markov Models',
      initials: 'NA',
      focus: 'M/M/c Systems, CTMC Design, SLA Optimization',
      achievements: ['Led 4-Week Warehouse Data Analysis', 'Developed Full Stochastic Framework', 'Authored Core Mathematical Models'],
      skills: ['Markov Chains', 'Queueing Theory', 'Probability', 'Python', 'LaTeX'],
      github: 'https://github.com/NadeemAhmad3',
      linkedin: '#',
      email: 'nadeemahmad2703@gmail.com'
    },
    {
      name: 'Bisam Ahmad',
      role: 'Probability & Distribution Specialist',
      specialty: 'Random Variables & Statistical Inference',
      initials: 'BA',
      focus: 'PMF/PDF Analysis, Moment Calculations, Distribution Fitting',
      achievements: ['CLO 2 & 3 Lead Author', 'Identified Key Distributions', 'Built SLA Compliance Models'],
      skills: ['Statistical Modeling', 'Hypothesis Testing', 'R', 'Data Visualization'],
      github: 'https://github.com/Bisam-27',
      linkedin: '#',
      email: 'f223723@cfd.nu.edu.pk'
    },
    {
      name: 'Iman Fatima',
      role: 'Time Series & Autocorrelation Analyst',
      specialty: 'Seasonality Detection & Forecasting',
      initials: 'IF',
      focus: 'ACF Analysis, Shift Patterns, Order Rate Modeling',
      achievements: ['Discovered Night Shift Delay Root Cause', 'CLO 4 Framework Designer', 'Peak Hour Prediction Models'],
      skills: ['Time Series Analysis', 'ACF/PACF', 'Seasonality', 'Python Pandas'],
      github: 'https://github.com/ImanFatima3715',
      linkedin: '#',
      email: 'f223715@cfd.nu.edu.pk'
    },
    {
      name: 'Hamdan Ahmad',
      role: 'Combinatorics & Foundational Theorist',
      specialty: 'Counting Methods & Set Theory Applications',
      initials: 'HA',
      focus: 'Inclusion-Exclusion, Bayes’ Theorem, Event Probability',
      achievements: ['CLO 1 Lead Developer', 'Applied Bayes to Shift Diagnostics', 'Independence Testing Framework'],
      skills: ['Combinatorics', 'Set Theory', 'Conditional Probability', 'Mathematical Proofs'],
      github: 'https://github.com/HamdanxSE',
      linkedin: '#',
      email: 'f223678@cfd.nu.edu.pk'
    },
    {
      name: 'Ayesha Naseer',
      role: 'Data Engineer & Report Architect',
      specialty: 'Real-World Data Integration & Visualization',
      initials: 'AN',
      focus: '28-Day Data Pipeline, Performance Metrics, Final Report Design',
      achievements: ['Built Complete Data Collection Framework', '5,600+ Orders Processed', 'Designed Interactive Report Structure'],
      skills: ['Data Engineering', 'SQL', 'Visualization', 'Report Automation'],
      github: 'https://github.com/Ayesha-Naseer13',
      linkedin: '#',
      email: 'f223672@cfd.nu.edu.pk'
    },
  ];

  return (
    <section id="team" className="relative py-28 bg-gradient-to-b from-[#0a1929] via-[#0d2137] to-[#0a1929] overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <GraduationCap className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold tracking-wider">Research & Development Team</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Meet the </span>
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Minds Behind StochFlow
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            A dedicated team of researchers and analysts who transformed 4 weeks of raw warehouse data 
            into a comprehensive stochastic modeling framework for modern e-commerce fulfillment.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {teamMembers.map((member, index) => {
            const isHovered = hoveredMember === index;

            return (
              <div
                key={index}
                className={`group relative p-8 rounded-3xl border backdrop-blur-xl transition-all duration-500
                  ${isHovered 
                    ? 'bg-white/10 border-orange-500/40 shadow-2xl shadow-orange-500/20 scale-[1.02] translate-y-[-8px]' 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                {/* Avatar */}
                <div className="flex flex-col items-center mb-7">
                  <div className={`relative w-28 h-28 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 p-1 mb-5 transition-transform duration-500 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                    <div className="w-full h-full bg-[#0a1929] rounded-3xl flex items-center justify-center border-2 border-orange-500/50">
                      <span className="text-3xl font-bold text-white">{member.initials}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-orange-400 font-semibold text-sm tracking-wide">{member.role}</p>
                  <div className="flex items-center gap-2 mt-3 px-4 py-2 bg-white/5 border border-orange-500/30 rounded-full">
                    <Brain className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-gray-300 font-medium">{member.specialty}</span>
                  </div>
                </div>

                {/* Focus */}
                <div className="text-center mb-6">
                  <p className="text-sm text-gray-400 leading-relaxed italic">"{member.focus}"</p>
                </div>

                {/* Achievements */}
                <div className="space-y-3 mb-6">
                  {member.achievements.map((ach, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm">
                      <Sparkles className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {member.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:border-orange-500/40 hover:text-orange-400 transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links - Real URLs */}
                <div className="flex justify-center gap-4 pt-6 border-t border-white/10">
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                  >
                    <Github className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                  </a>
                  <a 
                    href={member.linkedin} 
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                  >
                    <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                  </a>
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500/10 hover:border-orange-500/40 transition-all group"
                  >
                    <Mail className="w-5 h-5 text-gray-400 group-hover:text-orange-400 transition-colors" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="inline-block p-10 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-3xl backdrop-blur-xl">
            <h3 className="text-3xl font-bold text-white mb-4">
              Built with Academic Rigor & Real-World Impact
            </h3>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              This framework isn't just theory — it's the result of meticulous analysis of <strong>5,600+ real orders</strong> 
              across 28 days, delivering <strong>actionable insights</strong> for warehouse optimization.
            </p>
            <div className="mt-8">
              <button className="group px-9 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all inline-flex items-center gap-3">
                <Code2 className="w-6 h-6" />
                <span>Explore the Full Research</span>
                <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;

