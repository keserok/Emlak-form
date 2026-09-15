import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Send,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Building,
  Phone,
  Award,
  ArrowRight,
  Crown,
  Zap,
  Check,
  Eye,
  X
} from 'lucide-react';
import { ALL_PACKAGES } from '../data/packagesData';
import { generateWhatsAppLink } from '../utils/whatsapp';
import PackageDemoModal from './demos/PackageDemoModal';

export default function ResultDossier({ 
  leadData, 
  packageResult, 
  onRestart, 
  onSaveToSystem, 
  onOpenAdmin 
}) {
  // Default active package to the one recommended by algorithm
  const recommendedTier = packageResult.packageTier || 'standard';
  const [selectedTier, setSelectedTier] = useState(recommendedTier);

  // Demo preview modal state ('standard' | 'advanced' | 'premium' | null)
  const [previewTierModal, setPreviewTierModal] = useState(null);

  // Save to system state
  const [isSavedToSystem, setIsSavedToSystem] = useState(false);
  const [savedSuccessModal, setSavedSuccessModal] = useState(false);

  const activePackage = ALL_PACKAGES.find((p) => p.id === selectedTier) || ALL_PACKAGES[0];
  const recommendedPackage = ALL_PACKAGES.find((p) => p.id === recommendedTier) || ALL_PACKAGES[0];

  const whatsappUrl = generateWhatsAppLink(leadData, packageResult, activePackage);

  const handleWhatsAppClick = () => {
    window.open(whatsappUrl, '_blank');
  };

  const handleSaveToSystemClick = () => {
    if (onSaveToSystem) {
      onSaveToSystem(activePackage);
    }
    setIsSavedToSystem(true);
    setSavedSuccessModal(true);
  };

  // Interactive selection without disruptive bursts
  const handleSelectTier = (tierId) => {
    setSelectedTier(tierId);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-12 py-16 sm:py-20 z-20 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="luxury-glass p-6 sm:p-10 md:p-12 rounded-3xl border border-gold/30 shadow-[0_25px_80px_-20px_rgba(0,0,0,0.9)] relative overflow-hidden"
      >
        {/* Subtle Top Specular Gleam */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-80" />

        {/* 1. Header: Minimal & Editorial */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-architectural-white font-light tracking-tight">
              Kişiselleştirilmiş Mimari Dosyanız
            </h1>
          </div>

          {/* Agency Identity Pill */}
          <div className="flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-architectural-muted">
            <div className="flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-gold/80" />
              <span className="text-architectural-white font-medium">{leadData.agencyName}</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold/80" />
              <span className="font-mono text-architectural-white">{leadData.phone}</span>
            </div>
          </div>
        </div>

        {/* 2. Algoritmik Tavsiye & Gerekçe (Minimal & Net) */}
        <div className="my-7 p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-gold/[0.12] via-white/[0.02] to-transparent border border-gold/35 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold/20 flex items-center justify-center border border-gold/50 shadow-[0_0_12px_rgba(212,175,55,0.3)]">
                <Award className="w-4 h-4 text-gold" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-light block">
                  ANALİZ SONUCU UYGUN GÖRÜLEN MODEL
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-architectural-white">
                  Size Uygun Olan Paket: <span className="text-gold font-semibold">{recommendedPackage.name}</span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/50 border border-gold/30 text-xs font-mono self-start sm:self-auto">
              <Clock className="w-3.5 h-3.5 text-gold" />
              <span className="text-architectural-muted">Teslim:</span>
              <strong className="text-architectural-white">{recommendedPackage.deliveryDays}</strong>
            </div>
          </div>

          <p className="font-serif text-sm sm:text-base text-architectural-white/90 leading-relaxed italic border-t border-white/10 pt-3.5">
            "{packageResult.rationale}"
          </p>

          {selectedTier !== recommendedTier && (
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-architectural-muted">Farklı bir modeli inceliyorsunuz.</span>
              <button
                onClick={() => handleSelectTier(recommendedTier)}
                className="text-gold hover:text-gold-light underline font-medium cursor-pointer"
              >
                Önerilen Modele Dön ({recommendedPackage.name})
              </button>
            </div>
          )}
        </div>

        {/* 3. Paket Kartları (Her Birinin Kendi Altında 5 Maddesiyle Birlikte) */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ALL_PACKAGES.map((pkg) => {
              const isRecommended = pkg.id === recommendedTier;
              const isSelected = pkg.id === selectedTier;

              // Unique animation & styling tiers
              const isAdvanced = pkg.id === 'advanced';
              const isPremium = pkg.id === 'premium';

              return (
                <motion.div
                  key={pkg.id}
                  onClick={() => handleSelectTier(pkg.id)}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  whileTap={{ scale: 0.98 }}
                  className={`group relative rounded-3xl p-6 sm:p-7 cursor-pointer transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                    // Refined luxury borders and calm depth
                    isSelected
                      ? isPremium
                        ? 'bg-gradient-to-b from-gold/[0.12] via-white/[0.03] to-obsidian border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.25)] ring-1 ring-gold/40'
                        : isAdvanced
                        ? 'bg-gradient-to-b from-blue-500/[0.06] via-white/[0.03] to-obsidian border-2 border-gold/80 shadow-[0_0_25px_rgba(212,175,55,0.2)] ring-1 ring-gold/30'
                        : 'bg-gradient-to-b from-emerald-500/[0.05] via-white/[0.02] to-obsidian border border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-gold/20'
                      : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Subtle Top Rim Laser Line for Premium */}
                  {isSelected && isPremium && (
                    <div className="absolute top-0 left-0 right-0 h-[1.5px] overflow-hidden pointer-events-none">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                        className="w-1/2 h-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_8px_rgba(212,175,55,0.9)]"
                      />
                    </div>
                  )}

                  {/* Subtle Top Rim Laser Line for Üst Düzey */}
                  {isSelected && isAdvanced && (
                    <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden pointer-events-none">
                      <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                        className="w-1/3 h-full bg-gradient-to-r from-transparent via-gold/80 to-transparent shadow-[0_0_6px_rgba(212,175,55,0.5)]"
                      />
                    </div>
                  )}

                  <div>
                    {/* Top Row: Icon + Badge + Check */}
                    <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            isSelected
                              ? 'bg-gold text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                              : 'bg-white/[0.04] text-gold-light border border-white/10'
                          }`}
                        >
                          {isPremium ? (
                            <Crown className="w-4 h-4" />
                          ) : isAdvanced ? (
                            <Zap className="w-4 h-4" />
                          ) : (
                            <Building className="w-4 h-4" />
                          )}
                        </div>

                        {isRecommended && (
                          <span className="px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/50 text-[9px] font-mono tracking-wider text-gold-light font-bold">
                            ⭐ ÖNERİLEN
                          </span>
                        )}
                      </div>

                      {/* Selection Radio Indicator */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isSelected
                            ? 'border-gold bg-gold text-obsidian shadow-[0_0_10px_rgba(212,175,55,0.5)]'
                            : 'border-white/20 bg-white/[0.02]'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-obsidian stroke-[3]" />}
                      </div>
                    </div>

                    {/* Badge & Name */}
                    <div className="relative z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-architectural-subtle block mb-1">
                        {pkg.badge}
                      </span>
                      <h4 className="font-serif text-xl sm:text-2xl text-architectural-white font-medium mb-1 group-hover:text-gold-light transition-colors">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-gold/90 font-medium mb-4">
                        {pkg.target}
                      </p>
                    </div>

                    {/* 5 Distinct Feature Items per Package */}
                    <div className="pt-3 border-t border-white/10 relative z-10">
                      {pkg.itemsPrefix ? (
                        <div className="text-[10px] font-mono uppercase tracking-widest text-gold-light font-semibold mb-2.5">
                          {pkg.itemsPrefix}
                        </div>
                      ) : (
                        <div className="text-[10px] font-mono uppercase tracking-widest text-architectural-subtle font-medium mb-2.5">
                          Temel Mimari Özellikler:
                        </div>
                      )}

                      <ul className="space-y-2.5">
                        {pkg.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs text-architectural-muted leading-relaxed"
                          >
                            <div
                              className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                                isSelected
                                  ? 'bg-gold/20 text-gold border border-gold/40'
                                  : 'bg-white/[0.04] text-architectural-subtle border border-white/10'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                            </div>
                            <span
                              className={`transition-colors ${
                                isSelected ? 'text-architectural-white font-normal' : 'text-architectural-muted/90'
                              }`}
                            >
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Live Demo Preview Button for this Package */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewTierModal(pkg.id);
                      }}
                      className="w-full mt-4 py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-gold/15 border border-white/10 hover:border-gold/50 text-gold-light font-medium text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group/btn relative z-10"
                    >
                      <Eye className="w-3.5 h-3.5 text-gold group-hover/btn:scale-110 transition-transform" />
                      <span>Örnek Siteyi İncele (Canlı Demo)</span>
                      <ArrowRight className="w-3 h-3 text-gold/70 group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                  {/* Card Bottom: Delivery time & In-Button Selection Animation */}
                  <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between relative z-10 text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-architectural-muted">
                      <Clock className="w-3.5 h-3.5 text-gold/80" />
                      <span>{pkg.deliveryDays}</span>
                    </div>

                    {/* In-Button Laser Animation State */}
                    {isSelected ? (
                      <div
                        className={`relative overflow-hidden px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 ${
                          isPremium
                            ? 'bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-obsidian shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                            : isAdvanced
                            ? 'bg-white/[0.08] border border-gold/70 text-gold-light shadow-[0_0_12px_rgba(212,175,55,0.2)]'
                            : 'bg-white/[0.05] border border-gold/40 text-gold-light'
                        }`}
                      >
                        {/* Internal Traveling Laser Sheen (contained strictly inside the button) */}
                        {(isPremium || isAdvanced) && (
                          <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: '200%' }}
                            transition={{ repeat: Infinity, duration: isPremium ? 2.5 : 3.2, ease: 'linear' }}
                            className={`absolute inset-0 bg-gradient-to-r from-transparent ${
                              isPremium ? 'via-white/40' : 'via-gold/30'
                            } to-transparent pointer-events-none -skew-x-12`}
                          />
                        )}
                        <Check className="w-3.5 h-3.5 stroke-[2.5] relative z-10" />
                        <span className="relative z-10">Seçildi</span>
                      </div>
                    ) : (
                      <div className="px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/10 group-hover:border-gold/40 group-hover:bg-white/[0.05] text-architectural-muted group-hover:text-white text-xs transition-all duration-300 flex items-center gap-1.5">
                        <span>Modeli Seç</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 4. Action CTA Bar: Save to System, WhatsApp & Restart */}
        <div className="flex flex-col items-center gap-4 pt-6 border-t border-white/10">
          
          {/* BUTTON 1: "Sisteme Kaydet ve Dönüş Bekle" (Directly requested by user) */}
          <button
            type="button"
            onClick={handleSaveToSystemClick}
            className={`relative overflow-hidden w-full sm:w-auto min-w-[320px] px-10 py-4 rounded-full flex items-center justify-center gap-3 text-xs uppercase tracking-luxury font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
              isSavedToSystem
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : 'bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-obsidian shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-obsidian relative z-10" />
            <span className="relative z-10">
              {isSavedToSystem ? '✓ Sisteme Kaydedildi (Dönüş Bekleniyor)' : 'Sisteme Kaydet ve Dönüş Bekle'}
            </span>
          </button>

          {/* BUTTON 2: "WhatsApp'tan Gönder" */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="relative overflow-hidden w-full sm:w-auto min-w-[320px] px-10 py-4 rounded-full flex items-center justify-center gap-3 text-xs uppercase tracking-luxury font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-obsidian shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(16,185,129,0.45)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            {/* Subtle traveling laser sheen inside the button */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear', delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12"
            />
            <Send className="w-4 h-4 relative z-10" />
            <span className="relative z-10">{activePackage.name} Teklifini WhatsApp'tan Gönder</span>
          </button>

          {/* Subtle Dimmed Restart Link */}
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-wider text-architectural-subtle/50 hover:text-architectural-muted transition-colors cursor-pointer py-1 px-3 rounded-full hover:bg-white/[0.02]"
          >
            <RotateCcw className="w-2.5 h-2.5 opacity-50" />
            <span>Yeniden Başlat</span>
          </button>

          <div className="mt-2 text-center">
            <span className="inline-flex items-center gap-2 text-[11px] text-architectural-subtle/70">
              <ShieldCheck className="w-3.5 h-3.5 text-gold/70" />
              <span>MediArt Craftsmanship • Yüksek Hızlı Mimari Panel & Bağımsız Gayrimenkul Mülkü</span>
            </span>
          </div>
        </div>
      </motion.div>

      {/* SAVED TO SYSTEM CONFIRMATION MODAL */}
      {savedSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="luxury-glass rounded-3xl max-w-md w-full p-8 border border-gold/40 shadow-[0_0_60px_rgba(212,175,55,0.25)] text-center space-y-6 relative">
            <button
              onClick={() => setSavedSuccessModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 bg-gold/20 border border-gold/50 text-gold rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-gold-light">
                KAYIT BAŞARIYLA TAMAMLANDI
              </span>
              <h3 className="font-serif text-2xl font-light text-white">
                Talebiniz Sisteme Kaydedildi
              </h3>
              <p className="text-xs text-architectural-muted leading-relaxed">
                <strong>{leadData.agencyName}</strong> için seçilen <strong>{activePackage.name}</strong> modeli kontrol merkezimize aktarılmıştır. Danışmanımız en kısa sürede dönüş sağlayacaktır.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono space-y-1.5 text-left text-architectural-muted">
              <div className="flex justify-between">
                <span>İrtibat:</span>
                <span className="text-white font-bold">{leadData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span>Seçilen Model:</span>
                <span className="text-gold font-bold">{activePackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Teslimat Süresi:</span>
                <span className="text-white">{activePackage.deliveryDays}</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setSavedSuccessModal(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-obsidian font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:brightness-110"
                >
                  Yönetici Panelinde Gör
                </button>
              )}

              <button
                type="button"
                onClick={() => setSavedSuccessModal(false)}
                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-architectural-muted hover:text-white text-xs transition-colors cursor-pointer"
              >
                Kapat ve İncelemeye Devam Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* LIVE PACKAGE DEMO MODAL */}
      {previewTierModal && (
        <PackageDemoModal
          initialTier={previewTierModal}
          onClose={() => setPreviewTierModal(null)}
          onSelectPackage={(tierId) => setSelectedTier(tierId)}
        />
      )}

    </div>
  );
}
