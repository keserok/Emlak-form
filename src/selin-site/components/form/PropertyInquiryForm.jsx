import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Building2, 
  Phone, 
  User, 
  Mail, 
  Home, 
  Compass, 
  Clock, 
  MessageCircle,
  Key,
  Check,
  MapPin
} from 'lucide-react';
import { getTranslations } from '../../data/translations';

const INQUIRY_ICONS = {
  satilik: Home,
  kiralik: Building2,
  arama: Compass
};

// Curated luxury VIP options for buyers and renters in Göktürk & Kemerburgaz
const VIP_CURATED_RECOMMENDATIONS = {
  satilik: [
    {
      id: 'vip-s1',
      title: 'Kemer Country Orman Malikânesi',
      location: 'Kemer Country, Göktürk',
      price: '₺48.500.000',
      specs: '6+2 • 650 m² • 1.200 m² Bahçe & Havuz',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      tag: 'Özel Malikâne'
    },
    {
      id: 'vip-s2',
      title: 'Göktürk Merkez Doğa İçi Müstakil Villa',
      location: 'Göktürk Merkez',
      price: '₺32.000.000',
      specs: '4+1 • 380 m² • Müstakil Bahçeli',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      tag: 'Seçkin Villa'
    },
    {
      id: 'vip-s3',
      title: 'Kemerburgaz Panoramik Teras Rezidans',
      location: 'Kemerburgaz Orman Hattı',
      price: '₺21.500.000',
      specs: '3+1 • 210 m² • Panoramik Orman Manzarası',
      image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      tag: 'Teras Rezidans'
    }
  ],
  kiralik: [
    {
      id: 'vip-k1',
      title: 'Kemer Country Müstakil Kiralık Malikâne',
      location: 'Kemer Country, Göktürk',
      price: '₺180.000 / Ay',
      specs: '5+2 • 520 m² • Özel Havuzlu & Bahçeli',
      image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      tag: 'VIP Kiralık'
    },
    {
      id: 'vip-k2',
      title: 'Göktürk Doğa Manzaralı Bahçe Dubleksi',
      location: 'Göktürk Merkez',
      price: '₺95.000 / Ay',
      specs: '3+1 • 240 m² • Özel Bahçe Kullanımı',
      image: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=80',
      tag: 'Bahçe Dubleksi'
    },
    {
      id: 'vip-k3',
      title: 'Kemerburgaz Teraslı Lüks Rezidans',
      location: 'Kemerburgaz Merkez',
      price: '₺65.000 / Ay',
      specs: '2+1 • 140 m² • Eşyalı & Orman Cephe',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      tag: 'Lüks Rezidans'
    }
  ]
};

const VIP_LIFESTYLE_CHIPS = {
  TR: ['Kemer Country Club Yakınlığı', 'Belgrad Ormanı Cephesi', 'Özel Yüzme Havuzu', 'Müstakil Malikâne', '7/24 Özel Güvenlik', 'Akıllı Ev Donanımı'],
  EN: ['Near Kemer Country Club', 'Belgrad Forest Front', 'Private Swimming Pool', 'Detached Luxury Estate', '24/7 Gated Security', 'Smart Home System'],
  RU: ['Рядом с Kemer Country Club', 'Вид на Белградский лес', 'Частный бассейн', 'Отдельный особняк', 'Охрана 24/7', 'Система умного дома']
};

