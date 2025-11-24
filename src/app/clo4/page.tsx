"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Activity, TrendingUp, Brain, Zap, Clock, Shield, Target, RefreshCw, Check, ChevronLeft } from 'lucide-react';

const MathDisplay = ({ children, block = false }: { children: React.ReactNode; block?: boolean }) => {
  const style: React.CSSProperties = block ? { display: 'block', textAlign: 'center', margin: '1.2rem 0', fontSize: '1.05rem' } : { display: 'inline' };
  return <span style={style} className="text-gray-100 font-mono">{children}</span>;
};

export default function CLO4Page() {
  const [activeSection, setActiveSection] = useState('intro');

  // 5.2 Part A: ACF Parameters
  const [acf, setAcf] = useState({
    rho7: 0.91,
    rho1: 0.42,
    mean: 200,
    sigma: 30
  });

  // 5.3 Part B: Behavioral Parameters
  const [behavior, setBehavior] = useState({
    scarcity: true, // true = scarcity signal shown
    pActionScarcity: 0.8,
    pActionAbundance: 0.3,
    churnThreshold: 0.7
  });

  // 5.4 Conclusion: RL System
  const [systemState, setSystemState] = useState({
    queueLength: 0, // L_q
    controlVector: 0 // U_t
  });

  // RL Logic Simulation
  useEffect(() => {
    // Simple simulation of the RL recommendation
    if (systemState.queueLength < 20) {
      setSystemState(prev => ({ ...prev, controlVector: 100 })); // Maximize U_t
    } else if (systemState.queueLength > 80) {
      setSystemState(prev => ({ ...prev, controlVector: 0 })); // Minimize U_t
    } else {
      setSystemState(prev => ({ ...prev, controlVector: 50 })); // Balanced
    }
  }, [systemState.queueLength]);

  const sections = [
    { id: 'intro', label: 'Introduction', icon: Activity },
    { id: 'defense', label: '5.2 Part A: The Defense', icon: Shield },
    { id: 'offense', label: '5.3 Part B: The Offense', icon: Target },
    { id: 'conclusion', label: 'Conclusion: Feedback Loop', icon: RefreshCw },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { threshold: 0.3 });
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl ${className}`}>
      {children}
    </div>
  );

  const Input = ({ label, value, onChange, max = 1, step = 0.01 }: { label: string; value: number; onChange: (v: number) => void; max?: number; step?: number }) => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        max={max}
        step={step}
        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </a>
          <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Clock className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold">CLO 4</span>
          </div>
          <a href="/clo3" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back to CLO 3</span>
          </a>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="fixed left-0 top-16 bottom-0 w-64 bg-[#0a1929]/50 backdrop-blur-xl border-r border-white/10 overflow-y-auto hidden lg:block">
          <div className="p-4">
            <h3 className="text-sm font-bold text-white mb-3">Contents</h3>
            <nav className="space-y-1">
              {sections.map(s => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition text-xs ${
                      activeSection === s.id
                        ? 'bg-orange-500/10 border border-orange-500/30 text-orange-400'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{s.label}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 px-6 md:px-10 py-10">
          <div className="max-w-4xl mx-auto space-y-16">

            {/* Introduction */}
            <section id="intro" className="scroll-mt-20 text-center space-y-4">
              <h1 className="text-4xl font-bold text-white">CLO 4: Time Series Analysis & Behavioral Stochasticity</h1>
              <p className="text-lg text-gray-300">Dynamic Stochastic Systems • Autocorrelation • Algorithmic Nudging</p>
              <p className="text-gray-400">Coupling <span className="text-orange-400 font-bold">Physical Supply</span> with <span className="text-blue-400 font-bold">Psychological Demand</span></p>
            </section>

            {/* 5.1 Introduction Text */}
            <Card className="bg-white/5 border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">5.1 Introduction to Stochastic Processes in Fulfillment</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                As outlined in the Abstract, this research aims to model the "real-world warehouse fulfillment center" as a dynamic stochastic system. While CLO 1-3 analyzed static snapshots of probability, CLO 4 introduces the dimension of Time (t).
                <br /><br />
                We analyze the operational data as a discrete-time stochastic process <MathDisplay>{`{X_t, t ∈ T}`}</MathDisplay>, where <MathDisplay>X_t</MathDisplay> represents the order volume at time t. However, in modern e-commerce, this process is coupled with a secondary stochastic process: the behavior of the user on the platform. This section analyzes the correlation between Physical Supply (Warehouse Operations) and Psychological Demand (Algorithmic Nudging).
              </p>
            </Card>

            {/* 5.2 Part A: The Defense */}
            <section id="defense" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">5.2 Part A: The Defense – Warehouse Time Series</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">5.2.1 Mathematical Model: Autocorrelation Function (ACF)</h3>
                <p className="text-gray-300 text-sm mb-4">
                  To quantify "seasonality / shift effects", we utilize the Autocorrelation Function. This measures the linear dependence between order volume on day t and day t+k.
                </p>
                <div className="p-3 bg-black/30 rounded-lg text-center">
                  <MathDisplay block>{`ρ_k = Var(X_t)Cov(X_t, X_{t+k}) = σ^2 E[(X_t - μ)(X_{t+k} - μ)]`}</MathDisplay>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Lag-7 Seasonality */}
                <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                  <h3 className="text-lg font-bold text-purple-400 mb-3">Lag-7 Seasonality (k=7)</h3>
                  <div className="mb-4">
                    <Input 
                      label="Autocorrelation (ρ₇)" 
                      value={acf.rho7} 
                      onChange={(v) => setAcf({...acf, rho7: v})}
                      max={1}
                    />
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg mb-3">
                    <p className="text-xs text-gray-400">Operational Finding:</p>
                    <MathDisplay block>{`ρ_7 ≈ ${acf.rho7}`}</MathDisplay>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    <strong>Interpretation:</strong> Strong, rigid weekly cycle. Monday volume predicts next Monday's volume.
                  </p>
                  <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <p className="text-xs text-purple-300 font-bold">Recommendation: Static Cyclic Roster</p>
                    <p className="text-xs text-gray-400 mt-1">Staffing must mirror the correlation curve (Peak: Mon, Dip: Sun).</p>
                  </div>
                </Card>

                {/* Lag-1 Persistence */}
                <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                  <h3 className="text-lg font-bold text-orange-400 mb-3">Lag-1 Persistence (k=1)</h3>
                  <div className="mb-4">
                    <Input 
                      label="Autocorrelation (ρ₁)" 
                      value={acf.rho1} 
                      onChange={(v) => setAcf({...acf, rho1: v})}
                      max={1}
                    />
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg mb-3">
                    <p className="text-xs text-gray-400">Operational Finding:</p>
                    <MathDisplay block>{`ρ_1 ≈ ${acf.rho1}`}</MathDisplay>
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    <strong>Interpretation:</strong> "Backlog Ripple." High volume today implies high volume tomorrow. Unclear queues create positive feedback loops.
                  </p>
                  <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                    <p className="text-xs text-orange-300 font-bold">Recommendation: Dynamic Overtime Triggers</p>
                    <p className="text-xs text-gray-400 mt-1">
                      If <MathDisplay>{`X_t > μ + σ`}</MathDisplay>, extend shift to break correlation (<MathDisplay>{`ρ_1 → 0`}</MathDisplay>).
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* 5.3 Part B: The Offense */}
            <section id="offense" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">5.3 Part B: The Offense – Algorithmic Behavioral Engineering</h2>
              </div>

              <Card className="bg-white/5 border-white/10">
                <p className="text-gray-300 text-sm">
                  Consistent with the Abstract's focus on "stochastic phenomena," we observe that major e-commerce platforms do not wait for random arrivals; they manufacture them. We apply mathematical frameworks to the user interface.
                </p>
              </Card>

              {/* 5.3.1 TIM Model */}
              <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">5.3.1 Temporal Interaction Model (Poisson Process)</h3>
                <p className="text-xs text-gray-400 mb-2">Reference: Ji et al. (TIM Model) & Pepelyshev et al.</p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-gray-300"><strong>Variable Definition (λ(t)):</strong> Intensity function representing probability of user opening app at time t.</p>
                  </div>
                  
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-gray-300 mb-2"><strong>Optimization (Survival Analysis):</strong></p>
                    <MathDisplay block>{`P(Churn) = 1 - S(t)`}</MathDisplay>
                    <p className="text-xs text-gray-400 mt-2">where S(t) is the survival function.</p>
                  </div>

                  <div className="p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <p className="text-sm text-green-300 font-bold">Application: Push Notification Trigger</p>
                    <p className="text-xs text-gray-400 mt-1">
                      When P(Churn) approaches critical threshold, trigger notification to reset Poisson arrival rate and smooth demand.
                    </p>
                  </div>
                </div>
              </Card>

              {/* 5.3.2 Scarcity Theory */}
              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-3">5.3.2 Binomial Distribution & Scarcity Theory</h3>
                <p className="text-xs text-gray-400 mb-2">Reference: Zhang et al. (S-O-R Theory) & Cengiz/Şenel</p>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Physical Reality (Continuous):</p>
                    <MathDisplay block>{`Inventory N ∈ [0, ∞)`}</MathDisplay>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Displayed Reality (Binary):</p>
                    <MathDisplay block>{`Scarcity Signal B ∈ {0, 1}`}</MathDisplay>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-black/40 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-300">Simulate Scarcity Signal:</span>
                    <button 
                      onClick={() => setBehavior({...behavior, scarcity: !behavior.scarcity})}
                      className={`px-3 py-1 rounded text-xs font-bold transition ${behavior.scarcity ? 'bg-red-500 text-white' : 'bg-gray-600 text-gray-300'}`}
                    >
                      {behavior.scarcity ? "SIGNAL ACTIVE" : "NO SIGNAL"}
                    </button>
                  </div>
                  
                  <MathDisplay block>
                    {behavior.scarcity 
                      ? `P(Action | Scarcity) > P(Action | Abundance)` 
                      : `P(Action | Abundance) < P(Action | Scarcity)`}
                  </MathDisplay>
                  
                  <div className="mt-3 text-center">
                    <p className="text-2xl font-bold text-white">
                      {behavior.scarcity ? `${(behavior.pActionScarcity * 100).toFixed(0)}%` : `${(behavior.pActionAbundance * 100).toFixed(0)}%`}
                    </p>
                    <p className="text-xs text-gray-400">Probability of Impulse Buy</p>
                  </div>
                </div>

                <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <p className="text-sm text-red-300 font-bold">Application: S-O-R Framework</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Stimulus (Badge) → Organism (FOMO) → Response (Impulse Buy). Keeps warehouse queue (L_q) active.
                  </p>
                </div>
              </Card>
            </section>

            {/* Conclusion */}
            <section id="conclusion" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">Conclusion: The Algorithmic Feedback Loop</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-white mb-3">Synthesis of Comprehensive Mathematical Framework</h3>
                <p className="text-gray-300 text-sm mb-4">
                  This report proves that "stochastic modeling of fulfillment operations" is a Coupled System. The Warehouse and User are linked by a Machine Learning feedback loop optimizing Lifetime Value (LTV).
                </p>

                <div className="space-y-3 mb-6">
                  <h4 className="text-sm font-bold text-blue-400">C1: The Mathematical Unification</h4>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="p-3 bg-black/30 rounded-lg text-center">
                      <p className="text-xs text-gray-400 mb-1">State Vector (S_t)</p>
                      <p className="text-sm text-white">User Profile</p>
                      <p className="text-xs text-gray-500">(Spend μ, Addiction λ)</p>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg text-center">
                      <p className="text-xs text-gray-400 mb-1">Control Vector (U_t)</p>
                      <p className="text-sm text-white">Triggers</p>
                      <p className="text-xs text-gray-500">(Nudges, Scarcity)</p>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg text-center">
                      <p className="text-xs text-gray-400 mb-1">System State (X_t)</p>
                      <p className="text-sm text-white">Warehouse Capacity</p>
                      <p className="text-xs text-gray-500">(Queue Length)</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-purple-400">C2: Final Operational Recommendation (Reinforcement Learning)</h4>
                  
                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-300">Simulate Warehouse Queue (L_q):</span>
                      <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={systemState.queueLength} 
                        onChange={(e) => setSystemState({...systemState, queueLength: Number(e.target.value)})}
                        className="w-1/2 accent-orange-500"
                      />
                      <span className="text-sm font-bold text-white">{systemState.queueLength} orders</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex-1 p-3 bg-white/5 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-1">System Action (U_t)</p>
                        <p className={`text-lg font-bold ${systemState.controlVector > 50 ? 'text-green-400' : 'text-red-400'}`}>
                          {systemState.controlVector > 80 ? "MAXIMIZE NUDGES" : systemState.controlVector < 20 ? "MINIMIZE NUDGES" : "BALANCED"}
                        </p>
                      </div>
                      <ArrowLeft className={`w-6 h-6 text-gray-500 transition-transform duration-500 ${systemState.controlVector > 50 ? 'rotate-180' : ''}`} />
                      <div className="flex-1 p-3 bg-white/5 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-1">Objective</p>
                        <p className="text-sm text-white">
                          {systemState.controlVector > 80 ? "Generate Demand" : systemState.controlVector < 20 ? "Prevent SLA Breach" : "Maintain Flow"}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400 italic text-center mt-4">
                    "E-commerce is not just moving boxes; it is the stochastic engineering of human desire to match logistical capacity."
                  </p>
                </div>
              </Card>
            </section>

            {/* Final Footer */}
            <section className="text-center py-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">Project Complete</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white">Analysis Concluded</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                You have successfully navigated through the stochastic modeling of warehouse operations, from foundational mathematics to advanced behavioral engineering.
              </p>
              
              <div className="flex justify-center gap-4">
                <a href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all">
                  <ArrowLeft className="w-6 h-6" />
                  <span>Return Home</span>
                </a>
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
