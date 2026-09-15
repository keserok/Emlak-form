/**
 * UI/UX Pro Max Multi-Language Dictionary (TR / EN / RU)
 * Professional, studio-grade translations for luxury real estate platform.
 */

export const TRANSLATIONS = {
  TR: {
    nav: {
      about: 'Hakkımda',
      process: 'Süreç',
      portfolio: 'Portföy',
      contact: 'İletişim',
      valuation: 'Mülkünü Değerle / Sat',
      inquiry: 'Talep Formu',
      regionGuide: 'Bölge Rehberi',
      callPrefix: 'Hemen Arayın',
      langHeading: 'DİL SEÇİMİ',
      currencyHeading: 'PARA BİRİMİ',
      open: 'Aç →',
      region: 'Göktürk'
    },
    hero: {
      region: 'Göktürk & Kemerburgaz Bölgesi',
      title: 'Lüks Konut & Arsa Uzmanı',
      headline: "Göktürk'te Evinizi Değerinde ve Stressiz Satın.",
      subheadline: "Soğuk ilan sitelerinin kalabalığında kaybolmayın. 12 yıllık bölge hakimiyeti, VIP alıcı ağı ve şeffaf danışmanlıkla yanınızdayız.",
      callBtn: (phone) => `Hemen Arayın (${phone})`,
      formBtn: 'Mülk Değerleme Formu'
    },
    dock: {
      specialist: 'Göktürk Uzmanı',
      call: 'Hemen Ara',
      portfolio: 'Portföyler'
    },
    banner: {
      returnToForm: '← Emlak Formuna Dön',
      liveDemo: 'Canlı Örnek: Selin Karaca (Premium Paket)',
      helperNotice: 'En alt ve en üst bar müşterilerinize görünmeyecektir'
    },
    switcher: {
      liveShowcase: 'Canlı Vitrin',
      propForm: 'Mülk & Talep Formu',
      adminPanel: 'Kontrol Paneli',
      resetDefaults: 'Varsayılanlara Sıfırla',
      published: 'Yayında',
      siteUpdated: 'Siteniz Canlıda Güncellendi!'
    },
    admin: {
      badge: 'Masaüstü Vitrin Kontrol Merkezi',
      welcome: 'Hoş Geldiniz',
      notice: 'Aylık sunucu ücreti ve karmaşık şifreler yok. Değişiklikleri yapın, "Web Sitemi Güncelle" butonuna basın.',
      previewLive: 'Canlı Sitede Önizle',
      publishChanges: 'Değişiklikleri Yayınla (Canlıya Al)',
      tabSubmissions: 'Gelen Talepler & Formlar',
      tabListings: 'Portföy Yönetimi',
      tabProfile: 'Danışman Profili'
    },
    stats: [
      { label: 'Portföy Hacmi', value: '₺1.8B+', subtext: 'Tamamlanan işlemler' },
      { label: 'Danışan Aile', value: '280+', subtext: 'Mutlu referanslar' },
      { label: 'Bölge Deneyimi', value: '12 Yıl', subtext: 'Göktürk & Kemerburgaz' },
      { label: 'Memnuniyet', value: '%99.4', subtext: 'Doğrulanmış müşteri oyu' }
    ],
    about: {
      badge: 'Hakkımda & Yaklaşımım',
      heading: 'Sade, Şeffaf ve Güven Odaklı Danışmanlık',
      description: 'Gayrimenkul satışı bir ilan listesinden ibaret değildir. Göktürk ve Kemerburgaz bölgesinde evinizi doğru alıcıyla buluşturan, sürecin her adımında yanınızda olan kişisel danışmanınızım.',
      pillars: [
        {
          title: 'Gerçek Emsal Değerleme',
          desc: 'Tahmini rakamlar değil, gerçekleşen tapu satış verileriyle doğru fiyatlama.'
        },
        {
          title: 'VIP Alıcı Ağı',
          desc: 'İlan sitelerine ek olarak doğrulanmış VIP alıcı ağına özel sunumlar.'
        },
        {
          title: 'Şeffaf İletişim',
          desc: 'Süreç boyunca düzenli raporlama ve tam hukuki güvence.'
        }
      ]
    },
    process: {
      badge: 'Süreç Yönetimi',
      title: '5 Adımda Satış Sürecimiz',
      stepPrefix: 'ADIM',
      steps: [
        {
          step: '01',
          title: 'Ön Görüşme',
          description: '15 dakikalık tanışma ile hedeflerinizi ve beklentilerinizi netleştiriyoruz.'
        },
        {
          step: '02',
          title: 'Değerleme',
          description: 'Bölge emsalleriyle evinizin gerçek pazar değerini saptıyoruz.'
        },
        {
          step: '03',
          title: 'VIP Lansman',
          description: 'Nitelikli alıcı ağımıza ve özel kanallarımıza sunum yapıyoruz.'
        },
        {
          step: '04',
          title: 'Gösterimler',
          description: 'Sadece bütçesi doğrulanmış alıcı adaylarını ağırlıyoruz.'
        },
        {
          step: '05',
          title: 'Kapanış',
          description: 'Teklifleri yönetip tapu sürecini güvenle tamamlıyoruz.'
        }
      ]
    },
    listings: {
      badge: 'Portföy Seçkileri',
      title: 'Öne Çıkan Gayrimenkuller',
      tabAll: 'Tümü',
      tabVilla: 'Müstakil Villa',
      tabPenthouse: 'Penthouse & Konak',
      tabVault: 'Gizli Kasa (Off-Market)',
      inspect: 'İncele',
      call: 'Hemen Ara',
      sold: 'SATILDI',
      saveToFavorites: 'Favorilere Ekle',
      saved: 'Kaydedildi',
      photoCount: (curr, total) => `${curr}/${total} Fotoğraf`,
      viewDetails: 'Detaylı İncele',
      vaultTitle: 'Selin Karaca Off-Market Portföy Kasası',
      vaultDesc: 'Göktürk ve Boğaz hattında gizlilik sözleşmesi (NDA) ile korunan seçkin malikane ve yalı koleksiyonu. Erişim yalnızca teyitli VIP alıcılara açıktır.',
      vaultPlaceholder: 'VIP Erişim Kodu (Örn: VIP2026)',
      vaultBtn: 'Kasayı Aç',
      vaultWhatsapp: 'VIP Erişim Kodu Talep Edin (WhatsApp) →',
      vaultUnlockedBanner: 'VIP KASA AÇIK: Göktürk & Boğaz hattı gizli malikaneleri listeleniyor',
      vaultRelock: 'Kasayı Yeniden Kilitle',
      vaultInvalid: 'Geçersiz VIP erişim kodu. Danışmandan talep ediniz.',
      ndaProtocol: 'ÖZEL GİZLİLİK PROTOKOLÜ (NDA)',
      vaultWaMsg: 'Merhaba Selin Hanım, sitenizdeki Off-Market / Gizli Portföy Kasası için VIP erişim kodu talep ediyorum.',
      vaultTestCode: 'Hızlı İnceleme Test Kodu: VIP2026'
    },
    modal: {
      marketPrice: 'Pazar Fiyatı',
      bedrooms: 'Oda Sayısı',
      bathrooms: 'Banyo',
      area: 'Alan',
      overview: 'Mülk Özeti',
      features: 'Donanımlar',
      specsTitle: 'Mimari & Yapısal Detaylar',
      specCeiling: 'Tavan Yüksekliği',
      specHeating: 'Isıtma Sistemi',
      specParking: 'Özel Otopark',
      specOrientation: 'Cephe & Manzara',
      specYear: 'Yapım Yılı',
      specDues: 'Tahmini Aidat',
      photoGallery: 'Fotoğraf Galerisi',
      callAction: 'Telefonla Bilgi Al',
      dossierAction: 'Yatırımcı Dosyası İste',
      close: 'Kapat',
      waMessage: (title) => `Merhaba Selin Hanım, "${title}" mülkünüz hakkında detaylı bilgi ve yatırımcı dosyasını almak istiyorum.`
    },
    neighborhood: {
      badge: 'Bölge & Yaşam Rehberi',
      title: 'Göktürk & Kemerburgaz’da Yaşam Ayrıcalığı',
      subtitle: 'Sadece bir mülk değil; doğa, prestijli sosyal kulüpler, seçkin okullar ve havalimanına kesintisiz erişimle tanımlanan benzersiz bir yaşam tarzı.',
      pillars: [
        {
          id: 'kemer',
          tag: 'SPOR & SOSYAL KULÜP',
          title: 'Kemer Country Club & Golf',
          subtitle: 'Binicilik, 18 Delikli Golf & Tenis',
          desc: 'Türkiye’nin en seçkin sosyal kulüplerinden birine yalnızca birkaç dakika mesafede, golf sahaları ve atlı spor kulübüyle zenginleşen bir çevre.'
        },
        {
          id: 'forest',
          tag: 'DOĞA & HİJYEN',
          title: 'Belgrad Ormanı Eteklerinde',
          subtitle: 'Doğal Oksijen & Yürüyüş Parkurları',
          desc: 'Şehrin stresinden ve gürültüsünden izole, asırlık orman dokusunun hemen kıyısında koruma altındaki yeşil hat ile huzurlu yaşam.'
        },
        {
          id: 'airport',
          tag: 'ULAŞIM & LOJİSTİK',
          title: 'İstanbul Havalimanı 15 Dk',
          subtitle: 'Küresel Ulaşılabilirlik & VIP Konfor',
          desc: 'Sık seyahat eden iş insanları ve uluslararası aileler için trafiksiz, konforlu ve doğrudan otoban bağlantısı ayrıcalığı.'
        },
        {
          id: 'education',
          tag: 'AKADEMİK GELECEK',
          title: 'Seçkin Eğitim Kurumları',
          subtitle: 'Hisar Okulları & Kolejler Hattı',
          desc: 'Çocuklarınız için Türkiye’nin en yüksek akademik standartlarına sahip okullarına yürüme ve servis kolaylığı sağlayan aile odaklı lokasyon.'
        }
      ]
    },
    contact: {
      badge: 'Doğrudan İletişim',
      title: "Göktürk'teki Gayrimenkulünüz İçin Görüşelim",
      description: 'Evinizi değerinde satmak, kiraya vermek veya yeni bir portföy incelemek için doğrudan arayabilir ya da online form ile talebinizi iletebilirsiniz.',
      callBtn: (phone) => `Selin Hanım'ı Arayın: ${phone}`,
      formBtn: 'Mülk Değerleme & Talep Formu'
    },
    form: {
      title: 'Göktürk & Kemerburgaz Mülk Değerleme ve Talep',
      subtitle: 'Mülkünüzü değerinde satmak, kiraya vermek veya aradığınız özel gayrimenkulü bildirmek için formu doldurun. Talebiniz doğrultusunda sizinle en kısa sürede iletişime geçilecektir.',
      returnShowcase: 'Vitrine Geri Dön',
      step1: '1. İşlem Türünüzü Seçin',
      inquiryTypes: [
        { id: 'satilik', title: 'Mülkümü Satmak İstiyorum', desc: 'Bölge emsalleriyle gerçek piyasa değerlemesi & VIP alıcı ağı' },
        { id: 'kiralik', title: 'Kiraya Vermek İstiyorum', desc: 'Doğrulanmış kurumsal ve seçkin kiracı portföyü' },
        { id: 'arama', title: 'Gayrimenkul / Portföy Arıyorum', desc: 'İlan sitelerinde olmayan gizli ve özel portföy seçkileri' }
      ],
      step2: '2. Gayrimenkul Detayları',
      labelPropType: 'Mülk Tipi',
      propTypes: ['Müstakil Villa', 'Bahçe Dubleksi', 'Çatı Penthouse', 'Rezidans Daire', 'Müstakil Konak', 'Ticari / Ofis', 'Arsa'],
      labelLocation: 'Bölge / Konum',
      locations: ['Göktürk Merkez', 'Kemer Country', 'Kemerburgaz', 'Zekeriyaköy', 'Kuruçeşme / Sahil Hattı', 'Diğer Bölge'],
      labelPrice: 'Tahmini Bütçe / Fiyat',
      pricePlaceholder: 'Örn: 35.000.000 ₺',
      labelBedrooms: 'Oda Sayısı',
      labelArea: 'Net / Brüt Alan (m²)',
      areaPlaceholder: 'Örn: 280',
      step3: '3. İletişim Bilgileriniz',
      labelFullName: 'Adınız Soyadınız *',
      fullNamePlaceholder: 'Örn: Ahmet Yılmaz',
      labelPhone: 'Cep Telefonu Numaranız *',
      phonePlaceholder: '0532 123 45 67',
      labelEmail: 'E-Posta Adresiniz (İsteğe Bağlı)',
      emailPlaceholder: 'ornek@alanadi.com',
      labelContactPref: 'Tercih Ettiğiniz İletişim Şekli',
      contactPrefs: ['Telefon (Her saat uygun)', 'WhatsApp ile mesaj', 'Yalnızca mesai saatlerinde'],
      step4: '4. Mülk Açıklaması veya Özel İstekleriniz',
      notesPlaceholder: 'Örn: Evimiz havuzlu sitede ara kat, güney cephe. 1 ay içerisinde değerinde satış hedefliyoruz...',
      privacyTitle: 'Gizlilik Güvencesi: ',
      privacyDesc: 'Bilgileriniz 3. şahıslarla veya reklam platformlarıyla asla paylaşılmaz. Tamamen gizli ve güvenli tutulur.',
      submitChoiceTitle: 'Başvurunuzu nasıl iletmek istersiniz?',
      btnSaveSystem: 'Sisteme Kaydet ve Dönüş Bekle',
      btnSubmitting: 'Sisteme Kaydediliyor...',
      btnWhatsApp: "WhatsApp'tan Gönder",
      badgeSecure: 'Güvenli & Doğrudan İletim',
      badgeResponseTime: 'Maksimum 2 Saat İçinde Dönüş',
      errName: 'Lütfen adınızı ve soyadınızı belirtin.',
      errPhone: 'Lütfen geçerli bir cep telefonu numarası girin.',
      successModal: {
        badgeReceived: 'Başvuru Kaydı Alındı',
        title: 'Talebiniz Başarıyla Kaydedildi!',
        descSystem: "Bilgileriniz Selin Karaca'nın danışmanlık merkezine aktarıldı. Belirttiğiniz iletişim saatinde tarafınıza dönüş sağlanacaktır.",
        descWa: 'Talebiniz kaydedildi ve WhatsApp üzerinden Selin Hanım’a yönlendirildi.',
        refCodeLabel: 'Takip Referans Kodu',
        applicant: 'Başvuran',
        action: 'İşlem',
        propLoc: 'Mülk / Konum',
        btnVitrin: 'Vitrine Dön',
        btnAdmin: 'Admin Panelinde Gör'
      }
    },
    footer: {
      rights: 'Tüm hakları saklıdır. Lüks Gayrimenkul Danışmanlığı.'
    }
  },

  EN: {
    nav: {
      about: 'About',
      process: '5-Step Process',
      portfolio: 'Portfolio',
      contact: 'Contact',
      valuation: 'Valuation & Sell',
      inquiry: 'Inquiry Form',
      regionGuide: 'Area Guide',
      callPrefix: 'Call Direct',
      langHeading: 'LANGUAGE SELECTION',
      currencyHeading: 'CURRENCY',
      open: 'Open →',
      region: 'Göktürk'
    },
    hero: {
      region: 'Göktürk & Kemerburgaz Region',
      title: 'Luxury Residential & Land Specialist',
      headline: "Sell Your Home in Göktürk at Real Value Without Stress.",
      subheadline: "Don't get lost in crowded listing portals. We guide you with 12 years of district mastery, high-net-worth buyers network, and transparent advisory.",
      callBtn: (phone) => `Call Direct (${phone})`,
      formBtn: 'Property Valuation Form'
    },
    dock: {
      specialist: 'Göktürk Specialist',
      call: 'Call Direct',
      portfolio: 'Portfolios'
    },
    banner: {
      returnToForm: '← Back to Real Estate Form',
      liveDemo: 'Live Demo: Selin Karaca (Premium Package)',
      helperNotice: 'Top and bottom bars will not be visible to your clients'
    },
    switcher: {
      liveShowcase: 'Live Showcase',
      propForm: 'Property & Inquiry Form',
      adminPanel: 'Admin Dashboard',
      resetDefaults: 'Reset to Defaults',
      published: 'Live',
      siteUpdated: 'Your Site is Live & Updated!'
    },
    admin: {
      badge: 'Showcase Control Center',
      welcome: 'Welcome',
      notice: 'No monthly server fees or complex passwords. Make your updates and click "Publish Changes".',
      previewLive: 'Preview Live Site',
      publishChanges: 'Publish Changes (Go Live)',
      tabSubmissions: 'Inquiries & Leads',
      tabListings: 'Portfolio Management',
      tabProfile: 'Advisor Profile'
    },
    stats: [
      { label: 'Portfolio Volume', value: '$52M+', subtext: 'Completed transactions' },
      { label: 'Client Families', value: '280+', subtext: 'Satisfied references' },
      { label: 'District Experience', value: '12 Years', subtext: 'Göktürk & Kemerburgaz' },
      { label: 'Satisfaction Rate', value: '99.4%', subtext: 'Verified client score' }
    ],
    about: {
      badge: 'About Me & My Approach',
      heading: 'Discreet, Transparent & Trust-Driven Advisory',
      description: 'Real estate advisory is far more than an online listing. In Göktürk and Kemerburgaz, I serve as your dedicated representative, connecting your home with vetted high-net-worth buyers at every step.',
      pillars: [
        {
          title: 'Accurate Market Valuation',
          desc: 'Grounded in verified official title deed records, never speculation or inflated estimates.'
        },
        {
          title: 'VIP Buyers Network',
          desc: 'Private direct presentations to verified affluent investors beyond crowded public portals.'
        },
        {
          title: 'Transparent Communication',
          desc: 'Continuous structured reporting and meticulous legal safeguarding throughout the journey.'
        }
      ]
    },
    process: {
      badge: 'Process Management',
      title: 'Our 5-Step Strategic Sales Methodology',
      stepPrefix: 'STEP',
      steps: [
        {
          step: '01',
          title: 'Initial Consultation',
          description: 'A 15-minute briefing to clarify your goals, timeline, and exact expectations.'
        },
        {
          step: '02',
          title: 'Valuation & Strategy',
          description: 'Establishing your property’s true market value using verified district comparables.'
        },
        {
          step: '03',
          title: 'VIP Private Launch',
          description: 'Exclusive presentations to our vetted investor network and off-market private channels.'
        },
        {
          step: '04',
          title: 'Private Viewings',
          description: 'We host strictly pre-screened prospective buyers with verified financial capacity.'
        },
        {
          step: '05',
          title: 'Closing & Transfer',
          description: 'Navigating negotiations and completing the title deed transfer with complete security.'
        }
      ]
    },
    listings: {
      badge: 'Curated Portfolio',
      title: 'Featured Luxury Properties',
      tabAll: 'All',
      tabVilla: 'Private Villa',
      tabPenthouse: 'Penthouse & Mansion',
      tabVault: 'Private Vault (Off-Market)',
      inspect: 'Inspect',
      call: 'Call Direct',
      sold: 'SOLD',
      saveToFavorites: 'Save to Favorites',
      saved: 'Saved',
      photoCount: (curr, total) => `${curr}/${total} Photos`,
      viewDetails: 'View Details',
      vaultTitle: 'Selin Karaca Off-Market Portfolio Vault',
      vaultDesc: 'A discreet selection of prestigious estates and waterfront mansions protected by non-disclosure agreements (NDA). Access is strictly reserved for verified VIP clients.',
      vaultPlaceholder: 'VIP Access Code (e.g. VIP2026)',
      vaultBtn: 'Unlock Vault',
      vaultWhatsapp: 'Request VIP Access Code via WhatsApp →',
      vaultUnlockedBanner: 'VIP VAULT UNLOCKED: Presenting off-market estates in Göktürk & Bosphorus',
      vaultRelock: 'Lock Vault Again',
      vaultInvalid: 'Invalid VIP access code. Please request credentials from the advisor.',
      ndaProtocol: 'CONFIDENTIALITY PROTOCOL (NDA)',
      vaultWaMsg: 'Hello Ms. Selin Karaca, I would like to request the VIP access code for your Off-Market Portfolio Vault.',
      vaultTestCode: 'Quick Review Code: VIP2026'
    },
    modal: {
      marketPrice: 'Market Price',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      overview: 'Property Overview',
      features: 'Amenities & Highlights',
      specsTitle: 'Architectural & Building Specs',
      specCeiling: 'Ceiling Height',
      specHeating: 'Heating System',
      specParking: 'Private Parking',
      specOrientation: 'Orientation & View',
      specYear: 'Year Built',
      specDues: 'Estimated Dues',
      photoGallery: 'Photo Gallery',
      callAction: 'Call for Inquiries',
      dossierAction: 'Request Investor Dossier',
      close: 'Close',
      waMessage: (title) => `Hello Ms. Selin Karaca, I would like to receive detailed information and the investor dossier for "${title}".`
    },
    neighborhood: {
      badge: 'Area & Lifestyle Guide',
      title: 'Living Excellence in Göktürk & Kemerburgaz',
      subtitle: 'More than a residence: a bespoke lifestyle defined by lush nature, prestigious country clubs, premier schools, and seamless airport connectivity.',
      pillars: [
        {
          id: 'kemer',
          tag: 'SPORTS & PRIVATE CLUB',
          title: 'Kemer Country Club & Golf',
          subtitle: 'Equestrian Center, 18-Hole Golf & Tennis',
          desc: 'Minutes away from Turkey’s premier country club estate, featuring championship golf grounds, riding arenas, and an elite social atmosphere.'
        },
        {
          id: 'forest',
          tag: 'NATURE & SERENITY',
          title: 'Edge of Belgrad Forest',
          subtitle: 'Pure Oxygen & Scenic Trailheads',
          desc: 'A tranquil sanctuary protected from urban congestion, sheltered alongside centuries-old protected oak canopies and walking routes.'
        },
        {
          id: 'airport',
          tag: 'TRANSIT & CONNECTIVITY',
          title: '15 Mins to Istanbul Airport',
          subtitle: 'Global Gateway & Executive Transit',
          desc: 'Effortless non-stop freeway access for frequent flyers, diplomats, and international executives needing immediate international flights.'
        },
        {
          id: 'education',
          tag: 'ACADEMIC EXCELLENCE',
          title: 'Premier International Academies',
          subtitle: 'Hisar School & Academic Corridor',
          desc: 'Direct proximity to Turkey’s most renowned bilingual academies and private schools, offering world-class curricula at your doorstep.'
        }
      ]
    },
    contact: {
      badge: 'Direct Advisory Contact',
      title: "Let's Discuss Your Real Estate in Göktürk",
      description: 'Whether looking to sell at real value, lease to executive tenants, or explore discreet portfolios, connect directly or submit an online request.',
      callBtn: (phone) => `Call Selin Karaca: ${phone}`,
      formBtn: 'Property Valuation & Inquiry Form'
    },
    form: {
      title: 'Göktürk & Kemerburgaz Property Valuation & Inquiry',
      subtitle: 'Complete the form to sell, rent, or submit your bespoke property search criteria. Our advisory office will contact you promptly.',
      returnShowcase: 'Back to Showcase',
      step1: '1. Select Transaction Type',
      inquiryTypes: [
        { id: 'satilik', title: 'I Want to Sell My Property', desc: 'Accurate market valuation & exclusive VIP buyers network' },
        { id: 'kiralik', title: 'I Want to Rent Out', desc: 'Corporate and pre-vetted executive tenant portfolio' },
        { id: 'arama', title: 'Looking for Property / Portfolio', desc: 'Private and off-market selections not listed on public portals' }
      ],
      step2: '2. Property Specifications',
      labelPropType: 'Property Type',
      propTypes: ['Private Villa', 'Garden Duplex', 'Roof Penthouse', 'Residence Apartment', 'Private Mansion', 'Commercial / Office', 'Land Plot'],
      labelLocation: 'Region / Location',
      locations: ['Central Göktürk', 'Kemer Country', 'Kemerburgaz', 'Zekeriyaköy', 'Kuruçeşme / Bosphorus Line', 'Other District'],
      labelPrice: 'Estimated Budget / Price',
      pricePlaceholder: 'e.g. $1,200,000 or ₺40,000,000',
      labelBedrooms: 'Bedrooms',
      labelArea: 'Net / Gross Area (sqm)',
      areaPlaceholder: 'e.g. 280',
      step3: '3. Contact Details',
      labelFullName: 'Full Name *',
      fullNamePlaceholder: 'e.g. John Smith',
      labelPhone: 'Mobile Phone Number *',
      phonePlaceholder: '+90 532 123 45 67',
      labelEmail: 'Email Address (Optional)',
      emailPlaceholder: 'name@example.com',
      labelContactPref: 'Preferred Contact Method',
      contactPrefs: ['Phone (Any time)', 'WhatsApp message', 'Business hours only'],
      step4: '4. Property Description or Special Requests',
      notesPlaceholder: 'e.g., Duplex in a gated compound with pool, south facing. Looking to sell within 30 days...',
      privacyTitle: 'Privacy Guarantee: ',
      privacyDesc: 'Your details remain strictly confidential and will never be shared with 3rd parties or advertising platforms.',
      submitChoiceTitle: 'How would you like to submit your request?',
      btnSaveSystem: 'Save to System & Request Callback',
      btnSubmitting: 'Saving to System...',
      btnWhatsApp: 'Send via WhatsApp',
      badgeSecure: 'Secure & Direct Transmission',
      badgeResponseTime: 'Response within 2 Hours',
      errName: 'Please provide your full name.',
      errPhone: 'Please enter a valid mobile phone number.',
      successModal: {
        badgeReceived: 'Submission Received',
        title: 'Your Request is Successfully Recorded!',
        descSystem: "Your details have been transmitted to Selin Karaca's advisory office. You will receive a response at your preferred contact time.",
        descWa: 'Your submission has been registered and forwarded to Ms. Karaca via WhatsApp.',
        refCodeLabel: 'Tracking Reference Code',
        applicant: 'Applicant',
        action: 'Action',
        propLoc: 'Property / Location',
        btnVitrin: 'Back to Showcase',
        btnAdmin: 'View in Admin Panel'
      }
    },
    footer: {
      rights: 'All rights reserved. Luxury Real Estate Advisory.'
    }
  },

  RU: {
    nav: {
      about: 'Обо мне',
      process: 'Процесс',
      portfolio: 'Портфолио',
      contact: 'Контакты',
      valuation: 'Оценка / Продажа',
      inquiry: 'Форма запроса',
      regionGuide: 'Гид по району',
      callPrefix: 'Позвонить',
      langHeading: 'ВЫБОР ЯЗЫКА',
      currencyHeading: 'ВАЛЮТА',
      open: 'Открыть →',
      region: 'Гёктюрк'
    },
    hero: {
      region: 'Район Гёктюрк и Кемербургаз',
      title: 'Эксперт по элитной недвижимости и участкам',
      headline: "Продайте ваш дом в Гёктюрке по реальной стоимости без стресса.",
      subheadline: "Не теряйтесь среди обычных порталов. Мы рядом с вами: 12 лет опыта в районе, закрытая база VIP-покупателей и абсолютная прозрачность.",
      callBtn: (phone) => `Позвонить (${phone})`,
      formBtn: 'Форма оценки недвижимости'
    },
    dock: {
      specialist: 'Эксперт по Гёктюрку',
      call: 'Позвонить',
      portfolio: 'Портфолио'
    },
    banner: {
      returnToForm: '← Вернуться к форме',
      liveDemo: 'Живой пример: Selin Karaca (Премиум)',
      helperNotice: 'Верхняя и нижняя панели не будут видны вашим клиентам'
    },
    switcher: {
      liveShowcase: 'Витрина',
      propForm: 'Форма оценки',
      adminPanel: 'Панель управления',
      resetDefaults: 'Сбросить настройки',
      published: 'Опубликовано',
      siteUpdated: 'Ваш сайт обновлен онлайн!'
    },
    admin: {
      badge: 'Центр управления витриной',
      welcome: 'Добро пожаловать',
      notice: 'Без абонентской платы и сложных паролей. Внесите изменения и нажмите "Опубликовать".',
      previewLive: 'Предпросмотр на сайте',
      publishChanges: 'Опубликовать изменения (В эфир)',
      tabSubmissions: 'Заявки и запросы',
      tabListings: 'Управление объектами',
      tabProfile: 'Профиль консультанта'
    },
    stats: [
      { label: 'Объем портфолио', value: '$52M+', subtext: 'Завершенные сделки' },
      { label: 'Клиентские семьи', value: '280+', subtext: 'Довольные клиенты' },
      { label: 'Опыт в районе', value: '12 Лет', subtext: 'Гёктюрк и Кемербургаз' },
      { label: 'Уровень доверия', value: '99.4%', subtext: 'Подтвержденные отзывы' }
    ],
    about: {
      badge: 'Обо мне и моем подходе',
      heading: 'Сдержанное, прозрачное и доверительное консультирование',
      description: 'Продажа элитной недвижимости — это не просто объявление на сайте. В Гёктюрке и Кемербургазе я являюсь вашим персональным советником, соединяя ваш дом с надежными покупателями на каждом этапе.',
      pillars: [
        {
          title: 'Реальная рыночная оценка',
          desc: 'Точное ценообразование на основе официальных данных кадастрового реестра, а не догадок.'
        },
        {
          title: 'Закрытая сеть VIP-покупателей',
          desc: 'Индивидуальные показы проверенным статусным покупателям помимо открытых порталов.'
        },
        {
          title: 'Прозрачная коммуникация',
          desc: 'Регулярная отчетность и всесторонняя юридическая защита на протяжении всей сделки.'
        }
      ]
    },
    process: {
      badge: 'Управление процессом',
      title: 'Наш процесс продажи в 5 шагов',
      stepPrefix: 'ШАГ',
      steps: [
        {
          step: '01',
          title: 'Первичная встреча',
          description: '15-минутная консультация для определения ваших целей, сроков и ожиданий.'
        },
        {
          step: '02',
          title: 'Оценка и стратегия',
          description: 'Определение объективной рыночной стоимости на основе региональных аналогов.'
        },
        {
          step: '03',
          title: 'VIP-презентация',
          description: 'Закрытая презентация для нашей базы инвесторов и через приватные каналы.'
        },
        {
          step: '04',
          title: 'Индивидуальные показы',
          description: 'Принимаем только верифицированных кандидатов с подтвержденным бюджетом.'
        },
        {
          step: '05',
          title: 'Сделка и оформление',
          description: 'Управление предложениями и надежное оформление перехода прав в кадастре.'
        }
      ]
    },
    listings: {
      badge: 'Коллекция объектов',
      title: 'Престижная недвижимость',
      tabAll: 'Все',
      tabVilla: 'Виллы',
      tabPenthouse: 'Пентхаусы и особняки',
      tabVault: 'Закрытая база (Off-Market)',
      inspect: 'Подробнее',
      call: 'Позвонить',
      sold: 'ПРОДАНО',
      saveToFavorites: 'В избранное',
      saved: 'Сохранено',
      photoCount: (curr, total) => `${curr}/${total} Фото`,
      viewDetails: 'Подробнее',
      vaultTitle: 'Закрытая база Selin Karaca Off-Market',
      vaultDesc: 'Коллекция элитных особняков и исторических ялы в Гёктюрке и на Босфоре под защитой соглашения о неразглашении (NDA). Доступ только для верифицированных VIP-покупателей.',
      vaultPlaceholder: 'VIP-код доступа (напр. VIP2026)',
      vaultBtn: 'Открыть базу',
      vaultWhatsapp: 'Запросить VIP-код в WhatsApp →',
      vaultUnlockedBanner: 'БАЗА ОТКРЫТА: Эксклюзивные особняки в Гёктюрке и на Босфоре',
      vaultRelock: 'Снова заблокировать',
      vaultInvalid: 'Неверный VIP-код. Запросите у консультанта.',
      ndaProtocol: 'ПРОТОКОЛ КОНФИДЕНЦИАЛЬНОСТИ (NDA)',
      vaultWaMsg: 'Здравствуйте, госпожа Селин Караджа! Я хотел(а) бы запросить VIP-код доступа к вашей закрытой базе Off-Market.',
      vaultTestCode: 'Тестовый код: VIP2026'
    },
    modal: {
      marketPrice: 'Рыночная цена',
      bedrooms: 'Комнаты',
      bathrooms: 'Ванные',
      area: 'Площадь',
      overview: 'Описание объекта',
      features: 'Особенности и удобства',
      specsTitle: 'Архитектурные характеристики',
      specCeiling: 'Высота потолков',
      specHeating: 'Система отопления',
      specParking: 'Паркинг',
      specOrientation: 'Ориентация / Вид',
      specYear: 'Год постройки',
      specDues: 'Коммунальные платежи',
      photoGallery: 'Фотогалерея',
      callAction: 'Позвонить для консультации',
      dossierAction: 'Запросить досье инвестора',
      close: 'Закрыть',
      waMessage: (title) => `Здравствуйте, госпожа Селин Караджа! Я хотел(а) бы получить подробную информацию и инвестиционное досье по объекту "${title}".`
    },
    neighborhood: {
      badge: 'Гид по району и стилю жизни',
      title: 'Привилегия жизни в Гёктюрке и Кемербургазе',
      subtitle: 'Не просто элитная недвижимость, а уникальный образ жизни: реликтовая природа, закрытые гольф-клубы, ведущие международные школы и быстрый доступ к аэропорту.',
      pillars: [
        {
          id: 'kemer',
          tag: 'СПОРТ И ЗАКРЫТЫЙ КЛУБ',
          title: 'Kemer Country Club & Golf',
          subtitle: 'Конный спорт, 18-луночный гольф и теннис',
          desc: 'Всего в нескольких минутах от главного загородного клуба Турции с профессиональными полями для гольфа, манежами и закрытым светским кругом.'
        },
        {
          id: 'forest',
          tag: 'ПРИРОДА И ЭКОЛОГИЯ',
          title: 'У подножия Белградского леса',
          subtitle: 'Чистейший воздух и прогулочные маршруты',
          desc: 'Уединенное и безопасное окружение вдали от шума мегаполиса, прямо на границе охраняемой многовековой лесной зоны.'
        },
        {
          id: 'airport',
          tag: 'ТРАНСПОРТ И ЛОГИСТИКА',
          title: '15 минут до аэропорта Стамбула',
          subtitle: 'Глобальная мобильность и VIP-комфорт',
          desc: 'Прямой скоростной выезд без пробок — идеальное решение для часто путешествующих бизнесменов, экспатов и международных семей.'
        },
        {
          id: 'education',
          tag: 'АКАДЕМИЧЕСКОЕ БУДУЩЕЕ',
          title: 'Престижные частные школы',
          subtitle: 'Школа Hisar и международные колледжи',
          desc: 'Быстрый доступ к лучшим двуязычным образовательным кампусам и международным колледжам Турции с мировыми стандартами обучения.'
        }
      ]
    },
    contact: {
      badge: 'Прямой контакт',
      title: 'Обсудим вашу недвижимость в Гёктюрке',
      description: 'Хотите выгодно продать, сдать в аренду или ознакомиться с эксклюзивным портфолио? Свяжитесь напрямую или отправьте онлайн-запрос.',
      callBtn: (phone) => `Позвонить Селин Караджа: ${phone}`,
      formBtn: 'Форма оценки и подбора объекта'
    },
    form: {
      title: 'Гёктюрк и Кемербургаз: Оценка и Запрос Недвижимости',
      subtitle: 'Заполните форму для оценки, продажи, аренды или индивидуального подбора объекта. Наш офис свяжется с вами в кратчайшие сроки.',
      returnShowcase: 'Вернуться на витрину',
      step1: '1. Выберите тип операции',
      inquiryTypes: [
        { id: 'satilik', title: 'Хочу продать недвижимость', desc: 'Точная региональная оценка и доступ к закрытой сети VIP-покупателей' },
        { id: 'kiralik', title: 'Хочу сдать в аренду', desc: 'Подбор проверенных корпоративных и статусных арендаторов' },
        { id: 'arama', title: 'Ищу недвижимость / портфолио', desc: 'Закрытые и приватные объекты, отсутствующие на обычных сайтах' }
      ],
      step2: '2. Параметры объекта',
      labelPropType: 'Тип объекта',
      propTypes: ['Вилла', 'Садовый дуплекс', 'Пентхаус', 'Резиденция', 'Особняк', 'Коммерческая / Офис', 'Земельный участок'],
      labelLocation: 'Район / Локация',
      locations: ['Центр Гёктюрка', 'Kemer Country', 'Кемербургаз', 'Зекериякёй', 'Куручешме / Босфор', 'Другой район'],
      labelPrice: 'Ожидаемый бюджет / цена',
      pricePlaceholder: 'напр. $1,500,000 или ₺50,000,000',
      labelBedrooms: 'Комнаты',
      labelArea: 'Площадь (м²)',
      areaPlaceholder: 'напр. 350',
      step3: '3. Контактные данные',
      labelFullName: 'Ваше имя и фамилия *',
      fullNamePlaceholder: 'напр. Александр Иванов',
      labelPhone: 'Номер мобильного телефона *',
      phonePlaceholder: '+90 532 123 45 67',
      labelEmail: 'Электронная почта (необязательно)',
      emailPlaceholder: 'name@example.com',
      labelContactPref: 'Предпочтительный способ связи',
      contactPrefs: ['По телефону (в любое время)', 'Сообщение в WhatsApp', 'Только в рабочее время'],
      step4: '4. Описание объекта или пожелания',
      notesPlaceholder: 'напр., Вилла в охраняемом поселке с бассейном, южная сторона. Планируем продажу в течение месяца...',
      privacyTitle: 'Гарантия конфиденциальности: ',
      privacyDesc: 'Ваши данные строго конфиденциальны и никогда не передаются третьим лицам или рекламодателям.',
      submitChoiceTitle: 'Как вы хотите отправить заявку?',
      btnSaveSystem: 'Сохранить в системе и ждать ответа',
      btnSubmitting: 'Сохранение в системе...',
      btnWhatsApp: 'Отправить через WhatsApp',
      badgeSecure: 'Безопасная прямая передача',
      badgeResponseTime: 'Ответ в течение 2 часов',
      errName: 'Пожалуйста, укажите ваше имя и фамилию.',
      errPhone: 'Пожалуйста, введите корректный номер телефона.',
      successModal: {
        badgeReceived: 'Заявка зарегистрирована',
        title: 'Ваша заявка успешно принята!',
        descSystem: 'Информация передана в офис Селин Караджа. Мы свяжемся с вами в указанное вами время.',
        descWa: 'Заявка зарегистрирована и отправлена Селин Караджа в WhatsApp.',
        refCodeLabel: 'Код отслеживания заявки',
        applicant: 'Заявитель',
        action: 'Операция',
        propLoc: 'Объект / Район',
        btnVitrin: 'Вернуться на витрину',
        btnAdmin: 'Посмотреть в панели управления'
      }
    },
    footer: {
      rights: 'Все права защищены. Консультирование по элитной недвижимости.'
    }
  }
};

