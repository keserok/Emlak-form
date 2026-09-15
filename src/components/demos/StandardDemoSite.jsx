import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Star, 
  MapPin,
  Compass,
  Building,
  CheckCircle2,
  FileText,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import StandardTopBar from './standard/StandardTopBar';
import StandardBottomSwitcher from './standard/StandardBottomSwitcher';
import StandardInquiryForm from './standard/StandardInquiryForm';
import StandardAdminPanel from './standard/StandardAdminPanel';
import { 
  initialStandardProfile, 
  initialStandardListings, 
  initialStandardSubmissions 
} from './standard/standardInitialData';

export default function StandardDemoSite({ onReturn }) {
  // Navigation state: 'showcase' | 'form' | 'admin'
  const [viewMode, setViewMode] = useState(() => {
    try {
      return localStorage.getItem('standard_demo_view_mode') || 'showcase';
    } catch {
      return 'showcase';
    }
  });

  // Profile data state
  const [agentProfile, setAgentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('standard_demo_profile');
      return saved ? JSON.parse(saved) : initialStandardProfile;
    } catch {
      return initialStandardProfile;
    }
  });

  // Listings state (maximum 15 boutique items)
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('standard_demo_listings');
      return saved ? JSON.parse(saved) : initialStandardListings;
    } catch {
      return initialStandardListings;
    }
  });

  // Submissions state
  const [submissions, setSubmissions] = useState(() => {
    try {
      const saved = localStorage.getItem('standard_demo_submissions');
      return saved ? JSON.parse(saved) : initialStandardSubmissions;
    } catch {
      return initialStandardSubmissions;
    }
  });

  // Category filter for showcase
  const [selectedFilter, setSelectedFilter] = useState('Tümü');

  // Flash toast state for successful publish
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('standard_demo_view_mode', viewMode);
    } catch (e) {
      console.warn(e);
    }
  }, [viewMode]);

  const handleUpdateProfile = (updatedProfile) => {
    setAgentProfile(updatedProfile);
    try {
      localStorage.setItem('standard_demo_profile', JSON.stringify(updatedProfile));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateListings = (updatedListings) => {
    setListings(updatedListings);
    try {
      localStorage.setItem('standard_demo_listings', JSON.stringify(updatedListings));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateSubmissionStatus = (subId, newStatus) => {
    const updated = submissions.map(item => item.id === subId ? { ...item, status: newStatus } : item);
    setSubmissions(updated);
    try {
      localStorage.setItem('standard_demo_submissions', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleAddSubmission = (newSubmission) => {
    const updated = [newSubmission, ...submissions];
    setSubmissions(updated);
    try {
      localStorage.setItem('standard_demo_submissions', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  const handlePublish = () => {
    setPublishSuccess(true);
    setViewMode('showcase');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setPublishSuccess(false);
    }, 3500);
  };

  const resetToDefaults = () => {
    if (window.confirm('Tüm değişiklikleri sıfırlayıp varsayılan standart portföy ve ayarlara dönmek istediğinize emin misiniz?')) {
      try {
        localStorage.removeItem('standard_demo_profile');
        localStorage.removeItem('standard_demo_listings');
        localStorage.removeItem('standard_demo_submissions');
        localStorage.removeItem('standard_demo_view_mode');
      } catch (e) {
        console.warn(e);
      }
      setAgentProfile(initialStandardProfile);
      setListings(initialStandardListings);
      setSubmissions(initialStandardSubmissions);
      setViewMode('showcase');
    }
  };

  // Filter listings based on active filter
  const filteredListings = listings.filter((item) => {
    if (selectedFilter === 'Tümü') return true;
    return item.type === selectedFilter;
  });

  const activeCount = listings.filter(l => l.status === 'Aktif').length;
  const newSubmissionsCount = submissions.filter(s => s.status === 'Yeni').length;

  return (
    <div className="bg-[#FAF8F5] text-[#1E2522] font-sans min-h-screen flex flex-col selection:bg-[#2C3E35]/15 selection:text-[#2C3E35]">
      
      {/* Top Banner (Identical to upper tier package) */}
      <StandardTopBar onReturn={onReturn} />

      {/* Main View Router */}
      <div className="flex-1">
        {viewMode === 'showcase' && (
          <div className="animate-fade-in">
            {/* Top Essential Header */}
            <header className="bg-white/95 backdrop-blur-md border-b border-[#E8E4DC] sticky top-[41px] z-30 shadow-xs">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#2C3E35] text-white flex items-center justify-center font-serif font-bold text-sm shadow-xs">
                    DA
                  </div>
                  <div>
                    <span className="font-serif font-bold text-sm tracking-wider text-[#2C3E35] block">
                      {agentProfile.name?.toUpperCase() || 'DENİZ ARSLAN'}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#7C6A59] font-medium block">
                      {agentProfile.title || 'Ege & Akdeniz Butik Gayrimenkul'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setViewMode('form');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#E8E4DC] text-[#2C3E35] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-[#7C6A59]" />
                    <span>Mülk Değerleme & Talep</span>
                  </button>

                  <a
                    href={`https://wa.me/${agentProfile.phone?.replace(/[^0-9]/g, '') || '905324112026'}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </header>

            {/* Hero Section */}
            <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                <div className="md:col-span-7 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EDE8E0] text-[#5A4B3D] text-[11px] font-semibold tracking-wider uppercase border border-[#DDD6CB]">
                    <Compass className="w-3.5 h-3.5 text-[#7C6A59]" />
                    <span>{agentProfile.badge || 'Butik Danışmanlık • Maksimum 15 Seçkin Portföy'}</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E2522] leading-[1.15] font-medium tracking-tight">
                    {agentProfile.headline || 'Karakterli Evler, Sakin Yaşamlar.'}
                  </h1>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-xl font-normal">
                    {agentProfile.subheadline || 'Yüzlerce ilanın arasında kaybolmayın. Ege ve Akdeniz\'in huzurlu lokasyonlarında, mimarisi ve tapusu doğrulanmış seçkin mülklerle yalnızca size özel çalışıyorum.'}
                  </p>

                  {/* Google Reviews Trust Badge */}
                  <div className="p-4 rounded-2xl bg-white border border-[#E8E4DC] shadow-xs flex flex-wrap items-center justify-between gap-4 max-w-md">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center font-bold text-amber-700 text-sm shadow-xs">
                        G
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 text-amber-500">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="font-bold text-xs text-slate-800 ml-1">
                            {agentProfile.googleReviews?.score || '4.9'} / 5.0
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block">
                          Doğrulanmış {agentProfile.googleReviews?.totalReviews || 148} Google Değerlendirmesi
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg font-semibold border border-emerald-200">
                      {agentProfile.googleReviews?.satisfactionRate || '%100'} Memnuniyet
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <a
                      href="#portfoy"
                      className="px-5 py-2.5 rounded-xl bg-[#2C3E35] text-white font-semibold text-xs hover:bg-[#1E2522] transition-colors shadow-xs"
                    >
                      Vitrin Portföyleri İncele
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('form');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-white border border-[#E8E4DC] text-[#2C3E35] font-semibold text-xs hover:bg-[#F8F6F1] transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#7C6A59]" />
                      <span>Mülk Değerleme & Talep Formu</span>
                    </button>
                    <a
                      href={`tel:${agentProfile.phone?.replace(/[^0-9]/g, '') || '905324112026'}`}
                      className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#2C3E35]" />
                      <span>Beni Arayın</span>
                    </a>
                  </div>
                </div>

                {/* Consultant Portrait & Trust Badge */}
                <div className="md:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-sm">
                    <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/5] bg-slate-200 relative group">
                      <img
                        src={agentProfile.avatarUrl || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'}
                        alt={agentProfile.name || 'Deniz Arslan'}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                    </div>

                    <div className="absolute -bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-[#E8E4DC] shadow-lg text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="font-serif font-bold text-sm text-[#1E2522]">
                          {agentProfile.name || 'Deniz Arslan'}
                        </span>
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="text-[11px] text-[#7C6A59] font-medium mt-0.5">
                        {agentProfile.region || 'Urla • Çeşme • Alaçatı • Bodrum'}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 font-mono">
                        Yetki No: 3501248 • Doğrulanmış Butik Danışman
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Featured Boutique Portfolio (15-listing boutique system) */}
            <section id="portfoy" className="py-14 sm:py-16 bg-white border-y border-[#E8E4DC] scroll-mt-20">
              <div className="max-w-6xl mx-auto px-4 sm:px-6">
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-[#7C6A59]">
                      <span>Seçkin Butik Vitrin</span>
                      <span className="text-slate-300">•</span>
                      <span className="text-emerald-700">{activeCount}/15 Aktif Kontenjan</span>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#1E2522] font-medium mt-1">
                      Karakterli Mülk Seçkisi
                    </h2>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                    {['Tümü', 'Taş Villa', 'Butik Konut', 'Teras Daire', 'Tarihi Konut'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedFilter(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs transition-colors cursor-pointer whitespace-nowrap ${
                          selectedFilter === cat
                            ? 'bg-[#2C3E35] text-white font-medium shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredListings.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#FAF8F5] rounded-2xl border border-[#E8E4DC] overflow-hidden group hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-2">
                          <span className="bg-white/95 backdrop-blur-xs text-[#2C3E35] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                            {item.tag || item.type}
                          </span>
                          {item.status === 'Satıldı' && (
                            <span className="bg-rose-700 text-white px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                              Satıldı
                            </span>
                          )}
                        </div>

                        <div className="absolute bottom-3 right-3 bg-[#2C3E35] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md">
                          {item.price}
                        </div>
                      </div>

                      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                            <MapPin className="w-3.5 h-3.5 text-[#7C6A59]" />
                            <span>{item.location}</span>
                          </div>

                          <h3 className="font-serif font-medium text-base text-[#1E2522] group-hover:text-[#2C3E35] transition-colors line-clamp-1 mt-1">
                            {item.title}
                          </h3>

                          <p className="text-xs text-slate-600 mt-1">
                            {item.specs}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-[#E8E4DC] flex items-center justify-between">
                          <span className="text-[11px] text-slate-400 font-mono">
                            Referans: DA-{item.id}
                          </span>
                          <a
                            href={`https://wa.me/${agentProfile.phone?.replace(/[^0-9]/g, '') || '905324112026'}?text=${encodeURIComponent(`Merhaba Deniz Bey, "${item.title}" (${item.price}) hakkında detaylı portföy dosyasını rica ediyorum.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 font-semibold text-xs group/btn cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Dosya İste</span>
                            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredListings.length === 0 && (
                  <div className="text-center py-16 bg-[#FAF8F5] rounded-2xl border border-dashed border-[#DDD6CB]">
                    <Building className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm font-serif text-slate-700">Bu kategoride şu anda listelenen portföy bulunmamaktadır.</p>
                    <button
                      onClick={() => setSelectedFilter('Tümü')}
                      className="mt-3 text-xs text-[#2C3E35] font-semibold underline cursor-pointer"
                    >
                      Tüm Portföyleri Göster
                    </button>
                  </div>
                )}

                {/* Direct CTA Banner */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#EDE8E0] to-[#E3DCcf] border border-[#DDD6CB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="max-w-xl text-center md:text-left space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C6A59] block">
                      Özel Butik Değerleme
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2522]">
                      Mülkünüzü Doğru Değerinde Sakin Alıcı Ağına Sunun
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Kişisel portföyümde sınırlı 15 kontenjanla yer almak, emsal değerleme ve tapu-hukuk ön incelemesi için online formumuzu doldurabilirsiniz.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        setViewMode('form');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="px-6 py-3.5 rounded-xl bg-[#2C3E35] hover:bg-[#1E2522] text-white font-semibold text-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <FileText className="w-4 h-4 text-amber-300" />
                      <span>Mülk Değerleme Formunu Aç</span>
                    </button>

                    <a
                      href={`https://wa.me/${agentProfile.phone?.replace(/[^0-9]/g, '') || '905324112026'}?text=Merhaba%20Deniz%20Bey%2C%20m%C3%BClk%C3%BCm%C3%BC%20butik%20portf%C3%B6y%C3%BCn%C3%BCzde%20de%C4%9Ferlendirmek%20istiyorum.`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-md flex items-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp'tan Danışın</span>
                    </a>
                  </div>
                </div>

              </div>
            </section>

            {/* Footer */}
            <footer className="py-10 bg-[#FAF8F5] text-center border-t border-[#E8E4DC] text-xs text-slate-500">
              <div className="max-w-6xl mx-auto px-4 space-y-2">
                <div className="font-serif font-bold text-sm text-[#2C3E35]">
                  {agentProfile.name || 'Deniz Arslan'} • Butik Gayrimenkul Danışmanlığı
                </div>
                <div className="text-[11px] text-slate-400">
                  {agentProfile.officeAddress || 'Keklicek Mevkii No: 18, Urla / İzmir'} • {agentProfile.phone || '+90 532 411 20 26'}
                </div>
                <div className="text-[10px] text-slate-400 pt-2 border-t border-[#E8E4DC]/60">
                  © 2026 Deniz Arslan Butik Gayrimenkul • Standart Paket Editoryal Tasarım Mimarisi
                </div>
              </div>
            </footer>
          </div>
        )}

        {viewMode === 'form' && (
          <div className="animate-fade-in py-8 sm:py-12">
            <StandardInquiryForm 
              onBackToShowcase={() => {
                setViewMode('showcase');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAddSubmission={(newSub) => {
                handleAddSubmission(newSub);
              }}
              agentProfile={agentProfile}
            />
          </div>
        )}

        {viewMode === 'admin' && (
          <div className="animate-fade-in py-6">
            <StandardAdminPanel
              agentProfile={agentProfile}
              onUpdateProfile={handleUpdateProfile}
              listings={listings}
              onUpdateListings={handleUpdateListings}
              submissions={submissions}
              onUpdateSubmissionStatus={handleUpdateSubmissionStatus}
              onPreviewShowcase={() => {
                setViewMode('showcase');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onPublish={handlePublish}
            />
          </div>
        )}
      </div>

      {/* Bottom Switcher Dock (Identical to upper tier package) */}
      <StandardBottomSwitcher
        viewMode={viewMode}
        setViewMode={setViewMode}
        resetToDefaults={resetToDefaults}
        publishSuccess={publishSuccess}
        submissionsCount={newSubmissionsCount}
      />

    </div>
  );
}
