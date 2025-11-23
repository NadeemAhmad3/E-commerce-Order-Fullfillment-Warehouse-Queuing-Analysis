"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Hash, Calculator, Layers, Brain, Check, ChevronRight, Package, Info, BarChart3, TrendingUp } from 'lucide-react';

const MathDisplay = ({ children, block = false }: { children: React.ReactNode; block?: boolean }) => {
  const style: React.CSSProperties = block ? { display: 'block', textAlign: 'center', margin: '1.2rem 0', fontSize: '1.05rem' } : { display: 'inline' };
  return <span style={style} className="text-gray-100 font-mono">{children}</span>;
};

export default function CLO3Page() {
  const [activeSection, setActiveSection] = useState('intro');
  
  // 4.1 SLA Compliance Distribution
  const [slaData, setSlaData] = useState({
    excellent: 0.286, good: 0.393, acceptable: 0.214, poor: 0.107
  });

  // 4.2 Packing Time - Exponential
  const [packingExp, setPackingExp] = useState({
    lambda: 0.16, queryTime1: 5, queryTime2Start: 6, queryTime2End: 10, percentile: 95
  });

  // 4.2 Packing Time - Normal
  const [packingNorm, setPackingNorm] = useState({
    mu: 6.25, sigma: 3.95, queryTime1: 5, queryTime2Start: 6, queryTime2End: 10
  });

  // 4.2 Packing Time - Uniform
  const [packingUnif, setPackingUnif] = useState({
    a: 2, b: 25, queryTime1: 5, queryTime2Start: 6, queryTime2End: 10
  });

  // 4.3 Joint Distribution
  const [jointDist, setJointDist] = useState({
    mu0: 20, sigma0: 8, mu1: 45, sigma1: 15, pOntime: 0.85, pDelayed: 0.15,
    queryServiceTime: 35
  });

  // SLA Calculations
  const E_S = 1*0.286 + 2*0.393 + 3*0.214 + 4*0.107;
  const E_S2 = 1*1*0.286 + 4*0.393 + 9*0.214 + 16*0.107;
  const Var_S = E_S2 - (E_S * E_S);
  const StdDev_S = Math.sqrt(Var_S);
  const E_S3 = 1*0.286 + 8*0.393 + 27*0.214 + 64*0.107;
  const mu3_S = E_S3 - 3*E_S*E_S2 + 2*(E_S**3);
  const skewness_S = mu3_S / (StdDev_S**3);
  const P_good_or_better = 0.286 + 0.393;

  // Packing Time - Exponential
  const F_exp_5 = 1 - Math.exp(-packingExp.lambda * packingExp.queryTime1);
  const F_exp_6 = 1 - Math.exp(-packingExp.lambda * packingExp.queryTime2Start);
  const F_exp_10 = 1 - Math.exp(-packingExp.lambda * packingExp.queryTime2End);
  const P_exp_6_10 = F_exp_10 - F_exp_6;
  const p95_exp = -Math.log(1 - packingExp.percentile/100) / packingExp.lambda;
  const E_P_exp = 1 / packingExp.lambda;
  const Var_P_exp = 1 / (packingExp.lambda * packingExp.lambda);
  const StdDev_P_exp = Math.sqrt(Var_P_exp);

  // Packing Time - Normal (using normal CDF approximation)
  const normalCDF = (z: number) => {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = z < 0 ? -1 : 1;
    z = Math.abs(z) / Math.sqrt(2);
    const t = 1 / (1 + p * z);
    const y = 1 - (((((a5 * t + a4) * t + a3) * t + a2) * t + a1) * t * Math.exp(-z * z));
    return 0.5 * (1 + sign * y);
  };

  const Z_norm_5 = (packingNorm.queryTime1 - packingNorm.mu) / packingNorm.sigma;
  const P_norm_less_5 = normalCDF(Z_norm_5);
  const Z_norm_6 = (packingNorm.queryTime2Start - packingNorm.mu) / packingNorm.sigma;
  const Z_norm_10 = (packingNorm.queryTime2End - packingNorm.mu) / packingNorm.sigma;
  const P_norm_6_10 = normalCDF(Z_norm_10) - normalCDF(Z_norm_6);
  const p95_norm = packingNorm.mu + 1.645 * packingNorm.sigma;

  // Packing Time - Uniform
  const F_unif_5 = (packingUnif.queryTime1 - packingUnif.a) / (packingUnif.b - packingUnif.a);
  const F_unif_6 = (packingUnif.queryTime2Start - packingUnif.a) / (packingUnif.b - packingUnif.a);
  const F_unif_10 = (packingUnif.queryTime2End - packingUnif.a) / (packingUnif.b - packingUnif.a);
  const P_unif_6_10 = F_unif_10 - F_unif_6;
  const p95_unif = packingUnif.a + 0.95 * (packingUnif.b - packingUnif.a);
  const E_unif = (packingUnif.a + packingUnif.b) / 2;
  const Var_unif = ((packingUnif.b - packingUnif.a) ** 2) / 12;

  // Joint Distribution Calculations
  const E_T = jointDist.mu0 * jointDist.pOntime + jointDist.mu1 * jointDist.pDelayed;
  const E_T_given_D0 = jointDist.mu0;
  const E_T_given_D1 = jointDist.mu1;
  const E_conditional_var = (jointDist.sigma0**2) * jointDist.pOntime + (jointDist.sigma1**2) * jointDist.pDelayed;
  const Var_conditional_means = (E_T_given_D0**2 * jointDist.pOntime + E_T_given_D1**2 * jointDist.pDelayed) - (E_T**2);
  const Var_T = E_conditional_var + Var_conditional_means;
  const StdDev_T = Math.sqrt(Var_T);

  // Bayes calculation for P(D=1 | T > query)
  const Z_ontime_lower = (jointDist.queryServiceTime - jointDist.mu0) / jointDist.sigma0;
  const Z_delayed_lower = (jointDist.queryServiceTime - jointDist.mu1) / jointDist.sigma1;
  const P_T_greater_given_ontime = 1 - normalCDF(Z_ontime_lower);
  const P_T_greater_given_delayed = 1 - normalCDF(Z_delayed_lower);
  const P_T_greater_total = P_T_greater_given_ontime * jointDist.pOntime + P_T_greater_given_delayed * jointDist.pDelayed;
  const P_delayed_given_T_greater = (P_T_greater_given_delayed * jointDist.pDelayed) / P_T_greater_total;

  // Covariance and Correlation
  const E_D = 0 * jointDist.pOntime + 1 * jointDist.pDelayed;
  const E_TD = jointDist.mu1 * jointDist.pDelayed;
  const Cov_TD = E_TD - E_T * E_D;
  const Var_D = E_D - (E_D**2);
  const StdDev_D = Math.sqrt(Var_D);
  const Correlation = Cov_TD / (StdDev_T * StdDev_D);

  const sections = [
    { id: 'intro', label: 'Introduction', icon: Package },
    { id: 'pmf-sla', label: '4.1 PMF: SLA Compliance', icon: Hash },
    { id: 'pdf-packing', label: '4.2 PDF: Packing Time', icon: Calculator },
    { id: 'joint-dist', label: '4.3 Joint Distribution', icon: Layers },
    { id: 'insights', label: 'Operational Insights', icon: Brain },
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

  const Input = ({ label, value, onChange, max = 1000, step = 0.01 }: { label: string; value: number; onChange: (v: number) => void; max?: number; step?: number }) => (
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
            <TrendingUp className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold">CLO 3</span>
          </div>
          <a href="/clo1" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <span className="text-sm">CLO 1</span>
            <ChevronRight className="w-4 h-4" />
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
              <h1 className="text-4xl font-bold text-white">CLO 3: Probability Distribution Analysis and Moment Calculations</h1>
              <p className="text-lg text-gray-300">SLA Compliance • Packing Time • Service-Time Delays</p>
              <p className="text-gray-400">Analyzing <span className="text-orange-400 font-bold">discrete, continuous, and mixed</span> distributions in warehouse operations</p>
            </section>

            {/* 4.1 PMF - SLA Compliance */}
            <section id="pmf-sla" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">4.1 Probability Mass Function: SLA Compliance Distribution</h2>
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Definition & Daily Metrics</h3>
                <p className="text-gray-300 mb-3">
                  Let <strong>S = SLA compliance status</strong> for daily operations with 4 categories:
                </p>
                <ul className="text-sm text-gray-300 space-y-1 mb-4">
                  <li>• <strong>S = 1 (Excellent)</strong>: ≥95% on-time | <strong>S = 2 (Good)</strong>: 90-94% on-time</li>
                  <li>• <strong>S = 3 (Acceptable)</strong>: 85-89% on-time | <strong>S = 4 (Poor)</strong>: &lt;85% on-time</li>
                </ul>
                <p className="text-gray-400 text-sm">From 28-day observation: 200 orders/day average</p>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-4">Probability Mass Function (PMF)</h3>
                
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-gray-400 py-2">Status</th>
                        <th className="text-center text-gray-400 py-2">Compliance</th>
                        <th className="text-right text-gray-400 py-2">Days</th>
                        <th className="text-right text-gray-400 py-2">P(S=s)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { status: 'S=1', range: '≥95%', days: 8, prob: 0.286 },
                        { status: 'S=2', range: '90-94%', days: 11, prob: 0.393 },
                        { status: 'S=3', range: '85-89%', days: 6, prob: 0.214 },
                        { status: 'S=4', range: '<85%', days: 3, prob: 0.107 }
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                          <td className="text-white py-2">{row.status}</td>
                          <td className="text-center text-gray-300">{row.range}</td>
                          <td className="text-right text-gray-300">{row.days}</td>
                          <td className="text-right text-orange-400 font-bold">{(row.prob * 100).toFixed(1)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-green-500/10 rounded-lg text-center">
                  <MathDisplay block>ΣP(S=s) = 0.286 + 0.393 + 0.214 + 0.107 = 1.000 ✓</MathDisplay>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-blue-400 mb-4">Moment Calculations</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">First Moment (Mean):</p>
                    <MathDisplay block>E[S] = 1(0.286) + 2(0.393) + 3(0.214) + 4(0.107)</MathDisplay>
                    <p className="text-center text-3xl font-bold text-white mt-3">{E_S.toFixed(3)}</p>
                    <p className="text-xs text-gray-400 text-center mt-2">Between "Good" and "Acceptable"</p>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Second Moment & Variance:</p>
                    <MathDisplay block>E[S²] = 1²(0.286) + 2²(0.393) + 3²(0.214) + 4²(0.107) = {E_S2.toFixed(3)}</MathDisplay>
                    <MathDisplay block>Var(S) = {E_S2.toFixed(3)} - ({E_S.toFixed(3)})² = {Var_S.toFixed(3)}</MathDisplay>
                  </div>

                  <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Standard Deviation:</p>
                    <MathDisplay block>σ(S) = √{Var_S.toFixed(3)} = {StdDev_S.toFixed(3)} status levels</MathDisplay>
                    <p className="text-center text-xl font-bold text-orange-400 mt-2">{StdDev_S.toFixed(3)} variability</p>
                  </div>

                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Third Moment (Skewness):</p>
                    <MathDisplay block>E[S³] = {E_S3.toFixed(3)}</MathDisplay>
                    <MathDisplay block>μ₃ = {mu3_S.toFixed(3)}</MathDisplay>
                    <MathDisplay block>Skewness = {skewness_S.toFixed(3)}</MathDisplay>
                    <p className="text-xs text-gray-400 text-center mt-2">Positive skew: occasional poor days pull distribution lower</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border-cyan-500/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-4">Cumulative Distribution & Risk Assessment</h3>
                
                <div className="space-y-3">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-orange-400 font-bold">P(S ≤ 2) = {P_good_or_better.toFixed(3)} = {(P_good_or_better*100).toFixed(1)}%</p>
                    <p className="text-xs text-gray-400">Days achieving Good or better compliance</p>
                  </div>

                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-red-400 font-bold">P(S = 4) = 0.107 = 10.7%</p>
                    <p className="text-xs text-gray-400">Days with poor compliance requiring intervention</p>
                  </div>

                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-orange-400 font-bold">Monthly poor days ≈ 3.2 days/month</p>
                    <p className="text-xs text-gray-400">30 days × 0.107 = management attention needed</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">Management Insights</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Current mean status ({E_S.toFixed(2)}) requires improvement to "Good" (2.0)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Reducing variance from {Var_S.toFixed(2)} to &lt;0.5 minimizes fluctuations</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Addressing night shift (75% on-time) shifts distribution toward S=1</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Positive skewness ({skewness_S.toFixed(2)}) shows outlier poor days exist</li>
                </ul>
              </Card>
            </section>

            {/* 4.2 PDF - Packing Time */}
            <section id="pdf-packing" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">4.2 Probability Density Function: Packing Time Distribution</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Random Variable & Data Context</h3>
                <p className="text-gray-300 mb-3">
                  Let <strong>P = packing time in minutes</strong> for an order, a continuous random variable with support P ∈ [2, 25]
                </p>
                <p className="text-gray-400 text-sm">Sample data: ORD001 (3 items→8 min) | ORD002 (1 item→4 min) | ORD003 (7 items→15 min)</p>
              </Card>

              {/* Exponential Model */}
              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Exponential Distribution Model</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">PDF & CDF:</p>
                    <MathDisplay block>f(p) = λe^(-λp), where λ = 0.16 per minute</MathDisplay>
                    <MathDisplay block>F(p) = 1 - e^(-λp)</MathDisplay>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input 
                    label="Query time 1 (min)" 
                    value={packingExp.queryTime1} 
                    onChange={(v) => setPackingExp({...packingExp, queryTime1: v})}
                    max={25}
                  />
                  <Input 
                    label="Percentile (%)" 
                    value={packingExp.percentile} 
                    onChange={(v) => setPackingExp({...packingExp, percentile: Math.min(v, 99.99)})}
                    max={99.99}
                  />
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Q1: P(P &lt; {packingExp.queryTime1} min)</p>
                    <MathDisplay block>F({packingExp.queryTime1}) = 1 - e^(-{packingExp.lambda}×{packingExp.queryTime1})</MathDisplay>
                    <p className="text-center text-2xl font-bold text-white mt-2">{(F_exp_5 * 100).toFixed(1)}%</p>
                  </div>

                  <div className="p-4 bg-purple-500/20 border border-purple-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Q2: P({packingExp.queryTime2Start} &lt; P &lt; {packingExp.queryTime2End})</p>
                    <MathDisplay block>F({packingExp.queryTime2End}) - F({packingExp.queryTime2Start}) = {(F_exp_10-F_exp_6).toFixed(4)}</MathDisplay>
                    <p className="text-center text-2xl font-bold text-white mt-2">{(P_exp_6_10 * 100).toFixed(1)}%</p>
                  </div>

                  <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">{packingExp.percentile}th Percentile</p>
                    <MathDisplay block>p_{packingExp.percentile} = -ln(1-{(packingExp.percentile/100).toFixed(2)})/{packingExp.lambda}</MathDisplay>
                    <p className="text-center text-2xl font-bold text-white mt-2">{p95_exp.toFixed(2)} minutes</p>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Statistical Properties:</p>
                    <MathDisplay block>E[P] = {E_P_exp.toFixed(2)} min | Var(P) = {Var_P_exp.toFixed(2)} min² | σ(P) = {StdDev_P_exp.toFixed(2)} min</MathDisplay>
                    <p className="text-xs text-gray-400 text-center mt-2">CV = 1.0 (high variability) | Skewness = 2 (right-skewed)</p>
                  </div>
                </div>

                <div className="p-3 bg-orange-500/20 rounded-lg text-sm text-gray-300 mt-4">
                  <p><strong>Interpretation:</strong> Best captures real packing behavior—high variability with right-skew for complex orders</p>
                </div>
              </Card>

              {/* Normal Model */}
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-4">Normal Distribution Model</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input 
                    label="Mean (μ)" 
                    value={packingNorm.mu} 
                    onChange={(v) => setPackingNorm({...packingNorm, mu: v})}
                    max={15}
                    step={0.1}
                  />
                  <Input 
                    label="Std Dev (σ)" 
                    value={packingNorm.sigma} 
                    onChange={(v) => setPackingNorm({...packingNorm, sigma: v})}
                    max={10}
                    step={0.1}
                  />
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">P(P &lt; 5)</p>
                    <MathDisplay block>Z = (5 - {packingNorm.mu.toFixed(2)})/{packingNorm.sigma.toFixed(2)} = {Z_norm_5.toFixed(4)}</MathDisplay>
                    <MathDisplay block>P(P&lt;5) = Φ({Z_norm_5.toFixed(4)}) = {(P_norm_less_5*100).toFixed(2)}%</MathDisplay>
                  </div>

                  <div className="p-4 bg-purple-500/20 border border-purple-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">P(6 &lt; P &lt; 10)</p>
                    <MathDisplay block>Φ({Z_norm_10.toFixed(4)}) - Φ({Z_norm_6.toFixed(4)}) = {(P_norm_6_10*100).toFixed(2)}%</MathDisplay>
                  </div>

                  <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">95th Percentile</p>
                    <MathDisplay block>p₉₅ = {packingNorm.mu.toFixed(2)} + 1.645({packingNorm.sigma.toFixed(2)}) = {p95_norm.toFixed(2)} minutes</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Properties:</p>
                    <MathDisplay block>Skewness = 0 | Kurtosis = 3 (symmetric)</MathDisplay>
                  </div>
                </div>

                <div className="p-3 bg-purple-500/20 rounded-lg text-sm text-gray-300 mt-4">
                  <p><strong>Interpretation:</strong> Reasonable for average times, but underestimates extreme packing times</p>
                </div>
              </Card>

              {/* Uniform Model */}
              <Card className="bg-gradient-to-br from-green-500/10 to-teal-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-4">Uniform Distribution Model</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input 
                    label="Lower bound (a)" 
                    value={packingUnif.a} 
                    onChange={(v) => setPackingUnif({...packingUnif, a: v})}
                    max={10}
                  />
                  <Input 
                    label="Upper bound (b)" 
                    value={packingUnif.b} 
                    onChange={(v) => setPackingUnif({...packingUnif, b: v})}
                    max={30}
                  />
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">P(P &lt; 5)</p>
                    <MathDisplay block>F(5) = (5-{packingUnif.a})/({packingUnif.b}-{packingUnif.a}) = {F_unif_5.toFixed(4)}</MathDisplay>
                    <p className="text-center text-xl font-bold text-white mt-2">{(F_unif_5*100).toFixed(1)}%</p>
                  </div>

                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">P(6 &lt; P &lt; 10)</p>
                    <MathDisplay block>{(P_unif_6_10*100).toFixed(1)}%</MathDisplay>
                  </div>

                  <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">95th Percentile</p>
                    <MathDisplay block>p₉₅ = {packingUnif.a} + 0.95({packingUnif.b}-{packingUnif.a}) = {p95_unif.toFixed(2)} minutes</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Properties:</p>
                    <MathDisplay block>E[P] = {E_unif.toFixed(2)} min | Var(P) = {Var_unif.toFixed(2)} min²</MathDisplay>
                  </div>
                </div>

                <div className="p-3 bg-red-500/20 rounded-lg text-sm text-gray-300 mt-4">
                  <p><strong>Interpretation:</strong> Too simplistic—overestimates mean and ignores skewness in real operations</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Model Comparison & Recommendation</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <p><strong className="text-orange-400">✓ Exponential:</strong> Best—captures right-skew, high variability, realistic outliers</p>
                  <p><strong className="text-yellow-400">~ Normal:</strong> Acceptable for averages, underestimates extremes</p>
                  <p><strong className="text-red-400">✗ Uniform:</strong> Not recommended—too simplistic, poor fit</p>
                  <p className="mt-3 text-xs"><strong>Capacity Planning:</strong> Use Exponential 95th percentile (18.7 min) for realistic buffering</p>
                </div>
              </Card>
            </section>

            {/* 4.3 Joint Distribution */}
            <section id="joint-dist" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">4.3 Joint Distribution: Service Time and Delay Status</h2>
              </div>

              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-3">Definition & Mixed Distribution</h3>
                <p className="text-gray-300 mb-3">
                  Let <strong>(T, D)</strong> be joint random variable where:
                </p>
                <ul className="text-sm text-gray-300 space-y-1 mb-4">
                  <li>• <strong>T</strong> = total service time (picking + packing) in minutes</li>
                  <li>• <strong>D</strong> = delay indicator (D=1 if delayed, D=0 if on-time)</li>
                  <li>• <strong>P(D=0) = 0.85</strong> | <strong>P(D=1) = 0.15</strong></li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-4">Conditional Distributions</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">On-time orders (D=0):</p>
                    <MathDisplay block>T|D=0 ~ Normal(μ₀={jointDist.mu0}, σ₀={jointDist.sigma0})</MathDisplay>
                    <MathDisplay block>E[T|D=0] = {E_T_given_D0} min</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Delayed orders (D=1):</p>
                    <MathDisplay block>T|D=1 ~ Normal(μ₁={jointDist.mu1}, σ₁={jointDist.sigma1})</MathDisplay>
                    <MathDisplay block>E[T|D=1] = {E_T_given_D1} min</MathDisplay>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-4">Marginal Distribution of Service Time</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Law of Total Expectation:</p>
                    <MathDisplay block>E[T] = E[T|D=0]×P(D=0) + E[T|D=1]×P(D=1)</MathDisplay>
                    <MathDisplay block>= {E_T_given_D0}({jointDist.pOntime}) + {E_T_given_D1}({jointDist.pDelayed})</MathDisplay>
                    <p className="text-center text-3xl font-bold text-white mt-3">{E_T.toFixed(2)} minutes</p>
                  </div>

                  <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Law of Total Variance:</p>
                    <MathDisplay block>Var(T) = E[Var(T|D)] + Var(E[T|D])</MathDisplay>
                    <MathDisplay block>= {E_conditional_var.toFixed(2)} + {Var_conditional_means.toFixed(2)} = {Var_T.toFixed(2)} min²</MathDisplay>
                    <p className="text-center text-xl font-bold text-orange-400 mt-2">σ(T) = {StdDev_T.toFixed(2)} minutes</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-4">Conditional Probability Analysis</h3>
                
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <Input 
                    label="Query service time (minutes)" 
                    value={jointDist.queryServiceTime} 
                    onChange={(v) => setJointDist({...jointDist, queryServiceTime: v})}
                    max={90}
                  />
                </div>

                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">P(D=1 | T &gt; {jointDist.queryServiceTime})</p>
                    <p className="text-xs text-gray-400 mb-2">Bayes' Theorem Calculation:</p>
                    <MathDisplay block>P(D=1|T&gt;{jointDist.queryServiceTime}) = (P(T&gt;{jointDist.queryServiceTime}|D=1) × P(D=1)) / P(T&gt;{jointDist.queryServiceTime})</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Step-by-step:</p>
                    <MathDisplay block>P(T&gt;{jointDist.queryServiceTime}|D=0) = {P_T_greater_given_ontime.toFixed(4)}</MathDisplay>
                    <MathDisplay block>P(T&gt;{jointDist.queryServiceTime}|D=1) = {P_T_greater_given_delayed.toFixed(4)}</MathDisplay>
                    <MathDisplay block>P(T&gt;{jointDist.queryServiceTime}) = {P_T_greater_total.toFixed(4)}</MathDisplay>
                  </div>

                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center">
                    <p className="text-3xl font-bold text-white">{(P_delayed_given_T_greater*100).toFixed(1)}%</p>
                    <p className="text-sm text-gray-300 mt-2">Probability of delay given service time &gt; {jointDist.queryServiceTime} min</p>
                  </div>
                </div>

                <div className="p-3 bg-orange-500/20 rounded-lg text-sm text-gray-300 mt-4">
                  <p><strong>Insight:</strong> Strong predictor—orders at this service time have {(P_delayed_given_T_greater*100).toFixed(0)}% delay probability</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-4">Covariance & Correlation</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Expected Values:</p>
                    <MathDisplay block>E[D] = {E_D.toFixed(4)} | E[TD] = {E_TD.toFixed(2)}</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Covariance:</p>
                    <MathDisplay block>Cov(T,D) = {E_TD.toFixed(2)} - {E_T.toFixed(2)}({E_D.toFixed(2)}) = {Cov_TD.toFixed(4)}</MathDisplay>
                  </div>

                  <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Correlation Coefficient:</p>
                    <MathDisplay block>ρ(T,D) = {Cov_TD.toFixed(4)} / ({StdDev_T.toFixed(2)} × {StdDev_D.toFixed(4)}) = {Correlation.toFixed(4)}</MathDisplay>
                    <p className="text-center text-3xl font-bold text-orange-400 mt-2">{Correlation.toFixed(3)}</p>
                    <p className="text-xs text-gray-400 text-center mt-2">Strong positive correlation: longer service → higher delay probability</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Operational Insights */}
            <section id="insights" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">Integrated Operational Insights</h2>
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Early Warning System Design</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>T = 30 min threshold:</strong> P(D=1|T=30) ≈ 52.4% → alert level</li>
                  <li>• <strong>T = 35 min threshold:</strong> P(D=1|T&gt;35) ≈ 81.3% → escalation</li>
                  <li>• <strong>T = 40 min threshold:</strong> P(D=1|T=40) ≈ 86.2% → immediate action</li>
                  <li>• <strong>Intervention Point:</strong> At 30-minute mark can prevent ~50% of delays</li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Resource Allocation Strategy</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Mean service time:</strong> {E_T.toFixed(2)} minutes → 2.5 orders/hour baseline</li>
                  <li>• <strong>Variability:</strong> ±{(StdDev_T).toFixed(2)} minutes requires 26% capacity flexibility</li>
                  <li>• <strong>95th percentile:</strong> {(E_T + 1.645*StdDev_T).toFixed(2)} minutes → peak capacity design</li>
                  <li>• <strong>Correlation ({Correlation.toFixed(2)}):</strong> Service time is primary delay predictor</li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Delay Prevention Protocol</h3>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="p-2 bg-black/30 rounded">
                    <span className="text-orange-400 font-bold">25 min (mean + 0.1σ):</span> Monitor queue position
                  </div>
                  <div className="p-2 bg-black/30 rounded">
                    <span className="text-yellow-400 font-bold">30 min (mean + 0.5σ):</span> Priority escalation
                  </div>
                  <div className="p-2 bg-black/30 rounded">
                    <span className="text-red-400 font-bold">35 min (mean + 0.9σ):</span> Immediate reallocation
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">SLA Compliance Optimization</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• <strong>Current delay rate:</strong> 15% (840/5,600 orders)</li>
                  <li>• <strong>Target delay rate:</strong> &lt;8% (industry standard)</li>
                  <li>• <strong>Mean reduction strategy:</strong> 23.75 → 21.5 min (9.5% improvement)</li>
                  <li>• <strong>Variance reduction strategy:</strong> {StdDev_T.toFixed(2)} → 10.5 min (19% better control)</li>
                  <li>• <strong>Finding:</strong> Variance reduction more effective than mean reduction for SLA</li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-3">Key Distribution Insights</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> SLA compliance follows discrete distribution with positive skew (outlier poor days)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Packing time best modeled by Exponential (right-skewed, high variance)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Service time & delay status highly correlated (ρ={Correlation.toFixed(2)})</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Joint distribution reveals 81% delay probability at service time &gt;35 min</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Reducing {StdDev_T.toFixed(2)}-min variability more impactful than mean reduction</li>
                </ul>
              </Card>
            </section>

            {/* Final CTA */}
            <section className="text-center py-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">CLO 3 Complete</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white">Distribution Analysis Mastered</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                You've analyzed SLA compliance distributions, packing time models, and joint service time-delay relationships. Ready for advanced queuing theory and stochastic processes!
              </p>
              
              <a href="/clo1" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                <span>Back to CLO 1: Foundations</span>
                <ChevronRight className="w-6 h-6" />
              </a>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
