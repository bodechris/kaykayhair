export type TransformationCategory = "All" | "Hair + Makeup" | "Wigs" | "Braids" | "Hair Care" | "Bridal";

export type Transformation = {
  id: string;
  category: Exclude<TransformationCategory, "All">;
  title: string;
  eyebrow: string;
  story: string;
  beforeImage: string;
  afterImage: string;
  service: { label: string; slug: string; variant?: string };
  products?: { label: string; id: string }[];
  carePlusFit?: string;
  tags: string[];
  result: string;
  time: string;
  featured?: boolean;
};

export const transformationCategories: TransformationCategory[] = ["All", "Hair + Makeup", "Wigs", "Braids", "Hair Care", "Bridal"];

// Replace these image pairs with verified Kaykay Hair client before/after sets before launch.
export const transformations: Transformation[] = [
  {
    id: "full-glam-reset",
    category: "Hair + Makeup",
    title: "Hair done. Makeup done. Ready for the whole day.",
    eyebrow: "Hair + soft glam",
    story: "For birthdays, dinners, shoots and special plans when you want to arrive fully put together. Polished hair and soft glam are finished together so you look like yourself — just more refined and camera-ready.",
    beforeImage: "/images/services/hair-care/hair-care-1.webp",
    afterImage: "/images/services/makeup/makeup-1.webp",
    service: { label: "Request hair + makeup", slug: "bridal-event-hair", variant: "event-hair-styling" },
    tags: ["Soft glam", "Polished hair", "Event ready"],
    result: "Complete polished finish",
    time: "Approx. 3–4 hours",
    featured: true,
  },
  {
    id: "lace-melt-moment",
    category: "Wigs",
    title: "A lace install that actually looks like your hairline.",
    eyebrow: "Lace frontal install",
    story: "For the woman who wants a wig to look polished without looking obvious. The focus is a clean melt, natural-looking hairline, controlled density and styling that still moves like real hair.",
    beforeImage: "/images/services/wig-installation/wig-installation-1.webp",
    afterImage: "/images/services/wig-installation/wig-installation-2.webp",
    service: { label: "Book a lace install", slug: "wig-revamping-installations", variant: "lace-frontal-install" },
    products: [{ label: "Shop straight wigs", id: "straight-hair-wigs" }, { label: "Shop bob wigs", id: "bob-wigs" }],
    tags: ["Natural hairline", "Sleek", "Everyday luxury"],
    result: "Softer hairline + polished finish",
    time: "Approx. 2–3 hours",
    featured: true,
  },
  {
    id: "knotless-switch-up",
    category: "Braids",
    title: "Weeks of looking done without doing your hair every morning.",
    eyebrow: "Knotless braids",
    story: "A high-impact protective style for busy weeks, travel and everyday life. Clean parts, lighter tension and statement length give you a finished look that needs very little daily styling.",
    beforeImage: "/images/services/hair-care/hair-care-3.webp",
    afterImage: "/images/services/braiding/braids-1.webp",
    service: { label: "Book knotless braids", slug: "braiding", variant: "knotless-braids" },
    tags: ["Protective", "Long length", "Low daily effort"],
    result: "High-impact protective style",
    time: "Approx. 4–7 hours",
    featured: true,
  },
  {
    id: "bridal-complete",
    category: "Bridal",
    title: "Still you — just bridal, polished and photo-ready.",
    eyebrow: "Bridal hair + beauty",
    story: "Hair and beauty designed around your dress, face and the way you want to feel walking in. The finish is made for close-up photos, a long day and all the emotion that comes with it.",
    beforeImage: "/images/services/bridal-event/bridal-event-2.webp",
    afterImage: "/images/services/bridal-event/bridal-event-1.webp",
    service: { label: "Request bridal styling", slug: "bridal-event-hair", variant: "bridal-hair-styling" },
    tags: ["Bridal", "Camera ready", "Long-wear finish"],
    result: "Soft sculpt + event polish",
    time: "Consultation-led",
    featured: true,
  },
  {
    id: "healthy-hair-revival",
    category: "Hair Care",
    title: "Dry, difficult hair back to soft and manageable.",
    eyebrow: "Deep treatment + finish",
    story: "When your natural hair feels dry, tangled or hard to manage, the goal is not to hide it. Moisture, careful detangling and conditioning bring back softness, shine and easier styling.",
    beforeImage: "/images/services/hair-care/hair-care-1.webp",
    afterImage: "/images/services/hair-care/hair-care-4.webp",
    service: { label: "Book a healthy-hair reset", slug: "hair-care", variant: "deep-conditioning-treatment" },
    carePlusFit: "Ideal for Care+ monthly maintenance",
    tags: ["Hydration", "Shine", "Hair health"],
    result: "Softer, healthier-looking hair",
    time: "Approx. 1.5–2 hours",
  },
  {
    id: "bob-power-shift",
    category: "Wigs",
    title: "A sharp bob for mornings when you need to look ready fast.",
    eyebrow: "Bob wig install",
    story: "Clean shape, neat ends and a natural-looking install give you an easy work-to-weekend style. Minimal morning effort, strong polish and a silhouette that always looks intentional.",
    beforeImage: "/images/services/wig-installation/wig-installation-4.webp",
    afterImage: "/images/services/wig-installation/wig-installation-5.webp",
    service: { label: "Book a bob installation", slug: "wig-revamping-installations", variant: "wig-installation" },
    products: [{ label: "Shop bob wigs", id: "bob-wigs" }],
    tags: ["Executive", "Low maintenance", "Sharp silhouette"],
    result: "Sharper shape + effortless polish",
    time: "Approx. 2–3 hours",
  },
  {
    id: "boho-softness",
    category: "Braids",
    title: "Protective braids with a softer, prettier finish.",
    eyebrow: "Boho braids",
    story: "If you love braids but want something less structured, boho curls soften the look and add movement. You still get the convenience of protective styling with a more feminine finish.",
    beforeImage: "/images/services/hair-care/hair-care-5.webp",
    afterImage: "/images/services/braiding/braids-2.webp",
    service: { label: "Request boho braids", slug: "braiding", variant: "boho-braids" },
    tags: ["Boho", "Soft glam", "Protective"],
    result: "Softer movement + statement length",
    time: "Approx. 5–8 hours",
  },
  {
    id: "event-face-card",
    category: "Hair + Makeup",
    title: "Soft glam that still looks like you in real life.",
    eyebrow: "Soft glam makeup",
    story: "Fresh-looking skin, clean definition and a polished finish for birthdays, dinners, shoots and events. Enough impact for photos without feeling heavy when you see yourself up close.",
    beforeImage: "/images/services/makeup/makeup-5.webp",
    afterImage: "/images/services/makeup/makeup-2.webp",
    service: { label: "Book soft glam", slug: "makeup", variant: "soft-glam" },
    tags: ["Soft glam", "Photogenic", "Refined"],
    result: "Fresh complexion + defined features",
    time: "Approx. 1–1.5 hours",
  },
  {
    id: "curly-volume-reveal",
    category: "Wigs",
    title: "Bring the bounce back to a tired curly wig.",
    eyebrow: "Curly wig revamp",
    story: "Before replacing a wig you already love, a proper revamp can restore the shape. Defined curls, balanced volume and face framing make an old unit feel wearable again.",
    beforeImage: "/images/services/wig-installation/wig-installation-7.webp",
    afterImage: "/images/services/wig-installation/wig-installation-8.webp",
    service: { label: "Book wig styling", slug: "wig-revamping-installations", variant: "wig-styling-only" },
    products: [{ label: "Shop curly wigs", id: "curly-hair-wigs" }],
    tags: ["Curly", "Volume", "Revamp"],
    result: "Restored shape + movement",
    time: "Approx. 1.5–2 hours",
  },
  {
    id: "cornrow-clean-up",
    category: "Braids",
    title: "Clean cornrows that carry you through the work week.",
    eyebrow: "Feed-in cornrows",
    story: "A sleek protective option when you want to wake up already looking neat. Crisp lines and balanced sections keep daily styling low while giving you a clean, put-together finish.",
    beforeImage: "/images/services/hair-care/hair-care-2.webp",
    afterImage: "/images/services/cornrows/cornrows-2.webp",
    service: { label: "Book feed-in cornrows", slug: "cornrows", variant: "feed-in-cornrows" },
    tags: ["Sleek", "Protective", "Work-week ready"],
    result: "Crisp protective finish",
    time: "Approx. 2–4 hours",
  },
  {
    id: "silk-press-reveal",
    category: "Hair Care",
    title: "Your natural hair — smooth, moving and visibly shiny.",
    eyebrow: "Silk press",
    story: "For the days you want to wear your natural hair straight without a stiff finish. Good preparation, hydration and controlled heat create movement, shine and a polished result.",
    beforeImage: "/images/services/hair-care/hair-care-3.webp",
    afterImage: "/images/services/hair-care/hair-care-4.webp",
    service: { label: "Book a silk press", slug: "hair-care", variant: "silk-press-blowout" },
    carePlusFit: "A natural fit for recurring Care+ maintenance",
    tags: ["Natural hair", "Movement", "Healthy shine"],
    result: "Smooth movement + visible shine",
    time: "Approx. 2 hours",
  },
  {
    id: "traditional-event-finish",
    category: "Bridal",
    title: "A complete look for the traditional event you cannot underdress for.",
    eyebrow: "Traditional event hair + glam",
    story: "When the outfit is already making a statement, your hair and makeup need to hold their own. The full look is planned together so everything feels polished, balanced and celebration-ready.",
    beforeImage: "/images/services/makeup/makeup-3.webp",
    afterImage: "/images/services/bridal-event/bridal-event-3.webp",
    service: { label: "Request event styling", slug: "bridal-event-hair", variant: "event-hair-styling" },
    tags: ["Traditional event", "Hair + makeup", "Statement"],
    result: "Coordinated premium event finish",
    time: "Consultation-led",
  },
];

export const TRANSFORMATION_STORAGE_KEY = "kaykayhair:transformations:v1";
export type SavedTransformationState = { loved: string[]; saved: string[] };
export const emptyTransformationState: SavedTransformationState = { loved: [], saved: [] };
