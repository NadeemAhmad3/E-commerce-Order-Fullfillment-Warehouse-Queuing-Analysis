// components/Contact.tsx
'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Sparkles, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app: send to Formspree, EmailJS, etc.
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section id="contact" className="relative py-32 bg-gradient-to-b from-[#0a1929] via-[#0d2137] to-[#0a1929] overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 lg:px-12">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Sparkles className="w-5 h-5 text-orange-400" />
            <span className="text-orange-400 font-semibold tracking-wider">Get in Touch</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-white">Have Questions About </span>
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Stochastic Modeling?
            </span>
          </h2>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
            Whether you're a researcher, warehouse manager, or student — we’re here to help you 
            understand and apply advanced fulfillment analytics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="relative">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-16">
                  <CheckCircle className="w-20 h-20 text-orange-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-400">We’ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-8">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/60 focus:outline-none transition-all"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email"
                        required
                        className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/60 focus:outline-none transition-all"
                      />
                    </div>

                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject (e.g. Research Collaboration, Implementation Help)"
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/60 focus:outline-none transition-all"
                    />

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Your message..."
                      required
                      className="w-full px-5 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-orange-500/60 focus:outline-none transition-all resize-none"
                    />

                    <button
                      type="submit"
                      className="group w-full py-5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-3"
                    >
                      <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

          {/* Contact Info + Team Links */}
          <div className="space-y-10">
            {/* Direct Contact */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
              <h3 className="text-2xl font-bold text-white mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-3 flex-shrink-0">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email Us</p>
                    <a href="mailto:team@stochflow.dev" className="text-lg text-white hover:text-orange-400 transition-colors">
                      team@stochflow.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-3 flex-shrink-0">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-lg text-white">National University of Computer & Emerging Sciences<br />FAST-NUCES, Islamabad Campus</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Team Links */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10">
              <h3 className="text-2xl font-bold text-white mb-8">Connect with the Team</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { name: 'Nadeem Ahmad', github: 'https://github.com/NadeemAhmad3' },
                  { name: 'Iman Fatima', github: 'https://github.com/ImanFatima3715' },
                  { name: 'Bisam Ahmad', github: 'https://github.com/Bisam-27' },
                  { name: 'Hamdan Ahmad', github: 'https://github.com/HamdanxSE' },
                  { name: 'Ayesha Naseer', github: 'https://github.com/Ayesha-Naseer13' },
                ].map((member) => (
                  <a
                    key={member.name}
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-orange-500/40 transition-all"
                  >
                    <Github className="w-8 h-8 text-gray-400 group-hover:text-orange-400 transition-colors" />
                    <div>
                      <p className="text-sm font-medium text-white">{member.name.split(' ')[0]}</p>
                      <p className="text-xs text-gray-500">GitHub →</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Project Repo */}
            <a
              href="https://github.com/NadeemAhmad3/E-commerce-Order-Fullfillment-Warehouse-Queuing-Analysis" // Change if you have a main repo
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-8 bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/40 rounded-3xl hover:border-orange-500/60 transition-all group text-center"
            >
              <Github className="w-12 h-12 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <p className="text-xl font-bold text-white">View Project on GitHub</p>
              <p className="text-gray-400 mt-2">Source code • Documentation • Research Paper</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;