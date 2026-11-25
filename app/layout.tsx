import type { Metadata } from "next";
import "./globals.css";
import "./discovery.css";
import "./career.css";

export const metadata: Metadata = {
  title: "Kutullo Moropane — Zoho Developer & Software Developer",
  description: "Portfolio of Kutullo Moropane, a Pretoria-based Zoho Developer and software developer, and founder of Code Tech Agency. Business systems, API integrations, automation and full-stack products.",
  keywords: ["Kutullo Moropane", "Zoho Developer", "Software Developer", "Systems Integration", "Deluge", "Full-Stack Developer", "CRM Automation", "Code Tech Agency", "Pretoria", "South Africa"],
  robots: { index: true, follow: true },
  openGraph: { title: "Kutullo Moropane — Zoho Developer & Software Developer", description: "Thoughtful software, connected systems, and products built for the real world.", type: "website", locale: "en_ZA" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}