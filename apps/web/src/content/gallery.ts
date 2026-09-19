// Real ArcDev project photography, drawn from the company portfolio.

export const GALLERY_CATEGORIES = ["Construction", "Buildings", "Interiors", "Planning"] as const;
export type GalleryCategory = (typeof GALLERY_CATEGORIES)[number];

export interface GalleryPhoto {
  src: string;
  alt: string;
  category: GalleryCategory;
  width: number;
  height: number;
}

export const GALLERY: GalleryPhoto[] = [
  { src: "/images/projects/imperial-commercial-center/exterior-01.webp", alt: "Imperial Commercial Center, Satmasjid Road", category: "Buildings", width: 1400, height: 1867 },
  { src: "/images/projects/joynal-garden/exterior-01.webp", alt: "Joynal Garden, Elephant Road", category: "Buildings", width: 1400, height: 1050 },
  { src: "/images/projects/runner-apartment-complex/exterior-riverside-01.webp", alt: "Runner Apartment Complex, riverside exterior", category: "Buildings", width: 1400, height: 1050 },
  { src: "/images/projects/swadesh-sunvalley/exterior-night-01.webp", alt: "Swadesh Sunvalley residential tower at night", category: "Buildings", width: 1200, height: 1600 },
  { src: "/images/projects/hai-residence-noakhali/exterior-facade-01.webp", alt: "Hai Residence, Noakhali, exterior", category: "Buildings", width: 1400, height: 1050 },
  { src: "/images/projects/anlima-purbachal/exterior-day-01.webp", alt: "Anlima Vacation House at Purbachal", category: "Buildings", width: 1400, height: 1050 },

  { src: "/images/projects/appropriate-apparels/construction-01.webp", alt: "Appropriate Apparels factory under construction", category: "Construction", width: 1400, height: 1050 },
  { src: "/images/projects/sadma-fashion-dyeing/construction-01.webp", alt: "Sadma Fashion Dyeing plant under construction", category: "Construction", width: 1400, height: 1050 },
  { src: "/images/projects/habitus-fashion/exterior-02.webp", alt: "Habitus Fashion Ltd factory grounds", category: "Construction", width: 1400, height: 1050 },

  { src: "/images/projects/royal-group-guest-house/living-room-01.webp", alt: "Royal Group Guest House living room", category: "Interiors", width: 1280, height: 1066 },
  { src: "/images/projects/dept-of-management-du/boardroom-01.webp", alt: "Department of Management boardroom, University of Dhaka", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/cafe-red-beret/exterior-riverside-01.webp", alt: "Cafe Red Beret riverside seating", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/best-in-brands/showroom-wide-01.webp", alt: "Best In Brands showroom interior", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/hai-residence-noakhali/living-room-double-height-01.webp", alt: "Hai Residence double-height living room", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/hai-residence-noakhali/bathroom-tub-01.webp", alt: "Hai Residence bathroom", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/royal-group-head-office/reception-01.webp", alt: "Royal Group Head Office reception", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/newtex-group/reception-01.webp", alt: "Newtex Group reception", category: "Interiors", width: 1400, height: 1050 },
  { src: "/images/projects/oredh-studio/lounge-01.webp", alt: "OREDH lounge terrace", category: "Interiors", width: 1400, height: 1050 },

  { src: "/images/projects/desco-chq-nikunjo/render-terrace-01.webp", alt: "Desco CHQ competition design render", category: "Planning", width: 1400, height: 1050 },
  { src: "/images/projects/imperial-commercial-center/facade-detail-01.webp", alt: "Imperial Commercial Center facade detail", category: "Planning", width: 1400, height: 1050 },
  { src: "/images/projects/appropriate-apparels/render-01.webp", alt: "Appropriate Apparels factory design render", category: "Planning", width: 1400, height: 1050 },
  { src: "/images/projects/anlima-purbachal/pool-render-01.webp", alt: "Anlima Vacation House pool terrace render", category: "Planning", width: 1400, height: 1050 },
];
