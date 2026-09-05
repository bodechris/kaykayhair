type KaykayServiceImage = {
  src: string;
  alt: string;
};

export type KaykayServiceSlug = | 'braiding' | 'bridal-event-hair' | 'hair-care' | 'wig-revamping-installations' | 'cornrows' | 'makeup' | 'pedicure-manicure';

type KaykaySubService = {
  name: string;
  slug: string;
  description: string;
  minprice?: string;
  fromPrice?: number;
  duration?: string;
  popular?: boolean;
  bestFor?: string[];
  includes?: string[];
  images: KaykayServiceImage[];
};

type KaykayService = {
  title: string;
  slug: KaykayServiceSlug;
  eyebrow: string;
  description: string;
  shortDescription: string;
  minprice: string;
  fromPrice: number;
  duration: string;
  featured?: boolean;
  carePlusEligible?: boolean;
  bookingNotes?: string[];
  images: KaykayServiceImage[];
  subservices?: KaykaySubService[];
};

export const kaykayServices: KaykayService[] = [
  {
    title: "Braiding",
    slug: "braiding",
    eyebrow: "Protective Styling",
    shortDescription: "Neat, stylish braids designed to protect your natural hair.",
    description:
      "Beautiful protective braiding styles for everyday wear, holidays, work, events, and low-maintenance beauty. Choose from knotless braids, classic box braids, boho braids, goddess braids, and more.",
    minprice: "R650",
    fromPrice: 650,
    duration: "3 - 7 hours",
    featured: true,
    carePlusEligible: true,
    images: [
        { src: '/images/services/braiding/braids-1.webp', alt: "African woman with braids" }
    ],
    bookingNotes: [
      "Final price depends on braid size, length, hair density, and chosen style.",
      "Hairpiece is not included unless stated.",
      "Please arrive with clean, detangled hair or book a wash add-on.",
    ],
    subservices: [
      {
        name: "Knotless Braids",
        slug: "knotless-braids",
        description:
          "Lightweight, natural-looking braids with less tension on the scalp. Perfect for a clean, modern protective style.",
        minprice: "R750",
        fromPrice: 750,
        duration: "4 - 7 hours",
        popular: true,
        bestFor: ["Low-tension styling", "Natural finish", "Everyday wear"],
        includes: ["Parting", "Braiding", "Basic finishing"],
        images: [],
      },
      {
        name: "Classic Box Braids",
        slug: "classic-box-braids",
        description:
          "Timeless box braids with neat parting and a polished finish. Great for long-lasting protective styling.",
        minprice: "R650",
        fromPrice: 650,
        duration: "3 - 6 hours",
        bestFor: ["Protective styling", "Long-lasting wear", "Simple maintenance"],
        includes: ["Parting", "Braiding", "Hot water setting"],
        images: [],
      },
      {
        name: "Boho Braids",
        slug: "boho-braids",
        description:
          "Soft, feminine braids with curly pieces added for a fuller, stylish, effortless look.",
        minprice: "R950",
        fromPrice: 950,
        duration: "5 - 8 hours",
        popular: true,
        bestFor: ["Soft glam looks", "Vacations", "Photoshoots"],
        includes: ["Braiding", "Curly extensions", "Finishing"],
        images: [],
      },
      {
        name: "Goddess Braids",
        slug: "goddess-braids",
        description:
          "Elegant braids with curly details for a premium, statement-making protective style.",
        minprice: "R950",
        fromPrice: 950,
        duration: "4 - 7 hours",
        bestFor: ["Luxury braids", "Events", "Soft feminine looks"],
        includes: ["Braiding", "Curly detail styling", "Finishing"],
        images: [],
      },
      {
        name: "Fulani / Tribal Braids",
        slug: "fulani-tribal-braids",
        description:
          "Creative patterned braids with a stylish front design, beads, or decorative finishing.",
        minprice: "R850",
        fromPrice: 850,
        duration: "4 - 7 hours",
        bestFor: ["Statement styles", "Creative looks", "Vacation hair"],
        includes: ["Patterned parting", "Braiding", "Basic finishing"],
        images: [],
      },
      {
        name: "Kids Braids",
        slug: "kids-braids",
        description:
          "Gentle, age-appropriate braiding styles for children with neat finishing and reduced tension.",
        minprice: "R650",
        fromPrice: 650,
        duration: "2 - 5 hours",
        bestFor: ["School styles", "Protective styling", "Low-tension braids"],
        includes: ["Gentle parting", "Braiding", "Basic finishing"],
        images: [],
      },
    ],
  },

  {
    title: "Bridal & Event Hair",
    slug: "bridal-event-hair",
    eyebrow: "Special Occasion Styling",
    shortDescription: "Elegant bridal and event hairstyles for unforgettable moments.",
    description:
      "Premium hair styling for brides, bridesmaids, birthdays, photoshoots, traditional events, red carpet looks, and formal occasions. Designed to look polished, photograph beautifully, and last through your event.",
    minprice: "R1250",
    fromPrice: 1250,
    duration: "2 - 5 hours",
    featured: true,
    carePlusEligible: false,
    images: [
        { src: '/images/services/bridal-event/bridal-event-1.webp', alt: "Bridal / Event Hair Do" }
    ],
    bookingNotes: [
      "Bridal bookings should be made in advance.",
      "A consultation or trial may be recommended for bridal looks.",
      "Mobile call-out may attract an extra fee depending on location.",
    ],
    subservices: [
      {
        name: "Bridal Hair Styling",
        slug: "bridal-hair-styling",
        description:
          "A polished bridal hairstyle designed around your dress, face shape, event theme, and preferred finish.",
        minprice: "R1250",
        fromPrice: 1250,
        duration: "2 - 4 hours",
        popular: true,
        bestFor: ["Weddings", "Traditional ceremonies", "White wedding looks"],
        includes: ["Consultation", "Styling", "Finishing spray", "Final touch-up"],
        images: [],
      },
      {
        name: "Bridal Trial",
        slug: "bridal-trial",
        description:
          "A pre-wedding styling session to test and refine your final bridal hair look before the big day.",
        minprice: "R1250",
        fromPrice: 1250,
        duration: "2 - 3 hours",
        bestFor: ["Brides", "Look testing", "Wedding preparation"],
        includes: ["Style test", "Hair advice", "Look refinement"],
        images: [],
      },
      {
        name: "Event Hair Styling",
        slug: "event-hair-styling",
        description:
          "Glamorous styling for birthdays, dinners, corporate events, graduations, and special outings.",
        minprice: "R1250",
        fromPrice: 1250,
        duration: "2 - 3 hours",
        bestFor: ["Birthdays", "Photoshoots", "Formal events"],
        includes: ["Styling", "Finishing", "Light touch-up"],
        images: [],
      },
      {
        name: "Bridesmaid Hair",
        slug: "bridesmaid-hair",
        description:
          "Coordinated bridesmaid styling that complements the bride and the overall wedding look.",
        minprice: "R1250",
        fromPrice: 1250,
        duration: "2 - 4 hours",
        bestFor: ["Bridesmaids", "Wedding parties", "Group bookings"],
        includes: ["Styling", "Finishing", "Group look coordination"],
        images: [],
      },
    ],
  },

  {
    title: "Hair Care",
    slug: "hair-care",
    eyebrow: "Healthy Hair Maintenance",
    shortDescription: "Treatments and care routines to keep your hair strong and healthy.",
    description:
      "Professional hair care services focused on moisture, scalp health, strength, softness, and overall hair recovery. Ideal for clients who want healthier natural hair, relaxed hair, or treated hair.",
    minprice: "R750",
    fromPrice: 750,
    duration: "1.5 - 3 hours",
    featured: true,
    carePlusEligible: true,
    images: [
        { src: '/images/services/hair-care/hair-care-1.webp', alt: "African woman with healthy hair" }
    ],
    bookingNotes: [
      "Treatment choice may depend on hair condition after consultation.",
      "For damaged hair, a care plan may be recommended.",
      "Best results usually come from consistent maintenance.",
    ],
    subservices: [
      {
        name: "Deep Conditioning Treatment",
        slug: "deep-conditioning-treatment",
        description:
          "A moisture-rich treatment to soften, hydrate, and revive dry or tired hair.",
        minprice: "R750",
        fromPrice: 750,
        duration: "1.5 - 2 hours",
        popular: true,
        bestFor: ["Dry hair", "Moisture boost", "Hair softness"],
        includes: ["Wash", "Treatment", "Steam or processing", "Blow dry"],
        images: [],
      },
      {
        name: "Protein Treatment",
        slug: "protein-treatment",
        description:
          "A strengthening treatment for weak, breaking, or chemically processed hair.",
        minprice: "R850",
        fromPrice: 850,
        duration: "1.5 - 2.5 hours",
        bestFor: ["Breakage", "Weak strands", "Chemically treated hair"],
        includes: ["Wash", "Protein treatment", "Processing", "Finish"],
        images: [],
      },
      {
        name: "Scalp Detox Treatment",
        slug: "scalp-detox-treatment",
        description:
          "A cleansing scalp-focused treatment to refresh the scalp and remove product buildup.",
        minprice: "R850",
        fromPrice: 850,
        duration: "1.5 - 2.5 hours",
        bestFor: ["Product buildup", "Itchy scalp", "Scalp refresh"],
        includes: ["Scalp cleanse", "Treatment", "Wash", "Finish"],
        images: [],
      },
      {
        name: "Silk Press / Blowout",
        slug: "silk-press-blowout",
        description:
          "A smooth, polished finish for natural hair using heat styling and careful preparation.",
        minprice: "R850",
        fromPrice: 850,
        duration: "2 - 3 hours",
        bestFor: ["Smooth finish", "Length check", "Special occasions"],
        includes: ["Wash", "Conditioning", "Blow dry", "Straightening"],
        images: [],
      },
      {
        name: "Natural Hair Care Session",
        slug: "natural-hair-care-session",
        description:
          "A complete care session for natural hair, including cleansing, treatment, detangling, and styling preparation.",
        minprice: "R750",
        fromPrice: 750,
        duration: "2 - 3 hours",
        bestFor: ["Natural hair", "Healthy hair journey", "Maintenance"],
        includes: ["Wash", "Detangling", "Treatment", "Basic finish"],
        images: [],
      },
    ],
  },

  {
    title: "Wig Revamping & Installations",
    slug: "wig-revamping-installations",
    eyebrow: "Luxury Wig Services",
    shortDescription: "Clean installs, revamps, and wig care for a flawless finish.",
    description:
      "Professional wig installation and revamping services for clients who want a neat, natural-looking, and polished finish. Perfect for lace wigs, frontal wigs, closure wigs, sew-ins, and wig maintenance.",
    minprice: "R750",
    fromPrice: 750,
    duration: "1.5 - 4 hours",
    featured: true,
    carePlusEligible: true,
    images: [
        { src: '/images/services/wig-installation/wig-installation-1.webp', alt: "African woman with beautiful wig installation" }
    ],
    bookingNotes: [
      "Please bring your wig before the appointment if it needs washing, bleaching, or customization.",
      "Final price depends on wig condition and install type.",
      "Lace replacement, colouring, and repairs may cost extra.",
    ],
    subservices: [
      {
        name: "Wig Installation",
        slug: "wig-installation",
        description:
          "A clean, secure wig install with styling for a natural and polished look.",
        minprice: "R750",
        fromPrice: 750,
        duration: "1.5 - 3 hours",
        popular: true,
        bestFor: ["Everyday glam", "Events", "Natural-looking finish"],
        includes: ["Wig fitting", "Installation", "Styling", "Finishing"],
        images: [],
      },
      {
        name: "Lace Frontal Install",
        slug: "lace-frontal-install",
        description:
          "A detailed frontal installation with lace preparation, melting, and styling.",
        minprice: "R950",
        fromPrice: 950,
        duration: "2 - 4 hours",
        popular: true,
        bestFor: ["Luxury installs", "Photoshoots", "Special occasions"],
        includes: ["Lace prep", "Install", "Styling", "Finishing"],
        images: [],
      },
      {
        name: "Closure Wig Install",
        slug: "closure-wig-install",
        description:
          "A neat closure wig installation for a natural, low-maintenance finish.",
        minprice: "R750",
        fromPrice: 750,
        duration: "1.5 - 3 hours",
        bestFor: ["Simple installs", "Low-maintenance styling", "Everyday wear"],
        includes: ["Wig fitting", "Install", "Styling"],
        images: [],
      },
      {
        name: "Wig Revamp",
        slug: "wig-revamp",
        description:
          "Refresh an old wig with washing, treatment, styling, and finishing to make it look beautiful again.",
        minprice: "R750",
        fromPrice: 750,
        duration: "2 - 4 hours",
        bestFor: ["Old wigs", "Dry wigs", "Tangled wigs"],
        includes: ["Washing", "Treatment", "Detangling", "Styling"],
        images: [],
      },
      {
        name: "Sew-in Weave",
        slug: "sew-in-weave",
        description:
          "A secure sew-in weave installation with neat foundation and polished finishing.",
        minprice: "R850",
        fromPrice: 850,
        duration: "2.5 - 4 hours",
        bestFor: ["Protective styling", "Volume", "Natural leave-out looks"],
        includes: ["Cornrow base", "Sew-in installation", "Styling"],
        images: [],
      },
      {
        name: "Wig Styling Only",
        slug: "wig-styling-only",
        description:
          "Styling service for wigs that are already installed or prepared.",
        minprice: "R750",
        fromPrice: 750,
        duration: "1 - 2 hours",
        bestFor: ["Restyling", "Curls", "Straightening", "Event prep"],
        includes: ["Heat styling", "Finishing"],
        images: [],
      },
    ],
  },

  {
    title: "Cornrows",
    slug: "cornrows",
    eyebrow: "Clean Everyday Styling",
    shortDescription: "Neat cornrows for protective styling, wigs, and everyday wear.",
    description:
      "Clean and precise cornrow styles for natural hair, wig foundations, children, work looks, and simple protective styling. Choose from straight-back cornrows, styled cornrows, feed-in cornrows, or wig-base cornrows.",
    minprice: "R650",
    fromPrice: 650,
    duration: "1.5 - 4 hours",
    featured: false,
    carePlusEligible: true,
    images: [
        { src: '/images/services/cornrows/cornrows-1.webp', alt: "Beautiful black lady in cornrows" }
    ],
    bookingNotes: [
      "Price depends on style complexity and hair length.",
      "Please arrive with clean, detangled hair or book a wash add-on.",
    ],
    subservices: [
      {
        name: "Straight-back Cornrows",
        slug: "straight-back-cornrows",
        description:
          "Simple, neat straight-back cornrows for a clean protective style or wig base.",
        minprice: "R650",
        fromPrice: 650,
        duration: "1.5 - 3 hours",
        popular: true,
        bestFor: ["Wig base", "Simple protective styling", "Natural hair"],
        includes: ["Parting", "Cornrowing", "Basic finishing"],
        images: [],
      },
      {
        name: "Feed-in Cornrows",
        slug: "feed-in-cornrows",
        description:
          "Cornrows with added extensions for a fuller, longer, and more styled look.",
        minprice: "R750",
        fromPrice: 750,
        duration: "2 - 4 hours",
        bestFor: ["Styled cornrows", "Longer length", "Sleek looks"],
        includes: ["Parting", "Feed-in braiding", "Finishing"],
        images: [],
      },
      {
        name: "Styled Cornrows",
        slug: "styled-cornrows",
        description:
          "Creative cornrow patterns for a more fashionable and expressive look.",
        minprice: "R750",
        fromPrice: 750,
        duration: "2 - 4 hours",
        bestFor: ["Creative styles", "Events", "Everyday fashion"],
        includes: ["Design parting", "Cornrowing", "Finishing"],
        images: [],
      },
      {
        name: "Wig-base Cornrows",
        slug: "wig-base-cornrows",
        description:
          "Flat, secure cornrows created as a foundation for wig installation.",
        minprice: "R650",
        fromPrice: 650,
        duration: "1.5 - 2.5 hours",
        bestFor: ["Wig installs", "Protective base", "Flat foundation"],
        includes: ["Parting", "Flat cornrow base"],
        images: [],
      },
    ],
  },

  {
    title: "Makeup",
    slug: "makeup",
    eyebrow: "Soft Glam & Full Glam",
    shortDescription: "Beautiful makeup for everyday confidence and special occasions.",
    description:
      "Professional makeup services for natural glam, full glam, bridal looks, events, birthdays, photoshoots, and special occasions. Designed to enhance your features and complete your overall beauty look.",
    minprice: "R600",
    fromPrice: 600,
    duration: "1 - 2.5 hours",
    featured: true,
    carePlusEligible: false,
    images: [
        { src: '/images/services/makeup/makeup-1.webp', alt: "Beautiful black lady with perfect makeup" }
    ],
    bookingNotes: [
      "Please arrive with a clean face.",
      "Share your outfit or inspiration look before the appointment where possible.",
      "Lashes may be included or charged separately depending on the selected look.",
    ],
    subservices: [
      {
        name: "Soft Glam Makeup",
        slug: "soft-glam-makeup",
        description:
          "A clean, soft, elegant makeup look that enhances your natural beauty without feeling too heavy.",
        minprice: "R600",
        fromPrice: 600,
        duration: "1 - 1.5 hours",
        popular: true,
        bestFor: ["Everyday glam", "Birthdays", "Dinner dates", "Content shoots"],
        includes: ["Skin prep", "Foundation", "Eyes", "Lips", "Finishing"],
        images: [],
      },
      {
        name: "Full Glam Makeup",
        slug: "full-glam-makeup",
        description:
          "A more defined, polished makeup look for events, photos, and statement appearances.",
        minprice: "R850",
        fromPrice: 850,
        duration: "1.5 - 2 hours",
        bestFor: ["Events", "Photoshoots", "Parties", "Statement looks"],
        includes: ["Skin prep", "Full face glam", "Eyes", "Lashes", "Finishing"],
        images: [],
      },
      {
        name: "Bridal Makeup",
        slug: "bridal-makeup",
        description:
          "Long-wearing bridal makeup created to photograph beautifully and last throughout your wedding day.",
        minprice: "R1250",
        fromPrice: 1250,
        duration: "2 - 2.5 hours",
        bestFor: ["Brides", "Traditional weddings", "White weddings"],
        includes: ["Skin prep", "Bridal glam", "Lashes", "Finishing", "Touch-up guidance"],
        images: [],
      },
      {
        name: "Photoshoot Makeup",
        slug: "photoshoot-makeup",
        description:
          "Camera-ready makeup for branding shoots, maternity shoots, fashion shoots, and content creation.",
        minprice: "R850",
        fromPrice: 850,
        duration: "1.5 - 2 hours",
        bestFor: ["Brand shoots", "Content creation", "Studio sessions"],
        includes: ["Skin prep", "Camera-ready makeup", "Finishing"],
        images: [],
      },
    ],
  },

  {
    title: "Pedicure & Manicure",
    slug: "pedicure-manicure",
    eyebrow: "Nail Care & Finishing",
    shortDescription: "Clean, polished hands and feet for a complete beauty finish.",
    description:
      "Manicure and pedicure services for clean, well-groomed hands and feet. Perfect as a standalone appointment or as part of your full Kaykay Hair beauty day.",
    minprice: "R600",
    fromPrice: 600,
    duration: "1.5 - 3 hours",
    featured: false,
    carePlusEligible: true,
    images: [
        { src: '/images/services/pedicure-manicure/manicure-1.webp', alt: "Beautiful black lady with perfect makeup" }
    ],
    bookingNotes: [
      "Final price depends on polish type, nail art, soak-off, and add-ons.",
      "Please mention gel, acrylic, or nail art requests when booking.",
    ],
    subservices: [
      {
        name: "Classic Mani + Pedi",
        slug: "classic-mani-pedi",
        description:
          "A clean manicure and pedicure combo for fresh, neat hands and feet.",
        minprice: "R600",
        fromPrice: 600,
        duration: "1.5 - 2.5 hours",
        popular: true,
        bestFor: ["Everyday grooming", "Clean finish", "Monthly maintenance"],
        includes: ["Nail shaping", "Cuticle care", "Buffing", "Polish"],
        images: [],
      },
      {
        name: "Gel Mani + Pedi",
        slug: "gel-mani-pedi",
        description:
          "A longer-lasting gel polish manicure and pedicure combo with a glossy finish.",
        minprice: "R750",
        fromPrice: 750,
        duration: "2 - 3 hours",
        bestFor: ["Longer wear", "Glossy finish", "Low maintenance"],
        includes: ["Nail prep", "Gel polish", "Curing", "Finishing"],
        images: [],
      },
      {
        name: "Luxury Pedicure",
        slug: "luxury-pedicure",
        description:
          "A relaxing foot care treatment with extra attention to softness, grooming, and polish.",
        minprice: "R650",
        fromPrice: 650,
        duration: "1.5 - 2 hours",
        bestFor: ["Foot care", "Relaxation", "Soft feet"],
        includes: ["Soak", "Scrub", "Nail care", "Moisturising", "Polish"],
        images: [],
      },
      {
        name: "Nail Art Add-on",
        slug: "nail-art-add-on",
        description:
          "Add simple or detailed nail art to complete your manicure or pedicure look.",
        minprice: "R150",
        fromPrice: 150,
        duration: "15 - 45 minutes",
        bestFor: ["Custom looks", "Events", "Creative nails"],
        includes: ["Basic nail art or custom design depending on request"],
        images: [],
      },
    ],
  },
];

export const kaykayServiceGlobalNotes = [
  "All prices are starting prices and may change based on hair length, hair density, style complexity, product use, and appointment requirements.",
  "A deposit may be required to secure selected appointments.",
  "Clients should arrive on time to avoid reducing styling time.",
  "Hair extensions, wigs, accessories, and special products are not included unless clearly stated.",
  "For bridal, event, and group bookings, advance booking is strongly recommended.",
];

export const bookingfee = "R150";