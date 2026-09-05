export type ProductOption = {
  name: string
  required?: boolean
  values: Array<{ label: string; priceAdjustment?: number; swatch?: string }>
}

export type ShopProduct = {
  id: string
  name: string
  category: "Wigs" | "Hair Care" | "Bundles"
  description: string
  details: string
  basePrice: number
  discount?: { enabled: boolean; percentage: number }
  tag?: string
  features: string[]
  images: Array<{ src: string; alt: string }>
  options?: ProductOption[]
}

const art = (label: string, color: string, accent: string, angle = 0) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${color}"/><stop offset="1" stop-color="${accent}"/></linearGradient><filter id="s"><feDropShadow dx="0" dy="30" stdDeviation="34" flood-opacity=".16"/></filter></defs><rect width="1200" height="1400" fill="url(#g)"/><circle cx="930" cy="250" r="310" fill="white" opacity=".28"/><g transform="translate(600 720) rotate(${angle})" filter="url(#s)"><rect x="-245" y="-400" width="490" height="800" rx="245" fill="white" opacity=".74"/><rect x="-190" y="-330" width="380" height="500" rx="190" fill="white" opacity=".34"/><text x="0" y="255" text-anchor="middle" font-family="Arial" font-size="48" font-weight="700" fill="#171313">KAYKAY</text><text x="0" y="315" text-anchor="middle" font-family="Arial" font-size="28" letter-spacing="8" fill="#171313" opacity=".55">${label.toUpperCase()}</text></g></svg>`
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

export const products: ShopProduct[] = [
  {
    id: "bob-wigs", name: "Bob Wig", category: "Wigs", basePrice: 3000,
    description: "A polished, ready-to-wear lace bob with a natural hairline and effortless movement.",
    details: "Made for everyday confidence, this unit arrives prepared for a clean, flattering finish. Choose your preferred length, colour and cap construction; the price updates as you build your unit.",
    discount: { enabled: true, percentage: 10 }, tag: "Best seller",
    features: ["Natural-looking lace", "Soft body movement", "Ready-to-wear finish"],
    images: [
      { src: art("Front", "#f4dfd8", "#d69a8b", -5), alt: "Lace Glow Bob Wig front view" },
      { src: art("Side", "#efe1d4", "#b98372", 8), alt: "Lace Glow Bob Wig side view" },
      { src: art("Detail", "#f8ece8", "#d9aca0", -12), alt: "Lace Glow Bob Wig lace detail" },
    ],
    options: [
      { name: "Length", required: true, values: [{ label: "10 in" }, { label: "12 in", priceAdjustment: 450 }, { label: "14 in", priceAdjustment: 850 }] },
      { name: "Colour", values: [{ label: "Natural black", swatch: "#171313" }, { label: "Chocolate", priceAdjustment: 250, swatch: "#5d3829" }, { label: "Burgundy", priceAdjustment: 300, swatch: "#6d1834" }] },
      { name: "Cap type", values: [{ label: "Standard" }, { label: "Glueless", priceAdjustment: 650 }] },
      { name: "Cap size", values: [{ label: "Standard" }, { label: "Small: 21–21.5 in", priceAdjustment: 250 }, { label: "Medium: 22–22.5 in", priceAdjustment: 350 }, { label: "Large: 23–23.5 in", priceAdjustment: 450 }] },
      { name: "Largeness", values: [{ label: "Large 1" }, { label: "Large 2", priceAdjustment: 150 }] },
    ],
  },
  {
    id: "pixie-wigs", name: "Pixie Wigs", category: "Wigs", basePrice: 3500,
    description: "A nourishing shampoo and treatment pairing for softness, moisture and easier styling.",
    details: "A gentle wash-day duo for natural hair, extensions and wigs. Use the cleanser first, then follow with the rich treatment for a soft, manageable finish.",
    discount: { enabled: true, percentage: 15 }, tag: "Care essential",
    features: ["Two-piece routine", "Hydrating formula", "Salon approved"],
    images: [
      { src: art("Duo", "#e7eee8", "#a5bea7", -4), alt: "Moisture Reset Duo set" },
      { src: art("Cleanse", "#eef3ed", "#bdcdbd", 7), alt: "Moisture Reset cleanser" },
      { src: art("Treat", "#e0eae1", "#91aa94", -9), alt: "Moisture Reset treatment" },
    ],
  },
  {
    id: "straight-hair-wigs", name: "Straight Hair Wigs", category: "Wigs", basePrice: 4500,
    description: "A compact set for sleek edges, neat parting and quick morning touch-ups.",
    details: "Keep your finish clean between appointments. The kit combines the everyday tools needed to refine edges and restore a freshly styled look in minutes.",
    tag: "Quick touch-up", features: ["Strong but flexible hold", "Travel friendly", "Clean finish"],
    images: [{ src: art("Kit", "#f6e7e8", "#dca9ad", 3), alt: "Straight Hair Wigs" }, { src: art("Brush", "#faeeee", "#e3b9bc", -8), alt: "Edge brush from the kit" }],
  },
  {
    id: "curly-hair-wigs", name: "Curly Hair Wigs", category: "Wigs", basePrice: 4500,
    description: "Lightweight shine and smooth movement without weighing the hair down.",
    details: "A small amount gives finished styles a polished, touchable shine. Apply through the mid-lengths and ends after styling.",
    tag: "Gloss finish", features: ["Lightweight", "Heat-styling support", "Smooth, glossy finish"],
    images: [{ src: art("Serum", "#e9ebf4", "#a8aecb", -2), alt: "Curly Hair Wigs bottle" }, { src: art("Texture", "#f1f2f8", "#c4c7d8", 10), alt: "Curly Hair Wigs detail" }],
    options: [{ name: "Size", values: [{ label: "50 ml" }, { label: "100 ml", priceAdjustment: 140 }] }],
  },
]

export const getProduct = (id: string) => products.find((product) => product.id === id)
export const discountedPrice = (product: ShopProduct) => product.discount?.enabled ? Math.round(product.basePrice * (1 - product.discount.percentage / 100)) : product.basePrice
export const money = (amount: number) => new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 }).format(amount)
