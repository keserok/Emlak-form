import React, { useState } from 'react';
import { useAppState } from '../../context/AppStateContext';
import { 
  Inbox, 
  PhoneCall, 
  MessageCircle, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Search, 
  Filter, 
  User, 
  Mail, 
  Building2, 
  MapPin, 
  Coins, 
  Calendar, 
  FileText,
  Save,
  Tag,
  Sparkles,
  ExternalLink
} from 'lucide-react';

const STATUS_COLORS = {
  'Yeni': 'bg-amber-100 text-amber-800 border-amber-300',
  'Görüşüldü': 'bg-blue-100 text-blue-800 border-blue-300',
  'Randevu Alındı': 'bg-purple-100 text-purple-800 border-purple-300',
  'Tamamlandı': 'bg-emerald-100 text-emerald-800 border-emerald-300'
};

export default function SubmissionsManager() {
  const { 
    formSubmissions, 
    updateSubmissionStatus, 
    updateSubmissionNotes, 
    deleteSubmission,
    agentProfile
  } = useAppState();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [notesBuffer, setNotesBuffer] = useState('');
  const [copiedRef, setCopiedRef] = useState(null);

  // Filter Submissions
  const filteredSubmissions = formSubmissions.filter((sub) => {
    const matchesStatus = filterStatus === 'ALL' || sub.status === filterStatus;
    const matchesSearch = 
      sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.phone.includes(searchQuery) ||
      sub.refCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.propertyType.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  // Analytics Stats
  const totalCount = formSubmissions.length;
  const newCount = formSubmissions.filter(s => s.status === 'Yeni').length;
  const inProgressCount = formSubmissions.filter(s => s.status === 'Görüşüldü' || s.status === 'Randevu Alındı').length;
  const completedCount = formSubmissions.filter(s => s.status === 'Tamamlandı').length;

  const handleSaveNotes = (id) => {
    updateSubmissionNotes(id, notesBuffer);
    setEditingNotesId(null);
  };

  const copyRefCode = (refCode) => {
    navigator.clipboard?.writeText(refCode);
    setCopiedRef(refCode);
    setTimeout(() => setCopiedRef(null), 2000);
  };

  // Generate Personalized WhatsApp reply link to the customer
  const getCustomerWhatsAppUrl = (sub) => {
    const cleanCustomerPhone = sub.phone.replace(/[^0-9]/g, '');
    const agentName = agentProfile?.name || 'Selin Karaca';
    const message = 
`Merhaba Sayın ${sub.fullName},

${agentName} Lüks Gayrimenkul Danışmanlığı olarak web sitemiz üzerinden ilettiğiniz (#${sub.refCode} referanslı) ${sub.propertyType} (${sub.inquiryType}) başvurunuzu memnuniyetle aldık.

Mülkünüzü ve talebinizi detaylandırmak, bölge emsalleriyle analiz etmek üzere sizin için en uygun zamanda görüşebiliriz. 

Saygılarımızla,
${agentName}
${agentProfile?.phone || ''}`;

    return `https://wa.me/${cleanCustomerPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-3xl border border-[#E8E2D9] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-serif-title font-bold text-xl text-[#1A2530]">
              Gelen Mülk & Talep Başvuruları
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#8C6D46]/20 text-[#8C6D46] border border-[#8C6D46]/40">
              {totalCount} Kayıt
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-sans">
            Ziyaretçilerinizin form üzerinden <strong>"Sisteme Kaydet ve Dönüş Bekle"</strong> veya <strong>"WhatsApp'tan Gönder"</strong> ile ilettiği tüm başvurular anında burada listelenir.
          </p>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="flex items-center gap-2 text-xs">
          <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>{newCount} Yeni Bekleyen</span>
          </div>
          <div className="bg-blue-50 border border-blue-200 text-blue-900 px-3 py-1.5 rounded-xl flex items-center gap-1.5 font-semibold">
            <span>{inProgressCount} İletişimde</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E8E2D9] shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="İsim, telefon, referans kodu veya konum ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-900 text-xs focus:outline-none focus:border-[#8C6D46] focus:ring-1 focus:ring-[#8C6D46] focus:bg-white"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: 'ALL', label: 'Tümü' },
            { id: 'Yeni', label: 'Yeni' },
            { id: 'Görüşüldü', label: 'Görüşüldü' },
            { id: 'Randevu Alındı', label: 'Randevu' },
            { id: 'Tamamlandı', label: 'Tamamlandı' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === tab.id
                  ? 'bg-[#1A2530] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

      </div>

      {/* Submissions List */}
      {filteredSubmissions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#E8E2D9] space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
            <Inbox className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-slate-700">Kayıt Bulunamadı</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Arama kriterlerinize uygun başvuru bulunmamaktadır veya henüz yeni form doldurulmamıştır.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredSubmissions.map((sub) => {
            const isEditingThisNote = editingNotesId === sub.id;

            return (
              <div
                key={sub.id}
                className="bg-white rounded-3xl border border-[#E8E2D9] shadow-sm hover:shadow-md transition-shadow p-5 sm:p-6 space-y-5"
              >
                
                {/* Card Top Bar: RefCode, Timestamp & Status Dropdown */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyRefCode(sub.refCode)}
                      title="Referans kodunu kopyala"
                      className="font-mono font-bold text-xs bg-[#8C6D46]/10 text-[#8C6D46] px-2.5 py-1 rounded-lg border border-[#8C6D46]/30 hover:bg-[#8C6D46]/20 transition-colors cursor-pointer"
                    >
                      #{sub.refCode} {copiedRef === sub.refCode ? '✓ Kopyalandı' : ''}
                    </button>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{sub.formattedDate}</span>
                    </div>
                  </div>

                  {/* Status Change Selector */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium">Durum:</span>
                    <select
                      value={sub.status}
                      onChange={(e) => updateSubmissionStatus(sub.id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-xl border cursor-pointer focus:outline-none ${
                        STATUS_COLORS[sub.status] || 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      <option value="Yeni">🟡 Yeni Talep</option>
                      <option value="Görüşüldü">🔵 Görüşüldü</option>
                      <option value="Randevu Alındı">🟣 Randevu Alındı</option>
                      <option value="Tamamlandı">🟢 Tamamlandı</option>
                    </select>
                  </div>

                </div>

                {/* Card Main Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                  
                  {/* Left Column: Customer Profile */}
                  <div className="md:col-span-4 space-y-2 bg-[#FBF9F6] p-4 rounded-2xl border border-slate-200/80">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Başvuran Müşteri
                    </div>

                    <div className="flex items-center gap-2 font-bold text-sm text-[#1A2530]">
                      <User className="w-4 h-4 text-[#8C6D46]" />
                      <span>{sub.fullName}</span>
                    </div>

                    <div className="text-xs text-slate-600 flex items-center gap-2">
                      <PhoneCall className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`tel:${sub.phone}`} className="hover:text-emerald-700 font-medium underline">
                        {sub.phone}
                      </a>
                    </div>

                    {sub.email && sub.email !== 'Belirtilmedi' && (
                      <div className="text-xs text-slate-600 flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <a href={`mailto:${sub.email}`} className="hover:text-emerald-700 truncate">
                          {sub.email}
                        </a>
                      </div>
                    )}

                    {sub.preferredContact && (
                      <div className="text-[11px] text-slate-500 pt-1 flex items-start gap-1.5 border-t border-slate-200">
                        <Clock className="w-3.5 h-3.5 text-[#8C6D46] shrink-0 mt-0.5" />
                        <span><strong>İletişim Tercihi:</strong> {sub.preferredContact}</span>
                      </div>
                    )}
                  </div>

                  {/* Middle Column: Property Specs & Inquiry Details */}
                  <div className="md:col-span-5 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase bg-[#1A2530] text-amber-200">
                        {sub.inquiryType}
                      </span>
                      <span className="text-xs font-semibold text-slate-700">
                        {sub.propertyType}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Bölge / Konum</span>
                        <div className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#8C6D46]" />
                          <span>{sub.location}</span>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Fiyat / Bütçe</span>
                        <div className="font-bold text-[#8C6D46] mt-0.5">
                          {sub.estimatedPrice}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Oda Sayısı</span>
                        <div className="font-semibold text-slate-800 mt-0.5">
                          {sub.bedrooms}
                        </div>
                      </div>

                      <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 block font-medium">Alan</span>
                        <div className="font-semibold text-slate-800 mt-0.5">
                          {sub.area}
                        </div>
                      </div>
                    </div>

                    {/* Customer Notes */}
                    {sub.notes && (
                      <div className="bg-[#FAF8F5] p-3 rounded-xl border border-[#E8E2D9] text-xs text-slate-700">
                        <span className="font-bold text-[#1A2530] block text-[11px] mb-0.5">Müşteri Notu:</span>
                        <p className="italic leading-relaxed">"{sub.notes}"</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Quick Action Center */}
                  <div className="md:col-span-3 flex flex-col justify-between gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
                    
                    <div className="space-y-2">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Hızlı İletişim & Yanıt
                      </div>

                      {/* Direct WhatsApp button with prefilled personalized message */}
                      <a
                        href={getCustomerWhatsAppUrl(sub)}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>WhatsApp'tan Yaz</span>
                      </a>

                      {/* Direct Phone Call button */}
                      <a
                        href={`tel:${sub.phone}`}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-4 h-4 text-emerald-600" />
                        <span>Hemen Telefonla Ara</span>
                      </a>
                    </div>

                    {/* Delete action */}
                    <div className="pt-2 border-t border-slate-100 flex justify-end">
                      <button
                        onClick={() => deleteSubmission(sub.id)}
                        className="inline-flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Başvuruyu Sil</span>
                      </button>
                    </div>

                  </div>

                </div>

                {/* Internal Admin Note Section */}
                <div className="pt-3 border-t border-slate-100 text-xs">
                  {isEditingThisNote ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700">Danışman Özel Notu (Müşteri Görmez):</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2 py-1 text-slate-500 hover:bg-slate-100 rounded-lg cursor-pointer"
                          >
                            İptal
                          </button>
                          <button
                            onClick={() => handleSaveNotes(sub.id)}
                            className="px-3 py-1 bg-[#1A2530] text-white rounded-lg font-semibold hover:bg-[#8C6D46] cursor-pointer"
                          >
                            Kaydet
                          </button>
                        </div>
                      </div>
                      <textarea
                        rows={2}
                        value={notesBuffer}
                        onChange={(e) => setNotesBuffer(e.target.value)}
                        placeholder="Örn: Görüşüldü, perşembe günü saat 15:00'te Kemer Country villası gösterilecek..."
                        className="w-full p-2.5 rounded-xl border border-[#8C6D46] text-xs focus:outline-none"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-between bg-slate-50 px-3 py-2 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <FileText className="w-3.5 h-3.5 text-[#8C6D46]" />
                        <span className="text-slate-600">
                          <strong>Danışman Notu:</strong> {sub.adminNotes || 'Henüz görüşme notu eklenmedi.'}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setEditingNotesId(sub.id);
                          setNotesBuffer(sub.adminNotes || '');
                        }}
                        className="text-[#8C6D46] hover:text-[#1A2530] font-semibold underline cursor-pointer"
                      >
                        {sub.adminNotes ? 'Düzenle' : '+ Not Ekle'}
                      </button>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
