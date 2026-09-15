import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LeadGate({ onProceed, onSecretAdminTrigger }) {
  const [agencyName, setAgencyName] = useState('');
  const [phone, setPhone] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const isValid = agencyName.trim().length >= 2 && phone.trim().length >= 3;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) {
      setErrorMsg('Lütfen her iki alanı da eksiksiz doldurunuz.');
      return;
    }

    const cleanAgency = agencyName.trim();
    const cleanPhone = phone.trim();

    // Check for secret MediArt Admin Vault trigger
    if (cleanAgency.toLowerCase() === 'media' && cleanPhone === '0000') {
      onSecretAdminTrigger();
      return;
    }

    // Normal analysis flow
    onProceed({ agencyName: cleanAgency, phone: cleanPhone });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-12 z-20">
      {/* Specular Ambient Halo Behind the Card */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-gold/15 via-gold-bronze/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: -20 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg luxury-glass p-8 sm:p-12 rounded-3xl border border-white/10 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] relative overflow-hidden"
      >
        {/* High-End Architectural Top Rim Light & Specular Glow */}
        <div className="absolute top-0 inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-gold-shimmer to-transparent opacity-90 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[2.5px] bg-gradient-to-r from-gold/40 via-gold to-gold/40 blur-[2px] pointer-events-none" />
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-64 h-24 bg-gradient-to-b from-gold/25 to-transparent rounded-full blur-[35px] pointer-events-none" />

        {/* Header */}
        <div className="text-center mb-10 pt-2">
          <h2 className="font-serif text-3xl sm:text-4xl text-architectural-white font-light tracking-tight mb-3">
            Markanızı Tanımlayın
          </h2>
          
          <p className="text-sm text-architectural-muted font-light leading-relaxed max-w-sm mx-auto">
            Analiz sonuçlarınız ve özel mimari teklif dosyanız bu kimlik bilgileri üzerinden hazırlanacaktır.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Agency Name Input */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-architectural-muted font-medium">
              Emlak Ofisi / Marka Adı
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-architectural-muted/60 group-focus-within:text-gold transition-colors">
                <Building className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={agencyName}
                onChange={(e) => {
                  setAgencyName(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Örn: Akasya Gayrimenkul veya Adınız Soyadınız"
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-gold/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-gold/40 text-sm text-architectural-white placeholder-architectural-subtle/50 outline-none transition-all duration-300 shadow-inner"
                autoFocus
              />
            </div>
          </div>

          {/* Phone Input (WhatsApp removed) */}
          <div className="space-y-2">
            <label className="block text-xs uppercase tracking-widest text-architectural-muted font-medium">
              Telefon Numarası
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-architectural-muted/60 group-focus-within:text-gold transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Örn: 0532 000 00 00"
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-gold/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-gold/40 text-sm text-architectural-white placeholder-architectural-subtle/50 outline-none transition-all duration-300 shadow-inner"
              />
            </div>
          </div>

          {errorMsg && (
            <p className="text-xs text-rose-400/90 text-center font-light animate-fadeIn">
              {errorMsg}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isValid}
            className={`w-full py-4 px-6 rounded-2xl flex items-center justify-center gap-3 text-xs uppercase tracking-luxury font-semibold transition-all duration-300 ${
              isValid
                ? 'bg-gradient-to-r from-gold via-gold-shimmer to-gold-bronze text-obsidian shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
                : 'bg-white/5 border border-white/5 text-architectural-subtle cursor-not-allowed opacity-60'
            }`}
          >
            <span>Analize Başla</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security & Privacy Guarantee */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-architectural-subtle text-center">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" />
          <span>Verileriniz MediArt gizlilik politikası altında korunur.</span>
        </div>
      </motion.div>
    </div>
  );
}
