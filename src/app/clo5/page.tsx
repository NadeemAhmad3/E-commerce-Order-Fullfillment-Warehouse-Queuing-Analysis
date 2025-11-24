"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Activity, GitGraph, Clock, Users, TrendingUp, AlertTriangle, Check, ChevronLeft, Network, Timer } from 'lucide-react';

const MathDisplay = ({ children, block = false }: { children: React.ReactNode; block?: boolean }) => {
  const style: React.CSSProperties = block ? { display: 'block', textAlign: 'center', margin: '1.2rem 0', fontSize: '1.05rem' } : { display: 'inline' };
  return <span style={style} className="text-gray-100 font-mono">{children}</span>;
};

const factorial = (n: number): number => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

export default function CLO5Page() {
  const [activeSection, setActiveSection] = useState('intro');

  // M/M/c Calculator State
  const [mmc, setMmc] = useState({
    lambda: 45, // Arrival rate (orders/hour)
    mu: 20,     // Service rate (orders/server/hour)
    c: 3        // Number of servers
  });

  const [results, setResults] = useState({
    rho: 0,
    Lq: 0,
    Wq: 0,
    P0: 0,
    isUnstable: false
  });

  // Calculate M/M/c metrics
  useEffect(() => {
    const { lambda, mu, c } = mmc;
    const rho = lambda / (c * mu);

    if (rho >= 1) {
      setResults({ rho, Lq: 0, Wq: 0, P0: 0, isUnstable: true });
      return;
    }

    // Calculate P0
    let sum = 0;
    for (let n = 0; n < c; n++) {
      sum += Math.pow(lambda / mu, n) / factorial(n);
    }
    const term2 = Math.pow(lambda / mu, c) / (factorial(c) * (1 - rho));
    const P0 = 1 / (sum + term2);

    // Calculate Lq (Average number in queue)
    const Lq = (P0 * Math.pow(lambda / mu, c) * rho) / (factorial(c) * Math.pow(1 - rho, 2));

    // Calculate Wq (Average waiting time in queue)
    const Wq = Lq / lambda;

    setResults({
      rho,
      Lq,
      Wq: Wq * 60, // Convert to minutes
      P0,
      isUnstable: false
    });
  }, [mmc]);

  const sections = [
    { id: 'intro', label: '6.0 Introduction', icon: Activity },
    { id: 'dtmc', label: '6.2 DTMC Modeling', icon: GitGraph },
    { id: 'ctmc', label: '6.3 CTMC Modeling', icon: Timer },
    { id: 'mmc', label: '6.4 M/M/c Queues', icon: Users },
    { id: 'summary', label: '6.8 Summary', icon: Check },
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

  const Input = ({ label, value, onChange, min = 1, max = 100, step = 1 }: { label: string; value: number; onChange: (v: number) => void; min?: number; max?: number; step?: number }) => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
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
            <Network className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold">CLO 5</span>
          </div>
          <a href="/clo4" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm">Back to CLO 4</span>
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
              <h1 className="text-4xl font-bold text-white">CLO 5: Markov & Queueing Models</h1>
              <p className="text-lg text-gray-300">Stochastic Order Fulfillment • DTMC/CTMC • M/M/c Queues</p>
              <p className="text-gray-400">Optimizing the <span className="text-orange-400 font-bold">Probabilistic Flow</span> of Warehouse Operations</p>
            </section>

            {/* 6.0 & 6.1 Introduction */}
            <Card className="bg-white/5 border-white/10">
              <h3 className="text-lg font-bold text-white mb-3">6.0 Introduction to Markovian Modeling</h3>
              <p className="text-gray-300 text-sm leading-relaxed mb-4">
                E-commerce fulfillment centers operate under continuous uncertainty. Random variations in order arrivals, processing durations, and workforce availability directly affect performance metrics. To rigorously analyze this, we use Markov chains and queuing theory.
              </p>
              <div className="p-4 bg-black/30 rounded-xl border border-white/5">
                <h4 className="text-sm font-bold text-orange-400 mb-2">6.1 System as a Stochastic Process</h4>
                <p className="text-sm text-gray-300 mb-2">
                  We define the stochastic process <MathDisplay>{`X(t) : t ≥ 0`}</MathDisplay> where <MathDisplay>X(t)</MathDisplay> represents the state of the warehouse system at time t (e.g., queue size, order stage).
                </p>
                <ul className="list-disc list-inside text-xs text-gray-400 space-y-1 ml-2">
                  <li><strong>DTMC:</strong> Discrete steps (e.g., stage completions)</li>
                  <li><strong>CTMC:</strong> Continuous time events (e.g., random arrivals)</li>
                </ul>
              </div>
            </Card>

            {/* 6.2 DTMC */}
            <section id="dtmc" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <GitGraph className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">6.2 Discrete-Time Markov Chain (DTMC)</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">6.2.2 Warehouse State Definition</h3>
                <p className="text-sm text-gray-300 mb-4">
                  The order pipeline consists of five major states <MathDisplay>{`S = { R, P_k, P_c, S_h, D }`}</MathDisplay>:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
                  {['Received (R)', 'Picking (Pk)', 'Packing (Pc)', 'Shipping (Sh)', 'Delayed (D)'].map((state, i) => (
                    <div key={i} className="p-2 bg-black/30 rounded text-center border border-blue-500/20">
                      <span className="text-xs font-bold text-blue-300">{state}</span>
                    </div>
                  ))}
                </div>
                
                <h4 className="text-sm font-bold text-white mb-2">6.2.3 Transition Probability Matrix (P)</h4>
                <p className="text-xs text-gray-400 mb-2">
                  <MathDisplay>{`P_{ij} = P(X_{n+1}=j | X_n=i)`}</MathDisplay>. The next state depends only on the current state (Markov Property).
                </p>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-center text-xs text-gray-300">
                    <thead>
                      <tr className="text-blue-400 border-b border-white/10">
                        <th className="p-2">From \ To</th>
                        <th>R</th>
                        <th>Pk</th>
                        <th>Pc</th>
                        <th>Sh</th>
                        <th>D</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5">
                        <td className="font-bold text-blue-400 p-2">R</td>
                        <td>0.1</td><td>0.8</td><td>0.0</td><td>0.0</td><td>0.1</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="font-bold text-blue-400 p-2">Pk</td>
                        <td>0.0</td><td>0.2</td><td>0.7</td><td>0.0</td><td>0.1</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="font-bold text-blue-400 p-2">Pc</td>
                        <td>0.0</td><td>0.0</td><td>0.1</td><td>0.8</td><td>0.1</td>
                      </tr>
                      <tr className="border-b border-white/5">
                        <td className="font-bold text-blue-400 p-2">Sh</td>
                        <td>0.0</td><td>0.0</td><td>0.0</td><td>1.0</td><td>0.0</td>
                      </tr>
                      <tr>
                        <td className="font-bold text-blue-400 p-2">D</td>
                        <td>0.0</td><td>0.5</td><td>0.0</td><td>0.0</td><td>0.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="bg-white/5 border-white/10">
                <h3 className="text-lg font-bold text-white mb-2">6.2.4 Steady-State Analysis</h3>
                <p className="text-sm text-gray-300 mb-2">
                  Solving <MathDisplay>{`π = πP`}</MathDisplay> gives the long-run fraction of time orders spend in each state.
                </p>
                <div className="p-3 bg-black/30 rounded-lg border-l-4 border-orange-500">
                  <p className="text-xs text-gray-400">Interpretation Example:</p>
                  <p className="text-sm text-white">If <MathDisplay>{`π_D = 0.14`}</MathDisplay>, then 14% of orders are in the delayed state in the long run.</p>
                </div>
              </Card>
            </section>

            {/* 6.3 CTMC */}
            <section id="ctmc" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Timer className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">6.3 Continuous-Time Markov Chain (CTMC)</h2>
              </div>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <p className="text-sm text-gray-300 mb-4">
                  For events occurring at random continuous times, we use a Generator Matrix <MathDisplay>Q</MathDisplay>.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-bold text-purple-400 mb-1">Holding Times</h4>
                    <p className="text-xs text-gray-300">
                      Time spent in state i is exponential with rate <MathDisplay>{`λ_i = -q_{ii}`}</MathDisplay>.
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Example: If avg picking time is 6 mins, <MathDisplay>{`λ_{Pk} = 1/6`}</MathDisplay>.
                    </p>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-bold text-purple-400 mb-1">Transient Probabilities</h4>
                    <p className="text-xs text-gray-300">
                      <MathDisplay>{`π(t) = π(0) e^{Qt}`}</MathDisplay>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Predicts probability of delay within next t minutes.
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* 6.4 M/M/c Queues */}
            <section id="mmc" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">6.4 Birth–Death Processes & M/M/c Queues</h2>
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Interactive M/M/c Queue Calculator</h3>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <Input 
                    label="Arrival Rate (λ) [orders/hr]" 
                    value={mmc.lambda} 
                    onChange={(v) => setMmc({...mmc, lambda: v})} 
                  />
                  <Input 
                    label="Service Rate (μ) [orders/server/hr]" 
                    value={mmc.mu} 
                    onChange={(v) => setMmc({...mmc, mu: v})} 
                  />
                  <Input 
                    label="Servers (c)" 
                    value={mmc.c} 
                    onChange={(v) => setMmc({...mmc, c: v})} 
                    min={1}
                    max={20}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg border border-white/10">
                    <span className="text-sm text-gray-300">System Utilization (<MathDisplay>ρ</MathDisplay>)</span>
                    <span className={`text-lg font-bold ${results.isUnstable ? 'text-red-500' : results.rho > 0.8 ? 'text-yellow-500' : 'text-green-500'}`}>
                      {(results.rho * 100).toFixed(1)}%
                    </span>
                  </div>

                  {results.isUnstable ? (
                    <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                      <div>
                        <p className="text-sm font-bold text-red-400">System Unstable!</p>
                        <p className="text-xs text-red-300">Arrival rate exceeds total service capacity (<MathDisplay>{`λ > cμ`}</MathDisplay>). Queue will grow infinitely.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-black/30 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-1">Avg Queue Length (<MathDisplay>L_q</MathDisplay>)</p>
                        <p className="text-xl font-bold text-white">{results.Lq.toFixed(2)} <span className="text-xs font-normal text-gray-500">orders</span></p>
                      </div>
                      <div className="p-3 bg-black/30 rounded-lg text-center">
                        <p className="text-xs text-gray-400 mb-1">Avg Wait Time (<MathDisplay>W_q</MathDisplay>)</p>
                        <p className="text-xl font-bold text-white">{results.Wq.toFixed(2)} <span className="text-xs font-normal text-gray-500">min</span></p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
                  <p className="text-xs text-orange-300 font-bold">Operational Interpretation:</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {results.isUnstable 
                      ? "IMMEDIATE ACTION REQUIRED: Increase servers (c) or reduce arrival rate." 
                      : results.Wq > 20 
                        ? "WARNING: Wait time exceeds 20 min SLA threshold. Consider adding a server." 
                        : "System is operating within capacity. SLA likely met."}
                  </p>
                </div>
              </Card>
            </section>

            {/* 6.5 & 6.6 Advanced Modeling */}
            <section className="space-y-5">
              <Card className="bg-white/5 border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">6.5 Multi-Stage Modeling & 6.6 SLA Prediction</h3>
                <p className="text-sm text-gray-300 mb-4">
                  By modeling the entire pipeline as a multi-stage CTMC, we can predict the probability of an order hitting the "Delayed" state before "Shipping".
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-bold text-blue-400 mb-1">Mean Time to Completion</h4>
                    <MathDisplay block>{`T = -Q_T^{-1} 1`}</MathDisplay>
                    <p className="text-xs text-gray-400 mt-2">Computes expected total processing time.</p>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-bold text-red-400 mb-1">SLA Violation Probability</h4>
                    <MathDisplay block>{`P(\\text{hit D first})`}</MathDisplay>
                    <p className="text-xs text-gray-400 mt-2">Predicts expected SLA failures per day.</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* 6.8 Summary */}
            <section id="summary" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-6 h-6 text-green-400" />
                <h2 className="text-2xl font-bold text-white">6.8 Summary of CLO 5 Achievements</h2>
              </div>

              <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30">
                <ul className="space-y-3">
                  {[
                    { title: "Modeling Proficiency", desc: "Constructed DTMC and CTMC models for warehouse processes." },
                    { title: "Queueing Analysis", desc: "Applied M/M/c models to compute utilization and waiting times." },
                    { title: "Steady-State Analysis", desc: "Solved for long-run probabilities and time-dependent behavior." },
                    { title: "Operational Forecasting", desc: "Predicted congestion and SLA violations to determine staffing." },
                    { title: "Decision-Making", desc: "Translated mathematical results into actionable optimization strategies." }
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="mt-1 min-w-[20px] h-5 flex items-center justify-center bg-green-500/20 rounded-full text-green-400 text-xs font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-green-300">{item.title}</p>
                        <p className="text-xs text-gray-400">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </section>

            {/* Footer */}
            <section className="text-center py-10">
              <a href="/" className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 text-white text-lg font-bold rounded-xl hover:bg-white/20 transition-all">
                <ArrowLeft className="w-6 h-6" />
                <span>Return to Dashboard</span>
              </a>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
