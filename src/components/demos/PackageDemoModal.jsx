import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Check, 
  Crown,
  Zap,
  Building,
  Building2,
  Lock
} from 'lucide-react';
import StandardDemoSite from './StandardDemoSite';
import AdvancedDemoSite from './AdvancedDemoSite';
import PremiumDemoSite from './PremiumDemoSite';
import ProjectDemoSite from './ProjectDemoSite';
import LockedDemoScreen from './LockedDemoScreen';

export default function PackageDemoModal({ 
  initialTier = 'advanced', 
  onClose, 
  onSelectPackage 
}) {
  const [activeTier, setActiveTier] = useState(initialTier);
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  const isLockedTier = activeTier === 'premium' || activeTier === 'project';

  const tierMeta = {
    standard: {
      name: 'Standart Paket',
      subtitle: 'Deniz Arslan • Butik Gayrimenkul'
    },
    advanced: {
      name: 'Üst Düzey Paket',
      subtitle: 'Selin Karaca • Göktürk VIP Gayrimenkul'
    },
    premium: {
      name: 'Premium Paket',
      subtitle: 'Aureus Monolith • Private Luxury & Off-Market Estates'
    },
    project: {
      name: 'Büyük Gayrimenkul Projeleri',
      subtitle: 'Viera Residence & Panorama • İnteraktif Ünite Seçici & Lansman'
    }
  };

  const currentInfo = tierMeta[activeTier] || tierMeta.advanced;

  const handleSelectAndClose = () => {
    onSelectPackage(activeTier);
    onClose();
  };

  const tierOptions = [
    { id: 'standard', label: 'Standart', icon: Building, color: 'text-emerald-300', activeBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200' },
    { id: 'advanced', label: 'Üst Düzey (Selin Hanım)', icon: Zap, color: 'text-blue-300', activeBg: 'bg-blue-500/20 border-blue-500/40 text-blue-200' },
    { id: 'premium', label: 'Premium', icon: Crown, color: 'text-[#D4AF37]', activeBg: 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]', isLocked: true },
    { id: 'project', label: 'Büyük Projeler', icon: Building2, color: 'text-amber-300', activeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-200', isLocked: true }
  ];

  const deviceOptions = [
    { id: 'desktop', icon: Monitor, title: 'Masaüstü Görünümü' },
    { id: 'tablet', icon: Tablet, title: 'Tablet Görünümü (768px)' },
    { id: 'mobile', icon: Smartphone, title: 'Mobil Görünümü (390px iPhone)' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-obsidian text-white overflow-hidden animate-fade-in">
      
      {/* Top Controller Bar */}
      <div className="bg-[#111317] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
        
        {/* Left: Close / Return */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Dosyaya Dön</span>
          </button>

          <div className="hidden sm:block h-6 w-[1px] bg-white/10" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-white flex items-center gap-2">
                {currentInfo.name} {isLockedTier ? 'Mimari Önizleme' : 'Canlı Örnek Sitesi'}
                {isLockedTier && (
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold uppercase flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    KİLİTLİ
                  </span>
                )}
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {currentInfo.subtitle}
            </div>
          </div>
        </div>

        {/* Center: Package Switcher Pills with smooth sliding indicator */}
        <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/10 text-xs relative">
          {tierOptions.map((tier) => {
            const Icon = tier.icon;
            const isActive = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`relative px-3 py-1.5 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-1.5 z-10 ${
                  isActive ? 'text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDemoTierHighlight"
                    className={`absolute inset-0 rounded-xl border shadow-xs ${tier.activeBg}`}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <Icon className={`w-3.5 h-3.5 relative z-10 ${isActive ? tier.color : ''}`} />
                <span className="relative z-10 flex items-center gap-1">
                  {tier.label}
                  {tier.isLocked && <Lock className="w-2.5 h-2.5 text-amber-400" />}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Device Switcher & Choose CTA */}
        <div className="flex items-center gap-3">
          
          {/* Responsive Device Switcher with smooth sliding indicator (hidden on locked tiers) */}
          {!isLockedTier && (
            <div className="hidden lg:flex items-center bg-black/60 p-1 rounded-xl border border-white/10 text-xs relative">
              {deviceOptions.map((mode) => {
                const Icon = mode.icon;
                const isActive = viewportMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewportMode(mode.id)}
                    title={mode.title}
                    className={`relative p-1.5 rounded-lg transition-colors cursor-pointer z-10 ${
                      isActive ? 'text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeViewportHighlight"
                        className="absolute inset-0 bg-white/20 rounded-lg shadow-xs"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <Icon className="w-4 h-4 relative z-10" />
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={handleSelectAndClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-black font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Bu Modeli Seç</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Main Viewport Container with spring morphing */}
      <div className="flex-1 overflow-y-auto bg-[#050608] flex justify-center items-start p-2 sm:p-6">
        {isLockedTier ? (
          <LockedDemoScreen
            tier={activeTier}
            onClose={onClose}
            onSelectPackage={onSelectPackage}
          />
        ) : (
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            className="w-full flex justify-center"
          >
            {viewportMode === 'desktop' && (
              <motion.div
                layout
                className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/10"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTier}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {activeTier === 'standard' && <StandardDemoSite onReturn={onClose} />}
                    {activeTier === 'advanced' && <AdvancedDemoSite onReturn={onClose} />}
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            )}

            {viewportMode === 'tablet' && (
              <motion.div
                layout
                className="w-[768px] my-4 bg-white shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden border-8 border-slate-800"
              >
                <div className="h-4 bg-slate-800 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-600 rounded-full" />
                </div>
                <div className="max-h-[85vh] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTier}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activeTier === 'standard' && <StandardDemoSite onReturn={onClose} />}
                      {activeTier === 'advanced' && <AdvancedDemoSite onReturn={onClose} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {viewportMode === 'mobile' && (
              <motion.div
                layout
                className="w-[390px] my-4 bg-white shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded-[48px] overflow-hidden border-[10px] border-slate-900 relative"
              >
                {/* Dynamic Island / Speaker notch */}
                <div className="h-6 bg-slate-900 flex items-center justify-center sticky top-0 z-40">
                  <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-end px-2">
                    <div className="w-2 h-2 rounded-full bg-blue-900/50" />
                  </div>
                </div>
                <div className="max-h-[80vh] overflow-y-auto">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTier}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {activeTier === 'standard' && <StandardDemoSite onReturn={onClose} />}
                      {activeTier === 'advanced' && <AdvancedDemoSite onReturn={onClose} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>

    </div>
  );
}
