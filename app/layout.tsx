import type { Metadata } from "next";
import "./globals.css";
import "./glass.css";
import "./lab.css";
import "./discovery.css";
import "./kinetic.css";
import "./kinetic-sections.css";
import "./kinetic-mobile.css";

export const metadata: Metadata = {
  title: "Kutullo Moropane — Software Engineer & Founder",
  description: "Portfolio of Kutullo Moropane, a Pretoria-based software engineer and founder of Code Tech Agency. Explore web platforms, CRM automation and digital products.",
  keywords: ["Kutullo Moropane", "Software Engineer", "Zoho Developer", "CRM Automation", "Code Tech Agency", "South Africa"],
  robots: { index: true, follow: true },
  openGraph: { title: "Kutullo Moropane — Software Engineer & Founder", description: "Thoughtful software, connected systems, and products built for the real world.", type: "website", locale: "en_ZA" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}