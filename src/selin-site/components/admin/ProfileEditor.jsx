import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { compressImageToWebP } from '../../utils/imageCompressor';
import { Upload, Sparkles, CheckCircle2, User, Phone, Mail, MapPin, Award } from 'lucide-react';

export default function ProfileEditor() {
  const { agentProfile, updateProfile, updateStat } = useAppState();
  const [compressionResult, setCompressionResult] = useState(null);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Step 1: INSTANT 0ms UI preview using blob URL (zero waiting!)
    const instantPreviewUrl = URL.createObjectURL(file);
    updateProfile('avatarUrl', instantPreviewUrl);
    setCompressionResult(null);

    // Step 2: Instant Background Hardware Acceleration (takes ~50ms)
    try {
      const startTime = performance.now();
      const res = await compressImageToWebP(file, 1200, 1200, 0.8);
      const processTimeMs = Math.round(performance.now() - startTime);

      updateProfile('avatarUrl', res.dataUrl);
      setCompressionResult({
        originalSizeMB: res.originalSizeMB,
        compressedKB: res.sizeInKB,
        processTimeMs
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-sm">
      
      {/* Section Title */}
      <div className="border-b border-[#E8E2D9] pb-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif-title font-bold text-2xl text-[#1A2530] flex items-center gap-2">
            <User className="w-6 h-6 text-[#8C6D46]" />
            Kişisel Marka & Profil Bilgileriniz
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Canlı sitenizde müşterilerin gördüğü fotoğraf, unvan, biyografi ve iletişim bilgilerinizi buradan düzenleyin.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Photo Upload with WebP Compressor (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Danışman Profil Fotoğrafınız
          </label>

          <div className="relative aspect-[4/5] arch-frame overflow-hidden bg-slate-100 border-2 border-dashed border-[#8C6D46]/40 flex flex-col items-center justify-center p-4 text-center group hover:border-[#8C6D46] transition-colors">
            {agentProfile.avatarUrl ? (
              <img
                src={agentProfile.avatarUrl}
                alt="Profil"
                className="w-full h-full object-cover rounded-t-full"
              />
            ) : (
              <div className="text-slate-400 space-y-2">
                <User className="w-12 h-12 mx-auto" />
                <span className="text-xs font-medium">Fotoğraf Yükleyin</span>
              </div>
            )}

            {/* Hover overlay upload button */}
            <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4">
              <Upload className="w-8 h-8 text-amber-300 mb-2 animate-bounce" />
              <span className="text-xs font-bold">Fotoğrafı Değiştir (Anında Gör)</span>
              <span className="text-[10px] opacity-80 mt-1">Fotoğraf anında ekrana düşer, WebP arka planda 50ms'de sıkıştırılır</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Compression Status Message */}
          {compressionResult && (
            <div className="bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl border border-emerald-200 space-y-1 animate-fade-in">
              <div className="font-bold flex items-center gap-1 text-emerald-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Anında Sıkıştırıldı ({compressionResult.processTimeMs} ms)
              </div>
              <div className="text-[11px] font-sans">
                Orijinal: <span className="font-bold">{compressionResult.originalSizeMB} MB</span> ➔ WebP: <span className="font-bold">{compressionResult.compressedKB} KB</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Form Inputs (8 Cols) */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Adınız Soyadınız
              </label>
              <input
                type="text"
                value={agentProfile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Unvanınız / Uzmanlığınız
              </label>
              <input
                type="text"
                value={agentProfile.title}
                onChange={(e) => updateProfile('title', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Uzmanlık Bölgeniz
              </label>
              <input
                type="text"
                value={agentProfile.region}
                onChange={(e) => updateProfile('region', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Telefon Hattınız
              </label>
              <input
                type="text"
                value={agentProfile.phone}
                onChange={(e) => updateProfile('phone', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ofis Adresiniz
            </label>
            <input
              type="text"
              value={agentProfile.officeAddress}
              onChange={(e) => updateProfile('officeAddress', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Ana Sayfa Sloganı (Hero Başlık)
            </label>
            <textarea
              rows={2}
              value={agentProfile.heroHeadline}
              onChange={(e) => updateProfile('heroHeadline', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Hakkımda Metni
            </label>
            <textarea
              rows={3}
              value={agentProfile.bioDescription}
              onChange={(e) => updateProfile('bioDescription', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
            />
          </div>

        </div>

      </div>

      {/* Prestige Stats Editor */}
      <div className="pt-6 border-t border-[#E8E2D9] space-y-4">
        <h3 className="font-serif-title font-bold text-lg text-[#1A2530] flex items-center gap-2">
          <Award className="w-5 h-5 text-[#8C6D46]" />
          Sayaç & İstatistik Rakamlarınız
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {agentProfile.stats && agentProfile.stats.map((stat, idx) => (
            <div key={idx} className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E2D9] space-y-2">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase block">Değer</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => updateStat(idx, 'value', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-sm font-bold focus:bg-white"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase block">Başlık</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => updateStat(idx, 'label', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 text-xs font-medium focus:bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
