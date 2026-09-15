import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { PhoneCall, ArrowUpRight, MapPin, ShieldCheck } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';
import { getTranslations } from '../../data/translations';

export default function HeroSection() {
  const { agentProfile, setViewMode, language } = useAppState();
  const tHero = getTranslations(language).hero;

  const headline = language !== 'TR' ? tHero.headline : agentProfile.heroHeadline;
  const subheadline = language !== 'TR' ? tHero.subheadline : agentProfile.heroSubheadline;
  const callButton = tHero.callBtn(agentProfile.phone);
  const formButton = tHero.formBtn;
  const displayRegion = (language !== 'TR' && tHero?.region) ? tHero.region : agentProfile.region;
  const displayTitle = (language !== 'TR' && tHero?.title) ? tHero.title : agentProfile.title;

  const handleOpenForm = (e) => {
    e?.preventDefault();
    setViewMode('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="hero" className="bg-[#FBFBFB] pt-10 pb-16 sm:pt-16 sm:pb-24 border-b border-[#E5E7EB] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Elegant Region Pill */}
            <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-widest text-[#8A735C] uppercase px-3.5 py-1.5 bg-[#F4F1EA] rounded-full border border-[#8A735C]/20 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#8A735C]" />
              <span>{displayRegion}</span>
            </div>

            {/* Calm Clean Responsive Headline */}
            <h1 className="text-3xl sm:text-5xl font-semibold text-[#111827] tracking-tight leading-[1.2]">
              {headline}
            </h1>

            {/* Concise Calm Subheadline */}
            <p className="text-sm sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {subheadline}
            </p>

            {/* Tactile Call Button & Secondary Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <a
                href={formatPhoneForCall(agentProfile.phone)}
                className="active-press inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white text-sm font-semibold transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 tap-target"
              >
                <PhoneCall className="w-4 h-4 text-white" />
                <span>{callButton}</span>
              </a>

              <button
                type="button"
                onClick={handleOpenForm}
                className="active-press inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white hover:bg-[#FAF8F5] active:scale-[0.98] border border-[#D9D1C3] hover:border-[#8A735C] text-sm font-semibold text-[#111827] transition-all duration-200 cursor-pointer shadow-xs hover:shadow-sm hover:-translate-y-0.5 tap-target"
              >
                <span>{formButton}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8A735C]" />
              </button>
            </div>

          </div>

          {/* Right Column: Layered Editorial Arch Portrait */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-sm">
              
              {/* Subtle Layered Offset Architectural Frame */}
              <div className="absolute -inset-2.5 border border-[#8A735C]/25 rounded-t-[140px] rounded-b-3xl -z-10 transform -rotate-1 hidden sm:block pointer-events-none" />

              <div className="arch-frame overflow-hidden shadow-md border border-slate-200/90 bg-[#F4F1EA] aspect-[4/5] relative group">
                <img
                  src={agentProfile.avatarUrl}
                  alt={agentProfile.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                />
              </div>

              {/* Minimal Floating Name Card */}
              <div className="mt-3 sm:mt-4 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/80 shadow-md text-center">
                <div className="flex items-center justify-center gap-1.5">
                  <span className="font-semibold text-sm sm:text-base text-[#111827]">
                    {agentProfile.name}
                  </span>
                  <ShieldCheck className="w-4 h-4 text-emerald-600" title="Doğrulanmış Lisanslı Danışman" />
                </div>
                <div className="text-xs text-[#8A735C] mt-0.5 font-medium">
                  {displayTitle}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
