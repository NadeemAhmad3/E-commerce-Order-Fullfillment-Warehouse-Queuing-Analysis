"use client";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Hash, Calculator, Layers, Brain, Check, ChevronRight, Package, Info } from 'lucide-react';

const MathDisplay = ({ children, block = false }: { children: React.ReactNode; block?: boolean }) => {
  const style: React.CSSProperties = block ? { display: 'block', textAlign: 'center', margin: '1.2rem 0', fontSize: '1.05rem' } : { display: 'inline' };
  return <span style={style} className="text-gray-100 font-mono">{children}</span>;
};

export default function CLO1Page() {
  const [activeSection, setActiveSection] = useState('intro');
  
  // 2.1.1 Counting Principles
  const [counting, setCounting] = useState({ zones: 3, stations: 4, carriers: 2 });
  
  // 2.1.2 Permutations
  const [perm, setPerm] = useState({ items: 5 });
  const [permRep, setPermRep] = useState({ total: 10, type1: 3, type2: 3, type3: 4 });
  
  // 2.1.3 Combinations
  const [comb, setComb] = useState({ workers: 8, assign: 3 });
  const [combRep, setCombRep] = useState({ units: 10, categories: 4 });
  
  // 2.2.3 Set Theory
  const [sets, setSets] = useState({
    total: 5600,
    delayed: 840,
    multiItem: 2240,
    returned: 280,
    delayedMulti: 336,
    delayedReturn: 112,
    multiReturn: 168,
    allThree: 56
  });
  
  // 2.3.4 Law of Total Probability
  const [shifts, setShifts] = useState({
    morning: { prob: 0.40, delayRate: 0.10 },
    afternoon: { prob: 0.35, delayRate: 0.12 },
    night: { prob: 0.25, delayRate: 0.25 }
  });

  // Calculations - Fixed factorial function
  const fact = (n: number) => {
    if (n < 0 || n > 100) return 1; // Safety bounds
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const comb_calc = (n: number, r: number) => {
    if (r < 0 || r > n) return 0;
    return fact(n) / (fact(r) * fact(n - r));
  };
  
  const totalPaths = counting.zones * counting.stations * counting.carriers;
  const pickingSeq = fact(perm.items);
  
  // Fixed permutations with repetition calculation
  const packingSeq = fact(permRep.total) / (fact(permRep.type1) * fact(permRep.type2) * fact(permRep.type3));
  
  const workerTeams = comb_calc(comb.workers, comb.assign);
  const stockWays = comb_calc(combRep.categories + combRep.units - 1, combRep.units);
  
  const unionDM = sets.delayed + sets.multiItem - sets.delayedMulti;
  const delayedNotMulti = sets.delayed - sets.delayedMulti;
  const ontimeSingle = sets.total - unionDM;
  
  const pD = sets.delayed / sets.total;
  const pM = sets.multiItem / sets.total;
  const pR = sets.returned / sets.total;
  const pDM = sets.delayedMulti / sets.total;
  const pDR = sets.delayedReturn / sets.total;
  const pDUnionM = unionDM / sets.total;
  
  const pD_givenM = pM > 0 ? pDM / pM : 0;
  const pR_givenD = pD > 0 ? pDR / pD : 0;
  
  const totalDelayProb = shifts.morning.prob * shifts.morning.delayRate + 
                         shifts.afternoon.prob * shifts.afternoon.delayRate + 
                         shifts.night.prob * shifts.night.delayRate;
  
  const bayesMorning = totalDelayProb > 0 ? (shifts.morning.delayRate * shifts.morning.prob) / totalDelayProb : 0;
  const bayesAfternoon = totalDelayProb > 0 ? (shifts.afternoon.delayRate * shifts.afternoon.prob) / totalDelayProb : 0;
  const bayesNight = totalDelayProb > 0 ? (shifts.night.delayRate * shifts.night.prob) / totalDelayProb : 0;
  
  const indepDM_expected = pD * pM;
  const indepDR_expected = pD * pR;
  const depFactor = indepDR_expected > 0 ? pDR / indepDR_expected : 0;

  // Input handler for permutations with repetition
  const handlePermRepChange = (field: string, value: number) => {
    const newValue = Math.max(0, Math.min(value, field === 'total' ? 100 : permRep.total));
    const newPermRep = { ...permRep, [field]: newValue };
    
    // Ensure the sum of types equals total when total changes
    if (field === 'total') {
      const currentSum = newPermRep.type1 + newPermRep.type2 + newPermRep.type3;
      if (currentSum > newValue) {
        // Adjust types proportionally if sum exceeds new total
        const scale = newValue / currentSum;
        newPermRep.type1 = Math.round(newPermRep.type1 * scale);
        newPermRep.type2 = Math.round(newPermRep.type2 * scale);
        newPermRep.type3 = newValue - newPermRep.type1 - newPermRep.type2;
      }
    }
    
    setPermRep(newPermRep);
  };

  const sections = [
    { id: 'intro', label: 'Introduction', icon: Package },
    { id: 'count-mult', label: '2.1.1 Counting Principles', icon: Hash },
    { id: 'perm-basic', label: '2.1.2 Permutations', icon: Calculator },
    { id: 'perm-rep', label: '2.1.2 Perm w/ Repetition', icon: Calculator },
    { id: 'comb-basic', label: '2.1.3 Combinations', icon: Layers },
    { id: 'comb-rep', label: '2.1.3 Comb w/ Repetition', icon: Layers },
    { id: 'set-ops', label: '2.2.1 Set Operations', icon: Layers },
    { id: 'set-identities', label: '2.2.2 Set Identities', icon: Layers },
    { id: 'set-analysis', label: '2.2.3 Event Analysis', icon: Layers },
    { id: 'prob-axioms', label: '2.3.1 Probability Axioms', icon: Brain },
    { id: 'prob-rules', label: '2.3.2 Basic Rules', icon: Brain },
    { id: 'conditional', label: '2.3.3 Conditional Prob', icon: Brain },
    { id: 'total-prob', label: '2.3.4 Total Probability', icon: Calculator },
    { id: 'bayes', label: "2.3.5 Bayes' Theorem", icon: Brain },
    { id: 'independence', label: '2.4 Independence', icon: Check }
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

  const Input = ({ label, value, onChange, max = 1000 }: { label: string; value: number; onChange: (v: number) => void; max?: number }) => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        max={max}
        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
      />
    </div>
  );

  const PermRepInput = ({ label, value, field, max = 1000 }: { label: string; value: number; field: string; max?: number }) => (
    <div>
      <label className="text-xs text-gray-400 block mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => handlePermRepChange(field, Number(e.target.value))}
        max={max}
        className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1929] via-[#0d2137] to-[#0a1929]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1929]/95 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Home</span>
          </button>
          <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full">
            <Package className="w-4 h-4 text-orange-400" />
            <span className="text-orange-400 font-bold">CLO 1</span>
          </div>
          <button className="flex items-center gap-2 text-gray-400 hover:text-orange-400 transition">
            <span className="text-sm">CLO 2</span>
            <ChevronRight className="w-4 h-4" />
          </button>
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
              <h1 className="text-4xl font-bold text-white">CLO 1: Foundational Mathematics</h1>
              <p className="text-lg text-gray-300">Counting • Sets • Probability • Conditional • Bayes • Independence</p>
              <p className="text-gray-400">Applied to <span className="text-orange-400 font-bold">5,600 orders</span> over 28 days</p>
            </section>

            {/* 2.1.1 Counting - Multiplication & Addition */}
            <section id="count-mult" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Hash className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">2.1.1 Fundamental Counting Principles</h2>
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Multiplication Principle</h3>
                <MathDisplay block>n₁ × n₂ × ... × nₖ ways</MathDisplay>
                <p className="text-sm text-gray-400 text-center mb-4">Sequential stages multiply</p>
                
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <Input label="Picking Zones" value={counting.zones} onChange={(v) => setCounting({...counting, zones: v})} max={10} />
                  <Input label="Packing Stations" value={counting.stations} onChange={(v) => setCounting({...counting, stations: v})} max={10} />
                  <Input label="Carriers" value={counting.carriers} onChange={(v) => setCounting({...counting, carriers: v})} max={5} />
                </div>

                <div className="p-4 bg-black/40 rounded-xl">
                  <MathDisplay block>{counting.zones} × {counting.stations} × {counting.carriers} = {totalPaths}</MathDisplay>
                  <p className="text-center text-2xl font-bold text-white mt-2">{totalPaths} fulfillment paths</p>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-bold text-blue-400 mb-3">Addition Principle</h3>
                <MathDisplay block>m + n ways (mutually exclusive)</MathDisplay>
                <p className="text-gray-300 text-center">Method A <span className="text-orange-400">OR</span> Method B</p>
              </Card>
            </section>

            {/* 2.1.2 Permutations - Basic */}
            <section id="perm-basic" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">2.1.2 Permutations (Order Matters)</h2>
              </div>

              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Basic Permutation</h3>
                <MathDisplay block>P(n,r) = n! / (n-r)!</MathDisplay>
                <p className="text-sm text-gray-400 text-center mb-4">Picking sequence optimization</p>
                
                <Input label="Number of Items" value={perm.items} onChange={(v) => setPerm({items: v})} max={10} />
                
                <div className="mt-4 p-4 bg-black/40 rounded-xl">
                  <MathDisplay block>P({perm.items},{perm.items}) = {perm.items}! = {pickingSeq}</MathDisplay>
                  <p className="text-center text-2xl font-bold text-white mt-2">{pickingSeq.toLocaleString()} sequences</p>
                  <p className="text-xs text-gray-400 text-center mt-2">Travel time varies by sequence</p>
                </div>
              </Card>
            </section>

            {/* 2.1.2 Permutations with Repetition */}
            <section id="perm-rep" className="scroll-mt-20 space-y-5">
              <Card className="bg-gradient-to-br from-pink-500/10 to-red-500/10 border-pink-500/30">
                <h3 className="text-lg font-bold text-pink-400 mb-3">Permutations with Repetition</h3>
                <MathDisplay block>n! / (n₁! · n₂! · n₃!)</MathDisplay>
                <p className="text-sm text-gray-400 text-center mb-4">10 orders: electronics/clothing/home goods</p>
                
                <div className="grid grid-cols-4 gap-3 mb-4">
                  <PermRepInput label="Total" value={permRep.total} field="total" max={20} />
                  <PermRepInput label="Type 1" value={permRep.type1} field="type1" max={permRep.total} />
                  <PermRepInput label="Type 2" value={permRep.type2} field="type2" max={permRep.total} />
                  <PermRepInput label="Type 3" value={permRep.type3} field="type3" max={permRep.total} />
                </div>

                <div className="p-4 bg-black/40 rounded-xl">
                  <MathDisplay block>{permRep.total}! / ({permRep.type1}! · {permRep.type2}! · {permRep.type3}!) = {!isNaN(packingSeq) ? Math.round(packingSeq).toLocaleString() : 'Invalid'}</MathDisplay>
                  <p className="text-center text-2xl font-bold text-white mt-2">
                    {!isNaN(packingSeq) ? Math.round(packingSeq).toLocaleString() : 'Invalid'} packing sequences
                  </p>
                </div>
              </Card>
            </section>

            {/* 2.1.3 Combinations - Basic */}
            <section id="comb-basic" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">2.1.3 Combinations (Order Doesn't Matter)</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Basic Combination</h3>
                <MathDisplay block>C(n,r) = n! / (r!(n-r)!)</MathDisplay>
                <p className="text-sm text-gray-400 text-center mb-4">Worker team assignment</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input label="Available Workers" value={comb.workers} onChange={(v) => setComb({...comb, workers: v})} max={20} />
                  <Input label="Workers to Assign" value={comb.assign} onChange={(v) => setComb({...comb, assign: Math.min(v, comb.workers)})} max={comb.workers} />
                </div>

                <div className="p-4 bg-black/40 rounded-xl">
                  <MathDisplay block>C({comb.workers},{comb.assign}) = {Math.round(workerTeams)}</MathDisplay>
                  <p className="text-center text-2xl font-bold text-white mt-2">{Math.round(workerTeams)} possible teams</p>
                </div>
              </Card>
            </section>

            {/* 2.1.3 Combinations with Repetition */}
            <section id="comb-rep" className="scroll-mt-20 space-y-5">
              <Card className="bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border-cyan-500/30">
                <h3 className="text-lg font-bold text-cyan-400 mb-3">Combinations with Repetition</h3>
                <MathDisplay block>C(n+r-1, r) = (n+r-1)! / (r!(n-1)!)</MathDisplay>
                <p className="text-sm text-gray-400 text-center mb-4">Stock replenishment (items can repeat)</p>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Input label="Product Categories" value={combRep.categories} onChange={(v) => setCombRep({...combRep, categories: v})} max={10} />
                  <Input label="Units to Order" value={combRep.units} onChange={(v) => setCombRep({...combRep, units: v})} max={20} />
                </div>

                <div className="p-4 bg-black/40 rounded-xl">
                  <MathDisplay block>C({combRep.categories + combRep.units - 1},{combRep.units}) = {Math.round(stockWays)}</MathDisplay>
                  <p className="text-center text-2xl font-bold text-white mt-2">{Math.round(stockWays)} distribution ways</p>
                </div>
              </Card>
            </section>

            {/* 2.2.1 Set Operations */}
            <section id="set-ops" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Layers className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">2.2.1 Set Operations & Definitions</h2>
              </div>

              <Card>
                <div className="space-y-3 text-sm">
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <strong className="text-orange-400">D ∪ M</strong> <span className="text-gray-400">(Union)</span>
                    <p className="text-gray-300">Delayed OR Multi-item (or both)</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <strong className="text-purple-400">D ∩ M</strong> <span className="text-gray-400">(Intersection)</span>
                    <p className="text-gray-300">Delayed AND Multi-item</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <strong className="text-blue-400">Dᶜ</strong> <span className="text-gray-400">(Complement)</span>
                    <p className="text-gray-300">NOT Delayed (on-time)</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <strong className="text-green-400">D - M</strong> <span className="text-gray-400">(Difference)</span>
                    <p className="text-gray-300">Delayed but NOT Multi-item</p>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg">
                    <strong className="text-red-400">D △ M</strong> <span className="text-gray-400">(Symmetric Diff)</span>
                    <p className="text-gray-300">Exactly one (XOR)</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* 2.2.2 Set Identities */}
            <section id="set-identities" className="scroll-mt-20 space-y-5">
              <h2 className="text-2xl font-bold text-white">2.2.2 Set Identities</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <h3 className="text-base font-bold text-orange-400 mb-3">Commutative Laws</h3>
                  <MathDisplay block>D ∪ M = M ∪ D</MathDisplay>
                  <MathDisplay block>D ∩ M = M ∩ D</MathDisplay>
                </Card>
                <Card>
                  <h3 className="text-base font-bold text-purple-400 mb-3">Associative Laws</h3>
                  <MathDisplay block>(D ∪ M) ∪ R = D ∪ (M ∪ R)</MathDisplay>
                  <MathDisplay block>(D ∩ M) ∩ R = D ∩ (M ∩ R)</MathDisplay>
                </Card>
                <Card>
                  <h3 className="text-base font-bold text-blue-400 mb-3">Distributive Laws</h3>
                  <MathDisplay block>D ∪ (M ∩ R) = (D ∪ M) ∩ (D ∪ R)</MathDisplay>
                  <MathDisplay block>D ∩ (M ∪ R) = (D ∩ M) ∪ (D ∩ R)</MathDisplay>
                </Card>
                <Card className="bg-red-500/10 border-red-500/30">
                  <h3 className="text-base font-bold text-red-400 mb-3">De Morgan's Laws</h3>
                  <MathDisplay block>(D ∪ M)ᶜ = Dᶜ ∩ Mᶜ</MathDisplay>
                  <MathDisplay block>(D ∩ M)ᶜ = Dᶜ ∪ Mᶜ</MathDisplay>
                  <p className="text-xs text-gray-400 mt-2 text-center">Critical for probability!</p>
                </Card>
              </div>
            </section>

            {/* 2.2.3 Set Analysis with Data */}
            <section id="set-analysis" className="scroll-mt-20 space-y-5">
              <h2 className="text-2xl font-bold text-white">2.2.3 Practical Event Analysis</h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                {[
                  { label: 'Total', value: sets.total, key: 'total', color: 'blue' },
                  { label: 'Delayed', value: sets.delayed, key: 'delayed', color: 'orange' },
                  { label: 'Multi-item', value: sets.multiItem, key: 'multiItem', color: 'purple' },
                  { label: 'Returned', value: sets.returned, key: 'returned', color: 'red' }
                ].map(item => (
                  <div key={item.key} className={`p-3 bg-${item.color}-500/10 border border-${item.color}-500/30 rounded-xl text-center`}>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => setSets({...sets, [item.key]: Number(e.target.value)})}
                      className="w-full text-xl font-bold bg-transparent text-white text-center focus:outline-none"
                    />
                    <p className="text-xs text-gray-400 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-white mb-3">Inclusion-Exclusion Principle</h3>
                <MathDisplay block>|D ∪ M| = |D| + |M| - |D ∩ M|</MathDisplay>
                <MathDisplay block>= {sets.delayed} + {sets.multiItem} - {sets.delayedMulti} = {unionDM}</MathDisplay>
                <div className="text-center mt-4">
                  <p className="text-4xl font-bold text-orange-400">{(pDUnionM * 100).toFixed(1)}%</p>
                  <p className="text-gray-300 mt-2">Delayed OR Multi-item</p>
                </div>
              </Card>

              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <h3 className="text-base font-bold text-purple-400 mb-2">Question 2: D - M</h3>
                  <MathDisplay block>|D - M| = {sets.delayed} - {sets.delayedMulti} = {delayedNotMulti}</MathDisplay>
                  <p className="text-center text-xl font-bold text-white mt-2">{delayedNotMulti} orders</p>
                  <p className="text-xs text-gray-400 text-center">Delayed but NOT multi-item</p>
                </Card>
                <Card>
                  <h3 className="text-base font-bold text-blue-400 mb-2">Question 3: De Morgan</h3>
                  <MathDisplay block>|(D ∪ M)ᶜ| = {sets.total} - {unionDM} = {ontimeSingle}</MathDisplay>
                  <p className="text-center text-xl font-bold text-white mt-2">{ontimeSingle} orders</p>
                  <p className="text-xs text-gray-400 text-center">On-time AND single-item</p>
                </Card>
              </div>
            </section>

            {/* 2.3.1 Probability Axioms */}
            <section id="prob-axioms" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">2.3.1 Axiomatic Probability</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-4">Three Axioms</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Axiom 1: Non-negativity</p>
                    <MathDisplay block>P(A) ≥ 0</MathDisplay>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Axiom 2: Normalization</p>
                    <MathDisplay block>P(Ω) = 1</MathDisplay>
                  </div>
                  <div className="p-3 bg-black/30 rounded-lg">
                    <p className="text-sm text-gray-400 mb-1">Axiom 3: Countable Additivity</p>
                    <MathDisplay block>P(A₁ ∪ A₂ ∪ ...) = Σ P(Aᵢ)</MathDisplay>
                    <p className="text-xs text-gray-400 text-center mt-1">(for mutually exclusive events)</p>
                  </div>
                </div>
              </Card>
            </section>

            {/* 2.3.2 Basic Probability Rules */}
            <section id="prob-rules" className="scroll-mt-20 space-y-5">
              <h2 className="text-2xl font-bold text-white">2.3.2 Basic Probability Rules</h2>
              
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <p className="text-xs text-gray-400 mb-2">P(Delayed)</p>
                  <p className="text-3xl font-bold text-orange-400">{(pD * 100).toFixed(1)}%</p>
                  <MathDisplay block>{sets.delayed} / {sets.total}</MathDisplay>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-gray-400 mb-2">P(Multi-item)</p>
                  <p className="text-3xl font-bold text-purple-400">{(pM * 100).toFixed(1)}%</p>
                  <MathDisplay block>{sets.multiItem} / {sets.total}</MathDisplay>
                </Card>
                <Card className="text-center">
                  <p className="text-xs text-gray-400 mb-2">P(Returned)</p>
                  <p className="text-3xl font-bold text-red-400">{(pR * 100).toFixed(1)}%</p>
                  <MathDisplay block>{sets.returned} / {sets.total}</MathDisplay>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
                <h3 className="text-lg font-bold text-green-400 mb-3">Complement Rule</h3>
                <MathDisplay block>P(Dᶜ) = 1 - P(D) = 1 - {pD.toFixed(2)} = {(1 - pD).toFixed(2)}</MathDisplay>
                <p className="text-center text-2xl font-bold text-white mt-3">{((1 - pD) * 100).toFixed(1)}% on-time</p>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">Addition Rule (General)</h3>
                <MathDisplay block>P(D ∪ M) = P(D) + P(M) - P(D ∩ M)</MathDisplay>
                <MathDisplay block>= {pD.toFixed(2)} + {pM.toFixed(2)} - {pDM.toFixed(2)} = {pDUnionM.toFixed(2)}</MathDisplay>
                <p className="text-center text-2xl font-bold text-white mt-3">{(pDUnionM * 100).toFixed(1)}%</p>
                <p className="text-xs text-gray-400 text-center mt-2">Delayed OR Multi-item (or both)</p>
              </Card>
            </section>

            {/* 2.3.3 Conditional Probability */}
            <section id="conditional" className="scroll-mt-20 space-y-5">
              <h2 className="text-2xl font-bold text-white">2.3.3 Conditional Probability</h2>
              
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Definition</h3>
                <MathDisplay block>P(A|B) = P(A ∩ B) / P(B)</MathDisplay>
                <p className="text-sm text-gray-400 text-center">Probability of A given B occurred</p>
              </Card>

              <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-orange-400 mb-3">P(Delayed | Multi-item)</h3>
                <MathDisplay block>P(D|M) = P(D ∩ M) / P(M)</MathDisplay>
                <MathDisplay block>= {pDM.toFixed(4)} / {pM.toFixed(2)} = {pD_givenM.toFixed(4)}</MathDisplay>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold text-white">{(pD_givenM * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-300 mt-2">Delay rate for multi-item orders</p>
                  <p className="text-xs text-gray-400 mt-2">Compare to overall: {(pD * 100).toFixed(1)}% → suggests independence</p>
                </div>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-500/30">
                <h3 className="text-lg font-bold text-red-400 mb-3">P(Returned | Delayed)</h3>
                <MathDisplay block>P(R|D) = P(R ∩ D) / P(D)</MathDisplay>
                <MathDisplay block>= {pDR.toFixed(4)} / {pD.toFixed(2)} = {pR_givenD.toFixed(4)}</MathDisplay>
                <div className="text-center mt-4">
                  <p className="text-3xl font-bold text-white">{(pR_givenD * 100).toFixed(1)}%</p>
                  <p className="text-sm text-gray-300 mt-2">Return rate for delayed orders</p>
                  <p className="text-xs text-orange-400 mt-2">Overall: {(pR * 100).toFixed(1)}% → delays increase returns!</p>
                </div>
              </Card>

              <Card>
                <h3 className="text-base font-bold text-blue-400 mb-3">Multiplication Rule</h3>
                <MathDisplay block>P(D ∩ M) = P(D|M) · P(M) = P(M|D) · P(D)</MathDisplay>
                <div className="p-3 bg-green-500/10 rounded-lg mt-3">
                  <p className="text-sm text-gray-400 text-center">Verification:</p>
                  <MathDisplay block>{pD_givenM.toFixed(4)} × {pM.toFixed(2)} = {(pD_givenM * pM).toFixed(4)} ✓</MathDisplay>
                </div>
              </Card>
            </section>

            {/* 2.3.4 Law of Total Probability */}
            <section id="total-prob" className="scroll-mt-20 space-y-5">
              <h2 className="text-2xl font-bold text-white">2.3.4 Law of Total Probability</h2>
              
              <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Formula</h3>
                <MathDisplay block>P(A) = Σ P(A|Bᵢ) · P(Bᵢ)</MathDisplay>
                <p className="text-sm text-gray-400 text-center">Partition sample space into shifts</p>
              </Card>

              <div className="grid md:grid-cols-3 gap-4">
                {Object.entries(shifts).map(([shift, data]) => (
                  <Card key={shift} className="bg-white/5">
                    <h3 className="text-sm font-bold text-orange-400 mb-3 capitalize">{shift} Shift</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-gray-400">P(M{shift === 'morning' ? '₁' : shift === 'afternoon' ? '₂' : '₃'})</label>
                        <input
                          type="number"
                          step="0.01"
                          value={data.prob}
                          onChange={(e) => setShifts({...shifts, [shift]: {...data, prob: Number(e.target.value)}})}
                          className="w-full px-3 py-1.5 bg-black/30 border border-white/20 rounded text-white text-sm focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400">P(D|M{shift === 'morning' ? '₁' : shift === 'afternoon' ? '₂' : '₃'})</label>
                        <input
                          type="number"
                          step="0.01"
                          value={data.delayRate}
                          onChange={(e) => setShifts({...shifts, [shift]: {...data, delayRate: Number(e.target.value)}})}
                          className="w-full px-3 py-1.5 bg-black/30 border border-white/20 rounded text-white text-sm focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-orange-500/30">
                <h3 className="text-lg font-bold text-white mb-3">Overall Delay Probability</h3>
                <MathDisplay block>P(D) = P(D|M₁)·P(M₁) + P(D|M₂)·P(M₂) + P(D|M₃)·P(M₃)</MathDisplay>
                <MathDisplay block>= {shifts.morning.delayRate}×{shifts.morning.prob} + {shifts.afternoon.delayRate}×{shifts.afternoon.prob} + {shifts.night.delayRate}×{shifts.night.prob}</MathDisplay>
                <MathDisplay block>= {(shifts.morning.delayRate * shifts.morning.prob).toFixed(4)} + {(shifts.afternoon.delayRate * shifts.afternoon.prob).toFixed(4)} + {(shifts.night.delayRate * shifts.night.prob).toFixed(4)}</MathDisplay>
                <div className="text-center mt-4">
                  <p className="text-4xl font-bold text-orange-400">{(totalDelayProb * 100).toFixed(2)}%</p>
                  <p className="text-sm text-gray-300 mt-2">Overall delay rate</p>
                  <p className="text-xs text-red-400 mt-2">Night shift contributes disproportionately</p>
                </div>
              </Card>
            </section>

            {/* 2.3.5 Bayes' Theorem */}
            <section id="bayes" className="scroll-mt-20 space-y-5">
              <h2 className="text-2xl font-bold text-white">2.3.5 Bayes' Theorem</h2>
              
              <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-400 mb-3">Formula</h3>
                <MathDisplay block>P(Bᵢ|A) = P(A|Bᵢ)·P(Bᵢ) / Σ P(A|Bⱼ)·P(Bⱼ)</MathDisplay>
                <p className="text-sm text-gray-400 text-center">Reverse conditional probability</p>
              </Card>

              <Card className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/40">
                <h3 className="text-lg font-bold text-white mb-4">Question: If order is delayed, which shift?</h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { shift: 'Morning', prob: bayesMorning, color: 'blue', idx: '₁' },
                    { shift: 'Afternoon', prob: bayesAfternoon, color: 'purple', idx: '₂' },
                    { shift: 'Night', prob: bayesNight, color: 'red', idx: '₃' }
                  ].map(item => (
                    <div key={item.shift} className={`p-4 bg-${item.color}-500/10 border border-${item.color}-500/30 rounded-xl text-center`}>
                      <p className="text-xs text-gray-400 mb-2">P(M{item.idx}|D)</p>
                      <p className="text-3xl font-bold text-white">{(item.prob * 100).toFixed(1)}%</p>
                      <p className="text-xs text-gray-400 mt-2">{item.shift}</p>
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-black/40 rounded-xl mb-4">
                  <MathDisplay block>P(M₃|D) = (0.25 × 0.25) / {totalDelayProb.toFixed(4)} = {bayesNight.toFixed(4)}</MathDisplay>
                </div>

                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center">
                  <p className="text-lg font-bold text-red-400">
                    Night shift: {(bayesNight * 100).toFixed(1)}% of delays
                  </p>
                  <p className="text-sm text-gray-300 mt-1">
                    Despite only {(shifts.night.prob * 100)}% of volume!
                  </p>
                  <p className="text-xs text-orange-400 mt-2">
                    → Immediate training & supervision needed
                  </p>
                </div>

                <div className="mt-4 p-3 bg-green-500/10 rounded-lg">
                  <p className="text-xs text-gray-400 text-center">Verification:</p>
                  <MathDisplay block>{bayesMorning.toFixed(4)} + {bayesAfternoon.toFixed(4)} + {bayesNight.toFixed(4)} = {(bayesMorning + bayesAfternoon + bayesNight).toFixed(4)} ✓</MathDisplay>
                </div>
              </Card>
            </section>

            {/* 2.4 Independence */}
            <section id="independence" className="scroll-mt-20 space-y-5">
              <div className="flex items-center gap-3 mb-4">
                <Check className="w-6 h-6 text-orange-400" />
                <h2 className="text-2xl font-bold text-white">2.4 Independence Testing</h2>
              </div>

              <Card className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border-blue-500/30">
                <h3 className="text-lg font-bold text-blue-400 mb-3">Definition</h3>
                <MathDisplay block>Events A and B are independent if:</MathDisplay>
                <MathDisplay block>P(A ∩ B) = P(A) · P(B)</MathDisplay>
                <p className="text-sm text-gray-400 text-center mt-2">Equivalently: P(A|B) = P(A)</p>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-green-500/10 border-green-500/40">
                  <h3 className="text-lg font-bold text-green-400 mb-4">Test 1: Delay vs Multi-item</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-black/30 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Expected if independent:</p>
                      <MathDisplay block>P(D) · P(M) = {pD.toFixed(2)} × {pM.toFixed(2)} = {indepDM_expected.toFixed(4)}</MathDisplay>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Actual:</p>
                      <MathDisplay block>P(D ∩ M) = {pDM.toFixed(4)}</MathDisplay>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-green-400">✓ Independent</p>
                    <p className="text-sm text-gray-300 mt-2">
                      {indepDM_expected.toFixed(4)} = {pDM.toFixed(4)}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Order size doesn't affect delays
                    </p>
                  </div>
                </Card>

                <Card className="bg-red-500/10 border-red-500/40">
                  <h3 className="text-lg font-bold text-red-400 mb-4">Test 2: Delay vs Return</h3>
                  
                  <div className="space-y-3">
                    <div className="p-3 bg-black/30 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Expected if independent:</p>
                      <MathDisplay block>P(D) · P(R) = {pD.toFixed(2)} × {pR.toFixed(2)} = {indepDR_expected.toFixed(4)}</MathDisplay>
                    </div>
                    <div className="p-3 bg-black/30 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Actual:</p>
                      <MathDisplay block>P(D ∩ R) = {pDR.toFixed(4)}</MathDisplay>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-center">
                    <p className="text-2xl font-bold text-red-400">✗ NOT Independent</p>
                    <p className="text-sm text-gray-300 mt-2">
                      {pDR.toFixed(4)} ≠ {indepDR_expected.toFixed(4)}
                    </p>
                    <p className="text-lg font-bold text-orange-400 mt-3">
                      Dependence Factor: {depFactor.toFixed(2)}×
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Delayed orders {depFactor.toFixed(2)}× more likely to be returned
                    </p>
                    <p className="text-xs text-red-400 mt-2">
                      Strong relationship: delay → customer dissatisfaction
                    </p>
                  </div>
                </Card>
              </div>
            </section>

            {/* Final CTA */}
            <section className="text-center py-16 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-green-400 font-bold">CLO 1 Complete</span>
              </div>
              
              <h2 className="text-3xl font-bold text-white">Ready for Random Variables?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                You've mastered counting principles, set theory, probability fundamentals, conditional probability, Bayes' theorem, and independence testing. Time to explore random variables!
              </p>
              
              <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-lg font-bold rounded-xl hover:shadow-xl hover:shadow-orange-500/30 transition-all">
                <span>Continue to CLO 2: Random Variables</span>
                <ChevronRight className="w-6 h-6" />
              </button>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}
