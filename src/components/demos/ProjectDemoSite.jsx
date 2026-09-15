import React, { useState } from 'react';
import { 
  Building2, 
  Maximize2, 
  CheckCircle2, 
  Clock, 
  Send, 
  Download, 
  Phone, 
  ShieldCheck
} from 'lucide-react';

const PROJECT_UNITS = [
  {
    id: 'A-42',
    block: 'A Blok',
    floor: '4. Kat',
    type: '2+1 Bahçe Dubleksi',
    areaGross: '148 m²',
    areaNet: '118 m²',
    facade: 'Güney - Orman Cepheli',
    status: 'available',
    price: '₺16.400.000',
    planImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    specs: ['3.20 m Tavan', '32 m² Özel Teras', 'Yerden Isıtma Rehau', '2 Araç Kapalı Otopark']
  },
  {
    id: 'A-75',
    block: 'A Blok',
    floor: '7. Kat',
    type: '3+1 Panoramik Rezidans',
    areaGross: '210 m²',
    areaNet: '172 m²',
    facade: 'Güney - Doğu, Vadi Manzaralı',
    status: 'reserved',
    price: '₺24.800.000',
    planImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    specs: ['3.40 m Tavan', 'Ada Mutfak & Gaggenau', 'Giyinme Odası', '2 Araç Kapalı Otopark']
  },
  {
    id: 'B-12',
    block: 'B Blok',
    floor: '1. Kat',
    type: '2+1 Bahçe Dubleksi',
    areaGross: '135 m²',
    areaNet: '106 m²',
    facade: 'Batı - Peyzaj Havuz',
    status: 'sold',
    price: '₺14.900.000',
    planImg: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
    specs: ['28 m² Bahçe Tahsisli', 'VRF Klima', 'Akıllı Ev Otomasyonu', 'Depo Alanı']
  },
  {
    id: 'B-92',
    block: 'B Blok',
    floor: '9. Kat',
    type: '4+1 Penthouse Suite',
    areaGross: '340 m²',
    areaNet: '285 m²',
    facade: 'Panoramik Orman & Şehir',
    status: 'available',
    price: '₺46.000.000',
    planImg: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
    specs: ['3.80 m Galeri Boşluğu', '75 m² Seyir Terası', 'Özel Jakuzi & Sauna', '3 Araç Kapalı Otopark']
  },
  {
    id: 'A-21',
    block: 'A Blok',
    floor: '2. Kat',
    type: '1+1 Executive Suite',
    areaGross: '82 m²',
    areaNet: '64 m²',
    facade: 'Kuzey - Doğu Peyzaj',
    status: 'available',
    price: '₺9.200.000',
    planImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    specs: ['Yüksek Kira Getirisi', 'Balkonlu', 'Gömme Ankastre', '1 Araç Otopark']
  },
  {
    id: 'B-84',
    block: 'B Blok',
    floor: '8. Kat',
    type: '3+1 Panoramik Rezidans',
    areaGross: '205 m²',
    areaNet: '168 m²',
    facade: 'Güney - Vadi Manzaralı',
    status: 'available',
    price: '₺23.500.000',
    planImg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    specs: ['Geniş Cam Cephe', 'Ebeveyn Banyosu', 'Çamaşır Odası', '2 Araç Otopark']
  }
];

