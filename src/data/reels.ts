export interface Reel {
  id: string;
  titleEn: string;
  titleBn: string;
  url: string;
  thumbnail: string;
  duration?: string;
  viewsEn?: string;
  viewsBn?: string;
}

export const reels: Reel[] = [
  {
    id: "1",
    titleEn: "S & D Sweet Home Project Showcase",
    titleBn: "এস এন্ড ডি সুইট হোম প্রজেক্ট শোকেস",
    url: "https://web.facebook.com/reel/824775950325637",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    duration: "0:45",
    viewsEn: "14.2K views",
    viewsBn: "১৪.২কে ভিউ",
  },
  {
    id: "2",
    titleEn: "Luxury Apartment Tour & Interior Walkthrough",
    titleBn: "লাক্সারি অ্যাপার্টমেন্ট ট্যুর ও ইন্টেরিয়র ওয়াকথ্রু",
    url: "https://web.facebook.com/reel/2188412378588543",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    duration: "1:02",
    viewsEn: "9.8K views",
    viewsBn: "৯.৮কে ভিউ",
  },
  {
    id: "3",
    titleEn: "Modern Living Space & Design Exhibition",
    titleBn: "আধুনিক লিভিং স্পেস ও ডিজাইন প্রদর্শনী",
    url: "https://web.facebook.com/reel/967800219481579",
    thumbnail: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    duration: "0:55",
    viewsEn: "11.5K views",
    viewsBn: "১১.৫কে ভিউ",
  },
  {
    id: "4",
    titleEn: "Exquisite Apartment Interior Tour",
    titleBn: "অপূর্ব অ্যাপার্টমেন্ট ইন্টেরিয়র ট্যুর",
    url: "https://web.facebook.com/reel/1944950569483020",
    thumbnail: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80",
    duration: "0:38",
    viewsEn: "8.4K views",
    viewsBn: "৮.৪কে ভিউ",
  },
  {
    id: "5",
    titleEn: "Premium Construction Quality Showcase",
    titleBn: "প্রিমিয়াম নির্মাণ কাজের গুণগত মান প্রদর্শনী",
    url: "https://web.facebook.com/reel/1891843761519542",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    duration: "1:15",
    viewsEn: "16.8K views",
    viewsBn: "১৬.৮কে ভিউ",
  },
  {
    id: "6",
    titleEn: "Premium Project Handover Ceremony",
    titleBn: "প্রিমিয়াম প্রজেক্ট হস্তান্তর উদযাপন অনুষ্ঠান",
    url: "https://web.facebook.com/reel/2730710727302220",
    thumbnail: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80",
    duration: "1:30",
    viewsEn: "21.5K views",
    viewsBn: "২১.৫কে ভিউ",
  },
  {
    id: "7",
    titleEn: "Exclusive Residential Features Tour",
    titleBn: "এক্সক্লুসিভ আবাসিক প্রজেক্ট ফিচারস ট্যুর",
    url: "https://web.facebook.com/reel/3670169069791998",
    thumbnail: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    duration: "0:50",
    viewsEn: "7.2K views",
    viewsBn: "৭.২কে ভিউ",
  },
  {
    id: "8",
    titleEn: "Architectural Exterior Design Excellence",
    titleBn: "অনন্য স্থাপত্য বহিরাঙ্গন নকশা প্রদর্শনী",
    url: "https://web.facebook.com/reel/904257935706529",
    thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    duration: "0:48",
    viewsEn: "10.1K views",
    viewsBn: "১০.১কে ভিউ",
  },
  {
    id: "9",
    titleEn: "Smart Modern Home Amenities",
    titleBn: "স্মার্ট আধুনিক গৃহস্থালী সুবিধাসমূহ",
    url: "https://web.facebook.com/reel/2121263065316272",
    thumbnail: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
    duration: "0:42",
    viewsEn: "9.3K views",
    viewsBn: "৯.৩কে ভিউ",
  },
  {
    id: "10",
    titleEn: "Dhaka Luxury Property Walkthrough",
    titleBn: "ঢাকা লাক্সারি প্রপার্টি ওয়াকথ্রু",
    url: "https://web.facebook.com/reel/4314211078907177",
    thumbnail: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
    duration: "1:05",
    viewsEn: "13.9K views",
    viewsBn: "১৩.৯কে ভিউ",
  },
];

export const getFacebookEmbedUrl = (reelUrl: string) => {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(reelUrl)}&show_text=false&t=0`;
};
