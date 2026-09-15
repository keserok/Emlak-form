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
  Coins, 
  Clock, 
  MessageCircle 
} from 'lucide-react';
import { getTranslations } from '../../data/translations';

const INQUIRY_ICONS = {
  satilik: Home,
  kiralik: Building2,
  arama: Coins
};

export default function PropertyInquiryForm({ isEmbedded = false }) {
  const { setViewMode, addSubmission, agentProfile, language } = useAppState();
  const t = getTranslations(language).form;

  // Selected Option State (Index / ID based so they automatically update on language change)
  const [inquiryTypeId, setInquiryTypeId] = useState('satilik');
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

  // Active resolved values according to current language
  const activeInquiry = t.inquiryTypes.find((item) => item.id === inquiryTypeId) || t.inquiryTypes[0];
  const activePropType = t.propTypes[propertyTypeIdx] || t.propTypes[0];
  const activeLocation = t.locations[locationIdx] || t.locations[0];
  const activeContactPref = t.contactPrefs[contactPrefIdx] || t.contactPrefs[0];

  const validate = () => {
    const errs = {};
    if (!fullName.trim()) errs.fullName = t.errName;
    if (!phone.trim() || phone.trim().length < 9) errs.phone = t.errPhone;
    setErrors(errs);
    return Object.keys(errs).length === 0;
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
      const created = addSubmission({
        fullName,
        phone,
        email: email || (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указан' : 'Belirtilmedi'),
        inquiryType: activeInquiry.title,
        propertyType: activePropType,
        location: activeLocation,
        estimatedPrice: estimatedPrice ? `${estimatedPrice}` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
        bedrooms,
        area: area ? `${area} m²` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
        notes: notes || (language === 'EN' ? 'No notes' : language === 'RU' ? 'Без примечаний' : 'Not eklenmedi'),
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

    const created = addSubmission({
      fullName,
      phone,
      email: email || (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указан' : 'Belirtilmedi'),
      inquiryType: activeInquiry.title,
      propertyType: activePropType,
      location: activeLocation,
      estimatedPrice: estimatedPrice ? `${estimatedPrice}` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
      bedrooms,
      area: area ? `${area} m²` : (language === 'EN' ? 'Not specified' : language === 'RU' ? 'Не указано' : 'Belirtilmedi'),
      notes: notes || (language === 'EN' ? 'No notes' : language === 'RU' ? 'Без примечаний' : 'Not eklenmedi'),
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
        `• *Action:* ${activeInquiry.title}`,
        `• *Full Name:* ${fullName}`,
        `• *Phone:* ${phone}`,
        `• *Email:* ${email || 'Not provided'}`,
        `• *Property Type:* ${activePropType}`,
        `• *Location:* ${activeLocation}`,
        `• *Bedrooms:* ${bedrooms || 'Not specified'}`,
        `• *Approx. Area:* ${area ? `${area} m²` : 'Not specified'}`,
        `• *Estimated Budget / Price:* ${estimatedPrice || 'Not specified'}`,
        `• *Contact Preference:* ${activeContactPref}`,
        notes ? `• *Special Notes:* ${notes}` : null,
        `---------------------------------`,
        `_Submitted via Selin Karaca Official Luxury Real Estate Platform._`
      ].filter(Boolean).join('\n');
    } else if (language === 'RU') {
      msg = [
        `*НОВАЯ ЗАЯВКА НА НЕДВИЖИМОСТЬ (VIP)*`,
        `---------------------------------`,
        `• *Тип операции:* ${activeInquiry.title}`,
        `• *Имя Фамилия:* ${fullName}`,
        `• *Телефон:* ${phone}`,
        `• *Эл. почта:* ${email || 'Не указан'}`,
        `• *Тип объекта:* ${activePropType}`,
        `• *Локация:* ${activeLocation}`,
        `• *Комнаты:* ${bedrooms || 'Не указано'}`,
        `• *Площадь:* ${area ? `${area} m²` : 'Не указано'}`,
        `• *Ожидаемый бюджет / цена:* ${estimatedPrice || 'Не указано'}`,
        `• *Способ связи:* ${activeContactPref}`,
        notes ? `• *Примечания:* ${notes}` : null,
        `---------------------------------`,
        `_Отправлено через официальный сайт Селин Караджа._`
      ].filter(Boolean).join('\n');
    } else {
      msg = [
        `*YENİ MÜLK & TALEP BAŞVURUSU (VIP)*`,
        `---------------------------------`,
        `• *İşlem Türü:* ${activeInquiry.title}`,
        `• *Ad Soyad:* ${fullName}`,
        `• *Telefon:* ${phone}`,
        `• *E-Posta:* ${email || 'Belirtilmedi'}`,
        `• *Mülk Tipi:* ${activePropType}`,
        `• *Konum / Bölge:* ${activeLocation}`,
        `• *Oda Sayısı:* ${bedrooms || 'Belirtilmedi'}`,
        `• *Yaklaşık Metrekare:* ${area ? `${area} m²` : 'Belirtilmedi'}`,
        `• *Tahmini Bütçe / Fiyat:* ${estimatedPrice || 'Belirtilmedi'}`,
        `• *İletişim Tercihi:* ${activeContactPref}`,
        notes ? `• *Özel Notlar:* ${notes}` : null,
        `---------------------------------`,
        `_Selin Karaca Resmi Web Sitesi Üzerinden Gönderildi._`
      ].filter(Boolean).join('\n');
    }

    const cleanPhone = (agentProfile.phone || '05328904215').replace(/\D/g, '');
    const waPhone = cleanPhone.startsWith('90') ? cleanPhone : `90${cleanPhone.replace(/^0/, '')}`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;

    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitting(false);
    setSubmissionSuccess({
      id: created.id,
      refCode: created.refCode || Math.floor(100000 + Math.random() * 900000),
      method: 'whatsapp',
      message: t.successModal.descWa,
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
              <span>{t.returnShowcase}</span>
            </button>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-xs sm:text-sm text-[#111827] tracking-tight">
                SELİN KARACA
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-[11px] font-medium text-[#8A735C] uppercase tracking-wider">
                {t.title}
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
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            {t.subtitle}
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
                    onClick={() => setInquiryTypeId(item.id)}
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

          {/* Section 2: Property Characteristics */}
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] bg-white cursor-pointer"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
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
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
                />
              </div>
            </div>
          </div>

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
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder={t.fullNamePlaceholder}
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
                  {t.labelPhone}
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder={t.phonePlaceholder}
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
                  {t.labelEmail}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    placeholder={t.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  {t.labelContactPref}
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <select
                    value={contactPrefIdx}
                    onChange={(e) => setContactPrefIdx(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-medium focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] cursor-pointer"
                  >
                    {t.contactPrefs.map((cp, idx) => (
                      <option key={idx} value={idx}>{cp}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Notes / Description */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.step4}
            </label>
            <textarea
              rows={3}
              placeholder={t.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs sm:text-sm font-normal focus:outline-none focus:border-[#8A735C] focus:ring-1 focus:ring-[#8A735C] focus:bg-white"
            ></textarea>
          </div>

          {/* Privacy & Guarantee note */}
          <div className="bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#E8E2D9] flex items-start gap-3 text-xs text-slate-600">
            <ShieldCheck className="w-5 h-5 text-[#8A735C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#111827]">{t.privacyTitle}</span>
              {t.privacyDesc}
            </div>
          </div>

          {/* ACTION BUTTONS SECTION */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/75 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E8E2D9] shadow-2xl text-center space-y-6 relative animate-scale-up">
            
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
                {t.successModal.btnVitrin}
              </button>

              <button
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
