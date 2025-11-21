// components/Team.tsx
'use client';

import React, { useState } from 'react';
import { Github, Linkedin, Mail, Award, Code, Brain, ChevronRight } from 'lucide-react';

const Team = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Architect',
      specialty: 'Stochastic Modeling',
      avatar: 'SC',
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      achievements: ['PhD Operations Research', '15+ Years Experience', '50+ Published Papers'],
      skills: ['Queue Theory', 'Probability', 'Optimization']
    },
    {
      name: 'Michael Rodriguez',
      role: 'ML Engineer',
      specialty: 'Predictive Analytics',
      avatar: 'MR',
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      achievements: ['ML Specialist', 'AWS Certified', 'Data Science Lead'],
      skills: ['Deep Learning', 'TensorFlow', 'Python']
    },
    {
      name: 'Emily Watson',
      role: 'System Architect',
      specialty: 'Infrastructure Design',
      avatar: 'EW',
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      achievements: ['Cloud Architecture', 'Scalability Expert', 'DevOps Master'],
      skills: ['Kubernetes', 'Microservices', 'System Design']
    },
    {
      name: 'David Kim',
      role: 'Data Scientist',
      specialty: 'Business Intelligence',
      avatar: 'DK',
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      achievements: ['Analytics Expert', 'Visualization Pro', 'SQL Master'],
      skills: ['Statistical Analysis', 'R', 'Tableau']
    },
    {
      name: 'Alexandra Patel',
      role: 'Product Manager',
      specialty: 'Strategy & Vision',
      avatar: 'AP',
      gradient: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-500/10',
      achievements: ['Product Strategy', 'Agile Leader', 'UX Champion'],
      skills: ['Roadmapping', 'Stakeholder Management', 'Market Analysis']
    }
  ];

  return (
    <section id="team" className="relative py-24 bg-gradient-to-b from-[#0a1929] to-[#0d2137] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
            <Award className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">World-Class Team</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold">
            <span className="text-white">Meet the </span>
            <span className="bg-gradient-to-r from-orange-400 to-purple-600 bg-clip-text text-transparent">Experts</span>
          </h2>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A diverse team of specialists bringing together decades of experience in operations research, 
            machine learning, and enterprise system architecture
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => {
            const isHovered = hoveredMember === index;
            
            return (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border transition-all duration-500 ${
                  isHovered 
                    ? `${member.bgColor} border-white/20 shadow-2xl scale-105` 
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
                onMouseEnter={() => setHoveredMember(index)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className={`relative w-24 h-24 rounded-2xl bg-gradient-to-br ${member.gradient} p-0.5 mb-4 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                    <div className="w-full h-full bg-[#0a1929] rounded-2xl flex items-center justify-center">
                      <span className="text-2xl font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                        {member.avatar}
                      </span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className={`text-sm font-medium mb-1 transition-all ${
                    isHovered ? 'text-orange-400' : 'text-gray-400'
                  }`}>
                    {member.role}
                  </p>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full">
                    <Brain className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{member.specialty}</span>
                  </div>
                </div>

                {/* Achievements */}
                <div className="space-y-3 mb-6">
                  {member.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <Award className="w-4 h-4 text-orange-400 flex-shrink-0" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {member.skills.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:border-white/20 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-center gap-3 pt-6 border-t border-white/10">
                  {[
                    { icon: Github, label: 'GitHub' },
                    { icon: Linkedin, label: 'LinkedIn' },
                    { icon: Mail, label: 'Email' }
                  ].map((social, i) => {
                    const SocialIcon = social.icon;
                    return (
                      <button
                        key={i}
                        className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-orange-500/30 transition-all group/btn"
                        aria-label={social.label}
                      >
                        <SocialIcon className="w-4 h-4 text-gray-400 group-hover/btn:text-orange-400 transition-colors" />
                      </button>
                    );
                  })}
                </div>

                {/* Hover Glow */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${member.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`}></div>
              </div>
            );
          })}
        </div>

        {/* Join Team CTA */}
        <div className="p-10 bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/20 rounded-3xl backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white mb-2">Join Our Team</h3>
              <p className="text-gray-400">We're always looking for talented individuals passionate about optimization and innovation</p>
            </div>
            
            <button className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all inline-flex items-center gap-3 whitespace-nowrap">
              <Code className="w-5 h-5" />
              <span>View Open Positions</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;