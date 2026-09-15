import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { PhoneCall, ArrowUpRight, Lock, Unlock, KeyRound, Sparkles, ShieldCheck } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';
import { getTranslations, localizeListing } from '../../data/translations';

export default function FeaturedListings() {
  const { 
    listings, 
    agentProfile, 
    setSelectedProperty, 
    formatPrice, 
    language,
    isVaultUnlocked,
    unlockVault,
    lockVault 
  } = useAppState();

  const [activeCategory, setActiveCategory] = useState('all');
  const [vaultInputCode, setVaultInputCode] = useState('');
  const [vaultError, setVaultError] = useState('');

  const t = getTranslations(language).listings;

  const handleUnlock = (e) => {
    e.preventDefault();
    setVaultError('');
    const res = unlockVault(vaultInputCode);
    if (!res.success) {
      setVaultError(t.vaultInvalid || 'Geçersiz VIP erişim kodu.');
    } else {
      setVaultInputCode('');
    }
  };

  // Filter listings based on active category
  const filteredListings = listings.filter((item) => {
    if (activeCategory === 'vault') {
      return item.isOffMarket;
    }
    if (item.isOffMarket && !isVaultUnlocked) {
      return false; // Hide off-market unless in vault tab or unlocked
    }
    if (activeCategory === 'villa') {
      return item.type.toLowerCase().includes('villa');
    }
    if (activeCategory === 'penthouse') {
      return item.type.toLowerCase().includes('penthouse') || item.type.toLowerCase().includes('konak');
    }
    return true;
  });

  return (
    <section id="portfoy" className="py-14 sm:py-20 bg-[#FBFBFB] border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A735C]">
            {t.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
            {t.title}
          </h2>
        </div>

        {/* Minimalist Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {t.tabAll}
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('villa')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'villa'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {t.tabVilla}
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('penthouse')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              activeCategory === 'penthouse'
                ? 'bg-[#111827] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {t.tabPenthouse}
          </button>

          <button
            type="button"
            onClick={() => setActiveCategory('vault')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeCategory === 'vault'
                ? 'bg-[#8A735C] text-white shadow-md'
                : 'bg-amber-50 text-[#8A735C] border border-amber-200/80 hover:bg-amber-100/60'
            }`}
          >
            {isVaultUnlocked ? <Unlock className="w-3.5 h-3.5 text-amber-200" /> : <Lock className="w-3.5 h-3.5" />}
            <span>{t.tabVault}</span>
            {isVaultUnlocked && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
            )}
          </button>
        </div>

        {/* VAULT LOCKED SCREEN (Öneri 1) */}
        {activeCategory === 'vault' && !isVaultUnlocked ? (
          <div className="max-w-xl mx-auto bg-gradient-to-b from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl border border-amber-500/30 shadow-2xl text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.2)]">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <span className="text-[11px] uppercase tracking-widest text-amber-400/90 font-bold block">
                {t.ndaProtocol || 'ÖZEL GİZLİLİK PROTOKOLÜ (NDA)'}
              </span>
              <h3 className="text-xl sm:text-2xl font-semibold text-white">
                {t.vaultTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto">
                {t.vaultDesc}
              </p>
            </div>

            {/* Code Input Form */}
            <form onSubmit={handleUnlock} className="space-y-3 max-w-sm mx-auto">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={vaultInputCode}
                    onChange={(e) => setVaultInputCode(e.target.value)}
                    placeholder={t.vaultPlaceholder}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800/90 text-white text-xs font-mono tracking-wider focus:outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer shrink-0 shadow-md"
                >
                  {t.vaultBtn}
                </button>
              </div>

              {vaultError && (
                <p className="text-[11px] text-rose-400 font-medium">{vaultError}</p>
              )}

              <div className="pt-2 text-[11px] text-slate-400 flex flex-col items-center gap-1.5">
                <a
                  href={`https://wa.me/${agentProfile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(t.vaultWaMsg || 'Merhaba Selin Hanım, sitenizdeki Off-Market / Gizli Portföy Kasası için VIP erişim kodu talep ediyorum.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-300 hover:text-amber-200 transition-colors font-medium flex items-center gap-1"
                >
                  <span>{t.vaultWhatsapp}</span>
                </a>
                <span className="text-[10px] text-slate-500 font-mono">
                  {t.vaultTestCode || (language === 'EN' ? 'Quick Review Code: VIP2026' : language === 'RU' ? 'Тестовый код: VIP2026' : 'Hızlı İnceleme Test Kodu: VIP2026')}
                </span>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* Vault Unlocked Banner */}
            {activeCategory === 'vault' && isVaultUnlocked && (
              <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 max-w-6xl mx-auto">
                <div className="flex items-center gap-2.5 text-xs text-amber-900 font-semibold">
                  <Unlock className="w-4 h-4 text-amber-700" />
                  <span>{t.vaultUnlockedBanner}</span>
                </div>
                <button
                  type="button"
                  onClick={lockVault}
                  className="text-xs text-slate-500 hover:text-rose-600 underline font-medium cursor-pointer"
                >
                  {t.vaultRelock}
                </button>
              </div>
            )}

            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredListings.map((rawItem) => {
                const item = localizeListing(rawItem, language);
                const isSold = item.status === 'Satıldı';

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl border overflow-hidden flex flex-col justify-between hover:border-[#111827] transition-all duration-200 shadow-xs ${
                      item.isOffMarket ? 'border-amber-400/60 ring-1 ring-amber-400/30' : 'border-slate-200'
                    }`}
                  >
                    <div>
                      {/* Clean Image Container */}
                      <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />

                        {/* Badges */}
                        {item.isOffMarket ? (
                          <div className="absolute top-3 left-3 bg-slate-950/90 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/40 uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                            <Lock className="w-3 h-3 text-amber-400" />
                            <span>VIP Off-Market</span>
                          </div>
                        ) : item.badge && !isSold ? (
                          <div className="absolute top-3 left-3 bg-white/90 text-[#8A735C] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#8A735C]/20 uppercase tracking-wider backdrop-blur-md">
                            {item.badge}
                          </div>
                        ) : null}

                        {isSold && (
                          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center">
                            <span className="bg-rose-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider">
                              {t.sold}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Property Info Content */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-500">{item.location}</span>
                          <span className="text-xs font-medium text-slate-400">{item.bedrooms} • {item.area}</span>
                        </div>

                        <h3 className="font-semibold text-base text-[#111827] leading-snug line-clamp-2">
                          {item.title}
                        </h3>

                        <div className="text-lg font-semibold text-[#8A735C] pt-1">
                          {formatPrice(item.priceRaw, item.price)}
                        </div>
                      </div>
                    </div>

                    {/* Clean Actions */}
                    <div className="p-5 pt-0 sm:p-6 sm:pt-0 grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(item)}
                        className="active-press py-3 px-3 rounded-xl bg-[#FBFBFB] hover:bg-slate-100 text-[#111827] text-xs font-medium border border-slate-200 transition-colors cursor-pointer flex items-center justify-center gap-1 tap-target"
                      >
                        <span>{t.inspect}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                      </button>

                      <a
                        href={formatPhoneForCall(agentProfile.phone)}
                        className="active-press py-3 px-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs tap-target"
                      >
                        <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                        <span>{t.call}</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
