import React, { useState, useEffect } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  X, 
  PhoneCall, 
  MapPin, 
  Check, 
  Ruler, 
  Flame, 
  Car, 
  Compass, 
  Calendar, 
  CreditCard,
  MessageCircle,
  Building,
  BedDouble,
  Bath,
  Maximize2
} from 'lucide-react';
import { formatPhoneForCall } from '../../utils/whatsappHelper';
import { getTranslations, localizeListing } from '../../data/translations';

export default function PropertyModal() {
  const { selectedProperty: rawProperty, setSelectedProperty, agentProfile, formatPrice, language } = useAppState();
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
  }, [rawProperty?.id]);

  if (!rawProperty) return null;
  const selectedProperty = localizeListing(rawProperty, language);
  const t = getTranslations(language).modal;

  const gallery = selectedProperty.gallery || [selectedProperty.imageUrl];
  const activeImage = gallery[activePhotoIdx] || selectedProperty.imageUrl;
  const specs = selectedProperty.specs || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-[#E8E2D9] shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setSelectedProperty(null)}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md transition-transform hover:scale-105 cursor-pointer tap-target"
          aria-label={t.close}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cinematic Main Photo Container */}
        <div className="relative aspect-[16/10] w-full bg-slate-900 overflow-hidden">
          <img
            src={activeImage}
            alt={selectedProperty.title}
            className="w-full h-full object-cover transition-all duration-500 ease-out"
          />

          {/* Photo Counter */}
          <div className="absolute bottom-4 right-4 px-3 py-1 rounded-md bg-black/60 backdrop-blur-md text-white/90 text-xs font-mono font-medium">
            {activePhotoIdx + 1} / {gallery.length}
          </div>

          {/* Type Badge */}
          {selectedProperty.type && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[#8A735C] text-[11px] font-bold tracking-wider uppercase border border-[#8A735C]/20 shadow-xs">
              {selectedProperty.type}
            </div>
          )}
        </div>

        {/* Thumbnail Gallery Strip */}
        {gallery.length > 1 && (
          <div className="p-3 sm:px-6 bg-[#FAF8F5] border-b border-[#EAE5DC] flex items-center gap-2 overflow-x-auto">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIdx(idx)}
                className={`relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                  activePhotoIdx === idx
                    ? 'ring-2 ring-[#8A735C] scale-105 shadow-sm opacity-100'
                    : 'opacity-60 hover:opacity-100 border border-slate-200'
                }`}
              >
                <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header Title & Price */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#EAE5DC] pb-5">
            <div>
              <h2 className="font-semibold text-xl sm:text-2xl text-[#111827] leading-snug">
                {selectedProperty.title}
              </h2>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 mt-1">
                <MapPin className="w-4 h-4 text-[#8A735C]" />
                <span>{selectedProperty.location}</span>
              </div>
            </div>

            <div className="text-left sm:text-right shrink-0">
              <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{t.marketPrice}</div>
              <div className="font-bold text-2xl text-[#8A735C]">
                {formatPrice(selectedProperty.priceRaw, selectedProperty.price)}
              </div>
            </div>
          </div>

          {/* Quick Specifications Banner */}
          <div className="grid grid-cols-3 gap-3 bg-[#FAF8F5] p-3.5 sm:p-4 rounded-2xl border border-[#E8E2D8] text-center">
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center gap-1 text-slate-500 text-xs font-medium mb-0.5">
                <BedDouble className="w-3.5 h-3.5 text-[#8A735C]" />
                <span>{t.bedrooms}</span>
              </div>
              <div className="font-bold text-sm sm:text-base text-[#111827]">{selectedProperty.bedrooms}</div>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border-x border-[#E8E2D8]">
              <div className="flex items-center gap-1 text-slate-500 text-xs font-medium mb-0.5">
                <Bath className="w-3.5 h-3.5 text-[#8A735C]" />
                <span>{t.bathrooms}</span>
              </div>
              <div className="font-bold text-sm sm:text-base text-[#111827]">{selectedProperty.bathrooms}</div>
            </div>
            <div className="flex flex-col items-center justify-center p-2">
              <div className="flex items-center gap-1 text-slate-500 text-xs font-medium mb-0.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#8A735C]" />
                <span>{t.area}</span>
              </div>
              <div className="font-bold text-sm sm:text-base text-[#111827]">{selectedProperty.area}</div>
            </div>
          </div>

          {/* Architectural Specifications Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {t.specsTitle || 'Mimari & Yapısal Detaylar'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E2D8]">
                <span className="flex items-center gap-2 text-slate-500">
                  <Ruler className="w-3.5 h-3.5 text-[#8A735C]" />
                  <span>{t.specCeiling || 'Tavan Yüksekliği'}</span>
                </span>
                <span className="font-semibold text-slate-800">{specs.ceiling || '3.40 m'}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E2D8]">
                <span className="flex items-center gap-2 text-slate-500">
                  <Flame className="w-3.5 h-3.5 text-[#8A735C]" />
                  <span>{t.specHeating || 'Isıtma Sistemi'}</span>
                </span>
                <span className="font-semibold text-slate-800">{specs.heating || 'Yerden Isıtma'}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E2D8]">
                <span className="flex items-center gap-2 text-slate-500">
                  <Car className="w-3.5 h-3.5 text-[#8A735C]" />
                  <span>{t.specParking || 'Özel Otopark'}</span>
                </span>
                <span className="font-semibold text-slate-800">{specs.parking || '2 Kapalı Araç'}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E2D8]">
                <span className="flex items-center gap-2 text-slate-500">
                  <Compass className="w-3.5 h-3.5 text-[#8A735C]" />
                  <span>{t.specOrientation || 'Cephe & Manzara'}</span>
                </span>
                <span className="font-semibold text-slate-800">{specs.orientation || 'Güney - Doğu'}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E2D8]">
                <span className="flex items-center gap-2 text-slate-500">
                  <Calendar className="w-3.5 h-3.5 text-[#8A735C]" />
                  <span>{t.specYear || 'Yapım Yılı'}</span>
                </span>
                <span className="font-semibold text-slate-800">{specs.year || '2023'}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#E8E2D8]">
                <span className="flex items-center gap-2 text-slate-500">
                  <CreditCard className="w-3.5 h-3.5 text-[#8A735C]" />
                  <span>{t.specDues || 'Tahmini Aidat'}</span>
                </span>
                <span className="font-semibold text-slate-800">{specs.dues || '₺4.800 / Ay'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              {t.overview}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              {selectedProperty.description}
            </p>
          </div>

          {/* Feature Bullets */}
          {selectedProperty.features && selectedProperty.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {t.features}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedProperty.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700 bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8E2D8]">
                    <Check className="w-3.5 h-3.5 text-[#8A735C] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#EAE5DC] flex flex-col sm:flex-row items-center gap-3">
            <a
              href={formatPhoneForCall(agentProfile.phone)}
              className="active-press w-full sm:flex-1 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer tap-target"
            >
              <PhoneCall className="w-4 h-4 text-white" />
              <span>{t.callAction} ({agentProfile.phone})</span>
            </a>

            <a
              href={`https://wa.me/${agentProfile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(t.waMessage(selectedProperty.title))}`}
              target="_blank"
              rel="noopener noreferrer"
              className="active-press w-full sm:w-auto px-5 py-3.5 rounded-xl bg-[#8A735C] hover:bg-[#725e4a] text-white text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer tap-target"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.dossierAction}</span>
            </a>

            <button
              type="button"
              onClick={() => setSelectedProperty(null)}
              className="active-press w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer tap-target"
            >
              {t.close}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}

