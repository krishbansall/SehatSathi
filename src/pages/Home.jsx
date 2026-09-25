import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, useAnimate } from 'framer-motion';
import { 
  Stethoscope, 
  ShieldCheck, 
  CalendarCheck, 
  FileText, 
  Activity, 
  BrainCircuit, 
  UserCheck, 
  BellRing, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  Users,
  Award
} from 'lucide-react';
import ParallaxWrapper from '../components/common/ParallaxWrapper';
import FLDiagram from '../components/fl/FLDiagram';

/* ─────────────────────────────────────────────
   SPINNING DASHBOARD HERO CARD
   On mount: card spins 3.5 rotations while chips
   scatter outward, then all settle back.
───────────────────────────────────────────── */
function SpinningDashboard() {
  const [cardScope, animateCard]   = useAnimate();
  const [chip1Scope, animateChip1] = useAnimate();
  const [chip2Scope, animateChip2] = useAnimate();
  const [chip3Scope, animateChip3] = useAnimate();
  const [chip4Scope, animateChip4] = useAnimate();

  React.useEffect(() => {
    const SPIN_DUR  = 2.0;   // seconds for full spin sequence
    const CHIP_DUR  = 1.6;

    // Card: 3.5 full Y rotations then back to a slight tilt
    animateCard(cardScope.current, {
      rotateY: [0, 360, 720, 1080, 1260, 5],   // 3.5 rotations → settle at 5°
      scale:   [1, 1.04, 1.04, 1.04, 1, 1],
    }, {
      duration: SPIN_DUR + 0.6,
      ease: [0.25, 0, 0.35, 1],
      delay: 0.4,
    });

    // Chips scatter while spinning, then snap home
    // chip1 top-left → scatter further top-left
    animateChip1(chip1Scope.current, {
      x: [0, -60, -80, 0],
      y: [0, -50, -70, 0],
      opacity: [1, 0.4, 0.4, 1],
      scale: [1, 0.8, 0.7, 1],
    }, { duration: CHIP_DUR, ease: 'easeInOut', delay: 0.5 });

    // chip2 bottom-right → scatter further bottom-right
    animateChip2(chip2Scope.current, {
      x: [0, 60, 80, 0],
      y: [0, 50, 70, 0],
      opacity: [1, 0.4, 0.4, 1],
      scale: [1, 0.8, 0.7, 1],
    }, { duration: CHIP_DUR, ease: 'easeInOut', delay: 0.6 });

    // chip3 right-middle → scatter right
    animateChip3(chip3Scope.current, {
      x: [0, 70, 90, 0],
      y: [0, 20, 10, 0],
      opacity: [1, 0.4, 0.4, 1],
      scale: [1, 0.8, 0.7, 1],
    }, { duration: CHIP_DUR, ease: 'easeInOut', delay: 0.7 });

    // chip4 top-right → scatter top-right
    animateChip4(chip4Scope.current, {
      x: [0, 50, 70, 0],
      y: [0, -60, -80, 0],
      opacity: [1, 0.4, 0.4, 1],
      scale: [1, 0.8, 0.7, 1],
    }, { duration: CHIP_DUR, ease: 'easeInOut', delay: 0.55 });
  }, []);

  return (
    <div className="relative mx-auto max-w-md" style={{ perspective: '1000px' }}>

      {/* ── Main dashboard card (spins) ── */}
      <div ref={cardScope} className="glass-card rounded-3xl p-6 border border-[var(--border)] shadow-2xl space-y-5 bg-[var(--bg-card)]" style={{ transformStyle: 'preserve-3d' }}>
        <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] font-bold text-sm flex items-center justify-center">AM</div>
            <div>
              <h4 className="text-xs font-bold text-[var(--text-primary)]">Aarav Mehta</h4>
              <span className="text-[10px] text-[var(--text-muted)]">Patient ID: #PAT-8921</span>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--success)]/15 text-[var(--success)] border border-[var(--success)]/30">Vitals Healthy</span>
        </div>

        {/* AI Risk box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[var(--bg-primary)] to-[var(--bg-card)] border border-[var(--border)] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[var(--accent-primary)] flex items-center gap-1">
              <BrainCircuit className="w-3.5 h-3.5 animate-pulse" /> FL AI Risk Index
            </span>
            <span className="text-[10px] text-[var(--text-muted)] font-mono">FedAvg v4.2</span>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-extrabold text-[var(--text-primary)]">Low Risk</span>
            <span className="text-xs text-[var(--success)] font-bold">(14% Score)</span>
          </div>
          <div className="w-full bg-[var(--border)] rounded-full h-1.5 overflow-hidden">
            <motion.div
              className="bg-[var(--success)] h-full"
              initial={{ width: 0 }}
              animate={{ width: '14%' }}
              transition={{ delay: 1.8, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Appointment row */}
        <div className="p-3.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-[var(--accent-primary)]/10 text-[var(--accent-primary)]">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[var(--text-primary)]">Dr. Ananya Sharma</h5>
              <span className="text-[10px] text-[var(--text-muted)]">Cardiology • Tomorrow 10:30 AM</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[var(--success)]/15 text-[var(--success)]">Confirmed</span>
        </div>
      </div>

      {/* ── Chip 1 — 500+ Doctors (top-left) ── */}
      <div ref={chip1Scope} className="absolute -top-6 -left-6 glass-card p-3 rounded-2xl border border-[var(--border)] shadow-xl flex items-center space-x-3 bg-[var(--bg-card)]">
        <div className="p-2 rounded-xl bg-[var(--accent-primary)] text-white"><Users className="w-4 h-4" /></div>
        <div>
          <span className="text-xs font-extrabold text-[var(--text-primary)] block">500+ Doctors</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Across 18+ Specialties</span>
        </div>
      </div>

      {/* ── Chip 2 — Privacy (bottom-right) ── */}
      <div ref={chip2Scope} className="absolute -bottom-6 -right-6 glass-card p-3 rounded-2xl border border-[var(--border)] shadow-xl flex items-center space-x-3 bg-[var(--bg-card)]">
        <div className="p-2 rounded-xl bg-[var(--accent-secondary)] text-white"><Lock className="w-4 h-4" /></div>
        <div>
          <span className="text-xs font-extrabold text-[var(--text-primary)] block">Privacy-First AI</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Zero Raw Data Shared</span>
        </div>
      </div>

      {/* ── Chip 3 — Live Vitals (middle-right) ── */}
      <div ref={chip3Scope} className="absolute top-1/2 -right-10 -translate-y-1/2 glass-card p-3 rounded-2xl border border-[var(--border)] shadow-xl flex items-center space-x-2 bg-[var(--bg-card)]">
        <motion.div animate={{ scale: [1, 1.22, 1] }} transition={{ duration: 1.1, repeat: Infinity }}
          className="p-2 rounded-xl bg-red-500/10 text-red-400">
          <Activity className="w-4 h-4" />
        </motion.div>
        <div>
          <span className="text-xs font-extrabold text-[var(--text-primary)] block">Live Vitals</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Real-time</span>
        </div>
      </div>

      {/* ── Chip 4 — Top Rated (top-right) ── */}
      <div ref={chip4Scope} className="absolute -top-4 right-8 glass-card p-3 rounded-2xl border border-[var(--border)] shadow-xl flex items-center space-x-2 bg-[var(--bg-card)]">
        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400"><Award className="w-4 h-4" /></div>
        <div>
          <span className="text-xs font-extrabold text-[var(--text-primary)] block">Top Rated</span>
          <span className="text-[10px] text-[var(--text-muted)] block">Board certified</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLIP CARD  (click → 360° Y spin, shows back)
───────────────────────────────────────────── */
function FlipCard({ item }) {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <div
      className="cursor-pointer h-64"
      style={{ perspective: '1200px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 360 : 0 }}
        transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* FRONT FACE */}
        <div
          className="absolute inset-0 glass-card p-8 rounded-3xl border border-[var(--border)] shadow-lg flex flex-col justify-between bg-[var(--bg-card)]"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] shadow-sm flex items-center justify-center">
                {item.icon}
              </div>
              <span className="text-4xl font-black text-[var(--text-muted)]/40 font-mono">{item.step}</span>
            </div>
            <h3 className="text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
          </div>
          <p className="text-[10px] text-[var(--accent-primary)] font-semibold mt-2 flex items-center gap-1">
            <Zap className="w-3 h-3" /> Click to flip
          </p>
        </div>

        {/* BACK FACE */}
        <div
          className="absolute inset-0 rounded-3xl p-8 flex flex-col justify-center items-center text-center space-y-4"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #0D9488, #6366F1)',
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            {item.backIcon}
          </div>
          <h3 className="text-xl font-bold text-white">{item.backTitle}</h3>
          <p className="text-sm text-white/80 leading-relaxed">{item.backDesc}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AIRPLANE-LAUNCH CTA BUTTON
───────────────────────────────────────────── */
function HeroNavButton({ to, variant, children }) {
  const navigate = useNavigate();
  const [launching, setLaunching] = React.useState(false);

  const handleClick = () => {
    setLaunching(true);
    setTimeout(() => {
      navigate(to);
      setLaunching(false);
    }, 700);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileTap={{ scale: 0.97 }}
      disabled={launching}
      className={`relative overflow-hidden px-7 py-3.5 rounded-2xl font-bold text-center flex items-center justify-center gap-2 transition-all min-w-[200px] ${
        variant === 'primary'
          ? 'text-white bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] shadow-xl shadow-[var(--accent-primary)]/25 hover:opacity-95'
          : 'text-[var(--text-primary)] bg-[var(--bg-card)] border border-[var(--border)] shadow-md hover:border-[var(--accent-primary)]'
      }`}
    >
      {/* Airplane that shoots up-right */}
      <AnimatePresence>
        {launching && (
          <motion.span
            key="plane"
            initial={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            animate={{ opacity: 0, x: 100, y: -80, rotate: -30 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: 'easeIn' }}
            className="absolute pointer-events-none text-xl z-10"
          >
            ✈️
          </motion.span>
        )}
      </AnimatePresence>

      {/* Normal label fades out when launching */}
      <motion.span
        animate={launching ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────── */
export const Home = () => {
  const { scrollY } = useScroll();
  const heroBlobY  = useTransform(scrollY, [0, 500], [0, 150]);
  const heroCardY  = useTransform(scrollY, [0, 500], [0, 60]);
  const heroTextY  = useTransform(scrollY, [0, 500], [0, -20]);

  return (
    <div className="space-y-24 pb-16 overflow-hidden">

      {/* ══════════ HERO ══════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 gradient-bg-hero min-h-[90vh] flex items-center transition-colors duration-300">

        {/* Parallax blobs */}
        <motion.div style={{ y: heroBlobY }} className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="gradient-blob w-[500px] h-[500px] bg-[var(--accent-primary)] -top-20 -left-20" />
          <div className="gradient-blob w-[600px] h-[600px] bg-[var(--accent-secondary)] top-40 right-0" />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-72 h-72 rounded-full bg-[var(--accent-primary)] blur-3xl bottom-10 left-1/3"
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            {/* ── LEFT: headline + CTA ── */}
            <motion.div style={{ y: heroTextY }} className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 text-[var(--accent-primary)] text-xs font-bold shadow-xs">
                <ShieldCheck className="w-4 h-4 animate-pulse" />
                <span>Privacy-First via Federated Learning</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] tracking-tight leading-[1.15]">
                Your Health, <br />
                <span className="gradient-text">One Step Ahead.</span>
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed max-w-xl">
                Seamless doctor appointment booking, instant digital health record access, and collaborative AI risk prediction powered by <strong>Federated Learning</strong> — where your data never leaves your hospital.
              </p>

              {/* ✈️ CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <HeroNavButton to="/auth?mode=register" variant="primary">
                  Get Started <ArrowRight className="w-4 h-4" />
                </HeroNavButton>
                <HeroNavButton to="/doctors" variant="secondary">
                  <Stethoscope className="w-4 h-4 text-[var(--accent-primary)]" /> Book an Appointment
                </HeroNavButton>
              </div>

              <div className="pt-4 flex items-center space-x-6 text-xs text-[var(--text-muted)] font-semibold">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--success)]" /> HIPAA-Inspired Security</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[var(--success)]" /> Verified Specialists</span>
              </div>
            </motion.div>

            {/* ── RIGHT: spinning dashboard card + scatter chips ── */}
            <motion.div style={{ y: heroCardY }} className="lg:col-span-5 relative">
              <SpinningDashboard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ HOW IT WORKS — 360° FLIP CARDS ══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxWrapper className="text-center space-y-3 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 uppercase tracking-wider">
            Simple 3-Step Flow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            How SehatSathi Empowers Your Care
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-muted)] max-w-2xl mx-auto">
            Experience smooth digital healthcare navigation from registration to AI risk profiling.
          </p>
        </ParallaxWrapper>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: '01',
              title: 'Create Your Health Profile',
              desc: 'Sign up in under 60 seconds as a Patient or Specialist. Secure your digital health vault.',
              backTitle: 'Why it matters',
              backDesc: 'Your secure profile is the foundation of personalized care — doctors access only what you share.',
              icon:     <UserCheck className="w-7 h-7 text-[var(--accent-primary)]" />,
              backIcon: <ShieldCheck className="w-8 h-8 text-white" />,
            },
            {
              step: '02',
              title: 'Book verified Specialists',
              desc: 'Filter by specialty, fee, ratings, and instant today availability. Confirm dates in 3 clicks.',
              backTitle: 'How it works',
              backDesc: 'Real-time slot availability synced with doctor schedules — no phone calls, no waiting rooms.',
              icon:     <CalendarCheck className="w-7 h-7 text-[var(--accent-secondary)]" />,
              backIcon: <CalendarCheck className="w-8 h-8 text-white" />,
            },
            {
              step: '03',
              title: 'Get FL AI Risk Insights',
              desc: 'Check your disease risk using collaborative models trained across hospitals without sacrificing privacy.',
              backTitle: 'Powered by FL',
              backDesc: 'Federated Learning lets AI learn from hospitals worldwide without your raw data ever leaving your device.',
              icon:     <BrainCircuit className="w-7 h-7 text-[var(--accent-primary)]" />,
              backIcon: <BrainCircuit className="w-8 h-8 text-white" />,
            }
          ].map((item, idx) => (
            <ParallaxWrapper key={item.step} delay={idx * 0.15}>
              <FlipCard item={item} />
            </ParallaxWrapper>
          ))}
        </div>
      </section>

      {/* ══════════ FEATURES GRID ══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxWrapper className="text-center space-y-3 mb-16">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border border-[var(--accent-secondary)]/30 uppercase tracking-wider">
            All-In-One Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
            Engineered for Modern Clinical Ecosystems
          </h2>
        </ParallaxWrapper>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: 'Practo-Style Doctor Search',    desc: 'Real-time filtering by symptom, location, experience, ratings, and today availability.',                        icon: <Stethoscope className="w-6 h-6 text-[var(--accent-primary)]" />,   link: '/doctors' },
            { title: 'Digital Medical Records',        desc: 'Centralized patient health vault for lab reports, ECG scans, and doctor prescriptions.',                      icon: <FileText    className="w-6 h-6 text-[var(--accent-secondary)]" />, link: '/patient-dashboard' },
            { title: 'Doctor Workstation',             desc: 'Dedicated clinical dashboard with appointment queues, diagnosis logger, & prescription builder.',             icon: <Activity    className="w-6 h-6 text-[var(--accent-primary)]" />,   link: '/doctor-dashboard' },
            { title: 'FL AI Risk Engine',              desc: 'Interactive risk assessment gauge built with FedAvg privacy-preserving machine learning.',                     icon: <BrainCircuit className="w-6 h-6 text-[var(--accent-secondary)]" />, link: '/ai-risk' },
            { title: 'Decentralized Data Security',    desc: 'Raw Electronic Health Records (EHR) remain strictly inside hospital servers.',                                icon: <ShieldCheck  className="w-6 h-6 text-[var(--success)]" />,           link: '#fl-privacy' },
            { title: 'Instant Appointment Toasts',     desc: 'Real-time notification system tracking appointment requests from Pending to Confirmed.',                      icon: <BellRing    className="w-6 h-6 text-[var(--warning)]" />,           link: '/book' },
          ].map((feat, idx) => (
            <ParallaxWrapper key={feat.title} delay={idx * 0.1}>
              <Link to={feat.link} className="block group">
                <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}
                  className="glass-card glass-card-hover p-6 rounded-3xl border border-[var(--border)] shadow-md group-hover:border-[var(--accent-primary)] transition-all h-full bg-[var(--bg-card)]">
                  <div className="p-3 w-12 h-12 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border)] shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {feat.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2">{feat.title}</h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{feat.desc}</p>
                </motion.div>
              </Link>
            </ParallaxWrapper>
          ))}
        </div>
      </section>

      {/* ══════════ FL PRIVACY ══════════ */}
      <section id="fl-privacy" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ParallaxWrapper><FLDiagram /></ParallaxWrapper>
      </section>

      {/* ══════════ STATS BAND ══════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 md:p-12 border border-[var(--border)] shadow-xl bg-[var(--bg-card)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div><span className="text-3xl md:text-4xl font-extrabold text-[var(--text-primary)] block font-mono">10,000+</span><span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1 block">Appointments Booked</span></div>
            <div><span className="text-3xl md:text-4xl font-extrabold text-[var(--accent-primary)] block font-mono">500+</span><span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1 block">Medical Specialists</span></div>
            <div><span className="text-3xl md:text-4xl font-extrabold text-[var(--accent-secondary)] block font-mono">99.9%</span><span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1 block">Data Privacy Rating</span></div>
            <div><span className="text-3xl md:text-4xl font-extrabold text-[var(--accent-primary)] block font-mono">3 Hospital</span><span className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mt-1 block">FL Node Clusters</span></div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
