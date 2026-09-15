import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAgentProfile, initialListings, initialListingProcess, initialSubmissions } from '../data/initialData';
import confetti from 'canvas-confetti';

const AppStateContext = createContext();

const STORAGE_KEYS = {
  PROFILE: 'realestate_agent_profile_v1',
  LISTINGS: 'realestate_listings_v1',
  PROCESS: 'realestate_process_v1',
  SUBMISSIONS: 'realestate_submissions_v1'
};

export const AppStateProvider = ({ children }) => {
  // Mode switcher: 'showcase' (Canlı Vitrin) vs 'form' (Mülk & Talep Formu) vs 'admin' (Masaüstü Kontrol Paneli)
  const [viewMode, setViewMode] = useState('showcase');

  // Agent Profile State
  const [agentProfile, setAgentProfile] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return saved ? JSON.parse(saved) : initialAgentProfile;
  });

  // Listings State (Max 6 properties)
  const [listings, setListings] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LISTINGS);
    return saved ? JSON.parse(saved) : initialListings;
  });

  // Listing Process Steps State
  const [listingProcess, setListingProcess] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROCESS);
    return saved ? JSON.parse(saved) : initialListingProcess;
  });

  // Form Submissions State (Leads / Property Inquiries)
  const [formSubmissions, setFormSubmissions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUBMISSIONS);
    return saved ? JSON.parse(saved) : initialSubmissions;
  });

  // Selected Property Modal in Showcase
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Deploy / Syncing State
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Currency State: 'TRY' | 'USD' | 'EUR'
  const [currency, setCurrency] = useState('TRY');

  // Language State: 'TR' | 'EN' | 'RU'
  const [language, setLanguage] = useState('TR');

  // Off-Market Vault State
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(() => {
    return localStorage.getItem('selin_vault_unlocked') === 'true';
  });

  const unlockVault = (code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === 'VIP2026' || clean === 'GOKTURK' || clean === 'GOKTURK2026' || clean === 'SELINKARACA') {
      setIsVaultUnlocked(true);
      localStorage.setItem('selin_vault_unlocked', 'true');
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
      return { success: true };
    }
    return { success: false, message: 'Geçersiz VIP erişim kodu. Danışmandan talep ediniz.' };
  };

  const lockVault = () => {
    setIsVaultUnlocked(false);
    localStorage.removeItem('selin_vault_unlocked');
  };

  // Dynamic Price Formatter according to active currency
  const formatPrice = (priceRaw, fallbackText) => {
    if (!priceRaw || isNaN(Number(priceRaw))) return fallbackText || priceRaw;
    const num = Number(priceRaw);
    if (currency === 'USD') {
      const val = Math.round(num / 34.5);
      return `$${val.toLocaleString('en-US')}`;
    }
    if (currency === 'EUR') {
      const val = Math.round(num / 37.5);
      return `€${val.toLocaleString('de-DE')}`;
    }
    return `₺${num.toLocaleString('tr-TR')}`;
  };

  // Save to LocalStorage on update
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(agentProfile));
  }, [agentProfile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LISTINGS, JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROCESS, JSON.stringify(listingProcess));
  }, [listingProcess]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(formSubmissions));
  }, [formSubmissions]);

  // Update Profile Field
  const updateProfile = (field, value) => {
    setAgentProfile((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Update Stat Metric
  const updateStat = (index, field, value) => {
    setAgentProfile((prev) => {
      const newStats = [...prev.stats];
      newStats[index] = { ...newStats[index], [field]: value };
      return { ...prev, stats: newStats };
    });
  };

  // Update Single Listing
  const updateListing = (id, updatedFields) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
  };

  // Add New Listing (Limit 6)
  const addListing = (newListingData) => {
    if (listings.length >= 6) {
      alert('Vitrininizde en fazla 6 adet öne çıkan ilan bulundurabilirsiniz.');
      return false;
    }
    const newId = `prop-${Date.now()}`;
    const newListing = { id: newId, status: 'Aktif', ...newListingData };
    setListings((prev) => [newListing, ...prev]);
    return true;
  };

  // Delete Listing
  const deleteListing = (id) => {
    if (confirm('Bu ilanı vitrininizden kaldırmak istediğinize emin misiniz?')) {
      setListings((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Add New Form Submission (Customer Lead / Property Registration)
  const addSubmission = (subData) => {
    const now = new Date();
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const refCode = `SK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEntry = {
      id: `sub-${Date.now()}`,
      refCode,
      createdAt: now.toISOString(),
      formattedDate,
      status: 'Yeni',
      adminNotes: '',
      ...subData
    };

    setFormSubmissions((prev) => [newEntry, ...prev]);

    // Small celebratory confetti for form completion
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      console.log(e);
    }

    return newEntry;
  };

  // Update Submission Status (Yeni, Görüşüldü, Randevu Alındı, Tamamlandı)
  const updateSubmissionStatus = (id, newStatus) => {
    setFormSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Update Submission Admin Internal Notes
  const updateSubmissionNotes = (id, notes) => {
    setFormSubmissions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, adminNotes: notes } : item))
    );
  };

  // Delete Submission
  const deleteSubmission = (id) => {
    if (confirm('Bu başvuruyu sistemden silmek istediğinize emin misiniz?')) {
      setFormSubmissions((prev) => prev.filter((item) => item.id !== id));
    }
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    if (confirm('Tüm bilgileri fabrika ayarlarına sıfırlamak istediğinize emin misiniz?')) {
      setAgentProfile(initialAgentProfile);
      setListings(initialListings);
      setListingProcess(initialListingProcess);
      setFormSubmissions(initialSubmissions);
      localStorage.removeItem(STORAGE_KEYS.PROFILE);
      localStorage.removeItem(STORAGE_KEYS.LISTINGS);
      localStorage.removeItem(STORAGE_KEYS.PROCESS);
      localStorage.removeItem(STORAGE_KEYS.SUBMISSIONS);
    }
  };

  // Trigger Publish / Deploy simulation
  const triggerPublish = () => {
    setIsPublishing(true);
    setPublishSuccess(false);

    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.log(e);
      }

      setTimeout(() => {
        setPublishSuccess(false);
      }, 5000);
    }, 2000);
  };

  return (
    <AppStateContext.Provider
      value={{
        viewMode,
        setViewMode,
        agentProfile,
        updateProfile,
        updateStat,
        listings,
        updateListing,
        addListing,
        deleteListing,
        listingProcess,
        formSubmissions,
        addSubmission,
        updateSubmissionStatus,
        updateSubmissionNotes,
        deleteSubmission,
        selectedProperty,
        setSelectedProperty,
        resetToDefaults,
        isPublishing,
        publishSuccess,
        triggerPublish,
        currency,
        setCurrency,
        language,
        setLanguage,
        isVaultUnlocked,
        unlockVault,
        lockVault,
        formatPrice
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => useContext(AppStateContext);
