import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { getTranslations } from '../../data/translations';

export default function ListingProcess() {
  const { language } = useAppState();
  const t = getTranslations(language);

  return (
    <section id="surec" className="py-14 sm:py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A735C]">
            {t.process.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
            {t.process.title}
          </h2>
        </div>

        {/* 5 Minimal Horizontal / Mobile Vertical Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-4">
          {t.process.steps.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#FAF8F5] p-5 sm:p-6 rounded-2xl border border-[#E8E2D8] space-y-3 flex flex-col justify-between hover:bg-white hover:border-[#8A735C]/60 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active-press"
            >
              <div>
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E8E2D8] flex items-center justify-center text-xs font-mono font-bold text-[#8A735C] group-hover:bg-[#8A735C] group-hover:text-white transition-colors">
                  {item.step}
                </div>

                <h3 className="font-semibold text-sm text-[#111827] mt-3 group-hover:text-[#8A735C] transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1 border-t border-slate-100">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
