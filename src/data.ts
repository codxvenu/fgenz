export interface ServiceItem {
  id: string;
  title: string;
  number: string;
  iconName: string;
  description: string;
  highlights: string[];
  themeColor: string; // 'primary', 'tertiary', 'secondary', 'white' to fit neo-brutal aesthetics
}

export interface VentureItem {
  name: string;
  tag: string;
  description: string;
  imageUrl: string;
  bgColorClass: string;
  rotateClass: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  highlightCard: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-dev",
    title: "Web Development",
    number: "01",
    iconName: "campaign",
    description: "Engineering blazing-fast, premium responsive web interfaces and digital systems styled for extreme performance and pixel-perfection.",
    highlights: ["Custom React & Next.js architectures", "Headless CMS integration & setups", "Ultra-high lighthouse page speed scores"],
    themeColor: "dark"
  },
  {
    id: "brand-strategy",
    title: "Brand Strategy",
    number: "02",
    iconName: "brush",
    description: "Architecting memorable visual identities, premium guidelines, and creative positioning strategies that establish profound customer trust.",
    highlights: ["Logo, typography, and asset system curation", "Dynamic identity stylebooks", "Visual asset decks & vector designs"],
    themeColor: "green"
  },
  {
    id: "brand-strategy-duplicate",
    title: "Brand Strategy",
    number: "03",
    iconName: "brush",
    description: "Designing extensive typography pairing sets, physical stationery layouts, and interactive style rules matching your unique story.",
    highlights: ["Custom visual storytelling playbooks", "Corporate brand books", "Physical styling assets"],
    themeColor: "dark"
  },
  {
    id: "growth-marketing",
    title: "Growth Marketing",
    number: "04",
    iconName: "target",
    description: "Driving hyper-targeted user distribution loops, organic product-led referrals, and ad campaign systems focused on long-term scale.",
    highlights: ["Viral onboarding mechanism setups", "Multi-tier social distribution mechanics", "Organic loop engineering"],
    themeColor: "purple"
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    number: "05",
    iconName: "brush",
    description: "Crafting bespoke digital interfaces, high-fidelity prototypes, and sleek UX paths built strictly to capture and hold consumer attention.",
    highlights: ["Interactive pixel-perfect design systems", "Rich motion prototype structures", "Frictionless transactional checkout flows"],
    themeColor: "purple"
  },
  {
    id: "performance-mkt",
    title: "Performance Marketing",
    number: "06",
    iconName: "insights",
    description: "Deploying high-intent analytical spend across multi-channel models to secure high conversion rates at calculated acquisition costs.",
    highlights: ["Intelligent multi-tier attribution metrics", "Data-backed conversion loops", "Dynamic A/B variation systems"],
    themeColor: "dark"
  },
  {
    id: "social-media",
    title: "Social Media Management",
    number: "07",
    iconName: "groups",
    description: "Nurturing active and deeply loyal communities across major online feeds, speaking your audience's language fluently and directly.",
    highlights: ["Real-time community moderation systems", "Multi-feed cross-posting playbooks", "Direct-message outreach tactics"],
    themeColor: "purple"
  },
  {
    id: "growth-marketing-duplicate",
    title: "Growth Marketing",
    number: "08",
    iconName: "campaign",
    description: "Amplifying high-converting channels to feed your continuous customer pipelines with certified active ready-to-convert leads.",
    highlights: ["Hyper-granular custom funnel audits", "Influencer connection pipelines", "Conversion rate optimization lists"],
    themeColor: "dark"
  },
  {
    id: "seo-optimization",
    title: "SEO Optimization",
    number: "09",
    iconName: "target",
    description: "Achieve dominant rankings for critical target queries with state-of-the-art search index setups and crawlable contents.",
    highlights: ["Performance-oriented content strategies", "Speedy crawler-friendly layouts", "Clean metadata structures"],
    themeColor: "dark"
  },
  {
    id: "content-creation",
    title: "Content Creation",
    number: "10",
    iconName: "brush",
    description: "Producing stunning, scroll-stopping micro-videos, cinema-grade graphics, and sleek copies that connect with contemporary subcultures.",
    highlights: ["High-retention short-form video formats", "Slick editorial typography assets", "Interactive vector motion designs"],
    themeColor: "green"
  },
  {
    id: "content-creation-duplicate",
    title: "Content Creation",
    number: "11",
    iconName: "brush",
    description: "Constructing high-impact messaging systems, audio-visual storytelling logs, and premium imagery curated for ultimate brand authority.",
    highlights: ["Custom script decks", "Professional lifestyle photography guides", "Acoustic branding cues"],
    themeColor: "purple"
  },
  {
    id: "social-media-duplicate",
    title: "Social Media Management",
    number: "12",
    iconName: "groups",
    description: "Designing tailored influencer rosters, organic creator content logs, and dedicated event promotions driving maximum physical and digital footprint.",
    highlights: ["Creator partnership databases", "Local popup launch roadmaps", "Interactive trendjacking methods"],
    themeColor: "dark"
  },
  {
    id: "email-marketing",
    title: "Email Marketing",
    number: "13",
    iconName: "campaign",
    description: "Forging close digital relationships through personalized retention copy decks, private drop notifications, and loyalty incentives.",
    highlights: ["Highly segmented drip workflows", "Captivating product-reveal copy", "Custom subscriber dashboards"],
    themeColor: "dark"
  }
];

