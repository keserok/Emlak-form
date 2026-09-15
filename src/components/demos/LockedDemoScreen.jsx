import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Send, 
  ArrowLeft, 
  KeyRound, 
  AlertCircle 
} from 'lucide-react';

export default function LockedDemoScreen({ tier = 'project', onClose, onSelectPackage }) {
  const isProject = tier === 'project';

  const title = isProject
    ? 'Büyük Proje Lansman Mimarisi Kilitli Erişime Sahiptir'
    : 'Bu Ultra-Lüks Koleksiyon VIP Koruması Altındadır';

  const badge = isProject
    ? '🔒 BÜYÜK PROJE LANSMAN PROTOKOLÜ • ERİŞİME KAPALI'
    : '🔒 VIP OFF-MARKET GİZLİLİK KORUMASI • ERİŞİME KAPALI';

  const description = isProject
    ? 'Büyük ölçekli konut ve karma gayrimenkul projelerimize ait interaktif kat planı, blok seçici ve dinamik ünite stok altyapısı; firmaya özel 3D veri modellemesi, bağımsız yazılım mimarisi ve proje telif hakları gereği açık demoya kilitlenmiştir. Canlı sistem demosu ve mimari sunum yalnızca proje geliştiriciler ve satış ofisi direktörlerine özel canlı oturumda gerçekleştirilmektedir.'
    : 'Aureus Monolith ve lüks segment vitrinlerimiz; yüksek net değerli (HNW) mülk sahiplerinin gizliliği, off-market gizli portföy protokolü ve tescilli editoryal tasarım hakları nedeniyle genel web önizlemesine kapatılmıştır. Canlı mimari dosya ve çalışan sistem sunumu yalnızca yetkilendirilmiş danışmanlara özel oturumda açılmaktadır.';

  const lockedItems = isProject
    ? [
        {
          title: 'İnteraktif Kat & Daire Seçici Altyapısı',
          desc: 'Ziyaretçinin blok, kat ve ünite seçtiği etkileşimli modül telif koruması altındadır.'
        },
        {
          title: 'Dinamik Ünite Stok & Satış Yönetim Paneli',
          desc: 'Satıldı / rezerve / satışta verilerinin canlı işlendiği bulut altyapı şifrelenmiştir.'
        },
        {
          title: 'Çok Dilli Küresel Lansman & Broşür Motoru',
          desc: 'Yabancı yatırımcı fonlarına özel hazırlanan e-katalog motoru VIP kilitlidir.'
        }
      ]
    : [
        {
          title: 'VIP Gizli Portföy (Private Listings) Modülü',
          desc: 'Yalı, rezidans ve özel koleksiyon mülklerinin şifreli vitrini gizlilik altındadır.'
        },
        {
          title: 'Awwwards Düzeyinde Monokrom Obsidyen & Altın Aura',
          desc: 'Tescilli mimari dergi tipografisi ve tasarım sistemi telif korumalıdır.'
        },
        {
          title: 'Uluslararası Çok Dilli Yatırımcı Kataloğu',
          desc: 'Küresel yatırımcılara özel hazırlanan web & PDF sunum altyapısı kilitlidir.'
        }
      ];

  const whatsappMessage = encodeURIComponent(
    '🏛️ *MEDİART REAL ESTATE — ÖZEL DEMO & ERİŞİM TALEBİ*\n' +
    '━━━━━━━━━━━━━━━━━━━━━━━━━━\n' +
    '*Talep Edilen Model:* ' + (isProject ? 'Büyük Gayrimenkul Projeleri Lansman Demosu' : 'Premium Paket VIP Demosu') + '\n' +
    '*Durum:* Kilitli Mimari Önizleme\n' +
    '💬 *Mesaj:* Merhaba MediArt ekibi, kilitli demoyu canlı oturumda incelemek ve projemize özel sunum randevusu almak istiyoruz.'
  );

  const handleWhatsAppUnlock = () => {
    window.open('https://wa.me/?text=' + whatsappMessage, '_blank');
  };

  return (
    <div className="min-h-[85vh] w-full flex items-center justify-center p-4 sm:p-8 bg-obsidian text-white relative overflow-hidden">
      {/* Ambient Cyber-Security Grid & Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.08)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-2xl w-full luxury-glass rounded-3xl p-6 sm:p-10 border border-amber-400/50 shadow-[0_20px_70px_rgba(0,0,0,0.9)] relative overflow-hidden text-center flex flex-col items-center"
      >
        {/* Top Moving Security Laser */}
        <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden pointer-events-none">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(245,158,11,0.9)]"
          />
        </div>

        {/* Central Padlock with Concentric Glowing Radar Rings */}
        <div className="relative flex items-center justify-center my-4">
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.25, 0.6, 0.25] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            className="absolute w-28 h-28 rounded-full bg-amber-500/10 border border-amber-400/30 pointer-events-none"
          />
          <motion.div
            animate={{ scale: [1, 1.45, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ repeat: Infinity, duration: 3.8, ease: 'easeInOut', delay: 0.4 }}
            className="absolute w-36 h-36 rounded-full bg-amber-500/5 border border-amber-400/20 pointer-events-none"
          />
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-500/20 via-black/60 to-obsidian border-2 border-amber-400/80 text-amber-400 flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.35)] relative z-10">
            <Lock className="w-9 h-9 stroke-[2.2]" />
          </div>
        </div>

        {/* Status Badge */}
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-[10px] font-mono tracking-widest text-amber-300 font-bold uppercase mb-3">
          <KeyRound className="w-3 h-3 text-amber-400" />
          <span>{badge}</span>
        </span>

        {/* Headline */}
        <h2 className="font-serif text-2xl sm:text-3xl text-white font-medium mb-3 leading-tight">
          {title}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-architectural-muted font-light leading-relaxed mb-6 max-w-xl">
          {description}
        </p>

        {/* Locked Feature Checklist */}
        <div className="w-full space-y-2.5 mb-6 text-left">
          {lockedItems.map((item, idx) => (
            <div
              key={idx}
              className="p-3 sm:p-3.5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start gap-3"
            >
              <div className="w-6 h-6 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 mt-0.5">
                <Lock className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-medium text-white">{item.title}</h4>
                  <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono font-bold">
                    KİLİTLİ
                  </span>
                </div>
                <p className="text-[11px] text-architectural-muted mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Callout Notice */}
        <div className="w-full p-3.5 rounded-2xl bg-amber-500/[0.08] border border-amber-400/30 text-[11px] text-amber-200/90 font-mono text-left flex items-start gap-2.5 mb-6">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Yetkilendirme Bilgisi:</strong> Canlı çalışan demoyu incelemek, projenize özel arayüz simülasyonunu görmek ve teknik detayları netleştirmek için özel yetkilendirme randevusu oluşturabilirsiniz.
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
          <button
            type="button"
            onClick={handleWhatsAppUnlock}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 text-obsidian font-bold text-xs uppercase tracking-luxury flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:shadow-[0_0_35px_rgba(16,185,129,0.5)] transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Send className="w-4 h-4" />
            <span>Özel Canlı Demo & Erişim Talebi (WhatsApp)</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-architectural-muted hover:text-white font-medium text-xs uppercase tracking-luxury flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Dosyaya Geri Dön</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
