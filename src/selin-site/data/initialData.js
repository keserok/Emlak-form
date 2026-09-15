/**
 * Minimalist Initial Data for Selin Karaca Showcase & Admin Panel
 * Clean, meaningful, concise Turkish copywriting for luxury real estate.
 */

export const initialAgentProfile = {
  name: "Selin Karaca",
  title: "Göktürk & Kemerburgaz Gayrimenkul Danışmanı",
  region: "Göktürk • Kemerburgaz",
  phone: "+90 532 890 42 15",
  email: "selin@selinkaraca.com",
  officeAddress: "İstanbul Cad. No: 42, Göktürk / İstanbul",
  avatarUrl: "/assets/selin-karaca.jpg",
  heroBadge: "Bölge Uzmanı Danışman",
  heroHeadline: "Göktürk'te Evinizi Değerinde ve Stressiz Satın.",
  heroSubheadline: "Soğuk ilan sitelerinin kalabalığında kaybolmayın. 12 yıllık bölge hakimiyeti, VIP alıcı ağı ve şeffaf danışmanlıkla yanınızdayız.",
  bioHeading: "Sade, Şeffaf ve Güven Odaklı Danışmanlık",
  bioDescription: "Gayrimenkul satışı bir ilan listesinden ibaret değildir. Göktürk ve Kemerburgaz bölgesinde evinizi doğru alıcıyla buluşturan, sürecin her adımında yanınızda olan kişisel danışmanınızım.",
  socials: {
    instagram: "https://instagram.com/selinkaracarealty",
    linkedin: "https://linkedin.com/in/selinkaraca"
  },
  stats: [
    { label: "Portföy Hacmi", value: "₺1.8B+", subtext: "Tamamlanan işlemler" },
    { label: "Danışan Aile", value: "280+", subtext: "Mutlu referanslar" },
    { label: "Bölge Deneyimi", value: "12 Yıl", subtext: "Göktürk & Kemerburgaz" },
    { label: "Memnuniyet", value: "%99.4", subtext: "Doğrulanmış müşteri oyu" }
  ]
};

export const initialListingProcess = [
  {
    step: "01",
    title: "Ön Görüşme",
    description: "15 dakikalık tanışma ile hedeflerinizi ve beklentilerinizi netleştiriyoruz."
  },
  {
    step: "02",
    title: "Değerleme",
    description: "Bölge emsalleriyle evinizin gerçek pazar değerini saptıyoruz."
  },
  {
    step: "03",
    title: "VIP Lansman",
    description: "Nitelikli alıcı ağımıza ve özel kanallarımıza sunum yapıyoruz."
  },
  {
    step: "04",
    title: "Gösterimler",
    description: "Sadece bütçesi doğrulanmış alıcı adaylarını ağırlıyoruz."
  },
  {
    step: "05",
    title: "Kapanış",
    description: "Teklifleri yönetip tapu sürecini güvenle tamamlıyoruz."
  }
];

