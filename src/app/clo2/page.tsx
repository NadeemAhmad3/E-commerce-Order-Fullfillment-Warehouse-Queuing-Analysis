"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Hash, Calculator, Layers, Brain, Check, ChevronRight, Package, Info, BarChart3 } from 'lucide-react';

const MathDisplay = ({ children, block = false }: { children: React.ReactNode; block?: boolean }) => {
  const style: React.CSSProperties = block ? { display: 'block', textAlign: 'center', margin: '1.2rem 0', fontSize: '1.05rem' } : { display: 'inline' };
  return <span style={style} className="text-gray-100 font-mono">{children}</span>;
};

export default function CLO2Page() {
  const [activeSection, setActiveSection] = useState('intro');
  
  // 3.1 Discrete Random Variables - Order Size
  const [orderSize, setOrderSize] = useState({
    items1: 0.35, items2: 0.25, items3: 0.16, items4: 0.10,
    items5: 0.08, items6: 0.04, items7: 0.02
  });
  
  // 3.2 Continuous Random Variables - Picking Time
  const [pickingTime, setPickingTime] = useState({
    t0: 3, lambda: 0.15,
    queryTime: 15, queryTime2Start: 8, queryTime2End: 20,
    percentile: 90
  });
  
  // 3.3 Mixed Random Variables - Fulfillment Cycle
  const [fulfillment, setFulfillment] = useState({
    express: { range: '20-35', orders: 840, prob: 0.15 },
    standard: { range: '35-65', orders: 3920, prob: 0.70 },
    extended: { range: '65-90', orders: 280, prob: 0.05 },
    delay1day: { orders: 448, prob: 0.08 },
    delay2day: { orders: 112, prob: 0.02 }
  });

  // Calculations
  const totalOrders = 5600;
  
  // Expected value of order size
  const E_X = 1*0.35 + 2*0.25 + 3*0.16 + 4*0.10 + 5*0.08 + 6*0.04 + 7*0.02;
  const E_X2 = 1*1*0.35 + 4*0.25 + 9*0.16 + 16*0.10 + 25*0.08 + 36*0.04 + 49*0.02;
  const Var_X = E_X2 - (E_X * E_X);
  const StdDev_X = Math.sqrt(Var_X);

  // Picking time calculations
  const F_t15 = 1 - Math.exp(-pickingTime.lambda * (pickingTime.queryTime - pickingTime.t0));
  const P_T_greater_15 = 1 - F_t15;
  
  const F_t8 = 1 - Math.exp(-pickingTime.lambda * (pickingTime.queryTime2Start - pickingTime.t0));
  const F_t20 = 1 - Math.exp(-pickingTime.lambda * (pickingTime.queryTime2End - pickingTime.t0));
  const P_T_8_20 = F_t20 - F_t8;
  
  const t_percentile = pickingTime.t0 + (-Math.log(1 - pickingTime.percentile/100)) / pickingTime.lambda;
  
  const E_T = pickingTime.t0 + 1/pickingTime.lambda;
  const Var_T = 1 / (pickingTime.lambda * pickingTime.lambda);
  const StdDev_T = 1 / pickingTime.lambda;

  // Fulfillment cycle
  const E_C_no_delay = (27.5*0.15 + 50*0.70 + 77.5*0.05) / 0.90;
  const E_C_complete = E_C_no_delay * 0.90 + 1440 * 0.08 + 2880 * 0.02;
  const P_C_60 = 0.85 * 0.90;
  const P_C_480 = 0.90;
  const P_C_1440 = 0.98;

  const sections = [
    { id: 'intro', label: 'Introduction', icon: Package },
    { id: 'drv-order', label: '3.1 Discrete RV: Order Size', icon: Hash },
    { id: 'crv-picking', label: '3.2 Continuous RV: Picking Time', icon: Calculator },
    { id: 'mrv-fulfillment', label: '3.3 Mixed RV: Fulfillment', icon: Layers },
    { id: 'analysis', label: 'Operational Analysis', icon: Brain },
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
            <BarChart3 className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold">CLO 2</span>
          </div>
          <a href="/clo3" className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <span className="text-sm">CLO 3</span>
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
              <h1 className="text-4xl font-bold text-white">CLO 2: Random Variable Classification and Analysis</h1>
              <p className="text-lg text-gray-300">Discrete • Continuous • Mixed Random Variables</p>
              <p className="text-gray-400">Applied to <span className="text-orange-400 font-bold">5,600 orders</span> over 28 days of warehouse operations</p>
            </section>

            {/* 3.1 Discrete Random Variables */}
            <section id="drv-order" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">3.1 Discrete Random Variables: Order Size Analysis</h2>
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Definition & Context</h3>
                <p className="text-gray-300 mb-3">
                  A discrete random variable (DRV) is a variable whose possible outcomes form a countable set. In e-commerce warehouses:
                </p>
                <p className="text-orange-400 font-bold text-center">
                  X = Number of items in a customer order
                </p>
                <p className="text-gray-400 text-center text-sm mt-2">Because orders contain an integer number of products, X is strictly discrete.</p>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Probability Mass Function (PMF)</h3>
                <p className="text-gray-300 text-sm mb-4">Order distribution from 5,600 orders (28-day period):</p>
                
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-gray-400 py-2">Order Size (x)</th>
                        <th className="text-right text-gray-400 py-2">Frequency</th>
                        <th className="text-right text-gray-400 py-2">P(X=x)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { items: 1, freq: 1960, prob: 0.35 },
                        { items: 2, freq: 1400, prob: 0.25 },
                        { items: 3, freq: 896, prob: 0.16 },
                        { items: 4, freq: 560, prob: 0.10 },
                        { items: 5, freq: 448, prob: 0.08 },
                        { items: 6, freq: 224, prob: 0.04 },
                        { items: 7, freq: 112, prob: 0.02 }
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                          <td className="text-white py-2">{row.items}</td>
                          <td className="text-right text-gray-300">{row.freq.toLocaleString()}</td>
                          <td className="text-right text-orange-400 font-bold">{(row.prob * 100).toFixed(0)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-green-500/10 rounded-lg text-center">
                  <MathDisplay block>ΣP(X=x) = 0.35 + 0.25 + 0.16 + 0.10 + 0.08 + 0.04 + 0.02 = 1.00 ✓</MathDisplay>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-blue-400 mb-4">Mathematical Moments</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Expected Value:</p>
                    <MathDisplay block>E[X] = Σx · P(X=x) = 1(0.35) + 2(0.25) + 3(0.16) + 4(0.10) + 5(0.08) + 6(0.04) + 7(0.02)</MathDisplay>
                    <p className="text-center text-3xl font-bold text-white mt-3">{E_X.toFixed(2)} items per order</p>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Second Moment:</p>
                    <MathDisplay block>E[X²] = 1²(0.35) + 2²(0.25) + 3²(0.16) + 4²(0.10) + 5²(0.08) + 6²(0.04) + 7²(0.02) = {E_X2.toFixed(2)}</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Variance:</p>
                    <MathDisplay block>Var(X) = E[X²] - (E[X])² = {E_X2.toFixed(2)} - ({E_X.toFixed(2)})² = {Var_X.toFixed(2)}</MathDisplay>
                  </div>

                  <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Standard Deviation:</p>
                    <MathDisplay block>σ(X) = √{Var_X.toFixed(2)} = {StdDev_X.toFixed(2)} items</MathDisplay>
                    <p className="text-center text-xl font-bold text-orange-400 mt-2">{StdDev_X.toFixed(2)} items variability</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">Operational Implications</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Average order contains {E_X.toFixed(2)} items, requiring multi-location picking for 40% of orders</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> High variance ({Var_X.toFixed(2)}) indicates significant variability in picking complexity</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Orders with ≥3 items require dedicated picking carts and longer fulfillment times</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Picking stations should be staffed based on expected item count distribution</li>
                </ul>
              </Card>
            </section>

            {/* 3.2 Continuous Random Variables */}
            <section id="crv-picking" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">3.2 Continuous Random Variables: Picking Time Distribution</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Definition & Model</h3>
                <p className="text-gray-300 mb-3">
                  Let <strong>T = picking time in minutes</strong> for an order, a continuous random variable with support T ∈ [3, 45]
                </p>
                <p className="text-gray-400 text-sm mb-4">
                  Picking time approximately follows a shifted exponential distribution based on warehouse operations data.
                </p>
                
                <div className="space-y-3">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Probability Density Function (PDF):</p>
                    <MathDisplay block>f(t) = λe^(-λ(t-t₀)) for t ≥ t₀</MathDisplay>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-xs text-gray-400 mb-1">Cumulative Distribution Function (CDF):</p>
                    <MathDisplay block>F(t) = P(T ≤ t) = 1 - e^(-λ(t-t₀))</MathDisplay>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-white mb-4">Model Parameters & Adjustments</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input 
                    label="Minimum picking time (t₀)" 
                    value={pickingTime.t0} 
                    onChange={(v) => setPickingTime({...pickingTime, t0: v})}
                    max={10}
                  />
                  <Input 
                    label="Rate parameter (λ)" 
                    value={pickingTime.lambda} 
                    onChange={(v) => setPickingTime({...pickingTime, lambda: v})}
                    max={1}
                    step={0.01}
                  />
                </div>

                <div className="p-3 bg-black/30 rounded-lg text-center">
                  <p className="text-xs text-gray-400">t₀ = minimum time (3 min) | λ = rate parameter (0.15 per min)</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Question 1: P(T &gt; 15 minutes)</h3>
                <p className="text-gray-300 mb-4">What is the probability an order takes more than 15 minutes to pick?</p>
                
                <div className="space-y-3 mb-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Solution:</p>
                    <MathDisplay block>P(T &gt; 15) = 1 - F(15) = 1 - (1 - e^(-λ(15-t₀)))</MathDisplay>
                    <MathDisplay block>= e^(-{pickingTime.lambda.toFixed(2)}×{(pickingTime.queryTime - pickingTime.t0)})</MathDisplay>
                    <MathDisplay block>= e^({(pickingTime.lambda * (pickingTime.queryTime - pickingTime.t0) * -1).toFixed(2)}) = {P_T_greater_15.toFixed(4)}</MathDisplay>
                  </div>
                </div>

                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-white">{(P_T_greater_15 * 100).toFixed(2)}%</p>
                  <p className="text-sm text-gray-300 mt-2">Probability picking exceeds 15 minutes</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-4">Question 2: P(8 &lt; T &lt; 20)</h3>
                <p className="text-gray-300 mb-4">What is the probability picking time is between 8 and 20 minutes?</p>
                
                <div className="space-y-3 mb-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Solution:</p>
                    <MathDisplay block>P(8 &lt; T &lt; 20) = F(20) - F(8)</MathDisplay>
                    <MathDisplay block>= [1 - e^(-{pickingTime.lambda.toFixed(2)}×17)] - [1 - e^(-{pickingTime.lambda.toFixed(2)}×5)]</MathDisplay>
                    <MathDisplay block>= {Math.exp(-pickingTime.lambda * 17).toFixed(4)} - {Math.exp(-pickingTime.lambda * 5).toFixed(4)} = {P_T_8_20.toFixed(4)}</MathDisplay>
                  </div>
                </div>

                <div className="p-4 bg-purple-500/20 border border-purple-500/50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-white">{(P_T_8_20 * 100).toFixed(2)}%</p>
                  <p className="text-sm text-gray-300 mt-2">Probability picking time in 8-20 minute range</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-4">Question 3: 90th Percentile</h3>
                <p className="text-gray-300 mb-4">What picking time threshold captures 90% of orders?</p>
                
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <Input 
                    label="Percentile target (%)" 
                    value={pickingTime.percentile} 
                    onChange={(v) => setPickingTime({...pickingTime, percentile: Math.min(v, 99.99)})}
                    max={99.99}
                  />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Solution:</p>
                    <MathDisplay block>Find t such that P(T ≤ t) = {(pickingTime.percentile/100).toFixed(2)}</MathDisplay>
                    <MathDisplay block>{(pickingTime.percentile/100).toFixed(2)} = 1 - e^(-λ(t-t₀))</MathDisplay>
                    <MathDisplay block>e^(-λ(t-t₀)) = {(1-pickingTime.percentile/100).toFixed(4)}</MathDisplay>
                    <MathDisplay block>t = t₀ + (-ln({(1-pickingTime.percentile/100).toFixed(4)})) / λ</MathDisplay>
                    <MathDisplay block>t = {pickingTime.t0} + {((-Math.log(1-pickingTime.percentile/100)) / pickingTime.lambda).toFixed(2)} = {t_percentile.toFixed(2)} minutes</MathDisplay>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/20 border border-blue-500/50 rounded-xl text-center">
                  <p className="text-3xl font-bold text-white">{t_percentile.toFixed(2)} minutes</p>
                  <p className="text-sm text-gray-300 mt-2">{pickingTime.percentile.toFixed(0)}th percentile picking time</p>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-green-400 mb-4">Statistical Properties</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-1">Expected Picking Time:</p>
                    <MathDisplay block>E[T] = t₀ + 1/λ = {pickingTime.t0} + {(1/pickingTime.lambda).toFixed(2)} = {E_T.toFixed(2)} minutes</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-1">Variance:</p>
                    <MathDisplay block>Var(T) = 1/λ² = {Var_T.toFixed(2)} min²</MathDisplay>
                  </div>

                  <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-1">Standard Deviation:</p>
                    <MathDisplay block>σ(T) = 1/λ = {StdDev_T.toFixed(2)} minutes</MathDisplay>
                    <p className="text-center text-xl font-bold text-orange-400 mt-2">{StdDev_T.toFixed(2)} min variability</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">Operational Implications</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> 90% of orders complete picking within {t_percentile.toFixed(2)} minutes—use this for SLA setting</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Mean picking time of {E_T.toFixed(2)} minutes allows capacity planning: each picker handles ~5-6 orders/hour</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {(P_T_greater_15 * 100).toFixed(1)}% of orders exceed 15 minutes—queue management needed</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> High standard deviation ({StdDev_T.toFixed(2)} min) requires buffer capacity during peak periods</li>
                </ul>
              </Card>
            </section>

            {/* 3.3 Mixed Random Variables */}
            <section id="mrv-fulfillment" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">3.3 Mixed Random Variables: Total Fulfillment Cycle Time</h2>
              </div>

              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-3">Definition & Components</h3>
                <p className="text-gray-300 mb-3">
                  Let <strong>C = total fulfillment cycle time</strong> (from order arrival to shipping), a mixed random variable with both discrete and continuous components.
                </p>
                
                <MathDisplay block>C = T_queue + T_picking + T_packing + T_shipping_prep + D</MathDisplay>
                
                <p className="text-gray-400 text-sm mt-4">Where:</p>
                <ul className="text-sm text-gray-300 space-y-1 mt-2">
                  <li>• <strong>T_queue</strong>: Queueing delay (continuous when queue exists, 0 otherwise)</li>
                  <li>• <strong>T_picking</strong>: Picking time (continuous, exponential)</li>
                  <li>• <strong>T_packing</strong>: Packing time (continuous)</li>
                  <li>• <strong>T_shipping_prep</strong>: Shipping preparation (continuous)</li>
                  <li>• <strong>D</strong>: Delay indicator (discrete: 0 for on-time, adds 1440+ min if overnight delay)</li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-4">Fulfillment Time Distribution (28-day data)</h3>
                
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left text-gray-400 py-2">Category</th>
                        <th className="text-right text-gray-400 py-2">Time Range</th>
                        <th className="text-right text-gray-400 py-2">Orders</th>
                        <th className="text-right text-gray-400 py-2">Probability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { cat: 'Express', range: '20-35 min', orders: 840, prob: 0.15 },
                        { cat: 'Standard', range: '35-65 min', orders: 3920, prob: 0.70 },
                        { cat: 'Extended', range: '65-90 min', orders: 280, prob: 0.05 },
                        { cat: '1-day delay', range: '~1440 min', orders: 448, prob: 0.08 },
                        { cat: '2-day delay', range: '~2880 min', orders: 112, prob: 0.02 }
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                          <td className="text-white py-2">{row.cat}</td>
                          <td className="text-right text-gray-300">{row.range}</td>
                          <td className="text-right text-gray-300">{row.orders.toLocaleString()}</td>
                          <td className="text-right text-orange-400 font-bold">{(row.prob * 100).toFixed(0)}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-green-500/10 rounded-lg text-center">
                  <MathDisplay block>Total = 5,600 orders ✓</MathDisplay>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-4">Expected Fulfillment Time Calculation</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Breaking down normal operations (90% of orders):</p>
                    <MathDisplay block>E[C | no delay] = (27.5×0.15 + 50×0.70 + 77.5×0.05) / 0.90</MathDisplay>
                    <MathDisplay block>= (4.125 + 35 + 3.875) / 0.90 = {E_C_no_delay.toFixed(2)} minutes</MathDisplay>
                  </div>

                  <div className="p-4 bg-orange-500/20 border border-orange-500/50 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Complete expectation with delays:</p>
                    <MathDisplay block>E[C] = E[C|no delay]·P(no delay) + 1440·P(1-day) + 2880·P(2-day)</MathDisplay>
                    <MathDisplay block>= {E_C_no_delay.toFixed(2)}(0.90) + 1440(0.08) + 2880(0.02)</MathDisplay>
                    <MathDisplay block>= {(E_C_no_delay * 0.90).toFixed(2)} + {(1440 * 0.08).toFixed(2)} + {(2880 * 0.02).toFixed(2)}</MathDisplay>
                    <p className="text-center text-3xl font-bold text-white mt-3">{E_C_complete.toFixed(2)} minutes ({(E_C_complete/60).toFixed(2)} hours)</p>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-4">SLA Assessment</h3>
                
                <div className="space-y-3">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">On-time fulfillment (within 60 minutes):</p>
                    <MathDisplay block>P(C ≤ 60) = P(C ≤ 60 | no delay) × P(no delay) = 0.85 × 0.90</MathDisplay>
                    <p className="text-center text-2xl font-bold text-white mt-2">{(P_C_60 * 100).toFixed(1)}%</p>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Same-day fulfillment (within 8 hours = 480 minutes):</p>
                    <MathDisplay block>P(C ≤ 480) = {(P_C_480 * 100).toFixed(1)}%</MathDisplay>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <p className="text-xs text-gray-400 mb-2">Fulfillment within 24 hours (excluding 2-day delays):</p>
                    <MathDisplay block>P(C ≤ 1440) = 0.90 + 0.08 = {P_C_1440.toFixed(2)} or {(P_C_1440 * 100).toFixed(0)}%</MathDisplay>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-3">Variance Analysis (Mixed Distribution)</h3>
                <p className="text-gray-300 text-sm mb-4">
                  The mixed nature creates extremely high variance due to discrete delay components:
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> Continuous component variance: ~225 min² (normal operations)</li>
                  <li className="flex gap-2"><Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> Delay component adds massive variance from discrete jumps</li>
                  <li className="flex gap-2"><Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> <strong>Total Var(C) ≈ 261,700 min²</strong> (dominated by delays)</li>
                  <li className="flex gap-2"><Info className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> <strong>σ(C) ≈ 511.57 minutes (8.53 hours)</strong></li>
                </ul>
              </Card>

              <Card className="bg-green-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">Critical Operational Insights</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Mean fulfillment time of {(E_C_complete/60).toFixed(2)} hours is heavily right-skewed by delays</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Median fulfillment time (~45 min) better represents typical customer experience</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Extreme variance (σ = 8.53 hours) driven by the 10% delayed orders</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> SLA should be set at 90th percentile (~75 min) rather than mean</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Reducing 10% delay rate would dramatically decrease variance & improve predictability</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Track separately: "on-time completion rate" (90%) vs "fulfillment time given on-time" ({E_C_no_delay.toFixed(2)} min)</li>
                </ul>
              </Card>
            </section>

            {/* Comprehensive Analysis */}
            <section id="analysis" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">Integrated Operational Analysis</h2>
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Order Size Impact on Picking Time</h3>
                <p className="text-gray-300 mb-3">
                  The discrete order size distribution directly impacts the continuous picking time distribution. 40% of orders (≥3 items) require significantly longer picking times.
                </p>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li>• Single-item orders ({(0.35*100).toFixed(0)}%): ~5 min avg</li>
                  <li>• Double-item orders ({(0.25*100).toFixed(0)}%): ~8-10 min avg</li>
                  <li>• Multi-item orders ({(0.40*100).toFixed(0)}%): 12-28+ min (high variance)</li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Fulfillment Cycle Composition</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Total fulfillment time is composed of multiple continuous stages plus a discrete delay component:
                </p>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex justify-between p-2 bg-black/30 rounded">
                    <span>Express (20-35 min)</span>
                    <span className="text-orange-400">15%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/30 rounded">
                    <span>Standard (35-65 min)</span>
                    <span className="text-orange-400">70%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-black/30 rounded">
                    <span>Extended (65-90 min)</span>
                    <span className="text-orange-400">5%</span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-500/20 rounded">
                    <span>1-2 Day Delays</span>
                    <span className="text-red-400">10%</span>
                  </div>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Resource Allocation Strategy</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><strong>Picking Station Capacity:</strong> Design for {(E_X > 5 ? 6 : 5)}-6 orders/hour per picker</li>
                  <li><strong>Buffer Capacity:</strong> Standard deviation of {StdDev_T.toFixed(2)} min requires +20-30% excess capacity</li>
                  <li><strong>Peak Hour Staffing:</strong> Account for variance—cannot staff to mean alone</li>
                  <li><strong>SLA Threshold:</strong> Set at {t_percentile.toFixed(0)} minutes (90th percentile) for {pickingTime.percentile.toFixed(0)}% compliance</li>
                </ul>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">Key Takeaways</h3>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Discrete order sizes (avg {E_X.toFixed(2)} items) create variable picking complexity</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Continuous picking times follow exponential pattern (mean {E_T.toFixed(2)} min, σ {StdDev_T.toFixed(2)} min)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Mixed fulfillment times highly impacted by 10% delay rate (causes {(511.57).toFixed(0)}-min volatility)</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {(P_C_60*100).toFixed(1)}% on-time rate achievable with current operations</li>
                  <li className="flex gap-2"><Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> Reducing delays 10%→5% would increase on-time rate to ~83% and cut variance significantly</li>
                </ul>
              </Card>
            </section>

            {/* Final CTA */}
            <section className="text-center py-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">CLO 2 Complete</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white">Master Random Variables & Distributions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                You've explored discrete order size distributions, continuous picking time models, and mixed fulfillment cycles. Ready to tackle stochastic processes and queuing theory!
              </p>
              
              <a href="/clo3" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                <span>Continue to CLO 3: Stochastic Processes</span>
                <ChevronRight className="w-6 h-6" />
              </a>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
