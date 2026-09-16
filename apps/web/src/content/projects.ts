import type { Project } from "@arcdev/shared";

// SAMPLE ENTRIES so the layouts can be built and reviewed.
// Every name, number and date below is made up. Replace with ArcDev's real projects.
export const PROJECTS: Project[] = [
  {
    slug: "sample-project-one",
    name: "Sample Project One",
    location: "[Area], [City]",
    status: "ongoing",
    summary: "Sample ongoing residential building, used to preview the project card and detail page.",
    description:
      "This is placeholder text for the project description. ArcDev will supply the real description, photographs and figures for each project.",
    landKatha: 5,
    storeys: 9,
    units: 16,
    flatSizesSqft: [1250, 1450],
    handover: "[Month Year]",
    progress: 40,
    images: [],
  },
  {
    slug: "sample-project-two",
    name: "Sample Project Two",
    location: "[Area], [City]",
    status: "ongoing",
    summary: "Sample ongoing project at an earlier stage of construction.",
    description:
      "This is placeholder text for the project description. ArcDev will supply the real description, photographs and figures for each project.",
    landKatha: 8,
    storeys: 12,
    units: 30,
    flatSizesSqft: [1100, 1350, 1600],
    handover: "[Month Year]",
    progress: 15,
    images: [],
  },
  {
    slug: "sample-project-three",
    name: "Sample Project Three",
    location: "[Area], [City]",
    status: "upcoming",
    summary: "Sample upcoming project, before construction starts.",
    description:
      "This is placeholder text for the project description. ArcDev will supply the real description, photographs and figures for each project.",
    landKatha: 6,
    storeys: 10,
    units: 18,
    images: [],
  },
  {
    slug: "sample-project-four",
    name: "Sample Project Four",
    location: "[Area], [City]",
    status: "completed",
    summary: "Sample completed and handed-over project.",
    description:
      "This is placeholder text for the project description. ArcDev will supply the real description, photographs and figures for each project.",
    landKatha: 4,
    storeys: 7,
    units: 12,
    flatSizesSqft: [1200],
    handover: "[Month Year]",
    images: [],
  },
];
