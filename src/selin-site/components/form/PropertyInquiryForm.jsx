import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Building2, 
  Phone, 
  User, 
  Mail, 
  Home, 
  Coins, 
  Clock, 
  MessageCircle
} from 'lucide-react';

const INQUIRY_TYPES = [
  { id: 'satilik', title: 'Mülkümü Satmak İstiyorum', icon: Home, desc: 'Bölge emsalleriyle gerçek piyasa değerlemesi & VIP alıcı ağı' },
  { id: 'kiralik', title: 'Kiraya Vermek İstiyorum', icon: Building2, desc: 'Doğrulanmış kurumsal ve seçkin kiracı portföyü' },
  { id: 'arama', title: 'Gayrimenkul / Portföy Arıyorum', icon: Coins, desc: 'İlan sitelerinde olmayan gizli ve özel portföy seçkileri' }
];

const PROPERTY_TYPES = [
  'Müstakil Villa',
  'Bahçe Dubleksi',
  'Çatı Penthouse',
  'Rezidans Daire',
  'Müstakil Konak',
  'Ticari / Ofis',
  'Arsa'
];

const LOCATIONS = [
  'Göktürk Merkez',
  'Kemer Country',
  'Kemerburgaz',
  'Zekeriyaköy',
  'Kuruçeşme / Sahil Hattı',
  'Diğer Bölge'
];