export const PROPERTY_TRANSLATIONS = {
  'prop-1': {
    TR: {
      title: 'Kemer Country Orman Manzaralı Müstakil Havuzlu Villa',
      location: 'Göktürk, Kemerburgaz',
      type: 'Müstakil Villa',
      badge: 'Öne Çıkan',
      bathrooms: '5 Banyo',
      features: ['Özel Havuz', '600 m² Bahçe', 'Akıllı Ev', 'Kapalı Garaj'],
      description: 'Kemer Country bölgesinde çam ormanlarına komşu, özel havuzlu ve bahçeli müstakil villa.'
    },
    EN: {
      title: 'Kemer Country Forest-Front Private Pool Villa',
      location: 'Göktürk, Kemerburgaz',
      type: 'Private Villa',
      badge: 'Featured',
      bathrooms: '5 Bathrooms',
      features: ['Private Pool', '600 m² Garden', 'Smart Home', 'Enclosed Garage'],
      description: 'Detached villa adjacent to pine forests in Kemer Country, featuring a private pool and manicured garden.'
    },
    RU: {
      title: 'Вилла с частным бассейном и видом на лес в Kemer Country',
      location: 'Гёктюрк, Кемербургаз',
      type: 'Вилла',
      badge: 'Избранное',
      bathrooms: '5 Ванных',
      features: ['Частный бассейн', 'Сад 600 м²', 'Умный дом', 'Крытый гараж'],
      description: 'Отдельная вилла по соседству с сосновым лесом в Kemer Country, с собственным бассейном и просторным садом.'
    }
  },
  'prop-2': {
    TR: {
      title: 'Boğaz Manzaralı Özel Tasarım Teraslı Penthouse',
      location: 'Kuruçeşme Sahil Hattı',
      type: 'Penthouse',
      badge: 'VIP Portföy',
      bathrooms: '3 Banyo',
      features: ['Panoramik Teras', 'Boğaz Manzarası', 'Özel İç Mimari'],
      description: 'Kesintisiz Boğaz manzaralı, geniş teraslı ve özel tasarımlı çatı dubleksi.'
    },
    EN: {
      title: 'Bosphorus Panoramic Custom Terrace Penthouse',
      location: 'Kuruçeşme Waterfront Line',
      type: 'Penthouse',
      badge: 'VIP Portfolio',
      bathrooms: '3 Bathrooms',
      features: ['Panoramic Terrace', 'Bosphorus View', 'Custom Interior Design'],
      description: 'Uninterrupted panoramic Bosphorus views, expansive entertaining terrace, and bespoke architectural finishing.'
    },
    RU: {
      title: 'Дизайнерский пентхаус с панорамной террасой на Босфор',
      location: 'Набережная Куручешме',
      type: 'Пентхаус',
      badge: 'VIP Портфолио',
      bathrooms: '3 Ванных',
      features: ['Панорамная терраса', 'Вид на Босфор', 'Дизайнерский интерьер'],
      description: 'Беспрепятственный панорамный вид на Босфор, просторная терраса и эксклюзивная авторская архитектура.'
    }
  },
  'prop-3': {
    TR: {
      title: 'Kemerburgaz Orman İçi Lüks Bahçe Dubleksi',
      location: 'Kemerburgaz',
      type: 'Bahçe Dubleksi',
      badge: 'Özel Portföy',
      bathrooms: '3 Banyo',
      features: ['Geniş Bahçe Kullanımı', 'Yerden Isıtma', 'Site İçi Güvenlik'],
      description: 'Doğayla iç içe, butik sitede ferah bahçe dubleksi. Aileler için ideal sessiz yaşam.'
    },
    EN: {
      title: 'Kemerburgaz Forest-Edge Luxury Garden Duplex',
      location: 'Kemerburgaz',
      type: 'Garden Duplex',
      badge: 'Private Selection',
      bathrooms: '3 Bathrooms',
      features: ['Private Garden Access', 'Underfloor Heating', '24/7 Gated Security'],
      description: 'Immersed in nature within a boutique compound. A spacious garden duplex crafted for peaceful family living.'
    },
    RU: {
      title: 'Элитный садовый дуплекс у леса в Кемербургазе',
      location: 'Кемербургаз',
      type: 'Садовый дуплекс',
      badge: 'Спецпредложение',
      bathrooms: '3 Ванных',
      features: ['Собственный сад', 'Теплые полы', 'Охраняемая территория 24/7'],
      description: 'В окружении природы в камерном охраняемом комплексе. Просторный садовый дуплекс для комфортной семейной жизни.'
    }
  },
  'prop-4': {
    TR: {
      title: 'Göktürk Merkezde Teraslı ve Şömineli Çatı Dubleksi',
      location: 'Göktürk Merkez',
      type: 'Çatı Dubleksi',
      badge: 'Yeni İlan',
      bathrooms: '2 Banyo',
      features: ['Şömine', 'Geniş Teras', 'Kapalı Otopark'],
      description: 'Göktürk çarşıya ve kafelere yürüme mesafesinde, keyifli terası ve şöminesi olan aydınlık dubleks.'
    },
    EN: {
      title: 'Central Göktürk Terrace & Fireplace Penthouse Duplex',
      location: 'Central Göktürk',
      type: 'Roof Duplex',
      badge: 'New Listing',
      bathrooms: '2 Bathrooms',
      features: ['Real Fireplace', 'Spacious Terrace', 'Covered Parking'],
      description: 'Walking distance to Göktürk high street and cafes, a sunlit duplex featuring a cozy fireplace and expansive terrace.'
    },
    RU: {
      title: 'Дуплекс с камином и террасой в центре Гёктюрка',
      location: 'Центр Гёктюрка',
      type: 'Пентхаус-дуплекс',
      badge: 'Новый объект',
      bathrooms: '2 Ванных',
      features: ['Действующий камин', 'Просторная терраса', 'Крытый паркинг'],
      description: 'В шаговой доступности от ресторанов и бутиков центра Гёктюрка. Светлый дуплекс с уютным камином и террасой.'
    }
  },
  'prop-5': {
    TR: {
      title: 'Kemer Country Su Kenarı Özel Mimari Yalı Dairesi',
      location: 'Kemer Country Gölet',
      type: 'Rezidans Daire',
      badge: 'Fırsat',
      bathrooms: '2 Banyo',
      features: ['Gölet Manzarası', 'Geniş Balkon', 'Özel Depo Alanı'],
      description: 'Gölet manzaralı, gün ışığı alan yüksek tavanlı salonu ile seçkin bir Kemer Country dairesi.'
    },
    EN: {
      title: 'Kemer Country Waterfront Architectural Lake Residence',
      location: 'Kemer Country Lakefront',
      type: 'Lake Residence',
      badge: 'Rare Opportunity',
      bathrooms: '2 Bathrooms',
      features: ['Lakefront Panorama', 'Large Balcony', 'Private Storage Room'],
      description: 'Overlooking the serene lake with voluminous high ceilings and floor-to-ceiling glass framing nature.'
    },
    RU: {
      title: 'Резиденция у озера в Kemer Country с высокими потолками',
      location: 'Озерная линия Kemer Country',
      type: 'Резиденция',
      badge: 'Редкий шанс',
      bathrooms: '2 Ванных',
      features: ['Панорама озера', 'Большой балкон', 'Отдельное кладовое помещение'],
      description: 'Вид на живописное озеро, гостиная с высокими потолками и панорамным остеклением в самом престижном поселке.'
    }
  },
  'vault-1': {
    TR: {
      title: '🔒 Kemer Country Gizli Malikane & Özel Koruluk',
      location: 'Kemer Country Özel Bölge',
      type: 'Özel Malikane',
      badge: 'Off-Market',
      bathrooms: '7 Banyo',
      features: ['2 Dönüm Özel Koruluk', 'Helikopter Pisti', 'Kapalı Isıtmalı Havuz', 'Müştemilat & Güvenlik'],
      description: 'Kamuya açık ilan sitelerinde yer almayan, 2 dönüm müstakil koruluk içerisinde ultra-lüks malikane. Yalnızca NDA onaylı alıcılar.'
    },
    EN: {
      title: '🔒 Kemer Country Off-Market Private Estate & Grove',
      location: 'Kemer Country Private Enclave',
      type: 'Private Mansion',
      badge: 'Off-Market',
      bathrooms: '7 Bathrooms',
      features: ['2 Acres Private Grove', 'Helipad Access', 'Indoor Heated Pool', 'Staff Quarters & Security'],
      description: 'Unlisted on public portals. A sprawling private estate nestled within 2 acres of private woodland. Strictly verified NDA buyers.'
    },
    RU: {
      title: '🔒 Закрытая усадьба и частная роща в Kemer Country',
      location: 'Закрытый анклав Kemer Country',
      type: 'Усадьба',
      badge: 'Off-Market',
      bathrooms: '7 Ванных',
      features: ['Частная роща 8000 м²', 'Вертолетная площадка', 'Крытый подогреваемый бассейн', 'Дом для охраны и персонала'],
      description: 'Не публикуется в открытых источниках. Роскошная закрытая усадьба среди вековых сосен. Доступ только по соглашению NDA.'
    }
  },
  'vault-2': {
    TR: {
      title: '🔒 Kandilli Boğaz Hattı Tarihi Eser Tescilli Yalı',
      location: 'Kandilli Sahil',
      type: 'Tarihi Yalı',
      badge: 'Off-Market',
      bathrooms: '8 Banyo',
      features: ['Tarihi Eser Tescilli', 'Özel İskele & Rıhtım', 'Boğaz Kıyı Şeridi', 'Yüksek Tavanlı Salon'],
      description: 'Boğaziçi’nin en değerli kıyı şeridinde, tescilli tarihi eser statüsünde rıhtımlı ve özel tekneli yalı.'
    },
    EN: {
      title: '🔒 Kandilli Historic Bosphorus Registered Waterfront Mansion',
      location: 'Kandilli Waterfront',
      type: 'Historic Yalı',
      badge: 'Off-Market',
      bathrooms: '8 Bathrooms',
      features: ['Registered Heritage Asset', 'Private Pier & Mooring', 'Direct Bosphorus Shoreline', 'Grand Salon with High Ceilings'],
      description: 'Situated on the Bosphorus prime shoreline, a registered historic landmark mansion with private deep-water mooring.'
    },
    RU: {
      title: '🔒 Исторический ялы на первой линии Босфора в Кандилли',
      location: 'Набережная Кандилли',
      type: 'Исторический ялы',
      badge: 'Off-Market',
      bathrooms: '8 Ванных',
      features: ['Статус исторического наследия', 'Собственный пирс и причал', 'Прямой выход к Босфору', 'Дворцовые высокие потолки'],
      description: 'Один из ценнейших исторических особняков на первой береговой линии Босфора с собственным причалом для яхты.'
    }
  }
};

