import React, { useState } from 'react';
import { 
  FileText, 
  Building2, 
  UserCheck, 
  Eye, 
  Send, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Phone, 
  MessageCircle, 
  Clock, 
  MapPin, 
  Star, 
  ShieldCheck,
  X,
  Compass
} from 'lucide-react';

export default function StandardAdminPanel({
  agentProfile,
  onUpdateProfile,
  listings,
  onUpdateListings,
  submissions,
  onUpdateSubmissionStatus,
  onPreviewShowcase,
  onPublish
}) {
  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' | 'listings' | 'profile'
  const [submissionFilter, setSubmissionFilter] = useState('all');
  
  // Local edit states for profile
  const [profileForm, setProfileForm] = useState({ ...agentProfile });
  const [profileSaved, setProfileSaved] = useState(false);

  // New Listing Modal State
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  const [newListingForm, setNewListingForm] = useState({
    title: '',
    location: 'Urla, İzmir',
    price: '₺18.500.000',
    type: 'Taş Villa',
    specs: '3+1 • 220 m² • Bahçeli',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    tag: 'Yeni Portföy',
    status: 'Aktif'
  });

  const filteredSubmissions = submissions.filter((sub) => {
    if (submissionFilter === 'all') return true;
    return sub.status === submissionFilter;
  });

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    onUpdateProfile(profileForm);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2500);
  };

  const handleAddListingSubmit = (e) => {
    e?.preventDefault();
    if (!newListingForm.title.trim()) return;

    if (listings.length >= 15) {
      alert('Standart pakette maksimum 15 butik portföy sınırı bulunmaktadır. Lütfen mevcut bir portföyü silin veya güncelleyin.');
      return;
    }

    const newListing = {
      id: Date.now(),
      ...newListingForm,
      priceRaw: parseInt(newListingForm.price.replace(/[^0-9]/g, ''), 10) || 0
    };

    onUpdateListings([...listings, newListing]);
    setIsAddListingModalOpen(false);
    setNewListingForm({
      title: '',
      location: 'Urla, İzmir',
      price: '₺18.500.000',
      type: 'Taş Villa',
      specs: '3+1 • 220 m² • Bahçeli',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      tag: 'Yeni Portföy',
      status: 'Aktif'
    });
  };

  const handleDeleteListing = (id) => {
    if (confirm('Bu portföyü kaldırmak istediğinize emin misiniz?')) {
      onUpdateListings(listings.filter(item => item.id !== id));
    }
  };

  const handleToggleStatus = (id) => {
    onUpdateListings(listings.map(item => {
      if (item.id === id) {
        return { ...item, status: item.status === 'Aktif' ? 'Satıldı' : 'Aktif' };
      }
      return item;
    }));
  };

  // Safe light input style to override any dark theme leakage
  const lightInputStyle = { backgroundColor: '#ffffff', color: '#0f172a' };

  return (
    <div 
      className="bg-[#F8F9FA] text-slate-800 min-h-screen standard-theme-root light-form-scope"
      style={{ colorScheme: 'light' }}
    >
      
      {/* Top Admin Header Bar */}
      <div className="bg-[#1E2522] text-white border-b border-slate-700 px-4 sm:px-8 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#2C3E35] border border-emerald-500/40 flex items-center justify-center font-bold text-white shadow-sm">
              DA
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-semibold text-base sm:text-lg text-white">
                  Masaüstü Vitrin Kontrol Merkezi
                </h1>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 border border-emerald-700/60 font-mono">
                  Standart Paket
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Hoş geldiniz, {agentProfile.name} • Butik Gayrimenkul Portföy Yönetimi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onPreviewShowcase}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>Canlı Sitede Önizle</span>
            </button>

            <button
              type="button"
              onClick={onPublish}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Değişiklikleri Yayınla</span>
            </button>
          </div>

        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-6 overflow-x-auto text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'submissions'
                ? 'border-[#2C3E35] text-[#2C3E35]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Gelen Müşteri Talepleri</span>
            {submissions.filter(s => s.status === 'Yeni').length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                {submissions.filter(s => s.status === 'Yeni').length} Yeni
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('listings')}
            className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'listings'
                ? 'border-[#2C3E35] text-[#2C3E35]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Portföy Yönetimi</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-50 text-emerald-700 font-mono border border-emerald-200">
              {listings.length}/15
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`py-4 border-b-2 flex items-center gap-2 transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === 'profile'
                ? 'border-[#2C3E35] text-[#2C3E35]'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Danışman Profili & İtibar</span>
          </button>
        </div>
      </div>

      {/* Tab Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
        
        {/* TAB 1: SUBMISSIONS */}
        {activeTab === 'submissions' && (
          <div className="space-y-6">
            
            {/* Filter Pill Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-semibold text-base text-slate-900">Müşteri Talepleri ve Değerlemeler</h2>
                <p className="text-xs text-slate-500">Mülk değerleme formu ve portföy arama taleplerinden gelen tüm kayıtlar.</p>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 text-xs">
                {['all', 'Yeni', 'Görüşüldü', 'Tamamlandı'].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setSubmissionFilter(st)}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer ${
                      submissionFilter === st
                        ? 'bg-[#2C3E35] text-white'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    {st === 'all' ? 'Tümü' : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Submissions List */}
            <div className="space-y-3">
              {filteredSubmissions.map((sub) => (
                <div 
                  key={sub.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-[#7C6A59] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E8E4DC]">
                        {sub.refCode}
                      </span>
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                        sub.status === 'Yeni' 
                          ? 'bg-amber-100 text-amber-800'
                          : sub.status === 'Görüşüldü'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {sub.status}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {sub.formattedDate}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {sub.inquiryType}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap text-xs text-slate-600">
                      <div className="font-bold text-slate-900 text-sm">{sub.fullName}</div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sub.phone}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{sub.location} ({sub.propertyType})</span>
                      </div>
                      {sub.estimatedPrice && (
                        <div className="font-semibold text-emerald-700">
                          Bütçe/Değer: {sub.estimatedPrice}
                        </div>
                      )}
                    </div>

                    {/* Matched / Recommended Listing Badge if user selected an offer */}
                    {sub.selectedRecommendation && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-medium">
                        <Compass className="w-3.5 h-3.5 text-amber-700" />
                        <span>Talebe Bağlanan Öneri Portföy:</span>
                        <strong className="font-bold">{sub.selectedRecommendation}</strong>
                      </div>
                    )}

                    {sub.notes && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        "{sub.notes}"
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href={`https://wa.me/${sub.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Merhaba ${sub.fullName}, Butik Gayrimenkul'e (${agentProfile.name || 'Deniz Arslan'}) ilettiğiniz ${sub.refCode} referans kodlu talebiniz için iletişime geçiyorum.`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp'tan Yanıtla</span>
                    </a>

                    <select
                      value={sub.status}
                      onChange={(e) => onUpdateSubmissionStatus(sub.id, e.target.value)}
                      style={lightInputStyle}
                      className="px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs font-medium focus:outline-none focus:border-[#2C3E35] cursor-pointer"
                    >
                      <option value="Yeni">Yeni</option>
                      <option value="Görüşüldü">Görüşüldü</option>
                      <option value="Tamamlandı">Tamamlandı</option>
                      <option value="İptal">İptal</option>
                    </select>
                  </div>
                </div>
              ))}

              {filteredSubmissions.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200 text-slate-500 text-xs">
                  Bu filtrede görüntülenecek talep bulunmamaktadır.
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB 2: PORTFOLIO LISTINGS */}
        {activeTab === 'listings' && (
          <div className="space-y-6">
            
            {/* Quota & Action Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-base text-slate-900">Butik Portföy Havuzu</h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Maksimum 15 Kota
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Şu an <strong className="text-slate-800">{listings.length}/15</strong> portföy yayında. (Kalan kontenjan: {15 - listings.length})
                </p>
                
                {/* Visual Quota Progress Bar */}
                <div className="w-48 h-2 bg-slate-100 rounded-full mt-2 overflow-hidden">
                  <div 
                    className={`h-full transition-all ${
                      listings.length >= 14 ? 'bg-rose-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${(listings.length / 15) * 100}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddListingModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-[#2C3E35] hover:bg-[#1E2522] text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs self-start sm:self-auto cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Portföy Ekle</span>
              </button>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {listings.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex gap-4 items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-20 h-16 rounded-xl object-cover shrink-0 bg-slate-100"
                    />
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase text-[#7C6A59] bg-[#FAF8F5] px-2 py-0.5 rounded-md border border-[#E8E4DC]">
                          {item.type}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          item.status === 'Satıldı' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      <h3 className="font-semibold text-xs text-slate-900 line-clamp-1">{item.title}</h3>
                      <div className="text-xs font-bold text-[#2C3E35]">{item.price}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(item.id)}
                      className="px-3 py-1.5 rounded-lg text-[11px] font-medium border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      {item.status === 'Aktif' ? 'Satıldı Yap' : 'Aktif Yap'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteListing(item.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Portföyü Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: PROFILE & REVIEWS */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6 max-w-3xl">
            <div>
              <h2 className="font-semibold text-base text-slate-900">Danışman Profili ve Müşteri Güveni</h2>
              <p className="text-xs text-slate-500">Sitenizde ve Google değerlendirmelerinde görünen bilgilerinizi güncelleyin.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Ad Soyad</label>
                <input
                  type="text"
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Uzmanlık Unvanı</label>
                <input
                  type="text"
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Telefon Numarası</label>
                <input
                  type="text"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">E-posta Adresi</label>
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Ofis Adresi</label>
                <input
                  type="text"
                  value={profileForm.officeAddress}
                  onChange={(e) => setProfileForm({ ...profileForm, officeAddress: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Manşet Başlığı</label>
                <input
                  type="text"
                  value={profileForm.headline}
                  onChange={(e) => setProfileForm({ ...profileForm, headline: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block mb-1">Manşet Açıklaması (Biyografi / Güven)</label>
                <textarea
                  rows={3}
                  value={profileForm.subheadline}
                  onChange={(e) => setProfileForm({ ...profileForm, subheadline: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>
            </div>

            {/* Google Reviews Box */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E4DC] space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#1E2522]">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                <span>Google Değerlendirmeleri ve Güven Rozeti</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Puan</label>
                  <input
                    type="text"
                    value={profileForm.googleReviews?.score || '4.9'}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      googleReviews: { ...profileForm.googleReviews, score: e.target.value }
                    })}
                    style={lightInputStyle}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Toplam Yorum</label>
                  <input
                    type="number"
                    value={profileForm.googleReviews?.totalReviews || 148}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      googleReviews: { ...profileForm.googleReviews, totalReviews: parseInt(e.target.value, 10) }
                    })}
                    style={lightInputStyle}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35]"
                  />
                </div>

                <div>
                  <label className="text-[11px] text-slate-500 block mb-1">Memnuniyet Oranı</label>
                  <input
                    type="text"
                    value={profileForm.googleReviews?.satisfactionRate || '%100'}
                    onChange={(e) => setProfileForm({
                      ...profileForm,
                      googleReviews: { ...profileForm.googleReviews, satisfactionRate: e.target.value }
                    })}
                    style={lightInputStyle}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#2C3E35]"
                  />
                </div>
              </div>
            </div>

            {/* Save Action */}
            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#2C3E35] hover:bg-[#1E2522] text-white text-xs font-semibold transition-colors shadow-sm cursor-pointer"
              >
                Profili Kaydet
              </button>

              {profileSaved && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bilgileriniz başarıyla güncellendi!</span>
                </div>
              )}
            </div>

          </form>
        )}

      </div>

      {/* Add New Listing Modal */}
      {isAddListingModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in"
          style={{ colorScheme: 'light' }}
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl relative text-slate-800">
            <button
              type="button"
              onClick={() => setIsAddListingModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="font-semibold text-base text-slate-900">Yeni Butik Portföy Ekle</h3>
              <p className="text-xs text-slate-500">Maksimum 15 portföylük butik listenize yeni bir mülk ekleyin.</p>
            </div>

            <form onSubmit={handleAddListingSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Mülk Başlığı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Urla Keklicek Müstakil Taş Ev"
                  value={newListingForm.title}
                  onChange={(e) => setNewListingForm({ ...newListingForm, title: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:ring-1 focus:ring-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Fiyat *</label>
                  <input
                    type="text"
                    required
                    placeholder="₺22.500.000"
                    value={newListingForm.price}
                    onChange={(e) => setNewListingForm({ ...newListingForm, price: e.target.value })}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:ring-1 focus:ring-[#2C3E35] focus:bg-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Konum</label>
                  <input
                    type="text"
                    value={newListingForm.location}
                    onChange={(e) => setNewListingForm({ ...newListingForm, location: e.target.value })}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:ring-1 focus:ring-[#2C3E35] focus:bg-white shadow-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Mülk Tipi</label>
                  <select
                    value={newListingForm.type}
                    onChange={(e) => setNewListingForm({ ...newListingForm, type: e.target.value })}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs cursor-pointer focus:outline-none focus:border-[#2C3E35]"
                  >
                    <option value="Taş Villa">Taş Villa</option>
                    <option value="Butik Konut">Butik Konut</option>
                    <option value="Teras Daire">Teras Daire</option>
                    <option value="Tarihi Konut">Tarihi Konut</option>
                    <option value="Zeytinlik / Arsa">Zeytinlik / Arsa</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Özellik Özeti</label>
                  <input
                    type="text"
                    placeholder="3+1 • 200 m² • Havuzlu"
                    value={newListingForm.specs}
                    onChange={(e) => setNewListingForm({ ...newListingForm, specs: e.target.value })}
                    style={lightInputStyle}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:ring-1 focus:ring-[#2C3E35] focus:bg-white shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Görsel URL</label>
                <input
                  type="text"
                  value={newListingForm.image}
                  onChange={(e) => setNewListingForm({ ...newListingForm, image: e.target.value })}
                  style={lightInputStyle}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#2C3E35] focus:ring-1 focus:ring-[#2C3E35] focus:bg-white shadow-xs"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddListingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2C3E35] hover:bg-[#1E2522] text-white text-xs font-semibold shadow-sm cursor-pointer"
                >
                  Portföyü Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
