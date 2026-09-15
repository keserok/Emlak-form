import React, { useState } from 'react';
import { 
  Home, 
  Building2, 
  Compass, 
  User, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowLeft 
} from 'lucide-react';

const INQUIRY_TYPES = [
  { id: 'satilik', title: 'Mülkümü Satmak İstiyorum', icon: Home, desc: 'Ege bölgesi emsalleriyle gerçek piyasa değerlemesi & butik alıcı ağı' },
  { id: 'arama', title: 'Butik Portföy Arıyorum', icon: Compass, desc: 'Portallarda olmayan özel ve sakin taş ev / bağ evi seçkileri' },
  { id: 'kiralik', title: 'Kiraya Vermek İstiyorum', icon: Building2, desc: 'Doğrulanmış seçkin aile ve kiracı profili' }
];

const PROPERTY_TYPES = [
  'Müstakil Taş Konak',
  'Butik Bahçe Evi',
  'Teras Rezidans Daire',
  'Tarihi Rum Evi',
  'Zeytinlik / Bağ Evi',
  'Yatırımlık Arsa'
];

const LOCATIONS = [
  'Urla Keklicek',
  'Alaçatı Hacımemiş',
  'Çeşme Çiftlikköy / Dalyan',
  'Bodrum Gümüşlük / Yalıkavak',
  'Eski Foça Sahil Hattı',
  'Diğer Ege Bölgesi'
];

export default function StandardInquiryForm({ onBackToShowcase, onAddSubmission, agentProfile }) {
  const [inquiryType, setInquiryType] = useState('satilik');
  const [propertyType, setPropertyType] = useState(PROPERTY_TYPES[0]);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('3+1');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState('Telefon (Her saat uygun)');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Lütfen adınızı ve soyadınızı belirtin.';
    if (!phone.trim() || phone.trim().length < 9) errs.phone = 'Lütfen geçerli bir cep telefonu numarası girin.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const refCode = `DA-${Math.floor(1000 + Math.random() * 9000)}`;
      const now = new Date();
      const formattedDate = `${now.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newSubmission = {
        id: `sub_${Date.now()}`,
        refCode,
        createdAt: now.toISOString(),
        formattedDate,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Belirtilmedi',
        inquiryType: INQUIRY_TYPES.find(i => i.id === inquiryType)?.title || inquiryType,
        propertyType,
        location,
        estimatedPrice: estimatedPrice.trim() || 'Belirtilmedi',
        preferredContact,
        notes: notes.trim() || 'Not eklenmedi',
        status: 'Yeni'
      };

      onAddSubmission(newSubmission);
      setIsSubmitting(false);
      setSuccessData(newSubmission);
    }, 600);
  };

  const getWhatsAppLink = () => {
    if (!successData) return '#';
    const msg = `Merhaba Deniz Bey, ${successData.refCode} referans kodlu talebimi iletmiştim:\n\n` +
      `👤 Ad Soyad: ${successData.fullName}\n` +
      `📞 Telefon: ${successData.phone}\n` +
      `📋 Talep Türü: ${successData.inquiryType}\n` +
      `🏡 Mülk Tipi: ${successData.propertyType} (${successData.location})\n` +
      `💰 Bütçe / Değer: ${successData.estimatedPrice}\n` +
      `💬 Not: ${successData.notes}`;
    return `https://wa.me/${agentProfile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-[#FAF8F5] py-12 sm:py-16 px-4 sm:px-6 min-h-screen text-slate-800">
      <div className="max-w-3xl mx-auto">
        
        {/* Back Link */}
        {onBackToShowcase && (
          <button
            type="button"
            onClick={onBackToShowcase}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2C3E35] mb-6 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Vitrine Geri Dön</span>
          </button>
        )}

        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C6A59] bg-[#EDE8E0] px-3 py-1 rounded-full">
            Ege & Akdeniz Butik Talep
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#1E2522] font-semibold">
            Mülk Değerleme & Portföy Talep Formu
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Taş konak, bahçe evi veya zeytinliğinizi doğru alıcılarla buluşturmak için bilgilerinizi iletin. Deniz Arslan kişisel olarak sizinle irtibata geçecektir.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E4DC] shadow-sm space-y-8">
          
          {/* Step 1: Inquiry Type */}
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              1. İşlem Türünüzü Seçin
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INQUIRY_TYPES.map((type) => {
                const Icon = type.icon;
                const isSelected = inquiryType === type.id;
                return (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setInquiryType(type.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#2C3E35] bg-[#FAF8F5] ring-2 ring-[#2C3E35]/15'
                        : 'border-[#E8E4DC] hover:border-slate-300'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center text-[#2C3E35] mb-3">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#1E2522]">{type.title}</div>
                      <div className="text-[10px] text-slate-500 mt-1 leading-snug">{type.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Property & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Mülk Tipi
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#2C3E35]"
              >
                {PROPERTY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Bölge / Konum
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#2C3E35]"
              >
                {LOCATIONS.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Tahmini Bütçe / Değer
              </label>
              <input
                type="text"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                placeholder="Örn: ₺20.000.000"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#2C3E35]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Oda Sayısı
              </label>
              <input
                type="text"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                placeholder="Örn: 4+1 veya 3+1"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#2C3E35]"
              />
            </div>
          </div>

          {/* Step 3: Contact Info */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              2. İletişim Bilgileriniz
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Adınız ve Soyadınız *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ad Soyad"
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs bg-white text-slate-800 focus:outline-none ${
                      errors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200 focus:border-[#2C3E35]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Cep Telefonunuz *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0532 ..."
                    className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs bg-white text-slate-800 focus:outline-none ${
                      errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-200 focus:border-[#2C3E35]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                E-posta Adresiniz (Opsiyonel)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ornek@alanadi.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#2C3E35]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Özel Notlar & Beklentiler
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mülkünüzün konumu, özellikleri veya aradığınız kriterleri belirtebilirsiniz..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs bg-white text-slate-800 focus:outline-none focus:border-[#2C3E35]"
              />
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] flex items-center gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Gizlilik Güvencesi: Bilgileriniz 3. şahıslarla asla paylaşılmaz. Yalnızca Deniz Arslan ile doğrudan iletişim için kullanılır.</span>
          </div>

          {/* Submit Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-3.5 rounded-xl bg-[#2C3E35] hover:bg-[#1E2522] text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Talebiniz Kaydediliyor...' : 'Talebi İlet & Danışman Görüşmesi Başlat'}
            </button>
          </div>

        </form>

        {/* Success Modal */}
        {successData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-5 border border-slate-200 shadow-2xl">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-xl font-bold text-[#1E2522]">Talebiniz Alındı!</h3>
                <p className="text-xs text-slate-600">
                  Referans Kodu: <span className="font-mono font-bold text-[#2C3E35]">{successData.refCode}</span>
                </p>
                <p className="text-xs text-slate-500 pt-2">
                  Talebiniz Deniz Arslan'ın kontrol paneline kaydedildi. En kısa sürede sizinle iletişime geçilecektir.
                </p>
              </div>

              <div className="pt-3 space-y-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp'tan Anında Bilgi Gönder</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setSuccessData(null);
                    if (onBackToShowcase) onBackToShowcase();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Vitrine Dön
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
