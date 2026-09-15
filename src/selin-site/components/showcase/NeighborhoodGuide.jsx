import React, { useState } from "react";
import { useAppState } from "../../context/AppStateContext";
import { getTranslations } from "../../data/translations";
import { 
  Trophy, 
  Trees, 
  Plane, 
  GraduationCap, 
  ArrowUpRight, 
  MapPin, 
  Clock 
} from "lucide-react";

const PILLAR_ICONS = {
  kemer: Trophy,
  forest: Trees,
  airport: Plane,
  education: GraduationCap
};

const PILLAR_METRICS = {
  kemer: { time: "5 Dk", label: "Country Club" },
  forest: { time: "0 Dk", label: "Orman Hattı" },
  airport: { time: "15 Dk", label: "Havalimanı" },
  education: { time: "3 Dk", label: "Hisar Okulları" }
};

export default function NeighborhoodGuide() {
  const { language } = useAppState();
  const [activePillar, setActivePillar] = useState(null);

  const t = getTranslations(language).neighborhood;
  if (!t) return null;

  return (
    <section id="bolge" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE5DC] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDE7DD] border border-[#D9D1C3] text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A735C]">
            <MapPin className="w-3.5 h-3.5 text-[#8A735C]" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-semibold text-[#111827] tracking-tight leading-snug">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Lifestyle Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.pillars.map((pillar) => {
            const IconComponent = PILLAR_ICONS[pillar.id] || MapPin;
            const metric = PILLAR_METRICS[pillar.id] || { time: "5 Dk", label: "Yakınlık" };
            const isHovered = activePillar === pillar.id;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(pillar.id)}
                onMouseLeave={() => setActivePillar(null)}
                className={"group bg-white rounded-2xl p-6 sm:p-7 border border-[#E8E2D8] transition-all duration-300 flex flex-col justify-between cursor-default " + (isHovered ? "shadow-lg -translate-y-1.5 border-[#8A735C]/50" : "shadow-xs hover:border-[#D0C7B8]")}
              >
                <div className="space-y-4">
                  {/* Top Bar: Minimal Icon + Metric */}
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-xl bg-[#F7F4EE] border border-[#E5DFD3] flex items-center justify-center text-[#8A735C] transition-colors group-hover:bg-[#8A735C] group-hover:text-white">
                      <IconComponent className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FAF8F5] border border-[#E8E2D8] text-[11px] font-semibold text-slate-700">
                      <Clock className="w-3 h-3 text-[#8A735C]" />
                      <span>{metric.time}</span>
                    </div>
                  </div>

                  {/* Tag Pill */}
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A735C] block">
                    {pillar.tag}
                  </span>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-base font-semibold text-[#111827] group-hover:text-[#8A735C] transition-colors leading-snug">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-medium text-slate-500 mt-1">
                      {pillar.subtitle}
                    </div>
                  </div>

                  {/* Editorial Description */}
                  <p className="text-xs text-slate-600 leading-relaxed pt-1 border-t border-slate-100">
                    {pillar.desc}
                  </p>
                </div>

                {/* Subtle Bottom Accent Indicator */}
                <div className="mt-5 pt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium group-hover:text-[#8A735C] transition-colors">
                  <span>{metric.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiet Luxury Trust Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-white/70 backdrop-blur-xs px-4 py-2 rounded-xl border border-[#EAE5DC]">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Göktürk ve Kemerburgaz bölgesindeki tüm mülklerimiz yerel imar ve tapu kontrollerinden geçirilmiştir.</span>
          </div>
        </div>

      </div>
    </section>
  );
}