export const initialListings = [
  {
    id: "prop-1",
    title: "Kemer Country Orman Manzaralı Müstakil Havuzlu Villa",
    location: "Göktürk, Kemerburgaz",
    price: "₺48.500.000",
    priceRaw: 48500000,
    type: "Müstakil Villa",
    status: "Aktif",
    badge: "Öne Çıkan",
    bedrooms: "5+2",
    bathrooms: "5 Banyo",
    area: "520 m²",
    features: ["Özel Havuz", "600 m² Bahçe", "Akıllı Ev", "Kapalı Garaj"],
    imageUrl: "/assets/prop-2.jpg",
    description: "Kemer Country bölgesinde çam ormanlarına komşu, özel havuzlu ve bahçeli müstakil villa."
  },
  {
    id: "prop-2",
    title: "Boğaz Manzaralı Özel Tasarım Teraslı Penthouse",
    location: "Kuruçeşme Sahil Hattı",
    price: "₺34.000.000",
    priceRaw: 34000000,
    type: "Penthouse",
    status: "Aktif",
    badge: "VIP Portföy",
    bedrooms: "4+1",
    bathrooms: "3 Banyo",
    area: "310 m²",
    features: ["Panoramik Teras", "Boğaz Manzarası", "Özel İç Mimari"],
    imageUrl: "/assets/prop-1.jpg",
    description: "Kesintisiz Boğaz manzaralı, geniş teraslı ve özel tasarımlı çatı dubleksi."
  },
  {
    id: "prop-3",
    title: "Kemerburgaz Orman İçi Lüks Bahçe Dubleksi",
    location: "Kemerburgaz",
    price: "₺26.500.000",
    priceRaw: 26500000,
    type: "Bahçe Dubleksi",
    status: "Aktif",
    badge: "Özel Portföy",
    bedrooms: "3+1",
    bathrooms: "3 Banyo",
    area: "240 m²",
    features: ["Müstakil Bahçe", "7/24 Güvenlik", "Açık Havuz"],
    imageUrl: "/assets/prop-3.jpg",
    description: "Kemerburgaz'da doğanın kalbinde yer alan müstakil bahçeli lüks aile evi."
  },
  {
    id: "prop-4",
    title: "Göktürk Merkezde İtalyan Mimarisi Lüks Daire",
    location: "Göktürk Merkez",
    price: "₺18.900.000",
    priceRaw: 18900000,
    type: "Rezidans Daire",
    status: "Satıldı",
    badge: "Satıldı",
    bedrooms: "2+1",
    bathrooms: "2 Banyo",
    area: "145 m²",
    features: ["Ankastre Mutfak", "Yerden Isıtma", "Metroya Yakın"],
    imageUrl: "/assets/prop-2.jpg",
    description: "Göktürk merkezde özel mimarili konut. (Selin Karaca tarafından satılmıştır)."
  },
  {
    id: "prop-5",
    title: "Kemerburgaz Lotus Evleri Müstakil Konak",
    location: "Kemerburgaz",
    price: "₺62.000.000",
    priceRaw: 62000000,
    type: "Müstakil Konak",
    status: "Aktif",
    badge: "Özel Portföy",
    bedrooms: "6+2",
    bathrooms: "6 Banyo",
    area: "680 m²",
    features: ["1 Dönüm Bahçe", "Özel Havuz", "Müştemilat"],
    imageUrl: "/assets/prop-3.jpg",
    description: "1 dönüm arsa içinde tam mahremiyete sahip müstakil lüks konak."
  },
  {
    id: "prop-6",
    title: "Göktürk Neo Studio Kiralık VIP Rezidans",
    location: "Göktürk Merkez",
    price: "₺95.000/Ay",
    priceRaw: 95000,
    type: "Kiralık Rezidans",
    status: "Aktif",
    badge: "Kiralık",
    bedrooms: "1+1",
    bathrooms: "1 Banyo",
    area: "85 m²",
    features: ["Lüks Eşyalı", "Resepsiyon", "Kapalı Garaj"],
    imageUrl: "/assets/prop-1.jpg",
    description: "Göktürk merkezde full eşyalı taşınmaya hazır VIP rezidans daire."
  },
  {
    id: "prop-vault-1",
    title: "Kemer Country Gizli Koruluklu Müstakil Malikane",
    location: "Göktürk Özel Bölge",
    price: "₺135.000.000",
    priceRaw: 135000000,
    type: "Off-Market Malikane",
    status: "Aktif",
    badge: "VIP Gizli Kasa",
    isOffMarket: true,
    bedrooms: "7+3",
    bathrooms: "7 Banyo",
    area: "980 m²",
    features: ["2 Dönüm Özel Koru", "Helikopter Pisti İzni", "Açık/Kapalı Isıtmalı Havuz", "Özel Spa & Türk Hamamı"],
    imageUrl: "/assets/prop-1.jpg",
    description: "Mülk sahibinin gizlilik talebi nedeniyle genel ilan sitelerine verilmemiştir. Sadece Selin Karaca VIP müşteri portföyüne özel olarak sunulmaktadır."
  },
  {
    id: "prop-vault-2",
    title: "Boğaz Hattında Özel Rıhtımlı Tarihi Yalı Dairesi",
    location: "Kandilli Sahil Hattı",
    price: "₺180.000.000",
    priceRaw: 180000000,
    type: "Off-Market Yalı",
    status: "Aktif",
    badge: "Özel Kasa",
    isOffMarket: true,
    bedrooms: "5+2",
    bathrooms: "5 Banyo",
    area: "620 m²",
    features: ["Özel Tekne İskelesi", "180° Kesintisiz Boğaz Manzarası", "Tarihi Tavan İşlemeleri", "2 Araçlık Kapalı Otopark"],
    imageUrl: "/assets/prop-2.jpg",
    description: "İstanbul Boğazı'nın en nadide tarihi yalılarından birinde, rıhtımlı ve tam müstakil girişli eşsiz bir aile mülkü."
  }
];

export const initialSubmissions = [
  {
    id: "sub-101",
    refCode: "SK-7842",
    createdAt: "2026-09-14T19:30:00Z",
    formattedDate: "14 Eylül 2026, 22:30",
    fullName: "Av. Cihan Soylu",
    phone: "+90 532 678 12 34",
    email: "cihan.soylu@law.com",
    inquiryType: "Mülkümü Satmak İstiyorum",
    propertyType: "Müstakil Villa",
    location: "Göktürk, Kemer Country Yakını",
    estimatedPrice: "₺65.000.000",
    bedrooms: "5+2",
    preferredContact: "Telefon (Öğleden sonra)",
    notes: "Ekim ayında yurt dışına taşınacağımız için Kemer bölgesindeki müstakil villamızı VIP alıcılarınıza sessiz portföy olarak sunmak istiyoruz.",
    status: "Yeni",
    adminNotes: "Acil portföy satışı. Yarın saat 14:00'te kahve eşliğinde ön görüşme için aranacak."
  },
  {
    id: "sub-102",
    refCode: "SK-5129",
    createdAt: "2026-09-13T14:15:00Z",
    formattedDate: "13 Eylül 2026, 17:15",
    fullName: "Merve & Alper Yalçın",
    phone: "+90 541 332 55 67",
    email: "alper.yalcin@invest.com",
    inquiryType: "Gayrimenkul / Portföy Arıyorum",
    propertyType: "Bahçe Dubleksi",
    location: "Kemerburgaz veya Göktürk Merkez",
    estimatedPrice: "₺28.000.000 - ₺35.000.000",
    bedrooms: "3+1 veya 4+1",
    preferredContact: "WhatsApp",
    notes: "Çocuklarımız için geniş bahçeli ve güvenliği tam olan bir sitede aile evi arayışındayız. Nakit alım planlıyoruz.",
    status: "Görüşüldü",
    adminNotes: "Telefonla görüşüldü. Kemerburgaz Lotus ve Göktürk portföy dosyası WhatsApp'tan iletildi."
  }
];
