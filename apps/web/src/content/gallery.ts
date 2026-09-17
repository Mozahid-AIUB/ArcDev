// SAMPLE photos (CC0 stock, see public/images/sample/CREDITS.md). None show ArcDev's work.

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
  { src: "/images/sample/site-tower-crane.webp", alt: "Tower crane lifting material to an upper floor", category: "Construction", width: 1400, height: 1859 },
  { src: "/images/sample/residential-tower.webp", alt: "Residential tower among trees", category: "Buildings", width: 1400, height: 1867 },
  { src: "/images/sample/interior-kitchen.webp", alt: "Fitted kitchen with an island", category: "Interiors", width: 1024, height: 683 },
  { src: "/images/sample/site-piling.webp", alt: "Piling rig on a construction site", category: "Construction", width: 1400, height: 1050 },
  { src: "/images/sample/engineering-drawings.webp", alt: "Set square on architectural drawings", category: "Planning", width: 1024, height: 683 },
  { src: "/images/sample/city-night-towers.webp", alt: "High-rise buildings at night", category: "Buildings", width: 1600, height: 1066 },
  { src: "/images/sample/interior-living.webp", alt: "Living room with sofas and a coffee table", category: "Interiors", width: 1280, height: 1066 },
  { src: "/images/sample/site-concrete.webp", alt: "Worker pouring concrete", category: "Construction", width: 683, height: 1024 },
  { src: "/images/sample/tower-blue.webp", alt: "Tall building with lit windows at dusk", category: "Buildings", width: 1152, height: 2048 },
  { src: "/images/sample/interior-bedroom.webp", alt: "Bedroom with a large window", category: "Interiors", width: 1400, height: 1047 },
  { src: "/images/sample/site-crane.webp", alt: "Building site with a tower crane", category: "Construction", width: 1400, height: 1050 },
  { src: "/images/sample/engineering-blueprint.webp", alt: "Ruler on a blueprint", category: "Planning", width: 1024, height: 683 },
  { src: "/images/sample/glass-towers.webp", alt: "Glass office towers", category: "Buildings", width: 1024, height: 683 },
  { src: "/images/sample/interior-open-plan.webp", alt: "Open-plan kitchen with a staircase", category: "Interiors", width: 1024, height: 684 },
  { src: "/images/sample/site-frame.webp", alt: "Concrete frame of a building under construction", category: "Construction", width: 1400, height: 1050 },
  { src: "/images/sample/land-planning.webp", alt: "Man reading plans on a plot of land", category: "Planning", width: 1024, height: 681 },
  { src: "/images/sample/interior-dining.webp", alt: "Bright dining area", category: "Interiors", width: 1024, height: 684 },
  { src: "/images/sample/site-workers.webp", alt: "Workers operating a concrete mixer", category: "Construction", width: 683, height: 1024 },
];
