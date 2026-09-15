import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  PhoneCall, 
  ArrowUpRight, 
  Lock, 
  Unlock, 
  KeyRound, 
  Camera, 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize2 
} from 'lucide-react';
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
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('selin_favs')) || [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (e, id) => {
    e.stopPropagation();
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('selin_favs', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

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

        {/* Studio-Grade Segmented Control Filter */}
        <div className="flex items-center justify-center mb-10 overflow-x-auto py-2">
          <div className="inline-flex items-center p-1.5 rounded-2xl bg-[#EFEAE1] border border-[#DDD5C7] shadow-xs max-w-full">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabAll}
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('villa')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeCategory === 'villa'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabVilla}
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('penthouse')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap ${
                activeCategory === 'penthouse'
                  ? 'bg-white text-[#111827] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.tabPenthouse}
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('vault')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeCategory === 'vault'
                  ? 'bg-[#8A735C] text-white shadow-xs'
                  : 'text-[#8A735C] hover:text-[#705c48]'
              }`}
            >
              {isVaultUnlocked ? <Unlock className="w-3.5 h-3.5 text-amber-200" /> : <Lock className="w-3.5 h-3.5" />}
              <span>{t.tabVault}</span>
              {isVaultUnlocked && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              )}
            </button>
          </div>
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
                const isFav = favorites.includes(item.id);

                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedProperty(item)}
                    className={`group bg-white rounded-2xl border overflow-hidden flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1.5 cursor-pointer ${
                      item.isOffMarket
                        ? 'border-amber-400/60 ring-1 ring-amber-400/30'
                        : 'border-[#E8E2D8] hover:border-[#8A735C]/60'
                    }`}
                  >
                    <div>
                      {/* Cinematic Image Container with Slow Zoom */}
                      <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />

                        {/* Subtle Cinematic Bottom Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-75 transition-opacity duration-300" />

                        {/* Top Left: Badges */}
                        {item.isOffMarket ? (
                          <div className="absolute top-3 left-3 bg-slate-950/90 text-amber-300 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/40 uppercase tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-md">
                            <Lock className="w-3 h-3 text-amber-400" />
                            <span>VIP Off-Market</span>
                          </div>
                        ) : item.badge && !isSold ? (
                          <div className="absolute top-3 left-3 bg-white/95 text-[#8A735C] text-[10px] font-bold px-3 py-1 rounded-full border border-[#8A735C]/20 uppercase tracking-wider backdrop-blur-md shadow-xs">
                            {item.badge}
                          </div>
                        ) : null}

                        {/* Top Right: Favorite / Save Heart Button */}
                        <button
                          type="button"
                          onClick={(e) => toggleFavorite(e, item.id)}
                          aria-label={isFav ? (t.saved || 'Kaydedildi') : (t.saveToFavorites || 'Favorilere Ekle')}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 z-10 cursor-pointer ${
                            isFav
                              ? 'bg-rose-600 text-white shadow-md scale-105'
                              : 'bg-black/35 text-white/90 hover:bg-black/60 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                        </button>

                        {/* Bottom Left: Photo Counter Pill */}
                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/50 backdrop-blur-md text-white/90 text-[10px] font-medium flex items-center gap-1.5 pointer-events-none">
                          <Camera className="w-3 h-3 text-white/80" />
                          <span>{t.photoCount ? t.photoCount(1, item.gallery?.length || 3) : '1 / 3'}</span>
                        </div>

                        {/* Sold Overlay */}
                        {isSold && (
                          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-10">
                            <span className="bg-rose-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md">
                              {t.sold}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Property Info Content */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                          <span className="flex items-center gap-1 text-slate-600">
                            <MapPin className="w-3.5 h-3.5 text-[#8A735C]" />
                            <span>{item.location}</span>
                          </span>
                          <span className="text-slate-400">{item.bedrooms} • {item.area}</span>
                        </div>

                        <h3 className="font-semibold text-base text-[#111827] group-hover:text-[#8A735C] transition-colors leading-snug line-clamp-2">
                          {item.title}
                        </h3>

                        <div className="text-xl font-semibold text-[#8A735C] pt-1 tracking-tight flex items-baseline justify-between">
                          <span>{formatPrice(item.priceRaw, item.price)}</span>
                          {item.type && (
                            <span className="text-[11px] font-normal text-slate-400">
                              {item.type}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Clean Actions */}
                    <div className="p-5 pt-0 sm:p-6 sm:pt-0 grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(item)}
                        className="active-press py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-slate-100 text-[#111827] text-xs font-semibold border border-[#E8E2D8] transition-colors cursor-pointer flex items-center justify-center gap-1.5 tap-target"
                      >
                        <span>{t.inspect}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#111827] transition-colors" />
                      </button>

                      <a
                        href={formatPhoneForCall(agentProfile.phone)}
                        onClick={(e) => e.stopPropagation()}
                        className="active-press py-2.5 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs tap-target"
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
