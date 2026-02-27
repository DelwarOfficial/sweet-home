export interface Project {
  slug: string;
  name: string;
  nameBn: string;
  location: string;
  locationBn: string;
  status: "ongoing" | "upcoming" | "completed";
  flatSize: string;
  landArea: string;
  floors: string;
  facing: string;
  amenities: string[];
  description: string;
  descriptionBn: string;
  image: string;
}

export const projects: Project[] = [
  {
    slug: "bondhon-tower",
    name: "Bondhon Tower",
    nameBn: "বন্ধন টাওয়ার",
    location: "Aftabnagar, Dhaka",
    locationBn: "আফতাবনগর, ঢাকা",
    status: "ongoing",
    flatSize: "1,350 - 1,550 sqft",
    landArea: "5 Katha",
    floors: "10 Floors",
    facing: "South-East",
    amenities: ["Elevator", "Generator", "Parking", "Rooftop Garden", "Security"],
    description: "A premium residential project in the heart of Aftabnagar with modern amenities and elegant design.",
    descriptionBn: "আফতাবনগরের প্রাণকেন্দ্রে আধুনিক সুযোগ-সুবিধা ও মার্জিত নকশা সহ একটি প্রিমিয়াম আবাসিক প্রকল্প।",
    image: "",
  },
  {
    slug: "laila-garden",
    name: "Laila Garden",
    nameBn: "লাইলা গার্ডেন",
    location: "Chandpur",
    locationBn: "চাঁদপুর",
    status: "completed",
    flatSize: "1,200 - 1,400 sqft",
    landArea: "6 Katha",
    floors: "8 Floors",
    facing: "South",
    amenities: ["Elevator", "Generator", "Parking", "Community Hall"],
    description: "A beautifully completed residential complex in Chandpur offering spacious living in a serene environment.",
    descriptionBn: "চাঁদপুরে একটি সুন্দরভাবে সম্পন্ন আবাসিক কমপ্লেক্স যা শান্ত পরিবেশে প্রশস্ত জীবনযাপনের সুযোগ দেয়।",
    image: "",
  },
  {
    slug: "fm-tower",
    name: "FM Tower",
    nameBn: "এফএম টাওয়ার",
    location: "Aftabnagar, Dhaka",
    locationBn: "আফতাবনগর, ঢাকা",
    status: "ongoing",
    flatSize: "1,100 - 1,300 sqft",
    landArea: "4.5 Katha",
    floors: "9 Floors",
    facing: "West",
    amenities: ["Elevator", "Generator", "Parking", "Gym", "Security"],
    description: "Modern urban living with premium finishes and strategic location near key amenities.",
    descriptionBn: "প্রধান সুবিধার কাছে কৌশলগত অবস্থান সহ প্রিমিয়াম ফিনিশিং সহ আধুনিক শহুরে জীবনযাপন।",
    image: "",
  },
  {
    slug: "giash-garden",
    name: "Giash Garden",
    nameBn: "গিয়াশ গার্ডেন",
    location: "Chandpur",
    locationBn: "চাঁদপুর",
    status: "upcoming",
    flatSize: "1,250 - 1,500 sqft",
    landArea: "7 Katha",
    floors: "10 Floors",
    facing: "North-South",
    amenities: ["Elevator", "Generator", "Parking", "Playground", "Rooftop Garden"],
    description: "An upcoming landmark project in Chandpur with spacious apartments and lush green surroundings.",
    descriptionBn: "চাঁদপুরে প্রশস্ত অ্যাপার্টমেন্ট এবং সবুজ পরিবেশ সহ একটি আসন্ন ল্যান্ডমার্ক প্রকল্প।",
    image: "",
  },
  {
    slug: "safura-heights",
    name: "Safura Heights",
    nameBn: "সাফুরা হাইটস",
    location: "Aftabnagar, Dhaka",
    locationBn: "আফতাবনগর, ঢাকা",
    status: "completed",
    flatSize: "1,400 - 1,600 sqft",
    landArea: "5.5 Katha",
    floors: "11 Floors",
    facing: "East",
    amenities: ["Elevator", "Generator", "Parking", "Swimming Pool", "Gym", "Security"],
    description: "A prestigious completed project offering luxury living with world-class amenities.",
    descriptionBn: "বিশ্বমানের সুবিধা সহ বিলাসবহুল জীবনযাপনের প্রস্তাব দেওয়া একটি মর্যাদাপূর্ণ সম্পন্ন প্রকল্প।",
    image: "",
  },
  {
    slug: "sardar-palace",
    name: "Sardar Palace",
    nameBn: "সর্দার প্যালেস",
    location: "Chandpur",
    locationBn: "চাঁদপুর",
    status: "completed",
    flatSize: "1,300 - 1,450 sqft",
    landArea: "6 Katha",
    floors: "8 Floors",
    facing: "South-West",
    amenities: ["Elevator", "Generator", "Parking", "Community Hall"],
    description: "A regal residential project reflecting elegance and comfort in the heart of Chandpur.",
    descriptionBn: "চাঁদপুরের প্রাণকেন্দ্রে কমনীয়তা এবং আরামের প্রতিফলন করা একটি রাজকীয় আবাসিক প্রকল্প।",
    image: "",
  },
];