export default function PropertyInquiryForm({ isEmbedded = false }) {
  const { setViewMode, addSubmission, agentProfile } = useAppState();

  const [inquiryType, setInquiryType] = useState('Mülkümü Satmak İstiyorum');
  const [propertyType, setPropertyType] = useState('Müstakil Villa');
  const [location, setLocation] = useState('Göktürk Merkez');
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('4+1');
  const [area, setArea] = useState('');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState('Telefon (Her saat uygun)');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = 'Lütfen adınızı ve soyadınızı belirtin.';
    if (!phone.trim() || phone.trim().length < 9) errs.phone = 'Lütfen geçerli bir cep telefonu numarası girin.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // 1. ACTION: "Sisteme Kaydet ve Dönüş Bekle"
  const handleSaveToSystem = (e) => {
    e?.preventDefault();
    if (!validate()) {
      const el = document.getElementById('degerleme') || window;
      if (el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 250, behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const created = addSubmission({
        fullName,
        phone,
        email: email || 'Belirtilmedi',
        inquiryType,
        propertyType,
        location,
        estimatedPrice: estimatedPrice ? `${estimatedPrice} ₺` : 'Belirtilmedi',
        bedrooms,
        area: area ? `${area} m²` : 'Belirtilmedi',
        notes: notes || 'Not eklenmedi',
        contactPreference: preferredContact,
        source: 'Selin Karaca Web Formu',
        submissionMethod: 'Sistem Kaydı (Dönüş Bekliyor)'
      });

      setIsSubmitting(false);
      setSubmissionSuccess({
        id: created.id,
        method: 'system',
        message: 'Talebiniz başarıyla kaydedilmiştir. En kısa sürede sizinle iletişime geçilecektir.',
        data: created
      });
    }, 400);
  };

  // 2. ACTION: "WhatsApp ile Hemen İlet"
  const handleSendViaWhatsApp = (e) => {
    e?.preventDefault();
    if (!validate()) {
      const el = document.getElementById('degerleme') || window;
      if (el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 250, behavior: 'smooth' });
      }
      return;
    }

    setIsSubmitting(true);

    const created = addSubmission({
      fullName,
      phone,
      email: email || 'Belirtilmedi',
      inquiryType,
      propertyType,
      location,
      estimatedPrice: estimatedPrice ? `${estimatedPrice} ₺` : 'Belirtilmedi',
      bedrooms,
      area: area ? `${area} m²` : 'Belirtilmedi',
      notes: notes || 'Not eklenmedi',
      contactPreference: preferredContact,
      source: 'Selin Karaca Web Formu',
      submissionMethod: 'WhatsApp & Sistem Kaydı'
    });

    const msg = [
      `*YENİ MÜLK & TALEP BAŞVURUSU (VIP)*`,
      `---------------------------------`,
      `• *İşlem Türü:* ${inquiryType}`,
      `• *Ad Soyad:* ${fullName}`,
      `• *Telefon:* ${phone}`,
      `• *E-Posta:* ${email || 'Belirtilmedi'}`,
      `• *Mülk Tipi:* ${propertyType}`,
      `• *Konum / Bölge:* ${location}`,
      `• *Oda Sayısı:* ${bedrooms}`,
      `• *Yaklaşık Metrekare:* ${area ? `${area} m²` : 'Belirtilmedi'}`,
      `• *Tahmini Bütçe / Fiyat:* ${estimatedPrice ? `${estimatedPrice} ₺` : 'Belirtilmedi'}`,
      `• *İletişim Tercihi:* ${preferredContact}`,
      notes ? `• *Özel Notlar:* ${notes}` : null,
      `---------------------------------`,
      `_Selin Karaca Resmi Web Sitesi Üzerinden Gönderildi._`
    ].filter(Boolean).join('\n');

    const cleanPhone = (agentProfile.phone || '05321234567').replace(/\D/g, '');
    const waPhone = cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone.replace(/^0/, '')}`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setSubmissionSuccess({
      id: created.id,
      method: 'whatsapp',
      message: 'Talebiniz kaydedildi ve WhatsApp üzerinden Selin Hanım’a yönlendirildi.',
      data: created
    });
  };

  return (
    <div className={`${isEmbedded ? 'w-full' : 'min-h-screen bg-[#FBFBFB] pb-24'} text-[#111827]`}>
      
      {/* Top Header Bar - Only show when standalone */}
      {!isEmbedded && (
        <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-30 shadow-xs">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <button
              onClick={() => {
                setViewMode('showcase');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#111827] transition-colors py-2 px-3 rounded-xl hover:bg-slate-100 cursor-pointer active:scale-[0.98]"
            >
              <ArrowLeft className="w-4 h-4 text-[#8A735C]" />
              <span>Vitrine Geri Dön</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-xs sm:text-sm text-[#111827] tracking-tight">
                SELİN KARACA
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-medium text-[#8A735C] uppercase tracking-wider">
                Değerleme & Talep Formu
              </span>
            </div>
          </div>
        </header>
      )}

      {/* Main Container */}
      <div className={`max-w-3xl mx-auto px-4 sm:px-6 ${isEmbedded ? 'pt-0' : 'pt-8 sm:pt-12'}`}>

        {/* Hero Form Header */}
        <div className="text-center space-y-3 mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#111827] tracking-tight">
            Göktürk & Kemerburgaz Mülk Değerleme ve Talep
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Mülkünüzü değerinde satmak, kiraya vermek veya aradığınız özel gayrimenkulü bildirmek için formu doldurun. Talebiniz doğrultusunda sizinle en kısa sürede iletişime geçilecektir.
          </p>
        </div>

        {/* Form Body Container */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-lg p-6 sm:p-10 space-y-8">
          
          {/* Section 1: Inquiry Type Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              1. İşlem Türünüzü Seçin
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {INQUIRY_TYPES.map((t) => {
                const IconComponent = t.icon;
                const isSelected = inquiryType === t.title;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setInquiryType(t.title)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 active:scale-[0.98] ${
                      isSelected
                        ? 'border-[#8A735C] bg-[#FBF9F6] shadow-sm ring-1 ring-[#8A735C]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`p-2 rounded-xl ${isSelected ? 'bg-[#8A735C] text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-[#8A735C]" />
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-xs text-[#111827]">{t.title}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{t.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Property Characteristics */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              2. Mülk veya Arayış Detayları
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Gayrimenkul Tipi
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white cursor-pointer"
                >
                  {PROPERTY_TYPES.map((pt) => (
                    <option key={pt} value={pt}>{pt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Bölge / Konum
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white cursor-pointer"
                >
                  {LOCATIONS.map((loc) => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Beklenen Fiyat / Bütçe
                </label>
                <input
                  type="text"
                  placeholder="Örn: ₺35.000.000"
                  value={estimatedPrice}
                  onChange={(e) => setEstimatedPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Oda Sayısı
                </label>
                <input
                  type="text"
                  placeholder="Örn: 4+1 veya 5+2"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Kullanım Alanı (m²)
                </label>
                <input
                  type="text"
                  placeholder="Örn: 320"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact Details */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              3. İletişim Bilgileriniz
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Adınız ve Soyadınız <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="Adınız Soyadınız"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:bg-white ${
                      errors.fullName
                        ? 'border-rose-400 bg-rose-50/30 text-slate-900'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C]'
                    }`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.fullName}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Cep Telefonu Numaranız <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="0532 000 00 00"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: null });
                    }}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:bg-white ${
                      errors.phone
                        ? 'border-rose-400 bg-rose-50/30 text-slate-900'
                        : 'border-slate-300 bg-white text-slate-900 focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C]'
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-[11px] text-rose-500 mt-1 font-medium">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  E-posta Adresiniz (Opsiyonel)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder="ornek@alanadi.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Tercih Edilen İletişim Saati / Kanalı
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] cursor-pointer"
                  >
                    <option value="Telefon (Her saat uygun)">Telefon (Her saat aranabilirim)</option>
                    <option value="Telefon (Öğleden sonra 13:00 - 18:00)">Telefon (Öğleden sonra 13:00 - 18:00)</option>
                    <option value="WhatsApp Mesajı">Öncelikle WhatsApp üzerinden yazınız</option>
                    <option value="Akşam Saatleri (18:00 sonrası)">Akşam Saatleri (18:00 sonrası)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Notes / Description */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              4. Mülk Açıklaması veya Özel İstekleriniz
            </label>
            <textarea
              rows={3}
              placeholder="Örn: Evimiz havuzlu sitede ara kat, güney cephe. 1 ay içerisinde değerinde satış hedefliyoruz..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
            ></textarea>
          </div>

          {/* Privacy & Guarantee note */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8E2D9] flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-[#8A735C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#111827]">Gizlilik Güvencesi: </span>
              Bilgileriniz 3. şahıslarla veya reklam platformlarıyla asla paylaşılmaz. Tamamen gizli ve güvenli tutulur.
            </div>
          </div>

          {/* ACTION BUTTONS SECTION (As requested by user: 'whatsapptan gönderden önce sisteme kaydet ve dönüş bekle olarak yaz') */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            
            <div className="text-center text-xs text-slate-500 font-medium">
              Başvurunuzu nasıl iletmek istersiniz?
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              
              {/* BUTTON 1: "Sisteme Kaydet ve Dönüş Bekle" (Primary requested action) */}
              <button
                type="button"
                onClick={handleSaveToSystem}
                disabled={isSubmitting}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#111827] hover:bg-[#1f293d] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] border border-slate-800 disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span>
                  {isSubmitting ? 'Sisteme Kaydediliyor...' : 'Sisteme Kaydet ve Dönüş Bekle'}
                </span>
              </button>

              {/* BUTTON 2: "WhatsApp'tan Gönder" */}
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>WhatsApp'tan Gönder</span>
              </button>

            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                Güvenli & Doğrudan İletim
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8A735C]" />
                Maksimum 2 Saat İçinde Dönüş
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* SUBMISSION SUCCESS MODAL */}
      {submissionSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E2D9] shadow-2xl text-center space-y-6 relative animate-scale-up">
            
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A735C]">
                Başvuru Kaydı Alındı
              </span>
              <h3 className="text-2xl font-bold text-[#111827]">
                Talebiniz Sisteme Başarıyla Kaydedildi!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Bilgileriniz Selin Karaca'nın masaüstü kontrol merkezine aktarıldı. Belirttiğiniz iletişim saatinde tarafınıza dönüş sağlanacaktır.
              </p>
            </div>

            {/* Reference Card */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Takip Referans Kodu:</span>
                <span className="font-mono font-bold text-sm text-[#8A735C] bg-[#8A735C]/10 px-2 py-0.5 rounded">
                  #{submissionSuccess.refCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Müşteri:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.data.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">İşlem:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.data.inquiryType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Mülk / Konum:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.data.propertyType} ({submissionSuccess.data.location})</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setSubmissionSuccess(null);
                  setViewMode('showcase');
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Vitrine Dön
              </button>

              <button
                onClick={() => {
                  setSubmissionSuccess(null);
                  setViewMode('admin');
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-[#8A735C] hover:bg-[#a38053] text-white font-semibold text-xs transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Admin Panelinde Gör</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
