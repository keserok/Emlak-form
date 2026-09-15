import React, { useState } from 'react';
import { compressImageToWebP, batchCompressImages } from '../../utils/imageCompressor';
import { X, Upload, Sparkles, CheckCircle2, Images } from 'lucide-react';

export default function SingleListingForm({ listing, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: listing?.title || '',
    location: listing?.location || 'Göktürk, Kemerburgaz',
    price: listing?.price || '₺25.000.000',
    type: listing?.type || 'Müstakil Villa',
    status: listing?.status || 'Aktif',
    badge: listing?.badge || 'Öne Çıkan',
    bedrooms: listing?.bedrooms || '4+1',
    bathrooms: listing?.bathrooms || '3 Banyo',
    area: listing?.area || '320 m²',
    features: listing?.features ? listing.features.join(', ') : 'Özel Havuz, Akıllı Ev, Garaj',
    imageUrl: listing?.imageUrl || '/assets/prop-1.jpg',
    galleryUrls: listing?.galleryUrls || [listing?.imageUrl || '/assets/prop-1.jpg'],
    description: listing?.description || ''
  });

  const [compressStats, setCompressStats] = useState(null);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    // STEP 1: INSTANT 0ms UI PREVIEW (Zero Waiting!)
    const instantBlobUrls = files.map((f) => URL.createObjectURL(f));
    setFormData((prev) => ({
      ...prev,
      imageUrl: instantBlobUrls[0],
      galleryUrls: [...instantBlobUrls, ...(prev.galleryUrls || [])]
    }));

    setCompressStats(null);

    // STEP 2: HARDWARE-ACCELERATED FAST PARALLEL WEBP PROCESSING (~1-2 seconds for 20 photos)
    try {
      const startTime = performance.now();
      const batchRes = await batchCompressImages(files, 1200, 800, 0.8);
      const processTimeMs = Math.round(performance.now() - startTime);

      const compressedDataUrls = batchRes.results.map((r) => r.dataUrl);
      const totalOrigMB = batchRes.results.reduce((acc, r) => acc + parseFloat(r.originalSizeMB), 0).toFixed(1);
      const totalCompKB = batchRes.results.reduce((acc, r) => acc + r.sizeInKB, 0);

      setFormData((prev) => ({
        ...prev,
        imageUrl: compressedDataUrls[0],
        galleryUrls: [...compressedDataUrls, ...(prev.galleryUrls || []).filter(u => !u.startsWith('blob:'))]
      }));

      setCompressStats({
        count: files.length,
        totalOrigMB,
        totalCompKB,
        processTimeMs
      });
    } catch (err) {
      console.error('Fast compression error:', err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedFeatures = formData.features
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onSave({
      ...formData,
      features: formattedFeatures
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#E8E2D9] shadow-2xl relative p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
          <h3 className="font-serif-title font-bold text-xl text-[#1A2530]">
            {listing ? 'Portföy İlanını Düzenle' : 'Yeni Öne Çıkan İlan Ekle'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
          
          {/* Image Dropzone & WebP Batch Status */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              İlan Kapak & Galeri Fotoğrafları (Toplu Yükleme - Anında Düşer)
            </label>

            <div className="relative aspect-[16/9] bg-slate-100 rounded-2xl overflow-hidden border-2 border-dashed border-[#8C6D46]/40 flex flex-col items-center justify-center group hover:border-[#8C6D46] transition-colors">
              <img
                src={formData.imageUrl}
                alt="İlan Görseli"
                className="w-full h-full object-cover"
              />

              <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer p-4 text-center">
                <Upload className="w-8 h-8 text-amber-300 mb-2 animate-bounce" />
                <span className="font-bold text-sm">Fotoğraf Seç veya Sürükle (Tekli ya da 20+ Toplu)</span>
                <span className="text-[10px] opacity-90 mt-1">Fotoğraflar anında 0ms'de ekrana yansır, arka planda 1-2 sn'de WebP'ye dönüştürülür</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Instant Compression Stats Badge */}
            {compressStats && (
              <div className="mt-2 bg-emerald-50 text-emerald-800 text-xs p-3 rounded-xl flex items-center gap-2 border border-emerald-200 animate-fade-in">
                <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 shrink-0" />
                <span>
                  <strong>{compressStats.count} adet fotoğraf</strong> {compressStats.processTimeMs} ms'de hazırlandı! (Toplam {compressStats.totalOrigMB} MB ➔ {compressStats.totalCompKB} KB WebP)
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">İlan Başlığı</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fiyat</label>
              <input
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Konum</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Durum / Etiket</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value, badge: e.target.value === 'Satıldı' ? 'Satıldı' : formData.badge })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:outline-none focus:border-[#8C6D46] focus:bg-white"
              >
                <option value="Aktif">Aktif Satışta</option>
                <option value="Satıldı">Satıldı (Referans Portföy)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Oda Sayısı</label>
              <input
                type="text"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Metrekare</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Konut Tipi</label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Öne Çıkan Özellikler (Virgülle ayırın)</label>
            <input
              type="text"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Özel Havuz, Akıllı Ev, Sauna"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:bg-white"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Detaylı İlan Açıklaması</label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-sm focus:bg-white"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer"
            >
              Vazgeç
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#1A2530] hover:bg-[#8C6D46] text-white font-semibold shadow-md cursor-pointer"
            >
              Kaydet & Güncelle
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
