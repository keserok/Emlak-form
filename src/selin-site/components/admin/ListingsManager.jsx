import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import SingleListingForm from './SingleListingForm';
import { Building, Plus, Edit2, Trash2, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ListingsManager() {
  const { listings, updateListing, addListing, deleteListing } = useAppState();
  const [editingListing, setEditingListing] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleSaveListing = (formData) => {
    if (editingListing) {
      updateListing(editingListing.id, formData);
      setEditingListing(null);
    } else if (isAddingNew) {
      const success = addListing(formData);
      if (success) setIsAddingNew(false);
    }
  };

  const toggleSoldStatus = (item) => {
    const newStatus = item.status === 'Satıldı' ? 'Aktif' : 'Satıldı';
    const newBadge = newStatus === 'Satıldı' ? 'Satıldı' : 'Öne Çıkan Seçki';
    updateListing(item.id, { status: newStatus, badge: newBadge });
  };

  return (
    <div className="space-y-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D9] shadow-sm">
      
      {/* Header */}
      <div className="border-b border-[#E8E2D9] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif-title font-bold text-2xl text-[#1A2530] flex items-center gap-2">
            <Building className="w-6 h-6 text-[#8C6D46]" />
            Öne Çıkan 6 Portföy İlanınız
          </h2>
          <p className="text-xs text-slate-500 font-sans mt-0.5">
            Ziyaretçilerin soğuk ilan kalabalığında boğulmaması için en fazla 6 adet öne çıkan mülk sergilenir.
          </p>
        </div>

        <button
          onClick={() => {
            if (listings.length >= 6) {
              alert('En fazla 6 adet öne çıkan ilan yükleyebilirsiniz.');
              return;
            }
            setIsAddingNew(true);
          }}
          disabled={listings.length >= 6}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs transition-all shadow-sm cursor-pointer ${
            listings.length >= 6
              ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
              : 'bg-[#1A2530] hover:bg-[#8C6D46] text-white'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Portföy Ekle ({listings.length}/6)</span>
        </button>
      </div>

      {/* Listings 6 Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => {
          const isSold = item.status === 'Satıldı';

          return (
            <div
              key={item.id}
              className="bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] overflow-hidden flex flex-col justify-between shadow-xs hover:border-[#8C6D46] transition-colors"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] bg-slate-200 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      isSold ? 'bg-rose-900 text-rose-100' : 'bg-[#1A2530] text-amber-200'
                    }`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] font-semibold bg-white/90 text-[#1A2530] px-2 py-0.5 rounded-full">
                      WebP Optimizeli
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-2">
                  <div className="font-serif-title font-bold text-lg text-[#8C6D46]">
                    {item.price}
                  </div>
                  <h4 className="font-bold text-sm text-[#1A2530] line-clamp-1">
                    {item.title}
                  </h4>
                  <div className="text-xs text-slate-500 font-medium">
                    {item.bedrooms} • {item.area} • {item.location}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => toggleSoldStatus(item)}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-semibold border transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                    isSold
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isSold ? 'Aktif Satışa Çevir' : 'Satıldı Olarak İşaretle'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setEditingListing(item)}
                    className="flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-white border border-[#E8E2D9] text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-[#8C6D46]" />
                    <span>Düzenle</span>
                  </button>

                  <button
                    onClick={() => deleteListing(item.id)}
                    className="flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-white border border-[#E8E2D9] text-xs font-medium text-rose-600 hover:bg-rose-50 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Single Listing Form Modal */}
      {(editingListing || isAddingNew) && (
        <SingleListingForm
          listing={editingListing}
          onSave={handleSaveListing}
          onClose={() => {
            setEditingListing(null);
            setIsAddingNew(false);
          }}
        />
      )}

    </div>
  );
}
