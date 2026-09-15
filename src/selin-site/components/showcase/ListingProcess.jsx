import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export default function ListingProcess() {
  const { listingProcess } = useAppState();

  return (
    <section id="surec" className="py-14 sm:py-20 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#8A735C]">
            Süreç Yönetimi
          </span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
            5 Adımda Satış Sürecimiz
          </h2>
        </div>

        {/* 5 Minimal Horizontal / Mobile Vertical Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3.5 sm:gap-4">
          {listingProcess.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#FBFBFB] p-5 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between active-press"
            >
              <div className="flex items-center justify-between md:block">
                <div className="text-xs font-bold text-[#8A735C]">
                  ADIM {item.step}
                </div>

                <h3 className="font-semibold text-sm text-[#111827] md:mt-2">
                  {item.title}
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed font-normal pt-1">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
