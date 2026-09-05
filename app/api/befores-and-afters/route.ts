import { NextResponse } from "next/server";

type BeforeAfterCategory = "All" | "Wigs" | "Braids" | "Care" | "Bridal" | "Makeup";

type BeforeAfterJob = {
  id: string;
  category: Exclude<BeforeAfterCategory, "All">;
  title: string;
  caption: string;
  description: string;
  service: string;
  duration: string;
  resultNote: string;
  beforeImage: string;
  afterImage: string;
};

const beforeAfterJobs: BeforeAfterJob[] = [
  {
    id: "lace-reset-glow",
    category: "Wigs",
    title: "Lace Reset Glow",
    caption: "From tired lace to a soft, natural hairline finish.",
    description:
      "A clean wig reset focused on lace correction, melt, shaping, and a soft salon finish that looks polished without feeling heavy.",
    service: "Wig revamp + installation",
    duration: "2h 30m",
    resultNote: "Soft melt, cleaner hairline, fuller frame",
    beforeImage:
      "https://images.unsplash.com/photo-1595475207225-428b62bda831?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "knotless-crown-flow",
    category: "Braids",
    title: "Knotless Crown Flow",
    caption: "A protective look rebuilt with clean parting and easy movement.",
    description:
      "A braid transformation designed for comfort, longevity, and a softer face frame while keeping the final look neat and premium.",
    service: "Knotless braids",
    duration: "4h 15m",
    resultNote: "Lightweight fall, neat sections, polished edges",
    beforeImage:
      "https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "careplus-silk-reset",
    category: "Care",
    title: "CarePlus Silk Reset",
    caption: "Healthy hair brought back to a softer, more manageable state.",
    description:
      "A maintenance-led treatment with wash, conditioning, gentle heat styling, and finishing care for clients who want consistency month after month.",
    service: "CarePlus treatment",
    duration: "1h 45m",
    resultNote: "Less dryness, more softness, better shine",
    beforeImage:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "bridal-soft-sculpt",
    category: "Bridal",
    title: "Bridal Soft Sculpt",
    caption: "A calm, camera-ready finish for a high-emotion day.",
    description:
      "An event beauty transformation built around soft structure, controlled volume, and a timeless profile that holds beautifully in photos.",
    service: "Bridal and event hair",
    duration: "3h",
    resultNote: "Romantic volume, clean shape, picture-ready polish",
    beforeImage:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "soft-glam-lift",
    category: "Makeup",
    title: "Soft Glam Lift",
    caption: "Fresh skin, defined features, and a confident finish.",
    description:
      "A minimal glam direction for working women, birthdays, shoots, and events where the beauty should feel refined instead of overdone.",
    service: "Makeup application",
    duration: "1h 20m",
    resultNote: "Clean skin, lifted eye, soft glow",
    beforeImage:
      "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1523264766116-1e09b3145b84?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "wig-volume-rebuild",
    category: "Wigs",
    title: "Volume Rebuild",
    caption: "A flat wig reshaped into a fuller, more luxurious silhouette.",
    description:
      "A revamp and restyle that restores shape, movement, and confidence through wash care, heat styling, trimming, and finishing detail.",
    service: "Wig revamping",
    duration: "2h",
    resultNote: "More movement, refreshed ends, stronger silhouette",
    beforeImage:
      "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1544717305-996b815c338c?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "cornrow-clean-line",
    category: "Braids",
    title: "Clean Line Cornrows",
    caption: "A protective style made sharper through clean lines and balance.",
    description:
      "Cornrows shaped for a neat everyday look with attention to symmetry, scalp comfort, and a finish that feels fresh for longer.",
    service: "Cornrows",
    duration: "2h 15m",
    resultNote: "Sharper lines, balanced sections, tidy finish",
    beforeImage:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "repair-and-polish",
    category: "Care",
    title: "Repair and Polish",
    caption: "A dry, stressed look softened through treatment-first styling.",
    description:
      "A hair care session that prioritizes moisture, detangling, shine, and a clean final shape before any heavy styling decisions.",
    service: "Hair care treatment",
    duration: "1h 30m",
    resultNote: "Softer texture, calmer finish, healthier look",
    beforeImage:
      "https://images.unsplash.com/photo-1605980776566-0486c3ac7617?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "event-face-frame",
    category: "Bridal",
    title: "Event Face Frame",
    caption: "A simple event upgrade with softness around the face.",
    description:
      "A beauty finish created for women who want an elevated look that still feels like themselves when they walk into the room.",
    service: "Event hair styling",
    duration: "2h",
    resultNote: "Soft frame, gentle lift, graceful finish",
    beforeImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "everyday-glam-edit",
    category: "Makeup",
    title: "Everyday Glam Edit",
    caption: "An understated beauty shift for everyday confidence.",
    description:
      "A soft, clean makeup look for clients who want polish, glow, and definition without losing the natural feel of their face.",
    service: "Soft glam makeup",
    duration: "1h",
    resultNote: "Fresh complexion, subtle definition, natural glow",
    beforeImage:
      "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "premium-install-polish",
    category: "Wigs",
    title: "Premium Install Polish",
    caption: "A high-finish install with clean styling and a smooth shape.",
    description:
      "A premium wig session that balances lace work, placement, finishing, and client comfort for a refined Kaykay Hair result.",
    service: "Premium wig installation",
    duration: "2h 45m",
    resultNote: "Natural lace, soft volume, polished finish",
    beforeImage:
      "https://images.unsplash.com/photo-1523264766116-1e09b3145b84?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1800&q=90",
  },
  {
    id: "maintenance-refresh",
    category: "Care",
    title: "Maintenance Refresh",
    caption: "A routine beauty reset for clients who want to stay ready.",
    description:
      "A maintenance-focused session for regular clients: clean care, light styling, finish check, and an easy route back to a polished look.",
    service: "Monthly care maintenance",
    duration: "1h 50m",
    resultNote: "Cleaner routine, better shape, ready-to-go finish",
    beforeImage:
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1800&q=90",
    afterImage:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1800&q=90",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cursor = Number(searchParams.get("cursor") || "0");
  const limit = Number(searchParams.get("limit") || "3");
  const category = (searchParams.get("category") || "All") as BeforeAfterCategory;

  const filteredJobs = category === "All" ? beforeAfterJobs : beforeAfterJobs.filter((item) => item.category === category);
  const items = filteredJobs.slice(cursor, cursor + limit);
  const nextCursor = cursor + limit < filteredJobs.length ? cursor + limit : null;

  return NextResponse.json({
    items,
    nextCursor,
    hasMore: nextCursor !== null,
  });
}
