export const initialStandardProfile = {
  name: "Deniz Arslan",
  companyName: "Butik Gayrimenkul",
  title: "Butik Gayrimenkul",
  region: "Urla • Çeşme • Alaçatı • Bodrum",
  phone: "+90 532 411 20 26",
  email: "deniz@butikgayrimenkul.com",
  officeAddress: "Keklicek Mevkii No: 18, Urla / İzmir",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  badge: "Butik Danışmanlık • Maksimum 15 Seçkin Portföy",
  headline: "Karakterli Evler, Sakin Yaşamlar.",
  subheadline: "Yüzlerce ilanın arasında kaybolmayın. Ege ve Akdeniz'in huzurlu lokasyonlarında, mimarisi ve tapusu doğrulanmış seçkin mülklerle Butik Gayrimenkul güvencesiyle yalnızca size özel çalışıyorum.",
  googleReviews: {
    score: "4.9",
    totalReviews: 148,
    satisfactionRate: "%100"
  }
};

export const initialStandardListings = [
  {
    id: 1,
    title: "Urla Keklicek Zeytinlikli Müstakil Taş Konak",
    location: "Urla, İzmir",
    price: "₺24.500.000",
    priceRaw: 24500000,
    type: "Taş Villa",
    specs: "4+1 • 340 m² • 800 m² Bahçe",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    tag: "Seçkin Portföy",
    status: "Aktif"
  },
  {
    id: 2,
    title: "Alaçatı Hacımemiş Butik Bahçe Evi",
    location: "Alaçatı, Çeşme",
    price: "₺19.800.000",
    priceRaw: 19800000,
    type: "Butik Konut",
    specs: "3+1 • 210 m² • Havuzlu",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    tag: "Yeni Portföy",
    status: "Aktif"
  },
  {
    id: 3,
    title: "Bodrum Gümüşlük Gün Batımı Manzaralı Rezidans",
    location: "Gümüşlük, Bodrum",
    price: "₺16.400.000",
    priceRaw: 16400000,
    type: "Teras Daire",
    specs: "2+1 • 140 m² • Panoramik Deniz",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    tag: "Doğrudan Deniz",
    status: "Aktif"
  },
  {
    id: 4,
    title: "Eski Foça Sahil Hattı Restore Edilmiş Rum Evi",
    location: "Foça, İzmir",
    price: "₺14.200.000",
    priceRaw: 14200000,
    type: "Tarihi Konut",
    specs: "3+1 • 185 m² • Avlulu",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    tag: "Tarihi Doku",
    status: "Satıldı"
  }
];

export const initialStandardSubmissions = [
  {
    id: "sub-da-101",
    refCode: "DA-3921",
    createdAt: "2026-09-14T18:40:00Z",
    formattedDate: "14 Eylül 2026, 21:40",
    fullName: "Dr. Murat Aydın",
    phone: "+90 533 210 44 88",
    email: "murat.aydin@med.com",
    inquiryType: "Mülkümü Satmak İstiyorum",
    propertyType: "Taş Konak",
    location: "Urla Keklicek",
    estimatedPrice: "₺28.000.000",
    preferredContact: "Telefon (Akşam üzeri)",
    notes: "Zeytinlik içindeki taş konağımızı Deniz Bey'in butik portföyüne dahil etmek istiyoruz.",
    status: "Yeni"
  },
  {
    id: "sub-da-102",
    refCode: "DA-1854",
    createdAt: "2026-09-13T11:20:00Z",
    formattedDate: "13 Eylül 2026, 14:20",
    fullName: "Elif & Can Demir",
    phone: "+90 542 901 33 12",
    email: "elif.demir@design.com",
    inquiryType: "Portföy Arıyorum",
    propertyType: "Butik Bahçe Evi",
    location: "Alaçatı Hacımemiş",
    estimatedPrice: "₺18.000.000 - ₺22.000.000",
    preferredContact: "WhatsApp",
    notes: "Geniş avlulu, Alaçatı mimarisine sadık kalınmış butik aile evi arıyoruz.",
    status: "Görüşüldü"
  }
];
