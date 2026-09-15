import React, { useState, useRef, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { PhoneCall, Menu, X, Globe, ChevronDown, Check } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';
import { getTranslations } from '../../data/translations';

export default function Navbar() {
  const { 
    agentProfile, 
    viewMode,
    setViewMode, 
    currency, 
    setCurrency, 
    language, 
    setLanguage 
  } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const t = getTranslations(language).nav;

  const handleOpenForm = (e) => {
    e?.preventDefault();
    setViewMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-[#FBFBFB]/95 backdrop-blur-md sticky top-0 z-40 border-b border-[#E5E7EB] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Name */}
        <a href="#hero" className="flex items-center space-x-2 active-press shrink-0">
          <span className="font-semibold text-base sm:text-lg text-[#111827] tracking-tight">
            SELİN KARACA
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs font-medium text-[#8A735C]">
            {t.region || 'Göktürk'}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-6 text-xs font-medium text-slate-600">
          <a href="#portfoy" className="hover:text-[#111827] transition-colors py-2">
            {t.portfolio}
          </a>
          <a href="#bolge" className="hover:text-[#111827] transition-colors py-2">
            {t.regionGuide || 'Bölge Rehberi'}
          </a>
          <a href="#hakkimda" className="hover:text-[#111827] transition-colors py-2">
            {t.about}
          </a>
          <a href="#surec" className="hover:text-[#111827] transition-colors py-2">
            {t.process}
          </a>
          <a href="#iletisim" className="hover:text-[#111827] transition-colors py-2">
            {t.contact}
          </a>
          <button
            type="button"
            onClick={handleOpenForm}
            className="hover:text-[#8A735C] transition-colors py-2 font-semibold text-[#8A735C] cursor-pointer"
          >
            {t.valuation}
          </button>
        </div>

        {/* Right Controls: Collapsible TR Dropdown & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Studio-Grade Collapsible Language & Currency Dropdown */}
          <div className="relative" ref={langMenuRef}>
            <button
              type="button"
              onClick={() => setIsLangMenuOpen((prev) => !prev)}
              className={`active-press inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide transition-all cursor-pointer select-none shadow-2xs ${
                isLangMenuOpen
                  ? 'bg-[#111827] text-white border-[#111827] shadow-sm ring-2 ring-[#8A735C]/30'
                  : 'bg-white text-[#111827] border-slate-200 hover:border-[#8A735C]/60 hover:bg-[#FAF8F5]'
              }`}
              aria-expanded={isLangMenuOpen}
              aria-label="Dil ve Para Birimi Seçimi"
            >
              <Globe className={`w-3.5 h-3.5 ${isLangMenuOpen ? 'text-amber-400' : 'text-[#8A735C]'}`} />
              <span className="font-bold tracking-wider">{language}</span>
              <span className="text-slate-300 font-light">|</span>
              <span className={`text-[11px] font-mono font-medium ${isLangMenuOpen ? 'text-amber-200' : 'text-slate-500'}`}>
                {currency === 'TRY' ? '₺' : currency === 'USD' ? '$' : '€'}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180 text-white' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Floating Panel */}
            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2.5 w-72 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/5 space-y-3.5">
                {/* Dil Seçimi */}
                <div>
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.langHeading || 'DİL SEÇİMİ'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8A735C]">Language</span>
                  </div>
                  <div className="space-y-1">
                    {[
                      { code: 'TR', label: 'Türkçe', flag: '🇹🇷', desc: 'Varsayılan Dil' },
                      { code: 'EN', label: 'English', flag: '🇬🇧', desc: 'International' },
                      { code: 'RU', label: 'Русский', flag: '🇷🇺', desc: 'Русскоязычный' }
                    ].map((item) => {
                      const isSelected = language === item.code;
                      return (
                        <button
                          key={item.code}
                          type="button"
                          onClick={() => setLanguage(item.code)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#FAF8F5] text-[#8A735C] font-bold border border-[#8A735C]/30 shadow-2xs'
                              : 'text-slate-700 hover:bg-slate-50 border border-transparent font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{item.flag}</span>
                            <div className="text-left">
                              <span className="block leading-tight">{item.label}</span>
                              <span className="block text-[10px] text-slate-400 font-normal">{item.desc}</span>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#8A735C]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-slate-100" />

                {/* Para Birimi */}
                <div>
                  <div className="flex items-center justify-between px-1 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {t.currencyHeading || 'PARA BİRİMİ'}
                    </span>
                    <span className="text-[10px] font-semibold text-[#8A735C]">Currency</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { code: 'TRY', symbol: '₺', label: 'TRY', name: 'Türk Lirası' },
                      { code: 'USD', symbol: '$', label: 'USD', name: 'Amerikan Doları' },
                      { code: 'EUR', symbol: '€', label: 'EUR', name: 'Euro' }
                    ].map((curr) => {
                      const isSelected = currency === curr.code;
                      return (
                        <button
                          key={curr.code}
                          type="button"
                          onClick={() => {
                            setCurrency(curr.code);
                            setIsLangMenuOpen(false);
                          }}
                          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl border text-xs transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#8A735C] text-white border-[#8A735C] shadow-xs font-bold'
                              : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50 font-medium'
                          }`}
                          title={curr.name}
                        >
                          <span className="text-sm font-semibold">{curr.symbol}</span>
                          <span className="text-[10px] tracking-wider">{curr.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2.5 shrink-0">
            <button
              type="button"
              onClick={handleOpenForm}
              className="active-press inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8A735C] text-white hover:bg-[#725e4a] font-semibold text-xs transition-colors cursor-pointer shadow-xs"
            >
              <span>{t.inquiry}</span>
            </button>

            <a
              href={formatPhoneForCall(agentProfile.phone)}
              className="active-press inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 hover:bg-emerald-100 font-semibold text-xs transition-colors cursor-pointer tap-target"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>{agentProfile.phone}</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="active-press p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors tap-target cursor-pointer"
              aria-label="Menüyü Aç/Kapat"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#111827]" />
              ) : (
                <Menu className="w-6 h-6 text-[#111827]" />
              )}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FBFBFB] border-b border-[#E5E7EB] px-6 py-6 space-y-4 animate-slide-down shadow-xl">

          <div className="flex flex-col space-y-3 font-medium text-sm text-[#111827]">
            <a
              href="#portfoy"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-100 transition-colors active-press flex items-center justify-between"
            >
              <span>{t.portfolio}</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>

            <a
              href="#bolge"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-100 transition-colors active-press flex items-center justify-between"
            >
              <span>{t.regionGuide || 'Bölge Rehberi'}</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>

            <a
              href="#hakkimda"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-100 transition-colors active-press flex items-center justify-between"
            >
              <span>{t.about}</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>

            <a
              href="#surec"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-100 transition-colors active-press flex items-center justify-between"
            >
              <span>{t.process}</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>



            <a
              href="#iletisim"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-lg hover:bg-slate-100 transition-colors active-press flex items-center justify-between"
            >
              <span>{t.contact}</span>
              <span className="text-slate-400 text-xs">→</span>
            </a>

            <button
              type="button"
              onClick={() => {
                handleOpenForm();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-3 rounded-lg bg-[#FAF8F5] border border-[#8A735C]/30 hover:bg-[#F4F1EA] transition-colors active-press flex items-center justify-between text-left cursor-pointer"
            >
              <span className="font-semibold text-[#8A735C]">{t.valuation}</span>
              <span className="text-xs bg-[#8A735C] text-white px-2 py-0.5 rounded-md font-bold">{t.open || 'Aç →'}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-[#E5E7EB]">
            <a
              href={formatPhoneForCall(agentProfile.phone)}
              className="active-press w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer tap-target"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.callPrefix} ({agentProfile.phone})</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
