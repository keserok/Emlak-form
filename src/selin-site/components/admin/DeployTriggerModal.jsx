import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { Sparkles, CheckCircle2, CloudUpload, ArrowRight } from 'lucide-react';

export default function DeployTriggerModal() {
  const { isPublishing, setViewMode } = useAppState();

  if (!isPublishing) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-lg animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-[#E8E2D9] shadow-2xl text-center space-y-6">
        
        {/* Animated Processing Icon */}
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full bg-[#8C6D46]/20 animate-ping" />
          <div className="relative w-20 h-20 rounded-full bg-[#1A2530] text-amber-300 flex items-center justify-center border-2 border-[#8C6D46] shadow-xl">
            <CloudUpload className="w-10 h-10 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h3 className="font-serif-title font-bold text-2xl text-[#1A2530]">
            Siteniz Canlıya Aktarılıyor...
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Masaüstünüzden gönderilen tüm değişiklikler ve WebP resimler senkronize ediliyor.
          </p>
        </div>

        {/* Progress Terminal Box */}
        <div className="bg-[#0F1720] text-left p-4 rounded-2xl border border-slate-700/80 font-mono text-[11px] text-slate-300 space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>[00:01] WebP görselleri optimize edildi (Maks 200KB)</span>
          </div>
          <div className="flex items-center gap-2 text-amber-300">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>[00:02] site-data.json paketlendi</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <CloudUpload className="w-3.5 h-3.5" />
            <span>[00:03] GitHub API köprüsü üzerinden commit yollandı</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>[00:05] Vercel Statik Derleme (Build) başlatıldı</span>
          </div>
        </div>

        <div className="text-xs text-slate-400 italic">
          Yaklaşık 30 saniye içinde tüm dünyadaki ziyaretçileriniz yeni içerikleri görecektir.
        </div>

      </div>
    </div>
  );
}
