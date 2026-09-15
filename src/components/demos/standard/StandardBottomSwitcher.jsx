import React from 'react';
import { motion } from 'framer-motion';
import { Eye, LayoutDashboard, FileText, Info, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function StandardBottomSwitcher({
  viewMode,
  setViewMode,
  resetToDefaults,
  publishSuccess,
  submissionsCount = 0
}) {
  const tabs = [
    { id: 'showcase', label: 'Canlı Vitrin', icon: Eye },
    { id: 'form', label: 'Mülk & Talep Formu', icon: FileText },
    { id: 'admin', label: 'Kontrol Paneli', icon: LayoutDashboard, badge: submissionsCount }
  ];

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
            <span className="text-slate-400 font-light">•</span>
            <span className="text-xs text-amber-200/90 font-medium">Butik Gayrimenkul</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/60 font-mono">
              Standart Paket
            </span>
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
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="standardBottomTab"
                    className="absolute inset-0 bg-[#2C3E35] rounded-lg shadow-md border border-emerald-500/40 -z-10"
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