/**
 * Localizes a single listing object by active language
 */
export function localizeListing(listing, lang = 'TR') {
  if (!listing) return listing;
  const langKey = lang === 'EN' || lang === 'RU' ? lang : 'TR';
  const transMap = PROPERTY_TRANSLATIONS[listing.id];
  const tItem = transMap && transMap[langKey] ? transMap[langKey] : {};

  const defaultGallery = listing.gallery || [
    listing.imageUrl,
    listing.imageUrl?.includes('prop-1') ? '/assets/prop-2.jpg' : '/assets/prop-1.jpg',
    listing.imageUrl?.includes('prop-3') ? '/assets/prop-2.jpg' : '/assets/prop-3.jpg'
  ];

  const defaultSpecs = {
    TR: {
      ceiling: '3.40 m',
      heating: 'Yerden Isıtma (Rehau) + VRF',
      parking: '2 Kapalı + 1 Misafir Otoparkı',
      orientation: 'Güney - Doğu (Orman & Doğa Cepheli)',
      year: '2023',
      dues: '₺4.800 / Ay'
    },
    EN: {
      ceiling: '3.40 m (11.1 ft)',
      heating: 'Radiant Underfloor (Rehau) + Multi-VRF',
      parking: '2 Covered Bays + Guest Space',
      orientation: 'South-East (Unobstructed Nature View)',
      year: '2023',
      dues: '₺4,800 / Mo'
    },
    RU: {
      ceiling: '3.40 м',
      heating: 'Теплые полы (Rehau) + система VRF',
      parking: '2 крытых машиноместа + гостевое',
      orientation: 'Юго-восток (панорама на лес)',
      year: '2023',
      dues: '₺4.800 / Мес'
    }
  };

  return {
    ...listing,
    title: tItem.title || listing.title,
    location: tItem.location || listing.location,
    type: tItem.type || listing.type,
    badge: tItem.badge || listing.badge,
    bathrooms: tItem.bathrooms || listing.bathrooms,
    features: tItem.features || listing.features,
    description: tItem.description || listing.description,
    gallery: defaultGallery,
    specs: listing.specs || defaultSpecs[langKey]
  };
}

/**
 * Returns localized general translations for given language
 */
export function getTranslations(lang = 'TR') {
  const langKey = lang === 'EN' || lang === 'RU' ? lang : 'TR';
  return TRANSLATIONS[langKey] || TRANSLATIONS.TR;
}
