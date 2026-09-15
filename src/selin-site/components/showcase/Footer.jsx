import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { getTranslations } from '../../data/translations';

export default function Footer() {
  const { agentProfile, language } = useAppState();
  const t = getTranslations(language);

  const displayTitle = (language !== 'TR' && t.hero?.title) ? t.hero.title : agentProfile.title;
  const displayRegion = (language !== 'TR' && t.hero?.region) ? t.hero.region : agentProfile.region;

  return (
    <footer className="bg-[#0F1720] text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        <div>
          <div className="font-serif-title font-bold text-lg text-white tracking-wide">
            {agentProfile.name}
          </div>
          <div className="text-[#8C6D46] font-medium mt-0.5">
            {displayTitle} - {displayRegion}
          </div>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} {agentProfile.name}. {t.footer.rights}
        </div>

      </div>
    </footer>
  );
}
