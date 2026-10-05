import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../context/AppointmentContext';
import { useToast } from '../context/ToastContext';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import FLDiagram from '../components/fl/FLDiagram';
import { 
  BrainCircuit, 
  ShieldCheck, 
  Activity, 
  Heart, 
  Lock, 
  Stethoscope, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  RefreshCw,
  ArrowRight,
  Info,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AIRiskPrediction = () => {
  const navigate = useNavigate();
  const { patientProfile, setSelectedDoctorForBooking } = useAppointments();
  const { addToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    age: patientProfile.age || 42,
    systolicBP: 128,
    diastolicBP: 84,
    fastingSugar: 112,
    bmi: 24.2,
    smoking: 'No',
    alcohol: 'Occasional',
    symptoms: ['Mild Fatigue']
  });

  const [calculating, setCalculating] = useState(false);
  const [result, setResult] = useState(null);
  const [showHowItWorks, setShowHowItWorks] = useState(false);

  const handleSymptomToggle = (sym) => {
    if (formData.symptoms.includes(sym)) {
      setFormData({ ...formData, symptoms: formData.symptoms.filter((s) => s !== sym) });
    } else {
      setFormData({ ...formData, symptoms: [...formData.symptoms, sym] });
    }
  };

  const handleCalculateRisk = (e) => {
    e.preventDefault();
    setCalculating(true);

    setTimeout(() => {
      setCalculating(false);

      // Federated Learning Algorithm Mock Calculation
      let score = 12; // Base risk

      if (formData.age > 45) score += 15;
      if (formData.systolicBP > 130) score += 20;
      if (formData.fastingSugar > 120) score += 22;
      if (formData.smoking === 'Yes') score += 18;
      if (formData.symptoms.length > 1) score += 12;

      let level = 'Low';
      let color = 'emerald';
      let hexColor = '#10B981';
      let recSpecialty = 'General Medicine';
      let advice = 'Your vitals are within favorable ranges. Continue regular exercise, low-sodium nutrition, and annual health check-ups.';

      if (score >= 40 && score < 65) {
        level = 'Moderate';
        color = 'amber';
        hexColor = '#F59E0B';
        recSpecialty = 'Cardiology';
        advice = 'Elevated systolic blood pressure and metabolic markers detected. A proactive consultation with a cardiologist or endocrinologist is advised.';
      } else if (score >= 65) {
        level = 'High';
        color = 'rose';
        hexColor = '#EF4444';
        recSpecialty = 'Cardiology';
        advice = 'Significant cardiovascular & metabolic risk factors flagged by the Federated Model. Prompt medical evaluation with a specialist is strongly recommended.';
      }

      setResult({ score, level, color, hexColor, recSpecialty, advice });
      addToast('Federated AI risk assessment completed!', 'success');
    }, 1200);
  };

  return (
    <div className="pt-28 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* INTRO BANNER */}
      <ParallaxWrapper className="text-center space-y-3">
        <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 uppercase tracking-wider inline-flex items-center gap-1.5">
          <BrainCircuit className="w-4 h-4 text-purple-600 animate-pulse" /> Federated Learning Centerpiece
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
          Privacy-First AI Risk Prediction
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto">
          Predicted using a machine learning model trained collaboratively across hospitals via <strong>FedAvg</strong> — your raw personal medical data never left your hospital.
        </p>
      </ParallaxWrapper>

      {/* ANIMATED FL DIAGRAM BAND */}
      <ParallaxWrapper>
        <FLDiagram />
      </ParallaxWrapper>

      {/* INPUT FORM & RESULT GAUGE DISPLAY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: VITAL INPUT FORM */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b pb-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-600" /> Enter Patient Vitals & Metrics
            </h3>
            <span className="text-xs text-slate-400 font-mono">Input Form</span>
          </div>

          <form onSubmit={handleCalculateRisk} className="space-y-5 text-xs font-medium">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">BMI Index</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.bmi}
                  onChange={(e) => setFormData({ ...formData, bmi: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Systolic BP (mmHg)</label>
                <input
                  type="number"
                  value={formData.systolicBP}
                  onChange={(e) => setFormData({ ...formData, systolicBP: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Fasting Glucose (mg/dL)</label>
                <input
                  type="number"
                  value={formData.fastingSugar}
                  onChange={(e) => setFormData({ ...formData, fastingSugar: Number(e.target.value) })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Smoking Habit</label>
                <select
                  value={formData.smoking}
                  onChange={(e) => setFormData({ ...formData, smoking: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <option value="No">No / Non-Smoker</option>
                  <option value="Yes">Yes / Active Smoker</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Alcohol Intake</label>
                <select
                  value={formData.alcohol}
                  onChange={(e) => setFormData({ ...formData, alcohol: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-800"
                >
                  <option value="None">None</option>
                  <option value="Occasional">Occasional</option>
                  <option value="Regular">Regular</option>
                </select>
              </div>
            </div>

            {/* Symptoms checklist */}
            <div>
              <label className="block text-slate-700 font-bold mb-2">Active Symptoms Checklist</label>
              <div className="flex flex-wrap gap-2">
                {['Chest Tightness', 'Shortness of Breath', 'Mild Fatigue', 'Dizziness', 'Frequent Thirst'].map((sym) => {
                  const isChecked = formData.symptoms.includes(sym);
                  return (
                    <button
                      type="button"
                      key={sym}
                      onClick={() => handleSymptomToggle(sym)}
                      className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        isChecked
                          ? 'bg-teal-50 text-teal-800 border-teal-400 font-bold shadow-xs'
                          : 'bg-white text-slate-600 border-slate-200'
                      }`}
                    >
                      {isChecked ? '✓ ' : '+ '} {sym}
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={calculating}
              className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-purple-600 to-teal-600 hover:opacity-95 shadow-lg shadow-purple-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60 cursor-pointer"
            >
              {calculating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Aggregating FedAvg Weights...
                </>
              ) : (
                <>
                  <BrainCircuit className="w-5 h-5" /> Run Federated AI Risk Inference
                </>
              )}
            </motion.button>
          </form>
        </div>

        {/* RIGHT COLUMN: ANIMATED CIRCULAR SVG GAUGE SCORE METER RESULT */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 sm:p-8 rounded-3xl border border-white/80 shadow-xl space-y-5 text-center">
            
            <div className="flex items-center justify-between border-b pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <span>AI Risk Assessment Output</span>
              <span className="text-teal-600 flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3" /> FL Private
              </span>
            </div>

            {/* Privacy Reinforcement Caption (Always visible) */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 font-medium py-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
              <span>Predicted using a federated model — your data never left your hospital.</span>
            </div>

            {result ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="space-y-6 pt-2"
              >
                {/* SVG Circular Gauge Meter - Animate 0 to Result Value over 1.2s */}
                <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="#E2E8F0"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke={result.hexColor}
                      strokeWidth="10"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * result.score) / 100 }}
                      transition={{ duration: 1.2, ease: 'easeOut' }}
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-slate-900 font-mono">{result.score}%</span>
                    <span className="text-xs font-bold uppercase tracking-wider" style={{ color: result.hexColor }}>
                      {result.level} Risk
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                  <span className="font-bold text-slate-800 block">Personalized Clinical Summary</span>
                  <p className="text-slate-600 leading-relaxed">{result.advice}</p>
                </div>

                {/* Disclaimer Banner */}
                <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-left flex items-start space-x-2.5 text-[11px] text-amber-900 font-medium">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Academic Viva Disclaimer:</strong> This is an experimental risk prediction algorithm built for academic demonstration purposes, not a certified medical diagnosis. Consult a physician.
                  </span>
                </div>

                {/* Direct CTA back to Doctor Search */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setSelectedDoctorForBooking(null);
                    navigate('/doctors');
                  }}
                  className="w-full py-3 px-4 rounded-2xl font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-95 shadow-md flex items-center justify-center gap-2 text-xs"
                >
                  Book a {result.recSpecialty} Specialist Now <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>
            ) : (
              <div className="py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center mx-auto">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Awaiting Patient Vitals</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Fill in your metrics on the left form and click "Run Federated AI Risk Inference" to compute your score.
                </p>
              </div>
            )}

          </div>
        </div>

      </div>

      {/* HOW THIS WORKS COLLAPSIBLE ACCORDION FOR DEMO / VIVA */}
      <div className="glass-card rounded-3xl border border-white/80 shadow-md p-6">
        <button
          onClick={() => setShowHowItWorks(!showHowItWorks)}
          className="w-full flex items-center justify-between text-left focus:outline-none"
        >
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">How FedAvg Federated Learning Works (Viva Breakdown)</h3>
              <p className="text-xs text-slate-500">Click to read plain-language technical architecture details.</p>
            </div>
          </div>
          {showHowItWorks ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
        </button>

        {showHowItWorks && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-6 border-t border-slate-200 mt-4 space-y-4 text-xs text-slate-600 leading-relaxed"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">1. Local Training (Decentralized)</span>
                <p>Each hospital node (e.g. Fortis, Max) trains a local neural network on its private Electronic Health Records (EHR). Raw patient data never crosses hospital firewalls.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">2. Weight Masking & Noise</span>
                <p>Only model weight gradients (Δw) are extracted and encrypted using Laplacian differential privacy noise to prevent reverse-reconstruction attacks.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 block">3. FedAvg Global Aggregation</span>
                <p>The central coordinator calculates the weighted average: W_{t+1} = Σ (n_k / N) * w_k^{t+1}, dispatching the optimized global model back to all clinics.</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );
};

export default AIRiskPrediction;
