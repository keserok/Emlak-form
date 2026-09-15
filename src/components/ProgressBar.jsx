import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({ currentStep, totalSteps, agencyName }) {
  const progressPercent = ((currentStep) / totalSteps) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      {/* Top Animated Gold Progress Line */}
      <div className="w-full h-[2px] bg-white/5 relative overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze relative"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle Lead Pulse Glow on the tip */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold blur-[3px] animate-pulse" />
        </motion.div>
      </div>

      {/* Top Navigation Bar */}
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Brand Monogram & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md overflow-hidden border border-gold/30 bg-black/80 flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.2)]">
            <img
              src="/brand-logo.jpg"
              alt="MediArt Emblem"
              className="w-full h-full object-contain p-0.5 mix-blend-screen"
            />
          </div>
          <span className="font-cinzel text-xs font-semibold tracking-epic text-gold">MEDİART</span>
          <span className="text-white/20 text-xs font-light">|</span>
          <span className="text-[11px] font-sans text-architectural-muted/80 tracking-widest uppercase hidden sm:inline-block">
            Dijital Deneyim Mimarı
          </span>
        </div>

        {/* Right: Agency Name & Step Counter */}
        <div className="flex items-center gap-5 z-10">
          {agencyName && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.02] border border-white/5 text-xs text-architectural-white/70">
              <span className="w-1.5 h-1.5 rounded-full bg-gold/60" />
              <span className="font-medium truncate max-w-[160px]">{agencyName}</span>
            </div>
          )}

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-gold font-semibold tracking-wider">
              {String(currentStep).padStart(2, '0')}
            </span>
            <span className="text-architectural-subtle">/</span>
            <span className="text-architectural-subtle">
              {String(totalSteps).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
