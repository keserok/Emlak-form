import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';

export default function ContactSection() {
  const { agentProfile, setViewMode } = useAppState();

  return (
    <section id="iletisim" className="py-20 bg-[#111827] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8A735C]">
          Doğrudan İletişim
        </span>

        <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
          Göktürk'teki Gayrimenkulünüz İçin Görüşelim
        </h2>

        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed font-normal">
          Evinizi değerinde satmak, kiraya vermek veya yeni bir portföy incelemek için doğrudan arayabilir ya da online form ile talebinizi iletebilirsiniz.
        </p>

        {/* Action Buttons: Phone & Form */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <a
            href={formatPhoneForCall(agentProfile.phone)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold transition-colors cursor-pointer shadow-md"
          >
            <PhoneCall className="w-4.5 h-4.5 text-white" />
            <span>Selin Hanım'ı Arayın: {agentProfile.phone}</span>
          </a>

          <button
            onClick={() => {
              const el = document.getElementById('degerleme');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                setViewMode('form');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#8A735C] hover:bg-[#a38053] text-white text-sm font-semibold transition-colors cursor-pointer shadow-md"
          >
            <span>Mülk Değerleme & Talep Formu</span>
          </button>
        </div>

        {/* Office Details */}
        <div className="pt-12 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
          <div className="flex flex-col items-center gap-1">
            <MapPin className="w-4 h-4 text-[#8A735C]" />
            <span>{agentProfile.officeAddress}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <PhoneCall className="w-4 h-4 text-[#8A735C]" />
            <span>{agentProfile.phone}</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Mail className="w-4 h-4 text-[#8A735C]" />
            <span>{agentProfile.email}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
