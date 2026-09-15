import React, { useState } from 'react';
import {
  Users,
  CheckCircle,
  Clock,
  PieChart,
  Search,
  ArrowUpRight,
  LogOut,
  MessageCircle,
  Building
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import LeadDrawer from './LeadDrawer';

export default function AdminDashboard({ leads, onUpdateStatus, onExitAdmin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);

  // Metrics calculation
  const totalLeads = leads.length;
  const reviewedLeads = leads.filter(l => l.status !== 'Yeni Talep').length;
  const pendingLeads = leads.filter(l => l.status === 'Yeni Talep').length;

  const standardCount = leads.filter(l => l.assignedPackage.includes('Standart')).length;
  const advancedCount = leads.filter(l => l.assignedPackage.includes('Üst')).length;
  const premiumCount = leads.filter(l => l.assignedPackage.includes('Premium')).length;

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.agencyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.assignedPackage.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' ? true : lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-obsidian text-architectural-white py-8 px-4 sm:px-8 md:px-12 z-20 relative">
      {/* Top Bar */}
      <header className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className="font-cinzel text-lg font-bold tracking-widest text-gold">
              MEDİART
            </span>
            <span className="text-white/20 text-sm">|</span>
            <span className="text-xs uppercase font-mono tracking-widest text-architectural-muted">
              YÖNETİM KONTROL MERKEZİ
            </span>
          </div>
          <p className="text-xs text-architectural-subtle font-light">
            Emlak ofislerinin editoryal analiz ve teklif akış takibi
          </p>
        </div>

        <button
          onClick={onExitAdmin}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold/40 text-xs uppercase tracking-widest font-medium text-architectural-muted hover:text-white transition-all cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Arayüze Dön</span>
        </button>
      </header>

      {/* Metrics Section */}
      <main className="max-w-7xl mx-auto py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {/* Card 1: Toplam Talep */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                Toplam Talep
              </span>
              <div className="w-8 h-8 rounded-xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                <Users className="w-4 h-4 text-gold" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-architectural-white font-medium">
              {totalLeads}
            </div>
            <div className="text-[11px] text-architectural-subtle mt-2">
              Sistem başlangıcından bu yana
            </div>
          </div>

          {/* Card 2: İncelenenler */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                İncelenenler
              </span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-architectural-white font-medium">
              {reviewedLeads}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-2">
              Aktif süreçte veya tamamlandı
            </div>
          </div>

          {/* Card 3: Bekleyen Teklifler */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                Bekleyen Teklifler
              </span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                <Clock className="w-4 h-4 text-amber-400" />
              </div>
            </div>
            <div className="font-serif text-3xl sm:text-4xl text-architectural-white font-medium">
              {pendingLeads}
            </div>
            <div className="text-[11px] text-amber-400/80 mt-2">
              Aksiyon bekleyen yeni talepler
            </div>
          </div>

          {/* Card 4: Dağılım Oranı */}
          <div className="p-6 rounded-3xl luxury-glass border border-white/10 relative overflow-hidden">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-luxury text-architectural-muted">
                Paket Dağılımı
              </span>
              <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center">
                <PieChart className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono font-medium">
              <div className="flex flex-col">
                <span className="text-gold-light font-bold">{premiumCount}</span>
                <span className="text-[10px] text-architectural-subtle">Premium</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex flex-col">
                <span className="text-blue-300 font-bold">{advancedCount}</span>
                <span className="text-[10px] text-architectural-subtle">Üst Düzey</span>
              </div>
              <span className="text-white/20">•</span>
              <div className="flex flex-col">
                <span className="text-emerald-300 font-bold">{standardCount}</span>
                <span className="text-[10px] text-architectural-subtle">Standart</span>
              </div>
            </div>
            <div className="text-[11px] text-architectural-subtle mt-2">
              Segment tercih dağılımı
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-architectural-subtle" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Ofis adı, telefon veya paket ara..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 focus:border-gold/50 text-xs text-architectural-white placeholder-architectural-subtle/50 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            <span className="text-[11px] uppercase tracking-widest text-architectural-muted mr-1 hidden sm:inline-block">
              Filtre:
            </span>
            {['ALL', 'Sisteme Kaydedildi', 'Yeni Talep', 'Görüşme Yapıldı', 'Tasarım Hazırlanıyor', 'Canlıya Alındı'].map((filter) => (
              <button
                key={filter}
                onClick={() => setStatusFilter(filter)}
                className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === filter
                    ? 'bg-gold text-obsidian font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                    : 'bg-white/[0.03] border border-white/5 text-architectural-muted hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {filter === 'ALL' ? 'Tümü' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Live Lead Table */}
        <div className="luxury-glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02] text-[10px] uppercase font-mono tracking-widest text-architectural-muted">
                  <th className="py-4 px-6">Tarih / Saat</th>
                  <th className="py-4 px-6">Emlak Ofisi</th>
                  <th className="py-4 px-6">Telefon (WhatsApp)</th>
                  <th className="py-4 px-6">Atanan Paket</th>
                  <th className="py-4 px-6">Durum</th>
                  <th className="py-4 px-6 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs">
                {filteredLeads.length > 0 ? (
                  filteredLeads.map((lead) => {
                    const rawPhone = lead.phone.replace(/[^0-9]/g, '');
                    return (
                      <tr
                        key={lead.id}
                        onClick={() => setSelectedLead(lead)}
                        className="hover:bg-white/[0.02] transition-colors cursor-pointer group"
                      >
                        <td className="py-4 px-6 font-mono text-architectural-subtle whitespace-nowrap">
                          {lead.timestamp}
                        </td>
                        <td className="py-4 px-6 font-medium text-architectural-white group-hover:text-gold-light transition-colors whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Building className="w-3.5 h-3.5 text-gold/70" />
                            <span>{lead.agencyName}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                          <a
                            href={`https://wa.me/${rawPhone}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-mono text-emerald-400 hover:text-emerald-300 hover:underline"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>{lead.phone}</span>
                          </a>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <span
                            className={`font-serif text-xs font-semibold ${
                              lead.assignedPackage.includes('Premium')
                                ? 'text-gold-light'
                                : lead.assignedPackage.includes('Üst')
                                ? 'text-blue-300'
                                : 'text-architectural-white'
                            }`}
                          >
                            {lead.assignedPackage}
                          </span>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                          <StatusBadge
                            status={lead.status}
                            onStatusChange={(newStatus) => onUpdateStatus(lead.id, newStatus)}
                          />
                        </td>
                        <td className="py-4 px-6 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-gold/20 text-architectural-muted hover:text-gold transition-colors inline-flex items-center gap-1 text-[11px] cursor-pointer"
                          >
                            <span>Detay</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-architectural-subtle">
                      Kriterlere uygun başvuru bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Slide-over Drawer for Lead Details */}
      {selectedLead && (
        <LeadDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={onUpdateStatus}
        />
      )}
    </div>
  );
}
