/**
 * Career content shared by both portfolio designs.
 * Kept in step with Kutullo's CV. Client names are deliberately left out.
 */

export const cvHref = "/cv/Kutullo_Moropane_CV.pdf";
export const email = "moropaneki@gmail.com";
export const linkedin = "https://www.linkedin.com/in/kutullo-innocent-moropane-b65495319";
export const github = "https://github.com/IKcracker";

export type Role = {
  period: string;
  organisation: string;
  context: string;
  progression?: string[];
  points: string[];
};

export const experience: Role[] = [
  {
    period: "Dec 2025 — Present",
    organisation: "Infolytics SA",
    context: "Zoho implementation partner · Centurion",
    progression: ["Developer Intern", "Junior Zoho Developer", "Zoho Developer"],
    points: [
      "Lead client implementations from scope of work to deployment, choosing and connecting the Zoho One applications that fit each business. Three client projects delivered into production.",
      "Write Deluge custom functions, workflows, scheduled automations and approval processes that replace manual administration.",
      "Build REST API and webhook integrations between Zoho and external platforms, with callbacks, duplicate prevention and structured error reporting.",
      "Run demonstrations, training and onboarding, and trace production issues through logs, API responses and execution histories.",
    ],
  },
  {
    period: "2026 — Present",
    organisation: "Code Tech Agency",
    context: "Founder & software developer · independent",
    points: [
      "Designed and built the agency’s business platform: enquiries, leads, sales pipeline, quotations, projects, invoices and payments.",
      "Next.js, TypeScript, PostgreSQL and Prisma, with role-based access, payment integration and LLM-powered proposal tools.",
    ],
  },
  {
    period: "Jul 2024 — Mar 2025",
    organisation: "mLab · CodeTribe Coding Academy",
    context: "Software development trainee · Pretoria",
    points: [
      "Tech lead and full-stack developer on the final project for an external SME client: coordinated the team, resolved Git conflicts and mentored fellow trainees.",
    ],
  },
];

export type CaseStudy = { index: string; sector: string; title: string; summary: string; stack: string; badge?: string };

export const clientWork: CaseStudy[] = [
  {
    index: "01",
    sector: "Financial services",
    title: "Finance automation in the CRM",
    summary: "Automated finance processes and document generation inside the CRM, and built custom interfaces that give staff the information they need without leaving it.",
    stack: "Zoho CRM · Zoho Books · Deluge",
    badge: "Innovation Spotlight",
  },
  {
    index: "02",
    sector: "Equipment rental",
    title: "Field service integration",
    summary: "Connected an external operations platform to Zoho FSM through APIs and webhooks, keeping records in sync with structured responses, error handling and duplicate prevention.",
    stack: "Zoho FSM · REST APIs · Webhooks · JSON",
  },
  {
    index: "03",
    sector: "Events",
    title: "CRM-driven event management",
    summary: "Configured event and ticketing processes in the CRM, with automation that replaced manual admin.",
    stack: "Zoho CRM · Deluge",
  },
];

export type LabProject = { name: string; category: string; description: string; stack: string; repo?: string };

export const lab: LabProject[] = [
  {
    name: "CodeDevCloud",
    category: "Developer platform",
    description: "Visual website building and real code in one place. Generates Next.js applications, keeps the visual editor and source in sync, and deploys to Vercel.",
    stack: "Next.js · TypeScript · Vercel",
  },
  {
    name: "DIBCIA",
    category: "AI SaaS",
    description: "An AI platform for business intelligence and automation, with organisation-based projects, an AI Studio and a multi-model architecture.",
    stack: "Next.js · PostgreSQL · OpenAI · Claude · Gemini",
  },
  {
    name: "LoveBind",
    category: "Mobile product",
    description: "Compatibility-based matchmaking with identity verification, moderation, and reporting and blocking for member safety.",
    stack: "Authentication · Verification · Safety",
    repo: "https://github.com/IKcracker/LoveBind",
  },
];

export const stack: [string, string][] = [
  ["Zoho One", "CRM, Books, Inventory, FSM, Creator, Flow, Desk, Projects, Writer, Campaigns, Cliq, Zia, Agents"],
  ["Integration", "Deluge, REST APIs, webhooks, JSON, data synchronisation, Postman"],
  ["Full-stack", "TypeScript, JavaScript, Next.js, React, Node.js, NestJS, React Native, Expo"],
  ["Data & delivery", "PostgreSQL, Prisma, Neon, SQL, Git, GitHub, Vercel"],
  ["AI", "OpenAI and Claude APIs, tool calling, structured outputs, Zoho Zia and Agents"],
];
