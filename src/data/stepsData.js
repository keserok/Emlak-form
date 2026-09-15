export const STEPS_DATA = [
  {
    id: 1,
    tag: "01. OPERASYON & PORTFÖY DİNAMİĞİ",
    title: "Sitenizin mimarisi nasıl bir operasyonun üzerine kurulacak?",
    subtitle: "Mülk alıcılarının ve yatırımcıların karşılaştığı ilk dijital yapı taşını tanımlıyoruz.",
    isMultiSelect: true,
    selectionHint: "Birden fazla portföy segmenti işaretleyebilirsiniz.",
    options: [
      {
        id: "A",
        value: "single_boutique",
        title: "Bağımsız Danışman & Butik Şehir İçi",
        desc: "Kişisel güven ve seçkin birkaç mülkün hikayesine odaklanan yüksek temaslı butik yapı.",
        badge: "Bireysel İtibar Odaklı",
        icon: "User"
      },
      {
        id: "B",
        value: "multi_agency",
        title: "Çok Danışmanlı Ofis & Karma Portföy",
        desc: "Konut, ticari ve proje portföyünü birden fazla danışmanla senkronize yöneten ofis yapısı.",
        badge: "Genişletilebilir Kadro",
        icon: "Users"
      },
      {
        id: "C",
        value: "luxury_estates",
        title: "Lüks Segment & Seçkin Gayrimenkuller",
        desc: "Villa, rezidans, yalı ve özel koleksiyon gayrimenkullere hitap eden ultra-lüks vitrin.",
        badge: "Yüksek Net Değer (HNW)",
        icon: "Sparkles"
      },
      {
        id: "D",
        value: "land_investment",
        title: "Arsa, Arazi ve Yatırım Projeleri",
        desc: "İmar analizleri, parsel verileri ve kurumsal gayrimenkul yatırımcılarına yönelik özel sunum.",
        badge: "Büyük Ölçekli Fon",
        icon: "Layers"
      },
      {
        id: "E",
        value: "large_development",
        title: "Büyük Ölçekli Gayrimenkul & İnşaat Projesi",
        desc: "Tek bir markalı konut, karma yaşam veya villa projesi için bağımsız dijital lansman ve satış vitrini.",
        badge: "İnşaat & Proje Geliştirici",
        icon: "Building2"
      }
    ]
  },
  {
    id: 2,
    tag: "02. EDİTORYAL TAVIR & İLK İNTİBA",
    title: "Müşterinizin web sitenizi açtığı ilk 3 saniyede hissedeceği duygu ne olmalı?",
    subtitle: "Klişelerden uzak, korkuları gideren sıcak ve güven veren bir karşılama dili.",
    isMultiSelect: false,
    selectionHint: "Hero alanında tek bir ana karşılama felsefesi yer alır.",
    hasCustomInput: true,
    customOptionId: "D",
    options: [
      {
        id: "A",
        value: "calm_trust",
        title: "Sakin & Güven Verici",
        quote: "“Baskı olmadan, adım adım güvenle hayalinizdeki eve ulaşın.”",
        desc: "Alıcının acele ettirilme korkusunu sıfırlayan, şeffaf ve dingin bir ton.",
        badge: "Psikolojik Rahatlık",
        icon: "ShieldCheck"
      },
      {
        id: "B",
        value: "friendly_needs",
        title: "İhtiyaç Odaklı & Samimi",
        quote: "“Sevdiğiniz evi bulmak yorucu olmak zorunda değil; keyifli bir başlangıç yapalım.”",
        desc: "Karmaşık süreçleri basitleştiren, aile sıcaklığında rehber bir dil.",
        badge: "Kişisel Yakınlık",
        icon: "HeartHandshake"
      },
      {
        id: "C",
        value: "result_oriented",
        title: "Net & Sonuç Odaklı",
        quote: "“Mülkünüzün gerçek değerini ortaya çıkarıyor, en doğru alıcıyla buluşturuyoruz.”",
        desc: "Veri, piyasa hakimiyeti ve zaman tasarrufunu önceleyen profesyonel duruş.",
        badge: "Yatırımcı Güveni",
        icon: "Target"
      },
      {
        id: "D",
        value: "custom_slogan",
        title: "Özel Slogan Belirle",
        quote: "Kendi markanızın özgün manifestosunu ve sloganını yazın.",
        desc: "Ofisinizin veya şahsınızın vizyonunu temsil eden özelleştirilmiş cümle.",
        badge: "Kişiselleştirilmiş",
        icon: "PenTool"
      }
    ]
  },
  {
    id: 3,
    tag: "03. GÖRSEL ODAK & GÜVEN ÇAPASI",
    title: "Ziyaretçiyi ilk karede kim karşılamalı?",
    subtitle: "Gayrimenkulde karar anı dijital soğuklukla değil, insan sıcaklığıyla başlar.",
    isMultiSelect: false,
    selectionHint: "Sitenin ilk ekranında görsel odak noktası tektir.",
    options: [
      {
        id: "A",
        value: "advisor_portrait",
        title: "Samimi Danışman / Ekip Fotoğrafı",
        desc: "İnsan insana güvenir. Sıcak, stüdyo kalitesinde profesyonel bir portre veya ekip karesi.",
        badge: "⭐ MediArt Tavsiyesi",
        isRecommended: true,
        icon: "Camera",
        preview: "portrait",
        image: "/images/advisor-portrait.jpg"
      },
      {
        id: "B",
        value: "iconic_landscape",
        title: "İkonik Portföy / Bölge Manzarası",
        desc: "Bölgenin mimari dokusunu ve seçkin mülk estetiğini sinematik açıdan yansıtan editoryal çekim.",
        badge: "Mimari Atmosfer",
        icon: "Image",
        preview: "architecture",
        image: "/images/luxury-villa.jpg"
      },
      {
        id: "C",
        value: "project_architecture",
        title: "Proje Mimarisi & Sinematik Lansman Çekimi",
        desc: "Projenin mimari çizgilerini, cephe karakterini ve prestijini öne çıkaran sinematik karşılama.",
        badge: "Proje Prestiji",
        icon: "Building2",
        preview: "architecture",
        image: "/images/luxury-villa.jpg"
      }
    ]
  },
  {
    id: 4,
    tag: "04. MİMARİ DERGİ DİLİ & PALET",
    title: "Sitenizde hangi editoryal tasarım çizgisi hakim olsun?",
    subtitle: "Awwwards & Architectural Digest kalitesinde interaktif görsel kimlik stilleri.",
    isMultiSelect: false,
    selectionHint: "Tüm sitede tek ve tutarlı bir mimari estetik dil hakimdir.",
    options: [
      {
        id: "A",
        value: "warm_editorial",
        title: "Sıcak & Yaklaşımlı (Warm Editorial)",
        desc: "Bej, fildişi ve sıcak toprak tonları. Organik serif tipografi, insani sıcaklık ve huzur veren kompozisyon.",
        badge: "Akdeniz & Doğal Taş",
        icon: "SunMedium",
        previewType: "warm",
        image: "/images/palette-travertine.jpg",
        palette: ["#FAF7F2", "#E8DFD8", "#8C7355", "#2C2523"]
      },
      {
        id: "B",
        value: "pure_architectural",
        title: "Modern & Minimalist (Pure Architectural)",
        desc: "Bol negatif alan, keskin ızgara (grid) yerleşimi, monospaced detaylar ve cesur kurumsal estetik.",
        badge: "Bauhaus & Geometrik",
        icon: "Compass",
        previewType: "minimal",
        image: "/images/palette-minimal-concrete.jpg",
        palette: ["#FFFFFF", "#F3F4F6", "#4B5563", "#111827"]
      },
      {
        id: "C",
        value: "high_end_dark",
        title: "Monokrom Lüks (High-End Dark)",
        desc: "Obsidyen siyahı, fırçalanmış şampanya altını, gölgeli cam katmanları ve özel rezidans aurası.",
        badge: "Gece Kulübü & Rezidans",
        icon: "MoonStar",
        previewType: "dark",
        image: "/images/palette-obsidian-gold.jpg",
        palette: ["#0B0C0E", "#16191E", "#D4AF37", "#F8F9FA"]
      }
    ]
  },
  {
    id: 5,
    tag: "05. DÖNÜŞÜM & İLETİŞİM KÖPRÜSÜ",
    title: "Müşteri karar anına geldiğinde önünde hangi kestirme yol yer alsın?",
    subtitle: "Ziyaretçiyi siteden kaçırmadan sıcak bir diyalog başlatan etkileşim mimarisi.",
    isMultiSelect: true,
    selectionHint: "Sitenize birden fazla iletişim ve randevu kanalı ekleyebilirsiniz.",
    options: [
      {
        id: "A",
        value: "direct_whatsapp",
        title: "Hızlı WhatsApp Butonu",
        desc: "İlan detayından doğrudan kişisel hatta tek tıkla geçiş; hazır ön yazı ile anında diyalog.",
        badge: "Sıfır Sürtünme",
        icon: "MessageCircle"
      },
      {
        id: "B",
        value: "calendar_booking",
        title: "15 Dk. Tanışma & Yer Gösterme Takvimi",
        desc: "Site üzerinden anlık müsait slot seçimi, Google Takvim senkronizasyonu ve SMS hatırlatma.",
        badge: "Prestijli Zaman Yönetimi",
        icon: "Calendar"
      },
      {
        id: "C",
        value: "property_submission",
        title: "“Evimi Satmak / Kiralamak İstiyorum” Formu",
        desc: "Bölgedeki mülk sahiplerinden portföy toplama ve otomatik değerleme talep modülü.",
        badge: "Portföy Büyütme Motoru",
        icon: "Home"
      },
      {
        id: "D",
        value: "direct_call",
        title: "Doğrudan Arama Teşviki",
        desc: "“Telefonu açıyoruz, çekinmeden arayın” garantili şeffaf ve direkt arama hattı.",
        badge: "Doğrudan Sesli İletişim",
        icon: "PhoneCall"
      },
      {
        id: "E",
        value: "project_sales_office",
        title: "Satış Ofisi Randevusu & Kat Planı İndirme",
        desc: "Müşterilerin anında kat planı broşürünü incelediği ve satış ofisiyle VIP görüşme başlattığı köprü.",
        badge: "Proje Satış Odaklı",
        icon: "Building2"
      }
    ]
  },
  {
    id: 6,
    tag: "06. OPERASYONEL KONTROL MERKEZİ",
    title: "Web sitenizin yönetim panelinde hangi operasyonel güce ihtiyacınız var?",
    subtitle: "MediArt High-Speed Engine: Harici portal XML aktarımı olmaksızın tam bağımsız vitrin kontrolü.",
    isMultiSelect: false,
    selectionHint: "Operasyonel büyüklüğünüze en uygun ana panel seviyesini seçin.",
    options: [
      {
        id: "A",
        value: "light_showcase",
        title: "Temel Vitrin Paneli",
        desc: "Sadece seçkin vitrin ilanlarını yönetebileceğiniz, hafif ve ultra hızlı portföy yönetim arayüzü.",
        badge: "Yalın & Hızlı",
        icon: "LayoutTemplate"
      },
      {
        id: "B",
        value: "dynamic_portfolio",
        title: "Dinamik Portföy Paneli",
        desc: "Kendi panelinizden sınırsız ilan ekleme, yüksek çözünürlüklü galeri yükleme, fiyat güncelleme.",
        badge: "Sınırsız Özgürlük",
        icon: "SlidersHorizontal"
      },
      {
        id: "C",
        value: "multi_agent_system",
        title: "Çoklu Danışman Altyapısı",
        desc: "Her danışman için bağımsız biyografi sayfası, kişisel portföy koleksiyonu ve direkt iletişim hattı.",
        badge: "Kurumsal Ofis Gücü",
        icon: "Network"
      },
      {
        id: "D",
        value: "project_inventory_panel",
        title: "Dinamik Proje & Ünite Stok Paneli",
        desc: "Blok, kat ve daire bazında satıldı/satılık durumları, kat planları ve daire tiplerinin yönetildiği proje paneli.",
        badge: "İnteraktif & Dinamik Altyapı",
        icon: "Boxes"
      }
    ]
  },
  {
    id: 7,
    tag: "07. KÜRESEL VİZYON & DİL ALTYAPISI",
    title: "Web sitenizi yerel sınırların ötesine taşıyacak hangi dil altyapısını ekleyelim?",
    subtitle: "Yabancı yatırımcılara ve yerel alıcılara hitap eden dil ve güven mimarisi.",
    isMultiSelect: true,
    selectionHint: "Dilediğiniz uluslararası ve yerel dil modüllerini seçebilirsiniz.",
    options: [
      {
        id: "A",
        value: "tr_reviews",
        title: "Sadece Türkçe & Müşteri Değerlendirmeleri",
        desc: "Yerel odaklı, doğrulanmış Google değerlendirmeleri ve alıcı referanslarıyla güven artıran kurgu.",
        badge: "Yerel Otorite",
        icon: "Star"
      },
      {
        id: "B",
        value: "multilingual",
        title: "Çoklu Dil Altyapısı",
        desc: "Yabancı yatırımcılar için İngilizce, Rusça veya Arapça tam yerelleştirilmiş dil desteği.",
        badge: "Küresel Yatırımcı Ağı",
        icon: "Globe"
      }
    ]
  }
];
