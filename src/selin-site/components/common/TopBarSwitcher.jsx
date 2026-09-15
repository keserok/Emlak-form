import React from 'react';
import { motion } from 'framer-motion';
import { useAppState } from '../../context/AppStateContext';
import { Eye, LayoutDashboard, Info, RefreshCw, CheckCircle2, FileText } from 'lucide-react';
import { getTranslations } from '../../data/translations';

export default function TopBarSwitcher() {
  const { viewMode, setViewMode, resetToDefaults, publishSuccess, formSubmissions, language } = useAppState();
  const t = getTranslations(language);

  const newSubmissionsCount = formSubmissions?.filter((s) => s.status === 'Yeni').length || 0;

  const tabs = [
    { id: 'showcase', label: t.switcher.liveShowcase, icon: Eye },
    { id: 'form', label: t.switcher.propForm, icon: FileText },
    { id: 'admin', label: t.switcher.adminPanel, icon: LayoutDashboard, badge: newSubmissionsCount }
  ];

  return (
    <div className="bg-[#111827] text-white border-t border-slate-800 px-4 py-4 text-xs select-none">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Brand Identifier */}
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-[#8A735C] flex items-center justify-center font-bold text-xs text-white shadow-sm">
            SK
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-white">Selin Karaca</span>
          </div>
        </div>

        {/* View Mode Toggle Pill Bar with smooth sliding indicator */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700/80 shadow-inner flex-wrap gap-1 relative">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setViewMode(tab.id)}
                className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer z-10 ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="selinBottomTab"
                    className="absolute inset-0 bg-[#8A735C] rounded-lg shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center space-x-3">
          {publishSuccess ? (
            <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full animate-bounce font-medium text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {t.switcher.siteUpdated || 'Siteniz Canlıda Güncellendi!'}
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-300/80 text-[11px] font-mono">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.banner.helperNotice}</span>
            </span>
          )}

          <button
            onClick={resetToDefaults}
            title={t.switcher.resetDefaults}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
