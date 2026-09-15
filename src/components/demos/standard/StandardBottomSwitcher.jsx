import React from 'react';
import { Eye, LayoutDashboard, FileText, Info, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function StandardBottomSwitcher({
  viewMode,
  setViewMode,
  resetToDefaults,
  publishSuccess,
  submissionsCount = 0
}) {
  return (
    <div className="bg-[#111827] text-white border-t border-slate-800 px-4 py-4 text-xs select-none">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        
        {/* Left Brand Identifier */}
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded-lg bg-[#2C3E35] flex items-center justify-center font-bold text-xs text-white shadow-sm border border-emerald-500/30">
            DA
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-xs text-white">Deniz Arslan</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono">
              Standart Paket
            </span>
          </div>
        </div>

        {/* View Mode Toggle Pill Bar */}
        <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700/80 shadow-inner flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setViewMode('showcase')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'showcase'
                ? 'bg-[#2C3E35] text-white shadow-md border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Canlı Vitrin</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('form')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'form'
                ? 'bg-[#2C3E35] text-white shadow-md border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Mülk & Talep Formu</span>
          </button>

          <button
            type="button"
            onClick={() => setViewMode('admin')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              viewMode === 'admin'
                ? 'bg-[#2C3E35] text-white shadow-md border border-emerald-500/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Kontrol Paneli</span>
            {submissionsCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                {submissionsCount}
              </span>
            )}
          </button>
        </div>

        {/* Right Info & Actions */}
        <div className="flex items-center space-x-3">
          {publishSuccess ? (
            <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-full animate-bounce font-medium text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Siteniz Canlıda Güncellendi!</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-amber-300/80 text-[11px] font-mono">
              <Info className="w-3.5 h-3.5 text-amber-400" />
              <span>En alt ve en üst bar müşterilerinize görünmeyecektir</span>
            </span>
          )}

          <button
            type="button"
            onClick={resetToDefaults}
            title="Varsayılanlara Sıfırla"
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
