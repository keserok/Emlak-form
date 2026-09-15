import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Star, 
  MapPin,
  Sparkles
} from 'lucide-react';

const STANDARD_LISTINGS = [
  {
    id: 1,
    title: 'Urla Keklicek Zeytinlikli Müstakil Taş Konak',
    location: 'Urla, İzmir',
    price: '₺24.500.000',
    type: 'Taş Villa',
    specs: '4+1 • 340 m² • 800 m² Bahçe',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Seçkin Portföy'
  },
  {
    id: 2,
    title: 'Alaçatı Hacımemiş Butik Bahçe Evi',
    location: 'Alaçatı, Çeşme',
    price: '₺19.800.000',
    type: 'Butik Konut',
    specs: '3+1 • 210 m² • Havuzlu',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    tag: 'Yeni Portföy'
  },
  {
    id: 3,
    title: 'Bodrum Gümüşlük Gün Batımı Manzaralı Rezidans',
    location: 'Gümüşlük, Bodrum',
    price: '₺16.400.000',
    type: 'Teras Daire',
    specs: '2+1 • 140 m² • Panoramik Deniz',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    tag: 'Doğrudan Deniz'
  },
  {
    id: 4,
    title: 'Eski Foça Sahil Hattı Restore Edilmiş Rum Evi',
    location: 'Foça, İzmir',
    price: '₺14.200.000',
    type: 'Tarihi Konut',
    specs: '3+1 • 185 m² • Avlulu',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Tarihi Doku'
  }
];

export default function StandardDemoSite() {
  const [selectedFilter, setSelectedFilter] = useState('Tümü');

  return (
    <div className="bg-[#FAF8F5] text-[#1E2522] font-sans min-h-screen text-xs">
      
      {/* Top Essential Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#E8E4DC] sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-sm tracking-wider text-[#2C3E35]">
              DENİZ ARSLAN
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-[10px] uppercase tracking-widest text-[#7C6A59] font-medium">
              Ege & Akdeniz Butik Portföy
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/905320000000"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-[11px] transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp İletişim</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE8E0] text-[#5A4B3D] text-[10px] font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-[#7C6A59]" />
              <span>Butik Danışmanlık • Maksimum 15 Seçkin Portföy</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1E2522] leading-tight font-medium">
              Karakterli Evler, Sakin Yaşamlar.
            </h1>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-lg">
              Yüzlerce ilanın arasında kaybolmayın. Ege ve Akdeniz'in huzurlu lokasyonlarında, mimarisi ve tapusu doğrulanmış seçkin mülklerle yalnızca size özel çalışıyorum.
            </p>

            {/* Google Reviews Trust Badge (Promised feature in Standard) */}
            <div className="p-3.5 rounded-2xl bg-white border border-[#E8E4DC] shadow-xs flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center font-bold text-amber-700 text-xs">
                  G
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="font-bold text-xs text-slate-800 ml-1">4.9 / 5.0</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block">Doğrulanmış 148 Google Değerlendirmesi</span>
                </div>
              </div>

              <div className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg font-semibold border border-emerald-200">
                %100 Memnuniyet
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="#portfoy"
                className="px-5 py-2.5 rounded-xl bg-[#2C3E35] text-white font-semibold hover:bg-[#1E2522] transition-colors"
              >
                Vitrin Portföyleri İncele
              </a>
              <a
                href="tel:+905320000000"
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#2C3E35]" />
                <span>Beni Arayın</span>
              </a>
            </div>
          </div>

          {/* Consultant Portrait & Trust Badge */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative w-full max-w-xs">
              <div className="rounded-3xl overflow-hidden shadow-md border-4 border-white aspect-[4/5] bg-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                  alt="Deniz Arslan"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-3 left-4 right-4 bg-white p-3 rounded-2xl border border-[#E8E4DC] shadow-sm text-center">
                <div className="font-serif font-bold text-xs text-[#1E2522]">Deniz Arslan</div>
                <div className="text-[10px] text-slate-500">Urla & Çeşme Gayrimenkul Danışmanı</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Boutique Portfolio (15-listing boutique system) */}
      <section id="portfoy" className="py-12 bg-white border-y border-[#E8E4DC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#7C6A59]">
                Seçkin Vitrin
              </span>
              <h2 className="font-serif text-2xl text-[#1E2522] font-medium mt-1">
                Öne Çıkan Butik Portföyler
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {['Tümü', 'Taş Villa', 'Butik Konut', 'Teras Daire'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedFilter(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs transition-colors cursor-pointer ${
                    selectedFilter === cat
                      ? 'bg-[#2C3E35] text-white font-medium'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {STANDARD_LISTINGS.map((item) => (
              <div
                key={item.id}
                className="bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] overflow-hidden group hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[#2C3E35] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    {item.tag}
                  </span>
                  <div className="absolute bottom-3 right-3 bg-[#2C3E35] text-white px-3 py-1 rounded-xl text-xs font-bold">
                    {item.price}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center gap-1 text-slate-500 text-[10px]">
                    <MapPin className="w-3 h-3 text-[#7C6A59]" />
                    <span>{item.location}</span>
                  </div>

                  <h3 className="font-serif font-medium text-sm text-[#1E2522] group-hover:text-[#2C3E35] transition-colors line-clamp-1">
                    {item.title}
                  </h3>

                  <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200 flex items-center justify-between">
                    <span>{item.specs}</span>
                    <a
                      href={`https://wa.me/905320000000?text=${encodeURIComponent(`${item.title} hakkında detaylı bilgi almak istiyorum.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-700 font-semibold hover:underline flex items-center gap-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span>Bilgi Al</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Direct CTA Box */}
          <div className="mt-10 p-6 rounded-2xl bg-[#EDE8E0] border border-[#DDD6CB] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-serif text-base font-bold text-[#1E2522]">
                Evinizi Butik Ağımızda Değerinde Satmak İster Misiniz?
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Kişisel portföyümde sınırlı kontenjanla yer almak ve bölge emsalleriyle değerleme için iletişime geçin.
              </p>
            </div>

            <a
              href="https://wa.me/905320000000?text=Merhaba%2C%20mülkümü%20butik%20portföyünüzde%20değerlendirmek%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors whitespace-nowrap flex items-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp'tan Danışın</span>
            </a>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center text-[10px] text-slate-400">
        <div>© 2026 Deniz Arslan Butik Gayrimenkul Danışmanlığı • Tüm Hakları Saklıdır.</div>
        <div className="mt-1 text-slate-500 font-medium">Standart Paket Editoryal Tasarım Mimarisi</div>
      </footer>

    </div>
  );
}
