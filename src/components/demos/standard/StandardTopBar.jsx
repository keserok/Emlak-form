import React from 'react';
import { ArrowLeft, Info } from 'lucide-react';

export default function StandardTopBar({ onReturn }) {
  return (
    <div className="sticky top-0 z-50 bg-[#111827] text-white border-b border-white/10 px-4 py-2.5 shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onReturn && (
            <button
              type="button"
              onClick={onReturn}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white tracking-wide transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
              <span>← Emlak Formuna Dön</span>
            </button>
          )}
          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Canlı Örnek: Deniz Arslan (Standart Paket)</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-mono">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>En alt ve en üst bar müşterilerinize görünmeyecektir</span>
        </div>
      </div>
    </div>
  );
}
