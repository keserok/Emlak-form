import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { PhoneCall, Building2 } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';
import { getTranslations } from '../../data/translations';

export default function MobileQuickDock() {
  const { agentProfile, viewMode, language } = useAppState();

  if (viewMode !== 'showcase') return null;

  const t = getTranslations(language);
  const specialistText = t.dock?.specialist || 'Göktürk Uzmanı';
  const portfolioText = t.dock?.portfolio || 'Portföyler';
  const callText = t.dock?.call || 'Hemen Ara';

  return (
    <div className="md:hidden fixed bottom-16 left-4 right-4 z-40 animate-fade-in">
      <div className="bg-[#111827]/95 backdrop-blur-xl border border-slate-700/80 p-2 rounded-2xl shadow-2xl flex items-center justify-between gap-2 text-white">
        
        {/* Agent Info Mini Badge */}
        <div className="flex items-center gap-2 pl-2">
          <div className="w-8 h-8 rounded-full bg-[#8A735C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            SK
          </div>
          <div className="leading-tight">
            <div className="text-xs font-semibold text-white">{agentProfile.name}</div>
            <div className="text-[10px] text-slate-400">{specialistText}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2">
          <a
            href="#portfoy"
            className="active-press p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 flex items-center gap-1 cursor-pointer tap-target"
            title={portfolioText}
          >
            <Building2 className="w-4 h-4 text-amber-300" />
          </a>

          <a
            href={formatPhoneForCall(agentProfile.phone)}
            className="active-press px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center gap-2 shadow-md cursor-pointer tap-target"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{callText}</span>
          </a>
        </div>

      </div>
    </div>
  );
}
