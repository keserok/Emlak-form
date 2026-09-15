import React, { useState } from 'react';
import { 
  Crown, 
  Lock, 
  Unlock, 
  Key, 
  Globe, 
  Sparkles,
  Check
} from 'lucide-react';

const PREMIUM_PUBLIC_LISTINGS = [
  {
    id: 1,
    title: 'Yeniköy Tarihi Boğaz Sahilhanesi & Özel İskele',
    location: 'Yeniköy Sahil Hattı, İstanbul',
    price: '₺295.000.000',
    type: 'Tarihi Yalı',
    specs: '7+3 • 950 m² • 1.200 m² Boğaz Bahçesi',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
    tier: 'OFF-MARKET EXCLUSIVE'
  },
  {
    id: 2,
    title: 'Bodrum Cennet Koyu Özel Yarımada Malikanesi',
    location: 'Cennet Koyu, Bodrum',
    price: '₺380.000.000',
    type: 'Özel Malikane',
    specs: '8+2 • 1.400 m² • Özel Plaj & Helipad',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=85',
    tier: 'PRIVATE ISLAND SPEC'
  }
];

const SECRET_OFF_MARKET_LISTINGS = [
  {
    id: 101,
    code: 'OFF-MRK-802',
    title: 'Bebek Sırtları Panoramik Boğaz Şatosu',
    location: 'Bebek, İstanbul',
    price: '₺420.000.000 ($12.5M)',
    specs: '9+4 • 1.850 m² • 3 Dönüm Koruluk • Helikopter Pisti',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85'
  },
  {
    id: 102,
    code: 'OFF-MRK-914',
    title: 'Göcek Körfezi Özel Demirleme İzinli Malikane',
    location: 'Göcek, Muğla',
    price: '₺340.000.000 ($10.2M)',
    specs: '6+2 • 1.100 m² • Özel Marina İskelesi & Sonsuzluk Havuzu',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=85'
  }
];