export const VENTURES_DATA: VentureItem[] = [
  {
    name: "Neon Grinds",
    tag: "Branding + Operations",
    description: "A bright, energetic shared workspace and coffeehouse setup for creators, freelancers, and team meetings.",
    imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80",
    bgColorClass: "bg-primary-container",
    rotateClass: "translate-x-3 translate-y-3 -rotate-2"
  },
  {
    name: "Drift App",
    tag: "Tech Support",
    description: "An easy-to-use search index connecting independent contractors with fast-growing online brands.",
    imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=600&q=80",
    bgColorClass: "bg-tertiary",
    rotateClass: "-translate-x-3 translate-y-3 rotate-1"
  },
  {
    name: "Static Gear",
    tag: "Retail & Apparel Launch",
    description: "A sustainable apparel brand made in small batches with premium fabrics and modern street designs.",
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
    bgColorClass: "bg-secondary-container",
    rotateClass: "translate-x-2 -translate-y-2 rotate-2"
  }
];

export const PROCESS_DATA: ProcessStep[] = [
  {
    number: "1",
    title: "Understand",
    description: "We review your brand goals, current bottlenecks, and target numbers. We find exactly where the easiest growth wins are hiding.",
    highlightCard: false
  },
  {
    number: "2",
    title: "Solve",
    description: "We design a clear, step-by-step roadmap tailored specifically to your company. No guesswork, only proven methods.",
    highlightCard: true
  },
  {
    number: "3",
    title: "Execute",
    description: "We don't just hand you a slides presentation and leave. We plug in our team, run advertisements, launch your site, and support you directly.",
    highlightCard: false
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: "Why hire a single agency like GBA instead of multiple specialists?",
    answer: "Working with separate agencies causes serious communication gaps. When your designer argues with your ad manager, and your hiring team works in isolation, you get slow execution and wasted budget. GBA handles your branding, marketing, sales, and staffing under one aligned process to help you scale faster."
  },
  {
    question: "How quickly can we see results with GBA?",
    answer: "We prefer fast execution to long academic plans. Within a few business days of solidifying our roadmap, our team deploys localized tests, setups target ads, and tracks customer interactions to gather real feedback instantly."
  },
  {
    question: "Do you only work with brands that target a younger audience?",
    answer: "No. While our team is young and agile, our growth framework works globally. Radical transparency, high speed, reliable websites, honest messaging, and bold designs yield results for any modern business trying to grow."
  },
  {
    question: "What is the 'No-Nonsense Founder Guarantee'?",
    answer: "Agencies often drag out projects to bill more search hours. We focus strictly on clear, observable outcomes: online sales, web traffic, and open roles filled. If our strategy does not perform, we pivot and improve our processes instantly."
  }
];
