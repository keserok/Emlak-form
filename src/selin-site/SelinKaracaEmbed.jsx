import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AppStateProvider, useAppState } from './context/AppStateContext';
import TopBarSwitcher from './components/common/TopBarSwitcher';
import Navbar from './components/showcase/Navbar';
import HeroSection from './components/showcase/HeroSection';
import TrustStatsBar from './components/showcase/TrustStatsBar';
import AboutSection from './components/showcase/AboutSection';
import ListingProcess from './components/showcase/ListingProcess';
import FeaturedListings from './components/showcase/FeaturedListings';
import NeighborhoodGuide from './components/showcase/NeighborhoodGuide';
import PropertyModal from './components/showcase/PropertyModal';
import ContactSection from './components/showcase/ContactSection';
import Footer from './components/showcase/Footer';
import MobileQuickDock from './components/showcase/MobileQuickDock';
import AdminLayout from './components/admin/AdminLayout';
import PropertyInquiryForm from './components/form/PropertyInquiryForm';
import { ArrowLeft, Info } from 'lucide-react';
import { getTranslations } from './data/translations';

function MainContent({ onReturn }) {
  const { viewMode, language } = useAppState();
  const t = getTranslations(language);

  return (
    <div className="selin-site-root min-h-screen bg-[#FBFBFB] text-[#111827] font-sans antialiased selection:bg-[#8A735C]/20 selection:text-[#8A735C]">
      {/* Top Banner with Return to Form Action */}
      <div className="sticky top-0 z-50 bg-[#111827] text-white border-b border-white/10 px-4 py-2.5 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {onReturn && (
              <button
                type="button"
                onClick={onReturn}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white tracking-wide transition-all cursor-pointer border border-white/15 hover:scale-105 active:scale-95"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>{t.banner.returnToForm}</span>
              </button>
            )}
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.banner.liveDemo}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-amber-300/90 font-mono">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.banner.helperNotice}</span>
          </div>
        </div>
      </div>

      {/* Main View Router */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          {viewMode === 'showcase' ? (
            <main>
              <Navbar />
              <HeroSection />
              <TrustStatsBar />
              <FeaturedListings />
              <NeighborhoodGuide />
              <AboutSection />
              <ListingProcess />
              <ContactSection />
              <Footer />
              <PropertyModal />
              <MobileQuickDock />
            </main>
          ) : viewMode === 'form' ? (
            <main className="py-8">
              <PropertyInquiryForm isEmbedded={false} />
            </main>
          ) : (
            <main className="py-8">
              <AdminLayout />
            </main>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Selin Karaca Switcher Dock */}
      <TopBarSwitcher />
    </div>
  );
}

export default function SelinKaracaEmbed({ onReturn }) {
  return (
    <AppStateProvider>
      <MainContent onReturn={onReturn} />
    </AppStateProvider>
  );
}
