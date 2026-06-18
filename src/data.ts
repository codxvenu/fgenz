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
    id: "marketing",
    title: "Marketing",
    number: "01",
    iconName: "campaign",
    description: "Promoting your business online and offline to reach more customers and build reliable, organic brand awareness.",
    highlights: [
      "Short-form social media videos (TikTok, Reels, Shorts)",
      "In-person flyers, popups, and street marketing",
      "High-converting paid social media ad campaigns"
    ],
    themeColor: "primary"
  },
  {
    id: "branding",
    title: "Branding",
    number: "02",
    iconName: "brush",
    description: "Creating clean visual identities, modern logos, and color palettes that make your company instantly recognizable and trusted.",
    highlights: [
      "Custom brand logos & graphic design",
      "Modern colors, fonts, and clean style guides",
      "Physical packaging, websites, and asset design"
    ],
    themeColor: "tertiary"
  },
  {
    id: "staffing",
    title: "Staffing",
    number: "03",
    iconName: "groups",
    description: "Hiring talented, skilled, and energetic workers for your team quickly, without the typical slow HR process.",
    highlights: [
      "Direct screening and background reviews",
      "Fast matching with qualified candidates",
      "Onboarding setup and interview training support"
    ],
    themeColor: "secondary"
  },
  {
    id: "acquisition",
    title: "Acquisition",
    number: "04",
    iconName: "target",
    description: "Finding your ideal audience and setting up marketing channels that convert casual visitors into lifetime buyers.",
    highlights: [
      "Simple website audits to increase card signups",
      "Referral programs that reward user invites",
      "Online community setup to keep customers active"
    ],
    themeColor: "white"
  },
  {
    id: "support",
    title: "Support",
    number: "05",
    iconName: "insights",
    description: "Helping you open physical offices, find local commercial leases, and network with successful founders in your area.",
    highlights: [
      "Local location research and property selection",
      "Actionable playbooks to launch in new cities",
      "Founder introductions and peer mentorship circles"
    ],
    themeColor: "primary"
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
