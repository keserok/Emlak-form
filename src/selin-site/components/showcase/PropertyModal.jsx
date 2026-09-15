import React from 'react';
import { useAppState } from '../../context/AppStateContext';
import { X, PhoneCall, MapPin, CheckCircle, ShieldCheck } from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';

export default function PropertyModal() {
  const { selectedProperty, setSelectedProperty, agentProfile, formatPrice } = useAppState();

  if (!selectedProperty) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D9] shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProperty(null)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-white/80 hover:bg-white text-slate-700 shadow-md transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative aspect-[16/9] w-full bg-slate-100 overflow-hidden">
          <img
            src={selectedProperty.imageUrl}
            alt={selectedProperty.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-6">
            <div>
              <h2 className="font-semibold text-2xl text-[#111827] leading-snug">
                {selectedProperty.title}
              </h2>
              <div className="flex items-center gap-1.5 text-sm text-slate-600 mt-1">
                <MapPin className="w-4 h-4 text-[#8A735C]" />
                <span>{selectedProperty.location}</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="text-xs uppercase font-bold text-slate-400">Pazar Fiyatı</div>
              <div className="font-bold text-2xl text-[#8A735C]">
                {formatPrice(selectedProperty.priceRaw, selectedProperty.price)}
              </div>
            </div>
          </div>

          {/* Quick Specifications */}
          <div className="grid grid-cols-3 gap-4 bg-[#FBFBFB] p-4 rounded-2xl border border-slate-200 text-center">
            <div>
              <div className="text-xs text-slate-500 font-medium">Oda Sayısı</div>
              <div className="font-bold text-base text-[#111827]">{selectedProperty.bedrooms}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Banyo</div>
              <div className="font-bold text-base text-[#111827]">{selectedProperty.bathrooms}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Alan</div>
              <div className="font-bold text-base text-[#111827]">{selectedProperty.area}</div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Mülk Özeti
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              {selectedProperty.description}
            </p>
          </div>

          {/* Feature Bullets */}
          {selectedProperty.features && selectedProperty.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Donanımlar
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {selectedProperty.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-[#FBFBFB] p-2.5 rounded-xl border border-slate-200">
                    <CheckCircle className="w-4 h-4 text-[#8A735C] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Action CTA */}
          <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={formatPhoneForCall(agentProfile.phone)}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>Telefonla Bilgi Al ({agentProfile.phone})</span>
            </a>

            <a
              href={`https://wa.me/${agentProfile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Merhaba Selin Hanım, "${selectedProperty.title}" mülkünüz hakkında detaylı bilgi ve yatırımcı dosyasını almak istiyorum.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#8A735C] hover:bg-[#725e4a] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <span>Yatırımcı Dosyası İste</span>
            </a>

            <button
              onClick={() => setSelectedProperty(null)}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Kapat
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
