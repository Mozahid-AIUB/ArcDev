import type { ServiceSlug } from "@arcdev/shared";

// SAMPLE copy for each service page, written for the mock-up.
// ArcDev must confirm every term, figure and promise before launch.

export interface ServiceContent {
  /** Photo behind the page header and on the home page card. */
  image: string;
  /** One line under the page title. */
  lead: string;
  overview: string[];
  forWho: string[];
  steps: { title: string; text: string }[];
  includes: string[];
  facts: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICE_CONTENT: Record<ServiceSlug, ServiceContent> = {
  fund: {
    image: "/images/sample/land-clearing.webp",
    lead: "You own the land. We fund and build the building on it.",
    overview: [
      "Many landowners in Dhaka have the plot but not the capital to build. ArcDev funds the whole construction — design, approvals, materials and labour — so the building goes up without you taking a loan.",
      "In return, the finished flats are divided between you and ArcDev in a ratio agreed before any work starts, and written into a registered agreement.",
    ],
    forWho: [
      "Landowners with a clear title and no funds to build",
      "Families who want flats to live in and flats to rent out",
      "Owners of older houses ready for redevelopment",
    ],
    steps: [
      { title: "Land visit", text: "We inspect the plot, check the title documents and the road width that decides how high you can build." },
      { title: "Written offer", text: "Building size, your share of flats, the timeline and the specification, on paper." },
      { title: "Agreement", text: "A joint development agreement and power of attorney are registered, protecting both sides." },
      { title: "Build and handover", text: "ArcDev funds and builds. Your flats are handed over and registered in your name." },
    ],
    includes: [
      "Full construction funding",
      "Architectural and structural design",
      "Building approval paperwork",
      "Construction supervision",
      "Registration of your flats",
    ],
    facts: [
      { label: "Minimum land", value: "3 katha" },
      { label: "Your share", value: "Agreed per project" },
      { label: "Typical build time", value: "30–36 months" },
      { label: "Construction cost to you", value: "None" },
    ],
    faqs: [
      { q: "Do I keep ownership of my land?", a: "Yes. The land stays in your name until the flats are divided and registered as agreed." },
      { q: "How is my share of flats decided?", a: "By plot size, location and how many storeys the plot allows. You see the exact number in the written offer before signing." },
      { q: "What if construction runs late?", a: "The agreement sets a handover date and what happens if it is missed. We walk you through that clause before you sign." },
    ],
  },

  landshare: {
    image: "/images/sample/land-plot.webp",
    lead: "Several owners, one plot, one building everyone agrees on.",
    overview: [
      "When a plot is shared between heirs or co-owners, agreeing on a sale or a build is often the hardest part. ArcDev works with every owner to turn the shared plot into a building where each owner gets their own flats.",
      "We also bring families together to buy land jointly and develop it, so each family owns a flat for less than buying one outright.",
    ],
    forWho: [
      "Inherited plots with several legal heirs",
      "Friends or colleagues who want to buy land together",
      "Co-owners who can't agree on selling",
    ],
    steps: [
      { title: "Owners' meeting", text: "We meet every owner, explain the options and answer questions in one room." },
      { title: "Title check", text: "Every share of the title is verified, so no owner is left out later." },
      { title: "Allocation plan", text: "Flats are allocated in proportion to each owner's share, in writing." },
      { title: "Joint build", text: "One agreement, one building, and each owner's flats registered separately." },
    ],
    includes: [
      "Meetings with all co-owners",
      "Title and inheritance document review",
      "Flat allocation plan",
      "Design, approvals and construction",
      "Separate registration for each owner",
    ],
    facts: [
      { label: "Owners per plot", value: "2 to 12" },
      { label: "Flats allocated", value: "By share of title" },
      { label: "Agreement", value: "One, signed by every owner" },
      { label: "Typical build time", value: "30–36 months" },
    ],
    faqs: [
      { q: "What if one owner doesn't agree?", a: "Nothing is signed until every owner agrees. We meet owners separately and together as many times as it takes." },
      { q: "Can we buy land together through ArcDev?", a: "Yes. We shortlist plots, check the documents and set up the joint purchase before development starts." },
      { q: "How do we decide who gets which floor?", a: "By a method every owner agrees to in advance, most often a lottery recorded in the agreement." },
    ],
  },

  interior: {
    image: "/images/sample/interior-living.webp",
    lead: "From bare walls to a home you can move straight into.",
    overview: [
      "Our interior team designs and finishes apartments, offices and shops — layout, lighting, furniture, kitchens and bathrooms — with drawings and an itemised quotation before work begins.",
      "You see 3D views of every room, choose materials from samples, and have one team responsible for the finish.",
    ],
    forWho: [
      "New flat owners before moving in",
      "Families renovating an older apartment",
      "Offices, clinics and showrooms",
    ],
    steps: [
      { title: "Site measure", text: "We measure the space and listen to how you live or work in it." },
      { title: "Concept", text: "Mood boards and a layout plan, revised until they fit." },
      { title: "3D and quotation", text: "Realistic views of each room and an itemised quotation." },
      { title: "Build", text: "Carpentry, electrical, paint and fittings — finished, cleaned and handed over." },
    ],
    includes: [
      "Space planning",
      "3D visualisation of every room",
      "Custom furniture and kitchen cabinets",
      "Lighting and false ceilings",
      "Supervision until handover",
    ],
    facts: [
      { label: "Design time", value: "2–3 weeks" },
      { label: "Build time", value: "6–10 weeks" },
      { label: "Quotation", value: "Itemised, before work starts" },
      { label: "Workmanship warranty", value: "12 months" },
    ],
    faqs: [
      { q: "Do you work on flats ArcDev didn't build?", a: "Yes. We design and finish any apartment, office or shop." },
      { q: "Can I supply my own materials?", a: "You can. The quotation separates labour from materials so you can compare." },
      { q: "Can I see the design before paying for the build?", a: "Yes. You approve the 3D views and the quotation before any work on site begins." },
    ],
  },

  engineering: {
    image: "/images/sample/engineering-drawings.webp",
    lead: "Drawings that pass approval and stand for decades.",
    overview: [
      "ArcDev's engineers prepare the full set of drawings a building needs — architectural, structural, electrical, plumbing and fire safety — designed to the Bangladesh National Building Code.",
      "We also review existing designs, interpret soil test results, and advise on repairs or adding storeys to older buildings.",
    ],
    forWho: [
      "Landowners building on their own",
      "Developers who need a design partner",
      "Owners adding floors to, or repairing, a building",
    ],
    steps: [
      { title: "Brief and soil test", text: "We confirm what you want to build and arrange the soil test the foundation depends on." },
      { title: "Architectural design", text: "Floor plans and elevations that fit the plot and the approval rules." },
      { title: "Structure and services", text: "Structural, electrical, plumbing and fire drawings, coordinated together." },
      { title: "Approval set", text: "A complete, signed drawing set ready to submit for approval." },
    ],
    includes: [
      "Architectural drawings",
      "Structural design and calculations",
      "Electrical, plumbing and fire safety drawings",
      "Soil test coordination",
      "Approval drawing set",
    ],
    facts: [
      { label: "Design standard", value: "BNBC" },
      { label: "Typical design time", value: "6–8 weeks" },
      { label: "Revisions", value: "Until approval" },
      { label: "You receive", value: "PDF and CAD files" },
    ],
    faqs: [
      { q: "Do you handle the approval application?", a: "We prepare the complete drawing set and can guide you through the submission." },
      { q: "Can you check a design someone else made?", a: "Yes. We review existing drawings and give a written report of any problems." },
      { q: "Is a soil test really necessary?", a: "Yes. The foundation design depends on it, and approval authorities ask for it." },
    ],
  },

  management: {
    image: "/images/sample/site-piling.webp",
    lead: "One team responsible for your project, start to finish.",
    overview: [
      "If you're building with your own money, ArcDev can run the whole project for you: budget, contractors, materials, quality checks and the schedule.",
      "You get a weekly report with photographs and spending, and one project manager to call.",
    ],
    forWho: [
      "Landowners building with their own funds",
      "Businesses building offices, schools or factories",
      "Owners living abroad who can't visit the site",
    ],
    steps: [
      { title: "Plan", text: "Budget, schedule and purchasing plan agreed before work starts." },
      { title: "Tender", text: "Contractors and suppliers compared on price and past work." },
      { title: "Supervise", text: "Engineers on site checking every stage against the drawings." },
      { title: "Report and hand over", text: "Weekly photo reports, a final inspection and handover documents." },
    ],
    includes: [
      "Budget and schedule",
      "Contractor and supplier selection",
      "Quality control on site",
      "Weekly photo and cost reports",
      "Handover and defect list",
    ],
    facts: [
      { label: "Reporting", value: "Weekly, with photos" },
      { label: "Site presence", value: "Engineer on site daily" },
      { label: "Fee", value: "Share of build cost" },
      { label: "Project size", value: "Any" },
    ],
    faqs: [
      { q: "Who pays the contractors?", a: "You do, directly or through a project account. We approve each payment against work actually done." },
      { q: "Can you take over a project already underway?", a: "Yes. We start with a site audit and a report on where the project really stands." },
      { q: "I live abroad. How will I follow the work?", a: "Through weekly reports with photographs and video calls from the site when you want them." },
    ],
  },

  investment: {
    image: "/images/sample/glass-towers.webp",
    lead: "Put your savings into buildings, with every step reported.",
    overview: [
      "ArcDev invites investors to fund named projects. Your money is tied to a specific building, and you receive statements as construction progresses.",
      "Returns come from the sale of finished flats. The amount, term and profit share are set out in a written agreement before you invest. As with any investment, returns are not guaranteed.",
    ],
    forWho: [
      "Individuals looking beyond bank deposits",
      "Bangladeshis working abroad who want to invest at home",
      "Businesses with surplus funds",
    ],
    steps: [
      { title: "Choose a project", text: "See the building, its budget and timeline before committing." },
      { title: "Agreement", text: "Amount, term and profit share written into a signed agreement." },
      { title: "Statements", text: "Regular statements with construction photographs and spending." },
      { title: "Payout", text: "Capital and profit paid as flats are sold, as the agreement sets out." },
    ],
    includes: [
      "Investment tied to a named project",
      "Written investment agreement",
      "Regular progress statements",
      "Investor portal (coming soon)",
      "Direct contact with the finance team",
    ],
    facts: [
      { label: "Minimum investment", value: "BDT 5 lakh" },
      { label: "Term", value: "12–36 months" },
      { label: "Statements", value: "Quarterly" },
      { label: "Returns", value: "Not guaranteed" },
    ],
    faqs: [
      { q: "Is my return guaranteed?", a: "No. Returns depend on the project and on flat sales. The agreement explains how profit — and any shortfall — is handled." },
      { q: "Can I visit the project I've invested in?", a: "Yes. Investors are welcome on site with a member of our team." },
      { q: "Can I invest from abroad?", a: "Yes. Agreements can be signed through a representative in Bangladesh, with payments through banking channels." },
    ],
  },
};
