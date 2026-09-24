import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Shield, Stethoscope, Heart, Lock, Globe, ArrowUpRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[var(--bg-card)] text-[var(--text-primary)] pt-16 pb-12 border-t border-[var(--border)] relative overflow-hidden transition-colors duration-300">
      {/* Soft gradient background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[var(--accent-primary)]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-[var(--accent-secondary)]/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--border)]">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[var(--accent-primary)] to-[var(--accent-secondary)] flex items-center justify-center text-white shadow-lg">
                <Activity className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold text-[var(--text-primary)] tracking-tight">
                Sehat<span className="text-[var(--accent-primary)]">Sathi</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-sm">
              Next-generation privacy-first healthcare platform combining seamless appointment scheduling, digital health record synchronization, and AI risk prediction via Federated Learning.
            </p>
            <div className="flex items-center space-x-3 text-xs text-[var(--text-muted)] pt-2">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                <Lock className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
                Zero Data Extraction
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                <Shield className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
                FedAvg Encrypted
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Patient Services
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[var(--text-muted)]">
              <li>
                <Link to="/doctors" className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1">
                  Find & Filter Doctors <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
                </Link>
              </li>
              <li>
                <Link to="/book" className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1">
                  Book Appointment <ArrowUpRight className="w-3 h-3 text-[var(--text-muted)]" />
                </Link>
              </li>
              <li>
                <Link to="/patient-dashboard" className="hover:text-[var(--accent-primary)] transition-colors">
                  Digital Health Vault
                </Link>
              </li>
              <li>
                <Link to="/ai-risk" className="hover:text-[var(--accent-primary)] transition-colors flex items-center gap-1">
                  AI Risk Assessment <span className="text-[10px] text-[var(--accent-primary)] bg-[var(--accent-primary)]/10 px-1.5 py-0.5 rounded border border-[var(--accent-primary)]/30 font-bold">FL</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* For Doctors */}
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Clinical Portal
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[var(--text-muted)]">
              <li>
                <Link to="/doctor-dashboard" className="hover:text-[var(--accent-primary)] transition-colors">
                  Doctor Workstation
                </Link>
              </li>
              <li>
                <Link to="/auth?role=doctor" className="hover:text-[var(--accent-primary)] transition-colors">
                  Join as Medical Specialist
                </Link>
              </li>
              <li>
                <a href="#fl-privacy" className="hover:text-[var(--accent-primary)] transition-colors">
                  Federated Clinical Network
                </a>
              </li>
              <li>
                <Link to="/auth" className="hover:text-[var(--accent-primary)] transition-colors">
                  Institutional Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology & Security */}
          <div>
            <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Privacy & Security
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-[var(--text-muted)]">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--success)]" />
                HIPAA-Inspired Security
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)]" />
                Decentralized Model Learning
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent-secondary)]" />
                Differential Privacy Noise
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--warning)]" />
                End-to-End Encryption
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[var(--text-muted)] gap-4">
          <p>© 2026 SehatSathi Healthcare System. Academic Viva & Portfolio Build.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[var(--text-primary)] cursor-pointer">Federated Learning Whitepaper</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
