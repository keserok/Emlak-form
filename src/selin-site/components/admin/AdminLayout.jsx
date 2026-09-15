import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import ProfileEditor from './ProfileEditor';
import ListingsManager from './ListingsManager';
import SubmissionsManager from './SubmissionsManager';
import DeployTriggerModal from './DeployTriggerModal';
import { User, Building, Send, Eye, ShieldCheck, Sparkles, CheckCircle2, Inbox } from 'lucide-react';
import { getTranslations } from '../../data/translations';

export default function AdminLayout() {
  const { agentProfile, setViewMode, triggerPublish, isPublishing, publishSuccess, formSubmissions, language } = useAppState();
  const [activeTab, setActiveTab] = useState('submissions');
  const tAdmin = getTranslations(language).admin || {};

  const newSubmissionsCount = formSubmissions?.filter((s) => s.status === 'Yeni').length || 0;
  const newText = language === 'EN' ? 'New' : language === 'RU' ? 'Новых' : 'Yeni';

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-24">
      
      {/* Top Banner explaining Desktop Control Center concept */}
      <div className="bg-[#1A2530] text-white py-8 border-b border-[#8C6D46]/30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300 px-3 py-1 bg-[#8C6D46]/30 rounded-full border border-[#8C6D46]/50">
                <ShieldCheck className="w-3.5 h-3.5" />
                {tAdmin.badge || 'Masaüstü Vitrin Kontrol Merkezi'}
              </div>
              <h1 className="font-serif-title font-bold text-2xl sm:text-3xl text-amber-100 mt-1">
                {tAdmin.welcome || 'Hoş Geldiniz'}, {agentProfile.name}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-sans">
                {tAdmin.notice || 'Aylık sunucu ücreti ve karmaşık şifreler yok. Değişiklikleri yapın, "Web Sitemi Güncelle" butonuna basın.'}
              </p>
            </div>

            {/* Big Publish Action Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => setViewMode('showcase')}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-600 transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4 text-amber-300" />
                <span>{tAdmin.previewLive || 'Canlı Sitede Önizle'}</span>
              </button>

              <button
                onClick={triggerPublish}
                disabled={isPublishing}
                className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-[#8C6D46] hover:bg-[#a38053] text-white font-bold text-sm shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-white animate-pulse" />
                <span>{tAdmin.publishChanges || 'Değişiklikleri Yayınla (Canlıya Al)'}</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#E8E2D9] mb-8 pb-1">
          <button
            onClick={() => setActiveTab('submissions')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer relative ${
              activeTab === 'submissions'
                ? 'bg-[#1A2530] text-white shadow-md'
                : 'text-slate-600 hover:bg-[#E8E2D9]/40'
            }`}
          >
            <Inbox className="w-4 h-4 text-[#8C6D46]" />
            <span>{tAdmin.tabSubmissions || 'Gelen Form Başvuruları'}</span>
            {newSubmissionsCount > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900 animate-pulse">
                {newSubmissionsCount} {newText}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#1A2530] text-white shadow-md'
                : 'text-slate-600 hover:bg-[#E8E2D9]/40'
            }`}
          >
            <User className="w-4 h-4 text-[#8C6D46]" />
            <span>{tAdmin.tabProfile || 'Danışman Profili'}</span>
          </button>

          <button
            onClick={() => setActiveTab('listings')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'listings'
                ? 'bg-[#1A2530] text-white shadow-md'
                : 'text-slate-600 hover:bg-[#E8E2D9]/40'
            }`}
          >
            <Building className="w-4 h-4 text-[#8C6D46]" />
            <span>{tAdmin.tabListings || 'Portföy Yönetimi'}</span>
          </button>
        </div>

        {/* Success Alert Banner */}
        {publishSuccess && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center justify-between shadow-sm animate-fade-in">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <div className="font-bold text-sm">Tebrikler! Siteniz Başarıyla Güncellendi</div>
                <div className="text-xs text-emerald-700">Görselleriniz WebP formatında sıkıştırılarak canlı sunucuya aktarıldı.</div>
              </div>
            </div>
            <button
              onClick={() => setViewMode('showcase')}
              className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
            >
              Canlı Sitede Gör
            </button>
          </div>
        )}

        {/* Tab Content */}
        {activeTab === 'submissions' && <SubmissionsManager />}
        {activeTab === 'profile' && <ProfileEditor />}
        {activeTab === 'listings' && <ListingsManager />}

      </div>

      {/* Deploy Simulation Modal */}
      <DeployTriggerModal />

    </div>
  );
}
