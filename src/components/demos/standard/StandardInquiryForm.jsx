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
  ArrowLeft,
  Key,
  Check,
  MapPin,
  Sparkles
} from 'lucide-react';

const INQUIRY_TYPES = [
  { id: 'satilik', title: 'Mülkümü Satmak İstiyorum', icon: Home, desc: 'Ege bölgesi emsalleriyle gerçek piyasa değerlemesi & butik alıcı ağı' },
  { id: 'arama', title: 'Gayrimenkul / Portföy Arıyorum', icon: Compass, desc: 'Kişiselleştirilmiş satılık ve kiralık butik portföy önerileri' },
  { id: 'kiralik', title: 'Kiraya Vermek İstiyorum', icon: Building2, desc: 'Doğrulanmış seçkin aile ve kurumsal kiracı profili' }
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

// Curated live recommendations for Buyers & Renters
const CURATED_RECOMMENDATIONS = {
  satilik: [
    {
      id: 'rec-s1',
      title: 'Urla Keklicek Zeytinlikli Müstakil Taş Konak',
      location: 'Urla, İzmir',
      price: '₺24.500.000',
      specs: '4+1 • 340 m² • 800 m² Bahçe',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      tag: 'Taş Mimari'
    },
    {
      id: 'rec-s2',
      title: 'Alaçatı Hacımemiş Butik Bahçe Evi',
      location: 'Alaçatı, Çeşme',
      price: '₺19.800.000',
      specs: '3+1 • 210 m² • Özel Havuzlu',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      tag: 'Yeni Portföy'
    },
    {
      id: 'rec-s3',
      title: 'Bodrum Gümüşlük Gün Batımı Teras Rezidans',
      location: 'Gümüşlük, Bodrum',
      price: '₺16.400.000',
      specs: '2+1 • 140 m² • Panoramik Deniz',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      tag: 'Teras Manzara'
    }
  ],
  kiralik: [
    {
      id: 'rec-k1',
      title: 'Alaçatı Hacımemiş Avlulu Sezonluk Taş Ev',
      location: 'Alaçatı, Çeşme',
      price: '₺85.000 / Ay',
      specs: '3+1 • 180 m² • Sezonluk / Yıllık',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      tag: 'Kiralık Butik'
    },
    {
      id: 'rec-k2',
      title: 'Urla Keklicek Müstakil Bahçeli Kiralık Villa',
      location: 'Urla, İzmir',
      price: '₺65.000 / Ay',
      specs: '4+1 • 260 m² • Bahçeli & Şömineli',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
      tag: 'Yıllık Kiralık'
    },
    {
      id: 'rec-k3',
      title: 'Bodrum Gümüşlük Panoramik Kiralık Teras Daire',
      location: 'Gümüşlük, Bodrum',
      price: '₺55.000 / Ay',
      specs: '2+1 • 130 m² • Eşyalı & Deniz Cephe',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      tag: 'Lüks Eşyalı'
    }
  ]
};

const LIFESTYLE_TAGS = [
  'Müstakil Bahçeli',
  'Özel Havuzlu',
  'Panoramik Deniz Manzarası',
  'Otantik Taş Mimari',
  'Sessiz & Doğa İçi',
  'Hemen Taşınmaya Hazır',
  'Zeytinlik İçinde'
];

export default function StandardInquiryForm({ onBackToShowcase, onAddSubmission, agentProfile }) {
  const [inquiryType, setInquiryType] = useState('satilik');
  
  // Specific state when inquiryType === 'arama'
  const [searchSubtype, setSearchSubtype] = useState('satilik'); // 'satilik' | 'kiralik'
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [selectedTags, setSelectedTags] = useState(['Müstakil Bahçeli', 'Özel Havuzlu']);

  // Shared Form Fields
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

  // Explicit inline style to guarantee white background and dark text on all browsers
  const lightInputStyle = { backgroundColor: '#ffffff', color: '#0f172a' };

  const toggleTag = (tag) => {
    setSelectedTags((prev) => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

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

      let resolvedInquiryTitle = INQUIRY_TYPES.find(i => i.id === inquiryType)?.title || inquiryType;
      if (inquiryType === 'arama') {
        resolvedInquiryTitle = searchSubtype === 'satilik' ? 'Gayrimenkul Arıyorum (Satılık)' : 'Gayrimenkul Arıyorum (Kiralık)';
      }

      const newSubmission = {
        id: `sub_${Date.now()}`,
        refCode,
        createdAt: now.toISOString(),
        formattedDate,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim() || 'Belirtilmedi',
        inquiryType: resolvedInquiryTitle,
        propertyType,
        location,
        estimatedPrice: estimatedPrice.trim() || (searchSubtype === 'kiralik' ? 'Kira Bütçesi Belirtilmedi' : 'Bütçe Belirtilmedi'),
        preferredContact,
        selectedRecommendation: selectedRecommendation ? `${selectedRecommendation.title} (${selectedRecommendation.price})` : null,
        selectedLifestyleTags: inquiryType === 'arama' ? selectedTags : [],
        notes: notes.trim() || 'Not eklenmedi',
        status: 'Yeni'
      };

      onAddSubmission(newSubmission);
      setIsSubmitting(false);
      setSuccessData(newSubmission);
    }, 500);
  };

  const getWhatsAppLink = () => {
    if (!successData) return '#';
    let msg = `Merhaba Deniz Bey, ${successData.refCode} referans kodlu talebimi iletmiştim:\n\n` +
      `👤 Ad Soyad: ${successData.fullName}\n` +
      `📞 Telefon: ${successData.phone}\n` +
      `📋 İşlem Türü: ${successData.inquiryType}\n` +
      `🏡 Mülk / Lokasyon: ${successData.propertyType} (${successData.location})\n` +
      `💰 Bütçe / Değer: ${successData.estimatedPrice}\n`;

    if (successData.selectedRecommendation) {
      msg += `🎯 İlgilendiğim Öneri Portföy: ${successData.selectedRecommendation}\n`;
    }
    if (successData.selectedLifestyleTags && successData.selectedLifestyleTags.length > 0) {
      msg += `✨ Yaşam Kriterleri: ${successData.selectedLifestyleTags.join(', ')}\n`;
    }
    msg += `💬 Not: ${successData.notes}\n\n` +
      `Detayları görüşmek üzere dönüşünüzü rica ederim.`;

    const cleanPhone = (agentProfile?.phone || '+905324112026').replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div 
      className="bg-[#FAF8F5] py-12 sm:py-16 px-4 sm:px-6 min-h-screen text-slate-800 standard-theme-root light-form-scope"
      style={{ colorScheme: 'light' }}
    >
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
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C6A59] bg-[#EDE8E0] px-3.5 py-1 rounded-full border border-[#DDD6CB]">
            Ege & Akdeniz Butik Danışmanlık
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl text-[#1E2522] font-semibold">
            {inquiryType === 'arama'
              ? 'Kişiselleştirilmiş Portföy Arama & Danışmanlık'
              : inquiryType === 'kiralik'
              ? 'Mülkümü Kiraya Vermek İstiyorum'
              : 'Mülk Değerleme & Satış Yetkilendirme'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {inquiryType === 'arama'
              ? 'Ege ve Akdeniz hattında aradığınız karakterli evi veya kiralık konutu kriterlerinizle bildirin, size en uygun portföyleri sunalım.'
              : 'Evinizi Ege bölgesi emsalleriyle gerçek piyasa değerinde değerlendirmek ve sakin butik alıcı ağına sunmak için formu doldurun.'}
          </p>
        </div>

        {/* Success Modal */}
        {successData && (
          <div className="bg-white p-8 rounded-3xl border border-emerald-200 shadow-xl text-center space-y-5 animate-fade-in mb-8">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200 shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-[#7C6A59] uppercase tracking-wider">
                BAŞVURU KAYDINIZ ALINDI
              </span>
              <h2 className="font-serif text-2xl font-bold text-[#1E2522]">
                Talebiniz Başarıyla Oluşturuldu!
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Talebiniz Butik Gayrimenkul ({agentProfile?.name || 'Deniz Arslan'}) kontrol merkezine aktarıldı. Referans kodunuzla talebinizi teyit etmek için WhatsApp üzerinden de hemen mesaj iletebilirsiniz.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E8E4DC] max-w-sm mx-auto text-xs space-y-1.5 text-left font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Referans Kodu:</span>
                <span className="font-bold text-[#2C3E35]">{successData.refCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Talep Türü:</span>
                <span className="font-semibold text-slate-800">{successData.inquiryType}</span>
              </div>
              {successData.selectedRecommendation && (
                <div className="flex justify-between text-amber-800 font-semibold border-t border-[#E8E4DC] pt-1">
                  <span>İlgilenilen Portföy:</span>
                  <span className="truncate max-w-[180px]">{successData.selectedRecommendation}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp ile Onay Gönder</span>
              </a>

              {onBackToShowcase && (
                <button
                  type="button"
                  onClick={onBackToShowcase}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#2C3E35] text-white font-semibold text-xs hover:bg-[#1E2522] transition-colors"
                >
                  Vitrine Geri Dön
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form Container */}
        {!successData && (
          <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E4DC] shadow-sm space-y-8">
            
            {/* Step 1: Main Inquiry Type */}
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
                      onClick={() => {
                        setInquiryType(type.id);
                        setSelectedRecommendation(null);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#2C3E35] bg-[#FAF8F5] ring-2 ring-[#2C3E35]/15'
                          : 'border-[#E8E4DC] hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-[#E8E4DC] flex items-center justify-center text-[#2C3E35] mb-3 shadow-2xs">
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

            {/* DYNAMIC MODE: GAYRİMENKUL ARIYORUM */}
            {inquiryType === 'arama' && (
              <div className="space-y-6 pt-4 border-t border-[#E8E4DC] animate-fade-in">
                
                {/* Satılık vs Kiralık Sub-Toggle */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                    Arama Amacınız: Satılık mı Kiralık mı?
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1 bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC]">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchSubtype('satilik');
                        setSelectedRecommendation(null);
                      }}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        searchSubtype === 'satilik'
                          ? 'bg-[#2C3E35] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Home className="w-4 h-4" />
                      <span>Satılık Portföy Arıyorum</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchSubtype('kiralik');
                        setSelectedRecommendation(null);
                      }}
                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        searchSubtype === 'kiralik'
                          ? 'bg-[#2C3E35] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Key className="w-4 h-4" />
                      <span>Kiralık Portföy Arıyorum</span>
                    </button>
                  </div>
                </div>

                {/* Aranan Kriterler */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      İlgilendiğiniz Mülk Tipi
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      style={lightInputStyle}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs cursor-pointer"
                    >
                      {PROPERTY_TYPES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Tercih Edilen Lokasyon
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      style={lightInputStyle}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs cursor-pointer"
                    >
                      {LOCATIONS.map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      {searchSubtype === 'satilik' ? 'Hedef Satın Alma Bütçeniz' : 'Aylık Kira Bütçeniz'}
                    </label>
                    <input
                      type="text"
                      value={estimatedPrice}
                      onChange={(e) => setEstimatedPrice(e.target.value)}
                      placeholder={searchSubtype === 'satilik' ? 'Örn: ₺15.000.000 - ₺25.000.000' : 'Örn: ₺60.000 - ₺100.000 / Ay'}
                      style={lightInputStyle}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      İstenen Oda Sayısı
                    </label>
                    <select
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      style={lightInputStyle}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs cursor-pointer"
                    >
                      <option value="2+1">2+1 (Teras Rezidans / Daire)</option>
                      <option value="3+1">3+1 (Butik Konut / Bahçe Evi)</option>
                      <option value="4+1">4+1 (Geniş Taş Konak / Villa)</option>
                      <option value="5+1 ve üzeri">5+1 ve üzeri (Müstakil Malikâne)</option>
                    </select>
                  </div>
                </div>

                {/* Lifestyle Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Öncelikli Yaşam & Mimari Tercihleriniz
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {LIFESTYLE_TAGS.map((tag) => {
                      const isSelected = selectedTags.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-[#2C3E35] text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-emerald-400" />}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DYNAMIC REAL-TIME PORTFOLIO RECOMMENDATIONS */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#EDE8E0] to-[#FAF8F5] border border-[#DDD6CB] space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-[#2C3E35] text-white flex items-center justify-center font-bold text-xs">
                        DA
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-[#1E2522]">
                          Kriterlerinize Uygun Önerilen {searchSubtype === 'satilik' ? 'Satılık' : 'Kiralık'} Portföyler
                        </h4>
                        <p className="text-[11px] text-slate-600">
                          İncelemek istediğiniz portföyü seçerek doğrudan talebinize ekleyebilirsiniz:
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CURATED_RECOMMENDATIONS[searchSubtype].map((rec) => {
                      const isChosen = selectedRecommendation?.id === rec.id;
                      return (
                        <div
                          key={rec.id}
                          onClick={() => setSelectedRecommendation(isChosen ? null : rec)}
                          className={`bg-white rounded-xl border p-3 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-md ${
                            isChosen
                              ? 'border-[#2C3E35] ring-2 ring-[#2C3E35] bg-[#FAF8F5]'
                              : 'border-[#E8E4DC] hover:border-slate-300'
                          }`}
                        >
                          <div className="space-y-2">
                            <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-200">
                              <img src={rec.image} alt={rec.title} className="w-full h-full object-cover" />
                              <span className="absolute top-1.5 left-1.5 bg-white/90 text-[#2C3E35] text-[9px] font-bold px-2 py-0.5 rounded-full">
                                {rec.tag}
                              </span>
                              {isChosen && (
                                <span className="absolute top-1.5 right-1.5 bg-[#2C3E35] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                                  <Check className="w-2.5 h-2.5" />
                                  <span>Seçildi</span>
                                </span>
                              )}
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-[#7C6A59]" />
                                <span>{rec.location}</span>
                              </div>
                              <h5 className="font-serif font-bold text-xs text-[#1E2522] line-clamp-1 mt-0.5">
                                {rec.title}
                              </h5>
                              <div className="text-xs font-bold text-[#2C3E35] mt-1">
                                {rec.price}
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            className={`mt-3 py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                              isChosen
                                ? 'bg-[#2C3E35] text-white'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {isChosen ? '✓ Talebime Eklendi' : '+ Talebime Ekle'}
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {selectedRecommendation && (
                    <div className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                      <span>✓ Seçilen Portföy: <strong>{selectedRecommendation.title}</strong></span>
                      <button
                        type="button"
                        onClick={() => setSelectedRecommendation(null)}
                        className="text-[11px] text-rose-600 underline cursor-pointer"
                      >
                        Kaldır
                      </button>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* DEFAULT MODE: MÜLK SATIŞ VEYA KİRALAMA DETAYLARI */}
            {inquiryType !== 'arama' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Mülk Tipi
                  </label>
                  <select
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs cursor-pointer"
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
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs cursor-pointer"
                  >
                    {LOCATIONS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    {inquiryType === 'satilik' ? 'Beklenen Satış Değeri' : 'Beklenen Aylık Kira Bedeli'}
                  </label>
                  <input
                    type="text"
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    placeholder={inquiryType === 'satilik' ? 'Örn: ₺20.000.000' : 'Örn: ₺75.000 / Ay'}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    Mülk Oda Sayısı
                  </label>
                  <input
                    type="text"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    placeholder="Örn: 4+1 veya 3+1"
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs"
                  />
                </div>
              </div>
            )}

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
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ad Soyad"
                      style={lightInputStyle}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs ${
                        errors.fullName ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-[#2C3E35]'
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
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0532 000 00 00"
                      style={lightInputStyle}
                      className={`w-full pl-9 pr-3.5 py-2.5 rounded-xl border text-xs bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none shadow-xs ${
                        errors.phone ? 'border-rose-400 ring-1 ring-rose-300' : 'border-slate-300 focus:border-[#2C3E35]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    E-Posta Adresiniz (İsteğe Bağlı)
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ornek@alanadi.com"
                      style={lightInputStyle}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    İletişim Tercihiniz
                  </label>
                  <select
                    value={preferredContact}
                    onChange={(e) => setPreferredContact(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs cursor-pointer"
                  >
                    <option value="Telefon (Her saat uygun)">Telefon (Her saat uygun)</option>
                    <option value="WhatsApp mesajı">WhatsApp mesajı</option>
                    <option value="Yalnızca mesai saatlerinde">Yalnızca mesai saatlerinde</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Özel İstekleriniz veya Mülk Notları
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Bölge tercihi, teslim zamanı, taşınma tarihi veya özel isteklerinizi buraya yazabilirsiniz..."
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] shadow-xs"
                />
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-[#2C3E35] shrink-0" />
              <span>
                <strong>Gizlilik Güvencesi:</strong> İlettiğiniz bilgiler yalnızca Butik Gayrimenkul ({agentProfile?.name || 'Deniz Arslan'}) tarafından incelenir, üçüncü taraflarla paylaşılmaz.
              </span>
            </div>

            {/* Submit Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#2C3E35] hover:bg-[#1E2522] text-white font-semibold text-xs transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Talebiniz İletiliyor...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Talebi İlet</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
