import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  Send,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  Building,
  Building2,
  Sparkles,
  Phone,
  Award,
  ArrowRight,
  Crown,
  Zap,
  Check,
  Eye,
  X,
  Lock
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
  // Check if this dossier is for a large real estate / construction project
  const isProjectPersona =
    leadData?.answers?.[1] === 'large_development' ||
    (Array.isArray(leadData?.answers?.[1]) &&
      leadData?.answers?.[1].includes('large_development')) ||
    packageResult?.packageTier === 'project';

  // Filter packages for standard persona (never show project to agencies)
  const standardPackages = ALL_PACKAGES.filter((p) => p.id !== 'project');

  // Default active package to the one recommended by algorithm
  const defaultTier = isProjectPersona
    ? 'project'
    : packageResult.packageTier === 'project'
    ? 'standard'
    : packageResult.packageTier || 'standard';

  const [selectedTier, setSelectedTier] = useState(defaultTier);

  // Demo preview modal state ('standard' | 'advanced' | 'premium' | 'project' | null)
  const [previewTierModal, setPreviewTierModal] = useState(null);

  // Save to system state
  const [isSavedToSystem, setIsSavedToSystem] = useState(false);
  const [savedSuccessModal, setSavedSuccessModal] = useState(false);

  const activePackage =
    ALL_PACKAGES.find((p) => p.id === selectedTier) ||
    (isProjectPersona ? ALL_PACKAGES.find((p) => p.id === 'project') : standardPackages[0]);

  const recommendedPackage =
    ALL_PACKAGES.find((p) => p.id === (isProjectPersona ? 'project' : packageResult.packageTier)) ||
    activePackage;

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
              {isProjectPersona
                ? 'Kişiselleştirilmiş Proje Lansman Dosyanız'
                : 'Kişiselleştirilmiş Mimari Dosyanız'}
            </h1>
          </div>

          {/* Agency Identity Pill */}
          <div className="flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/5 text-xs text-architectural-muted">
            <div className="flex items-center gap-2">
              {isProjectPersona ? (
                <Building2 className="w-3.5 h-3.5 text-amber-400" />
              ) : (
                <Building className="w-3.5 h-3.5 text-gold/80" />
              )}
              <span className="text-architectural-white font-medium">
                {leadData.agencyName || 'Belirtilmemiş Firma'}
              </span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold/80" />
              <span className="font-mono text-architectural-white">{leadData.phone}</span>
            </div>
          </div>
        </div>

        {/* 2. Algoritmik Tavsiye & Gerekçe (Minimal & Net) */}
        <div
          className={`my-7 p-6 sm:p-7 rounded-3xl relative overflow-hidden border ${
            isProjectPersona
              ? 'bg-gradient-to-r from-amber-500/[0.12] via-white/[0.02] to-transparent border-amber-400/40'
              : 'bg-gradient-to-r from-gold/[0.12] via-white/[0.02] to-transparent border-gold/35'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center border shadow-sm ${
                  isProjectPersona
                    ? 'bg-amber-400/20 border-amber-400/50 text-amber-400'
                    : 'bg-gold/20 border-gold/50 text-gold'
                }`}
              >
                {isProjectPersona ? (
                  <Building2 className="w-4 h-4" />
                ) : (
                  <Award className="w-4 h-4" />
                )}
              </div>
              <div>
                <span
                  className={`text-[10px] font-mono uppercase tracking-widest block ${
                    isProjectPersona ? 'text-amber-300' : 'text-gold-light'
                  }`}
                >
                  {isProjectPersona
                    ? 'BÜYÜK ÖLÇEKLİ PROJE ANALİZ RAPORU'
                    : 'ANALİZ SONUCU UYGUN GÖRÜLEN MODEL'}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-medium text-architectural-white">
                  {isProjectPersona ? (
                    <span>
                      Önerilen Mimari: <span className="text-amber-400 font-semibold">Büyük Gayrimenkul Projeleri Platformu</span>
                    </span>
                  ) : (
                    <span>
                      Size Uygun Olan Paket: <span className="text-gold font-semibold">{recommendedPackage.name}</span>
                    </span>
                  )}
                </h3>
              </div>
            </div>

            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/50 text-xs font-mono self-start sm:self-auto border ${
                isProjectPersona ? 'border-amber-400/40' : 'border-gold/30'
              }`}
            >
              <Clock className={`w-3.5 h-3.5 ${isProjectPersona ? 'text-amber-400' : 'text-gold'}`} />
              <span className="text-architectural-muted">Teslim:</span>
              <strong className="text-architectural-white">{recommendedPackage.deliveryDays}</strong>
            </div>
          </div>

          <p className="font-serif text-sm sm:text-base text-architectural-white/90 leading-relaxed italic border-t border-white/10 pt-3.5">
            "{packageResult.rationale}"
          </p>

          {!isProjectPersona && selectedTier !== recommendedPackage.id && (
            <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-architectural-muted">Farklı bir modeli inceliyorsunuz.</span>
              <button
                onClick={() => handleSelectTier(recommendedPackage.id)}
                className="text-gold hover:text-gold-light underline font-medium cursor-pointer"
              >
                Önerilen Modele Dön ({recommendedPackage.name})
              </button>
            </div>
          )}
        </div>

        {/* 3. ANA SUNUM ALANI */}
        {isProjectPersona ? (
          /* =========================================================================
             PERSONA B: BÜYÜK GAYRİMENKUL PROJELERİ - TEK GENİŞ EKRAN PRESTİJ KARTI
             ========================================================================= */
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full rounded-3xl p-6 sm:p-10 md:p-12 luxury-glass border-2 border-amber-400/70 shadow-[0_0_50px_rgba(245,158,11,0.2)] ring-1 ring-amber-400/30 relative overflow-hidden"
            >
              {/* Top Moving Laser Sheen */}
              <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.9)]"
                />
              </div>

              {/* Card Header: Badges & Identity */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-obsidian flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                    <Building2 className="w-6 h-6 stroke-[2.5]" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 text-[10px] font-mono tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        <span>İNTERAKTİF & DİNAMİK MİMARİ ALTYAPI</span>
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono tracking-wider text-architectural-muted">
                        İNŞAAT & PROJE GELİŞTİRİCİ
                      </span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-architectural-white font-medium">
                      Büyük Gayrimenkul Projeleri Lansman Platformu
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-black/60 border border-amber-400/40 text-xs font-mono self-start sm:self-auto text-amber-300">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Teslim:</span>
                  <strong className="text-white">Proje Kapsamına Göre Özel Takvim</strong>
                </div>
              </div>

              {/* Proje Açıklaması */}
              <p className="text-sm sm:text-base text-architectural-muted/90 font-light leading-relaxed my-5">
                Konut, karma yaşam veya villa projeniz için statik şablonlardan arındırılmış, etkileşimli kat planı ve bağımsız bölüm seçimine, dinamik ünite stok altyapısına ve doğrudan satış ofisi köprüsüne sahip yeni nesil dijital satış platformu.
              </p>

              {/* 4 Ana Mimari Madde (2x2 Grid) */}
              <div className="my-6 pt-2">
                <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold mb-4">
                  PROJE MİMARİSİNE DAHİL EDİLEN ÇÖZÜMLER (4 TEMEL DİREK):
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Item 1 */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 transition-colors flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">
                        İnteraktif Kat & Daire Planı Seçicisi
                      </h4>
                      <p className="text-xs text-architectural-muted leading-relaxed">
                        Ziyaretçilerin blok, kat ve daire tiplerini tıklayarak anında mimari planları ve müsaitlik durumunu incelediği modern kullanıcı deneyimi.
                      </p>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 transition-colors flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">
                        Dinamik Ünite Stok & Satış Yönetim Paneli
                      </h4>
                      <p className="text-xs text-architectural-muted leading-relaxed">
                        Satıldı, rezerve veya satışta durumlarının satış ekibiniz tarafından anında güncellendiği bağımsız bulut panel altyapısı.
                      </p>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 transition-colors flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">
                        Yüksek Hızlı Lansman Aurası & Dijital Broşür
                      </h4>
                      <p className="text-xs text-architectural-muted leading-relaxed">
                        Mobil uyumlu, kat planı ve e-katalog indirme modülü ile doğrudan satış ofisine bağlanan VIP WhatsApp iletişim hattı.
                      </p>
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-amber-400/40 transition-colors flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-white mb-1">
                        Küresel Yatırımcı & Çok Dilli Sunum Altyapısı
                      </h4>
                      <p className="text-xs text-architectural-muted leading-relaxed">
                        Uluslararası fonlar ve yerel alıcılar için İngilizce, Arapça veya Rusça çok dilli mimari sunum ve lead toplama köprüsü.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Özel İletişim & Danışmanlık Uyarısı */}
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/[0.12] border border-amber-400/50 text-xs text-amber-100/95 leading-relaxed font-mono flex items-start gap-3 my-5">
                <span className="text-amber-400 text-lg shrink-0 leading-none mt-0.5">✦</span>
                <div>
                  <strong className="text-amber-300 block mb-1 text-[13px] uppercase tracking-wider">
                    ÖZEL MİMARİ DANIŞMANLIK & PLANLAMA BİLGİLENDİRMESİ
                  </strong>
                  <span>
                    Büyük ölçekli inşaat ve konut projeleri, bağımsız mimari planlama ve veri modellemesi gerektirir. Projenizin büyüklüğüne ve lansman hedeflerinize en uygun dijital satış operasyonunu kurgulamak için <strong>sizinle özel iletişime geçmemiz gerekmektedir.</strong>
                  </span>
                </div>
              </div>

              {/* Canlı Etkileşimli Demo Butonu (Kilitli) */}
              <button
                type="button"
                onClick={() => setPreviewTierModal('project')}
                className="w-full mt-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent border border-amber-400/50 hover:border-amber-400 text-amber-200 hover:text-white text-xs sm:text-sm flex items-center justify-between transition-all group cursor-pointer shadow-lg hover:shadow-amber-500/20"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <Lock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 block font-bold">
                        ÖZEL MİMARİ DEMO
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[9px] font-mono font-bold">
                        🔒 KİLİTLİ
                      </span>
                    </div>
                    <span className="text-architectural-white font-semibold text-sm">
                      Örnek Proje Mimarisi Demosu (Erişim Korumalı • İncele)
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-amber-400 group-hover:translate-x-1 transition-transform text-xs font-mono font-bold">
                  <span>Kilitli Demo</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>
            </motion.div>
          </div>
        ) : (
          /* =========================================================================
             PERSONA A: EMLAK OFİSİ / BUTİK DANIŞMAN - 3'LÜ STANDART IZGARA
             ========================================================================= */
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {standardPackages.map((pkg) => {
                const isRecommended = pkg.id === recommendedPackage.id;
                const isSelected = pkg.id === selectedTier;
                const isPremium = pkg.id === 'premium';
                const isAdvanced = pkg.id === 'advanced';

                return (
                  <motion.div
                    key={pkg.id}
                    onClick={() => handleSelectTier(pkg.id)}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative rounded-3xl p-6 cursor-pointer transition-all duration-500 overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? isPremium
                          ? 'bg-gradient-to-b from-gold/[0.12] via-white/[0.03] to-obsidian border-2 border-gold shadow-[0_0_30px_rgba(212,175,55,0.25)] ring-1 ring-gold/40'
                          : isAdvanced
                          ? 'bg-gradient-to-b from-blue-500/[0.06] via-white/[0.03] to-obsidian border-2 border-gold/80 shadow-[0_0_25px_rgba(212,175,55,0.2)] ring-1 ring-gold/30'
                          : 'bg-gradient-to-b from-emerald-500/[0.05] via-white/[0.02] to-obsidian border border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.15)] ring-1 ring-gold/20'
                        : 'bg-white/[0.02] border border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                    }`}
                  >
                    {/* Top Rim Laser Sheen for Premium */}
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

                    {/* Top Rim Laser Sheen for Advanced */}
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
                            <span className="px-2 py-0.5 rounded-full bg-gold/20 border border-gold/50 text-[9px] font-mono tracking-wider text-gold-light font-bold">
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
                        <h4 className="font-serif text-lg sm:text-xl text-architectural-white font-medium mb-1 group-hover:text-gold-light transition-colors">
                          {pkg.name}
                        </h4>
                        <p className="text-xs text-gold/90 font-medium mb-3">
                          {pkg.target}
                        </p>
                      </div>

                      {/* Features per Package */}
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
                              className="flex items-start gap-2 text-xs text-architectural-muted leading-relaxed"
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
                                className={`transition-colors text-[11px] sm:text-xs ${
                                  isSelected
                                    ? 'text-architectural-white font-normal'
                                    : 'text-architectural-muted/90'
                                }`}
                              >
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Live Demo Preview Button (Locked for Premium) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewTierModal(pkg.id);
                        }}
                        className={`w-full mt-5 py-2.5 px-3 rounded-xl border font-medium text-[11px] flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs group/btn relative z-10 ${
                          pkg.id === 'premium'
                            ? 'bg-amber-500/10 hover:bg-amber-500/20 border-amber-400/40 hover:border-amber-400 text-amber-300'
                            : 'bg-white/[0.04] hover:bg-gold/15 border-white/10 hover:border-gold/50 text-gold-light'
                        }`}
                      >
                        {pkg.id === 'premium' ? (
                          <>
                            <Lock className="w-3.5 h-3.5 text-amber-400 group-hover/btn:scale-110 transition-transform" />
                            <span>Örnek Siteyi İncele (🔒 VIP Kilitli)</span>
                            <ArrowRight className="w-3 h-3 text-amber-400/70 group-hover/btn:translate-x-0.5 transition-transform" />
                          </>
                        ) : (
                          <>
                            <Eye className="w-3.5 h-3.5 text-gold group-hover/btn:scale-110 transition-transform" />
                            <span>Örnek Siteyi İncele (Canlı Demo)</span>
                            <ArrowRight className="w-3 h-3 text-gold/70 group-hover/btn:translate-x-0.5 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Card Bottom: Delivery Time & Select State */}
                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between relative z-10 text-xs font-mono">
                      <div className="flex items-center gap-1 text-[11px] text-architectural-muted">
                        <Clock className="w-3 h-3 text-gold/80" />
                        <span>{pkg.deliveryDays}</span>
                      </div>

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
                          {(isPremium || isAdvanced) && (
                            <motion.div
                              initial={{ x: '-100%' }}
                              animate={{ x: '200%' }}
                              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none -skew-x-12"
                            />
                          )}
                          <Check className="w-3.5 h-3.5 stroke-[2.5] relative z-10" />
                          <span className="relative z-10">Seçildi</span>
                        </div>
                      ) : (
                        <div className="px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/10 group-hover:border-gold/40 group-hover:bg-white/[0.05] text-architectural-muted group-hover:text-white text-xs transition-all duration-300 flex items-center gap-1">
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
        )}

        {/* 4. Action CTA Bar: Save to System, WhatsApp & Restart */}
        <div className="flex flex-col items-center gap-4 pt-6 border-t border-white/10">
          {/* BUTTON 1: "Sisteme Kaydet ve Dönüş Bekle" */}
          <button
            type="button"
            onClick={handleSaveToSystemClick}
            className={`relative overflow-hidden w-full sm:w-auto min-w-[320px] px-10 py-4 rounded-full flex items-center justify-center gap-3 text-xs uppercase tracking-luxury font-bold transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98] ${
              isSavedToSystem
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                : isProjectPersona
                ? 'bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 text-obsidian shadow-[0_0_30px_rgba(245,158,11,0.35)] hover:shadow-[0_0_45px_rgba(245,158,11,0.5)]'
                : 'bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-obsidian shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)]'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-obsidian relative z-10" />
            <span className="relative z-10">
              {isSavedToSystem
                ? '✓ Sisteme Kaydedildi (Dönüş Bekleniyor)'
                : isProjectPersona
                ? 'Proje Talebini Kaydet ve Dönüş Bekle'
                : 'Sisteme Kaydet ve Dönüş Bekle'}
            </span>
          </button>

          {/* BUTTON 2: "WhatsApp'tan Gönder" */}
          <button
            type="button"
            onClick={handleWhatsAppClick}
            className="relative overflow-hidden w-full sm:w-auto min-w-[320px] px-10 py-4 rounded-full flex items-center justify-center gap-3 text-xs uppercase tracking-luxury font-bold bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-obsidian shadow-[0_0_30px_rgba(16,185,129,0.3)] hover:shadow-[0_0_45px_rgba(16,185,129,0.45)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'linear', delay: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -skew-x-12"
            />
            <Send className="w-4 h-4 relative z-10" />
            <span className="relative z-10">
              {isProjectPersona
                ? 'Büyük Proje İçin Özel İletişime Geç (WhatsApp)'
                : `${activePackage.name} Teklifini WhatsApp'tan Gönder`}
            </span>
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
              <span>
                {isProjectPersona
                  ? 'MediArt Craftsmanship • Büyük Ölçekli Projeler İçin İnteraktif Lansman Mimarisi'
                  : 'MediArt Craftsmanship • Yüksek Hızlı Mimari Panel & Bağımsız Gayrimenkul Mülkü'}
              </span>
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
