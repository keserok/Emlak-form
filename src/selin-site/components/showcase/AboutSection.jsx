import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { getTranslations } from '../../data/translations';

export default function AboutSection() {
  const { language } = useAppState();
  const t = getTranslations(language);

  return (
    <section id="hakkimda" className="py-14 sm:py-20 bg-[#FBFBFB] border-b border-[#E5E7EB]">
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

        {/* 3 Minimal Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 text-left">
          {t.about.pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 space-y-2 active-press">
              <div className="font-semibold text-sm text-[#111827]">{pillar.title}</div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
