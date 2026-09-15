import React, { useState } from 'react';
import { 
  X, 
  ArrowLeft, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Check, 
  Crown,
  Zap,
  Building
} from 'lucide-react';
import StandardDemoSite from './StandardDemoSite';
import AdvancedDemoSite from './AdvancedDemoSite';
import PremiumDemoSite from './PremiumDemoSite';

export default function PackageDemoModal({ 
  initialTier = 'advanced', 
  onClose, 
  onSelectPackage 
}) {
  const [activeTier, setActiveTier] = useState(initialTier);
  const [viewportMode, setViewportMode] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  const tierMeta = {
    standard: {
      name: 'Standart Paket',
      subtitle: 'Deniz Arslan • Ege & Akdeniz Butik Gayrimenkul',
      badge: 'Editorial Essential',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
    },
    advanced: {
      name: 'Üst Düzey Paket',
      subtitle: 'Selin Karaca • Göktürk VIP Gayrimenkul',
      badge: 'Selin Hanım İçin Yaptığımız Canlı Mimari',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
    },
    premium: {
      name: 'Premium Paket',
      subtitle: 'Aureus Monolith • Private Luxury & Off-Market Estates',
      badge: 'Ultra-Lüks Sanat Mimarisi',
      badgeColor: 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/40'
    }
  };

  const currentInfo = tierMeta[activeTier] || tierMeta.advanced;

  const handleSelectAndClose = () => {
    onSelectPackage(activeTier);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-obsidian text-white overflow-hidden animate-fade-in">
      
      {/* Top Controller Bar */}
      <div className="bg-[#111317] border-b border-white/10 px-4 py-3 flex flex-wrap items-center justify-between gap-3 shrink-0 z-20">
        
        {/* Left: Close / Return */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-gold" />
            <span>Dosyaya Dön</span>
          </button>

          <div className="hidden sm:block h-6 w-[1px] bg-white/10" />

          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-sm text-white">
                {currentInfo.name} Canlı Örnek Sitesi
              </span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono uppercase font-bold border ${currentInfo.badgeColor}`}>
                {currentInfo.badge}
              </span>
            </div>
            <div className="text-[10px] text-slate-400">
              {currentInfo.subtitle}
            </div>
          </div>
        </div>

        {/* Center: Package Switcher Pills */}
        <div className="flex items-center bg-black/60 p-1 rounded-2xl border border-white/10 text-xs">
          <button
            onClick={() => setActiveTier('standard')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTier === 'standard'
                ? 'bg-emerald-500/30 text-emerald-200 font-bold border border-emerald-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building className="w-3.5 h-3.5" />
            <span>Standart</span>
          </button>

          <button
            onClick={() => setActiveTier('advanced')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTier === 'advanced'
                ? 'bg-blue-500/30 text-blue-200 font-bold border border-blue-500/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Üst Düzey (Selin Hanım)</span>
          </button>

          <button
            onClick={() => setActiveTier('premium')}
            className={`px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTier === 'premium'
                ? 'bg-[#D4AF37]/30 text-[#D4AF37] font-bold border border-[#D4AF37]/50 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Crown className="w-3.5 h-3.5" />
            <span>Premium</span>
          </button>
        </div>

        {/* Right: Device Switcher & Choose CTA */}
        <div className="flex items-center gap-3">
          
          {/* Responsive Device Switcher */}
          <div className="hidden lg:flex items-center bg-black/60 p-1 rounded-xl border border-white/10 text-xs">
            <button
              onClick={() => setViewportMode('desktop')}
              title="Masaüstü Görünümü"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'desktop' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('tablet')}
              title="Tablet Görünümü (768px)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'tablet' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewportMode('mobile')}
              title="Mobil Görünümü (390px iPhone)"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                viewportMode === 'mobile' ? 'bg-white/20 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleSelectAndClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-black font-bold text-xs shadow-md hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Bu Modeli Seç</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      </div>

      {/* Main Viewport Container */}
      <div className="flex-1 overflow-y-auto bg-[#050608] flex justify-center items-start p-2 sm:p-6">
        
        {viewportMode === 'desktop' && (
          <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl overflow-hidden border border-white/10">
            {activeTier === 'standard' && <StandardDemoSite onReturn={onClose} />}
            {activeTier === 'advanced' && <AdvancedDemoSite onReturn={onClose} />}
            {activeTier === 'premium' && <PremiumDemoSite />}
          </div>
        )}

        {viewportMode === 'tablet' && (
          <div className="w-[768px] my-4 bg-white shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden border-8 border-slate-800">
            <div className="h-4 bg-slate-800 flex items-center justify-center">
              <div className="w-12 h-1 bg-slate-600 rounded-full" />
            </div>
            <div className="max-h-[85vh] overflow-y-auto">
              {activeTier === 'standard' && <StandardDemoSite onReturn={onClose} />}
              {activeTier === 'advanced' && <AdvancedDemoSite onReturn={onClose} />}
              {activeTier === 'premium' && <PremiumDemoSite />}
            </div>
          </div>
        )}

        {viewportMode === 'mobile' && (
          <div className="w-[390px] my-4 bg-white shadow-[0_0_50px_rgba(0,0,0,0.9)] rounded-[48px] overflow-hidden border-[10px] border-slate-900 relative">
            {/* Dynamic Island / Speaker notch */}
            <div className="h-6 bg-slate-900 flex items-center justify-center sticky top-0 z-40">
              <div className="w-24 h-3.5 bg-black rounded-full flex items-center justify-end px-2">
                <div className="w-2 h-2 rounded-full bg-blue-900/50" />
              </div>
            </div>
            <div className="max-h-[80vh] overflow-y-auto">
              {activeTier === 'standard' && <StandardDemoSite onReturn={onClose} />}
              {activeTier === 'advanced' && <AdvancedDemoSite onReturn={onClose} />}
              {activeTier === 'premium' && <PremiumDemoSite />}
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
