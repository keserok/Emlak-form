/**
 * MediArt Experience Architect - Dynamic Recommendation Engine
 * Calculates Package, Delivery Timeframe, Rationale, and Included Architectural Features.
 * Supports Multi-Select across all questions.
 */

const has = (ans, val) => {
  if (!ans) return false;
  if (Array.isArray(ans)) return ans.includes(val);
  return ans === val;
};

export function calculatePackage(answers) {
  const step1 = answers[1]; // Operation: single_boutique | multi_agency | luxury_estates | land_investment
  const step3 = answers[3]; // Hero visual: advisor_portrait | iconic_landscape
  const step4 = answers[4]; // Design style: warm_editorial | pure_architectural | high_end_dark
  const step5 = answers[5]; // Contact: direct_whatsapp | calendar_booking | property_submission | direct_call
  const step6 = answers[6]; // Panel: light_showcase | dynamic_portfolio | multi_agent_system
  const step7 = answers[7]; // Modules: tr_reviews | multilingual | matterport_3d | full_spectrum

  // Check for Premium triggers
  const isPremium =
    has(step1, 'luxury_estates') ||
    has(step4, 'high_end_dark') ||
    has(step7, 'multilingual');

  // Check for Üst Düzey triggers
  const isUstDuzey =
    has(step6, 'multi_agent_system') ||
    has(step1, 'multi_agency') ||
    has(step6, 'dynamic_portfolio') ||
    has(step5, 'calendar_booking') ||
    has(step5, 'property_submission') ||
    has(step1, 'land_investment');

  let packageTier = 'standard';
  let packageName = 'Standart Paket';
  let badgeName = 'EDITORIAL ESSENTIAL';
  let deliveryDays = '5 - 7 İş Günü';
  let priceEstimate = 'Özel Teklif';

  if (isPremium) {
    packageTier = 'premium';
    packageName = 'Premium Paket';
    badgeName = 'HIGH-END LUXURY SPEC';
    deliveryDays = '18 - 25 İş Günü';
  } else if (isUstDuzey) {
    packageTier = 'advanced';
    packageName = 'Üst Düzey Paket';
    badgeName = 'DYNAMIC OPERATIONAL';
    deliveryDays = '10 - 14 İş Günü';
  } else {
    packageTier = 'standard';
    packageName = 'Standart Paket';
    badgeName = 'EDITORIAL ESSENTIAL';
    deliveryDays = '5 - 7 İş Günü';
  }

  // Generate 2-sentence bespoke rationale based on multi-selections
  let rationale = '';
  if (packageTier === 'premium') {
    rationale = `Seçtiğiniz ${
      has(step1, 'luxury_estates') ? 'lüks segment portföy dinamikleri' : 'yüksek standartlı mimari estetik'
    } ve ${
      has(step7, 'multilingual')
        ? 'küresel ölçekli çok dilli altyapı'
        : 'seçkin editoryal marka dili'
    }, markanızı uluslararası arenada bir sanat galerisi prestijiyle konumlandıracaktır. MediArt stüdyosu, bu ölçekte yüksek nitelikli gayrimenkul alıcılarına hitap eden ultra-rafine bir dijital mülk inşa etmeyi hedefler.`;
  } else if (packageTier === 'advanced') {
    rationale = `Belirlediğiniz ${
      has(step6, 'multi_agent_system') || has(step1, 'multi_agency')
        ? 'çoklu danışman yönetim yapısı'
        : 'dinamik portföy kontrol altyapısı'
    } ve ${
      has(step5, 'calendar_booking') ? 'anlık randevu takvimi' : 'doğrudan mülk toplama modülü'
    }, ofisinizin operasyonel yükünü hafifleterek nitelikli müşteri dönüşümünü maksimize edecektir. Bu mimari, büyüyen ekibinizin dijitaldeki en güçlü güven çapası olacaktır.`;
  } else {
    rationale = `Butik ve bağımsız danışmanlık yaklaşımınız doğrultusunda, karmaşık veri tablolarından arındırılmış, doğrudan kişisel itibarınızı ve seçkin vitrininizi parlatan yalın bir editoryal web deneyimi tasarlandı. Hızlı temas kanallarıyla ziyaretçilerinizi beklemeden doğrudan sizinle temas haline getiriyoruz.`;
  }

  // Tailored Architectural Feature Bullet Points (Multi-select inclusive)
  const features = [];

  // Hero visual features
  if (has(step3, 'advisor_portrait')) {
    features.push({
      title: 'Stüdyo Kalitesinde Danışman Güven Çapası',
      desc: 'İnsan insana güven ilkesine dayalı, editoryal portre ve kişisel biyografi modülü.'
    });
  }
  if (has(step3, 'iconic_landscape')) {
    features.push({
      title: 'Sinematik Bölge & Mimari Hero Sahnesi',
      desc: 'Portföyünüzün ihtişamını yansıtan yüksek çözünürlüklü atmosferik karşılama.'
    });
  }

  // Design style features
  if (has(step4, 'warm_editorial')) {
    features.push({
      title: 'Warm Editorial Tasarım Dili',
      desc: 'Sıcak bej/toprak dokuları, organik serif tipografi ve huzurlu mimari dergi düzeni.'
    });
  }
  if (has(step4, 'pure_architectural')) {
    features.push({
      title: 'Pure Architectural Grid Düzeni',
      desc: 'Geniş negatif alanlar, Bauhaus esintili ızgara ve cesur kurumsal geometri.'
    });
  }
  if (has(step4, 'high_end_dark')) {
    features.push({
      title: 'Obsidyen & Altın High-End Dark Aurası',
      desc: 'Lüks kulüp ve rezidans aurası, şampanya altını vurgular ve derin cam katmanları.'
    });
  }

  // Operational features
  if (has(step6, 'multi_agent_system')) {
    features.push({
      title: 'Çok Danışmanlı Bağımsız Profil Mimarisi',
      desc: 'Her danışman için özel portföy koleksiyonu, QR kartvizit ve şahsi iletişim hattı.'
    });
  }
  if (has(step6, 'dynamic_portfolio')) {
    features.push({
      title: 'MediArt Dinamik Portföy Paneli',
      desc: 'Sınırsız ilan, yüksek çözünürlüklü galeri ve anlık vitrin güncelleme kabiliyeti.'
    });
  }
  if (has(step6, 'light_showcase')) {
    features.push({
      title: 'Hızlı & Hafif Vitrin Yönetim Motoru',
      desc: 'Sadece seçkin mülkleri zahmetsizce sergileyen ultra-hafif yönetim yapısı.'
    });
  }

  // Contact / Conversion features
  if (has(step5, 'calendar_booking')) {
    features.push({
      title: '15 Dk. Yer Gösterme & Tanışma Takvimi',
      desc: 'Müşterilerin doğrudan takviminizden randevu oluşturduğu sürtünmesiz slot sistemi.'
    });
  }
  if (has(step5, 'property_submission')) {
    features.push({
      title: 'Mülk Sahiplerine Özel Portföy Toplama Formu',
      desc: 'Bölgedeki satıcı ve kiraya verenlerden otomatik portföy toplayan dijital modül.'
    });
  }
  if (has(step5, 'direct_whatsapp')) {
    features.push({
      title: 'Tek Tıkla Doğrudan WhatsApp Köprüsü',
      desc: 'İlan detayından doğrudan kişisel hatta geçen hazır şablonlu iletişim butonu.'
    });
  }
  if (has(step5, 'direct_call')) {
    features.push({
      title: 'Doğrudan Arama & Telefon Çağrı Hattı',
      desc: 'Tek tuşla anında telefon bağlantısı ve şeffaf ulaşılabilirlik güvencesi.'
    });
  }

  // International / Language features
  if (has(step7, 'multilingual')) {
    features.push({
      title: 'Uluslararası Çoklu Dil Altyapısı',
      desc: 'Yabancı yatırımcılar için tam kapsamlı çok dilli içerik ve kur çevirici mimarisi.'
    });
  }
  if (has(step7, 'tr_reviews')) {
    features.push({
      title: 'Google Puanı & Doğrulanmış Müşteri İncelemeleri',
      desc: 'Yerel güven otoritesini pekiştiren dinamik müşteri değerlendirme kartları.'
    });
  }

  return {
    packageTier,
    packageName,
    badgeName,
    deliveryDays,
    priceEstimate,
    rationale,
    features: features.slice(0, 6) // Top featured items
  };
}
