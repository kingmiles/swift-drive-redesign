export type VehicleCategory = "SUV" | "Pickup";

export interface Vehicle {
  id: string;
  name: string;
  category: VehicleCategory;
  image: string;
  imageAlt: string;
}

export const conceptImages = {
  hero: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90",
  road: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=2000&q=85",
  suv: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=85",
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
    imageAlt: "Illustrative premium SUV; the specific vehicle is not verified.",
  },
  {
    id: "toyota-hilux",
    name: "Toyota Hilux",
    category: "Pickup",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Illustrative pickup truck; the specific vehicle is not verified.",
  },
  {
    id: "lexus-gx-460",
    name: "Lexus GX 460",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Illustrative luxury SUV; the specific vehicle is not verified.",
  },
  {
    id: "toyota-rav4",
    name: "Toyota RAV4",
    category: "SUV",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1000&q=85",
    imageAlt: "Illustrative crossover vehicle; the specific vehicle is not verified.",
  },
];
