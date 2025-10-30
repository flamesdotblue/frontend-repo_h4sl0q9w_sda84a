import { useEffect, useState } from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Briefcase } from 'lucide-react';

function AnimatedNumber({ value, duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const startTime = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(value * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return <span>{display.toLocaleString()}</span>;
}

export default function Hero3D() {
  return (
    <section className="relative min-h-[84vh] w-full overflow-hidden bg-slate-950">
      {/* 3D Cover */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient to improve text contrast. Pointer events disabled per spec. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/60 to-slate-950" />

      {/* Content */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-24 text-center text-white sm:pt-28 md:pt-32">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium tracking-wide text-sky-200 backdrop-blur">
          <ShieldBadge /> Trusted by businesses & licensed brokers
        </span>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          Unified Trade Compliance & Broker Marketplace
        </h1>
        <p className="mt-4 max-w-2xl text-base text-slate-300 sm:text-lg">
          Post jobs, compare broker bids, manage documents, chat in real-time, and handle escrow payments — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition hover:bg-sky-600"
          >
            <Rocket className="h-4 w-4" /> Get Started
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/15"
          >
            <Briefcase className="h-4 w-4" /> Post a Job
          </a>
        </div>

        <div className="mt-12 grid w-full max-w-4xl grid-cols-3 gap-4">
          <Stat label="Registered Users" value={12840} />
          <Stat label="Projects Completed" value={3421} />
          <Stat label="Certifications Handled" value={9820} />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left">
      <div className="text-2xl font-bold text-white">
        <AnimatedNumber value={value} />+
      </div>
      <div className="text-xs text-slate-300">{label}</div>
    </div>
  );
}

function ShieldBadge() {
  return (
    <svg className="h-4 w-4 text-sky-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l7 3v6c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V5l7-3z" />
      <path d="M10.5 12.5l1.5 1.5 3.5-3.5" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