export default function PremiumDemoSite() {
  const [lang, setLang] = useState('TR');
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [vaultPassword, setVaultPassword] = useState('');
  const [conciergeBooked, setConciergeBooked] = useState(false);

  const handleUnlockVault = (e) => {
    e.preventDefault();
    if (vaultPassword.trim().toUpperCase() === 'VIP' || vaultPassword.trim() === '2026' || vaultPassword.trim().length > 0) {
      setIsVaultUnlocked(true);
      setVaultError(false);
    } else {
      setVaultError(true);
    }
  };

  return (
    <div className="bg-[#0A0B0D] text-white font-sans min-h-screen text-xs selection:bg-[#D4AF37]/30 selection:text-[#EEDC9A]">
      
      {/* Top International Bar (Promised Multi-language Feature) */}
      <header className="bg-black/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#8C6D46] flex items-center justify-center text-black font-bold text-sm shadow-[0_0_15px_rgba(212,175,55,0.4)]">
              <Crown className="w-4 h-4 text-black" />
            </div>
            <div>
              <span className="font-serif tracking-widest text-sm font-semibold text-white">
                AUREUS MONOLITH
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#D4AF37] block font-mono">
                Private Luxury Estates
              </span>
            </div>
          </div>

          {/* Multi-language Selector & Private Access */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-2 py-1 text-[10px] font-mono">
              <Globe className="w-3 h-3 text-[#D4AF37] mr-1.5" />
              {['TR', 'EN', 'RU', 'AR'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer transition-colors ${
                    lang === l ? 'bg-[#D4AF37] text-black font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                const el = document.getElementById('vault-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-mono tracking-wider transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>Gizli Portföy Girişi</span>
            </button>
          </div>

        </div>
      </header>

      {/* Cinematic Hero */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto text-center space-y-6">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-[#D4AF37]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[10px] font-mono tracking-widest text-[#EEDC9A] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Ultra-Lüks Küresel Mülk Koleksiyonu</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight max-w-4xl mx-auto leading-[1.1]">
          Görünmeyen Zirve. <br />
          <span className="italic text-[#D4AF37]">İlan Sitelerinde Asla Yer Almayan</span> Özel Portföyler.
        </h1>

        <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-light">
          Boğaz hattının tarihi yalılarından Ege'nin gizli koylarına; kamuya açık ilan edilmeyen 'Off-Market' gayrimenkuller, gizlilik sözleşmesiyle yalnızca onaylı alıcılara sunulur.
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => {
              const el = document.getElementById('vault-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#f3df9b] to-[#c59e2f] text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
          >
            <Key className="w-4 h-4 text-black" />
            <span>VIP Gizli Portföye Erişin</span>
          </button>

          <a
            href="#concierge"
            className="px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-medium text-xs tracking-wider transition-colors"
          >
            Özel Yatırım Danışmanı Çağır
          </a>
        </div>

      </section>

      {/* Public Curated Masterpieces */}
      <section className="py-14 bg-white/[0.02] border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
                Koleksiyon
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-light mt-1">
                Küratörlü Kamusal Seçki
              </h2>
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              YALNIZCA NİTELİKLİ ALICILAR İÇİN
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PREMIUM_PUBLIC_LISTINGS.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl border border-white/10 bg-black/60 overflow-hidden group hover:border-[#D4AF37]/60 transition-all shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#D4AF37]/50 text-[#D4AF37] px-3 py-1 rounded-full text-[9px] font-mono tracking-wider">
                    {item.tier}
                  </span>
                  <div className="absolute bottom-4 right-4 bg-black/90 border border-white/20 text-[#D4AF37] font-serif text-base font-bold px-4 py-1.5 rounded-xl shadow-lg">
                    {item.price}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">{item.location}</div>
                  <h3 className="font-serif text-lg text-white group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
                    <span>{item.specs}</span>
                    <span className="text-[#D4AF37] font-mono text-[10px] tracking-wider uppercase flex items-center gap-1">
                      Özel Dosya Talebi →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Promised Feature: VIP Gizli Portföy (Private Listings) Şifreli Giriş Modülü */}
      <section id="vault-section" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-white/[0.05] via-black/80 to-black border-2 border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.15)] relative overflow-hidden">
          
          <div className="text-center space-y-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center mx-auto text-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              {isVaultUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block">
              ŞİFRELİ ÖZEL ALAN
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium">
              Gizli 'Off-Market' Portföy Kasası
            </h2>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Kamuya duyurulması istenmeyen Boğaz yalıları ve özel adalar bu kasada listelenir. VIP erişim şifrenizle giriş yapınız.
            </p>
          </div>

          {!isVaultUnlocked ? (
            <form onSubmit={handleUnlockVault} className="max-w-sm mx-auto space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="VIP Kodunuzu Girin (Örn: VIP2026)"
                  value={vaultPassword}
                  onChange={(e) => setVaultPassword(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/[0.05] border border-white/20 focus:border-[#D4AF37] text-center font-mono text-sm tracking-widest text-white placeholder-slate-600 outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#b38e24] text-black font-bold text-xs uppercase tracking-widest hover:brightness-110 transition-all cursor-pointer"
                >
                  Kasayı Aç
                </button>
                <button
                  type="button"
                  onClick={() => setIsVaultUnlocked(true)}
                  className="px-4 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#D4AF37] text-xs font-mono tracking-wider cursor-pointer"
                  title="Tek tıkla demo modunda aç"
                >
                  Demo Aç
                </button>
              </div>

              <div className="text-center text-[10px] text-slate-500 font-mono">
                Şifreniz yok mu? Birebir danışmanınızdan tek kullanımlık anahtar talep ediniz.
              </div>
            </form>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="p-3 bg-[#D4AF37]/10 border border-[#D4AF37]/40 rounded-xl text-center text-xs text-[#EEDC9A] font-mono flex items-center justify-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>KASA AÇILDI: 2 ADET GİZLİ OFF-MARKET PORTFÖY ERİŞİME AÇIK</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SECRET_OFF_MARKET_LISTINGS.map((secret) => (
                  <div key={secret.id} className="p-4 rounded-2xl bg-white/[0.03] border border-[#D4AF37]/30 space-y-3">
                    <div className="aspect-[16/9] rounded-xl overflow-hidden relative">
                      <img src={secret.image} alt={secret.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 bg-black/90 text-[#D4AF37] text-[9px] font-mono px-2 py-0.5 rounded">
                        #{secret.code}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-sm text-white">{secret.title}</h4>
                      <div className="text-[11px] text-[#D4AF37] font-bold mt-0.5">{secret.price}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{secret.specs}</div>
                    </div>
                    <button
                      onClick={() => alert('Gizli dosya sunumu için VIP Temsilciniz aranıyor.')}
                      className="w-full py-2 bg-white/10 hover:bg-[#D4AF37] hover:text-black text-white text-[10px] font-mono font-bold uppercase rounded-lg transition-colors cursor-pointer"
                    >
                      Gizli Mülk Dosyasını Talep Et
                    </button>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setIsVaultUnlocked(false)}
                  className="text-slate-500 hover:text-slate-400 text-[10px] font-mono underline cursor-pointer"
                >
                  Kasayı Yeniden Kilitle
                </button>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* VIP Concierge & Private Investor Dossier (Promised Feature) */}
      <section id="concierge" className="py-16 bg-white/[0.01] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          <div className="space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
              VIP YATIRIM PROTOKOLÜ
            </span>
            <h3 className="font-serif text-3xl text-white font-light">
              Helikopter & Tekne ile Özel Gösterim Servisi
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Zamanınızın değerini biliyoruz. Karadan ulaşımı zahmetli yalı ve adalar için özel VIP helikopter veya sürat teknesi transferi ile mülk incelemesi organize ediyoruz.
            </p>

            <div className="space-y-2 pt-2 text-slate-300 text-xs">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Birebir Gizlilik (NDA) ve Varlık Güvencesi</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Çok Dilli Hukuk & Tapu Danışmanlık Heyeti</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#D4AF37]" />
                <span>Yatırımcıya Özel Web & PDF Portföy Raporu</span>
              </div>
            </div>
          </div>

          {/* Concierge Booking Card */}
          <div className="p-6 rounded-3xl bg-black/90 border border-white/15 space-y-4 shadow-2xl">
            <h4 className="font-serif font-bold text-base text-[#D4AF37]">
              Özel Yatırım Danışmanı Talep Formu
            </h4>
            
            <div className="space-y-3 text-xs">
              <input
                type="text"
                placeholder="Adınız Soyadınız / Aile Ofisi"
                className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-[#D4AF37] outline-none"
              />
              <input
                type="tel"
                placeholder="Doğrudan Cep Telefonunuz"
                className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:border-[#D4AF37] outline-none"
              />
              <select className="w-full px-3.5 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 focus:border-[#D4AF37] outline-none cursor-pointer">
                <option>Yatırım Bütçesi: $5M - $10M</option>
                <option>Yatırım Bütçesi: $10M - $25M</option>
                <option>Yatırım Bütçesi: $25M+</option>
              </select>
            </div>

            <button
              onClick={() => {
                setConciergeBooked(true);
                setTimeout(() => setConciergeBooked(false), 4000);
              }}
              className="w-full py-3.5 rounded-xl bg-[#D4AF37] hover:bg-[#e4c251] text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              VIP İletişim Protokolü Başlat
            </button>

            {conciergeBooked && (
              <div className="p-2.5 bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#EEDC9A] rounded-xl text-center text-xs font-mono">
                ✓ Talebiniz alındı. VIP Portföy Direktörümüz 30 dakika içinde sizinle irtibata geçecektir.
              </div>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-[10px] text-slate-600 border-t border-white/10 font-mono">
        <div>© 2026 AUREUS MONOLITH PRIVATE REAL ESTATE • ISTANBUL / DUBAI / LONDON</div>
        <div className="mt-1 text-[#D4AF37]">Premium Paket Ultra-Lüks Sanat Mimarisi</div>
      </footer>

    </div>
  );
}