export default function ProjectDemoSite() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedUnit, setSelectedUnit] = useState(PROJECT_UNITS[0]);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [bookedOffice, setBookedOffice] = useState(false);

  const filterTypes = [
    { id: 'all', label: 'Tüm Üniteler (6)' },
    { id: '2+1 Bahçe Dubleksi', label: '2+1 Dubleks' },
    { id: '3+1 Panoramik Rezidans', label: '3+1 Rezidans' },
    { id: '4+1 Penthouse Suite', label: '4+1 Penthouse' }
  ];

  const filteredUnits = selectedType === 'all' 
    ? PROJECT_UNITS 
    : PROJECT_UNITS.filter(u => u.type === selectedType);

  const handleDownloadBrochure = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  const handleBookOffice = () => {
    setBookedOffice(true);
    setTimeout(() => setBookedOffice(false), 4000);
  };

  return (
    <div className="bg-[#0D0F12] text-slate-100 min-h-screen font-sans selection:bg-amber-500 selection:text-black">
      
      {/* 1. Hero Lansman Banner */}
      <section className="relative min-h-[500px] flex flex-col justify-between p-6 sm:p-12 md:p-16 border-b border-white/10 overflow-hidden">
        {/* Cinematic Backdrop Image */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1800&q=85"
            alt="Project Architecture"
            className="w-full h-full object-cover object-center brightness-[0.45] contrast-[1.1] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F12] via-[#0D0F12]/60 to-[#0D0F12]/80" />
        </div>

        {/* Top Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
                VIERA RESIDENCE & PARK
              </span>
              <span className="text-[10px] uppercase tracking-wider text-slate-400">
                Lüks Markalı Konut Lansmanı
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-amber-500/40 text-[11px] font-mono text-amber-300">
            <Clock className="w-3.5 h-3.5" />
            <span>Teslim: 2026 Q4 • Lansman Öncesi Özel Fiyat</span>
          </div>
        </div>

        {/* Center Editorial Pitch */}
        <div className="my-auto py-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono text-amber-300 uppercase tracking-widest mb-4">
            <span>⚡ İnteraktif & Dinamik Proje Altyapısı</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white font-light tracking-tight leading-[1.1] mb-5">
            Ormanın Kıyısında, <br />
            <span className="italic text-amber-400 font-normal">Zamanın Ötesinde</span> Bir Yaşam.
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-xl mb-6">
            180 seçkin konut, bağımsız peyzaj terasları ve mimari zarafet. Statik katalogların ötesine geçin; daire planlarını ve ünite stok durumlarını canlı olarak inceleyin.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleDownloadBrochure}
              className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>{downloadSuccess ? 'Katalog İndirildi ✓' : 'Proje E-Kataloğunu İndir'}</span>
            </button>

            <button
              onClick={handleBookOffice}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{bookedOffice ? 'Talebiniz Alındı ✓' : 'Satış Ofisi Randevusu'}</span>
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10 text-xs font-mono">
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Toplam Ünite</span>
            <strong className="text-white text-base sm:text-lg">180 Konut</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Peyzaj Oranı</span>
            <strong className="text-amber-400 text-base sm:text-lg">%74 Yeşil Alan</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Sosyal Donatılar</span>
            <strong className="text-white text-base sm:text-lg">Özel Kulüp & Spa</strong>
          </div>
          <div>
            <span className="text-slate-400 text-[10px] block uppercase">Konum</span>
            <strong className="text-white text-base sm:text-lg">Göktürk Orman Hattı</strong>
          </div>
        </div>
      </section>

      {/* 2. İnteraktif Kat Planı & Ünite Seçici Modülü */}
      <section className="p-6 sm:p-12 md:p-16 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-2">
              CANLI STOK & MİMARİ KAT PLANI SEÇİCİ
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl text-white font-light">
              Daireleri ve Kat Planlarını İnceleyin
            </h2>
          </div>

          {/* Type Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {filterTypes.map(ft => (
              <button
                key={ft.id}
                onClick={() => setSelectedType(ft.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedType === ft.id
                    ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                }`}
              >
                {ft.label}
              </button>
            ))}
          </div>
        </div>

        {/* Master-Detail Interactive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Units List (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            {filteredUnits.map(unit => {
              const isCurrent = selectedUnit.id === unit.id;
              const isAvailable = unit.status === 'available';
              const isReserved = unit.status === 'reserved';

              return (
                <div
                  key={unit.id}
                  onClick={() => setSelectedUnit(unit)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500/70 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/40'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-amber-400 shrink-0">
                      {unit.id}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-sm text-white">{unit.type}</h4>
                        <span className="text-xs text-slate-400 font-mono">({unit.block} • {unit.floor})</span>
                      </div>
                      <div className="text-xs text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                        <span>{unit.areaGross} Brüt</span>
                        <span>•</span>
                        <span>{unit.facade}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                    <div className="text-left sm:text-right">
                      <span className="text-xs font-mono font-bold text-amber-300 block">{unit.price}</span>
                      <span className="text-[10px] text-slate-500">KDV Dahil</span>
                    </div>

                    {/* Dynamic Status Badge */}
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                      isAvailable ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                      isReserved ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                      'bg-slate-700/40 text-slate-400 border border-slate-700'
                    }`}>
                      {isAvailable ? 'Satışta' : isReserved ? 'Rezerve' : 'Satıldı'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Unit Detail & Floor Plan (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-20 rounded-3xl bg-[#13161C] border border-white/10 p-6 space-y-6 shadow-2xl">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                    SEÇİLİ ÜNİTE DETAYI
                  </span>
                  <h3 className="font-serif text-xl font-medium text-white">
                    No: {selectedUnit.id} • {selectedUnit.type}
                  </h3>
                </div>

                <div className="text-right font-mono">
                  <span className="text-sm font-bold text-amber-300 block">{selectedUnit.price}</span>
                  <span className="text-[10px] text-slate-400">{selectedUnit.block} • {selectedUnit.floor}</span>
                </div>
              </div>

              {/* Floor Plan Visual Simulation */}
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-[16/10]">
                <img
                  src={selectedUnit.planImg}
                  alt={selectedUnit.type}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center justify-between w-full text-xs font-mono">
                    <span className="text-white font-bold">{selectedUnit.areaGross} Brüt / {selectedUnit.areaNet} Net</span>
                    <span className="text-amber-300 flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Mimari Kat Planı</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Architectural Specs List */}
              <div className="space-y-2 text-xs">
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                  Öne Çıkan Mimari Standartlar:
                </span>
                {selectedUnit.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <button
                  onClick={handleBookOffice}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 shadow-md active:scale-98"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{bookedOffice ? 'Talebiniz Alındı ✓' : 'Bu Ünite İçin Bilgi & Fiyat Al'}</span>
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Doğrudan Satış Ofisi Resmi Bilgi Hattı</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 3. Footer Branding */}
      <footer className="p-8 border-t border-white/10 text-center text-xs text-slate-500 font-mono">
        <p>Viera Residence & Panorama • Lansman Tanıtım & İnteraktif Ünite Seçim Altyapısı</p>
        <p className="text-[11px] text-slate-600 mt-1">MediArt Experience Architect © 2026</p>
      </footer>

    </div>
  );
}