export default function PropertyInquiryForm({ isEmbedded = false }) {
  const { setViewMode, addSubmission, agentProfile, language } = useAppState();
  const t = getTranslations(language).form;

  // Selected Option State
  const [inquiryTypeId, setInquiryTypeId] = useState('satilik');
  
  // Dynamic state for "arama" (Gayrimenkul Arıyorum)
  const [searchSubtype, setSearchSubtype] = useState('satilik'); // 'satilik' | 'kiralik'
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [selectedTags, setSelectedTags] = useState(['Kemer Country Club Yakınlığı', 'Özel Yüzme Havuzu']);

  const [propertyTypeIdx, setPropertyTypeIdx] = useState(0);
  const [locationIdx, setLocationIdx] = useState(0);
  const [estimatedPrice, setEstimatedPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('4+1');
  const [area, setArea] = useState('');
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactPrefIdx, setContactPrefIdx] = useState(0);
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);
  const [errors, setErrors] = useState({});

  // Explicit inline style to guarantee white background and dark text on all browsers
  const lightInputStyle = { backgroundColor: '#ffffff', color: '#0f172a' };

  // Active resolved values according to current language
  const activeInquiry = t.inquiryTypes.find((item) => item.id === inquiryTypeId) || t.inquiryTypes[0];
  const activePropType = t.propTypes[propertyTypeIdx] || t.propTypes[0];
  const activeLocation = t.locations[locationIdx] || t.locations[0];
  const activeContactPref = t.contactPrefs[contactPrefIdx] || t.contactPrefs[0];

  const toggleTag = (tag) => {
    setSelectedTags((prev) => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = t.errName;
    if (!phone.trim() || phone.trim().length < 9) errs.phone = t.errPhone;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const getResolvedActionTitle = () => {
    if (inquiryTypeId === 'arama') {
      if (language === 'EN') return searchSubtype === 'satilik' ? 'Looking for Property to Buy' : 'Looking for Property to Rent';
      if (language === 'RU') return searchSubtype === 'satilik' ? 'Ищу недвижимость на покупку' : 'Ищу недвижимость в аренду';
      return searchSubtype === 'satilik' ? 'Gayrimenkul Arıyorum (Satılık)' : 'Gayrimenkul Arıyorum (Kiralık)';
    }
    return activeInquiry.title;
  };

  // 1. ACTION: Save to System
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
      const resolvedTitle = getResolvedActionTitle();
      const created = addSubmission({
        fullName,
        phone,
        email: email || (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указан' : 'Belirtilmedi'),
        inquiryType: resolvedTitle,
        propertyType: activePropType,
        location: activeLocation,
        estimatedPrice: estimatedPrice ? `${estimatedPrice}` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
        bedrooms,
        area: area ? `${area} m²` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
        notes: notes || (language === 'EN' ? 'No notes' : language === 'RU' ? 'Без примечаний' : 'Not eklenmedi'),
        selectedRecommendation: selectedRecommendation ? `${selectedRecommendation.title} (${selectedRecommendation.price})` : null,
        selectedLifestyleTags: inquiryTypeId === 'arama' ? selectedTags : [],
        contactPreference: activeContactPref,
        source: 'Selin Karaca Web Form',
        submissionMethod: language === 'EN' ? 'System Record (Awaiting Call)' : language === 'RU' ? 'Запись в системе (Ожидает звонка)' : 'Sistem Kaydı (Dönüş Bekliyor)',
        language
      });

      setIsSubmitting(false);
      setSubmissionSuccess({
        id: created.id,
        refCode: created.refCode || Math.floor(100000 + Math.random() * 900000),
        method: 'system',
        message: t.successModal.descSystem,
        data: created
      });
    }, 400);
  };

  // 2. ACTION: Send via WhatsApp
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
    const resolvedTitle = getResolvedActionTitle();

    const created = addSubmission({
      fullName,
      phone,
      email: email || (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указан' : 'Belirtilmedi'),
      inquiryType: resolvedTitle,
      propertyType: activePropType,
      location: activeLocation,
      estimatedPrice: estimatedPrice ? `${estimatedPrice}` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
      bedrooms,
      area: area ? `${area} m²` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
      notes: notes || (language === 'EN' ? 'No notes' : language === 'RU' ? 'Без примечаний' : 'Not eklenmedi'),
      selectedRecommendation: selectedRecommendation ? `${selectedRecommendation.title} (${selectedRecommendation.price})` : null,
      selectedLifestyleTags: inquiryTypeId === 'arama' ? selectedTags : [],
      contactPreference: activeContactPref,
      source: 'Selin Karaca Web Form',
      submissionMethod: language === 'EN' ? 'WhatsApp & System' : language === 'RU' ? 'WhatsApp и Система' : 'WhatsApp & Sistem Kaydı',
      language
    });

    let msg = '';
    if (language === 'EN') {
      msg = [
        `*NEW PROPERTY & INQUIRY SUBMISSION (VIP)*`,
        `---------------------------------`,
        `• *Action:* ${resolvedTitle}`,
        `• *Full Name:* ${fullName}`,
        `• *Phone:* ${phone}`,
        `• *Email:* ${email || 'Not provided'}`,
        `• *Property Type:* ${activePropType}`,
        `• *Location:* ${activeLocation}`,
        `• *Target Price / Budget:* ${estimatedPrice || 'Not specified'}`,
        `• *Bedrooms:* ${bedrooms || 'Not specified'}`,
        selectedRecommendation ? `• *Interested / Matched Portfolio:* ${selectedRecommendation.title} (${selectedRecommendation.price})` : null,
        selectedTags.length > 0 ? `• *Lifestyle Priorities:* ${selectedTags.join(', ')}` : null,
        `• *Contact Preference:* ${activeContactPref}`,
        notes ? `• *Special Notes:* ${notes}` : null,
        `---------------------------------`,
        `_Submitted via Selin Karaca Official Luxury Real Estate Platform._`
      ].filter(Boolean).join('\n');
    } else if (language === 'RU') {
      msg = [
        `*НОВАЯ ЗАЯВКА НА НЕДВИЖИМОСТЬ (VIP)*`,
        `---------------------------------`,
        `• *Тип операции:* ${resolvedTitle}`,
        `• *Имя Фамилия:* ${fullName}`,
        `• *Телефон:* ${phone}`,
        `• *Email:* ${email || 'Не указан'}`,
        `• *Тип объекта:* ${activePropType}`,
        `• *Локация:* ${activeLocation}`,
        `• *Бюджет / Цена:* ${estimatedPrice || 'Не указано'}`,
        `• *Спальни:* ${bedrooms || 'Не указано'}`,
        selectedRecommendation ? `• *Выбранный объект из предложенных:* ${selectedRecommendation.title} (${selectedRecommendation.price})` : null,
        selectedTags.length > 0 ? `• *Приоритеты:* ${selectedTags.join(', ')}` : null,
        `• *Предпочтительный контакт:* ${activeContactPref}`,
        notes ? `• *Примечания:* ${notes}` : null,
        `---------------------------------`,
        `_Отправлено через официальную платформу элитной недвижимости Selin Karaca._`
      ].filter(Boolean).join('\n');
    } else {
      msg = [
        `*YENİ MÜLK DEĞERLEME & TALEP BAŞVURUSU (VIP)*`,
        `---------------------------------`,
        `• *İşlem Türü:* ${resolvedTitle}`,
        `• *Ad Soyad:* ${fullName}`,
        `• *Telefon:* ${phone}`,
        `• *E-Posta:* ${email || 'Belirtilmedi'}`,
        `• *Mülk Tipi:* ${activePropType}`,
        `• *Bölge / Konum:* ${activeLocation}`,
        `• *Hedef Fiyat / Bütçe:* ${estimatedPrice || 'Belirtilmedi'}`,
        `• *Oda Sayısı:* ${bedrooms || 'Belirtilmedi'}`,
        selectedRecommendation ? `• *İlgilenilen / Seçilen Portföy:* ${selectedRecommendation.title} (${selectedRecommendation.price})` : null,
        selectedTags.length > 0 ? `• *Yaşam Kriterleri:* ${selectedTags.join(', ')}` : null,
        `• *İletişim Tercihi:* ${activeContactPref}`,
        notes ? `• *Müşteri Notu:* ${notes}` : null,
        `---------------------------------`,
        `_Selin Karaca Resmi Lüks Gayrimenkul Platformu Üzerinden İletildi._`
      ].filter(Boolean).join('\n');
    }

    const cleanAgentPhone = (agentProfile?.phone || '+905320000000').replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${cleanAgentPhone}?text=${encodeURIComponent(msg)}`;

    setIsSubmitting(false);
    setSubmissionSuccess({
      id: created.id,
      refCode: created.refCode || Math.floor(100000 + Math.random() * 900000),
      method: 'whatsapp',
      message: t.successModal.descWa,
      data: created
    });

    window.open(waUrl, '_blank');
  };

  const activeLifestyleChips = VIP_LIFESTYLE_CHIPS[language] || VIP_LIFESTYLE_CHIPS.TR;

  return (
    <div 
      className="max-w-4xl mx-auto px-4 sm:px-6 py-6 selin-site-root light-form-scope text-slate-800"
      style={{ colorScheme: 'light' }}
    >
      
      {/* Return to Showcase Link */}
      {!isEmbedded && (
        <div className="mb-6">
          <button
            type="button"
            onClick={() => setViewMode('showcase')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#8A735C] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t.returnShowcase}</span>
          </button>
        </div>
      )}

      {/* Main Form Box */}
      <div className="space-y-6">
        
        {/* Title Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8A735C]/10 text-[#8A735C] text-xs font-bold tracking-wider uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>
              {language === 'EN' ? 'Bespoke Luxury Advisory' : language === 'RU' ? 'Индивидуальный консьерж' : 'Özel VIP Danışmanlık'}
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111827] font-medium tracking-tight">
            {inquiryTypeId === 'arama' 
              ? (language === 'EN' ? 'Personalized Luxury Property Search' : language === 'RU' ? 'Индивидуальный подбор элитной недвижимости' : 'Kişiselleştirilmiş Lüks Portföy Arama & Danışmanlık')
              : t.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {inquiryTypeId === 'arama'
              ? (language === 'EN' ? 'Specify your desired luxury criteria in Göktürk & Kemerburgaz, and review our curated recommendations below.' : language === 'RU' ? 'Укажите желаемые критерии в Гёктюрке и Кемербургазе и ознакомьтесь с рекомендованными объектами ниже.' : 'Göktürk ve Kemerburgaz hattında aradığınız prestijli mülkü kriterlerinizle bildirin, size özel satılık ve kiralık portföy önerilerimizi inceleyin.')
              : t.subtitle}
          </p>
        </div>

        {/* Form Body Container */}
        <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-lg p-6 sm:p-10 space-y-8">
          
          {/* Section 1: Inquiry Type Selector */}
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.step1}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {t.inquiryTypes.map((item) => {
                const IconComponent = INQUIRY_ICONS[item.id] || Home;
                const isSelected = inquiryTypeId === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setInquiryTypeId(item.id);
                      setSelectedRecommendation(null);
                    }}
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
                      <div className="font-semibold text-xs text-[#111827]">{item.title}</div>
                      <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC SECTION: GAYRİMENKUL ARIYORUM */}
          {inquiryTypeId === 'arama' && (
            <div className="space-y-6 pt-4 border-t border-slate-100 animate-fade-in">
              
              {/* Satılık vs Kiralık Sub-Toggle */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  {language === 'EN' ? 'Purpose: Buy or Rent?' : language === 'RU' ? 'Цель: Покупка или Аренда?' : 'Arama Amacınız: Satılık mı Kiralık mı?'}
                </label>
                <div className="grid grid-cols-2 gap-3 p-1.5 bg-[#FAF8F5] rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setSearchSubtype('satilik');
                      setSelectedRecommendation(null);
                    }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      searchSubtype === 'satilik'
                        ? 'bg-[#111827] text-amber-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>{language === 'EN' ? 'Looking to Buy' : language === 'RU' ? 'Купить недвижимость' : 'Satılık VIP Portföy Arıyorum'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSearchSubtype('kiralik');
                      setSelectedRecommendation(null);
                    }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      searchSubtype === 'kiralik'
                        ? 'bg-[#111827] text-amber-300 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Key className="w-4 h-4" />
                    <span>{language === 'EN' ? 'Looking to Rent' : language === 'RU' ? 'Арендовать недвижимость' : 'Kiralık VIP Portföy Arıyorum'}</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Criteria Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelPropType}
                  </label>
                  <select
                    value={propertyTypeIdx}
                    onChange={(e) => setPropertyTypeIdx(Number(e.target.value))}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white text-slate-900 cursor-pointer shadow-xs"
                  >
                    {t.propTypes.map((pt, idx) => (
                      <option key={idx} value={idx}>{pt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelLocation}
                  </label>
                  <select
                    value={locationIdx}
                    onChange={(e) => setLocationIdx(Number(e.target.value))}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white text-slate-900 cursor-pointer shadow-xs"
                  >
                    {t.locations.map((loc, idx) => (
                      <option key={idx} value={idx}>{loc}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {searchSubtype === 'satilik' 
                      ? (language === 'EN' ? 'Target Purchase Budget' : language === 'RU' ? 'Бюджет покупки' : 'Hedef Satın Alma Bütçesi')
                      : (language === 'EN' ? 'Target Monthly Rental Budget' : language === 'RU' ? 'Бюджет аренды в месяц' : 'Hedef Aylık Kira Bütçesi')}
                  </label>
                  <input
                    type="text"
                    placeholder={searchSubtype === 'satilik' ? 'Örn: ₺30.000.000 - ₺60.000.000' : 'Örn: ₺80.000 - ₺180.000 / Ay'}
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelBedrooms}
                  </label>
                  <select
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] cursor-pointer shadow-xs"
                  >
                    <option value="2+1">2+1 (Teras Rezidans)</option>
                    <option value="3+1">3+1 (Bahçe Dubleksi / Penthouse)</option>
                    <option value="4+1 / 5+1">4+1 / 5+1 (Müstakil Villa)</option>
                    <option value="6+2 Malikâne">6+2 ve üzeri (Özel Malikâne)</option>
                  </select>
                </div>
              </div>

              {/* Lifestyle Chips */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-slate-700">
                  {language === 'EN' ? 'Lifestyle & Architectural Preferences' : language === 'RU' ? 'Приоритеты стиля жизни' : 'Öncelikli Yaşam & Mimari Tercihleriniz'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {activeLifestyleChips.map((chip) => {
                    const isSelected = selectedTags.includes(chip);
                    return (
                      <button
                        key={chip}
                        type="button"
                        onClick={() => toggleTag(chip)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#8A735C] text-white shadow-xs'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-amber-200" />}
                        <span>{chip}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CURATED VIP RECOMMENDATIONS MATCH BOX */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#FBF9F6] to-[#F5EFE6] border border-[#E8E2D9] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#8A735C] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                      SK
                    </div>
                    <div>
                      <h4 className="font-serif text-sm sm:text-base font-bold text-[#111827]">
                        {language === 'EN' 
                          ? `Curated VIP ${searchSubtype === 'satilik' ? 'Sale' : 'Rental'} Recommendations` 
                          : language === 'RU'
                          ? `Рекомендованные VIP-объекты на ${searchSubtype === 'satilik' ? 'покупку' : 'аренду'}`
                          : `Kriterlerinize Uyan Önerilen VIP ${searchSubtype === 'satilik' ? 'Satılık' : 'Kiralık'} Portföyler`}
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        {language === 'EN'
                          ? 'Select any property below to attach it directly to your VIP inquiry:'
                          : language === 'RU'
                          ? 'Выберите объект ниже, чтобы прикрепить его к заявке:'
                          : 'İncelemek istediğiniz portföyü seçerek danışman talebinize iliştirebilirsiniz:'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {VIP_CURATED_RECOMMENDATIONS[searchSubtype].map((item) => {
                    const isChosen = selectedRecommendation?.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => setSelectedRecommendation(isChosen ? null : item)}
                        className={`bg-white rounded-2xl border p-3 flex flex-col justify-between transition-all cursor-pointer shadow-xs hover:shadow-md ${
                          isChosen
                            ? 'border-[#8A735C] ring-2 ring-[#8A735C] bg-[#FBF9F6]'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-200">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            <span className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-xs text-[#8A735C] text-[9px] font-bold px-2 py-0.5 rounded-full">
                              {item.tag}
                            </span>
                            {isChosen && (
                              <span className="absolute top-1.5 right-1.5 bg-[#8A735C] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                                <Check className="w-2.5 h-2.5" />
                                <span>{language === 'EN' ? 'Selected' : language === 'RU' ? 'Выбрано' : 'Seçildi'}</span>
                              </span>
                            )}
                          </div>

                          <div>
                            <div className="text-[10px] text-slate-500 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-[#8A735C]" />
                              <span>{item.location}</span>
                            </div>
                            <h5 className="font-serif font-bold text-xs text-[#111827] line-clamp-1 mt-0.5">
                              {item.title}
                            </h5>
                            <div className="text-xs font-bold text-[#8A735C] mt-1">
                              {item.price}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          className={`mt-3 py-1.5 px-2 rounded-xl text-[11px] font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer ${
                            isChosen
                              ? 'bg-[#8A735C] text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {isChosen 
                            ? (language === 'EN' ? '✓ Attached to Inquiry' : language === 'RU' ? '✓ Прикреплено' : '✓ Talebime Eklendi')
                            : (language === 'EN' ? '+ Attach to Inquiry' : language === 'RU' ? '+ Прикрепить' : '+ Talebime Ekle')}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {selectedRecommendation && (
                  <div className="text-xs text-amber-900 bg-amber-50/90 p-3 rounded-xl border border-amber-200 flex items-center justify-between">
                    <span>✓ {language === 'EN' ? 'Selected Portfolio:' : language === 'RU' ? 'Выбранный объект:' : 'Seçilen Portföy:'} <strong>{selectedRecommendation.title} ({selectedRecommendation.price})</strong></span>
                    <button
                      type="button"
                      onClick={() => setSelectedRecommendation(null)}
                      className="text-[11px] text-rose-600 underline cursor-pointer"
                    >
                      {language === 'EN' ? 'Remove' : language === 'RU' ? 'Удалить' : 'Kaldır'}
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* DEFAULT SECTION: MÜLK SATIŞ / KİRALAMA DETAYLARI */}
          {inquiryTypeId !== 'arama' && (
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.step2}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelPropType}
                  </label>
                  <select
                    value={propertyTypeIdx}
                    onChange={(e) => setPropertyTypeIdx(Number(e.target.value))}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white text-slate-900 cursor-pointer shadow-xs"
                  >
                    {t.propTypes.map((pt, idx) => (
                      <option key={idx} value={idx}>{pt}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelLocation}
                  </label>
                  <select
                    value={locationIdx}
                    onChange={(e) => setLocationIdx(Number(e.target.value))}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white text-slate-900 cursor-pointer shadow-xs"
                  >
                    {t.locations.map((loc, idx) => (
                      <option key={idx} value={idx}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelPrice}
                  </label>
                  <input
                    type="text"
                    placeholder={t.pricePlaceholder}
                    value={estimatedPrice}
                    onChange={(e) => setEstimatedPrice(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelBedrooms}
                  </label>
                  <input
                    type="text"
                    placeholder="4+1 / 5+2"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">
                    {t.labelArea}
                  </label>
                  <input
                    type="text"
                    placeholder={t.areaPlaceholder}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    style={lightInputStyle}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white shadow-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section 3: Contact Details */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.step3}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t.labelFullName}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    placeholder={t.fullNamePlaceholder}
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: null });
                    }}
                    style={lightInputStyle}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:bg-white shadow-xs ${
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
                  {t.labelPhone}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="tel"
                    required
                    placeholder={t.phonePlaceholder}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: null });
                    }}
                    style={lightInputStyle}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none focus:bg-white shadow-xs ${
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
                  {t.labelEmail}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={lightInputStyle}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t.labelContactPref}
                </label>
                <select
                  value={contactPrefIdx}
                  onChange={(e) => setContactPrefIdx(Number(e.target.value))}
                  style={lightInputStyle}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white text-slate-900 cursor-pointer shadow-xs"
                >
                  {t.contactPrefs.map((cp, idx) => (
                    <option key={idx} value={idx}>{cp}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Section 4: Notes */}
          <div className="space-y-4 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.step4}
            </label>

            <textarea
              rows={4}
              placeholder={t.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={lightInputStyle}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white shadow-xs resize-none"
            />

            {/* Privacy note */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#8A735C] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-800">{t.privacyTitle}</span>
                <span>{t.privacyDesc}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 border-t border-slate-100 space-y-3">
            
            <div className="text-center text-xs text-slate-500 font-medium">
              {t.submitChoiceTitle}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              
              {/* BUTTON 1: "Sisteme Kaydet ve Dönüş Bekle" */}
              <button
                type="button"
                onClick={handleSaveToSystem}
                disabled={isSubmitting}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#111827] hover:bg-[#1f293d] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98] border border-slate-800 disabled:opacity-50"
              >
                <ShieldCheck className="w-5 h-5 text-amber-300" />
                <span>
                  {isSubmitting ? t.btnSubmitting : t.btnSaveSystem}
                </span>
              </button>

              {/* BUTTON 2: "WhatsApp'tan Gönder" */}
              <button
                type="button"
                onClick={handleSendViaWhatsApp}
                className="py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{t.btnWhatsApp}</span>
              </button>

            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-400 pt-1 flex-wrap">
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {t.badgeSecure}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#8A735C]" />
                {t.badgeResponseTime}
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* SUBMISSION SUCCESS MODAL */}
      {submissionSuccess && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in"
          style={{ colorScheme: 'light' }}
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E2D9] shadow-2xl text-center space-y-6 relative animate-scale-up text-slate-800">
            
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#8A735C]">
                {t.successModal.badgeReceived}
              </span>
              <h3 className="text-2xl font-bold text-[#111827]">
                {t.successModal.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                {submissionSuccess.message}
              </p>
            </div>

            {/* Reference Card */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200 text-xs space-y-2 text-left">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">{t.successModal.refCodeLabel}:</span>
                <span className="font-mono font-bold text-sm text-[#8A735C] bg-[#8A735C]/10 px-2 py-0.5 rounded">
                  #{submissionSuccess.refCode}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t.successModal.applicant}:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.data.fullName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t.successModal.action}:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.data.inquiryType}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">{t.successModal.propLoc}:</span>
                <span className="font-semibold text-slate-800">{submissionSuccess.data.propertyType} ({submissionSuccess.data.location})</span>
              </div>
              {submissionSuccess.data.selectedRecommendation && (
                <div className="flex items-center justify-between text-amber-800 border-t border-slate-200 pt-1.5 font-semibold">
                  <span>İlgilenilen Portföy:</span>
                  <span className="truncate max-w-[200px]">{submissionSuccess.data.selectedRecommendation}</span>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setSubmissionSuccess(null);
                  setViewMode('showcase');
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                {t.successModal.btnVitrin}
              </button>

              <button
                type="button"
                onClick={() => {
                  setSubmissionSuccess(null);
                  setViewMode('admin');
                }}
                className="flex-1 py-3 px-5 rounded-xl bg-[#8A735C] hover:bg-[#a38053] text-white font-semibold text-xs transition-colors shadow-md cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{t.successModal.btnAdmin}</span>
                <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
