// Landowner article imports — sourced from src/landowners
import jfTower from "@/landowners/S & D JF Tower.jpg";
import shohodoraPalace from "@/landowners/S & D,Shohodora Palace.jpg";
import nurjahanPalace from "@/landowners/S& D nurjahan Palace.jpg";
import bondhonTower from "@/landowners/S&D Bondhon tower.jpg";
import majedaGarden from "@/landowners/S&D Majeda Garden.jpg";
import safuraHeights from "@/landowners/S&D Safura Heights.jpg";

export type LandownerArticle = {
  id: string;
  projectNameEn: string;
  projectNameBn: string;
  slug: string;
  dateEn?: string;
  dateBn?: string;
  addressEn: string;
  addressBn: string;
  image: string;
  imageAltEn: string;
  imageAltBn: string;
  contentEn: {
    eyebrow: string;
    title: string;
    intro: string;
    beforeImage: string;
    afterImage: string;
    closing: string;
  };
  contentBn: {
    eyebrow: string;
    title: string;
    intro: string;
    beforeImage: string;
    afterImage: string;
    closing: string;
  };
};

export const landownerArticles: LandownerArticle[] = [
  {
    id: "jf-tower",
    projectNameEn: "S & D JF Tower",
    projectNameBn: "এস অ্যান্ড ডি জেএফ টাওয়ার",
    slug: "sd-jf-tower",
    addressEn: "Plot-21+23, Road-06, Block-D, Sector-02, Aftabnagar, Dhaka.",
    addressBn: "প্লট-২১+২৩, রোড-০৬, ব্লক-ডি, সেক্টর-০২, আফতাবনগর, ঢাকা।",
    image: jfTower,
    imageAltEn: "Signing ceremony for S & D JF Tower in Aftabnagar, Dhaka.",
    imageAltBn: "আফতাবনগর, ঢাকায় এস অ্যান্ড ডি জেএফ টাওয়ার প্রকল্পের চুক্তি স্বাক্ষর অনুষ্ঠান।",
    contentEn: {
      eyebrow: "Signing Ceremony",
      title: "Signing Ceremony — S & D JF Tower",
      intro:
        "A signing ceremony was held for S & D JF Tower, a residential development located at Plot-21+23, Road-06, Block-D, Sector-02, Aftabnagar, Dhaka.",
      beforeImage:
        "The ceremony marked the formal agreement between the landowners and S & D Sweet Home Developers Ltd. for the development of the project. Representatives from both sides were present during the signing.",
      afterImage:
        "The project location in Aftabnagar provides access to an established residential area of Dhaka. The signing reflects the beginning of a planned development process based on mutual understanding, documentation, and professional coordination.",
      closing:
        "S & D Sweet Home Developers Ltd. will continue the required planning and development steps according to applicable approvals, design requirements, and project timelines.",
    },
    contentBn: {
      eyebrow: "চুক্তি স্বাক্ষর",
      title: "চুক্তি স্বাক্ষর অনুষ্ঠান — এস অ্যান্ড ডি জেএফ টাওয়ার",
      intro:
        "এস অ্যান্ড ডি জেএফ টাওয়ার প্রকল্পের জন্য একটি চুক্তি স্বাক্ষর অনুষ্ঠান অনুষ্ঠিত হয়েছে। প্রকল্পটির অবস্থান প্লট-২১+২৩, রোড-০৬, ব্লক-ডি, সেক্টর-০২, আফতাবনগর, ঢাকা।",
      beforeImage:
        "এই অনুষ্ঠানের মাধ্যমে ভূমির মালিকগণ এবং এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের মধ্যে প্রকল্প উন্নয়ন সংক্রান্ত আনুষ্ঠানিক চুক্তি সম্পন্ন হয়। স্বাক্ষর অনুষ্ঠানে উভয় পক্ষের প্রতিনিধিরা উপস্থিত ছিলেন।",
      afterImage:
        "আফতাবনগরের একটি প্রতিষ্ঠিত আবাসিক এলাকায় প্রকল্পটির অবস্থান হওয়ায় এটি পরিকল্পিত আবাসন উন্নয়নের জন্য গুরুত্বপূর্ণ। পারস্পরিক সমঝোতা, প্রয়োজনীয় নথিপত্র এবং পেশাদার সমন্বয়ের ভিত্তিতে প্রকল্পের কার্যক্রম এগিয়ে নেওয়ার সূচনা হিসেবে এই চুক্তি সম্পন্ন হয়।",
      closing:
        "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড প্রযোজ্য অনুমোদন, নকশা প্রয়োজনীয়তা এবং প্রকল্প পরিকল্পনা অনুযায়ী পরবর্তী উন্নয়ন কার্যক্রম পরিচালনা করবে।",
    },
  },
  {
    id: "shohodora-palace",
    projectNameEn: "S & D Shohodora Palace",
    projectNameBn: "এস অ্যান্ড ডি সহোদরা প্যালেস",
    slug: "sd-shohodora-palace",
    addressEn: "Holding No-5057, 5058, Khilgaon, Dhaka.",
    addressBn: "হোল্ডিং নং-৫০৫৭, ৫০৫৮, খিলগাঁও, ঢাকা।",
    image: shohodoraPalace,
    imageAltEn: "Signing ceremony for S & D Shohodora Palace in Khilgaon, Dhaka.",
    imageAltBn: "খিলগাঁও, ঢাকায় এস অ্যান্ড ডি সহোদরা প্যালেস প্রকল্পের চুক্তি স্বাক্ষর অনুষ্ঠান।",
    contentEn: {
      eyebrow: "Signing Ceremony",
      title: "Signing Ceremony — S & D Shohodora Palace",
      intro:
        "A signing ceremony was arranged for S & D Shohodora Palace, a residential project located at Holding No-5057 and 5058, Khilgaon, Dhaka.",
      beforeImage:
        "The event confirmed the formal understanding between the landowners and S & D Sweet Home Developers Ltd. regarding the development of the property. The signing was completed in the presence of representatives connected with the project.",
      afterImage:
        "The Khilgaon location places the project within an active residential area of Dhaka. The ceremony represents an important administrative step before further planning, approval, and development work.",
      closing:
        "S & D Sweet Home Developers Ltd. will proceed with the project through a structured development process, maintaining necessary documentation and coordination with relevant stakeholders.",
    },
    contentBn: {
      eyebrow: "চুক্তি স্বাক্ষর",
      title: "চুক্তি স্বাক্ষর অনুষ্ঠান — এস অ্যান্ড ডি সহোদরা প্যালেস",
      intro:
        "এস অ্যান্ড ডি সহোদরা প্যালেস প্রকল্পের জন্য একটি চুক্তি স্বাক্ষর অনুষ্ঠান আয়োজন করা হয়। প্রকল্পটির অবস্থান হোল্ডিং নং-৫০৫৭ ও ৫০৫৮, খিলগাঁও, ঢাকা।",
      beforeImage:
        "এই অনুষ্ঠানের মাধ্যমে ভূমির মালিকগণ এবং এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের মধ্যে সংশ্লিষ্ট সম্পত্তি উন্নয়ন বিষয়ে আনুষ্ঠানিক সমঝোতা নিশ্চিত হয়। প্রকল্পের সঙ্গে সংশ্লিষ্ট প্রতিনিধিদের উপস্থিতিতে চুক্তি স্বাক্ষর সম্পন্ন হয়।",
      afterImage:
        "খিলগাঁও ঢাকার একটি সক্রিয় আবাসিক এলাকা। এই অবস্থানে প্রকল্পটির উন্নয়ন কার্যক্রম শুরু করার আগে চুক্তি স্বাক্ষর অনুষ্ঠানটি একটি গুরুত্বপূর্ণ প্রশাসনিক ধাপ হিসেবে বিবেচিত।",
      closing:
        "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড প্রয়োজনীয় নথিপত্র, পরিকল্পনা এবং সংশ্লিষ্ট অংশীজনের সঙ্গে সমন্বয়ের মাধ্যমে প্রকল্পের পরবর্তী কার্যক্রম পরিচালনা করবে।",
    },
  },
  {
    id: "nurjahan-palace",
    projectNameEn: "S & D Nurjahan Palace",
    projectNameBn: "এস অ্যান্ড ডি নূরজাহান প্যালেস",
    slug: "sd-nurjahan-palace",
    addressEn: "Aftabnagar, Dhaka.",
    addressBn: "আফতাবনগর, ঢাকা।",
    image: nurjahanPalace,
    imageAltEn: "Signing ceremony for S & D Nurjahan Palace in Aftabnagar, Dhaka.",
    imageAltBn: "আফতাবনগর, ঢাকায় এস অ্যান্ড ডি নূরজাহান প্যালেস প্রকল্পের চুক্তি স্বাক্ষর অনুষ্ঠান।",
    contentEn: {
      eyebrow: "Signing Ceremony",
      title: "Signing Ceremony — S & D Nurjahan Palace",
      intro:
        "A signing ceremony was conducted for S & D Nurjahan Palace, a residential development project located in Aftabnagar, Dhaka.",
      beforeImage:
        "The ceremony established a formal development agreement between the landowners and S & D Sweet Home Developers Ltd. Representatives from both parties attended and completed the signing process.",
      afterImage:
        "Aftabnagar is an established residential locality in Dhaka, providing a suitable setting for planned residential development. This signing ceremony marks the formal commencement of the development coordination process.",
      closing:
        "S & D Sweet Home Developers Ltd. will undertake subsequent development steps in accordance with the applicable regulatory requirements, design specifications, and project planning schedules.",
    },
    contentBn: {
      eyebrow: "চুক্তি স্বাক্ষর",
      title: "চুক্তি স্বাক্ষর অনুষ্ঠান — এস অ্যান্ড ডি নূরজাহান প্যালেস",
      intro:
        "এস অ্যান্ড ডি নূরজাহান প্যালেস প্রকল্পের জন্য একটি চুক্তি স্বাক্ষর অনুষ্ঠান পরিচালিত হয়। প্রকল্পটির অবস্থান আফতাবনগর, ঢাকায়।",
      beforeImage:
        "এই অনুষ্ঠানের মাধ্যমে ভূমির মালিকগণ এবং এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডের মধ্যে একটি আনুষ্ঠানিক উন্নয়ন চুক্তি প্রতিষ্ঠিত হয়। উভয় পক্ষের প্রতিনিধিরা উপস্থিত হয়ে স্বাক্ষর প্রক্রিয়া সম্পন্ন করেন।",
      afterImage:
        "আফতাবনগর ঢাকার একটি প্রতিষ্ঠিত আবাসিক এলাকা, যা পরিকল্পিত আবাসিক উন্নয়নের জন্য উপযুক্ত। এই চুক্তি স্বাক্ষর অনুষ্ঠানটি উন্নয়ন সমন্বয় প্রক্রিয়ার আনুষ্ঠানিক সূচনা নির্দেশ করে।",
      closing:
        "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড প্রযোজ্য নিয়ন্ত্রক প্রয়োজনীয়তা, নকশার বিবরণ এবং প্রকল্প পরিকল্পনার সময়সূচি অনুযায়ী পরবর্তী উন্নয়নের পদক্ষেপ গ্রহণ করবে।",
    },
  },
  {
    id: "bondhon-tower",
    projectNameEn: "S & D Bondhon Tower",
    projectNameBn: "এস অ্যান্ড ডি বন্ধন টাওয়ার",
    slug: "sd-bondhon-tower",
    addressEn: "Dhaka.",
    addressBn: "ঢাকা।",
    image: bondhonTower,
    imageAltEn: "Signing ceremony for S & D Bondhon Tower.",
    imageAltBn: "এস অ্যান্ড ডি বন্ধন টাওয়ার প্রকল্পের চুক্তি স্বাক্ষর অনুষ্ঠান।",
    contentEn: {
      eyebrow: "Signing Ceremony",
      title: "Signing Ceremony — S & D Bondhon Tower",
      intro:
        "A signing ceremony was held for S & D Bondhon Tower, a residential project developed by S & D Sweet Home Developers Ltd.",
      beforeImage:
        "The event marked the formal agreement process between the landowners and the developer. Both parties were represented during the ceremony, and the signing was completed in an orderly manner.",
      afterImage:
        "The signing ceremony serves as the foundational administrative step that enables structured planning, regulatory coordination, and professional project management to proceed.",
      closing:
        "S & D Sweet Home Developers Ltd. will carry forward the necessary planning and coordination for the project in accordance with approved requirements and applicable development guidelines.",
    },
    contentBn: {
      eyebrow: "চুক্তি স্বাক্ষর",
      title: "চুক্তি স্বাক্ষর অনুষ্ঠান — এস অ্যান্ড ডি বন্ধন টাওয়ার",
      intro:
        "এস অ্যান্ড ডি বন্ধন টাওয়ার প্রকল্পের জন্য একটি চুক্তি স্বাক্ষর অনুষ্ঠান অনুষ্ঠিত হয়। প্রকল্পটি এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড কর্তৃক উন্নয়নাধীন।",
      beforeImage:
        "এই অনুষ্ঠানটি ভূমির মালিকগণ এবং ডেভেলপারের মধ্যে আনুষ্ঠানিক চুক্তি প্রক্রিয়াকে চিহ্নিত করে। উভয় পক্ষের প্রতিনিধিত্ব নিশ্চিত করে সুশৃঙ্খলভাবে স্বাক্ষর কার্যক্রম সম্পন্ন হয়।",
      afterImage:
        "এই চুক্তি স্বাক্ষর অনুষ্ঠানটি মৌলিক প্রশাসনিক পদক্ষেপ হিসেবে কাজ করে, যা পরিকল্পনা, নিয়ন্ত্রক সমন্বয় এবং পেশাদার প্রকল্প ব্যবস্থাপনা পরিচালনাকে সক্ষম করে।",
      closing:
        "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড অনুমোদিত প্রয়োজনীয়তা এবং প্রযোজ্য উন্নয়ন নির্দেশিকা অনুযায়ী প্রকল্পের জন্য প্রয়োজনীয় পরিকল্পনা ও সমন্বয় কার্যক্রম এগিয়ে নিয়ে যাবে।",
    },
  },
  {
    id: "majeda-garden",
    projectNameEn: "S & D Majeda Garden",
    projectNameBn: "এস অ্যান্ড ডি মাজেদা গার্ডেন",
    slug: "sd-majeda-garden",
    addressEn: "Dhaka.",
    addressBn: "ঢাকা।",
    image: majedaGarden,
    imageAltEn: "Signing ceremony for S & D Majeda Garden.",
    imageAltBn: "এস অ্যান্ড ডি মাজেদা গার্ডেন প্রকল্পের চুক্তি স্বাক্ষর অনুষ্ঠান।",
    contentEn: {
      eyebrow: "Signing Ceremony",
      title: "Signing Ceremony — S & D Majeda Garden",
      intro:
        "A signing ceremony was organised for S & D Majeda Garden, a residential development project by S & D Sweet Home Developers Ltd.",
      beforeImage:
        "The ceremony formalised the agreement between the landowners and the company regarding the planned development of the property. All parties connected with the project were present during the signing.",
      afterImage:
        "This agreement represents an important step in the development timeline, allowing S & D Sweet Home Developers Ltd. to begin the required coordination, planning, and regulatory processes for the project.",
      closing:
        "The company will proceed with the project following the appropriate development procedures, approvals, and timelines established through the agreement.",
    },
    contentBn: {
      eyebrow: "চুক্তি স্বাক্ষর",
      title: "চুক্তি স্বাক্ষর অনুষ্ঠান — এস অ্যান্ড ডি মাজেদা গার্ডেন",
      intro:
        "এস অ্যান্ড ডি মাজেদা গার্ডেন প্রকল্পের জন্য একটি চুক্তি স্বাক্ষর অনুষ্ঠান আয়োজন করা হয়। প্রকল্পটি এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড কর্তৃক পরিকল্পিত।",
      beforeImage:
        "এই অনুষ্ঠানটি ভূমির মালিকগণ এবং কোম্পানির মধ্যে সম্পত্তির পরিকল্পিত উন্নয়ন সংক্রান্ত চুক্তিকে আনুষ্ঠানিক রূপ দেয়। প্রকল্পের সঙ্গে সংশ্লিষ্ট সকল পক্ষ স্বাক্ষর অনুষ্ঠানে উপস্থিত ছিলেন।",
      afterImage:
        "এই চুক্তি উন্নয়ন সময়সীমার একটি গুরুত্বপূর্ণ পদক্ষেপ হিসেবে কাজ করে, যা এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেডকে প্রকল্পের জন্য প্রয়োজনীয় সমন্বয়, পরিকল্পনা এবং নিয়ন্ত্রক প্রক্রিয়া শুরু করার সুযোগ দেয়।",
      closing:
        "চুক্তির মাধ্যমে প্রতিষ্ঠিত উপযুক্ত উন্নয়ন পদ্ধতি, অনুমোদন এবং সময়সূচি অনুসরণ করে কোম্পানি প্রকল্পটি এগিয়ে নিয়ে যাবে।",
    },
  },
  {
    id: "safura-heights",
    projectNameEn: "S & D Safura Heights",
    projectNameBn: "এস অ্যান্ড ডি সাফুরা হাইটস",
    slug: "sd-safura-heights",
    addressEn: "Dhaka.",
    addressBn: "ঢাকা।",
    image: safuraHeights,
    imageAltEn: "Signing ceremony for S & D Safura Heights.",
    imageAltBn: "এস অ্যান্ড ডি সাফুরা হাইটস প্রকল্পের চুক্তি স্বাক্ষর অনুষ্ঠান।",
    contentEn: {
      eyebrow: "Signing Ceremony",
      title: "Signing Ceremony — S & D Safura Heights",
      intro:
        "A signing ceremony took place for S & D Safura Heights, a residential development project undertaken by S & D Sweet Home Developers Ltd.",
      beforeImage:
        "The ceremony documented the formal agreement reached between the landowners and the developer for the planned development of the site. Representatives from both parties were present at the signing.",
      afterImage:
        "The completion of this signing ceremony formally initiates the development partnership and allows the required planning, design, and approval processes to proceed in a coordinated manner.",
      closing:
        "S & D Sweet Home Developers Ltd. will continue with the project according to the relevant regulatory requirements, planning documentation, and agreed development timelines.",
    },
    contentBn: {
      eyebrow: "চুক্তি স্বাক্ষর",
      title: "চুক্তি স্বাক্ষর অনুষ্ঠান — এস অ্যান্ড ডি সাফুরা হাইটস",
      intro:
        "এস অ্যান্ড ডি সাফুরা হাইটস প্রকল্পের জন্য একটি চুক্তি স্বাক্ষর অনুষ্ঠান অনুষ্ঠিত হয়। প্রকল্পটি এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড কর্তৃক পরিচালিত।",
      beforeImage:
        "এই অনুষ্ঠানটি স্থানটির পরিকল্পিত উন্নয়নের জন্য ভূমির মালিকগণ এবং ডেভেলপারের মধ্যে অর্জিত আনুষ্ঠানিক চুক্তিকে নথিভুক্ত করে। উভয় পক্ষের প্রতিনিধিরা স্বাক্ষর অনুষ্ঠানে উপস্থিত ছিলেন।",
      afterImage:
        "এই স্বাক্ষর অনুষ্ঠানের সমাপ্তি আনুষ্ঠানিকভাবে উন্নয়ন অংশীদারিত্ব শুরু করে এবং প্রয়োজনীয় পরিকল্পনা, নকশা এবং অনুমোদন প্রক্রিয়াগুলো সমন্বিতভাবে এগিয়ে নেওয়ার সুযোগ দেয়।",
      closing:
        "এস অ্যান্ড ডি সুইট হোম ডেভেলপারস লিমিটেড প্রাসঙ্গিক নিয়ন্ত্রক প্রয়োজনীয়তা, পরিকল্পনা নথিপত্র এবং সম্মত উন্নয়ন সময়সূচি অনুযায়ী প্রকল্পটি পরিচালনা করবে।",
    },
  },
];
