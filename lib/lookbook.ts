export type LookbookCategory = "All" | "Braids" | "Wigs" | "Cornrows" | "Bridal" | "Natural Hair";

export type LookbookLook = {
  id: string;
  category: Exclude<LookbookCategory, "All">;
  title: string;
  shortTitle: string;
  image: string;
  alt: string;
  description: string;
  tags: string[];
  trend?: "Trending" | "Most loved" | "New" | "Kaykay pick";
  service: { label: string; slug: string; variant?: string };
  products?: { label: string; id: string }[];
  maintenance: string;
  idealFor: string;
};

export const lookbookCategories: LookbookCategory[] = ["All", "Braids", "Wigs", "Cornrows", "Bridal", "Natural Hair"];

export const lookbookLooks: LookbookLook[] = [
  {
    id: "waist-knotless",
    category: "Braids",
    title: "Waist-Length Knotless",
    shortTitle: "Waist Knotless",
    image: "/images/services/braiding/braids-1.webp",
    alt: "Long knotless braids styled by Kaykay Hair",
    description: "Lightweight knotless braids with a clean, polished fall. A high-impact protective style that still feels easy enough for everyday wear.",
    tags: ["Protective", "Long length", "Office to weekend"],
    trend: "Most loved",
    service: { label: "Book knotless braids", slug: "braiding", variant: "knotless-braids" },
    maintenance: "4–7 weeks",
    idealFor: "Busy weeks, travel and low-maintenance styling",
  },
  {
    id: "boho-braids",
    category: "Braids",
    title: "Soft Boho Braids",
    shortTitle: "Soft Boho",
    image: "/images/services/braiding/braids-2.webp",
    alt: "Soft boho braids with loose curled pieces",
    description: "A softer braid finish with loose movement through the lengths. Feminine, versatile and one of the easiest ways to make protective styling feel dressed up.",
    tags: ["Boho", "Soft glam", "Protective"],
    trend: "Trending",
    service: { label: "Request this braid look", slug: "braiding", variant: "boho-braids" },
    maintenance: "3–6 weeks",
    idealFor: "Dates, holidays, birthdays and everyday glam",
  },
  {
    id: "tribal-braids",
    category: "Braids",
    title: "Modern Tribal Detail",
    shortTitle: "Tribal Detail",
    image: "/images/services/braiding/braids-4.webp",
    alt: "Modern tribal braids with detailed parting",
    description: "Statement parting and strong pattern work bring traditional braid language into a sharp contemporary finish.",
    tags: ["Pattern", "Statement", "Protective"],
    trend: "Kaykay pick",
    service: { label: "Book tribal braids", slug: "braiding", variant: "fulani-tribal-braids" },
    maintenance: "3–5 weeks",
    idealFor: "Clients who want detail without sacrificing wearability",
  },
  {
    id: "sleek-cornrows",
    category: "Cornrows",
    title: "Sleek Feed-In Cornrows",
    shortTitle: "Feed-In Cornrows",
    image: "/images/services/cornrows/cornrows-2.webp",
    alt: "Sleek feed-in cornrows",
    description: "Clean lines, controlled tension and a crisp finish. A dependable protective look that transitions easily from work to weekend.",
    tags: ["Sleek", "Low maintenance", "Protective"],
    trend: "Trending",
    service: { label: "Book feed-in cornrows", slug: "cornrows", variant: "feed-in-cornrows" },
    maintenance: "2–4 weeks",
    idealFor: "Gym routines, work weeks and protective styling",
  },
  {
    id: "styled-cornrows",
    category: "Cornrows",
    title: "Sculpted Cornrow Lines",
    shortTitle: "Sculpted Lines",
    image: "/images/services/cornrows/cornrows-5.webp",
    alt: "Styled cornrows with sculpted line pattern",
    description: "A more expressive cornrow direction built around curved sections and graphic rhythm. Protective, but deliberately fashion-led.",
    tags: ["Graphic", "Creative", "Protective"],
    trend: "New",
    service: { label: "Request styled cornrows", slug: "cornrows", variant: "styled-cornrows" },
    maintenance: "2–4 weeks",
    idealFor: "A distinctive everyday look or content-ready finish",
  },
  {
    id: "lace-install",
    category: "Wigs",
    title: "Invisible Lace Melt",
    shortTitle: "Lace Melt",
    image: "/images/services/wig-installation/wig-installation-2.webp",
    alt: "Natural lace frontal wig installation",
    description: "A clean hairline, controlled density and polished finish designed to make the install feel effortless rather than overworked.",
    tags: ["Natural hairline", "Sleek", "Versatile"],
    trend: "Most loved",
    service: { label: "Book a lace install", slug: "wig-revamping-installations", variant: "lace-frontal-install" },
    products: [
      { label: "Shop straight wigs", id: "straight-hair-wigs" },
      { label: "Shop bob wigs", id: "bob-wigs" },
    ],
    maintenance: "2–4 weeks",
    idealFor: "A polished everyday finish with styling flexibility",
  },
  {
    id: "bob-energy",
    category: "Wigs",
    title: "Power Bob",
    shortTitle: "Power Bob",
    image: "/images/services/wig-installation/wig-installation-5.webp",
    alt: "Polished bob wig hairstyle",
    description: "Sharp, efficient and always put together. The bob is still one of the strongest options for women who want maximum polish with minimum styling time.",
    tags: ["Executive", "Short", "Easy styling"],
    trend: "Kaykay pick",
    service: { label: "Book wig installation", slug: "wig-revamping-installations", variant: "wig-installation" },
    products: [{ label: "Shop bob wigs", id: "bob-wigs" }],
    maintenance: "2–4 weeks",
    idealFor: "Work, travel and a consistently sharp silhouette",
  },
  {
    id: "curly-volume",
    category: "Wigs",
    title: "Soft Curly Volume",
    shortTitle: "Curly Volume",
    image: "/images/services/wig-installation/wig-installation-8.webp",
    alt: "Voluminous curly wig installation",
    description: "Full curls with a soft frame around the face. Big enough to feel special, controlled enough to stay sophisticated.",
    tags: ["Volume", "Curly", "Soft glam"],
    trend: "Trending",
    service: { label: "Book curly wig styling", slug: "wig-revamping-installations", variant: "wig-styling-only" },
    products: [{ label: "Shop curly wigs", id: "curly-hair-wigs" }],
    maintenance: "Refresh every 1–2 weeks",
    idealFor: "Events, weekends and clients who love volume",
  },
  {
    id: "bridal-soft-sculpt",
    category: "Bridal",
    title: "Soft Bridal Sculpt",
    shortTitle: "Bridal Sculpt",
    image: "/images/services/bridal-event/bridal-event-1.webp",
    alt: "Elegant bridal hairstyle",
    description: "Structured enough to photograph beautifully, soft enough to still feel like you. Built for long days, close-up moments and movement.",
    tags: ["Bridal", "Elegant", "Camera ready"],
    trend: "Most loved",
    service: { label: "Request bridal styling", slug: "bridal-event-hair", variant: "bridal-hair-styling" },
    maintenance: "Event day",
    idealFor: "Weddings, traditional ceremonies and formal events",
  },
  {
    id: "event-glam",
    category: "Bridal",
    title: "Modern Event Glam",
    shortTitle: "Event Glam",
    image: "/images/services/bridal-event/bridal-event-3.webp",
    alt: "Modern event hair styling",
    description: "A polished special-occasion finish that reads beautifully in person and on camera without feeling overly bridal.",
    tags: ["Event", "Polished", "Photogenic"],
    trend: "New",
    service: { label: "Book event hair", slug: "bridal-event-hair", variant: "event-hair-styling" },
    maintenance: "Event day",
    idealFor: "Birthdays, shoots, graduations and formal events",
  },
  {
    id: "silk-press",
    category: "Natural Hair",
    title: "Silk Press Movement",
    shortTitle: "Silk Press",
    image: "/images/services/hair-care/hair-care-4.webp",
    alt: "Healthy natural hair silk press",
    description: "Healthy hair is the point. A smooth, lightweight finish that keeps movement while showing off length, condition and shine.",
    tags: ["Natural hair", "Healthy shine", "Movement"],
    trend: "Trending",
    service: { label: "Book a silk press", slug: "hair-care", variant: "silk-press-blowout" },
    maintenance: "1–3 weeks",
    idealFor: "Length checks, trims, events and a polished natural finish",
  },
  {
    id: "healthy-reset",
    category: "Natural Hair",
    title: "Healthy Hair Reset",
    shortTitle: "Healthy Reset",
    image: "/images/services/hair-care/hair-care-2.webp",
    alt: "Healthy natural hair care treatment",
    description: "Treatment-first hair care for clients who want softness, strength and a healthier base before the next protective style.",
    tags: ["Treatment", "Hydration", "Hair health"],
    trend: "Kaykay pick",
    service: { label: "Book deep conditioning", slug: "hair-care", variant: "deep-conditioning-treatment" },
    maintenance: "Every 2–4 weeks",
    idealFor: "Dryness, post-protective-style recovery and regular maintenance",
  },
];

export const LOOKBOOK_STORAGE_KEY = "kaykayhair:lookbook:v1";

export type SavedLookbookState = {
  loved: string[];
  saved: string[];
};

export const emptyLookbookState: SavedLookbookState = { loved: [], saved: [] };
