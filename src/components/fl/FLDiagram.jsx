import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, Server, ShieldCheck, Lock, Cpu, ArrowRight, RefreshCw } from 'lucide-react';

export const FLDiagram = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Local Hospital Training', desc: 'Raw patient records remain inside Hospital A, B, and C EHR databases.' },
    { title: 'Gradient Masking & Encryption', desc: 'Local model weights updated and masked using differential privacy.' },
    { title: 'FedAvg Server Aggregation', desc: 'Central server aggregates model weights without seeing any raw patient data.' },
    { title: 'Global Model Deployment', desc: 'Updated global prediction model dispatched back to all hospital clinics.' }
  ];

  return (
    <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/80 shadow-2xl relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-850 to-slate-950 text-white">
      {/* Background glowing particles */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950 text-teal-400 border border-teal-800/80 text-xs font-bold uppercase tracking-wider mb-2">
            <Lock className="w-3.5 h-3.5" /> Federated Learning Protocol (FedAvg)
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white">
            Privacy-First Collaborative Intelligence
          </h3>
          <p className="text-xs md:text-sm text-slate-400">
            "Your raw medical data never leaves your hospital — only encrypted AI weights move."
          </p>
        </div>

        <button
          onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-teal-600/30"
        >
          <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Next Protocol Phase
        </button>
      </div>

      {/* Animated Diagram Area */}
      <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
        {/* Left Column: 3 Hospital Nodes */}
        <div className="space-y-4">
          {[
            { name: 'Hospital A (Fortis)', records: '14,200 EHRs', color: 'border-teal-500/60' },
            { name: 'Hospital B (Max)', records: '18,900 EHRs', color: 'border-blue-500/60' },
            { name: 'Hospital C (Apollo)', records: '22,400 EHRs', color: 'border-purple-500/60' }
          ].map((hosp, idx) => (
            <motion.div
              key={hosp.name}
              initial={{ x: -30, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ delay: idx * 0.15 }}
              className={`p-3.5 rounded-2xl bg-slate-800/90 border ${hosp.color} shadow-lg relative flex items-center justify-between group hover:scale-[1.02] transition-transform`}
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-900 text-teal-400 border border-slate-700">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{hosp.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{hosp.records} • Raw Vault Locked</span>
                </div>
              </div>
              <div className="flex items-center gap-1 bg-emerald-950 px-2 py-1 rounded text-[10px] font-bold text-emerald-400 border border-emerald-800">
                <ShieldCheck className="w-3 h-3" /> Secure
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Column: Encrypted Weight Aggregation Animation */}
        <div className="flex flex-col items-center justify-center space-y-4 py-4 md:py-0">
          <div className="relative">
            {/* Pulsing ring animation */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-full blur-xl"
            />
            <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-teal-400 flex flex-col items-center justify-center text-teal-400 shadow-2xl relative z-10">
              <Cpu className="w-8 h-8 animate-pulse" />
              <span className="text-[9px] font-mono font-bold mt-1 text-slate-300">FedAvg</span>
            </div>
          </div>

          <div className="text-center px-2">
            <span className="text-xs font-bold text-teal-400 block uppercase tracking-wider">
              Encrypted Model Aggregator
            </span>
            <span className="text-[11px] text-slate-400 block mt-0.5">
              Updates: Δw₁, Δw₂, Δw₃ combined via Secure Weighted Average
            </span>
          </div>
        </div>

        {/* Right Column: Global Model Result Node */}
        <div>
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="p-5 rounded-2xl bg-gradient-to-br from-teal-950/80 to-slate-900 border border-teal-500/60 shadow-2xl relative space-y-3"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Global Risk Model v4.2</h4>
                <span className="text-[10px] text-teal-400 font-mono font-bold">AUC-ROC: 0.942 • Privacy Budget (ε=0.5)</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Trained collaboratively on 55,500 patient profiles across 3 medical centers without reading a single line of raw personal health information (PHI).
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] border-t border-slate-800 font-semibold text-slate-400">
              <span>Status: Active & Deployed</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Zero Leakage
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Step Explanation Banner */}
      <div className="mt-4 p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="w-7 h-7 rounded-full bg-teal-500 text-slate-950 font-bold text-xs flex items-center justify-center shrink-0">
            {activeStep + 1}
          </span>
          <div>
            <h4 className="text-xs font-bold text-white">{steps[activeStep].title}</h4>
            <p className="text-xs text-slate-400">{steps[activeStep].desc}</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center space-x-1">
          {steps.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeStep === i ? 'bg-teal-400 w-6' : 'bg-slate-600 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FLDiagram;
