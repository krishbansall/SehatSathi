import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  User, 
  Stethoscope, 
  Lock, 
  Mail, 
  Phone, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Eye,
  EyeOff,
  Activity,
  FileCheck,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, register, user } = useAuth();
  const { addToast } = useToast();

  const [mode, setMode] = useState(searchParams.get('mode') === 'register' ? 'register' : 'login');
  const [role, setRole] = useState(searchParams.get('role') === 'doctor' ? 'doctor' : 'patient');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    specialization: 'Cardiology',
    licenseNo: '',
    experience: ''
  });

  const [errors, setErrors] = useState({});

  // Taglines for left illustration side
  const taglines = [
    { title: 'Privacy-First Clinical AI', sub: 'Your raw health data stays on-premise while models learn.' },
    { title: 'Instant Specialist Booking', sub: 'Access 500+ top doctors with real-time slot availability.' },
    { title: 'Unified Digital Health Vault', sub: 'Keep all lab reports and prescriptions secured in one place.' }
  ];
  const [activeTagline, setActiveTagline] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTagline((prev) => (prev + 1) % taglines.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email address is required';
    if (!formData.password) newErrors.password = 'Password is required';
    
    if (mode === 'register') {
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
      if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (role === 'doctor') {
        if (!formData.licenseNo) newErrors.licenseNo = 'Medical license number is required';
        if (!formData.experience) newErrors.experience = 'Years of experience is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      let userRole;
      if (mode === 'register') {
        userRole = await register({ ...formData, role });
        addToast(`Welcome to SehatSathi! Registered successfully as ${role}.`, 'success');
      } else {
        userRole = await login(formData.email, formData.password);
        addToast(`Signed in successfully!`, 'success');
      }

      if (userRole === 'doctor') {
        navigate('/doctor-dashboard');
      } else {
        navigate('/patient-dashboard');
      }
    } catch (err) {
      addToast(err.message || 'Authentication failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] pt-24 pb-12 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="w-full glass-card rounded-3xl border border-white/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
        
        {/* LEFT PANEL: Rich background image + overlays */}
        <div className="lg:col-span-5 text-white flex flex-col justify-between relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #0B1A2C 0%, #0F2E2B 50%, #1A1040 100%)',
          }}
        >
          {/* Background image from Unsplash (healthcare theme) */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80&auto=format&fit=crop')`,
            }}
          />

          {/* Multi-layer gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-slate-900/70 to-indigo-950/90" />

          {/* Animated ambient orbs */}
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-0 right-0 w-72 h-72 bg-teal-400 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl pointer-events-none"
          />

          {/* Floating decorative cross/plus icons (medical) */}
          {[
            { top: '12%', left: '10%', size: 16, delay: 0 },
            { top: '65%', left: '75%', size: 12, delay: 1.5 },
            { top: '40%', left: '85%', size: 10, delay: 0.8 },
            { top: '80%', left: '20%', size: 14, delay: 2.2 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
              className="absolute text-teal-300 pointer-events-none font-light select-none"
              style={{ top: pos.top, left: pos.left, fontSize: pos.size }}
            >
              ✚
            </motion.div>
          ))}

          {/* Top Brand Header */}
          <div className="relative z-10 p-8 sm:p-12 space-y-2">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-teal-500/30">
                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-7 h-7">
                  <path d="M18 3 L32 9 L32 20 C32 28 18 33 18 33 C18 33 4 28 4 20 L4 9 Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <polyline points="7,19 11,19 13,13 16,25 19,15 21,22 24,22 28,19" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-extrabold tracking-tight text-white leading-none flex items-baseline gap-0.5">
                  Sehat<span className="text-teal-300">Sathi</span>
                  <span className="ml-1 text-[9px] font-black text-blue-300 uppercase tracking-widest align-super leading-none">AI</span>
                </h2>
                <p className="text-[10px] text-teal-400 font-bold uppercase tracking-widest">Federated Health</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 font-medium">Federated Health Architecture</p>
          </div>

          {/* Center Rotating Tagline Carousel */}
          <div className="relative z-10 px-8 sm:px-12 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTagline}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-3"
              >
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
                  Key Advantage #{activeTagline + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {taglines[activeTagline].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {taglines[activeTagline].sub}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex space-x-2 pt-6">
              {taglines.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTagline(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    activeTagline === i ? 'w-8 bg-teal-400' : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Bottom Trust Badge */}
          <div className="relative z-10 px-8 sm:px-12 pb-8 pt-4 border-t border-slate-800/60 flex items-center space-x-3 text-xs text-slate-400 font-medium">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <span>Encrypted with FedAvg differential noise budget.</span>
          </div>
        </div>

        {/* RIGHT PANEL: AUTH FORM CARD */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-white/70 backdrop-blur-md">
          
          {/* Mode Tabs & Role Selector */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200">
                <button
                  onClick={() => setMode('login')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    mode === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setMode('register')}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                    mode === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Role Toggle Switch */}
              <div className="flex items-center space-x-1 bg-teal-50 p-1 rounded-xl border border-teal-200 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setRole('patient')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    role === 'patient' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Patient
                </button>
                <button
                  type="button"
                  onClick={() => setRole('doctor')}
                  className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                    role === 'doctor' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-500'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5" /> Doctor
                </button>
              </div>
            </div>

            <h3 className="text-xl font-extrabold text-slate-900">
              {mode === 'login' ? `Sign In as ${role === 'doctor' ? 'Medical Doctor' : 'Patient'}` : `Register ${role === 'doctor' ? 'Doctor Account' : 'Patient Account'}`}
            </h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Aarav Mehta"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 shadow-xs"
                  />
                </div>
                {errors.fullName && <span className="text-[11px] text-rose-500 font-semibold">{errors.fullName}</span>}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 shadow-xs"
                  />
                </div>
                {errors.email && <span className="text-[11px] text-rose-500 font-semibold">{errors.email}</span>}
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 shadow-xs"
                    />
                  </div>
                  {errors.phone && <span className="text-[11px] text-rose-500 font-semibold">{errors.phone}</span>}
                </div>
              )}
            </div>

            {/* Conditional Doctor Fields */}
            {mode === 'register' && role === 'doctor' && (
              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 space-y-3">
                <span className="text-xs font-bold text-teal-800 flex items-center gap-1.5 uppercase tracking-wider">
                  <FileCheck className="w-4 h-4 text-teal-600" /> Doctor Verification Specs
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Specialization</label>
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Endocrinology">Endocrinology</option>
                      <option value="Pulmonology">Pulmonology</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Neurology">Neurology</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">License No.</label>
                    <input
                      type="text"
                      name="licenseNo"
                      value={formData.licenseNo}
                      onChange={handleChange}
                      placeholder="MCI-88912"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none"
                    />
                    {errors.licenseNo && <span className="text-[10px] text-rose-500">{errors.licenseNo}</span>}
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">Years Exp.</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="e.g. 12"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none"
                    />
                    {errors.experience && <span className="text-[10px] text-rose-500">{errors.experience}</span>}
                  </div>
                </div>
              </div>
            )}

            {/* Password Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <span className="text-[11px] text-rose-500 font-semibold">{errors.password}</span>}
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:border-teal-500 shadow-xs"
                    />
                  </div>
                  {errors.confirmPassword && <span className="text-[11px] text-rose-500 font-semibold">{errors.confirmPassword}</span>}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl font-bold text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:opacity-95 shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Authenticating…
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In to Account' : 'Complete Registration'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Trust badges footer row */}
          <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-center space-x-6 text-xs text-slate-500 font-semibold">
            <span className="flex items-center gap-1">
              🔒 HIPAA-inspired privacy
            </span>
            <span className="flex items-center gap-1">
              🛡️ Federated Learning secured
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
