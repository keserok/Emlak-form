import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BackgroundFx from './components/BackgroundFx';
import ProgressBar from './components/ProgressBar';
import SplashScreen from './components/SplashScreen';
import LeadGate from './components/LeadGate';
import StepContainer from './components/StepContainer';
import ResultDossier from './components/ResultDossier';
import VaultUnlockFx from './components/VaultUnlockFx';
import AdminDashboard from './components/admin/AdminDashboard';
import AdvancedDemoSite from './components/demos/AdvancedDemoSite';
import SelinKaracaEmbed from './selin-site/SelinKaracaEmbed';
import { STEPS_DATA } from './data/stepsData';
import { calculatePackage } from './utils/algorithm';
import { getStoredLeads, saveLead, updateLeadStatus, updateLeadPackageAndStatus } from './utils/storage';

export default function App() {
  // Current view: 'splash' | 'gate' | 'step' | 'vault_unlock' | 'result' | 'admin' | 'selin_site'
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('site') === 'selin' || window.location.hash === '#selin') {
        return 'selin_site';
      }
    }
    return 'splash';
  });
  const [currentStepIndex, setCurrentStepIndex] = useState(1); // 1 to 7

  // Lead and Form State
  const [agencyName, setAgencyName] = useState('');
  const [phone, setPhone] = useState('');
  const [answers, setAnswers] = useState({});
  const [customSlogan, setCustomSlogan] = useState('');

  // Result Dossier State
  const [packageResult, setPackageResult] = useState(null);

  // Admin Leads State - lazy initialized from localStorage
  const [leads, setLeads] = useState(() => getStoredLeads());

  // Listen to hash changes (#selin or back)
  React.useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#selin') {
        setCurrentView('selin_site');
      } else if (!window.location.hash && currentView === 'selin_site') {
        setCurrentView('splash');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  // Update lead status in admin
  const handleUpdateStatus = (leadId, newStatus) => {
    const updated = updateLeadStatus(leadId, newStatus);
    setLeads(updated);
  };

  // Step 0: Splash -> Gate
  const handleStartExperience = () => {
    setCurrentView('gate');
  };

  // Step 0.5: Gate -> Step 1 (Normal lead)
  const handleGateProceed = ({ agencyName, phone }) => {
    setAgencyName(agencyName);
    setPhone(phone);
    setCurrentStepIndex(1);
    setCurrentView('step');
  };

  // Secret Admin Vault Trigger: 'media' + '0000'
  const handleSecretAdminTrigger = () => {
    setCurrentView('vault_unlock');
  };

  // Vault Unlock animation complete -> Open Admin Dashboard
  const handleVaultUnlockComplete = () => {
    // Refresh leads from storage
    const loaded = getStoredLeads();
    setLeads(loaded);
    setCurrentView('admin');
  };

  // Step Answer Selection
  const handleSelectAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [currentStepIndex]: value,
    }));
  };

  // Custom Slogan update for Step 2
  const handleUpdateCustomSlogan = (text) => {
    setCustomSlogan(text);
  };

  // Step Next button handler
  const handleNextStep = () => {
    if (currentStepIndex < 7) {
      setCurrentStepIndex((prev) => prev + 1);
    } else {
      // Step 7 complete -> Calculate Package & Result Dossier
      const result = calculatePackage(answers);
      setPackageResult(result);

      // Create new lead and save to storage
      const now = new Date();
      const timestamp = `${now.toISOString().slice(0, 10)} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newLead = {
        id: `lead_${Date.now()}`,
        timestamp,
        agencyName: agencyName || 'Belirtilmemiş',
        phone: phone || 'Belirtilmemiş',
        assignedPackage: result.packageName,
        packageTier: result.packageTier,
        deliveryDays: result.deliveryDays,
        status: 'Yeni Talep',
        customSlogan,
        answers,
        notes: `Analiz tamamlandı. Önerilen mimari paket: ${result.packageName}.`
      };

      const updatedList = saveLead(newLead);
      setLeads(updatedList);

      setCurrentView('result');
    }
  };

  // Step Back button handler
  const handlePrevStep = () => {
    if (currentStepIndex > 1) {
      setCurrentStepIndex((prev) => prev - 1);
    } else {
      setCurrentView('gate');
    }
  };

  // Restart Flow
  const handleRestart = () => {
    setAnswers({});
    setCustomSlogan('');
    setCurrentStepIndex(1);
    setPackageResult(null);
    setCurrentView('splash');
  };

  // Exit Admin
  const handleExitAdmin = () => {
    setCurrentView('splash');
  };

  // Check if current step can proceed (multi-select)
  const currentStepData = STEPS_DATA.find((s) => s.id === currentStepIndex);
  const selectedAnswer = answers[currentStepIndex] || [];
  const hasSelection = Array.isArray(selectedAnswer) ? selectedAnswer.length > 0 : !!selectedAnswer;
  const customSloganValid =
    !Array.isArray(selectedAnswer)
      ? selectedAnswer !== 'custom_slogan' || customSlogan.trim().length > 3
      : !selectedAnswer.includes('custom_slogan') || customSlogan.trim().length > 3;

  const canProceed = hasSelection && customSloganValid;

  // Render Selin Karaca VIP platform directly (full screen)
  if (currentView === 'selin_site') {
    return (
      <SelinKaracaEmbed
        onReturn={() => {
          window.location.hash = '';
          setCurrentView('splash');
          window.scrollTo({ top: 0, behavior: 'instant' });
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-obsidian text-architectural-white selection:bg-gold/30 selection:text-gold-light">
      {/* Dynamic Ambient Background & Cursor Spotlight */}
      <BackgroundFx />

      {/* Top Bar / Progress Navigation when in Step view */}
      {currentView === 'step' && (
        <ProgressBar
          currentStep={currentStepIndex}
          totalSteps={7}
          agencyName={agencyName}
        />
      )}

      {/* Main View Router */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentView === 'splash' && (
            <motion.div
              key="splash"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5 }}
            >
              <SplashScreen
                onStart={handleStartExperience}
                onOpenAdmin={() => setCurrentView('admin')}
                onOpenSelinSite={() => {
                  window.location.hash = 'selin';
                  setCurrentView('selin_site');
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
              />
            </motion.div>
          )}

          {currentView === 'gate' && (
            <motion.div
              key="gate"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5 }}
            >
              <LeadGate
                onProceed={handleGateProceed}
                onSecretAdminTrigger={handleSecretAdminTrigger}
              />
            </motion.div>
          )}

          {currentView === 'step' && currentStepData && (
            <motion.div
              key={`step-${currentStepIndex}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <StepContainer
                stepData={currentStepData}
                currentStepIndex={currentStepIndex}
                selectedAnswer={selectedAnswer}
                customSlogan={customSlogan}
                onSelectAnswer={handleSelectAnswer}
                onUpdateCustomSlogan={handleUpdateCustomSlogan}
                onNext={handleNextStep}
                onBack={handlePrevStep}
                canProceed={canProceed}
              />
            </motion.div>
          )}

          {currentView === 'vault_unlock' && (
            <motion.div
              key="vault_unlock"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <VaultUnlockFx onComplete={handleVaultUnlockComplete} />
            </motion.div>
          )}

          {currentView === 'result' && packageResult && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ResultDossier
                leadData={{ agencyName, phone, answers, customSlogan }}
                packageResult={packageResult}
                onRestart={handleRestart}
                onSaveToSystem={(pkg) => {
                  const currentList = getStoredLeads();
                  const targetLead = currentList[0];
                  if (targetLead) {
                    const updated = updateLeadPackageAndStatus(targetLead.id, pkg, 'Sisteme Kaydedildi');
                    setLeads(updated);
                  }
                }}
                onOpenAdmin={() => setCurrentView('admin')}
              />
            </motion.div>
          )}

          {currentView === 'admin' && (
            <motion.div
              key="admin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AdminDashboard
                leads={leads}
                onUpdateStatus={handleUpdateStatus}
                onExitAdmin={handleExitAdmin}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
