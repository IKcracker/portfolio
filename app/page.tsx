import Image from "next/image";
import ProjectScreenshot from "./project-screenshot";
import SiteInteractions from "./site-interactions";
import type { ReactNode } from "react";
import { clientWork, cvHref, email, experience, github, lab, linkedin, stack } from "./career-content";

const projects = [
  { index:"01", name:"VelaBridge", category:"CORPORATE WEBSITE / DEMO", description:"A responsive corporate website concept with clear service positioning, elegant design, and a direct path to enquiry.", url:"https://velabridge.vercel.app/", art:"velabridge", mark:"VB.", label:"A clearer digital presence.", action:"Explore live demo" },
  { index:"02", name:"Noval Logistics", category:"LOGISTICS / CRM DEMO", description:"A logistics management concept exploring shipment visibility and clearer business workflows.", url:"https://noval-logistics.vercel.app/", art:"noval", mark:"N—L", label:"Moving operations forward.", action:"Explore demo" },
  { index:"03", name:"MySol Central", category:"ENTERPRISE OPERATIONS / DEMO", description:"A connected operations platform for a fictional mining group: executive dashboard, sites, fleet, maintenance, contracts and workforce, with a guided demo from pit to boardroom.", url:"https://mysol-central-demo.vercel.app/", art:"mysol", mark:"MS.", label:"From the pit to the boardroom.", action:"Explore live demo" },
  { index:"04", name:"SWE Red", category:"LOGISTICS / PROPOSAL DEMO", description:"A courier and freight proposal with service pages, an illustrative hub network, demo shipment tracking, a quote flow and an operations admin for shipment records.", url:"https://swe-red.vercel.app/", art:"swe", mark:"SWE", label:"Logistics built to move faster.", action:"Explore live demo" },
  { index:"05", name:"STRATA", category:"CONSTRUCTION / CONCEPT WEBSITE", description:"A construction and civil works concept with services, illustrative projects, a materials catalogue, quote requests and account sign-up with password recovery.", url:"https://construction-two-coral.vercel.app/", art:"strata", mark:"ST.", label:"The foundations of tomorrow.", action:"Explore concept" },
  { index:"06", name:"Vaya", category:"MOBILITY / IN DEVELOPMENT", description:"An intercity ride-sharing concept built around clearer journeys and practical travel planning.", url:"https://vaya-wego.vercel.app/", art:"vaya", mark:"vaya.", label:"A different way to get there.", action:"Explore concept" },
];
const focus = [
  ["01","Zoho development","Deluge, workflows and connected Zoho One apps at Infolytics SA."],
  ["02","Systems integration","REST APIs and webhooks that keep business systems in sync."],
  ["03","Full-stack products","Next.js, TypeScript and PostgreSQL through Code Tech Agency."],
  ["04","AI integration","Putting LLM APIs and Zoho AI to work in everyday tools."],
];
const services = [
  ["01","Web experiences","Thoughtful websites and portals designed to communicate clearly and inspire action."],
  ["02","CRM & automation","Connected business workflows that reduce manual work and help teams move faster."],
  ["03","Digital products","Custom software, SaaS platforms and focused MVPs built around real problems."],
];
function Arrow({ diagonal=false }:{ diagonal?:boolean }) { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">{diagonal ? <path d="M4.5 15.5 15.5 4.5M6 4.5h9.5V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/> : <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>}</svg>; }
function Kicker({ index,children }:{index:string;children:ReactNode}) {return <p className="kicker"><span>{index}</span><span>/</span>{children}</p>;}
const enquiry = "https://www.codetechagency.com/contact";
function PortfolioContent() { return <div className="site">
  <a className="skip" href="#main">Skip to content</a>
  <header className="header container" id="top">
    <a href="#top" className="logo" aria-label="Kutullo Moropane home">kutullo<span>.</span></a>
    <nav className="nav-desktop" aria-label="Main navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
    <a className="nav-enquiry" href={enquiry} target="_blank" rel="noopener noreferrer">Let&apos;s talk <Arrow diagonal/></a>
    <details className="nav-mobile"><summary>Menu <span>+</span></summary><nav aria-label="Mobile navigation"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav></details>
  </header>
  <main id="main">
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy"><Kicker index="01">Introduction</Kicker>
        <h1 id="hero-title">Hi, I&apos;m Kutullo.<br/>I build software<br/><em>for the real world.</em></h1>
        <p className="role">Zoho developer <span>•</span> Software developer <span>•</span> Founder</p>
        <p className="hero-lead">I build business systems that remove manual work — Zoho solutions, API integrations and full-stack web products — and see them through from scope of work to production.</p>
        <div className="hero-actions"><a href="#work" className="underlined">Explore my work <Arrow/></a><a className="underlined" href={cvHref} target="_blank" rel="noopener noreferrer">Download CV <Arrow diagonal/><span className="visually-hidden">(PDF, opens in new tab)</span></a></div>
        <p className="location"><i/> Based in Pretoria, South Africa</p>
      </div>
      <div className="hero-photo">
        <Image src="/images/kutullo-hero-832c8ce.webp" alt="Black-and-white close-up portrait of Kutullo Moropane" width={610} height={724} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 42vw, 45vw" className="portrait" priority/>
        <span className="vertical-label">Software developer / 2026</span><span className="portrait-index">KM / 01</span>
      </div>
    </section>
    <section className="focus container" aria-label="Professional focus">
      <p className="small-label">Selected focus</p><div className="focus-grid">{focus.map(([number,title,description])=><div className="focus-item" key={number}><span className="index">{number}</span><h2>{title}</h2><p>{description}</p></div>)}</div>
    </section>
    <section id="work" className="work area" aria-labelledby="work-title"><div className="container">
      <Kicker index="02">Selected projects</Kicker><div className="section-heading"><h2 id="work-title">Work worth showing<span>.</span></h2><p>A selection of the software products and digital experiences I&apos;m building.</p></div>
      <div className="project-list">{projects.map(item=><article className="project" key={item.index}>
        <span className="index project-number">{item.index}</span><div className="project-info"><span className="project-tag">{item.category}</span><h3>{item.name}</h3><p>{item.description}</p><a href={item.url} target="_blank" rel="noopener noreferrer" className="project-link">{item.action} <Arrow diagonal/><span className="visually-hidden">(opens in new tab)</span></a></div>
        <div className={"project-art project-art--"+item.art}>
          <div className="project-browser-bar" aria-hidden="true">
            <span className="browser-controls"><i/><i/><i/></span>
            <span className="project-domain">{new URL(item.url).hostname}</span>
            <span className="project-live-label">REAL PAGE</span>
          </div>
          <ProjectScreenshot name={item.name} url={item.url} />
          <a className="project-art-cover" href={item.url} target="_blank" rel="noopener noreferrer" aria-label={"Open the "+item.name+" live website in a new tab"}>
            <span className="project-art-label">View live demo</span>
            <span className="art-arrow"><Arrow diagonal/></span>
          </a>
        </div>
      </article>)}</div>
      <div className="wip" aria-labelledby="wip-heading">
        <div className="wip-head"><p className="small-label" id="wip-heading">In the lab — products in development</p><span className="wip-note">Not yet released</span></div>
        <div className="wip-grid">{lab.map(item=><article className="wip-item" key={item.name}>
          <span className="project-tag">{item.category} / In development</span><h3>{item.name}</h3><p>{item.description}</p>
          <p className="wip-stack">{item.stack}</p>
          {item.repo && <a className="project-link" href={item.repo} target="_blank" rel="noopener noreferrer">View code <Arrow diagonal/><span className="visually-hidden">(opens in new tab)</span></a>}
        </article>)}</div>
      </div>
      <a href="https://www.codetechagency.com/work" target="_blank" rel="noopener noreferrer" className="underlined more-work">Explore more projects at Code Tech Agency <Arrow diagonal/></a>
    </div></section>
    <section id="experience" className="experience area" aria-labelledby="experience-title"><div className="container">
      <Kicker index="03">Experience</Kicker><div className="section-heading"><h2 id="experience-title">Where I&apos;ve <em>been building.</em></h2><p>From a coding academy tech lead to delivering client systems in production.</p></div>
      <ol className="timeline">{experience.map(role=><li className="timeline-item" key={role.organisation}>
        <div className="timeline-meta"><span className="index">{role.period}</span><h3>{role.organisation}</h3><p>{role.context}</p></div>
        <div className="timeline-body">
          {role.progression && <ol className="progression" aria-label="Promotions">{role.progression.map((step,i)=><li key={step} className={i===role.progression!.length-1?"is-current":undefined}>{step}</li>)}</ol>}
          <ul>{role.points.map(point=><li key={point}>{point}</li>)}</ul>
        </div>
      </li>)}</ol>
      <div className="stack" aria-labelledby="stack-title"><p className="small-label" id="stack-title">Toolkit</p><dl className="stack-grid">{stack.map(([group,items])=><div className="stack-row" key={group}><dt>{group}</dt><dd>{items}</dd></div>)}</dl></div>
    </div></section>
    <section id="client-work" className="client-work area" aria-labelledby="client-work-title"><div className="container">
      <Kicker index="04">Client work</Kicker><div className="section-heading"><h2 id="client-work-title">Systems in <em>production.</em></h2><p>Selected Infolytics projects I led from scope of work to deployment. Client names are kept confidential.</p></div>
      <div className="case-grid">{clientWork.map(item=><article className="case" key={item.index}>
        <div className="case-top"><span className="index">{item.index} / {item.sector}</span>{item.badge && <span className="case-badge">{item.badge}</span>}</div>
        <h3>{item.title}</h3><p>{item.summary}</p><p className="case-stack">{item.stack}</p>
      </article>)}</div>
    </div></section>
    <section id="about" className="about area container" aria-labelledby="about-title">
      <Kicker index="05">The person behind the code</Kicker><h2 id="about-title" className="display">A little about me<span>.</span></h2>
      <div className="about-grid">
        <div className="about-photo"><Image src="/images/kutullo-workspace.webp" alt="Kutullo at his software development workspace" width={760} height={820} sizes="(max-width: 760px) 100vw, 44vw" className="workspace"/><span>Behind the build — a workspace in progress.</span></div>
        <div className="about-text"><h3>Good technology<br/>should feel <em>effortless.</em></h3><p>I&apos;m Kutullo Moropane, a Zoho Developer at Infolytics SA and founder of Code Tech Agency, based in Pretoria. I joined Infolytics as an intern in December 2025 and was promoted twice in my first year.</p><p>My work starts with understanding how a business really runs, then building the logic, integrations and interfaces that make it simpler. Outside work I build my own products and study towards a BSc in Computing at UNISA.</p><a href="https://github.com/IKcracker" target="_blank" rel="noopener noreferrer" className="underlined">Follow what I&apos;m building <Arrow diagonal/></a></div>
      </div>
    </section>
    <section id="services" className="services area" aria-labelledby="services-title"><div className="container"><Kicker index="06">How I can help</Kicker><div className="section-heading"><h2 id="services-title">Thoughtful work. <em>Real value.</em></h2><p>From a fresh idea to a better workflow, I focus on solutions that move things forward.</p></div><div className="service-grid">{services.map(([number,title,description])=><div className="service" key={number}><span className="index">{number}</span><h3>{title}</h3><p>{description}</p><a href={enquiry} target="_blank" rel="noopener noreferrer" aria-label={"Enquire about "+title}><Arrow diagonal/></a></div>)}</div></div></section>

    <section id="contact" className="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><Kicker index="07">Next step</Kicker><h2 id="contact-title">Have an idea?<br/><em>Let&apos;s make it work.</em></h2><p>Hiring for a developer, integration or Zoho role? Email me or download my CV. Project enquiries go through Code Tech Agency.</p></div><div className="contact-action"><a href={"mailto:"+email}>Email me <Arrow diagonal/></a><a className="is-secondary" href={cvHref} target="_blank" rel="noopener noreferrer">Download CV <Arrow diagonal/><span className="visually-hidden">(PDF, opens in new tab)</span></a><a className="is-secondary" href={enquiry} target="_blank" rel="noopener noreferrer">Start a project <Arrow diagonal/></a><span className="contact-links"><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={github} target="_blank" rel="noopener noreferrer">GitHub</a><span>{email}</span></span></div></div></section>
  </main>
  <footer className="footer"><div className="container footer-grid"><a href="#top" className="logo">kutullo<span>.</span></a><p>© 2026 Kutullo Moropane. Built with intention.</p><nav aria-label="Footer navigation"><a href={linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><a href={github} target="_blank" rel="noopener noreferrer">GitHub</a><a href={cvHref} target="_blank" rel="noopener noreferrer">CV</a><a href="https://www.codetechagency.com/" target="_blank" rel="noopener noreferrer">Code Tech Agency</a><a href="#top">Back to top ↑</a></nav></div></footer>
</div>; }

export default function Home() { return <><PortfolioContent/><SiteInteractions/></>; }
