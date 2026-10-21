export type VehicleCategory = "SUV" | "Pickup";

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  image: string;
  imageAlt: string;
}

export const conceptImages = {
  hero: "/images/vehicles/toyota-prado-black-onyx.jpg",
  heroVideo: "/videos/swift-drive-hero.mp4",
  road: "/images/editorial/mercedes-eqs-interior.jpg",
  suv: "/images/vehicles/toyota-prado-white-2025.jpg",
  blackHilux: "/images/vehicles/toyota-hilux-black-2024.jpg",
  whiteHilux: "/images/vehicles/toyota-hilux-white-2024.jpg",
  sprinter: "/images/vehicles/mercedes-sprinter-black.jpg",
  coach: "/images/vehicles/executive-coach.jpg",
};

export const businessConfig = {
  // Set to the business WhatsApp number in international digits only (for example, 2348012345678).
  // Leave empty until the number has been verified by the business owner.
  whatsappNumber: "",
  phoneNumber: "",
  emailAddress: "",
  address: "",
  confirmedServices: [] as string[],
  locations: [
    { name: "Abuja", verified: false },
    { name: "Benin", verified: false },
  ],
} as const;

export const candidateVehicles: Vehicle[] = [
  {
    id: "toyota-prado",
    name: "Toyota Prado",
    category: "SUV",
    image: conceptImages.suv,
    imageAlt: "White 2025 Toyota Land Cruiser Prado 250 reference photograph; not a verified Swift Drive vehicle.",
  },
  {
    id: "toyota-hilux",
    name: "Toyota Hilux",
    category: "Pickup",
    image: conceptImages.blackHilux,
    imageAlt: "Black 2024 Toyota Hilux reference photograph; not a verified Swift Drive vehicle.",
  },
  {
    id: "lexus-gx-460",
    name: "Lexus GX 460",
    category: "SUV",
    image: "/images/vehicles/lexus-gx-460.jpg",
    imageAlt: "Lexus GX 460 reference photograph; not a verified Swift Drive vehicle.",
  },
  {
    id: "toyota-rav4",
    name: "Toyota RAV4",
    category: "SUV",
    image: "/images/vehicles/toyota-rav4.jpg",
    imageAlt: "Toyota RAV4 reference photograph; not a verified Swift Drive vehicle.",
  },
];
