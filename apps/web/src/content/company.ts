// SAMPLE figures and copy for the website mock-up.
// Every number, year and claim here must be replaced with ArcDev's real details before launch.

export const COMPANY_FACTS: { label: string; value: string }[] = [
  { label: "In operation", value: "Since 2014" },
  { label: "Head office", value: "Dhaka, Bangladesh" },
  { label: "Services", value: "Six, under one roof" },
  { label: "Working with", value: "Landowners, buyers, investors" },
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
  { value: 12, label: "years building in Dhaka" },
  { value: 38, label: "projects handed over" },
  { value: 9, label: "buildings under construction" },
  { value: 1.2, decimals: 1, suffix: "M", label: "sq ft delivered" },
  { value: 420, suffix: "+", label: "families moved in" },
];

export const PROCESS: { title: string; text: string; duration: string }[] = [
  { title: "Land assessment", text: "Plot visit, title check and how high the plot allows you to build.", duration: "1–2 weeks" },
  { title: "Agreement", text: "A written offer first, then a registered agreement both sides sign.", duration: "2–4 weeks" },
  { title: "Design and approval", text: "Soil test, full drawing set and building approval.", duration: "3–6 months" },
  { title: "Construction", text: "Foundation to finishing, with a photo report every week.", duration: "24–30 months" },
  { title: "Handover", text: "Final inspection, flat registration and the keys.", duration: "1 month" },
];

/** Neighbourhoods for the scrolling band on the home page. */
export const AREAS = [
  "Bashundhara R/A",
  "Uttara",
  "Mirpur DOHS",
  "Dhanmondi",
  "Aftabnagar",
  "Banani",
  "Mohammadpur",
  "Bashabo",
];

export const HOME_FAQS: { q: string; a: string }[] = [
  {
    q: "Where does ArcDev build?",
    a: "Mostly in Dhaka's residential areas. Tell us where your land is and we'll tell you honestly whether it fits.",
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
    "ArcDev began as a small engineering practice in Dhaka and grew into a developer that can take a project from an empty plot to finished flats.",
    "Today the company funds construction, designs and engineers buildings, manages sites and brings investors into projects — all under one roof, so landowners, buyers and investors deal with one team from the first visit to the last key.",
  ],
  values: [
    { title: "Written, not promised", text: "Shares, prices and timelines go into signed agreements before work starts." },
    { title: "Built to code", text: "Every building is designed to the Bangladesh National Building Code." },
    { title: "Open sites", text: "Owners and investors are welcome to visit at any stage of construction." },
    { title: "One team", text: "Design, construction and after-sales stay with the same people." },
  ],
  leadership: [
    { role: "Managing Director", name: "Name to be confirmed" },
    { role: "Head of Engineering", name: "Name to be confirmed" },
    { role: "Head of Finance", name: "Name to be confirmed" },
  ],
  milestones: [
    { year: "2014", text: "Founded as an engineering design practice" },
    { year: "2016", text: "First joint development with a landowner in Mirpur" },
    { year: "2019", text: "Interior design team formed" },
    { year: "2021", text: "Tenth building handed over" },
    { year: "2024", text: "Investment programme opened to individual investors" },
    { year: "2026", text: "Customer portal for buyers and investors announced" },
  ],
};
