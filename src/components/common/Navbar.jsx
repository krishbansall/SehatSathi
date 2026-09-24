import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, 
  Stethoscope, 
  Calendar, 
  BrainCircuit, 
  User, 
  UserCheck, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Doctors', path: '/doctors' },
    { name: 'Locator', path: '/locator' },
    { name: 'Book Appointment', path: '/book' },
    { name: 'AI Risk Prediction', path: '/ai-risk', badge: 'FL Powered' },
    {
      name: user?.role === 'doctor' ? 'Doctor Dashboard' : 'My Records & History',
      path: user?.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'
    }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'glass-nav shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 group">
            {/* Custom SVG logo mark: shield + heartbeat */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center shadow-md shadow-[var(--accent-primary)]/20 group-hover:scale-105 transition-transform overflow-hidden">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                {/* Shield shape */}
                <path d="M18 3 L32 9 L32 20 C32 28 18 33 18 33 C18 33 4 28 4 20 L4 9 Z" fill="white" fillOpacity="0.15" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                {/* Heartbeat ECG line across shield */}
                <polyline points="7,19 11,19 13,13 16,25 19,15 21,22 24,22 28,19" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-[var(--text-primary)] flex items-baseline gap-0.5">
                Sehat<span className="text-[var(--accent-primary)]">Sathi</span>
                <span className="ml-1 text-[9px] font-black text-[var(--accent-secondary)] uppercase tracking-widest align-super leading-none">AI</span>
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-primary)] -mt-1">
                Federated Health
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 bg-[var(--bg-card)]/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-[var(--border)] shadow-xs">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 shadow-xs'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.name}
                    {link.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white rounded-full uppercase tracking-wider">
                        {link.badge}
                      </span>
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* User Controls & Demo Role Toggle */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.05 }}
              onClick={toggleTheme}
              aria-label="Toggle dark and light mode"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all shadow-xs flex items-center justify-center cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.25 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
                  ) : (
                    <Moon className="w-4 h-4 text-indigo-600 fill-indigo-600/20" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>

            {/* Quick Demo Role Switcher — animated sliding pill */}
            <div className="relative flex items-center bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border)] text-xs font-semibold overflow-hidden">
              {['patient', 'doctor'].map((r) => {
                const isActive = user?.role === r;
                return (
                  <button
                    key={r}
                    onClick={() => switchRole(r)}
                    className="relative z-10 px-3 py-1.5 rounded-lg transition-colors duration-200 flex items-center gap-1.5 min-w-[72px] justify-center"
                    style={{ color: isActive ? 'white' : 'var(--text-muted)' }}
                    title={`Switch to ${r.charAt(0).toUpperCase() + r.slice(1)} View`}
                  >
                    {/* Sliding background pill */}
                    {isActive && (
                      <motion.span
                        layoutId="role-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' }}
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    )}
                    {/* Icon crossfade */}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={r + '-icon'}
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="flex items-center"
                        >
                          {r === 'patient' ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                            </svg>
                          )}
                        </motion.span>
                      </AnimatePresence>
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </span>
                  </button>
                );
              })}
            </div>

            {user ? (
              <div className="flex items-center space-x-3">
                <Link
                  to={user.role === 'doctor' ? '/doctor-dashboard' : '/patient-dashboard'}
                  className="flex items-center space-x-2 pl-2 pr-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border)] rounded-full shadow-xs hover:border-[var(--accent-primary)] transition-colors"
                >
                  <img
                    src={user.photo}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover border border-[var(--accent-primary)]"
                  />
                  <span className="text-xs font-semibold text-[var(--text-primary)] max-w-[100px] truncate">
                    {user.name}
                  </span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="p-2 text-[var(--text-muted)] hover:text-rose-500 rounded-full hover:bg-rose-500/10 transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/auth"
                  className="px-4 py-2 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth?mode=register"
                  className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-xl shadow-md shadow-[var(--accent-primary)]/20 hover:opacity-95 hover:scale-105 transition-all"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu & Theme Button */}
          <div className="flex lg:hidden items-center space-x-2">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-primary)]"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-indigo-600" />
              )}
            </motion.button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[var(--text-primary)] rounded-xl bg-[var(--bg-card)] border border-[var(--border)] shadow-xs"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden glass-card mt-3 mx-4 p-4 rounded-2xl border border-[var(--border)] shadow-2xl space-y-3 bg-[var(--bg-card)]">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
            <span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              Demo Persona Switch
            </span>
            <div className="flex items-center bg-[var(--bg-primary)] p-1 rounded-lg text-xs font-semibold border border-[var(--border)]">
              <button
                onClick={() => {
                  switchRole('patient');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-md ${
                  user?.role === 'patient' ? 'bg-[var(--bg-card)] text-[var(--accent-primary)] shadow-xs font-bold' : 'text-[var(--text-muted)]'
                }`}
              >
                Patient
              </button>
              <button
                onClick={() => {
                  switchRole('doctor');
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-1 rounded-md ${
                  user?.role === 'doctor' ? 'bg-[var(--accent-primary)] text-white font-bold' : 'text-[var(--text-muted)]'
                }`}
              >
                Doctor
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  location.pathname === link.path
                    ? 'bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="px-2 py-0.5 text-[9px] font-bold bg-[var(--accent-primary)] text-white rounded-full">
                      {link.badge}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {user ? (
            <div className="pt-3 border-t border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src={user.photo} alt={user.name} className="w-8 h-8 rounded-full object-cover border border-[var(--accent-primary)]" />
                <span className="text-xs font-bold text-[var(--text-primary)]">{user.name}</span>
              </div>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-semibold text-rose-500 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 border-t border-[var(--border)] grid grid-cols-2 gap-2">
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-bold text-[var(--text-primary)] bg-[var(--bg-primary)] rounded-xl border border-[var(--border)]"
              >
                Sign In
              </Link>
              <Link
                to="/auth?mode=register"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2 text-xs font-bold text-white bg-[var(--accent-primary)] rounded-xl"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
