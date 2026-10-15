import Image from "next/image";
import type { ReactNode } from "react";
import ProjectScreenshot from "./project-screenshot";
import { DesignVersionToggle } from "./portfolio-experience";

const ENQUIRY = "https://www.codetechagency.com/contact";
const featured = [
  { id: "01", name: "VelaBridge", type: "Bridging-finance website", url: "https://velabridge.vercel.app/", icon: "◇" },
  { id: "02", name: "Noval Logistics", type: "Logistics website & CRM demo", url: "https://noval-logistics.vercel.app/", icon: "↗" },
  { id: "03", name: "Vaya", type: "Intercity mobility product", url: "https://vaya-wego.vercel.app/", icon: "⌁" },
  { id: "04", name: "Code Tech Agency", type: "Websites, CRM & software", url: "https://www.codetechagency.com/", icon: "✳" },
];
const projects = [
  { id:"01", name:"VelaBridge", type:"FINANCE / WEB EXPERIENCE", summary:"A refined bridging-finance website that makes services clear and the next step simple.", url:"https://velabridge.vercel.app/", domain:"velabridge.vercel.app" },
  { id:"02", name:"Noval Logistics", type:"LOGISTICS / OPERATIONS", summary:"A freight-focused experience and operations concept built around moving things forward.", url:"https://noval-logistics.vercel.app/", domain:"noval-logistics.vercel.app" },
  { id:"03", name:"Vaya", type:"MOBILITY / PRODUCT", summary:"A South African intercity travel platform connecting passengers with planned journeys.", url:"https://vaya-wego.vercel.app/", domain:"vaya-wego.vercel.app" },
];
const capabilities = [
  { num:"01", icon:"◈", title:"Web & product engineering", text:"Responsive websites, connected portals and useful digital products designed around real needs.", tags:"NEXT.JS  /  REACT  /  TYPESCRIPT" },
  { num:"02", icon:"⌘", title:"CRM & integrations", text:"Business automation, Zoho ecosystems and API integrations that make disconnected tools work together.", tags:"ZOHO  /  DELUGE  /  APIS" },
  { num:"03", icon:"◇", title:"Mobile & MVP development", text:"Focused product experiences, prototypes and mobile journeys built to test ideas and evolve.", tags:"REACT NATIVE  /  EXPO  /  UX" },
];
function Arrow({size=17}:{size?:number}) {return <svg aria-hidden="true" width={size} height={size} fill="none" viewBox="0 0 24 24"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round"/></svg>;}
function SectionLabel({children,number}:{children:ReactNode;number:string}) {return <p className="glass-eyebrow"><span>{number}</span><span className="glass-eyebrow-line"/>{children}</p>;}
function GlassLogo(){return <a href="#top" className="glass-logo" aria-label="Kutullo Moropane home">KUTULLO<span>.</span></a>;}

export default function GlassPortfolio() {
return <div className="glass-site" id="top">
  <a className="glass-skip" href="#glass-content">Skip to content</a>
  <div className="glass-ambient glass-ambient-one" aria-hidden="true"/>
  <div className="glass-ambient glass-ambient-two" aria-hidden="true"/>
  <header className="glass-header"><div className="glass-container glass-header-inner">
    <GlassLogo/>
    <nav className="glass-nav" aria-label="Portfolio navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav>
    <div className="glass-header-actions"><DesignVersionToggle/><a href="#contact" className="glass-header-cta">Let&apos;s Work <Arrow size={16}/></a></div>
    <details className="glass-mobile-menu"><summary>Menu <span>+</span></summary><nav aria-label="Mobile portfolio navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#experience">Experience</a><a href="#contact">Contact</a></nav></details>
  </div></header>
  <main id="glass-content">
    <section className="glass-container glass-hero" aria-labelledby="glass-hero-title">
      <div className="glass-hero-copy">
        <p className="glass-hero-kicker"><span className="glass-live-dot"/> SOFTWARE ENGINEER <span>/</span> ZOHO DEVELOPER <span>/</span> FOUNDER</p>
        <h1 id="glass-hero-title">Kutullo Innocent<br/><em>Moropane.</em></h1>
        <p className="glass-hero-summary">I build modern web, mobile and business solutions that solve real problems. From CRM automation to scalable digital products, my focus is technology that makes work simpler.</p>
        <div className="glass-hero-ctas"><a className="glass-button glass-button-primary" href="#work">View My Work <Arrow size={18}/></a><a className="glass-button glass-button-secondary" href="#about">Get to know me <Arrow size={15}/></a></div>
        <div className="glass-socials" aria-label="Social profiles"><a href="https://github.com/IKcracker" target="_blank" rel="noopener noreferrer">GitHub <Arrow size={13}/></a><span aria-hidden="true"/><a href="https://www.codetechagency.com/" target="_blank" rel="noopener noreferrer">Code Tech Agency <Arrow size={13}/></a><span aria-hidden="true"/><a href="#contact">Contact <Arrow size={13}/></a></div>
      </div>
      <div className="glass-hero-visual">
        <div className="glass-orbit glass-orbit-one" aria-hidden="true"/><div className="glass-orbit glass-orbit-two" aria-hidden="true"/><div className="glass-portrait-glow" aria-hidden="true"/>
        <Image src="/images/kutullo-hero-832c8ce.webp" alt="Portrait of Kutullo Moropane" width={1122} height={1402} sizes="(max-width: 780px) 93vw, (max-width: 1200px) 50vw, 620px" className="glass-hero-portrait" priority/>
        <div className="glass-portrait-label"><span className="glass-live-dot"/> Building with purpose <span>— 2026</span></div>
        <div className="glass-hero-counter" aria-hidden="true"><span>01</span><i/><span>02</span><i/><span>03</span></div>
      </div>
    </section>

    <section className="glass-container glass-feature-section" aria-label="Featured work">
      <div className="glass-feature-label"><span>FEATURED WORK</span><span>SELECTED PROJECTS / 2026</span></div>
      <div className="glass-feature-grid">{featured.map(item=><a className="glass-feature-card" href={item.url} key={item.id} target="_blank" rel="noopener noreferrer"><span className="glass-feature-icon" aria-hidden="true">{item.icon}</span><span className="glass-feature-text"><strong>{item.name}</strong><small>{item.type}</small></span><span className="glass-feature-action">View project <Arrow size={12}/></span></a>)}</div>
    </section>

    <section className="glass-container glass-content-section" id="work">
      <SectionLabel number="02">SELECTED PROJECTS</SectionLabel>
      <div className="glass-section-title-row"><h2>Work that <em>speaks for itself.</em></h2><p>Digital experiences and product ideas I&apos;ve built or developed. Open each project to see the real work.</p></div>
      <div className="glass-project-grid">{projects.map(project=><article className="glass-project-card" key={project.id}>
        <a href={project.url} className="glass-project-preview" target="_blank" rel="noopener noreferrer" aria-label={"Open "+project.name+" live demo"}>
          <div className="glass-preview-toolbar" aria-hidden="true"><span className="glass-window-dots"><i/><i/><i/></span><span>{project.domain}</span><Arrow size={12}/></div>
          <div className="glass-preview-screenshot"><ProjectScreenshot name={project.name} url={project.url}/></div><span className="glass-preview-visit">Explore live demo <Arrow size={13}/></span>
        </a>
        <div className="glass-project-details"><span>{project.type}</span><a href={project.url} target="_blank" rel="noopener noreferrer"><h3>{project.name}</h3><Arrow size={18}/></a><p>{project.summary}</p></div>
      </article>)}</div>
    </section>

    <section className="glass-container glass-content-section glass-about-section" id="about">
      <SectionLabel number="03">ABOUT ME</SectionLabel>
      <div className="glass-about-grid"><div className="glass-about-image glass-panel"><Image src="/images/kutullo-workspace.webp" alt="Kutullo at his software development workspace" width={760} height={820} sizes="(max-width: 780px) 100vw, 43vw"/><span>BUILD / SHIP / IMPROVE / REPEAT</span></div>
        <div className="glass-about-description"><h2>Curious by nature.<br/><em>Intentional by design.</em></h2><p>I&apos;m Kutullo, a South African software engineer and founder of Code Tech Agency. My work lives where people, processes and technology meet.</p><p>I create web applications, automate business workflows, connect CRMs and explore new product ideas. I value clean design, real-world usefulness and systems that can grow with the businesses behind them.</p><a href="#contact" className="glass-text-link">Let&apos;s build something useful <Arrow size={17}/></a></div>
      </div>
    </section>

    <section className="glass-content-section glass-skills-section" id="skills"><div className="glass-container">
      <SectionLabel number="04">SKILLS & SERVICES</SectionLabel>
      <div className="glass-section-title-row"><h2>Right tools.<br/><em>Better outcomes.</em></h2><p>From customer-facing products to systems running behind them, I focus on the right technology for the problem.</p></div>
      <div className="glass-capability-grid">{capabilities.map(cap=><article className="glass-capability-card glass-panel" key={cap.num}><div className="glass-capability-head"><span className="glass-capability-icon">{cap.icon}</span><small>{cap.num}</small></div><h3>{cap.title}</h3><p>{cap.text}</p><div className="glass-capability-tags">{cap.tags}</div></article>)}</div>
    </div></section>

    <section className="glass-container glass-content-section" id="experience">
      <SectionLabel number="05">EXPERIENCE</SectionLabel>
      <div className="glass-section-title-row"><h2>Engineering meets<br/><em>business thinking.</em></h2><p>I combine product design, development and business-process experience to create technology people can actually use.</p></div>
      <div className="glass-experience-list">{[
        ["01","Software engineering","Building web platforms, responsive experiences and production-minded software."],
        ["02","Zoho development & automation","Improving CRM workflows, connected operations and business integrations."],
        ["03","Founder — Code Tech Agency","Building useful solutions for companies and exploring new product ideas."]
      ].map(([num,title,description])=><div className="glass-experience-item" key={num}><span>{num}</span><h3>{title}</h3><p>{description}</p><Arrow size={17}/></div>)}</div>
    </section>

    <section className="glass-container glass-content-section" id="contact"><div className="glass-contact glass-panel">
      <SectionLabel number="06">START A CONVERSATION</SectionLabel><h2>Have an idea?<br/><em>Let&apos;s make it real.</em></h2><p>Need a website, an integration or a custom product? Tell me what you&apos;re trying to achieve, and we&apos;ll work out the right next step.</p>
      <a href={ENQUIRY} target="_blank" rel="noopener noreferrer" className="glass-button glass-button-primary">Start a project <Arrow size={18}/></a><span className="glass-contact-note">Enquiries are handled through Code Tech Agency.</span>
    </div></section>
  </main>
  <footer className="glass-footer"><div className="glass-container glass-footer-inner"><GlassLogo/><span>© 2026 Kutullo Moropane. Built with purpose.</span><div><a href="https://github.com/IKcracker" target="_blank" rel="noopener noreferrer">GitHub</a><a href="#top">Back to top ↑</a></div></div></footer>
</div>;
}
