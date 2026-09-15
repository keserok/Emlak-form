import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export default function TrustStatsBar() {
  const { agentProfile } = useAppState();

  return (
    <section className="bg-white py-10 sm:py-12 border-b border-[#E5E7EB]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {agentProfile.stats && agentProfile.stats.map((stat, idx) => (
            <div key={idx} className="space-y-1 p-2 sm:p-0">
              <div className="text-2xl sm:text-3xl font-semibold text-[#111827] tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-medium text-slate-700">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 font-light">
                {stat.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
