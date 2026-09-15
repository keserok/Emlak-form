import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { PhoneCall, ArrowUpRight } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';

export default function HeroSection() {
  const { agentProfile, setViewMode, language } = useAppState();

  const t = {
    TR: {
      headline: agentProfile.heroHeadline,
      subheadline: agentProfile.heroSubheadline,
      callButton: `Hemen Arayın (${agentProfile.phone})`,
      formButton: 'Mülk Değerleme Formu'
    },
    EN: {
      headline: "Sell Your Home in Göktürk at Real Value Without Stress.",
      subheadline: "Don't get lost in crowded listing portals. We guide you with 12 years of district mastery, high-net-worth buyers network, and transparent advisory.",
      callButton: `Call Direct (${agentProfile.phone})`,
      formButton: 'Property Valuation Form'
    },
    RU: {
      headline: "Продайте ваш дом в Гёктюрке по реальной стоимости без стресса.",
      subheadline: "Не теряйтесь среди обычных порталов. Мы рядом с вами: 12 лет опыта в районе, закрытая база VIP-покупателей и абсолютная прозрачность.",
      callButton: `Позвонить (${agentProfile.phone})`,
      formButton: 'Форма оценки недвижимости'
    }
  }[language] || {
    headline: agentProfile.heroHeadline,
    subheadline: agentProfile.heroSubheadline,
    callButton: `Hemen Arayın (${agentProfile.phone})`,
    formButton: 'Mülk Değerleme Formu'
  };

  const handleOpenForm = (e) => {
    e?.preventDefault();
    const el = document.getElementById('degerleme');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setViewMode('form');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="bg-[#FBFBFB] pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Minimal Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Simple Muted Region Badge */}
            <div className="inline-block text-[11px] sm:text-xs font-semibold tracking-widest text-[#8A735C] uppercase px-3 py-1 bg-[#F4F1EA] rounded-md border border-[#8A735C]/20">
              {agentProfile.region}
            </div>

            {/* Calm Clean Responsive Headline */}
            <h1 className="text-3xl sm:text-5xl font-semibold text-[#111827] tracking-tight leading-[1.2]">
              {t.headline}
            </h1>

            {/* Concise Calm Subheadline */}
            <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {t.subheadline}
            </p>

            {/* Light Green Call Button & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={formatPhoneForCall(agentProfile.phone)}
                className="active-press inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors cursor-pointer shadow-sm tap-target"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>{t.callButton}</span>
              </a>

              <button
                type="button"
                onClick={handleOpenForm}
                className="active-press inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 border border-[#8A735C]/50 text-sm font-semibold text-[#8A735C] transition-colors cursor-pointer shadow-xs tap-target"
              >
                <span>{t.formButton}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8A735C]" />
              </button>
            </div>

          </div>

          {/* Right Column: Clean Arch Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              <div className="arch-frame overflow-hidden shadow-sm border border-slate-200 bg-[#F4F1EA] aspect-[4/5] active-press">
                <img
                  src={agentProfile.avatarUrl}
                  alt={agentProfile.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Minimal Floating Name Card */}
              <div className="mt-3 sm:mt-4 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                <div className="font-semibold text-sm sm:text-base text-[#111827]">
                  {agentProfile.name}
                </div>
                <div className="text-xs text-[#8A735C] mt-0.5">
                  {agentProfile.title}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
