import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Award } from 'lucide-react';

export default function SplashScreen({ onStart, onOpenAdmin, onOpenSelinSite }) {
  const headlineWords = ["Emlak ve gayrimenkul", "şirketleri için", "siteler."];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { y: "120%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 75
      }
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between px-6 py-8 md:p-14 z-20 overflow-hidden">
      {/* Ambient Architectural Vignette Backdrop */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden opacity-20">
        <img
          src="/images/hero-monolith.jpg"
          alt="Architectural Mood"
          className="w-full h-full object-cover object-center scale-105 filter blur-[1px] brightness-[0.6] contrast-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/85 to-obsidian/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,#0B0C0E_85%)]" />
      </div>

      {/* Top Editorial Monogram & Badges */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl overflow-hidden border border-gold/30 bg-black/80 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <img
              src="/brand-logo.jpg"
              alt="MediArt Emblem"
              className="w-full h-full object-contain p-1 mix-blend-screen"
            />
          </div>
          <div>
            <span className="font-cinzel text-xs font-bold tracking-epic text-architectural-white block">
              MEDİART
            </span>
            <span className="text-[10px] uppercase tracking-widest text-architectural-muted block">
              Mimari Yaklaşım
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-luxury text-architectural-muted">
          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]" />
            <span>Awwwards & FWA Standartları</span>
          </div>
        </div>
      </div>

      {/* Main Hero Container */}
      <div className="max-w-4xl mx-auto w-full my-auto py-12 text-center flex flex-col items-center">
        {/* Split-Text Reveal Headline */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[5.75rem] font-light leading-[1.08] tracking-tight text-architectural-white mb-8"
        >
          {headlineWords.map((word, idx) => (
            <span key={idx} className="inline-block overflow-hidden mr-3 sm:mr-4 last:mr-0 pb-2">
              <motion.span
                variants={wordVariants}
                className={`inline-block ${idx === 2 ? 'italic font-normal text-gold' : ''}`}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Editorial Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-architectural-muted max-w-2xl font-light leading-relaxed mb-12"
        >
          Klişelerden uzak; danışmanların, gayrimenkul şirketlerinin ve büyük inşaat projelerinin değerini öne çıkaran editoryal dijital deneyimler.
          <span className="block mt-2 font-serif italic text-architectural-white/90 text-sm tracking-wide">
            MediArt Craftsmanship.
          </span>
        </motion.p>

        {/* Primary Luxury CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onStart}
          className="group relative inline-flex items-center gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-gold/40 hover:border-gold backdrop-blur-2xl text-architectural-white font-medium text-sm sm:text-base tracking-luxury uppercase transition-all duration-300 shadow-2xl hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
        >
          {/* Shimmer overlay */}
          <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
          </span>

          <span className="relative z-10 text-gold-light group-hover:text-white transition-colors">
            Deneyimi Başlat
          </span>

          <div className="relative z-10 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center group-hover:bg-gold transition-colors duration-300">
            <ArrowRight className="w-4 h-4 text-gold group-hover:text-obsidian transition-colors" />
          </div>
        </motion.button>

        {/* Direct Link to Selin Karaca Site */}
        {onOpenSelinSite && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="mt-5 relative z-30"
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onOpenSelinSite();
              }}
              className="inline-flex items-center gap-2.5 text-xs font-mono tracking-wider text-gold-light hover:text-white transition-all py-2.5 px-6 rounded-full border border-gold/30 hover:border-gold bg-gold/10 hover:bg-gold/20 shadow-[0_0_20px_rgba(212,175,55,0.15)] cursor-pointer active:scale-95"
            >
              <span>🏛️ Canlı Örnek: Selin Karaca VIP Sitesini Gör</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Bottom Editorial Footer */}
      <div className="max-w-6xl mx-auto w-full pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-architectural-subtle">
        <div className="flex items-center gap-2 tracking-widest uppercase text-[11px]">
          <span className="inline-block w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse" />
          <span>7 Adımlı Kişiselleştirilmiş Analiz</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="font-mono text-[11px] tracking-wider text-architectural-muted/60 select-none">
            TYPEFORM-STYLE EDITORIAL ENGINE •{' '}
            <button
              type="button"
              onClick={onOpenAdmin}
              className="hover:text-gold-light transition-colors duration-300 cursor-pointer focus:outline-none inline"
              title=""
            >
              2026
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
