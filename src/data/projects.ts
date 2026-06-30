import sitePhoto from "../assets/project_real_estate/last.jpeg";
import dimensionedPlan from "../assets/project_real_estate/02.png";
import renderedPlan from "../assets/project_real_estate/one.jpg";
import twinLayout from "../assets/project_real_estate/02.jpg";
import terraceSuite from "../assets/project_real_estate/03.jpg";
import compactStudio from "../assets/project_real_estate/04.png";

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  caption: string;
  isExactMatch: boolean;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  tag: string;
  year: string;
  location?: string;
  summary?: string;
  specs?: ProjectSpec[];
  floorPlans?: ProjectGalleryImage[];
  inspiration?: ProjectGalleryImage[];
  sitePhoto?: { src: string; alt: string; caption: string };
  cta?: { label: string; href: string };
}

export const projects: ProjectRecord[] = [
  {
    slug: "capsule-homes-masaki",
    title: "Capsule Homes — Retrofit, Masaki",
    tag: "Real Estate · Modular Living",
    year: "2026",
    location: "Retrofit, Masaki — Dar es Salaam",
    summary:
      "A compact, fully-furnished modular capsule home delivered and installed on-site — engineered for fast deployment without compromising design.",
    specs: [
      { label: "External Dimensions", value: "9500 × 3300 × 3200 mm" },
      { label: "Product Area", value: "Approx. 31 m²" },
      { label: "Total Weight", value: "Approx. 7 T" },
      { label: "Power Consumption", value: "10 KW" },
      { label: "Occupancy", value: "2–4 people" },
      { label: "Layout", value: "1 bedroom, 1 living room, 1 bathroom" },
      {
        label: "Customization",
        value: "Kitchen, furniture, appliances, curtains available on request",
      },
    ],
    floorPlans: [
      {
        src: dimensionedPlan,
        alt: "Dimensioned floor plan of the X6 capsule, 9.5 by 3.3 metres",
        caption: "Dimensioned floor plan — 9.5 × 3.3m",
        isExactMatch: true,
      },
      {
        src: renderedPlan,
        alt: "Rendered top-down layout showing living room, bedroom and bathroom",
        caption: "Interior layout — living room, bedroom, bathroom",
        isExactMatch: true,
      },
    ],
    inspiration: [
      {
        src: twinLayout,
        alt: "Rendered top-down layout of an alternate twin-bed capsule configuration",
        caption: "Design inspiration — alternate twin layout",
        isExactMatch: false,
      },
      {
        src: terraceSuite,
        alt: "Rendered top-down layout of a bedroom suite with an outdoor terrace",
        caption: "Design inspiration — terrace suite concept",
        isExactMatch: false,
      },
      {
        src: compactStudio,
        alt: "Dimensioned floor plan of a smaller compact studio capsule",
        caption: "Design inspiration — compact studio plan",
        isExactMatch: false,
      },
    ],
    sitePhoto: {
      src: sitePhoto,
      alt: "Capsule home unit on a flatbed truck during delivery",
      caption: "Delivered to Retrofit, Masaki",
    },
    cta: { label: "Interested in a capsule for your site?", href: "/contact" },
  },
  {
    slug: "brand-system-regional-bank",
    title: "Brand System for a Regional Bank",
    tag: "Brand · Digital",
    year: "2026",
  },
  {
    slug: "bbn-network-launch-campaign",
    title: "BBN Network Launch Campaign",
    tag: "Campaign · Strategy",
    year: "2026",
  },
  {
    slug: "telecom-replatforming-story",
    title: "Telecom Re-Platforming Story",
    tag: "Editorial · Film",
    year: "2025",
  },
  {
    slug: "cross-border-market-entry",
    title: "Cross-Border Market Entry",
    tag: "Research · GTM",
    year: "2025",
  },
  {
    slug: "civic-tech-movement",
    title: "Civic Tech Movement",
    tag: "Brand · Product",
    year: "2025",
  },
  {
    slug: "agritech-series-b-narrative",
    title: "Agritech Series B Narrative",
    tag: "Narrative · Pitch",
    year: "2024",
  },
];
