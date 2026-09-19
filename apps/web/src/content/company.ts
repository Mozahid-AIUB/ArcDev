export const COMPANY_FACTS: { label: string; value: string }[] = [
  { label: "Legal name", value: "Arc Development Pvt. Ltd." },
  { label: "Head office", value: "Uttara, Dhaka" },
  { label: "Second office", value: "Akhalia, Sylhet" },
  { label: "Services", value: "Six, under one roof" },
  { label: "Design standard", value: "Bangladesh National Building Code" },
];

export interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

export const COMPANY_STATS: Stat[] = [
  { value: 25, suffix: "+", label: "projects delivered" },
  { value: 9, label: "project categories" },
  { value: 2, label: "offices, Dhaka and Sylhet" },
  { value: 60, suffix: "K", label: "sq ft, largest single factory" },
  { value: 2, label: "founding partners" },
];

export const PROCESS: { title: string; text: string; duration: string }[] = [
  { title: "Land assessment", text: "Plot visit, title check and how high the plot allows you to build.", duration: "1–2 weeks" },
  { title: "Agreement", text: "A written offer first, then a registered agreement both sides sign.", duration: "2–4 weeks" },
  { title: "Design and approval", text: "Soil test, full drawing set and building approval.", duration: "3–6 months" },
  { title: "Construction", text: "Foundation to finishing, with a photo report every week.", duration: "24–30 months" },
  { title: "Handover", text: "Final inspection, flat registration and the keys.", duration: "1 month" },
];

/** Neighbourhoods and districts ArcDev has built in, drawn from the portfolio. */
export const AREAS = [
  "Uttara",
  "Gulshan",
  "Banani",
  "Elephant Road",
  "Satmasjid Road",
  "Mirpur",
  "Purbachal",
  "Gazipur",
  "Noakhali",
  "Sylhet",
];

export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Where does ArcDev build?",
    a: "Mostly across Dhaka, with completed work in Gazipur, Noakhali and a second office in Sylhet. Tell us where your land or project is and we'll tell you honestly whether it fits.",
  },
  {
    q: "Do I pay anything to get an offer for my land?",
    a: "No. The land visit and the written offer are free, and you're under no obligation to sign.",
  },
  {
    q: "How long does a building take?",
    a: "Most residential buildings take 30 to 36 months from approval to handover. Your agreement states the date.",
  },
  {
    q: "Can I visit a project under construction?",
    a: "Yes. Book a site visit through the enquiry form or call us, and an engineer will walk you round.",
  },
  {
    q: "How will I know what's happening once I'm involved?",
    a: "Landowners, buyers and investors get regular updates with photographs. A customer portal is on the way.",
  },
];

export const ABOUT = {
  story: [
    "Arc Development Pvt. Ltd. is a Dhaka-based team of architects, engineers, planners and interior designers that also manages construction, start to finish.",
    "The company's portfolio spans commercial towers, apartment buildings, factories, hospitality and dozens of interior fit-outs — for landowners who bring the plot, investors who bring capital, and businesses that need a building or a workspace built right. One team stays with each project from the first site visit to the last key.",
  ],
  values: [
    { title: "Written, not promised", text: "Shares, prices and timelines go into signed agreements before work starts." },
    { title: "Built to code", text: "Every building is designed to the Bangladesh National Building Code." },
    { title: "Open sites", text: "Owners and investors are welcome to visit at any stage of construction." },
    { title: "One team", text: "Design, construction and after-sales stay with the same people." },
  ],
  leadership: [
    {
      role: "Co-Founder & COO",
      name: "Deanna Alam",
      bio: "Bachelor of Architecture, University of Asia Pacific. Previously with DWm4 Architects (2007) and Ranks Real Estate (2012) before co-founding Arc Development.",
    },
    {
      role: "Managing Director",
      name: "Shihab Amin Mustafa",
      bio: "Architect and urban designer, LEED Professional. Bachelor of Architecture, BRAC University. Fulbright Scholar (Harvard), F.URP (MIT), MAUD (Oxford Brookes).",
      photo: "/images/team/shihab-amin-mustafa.webp",
    },
  ],
  milestones: [
    { year: "2007", text: "Founding partners begin their careers in architecture and real estate in Dhaka" },
    { year: "2012", text: "Groundwork laid for an independent practice combining design and development" },
    { year: "2014", text: "Doors Showroom at Jamuna Future Park completed — among the firm's early interior fit-outs" },
    { year: "2019", text: "Industrial portfolio grows with factories for Habitus Fashion and Appropriate Apparels" },
    { year: "2021", text: "Imperial Commercial Center and Joynal Garden underway, ArcDev's largest towers to date" },
    { year: "2026", text: "Portfolio spans commercial, residential, hospitality, industrial and interior work across Dhaka and Sylhet" },
  ],
};
