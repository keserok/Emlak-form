import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { getTranslations } from '../../data/translations';
import { MapPin, Shield, Users } from 'lucide-react';

const PILLAR_ICONS = [MapPin, Shield, Users];

export default function AboutSection() {
  const { language } = useAppState();
  const t = getTranslations(language);

  return (
    <section id="hakkimda" className="py-16 sm:py-24 bg-[#FBFBFB] border-b border-[#E5E7EB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8A735C]">
          {t.about.badge}
        </span>

        <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
          {t.about.heading}
        </h2>

        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          {t.about.description}
        </p>

        {/* 3 Minimal Pillars with Pure Architectural Icons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-6 sm:pt-8 text-left">
          {t.about.pillars.map((pillar, idx) => {
            const Icon = PILLAR_ICONS[idx % PILLAR_ICONS.length];
            return (
              <div 
                key={idx} 
                className="group bg-white p-6 rounded-2xl border border-[#E8E2D8] space-y-3 shadow-xs hover:border-[#8A735C]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active-press"
              >
                <div className="w-9 h-9 rounded-xl bg-[#FAF8F5] border border-[#EAE5DC] flex items-center justify-center text-[#8A735C] group-hover:bg-[#8A735C] group-hover:text-white transition-colors duration-200">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="font-semibold text-sm text-[#111827] group-hover:text-[#8A735C] transition-colors">{pillar.title}</div>
                <p className="text-xs text-slate-500 leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
