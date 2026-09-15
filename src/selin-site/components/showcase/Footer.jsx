import React from 'react';
import { useAppState } from '../../context/AppStateContext';

export default function Footer() {
  const { agentProfile } = useAppState();

  return (
    <footer className="bg-[#0F1720] text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        <div>
          <div className="font-serif-title font-bold text-lg text-white tracking-wide">
            {agentProfile.name}
          </div>
          <div className="text-[#8C6D46] font-medium mt-0.5">
            {agentProfile.title} - {agentProfile.region}
          </div>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} {agentProfile.name}. Tüm hakları saklıdır. Masaüstü Vitrin Kontrol Merkezi ile Güçlendirilmiştir.
        </div>

      </div>
    </footer>
  );
}
