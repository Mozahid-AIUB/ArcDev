// Where ArcDev's Dhaka projects are, to neighbourhood accuracy, from the addresses in the
// company profile and portfolio. Pins mark the area, not the exact plot.

export type DhakaArea =
  | "gulshan-banani"
  | "cantonment-kuril"
  | "mirpur-agargaon"
  | "tejgaon"
  | "dhanmondi"
  | "elephant-road"
  | "motijheel"
  | "mohammadpur"
  | "purbachal";

export const DHAKA_AREAS: { id: DhakaArea; name: string }[] = [
  { id: "gulshan-banani", name: "Gulshan & Banani" },
  { id: "cantonment-kuril", name: "Cantonment, Nikunja & Kuril" },
  { id: "mirpur-agargaon", name: "Mirpur, Kafrul & Agargaon" },
  { id: "dhanmondi", name: "Dhanmondi & Panthapath" },
  { id: "elephant-road", name: "Elephant Road & University" },
  { id: "mohammadpur", name: "Mohammadpur & Kamrangirchar" },
  { id: "tejgaon", name: "Tejgaon" },
  { id: "motijheel", name: "Shantinagar" },
  { id: "purbachal", name: "Purbachal" },
];

export const DHAKA_SITES: Record<string, { area: DhakaArea; lng: number; lat: number }> = {
  "royal-group-head-office": { area: "gulshan-banani", lng: 90.4148, lat: 23.7952 },
  "royal-group-branch-office": { area: "gulshan-banani", lng: 90.4032, lat: 23.7962 },
  "royal-group-guest-house": { area: "gulshan-banani", lng: 90.3958, lat: 23.8012 },
  "best-in-brands": { area: "gulshan-banani", lng: 90.4012, lat: 23.7922 },
  "cafe-red-beret": { area: "cantonment-kuril", lng: 90.4005, lat: 23.8165 },
  "desco-chq-nikunjo": { area: "cantonment-kuril", lng: 90.4182, lat: 23.8328 },
  "doors-showroom": { area: "cantonment-kuril", lng: 90.4236, lat: 23.8132 },
  "dark-burg": { area: "mirpur-agargaon", lng: 90.3688, lat: 23.8342 },
  "purba-residence": { area: "mirpur-agargaon", lng: 90.3872, lat: 23.7902 },
  "bongobondhu-corner": { area: "mirpur-agargaon", lng: 90.3772, lat: 23.7788 },
  "oredh-studio": { area: "tejgaon", lng: 90.4032, lat: 23.7642 },
  "imperial-commercial-center": { area: "dhanmondi", lng: 90.3716, lat: 23.7512 },
  "newtex-group": { area: "dhanmondi", lng: 90.3862, lat: 23.7518 },
  "joynal-garden": { area: "elephant-road", lng: 90.3868, lat: 23.7398 },
  "babui-properties": { area: "elephant-road", lng: 90.3838, lat: 23.7372 },
  "dept-of-management-du": { area: "elephant-road", lng: 90.3936, lat: 23.7335 },
  "easy-buy-showroom": { area: "motijheel", lng: 90.4142, lat: 23.7392 },
  "tauri-foundation": { area: "mohammadpur", lng: 90.3472, lat: 23.7482 },
  "appropriate-apparels": { area: "mohammadpur", lng: 90.3702, lat: 23.7162 },
  "anlima-purbachal": { area: "purbachal", lng: 90.4935, lat: 23.8422 },
};

/** Head office: Quantum Meher, Sector 11, Uttara. */
export const DHAKA_HQ = { lng: 90.3932, lat: 23.8745 };

/** Faint neighbourhood names for orientation. */
export const DHAKA_PLACE_LABELS = [
  { name: "UTTARA", lng: 90.4, lat: 23.867 },
  { name: "MIRPUR", lng: 90.357, lat: 23.815 },
  { name: "GULSHAN", lng: 90.423, lat: 23.785 },
  { name: "DHANMONDI", lng: 90.37, lat: 23.739 },
  { name: "MOTIJHEEL", lng: 90.425, lat: 23.726 },
  { name: "OLD DHAKA", lng: 90.4, lat: 23.708 },
  { name: "PURBACHAL", lng: 90.49, lat: 23.83 },
  { name: "TURAG", lng: 90.334, lat: 23.79, river: true },
  { name: "BURIGANGA", lng: 90.375, lat: 23.698, river: true },
  { name: "BALU", lng: 90.462, lat: 23.765, river: true },
];
