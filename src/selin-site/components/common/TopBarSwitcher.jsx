import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Eye, LayoutDashboard, Sparkles, RefreshCw, CheckCircle2, FileText } from 'lucide-react';
import { getTranslations } from '../../data/translations';

export default function TopBarSwitcher() {
  const { viewMode, setViewMode, resetToDefaults, publishSuccess, formSubmissions, language } = useAppState();
  const t = getTranslations(language);

  const newSubmissionsCount = formSubmissions?.filter((s) => s.status === 'Yeni').length || 0;

  return (
    <div className="bg-[#111827] text-white border-t border-slate-800 px-4 py-4 text-xs">
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

        {/* View Mode Toggle Pill Bar */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700/80 shadow-inner flex-wrap gap-1">
          <button
            onClick={() => setViewMode('showcase')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'showcase'
                ? 'bg-[#8A735C] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{t.switcher.liveShowcase}</span>
          </button>

          <button
            onClick={() => setViewMode('form')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'form'
                ? 'bg-[#8A735C] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{t.switcher.propForm}</span>
          </button>

          <button
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-[#8A735C] text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{t.switcher.adminPanel}</span>
            {newSubmissionsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                {newSubmissionsCount}
              </span>
            )}
          </button>
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
              <Sparkles className="w-3 h-3 text-amber-400" />
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
