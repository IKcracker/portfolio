import Image from "next/image";
import ProjectScreenshot from "./project-screenshot";
import type { ReactNode } from "react";

const projects = [
  { index:"01", name:"VelaBridge", category:"CORPORATE WEBSITE / DEMO", description:"A responsive corporate website concept with clear service positioning, elegant design, and a direct path to enquiry.", url:"https://velabridge.vercel.app/", art:"velabridge", mark:"VB.", label:"A clearer digital presence.", action:"Explore live demo" },
  { index:"02", name:"Noval Logistics", category:"LOGISTICS / CRM DEMO", description:"A logistics management concept exploring shipment visibility and clearer business workflows.", url:"https://noval-logistics.vercel.app/", art:"noval", mark:"N—L", label:"Moving operations forward.", action:"Explore demo" },
  { index:"03", name:"Vaya", category:"MOBILITY / IN DEVELOPMENT", description:"An intercity ride-sharing concept built around clearer journeys and practical travel planning.", url:"https://vaya-wego.vercel.app/", art:"vaya", mark:"vaya.", label:"A different way to get there.", action:"Explore concept" },
];
const focus = [
  ["01","Software engineering","Designing and building useful digital products."],
  ["02","Code Tech Agency","Founder and digital solutions partner."],
  ["03","Product development","Building NexStock and exploring new ideas."],
  ["04","CRM & automation","Connecting systems and simplifying operations."],
];
const services = [
  ["01","Web experiences","Thoughtful websites and portals designed to communicate clearly and inspire action."],
  ["02","CRM & automation","Connected business workflows that reduce manual work and help teams move faster."],
  ["03","Digital products","Custom software, SaaS platforms and focused MVPs built around real problems."],
];
function Arrow({ diagonal=false }:{ diagonal?:boolean }) { return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 20 20" fill="none">{diagonal ? <path d="M4.5 15.5 15.5 4.5M6 4.5h9.5V14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/> : <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>}</svg>; }
function Kicker({ index,children }:{index:string;children:ReactNode}) {return <p className="kicker"><span>{index}</span><span>/</span>{children}</p>;}
const enquiry = "https://www.codetechagency.com/contact";
export default function Home() { return <div className="site">
  <a className="skip" href="#main">Skip to content</a>
  <header className="header container" id="top">
    <a href="#top" className="logo" aria-label="Kutullo Moropane home">kutullo<span>.</span></a>
    <nav className="nav-desktop" aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav>
    <a className="nav-enquiry" href={enquiry} target="_blank" rel="noopener noreferrer">Let&apos;s talk <Arrow diagonal/></a>
    <details className="nav-mobile"><summary>Menu <span>+</span></summary><nav aria-label="Mobile navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#services">Services</a><a href="#contact">Contact</a></nav></details>
  </header>
  <main id="main">
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-copy"><Kicker index="01">Introduction</Kicker>
        <h1 id="hero-title">Hi, I&apos;m Kutullo.<br/>I build software<br/><em>for the real world.</em></h1>
        <p className="role">Software engineer <span>•</span> Founder <span>•</span> Builder</p>
        <p className="hero-lead">I turn complex business challenges into simple, thoughtful digital products — from web platforms to connected CRMs and automation.</p>
        <div className="hero-actions"><a href="#work" className="underlined">Explore my work <Arrow/></a><a className="underlined" href="#contact">Let&apos;s discuss your project <Arrow diagonal/></a></div>
        <p className="location"><i/> Based in Pretoria, South Africa</p>
      </div>
      <div className="hero-photo">
        <Image src="/images/kutullo-hero-832c8ce.webp" alt="Black-and-white close-up portrait of Kutullo Moropane" width={610} height={724} sizes="(max-width: 760px) 90vw, (max-width: 1100px) 42vw, 45vw" className="portrait" priority/>
        <span className="vertical-label">Software engineer / 2026</span><span className="portrait-index">KM / 01</span>
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
      <a href="https://www.codetechagency.com/work" target="_blank" rel="noopener noreferrer" className="underlined more-work">Explore more projects at Code Tech Agency <Arrow diagonal/></a>
    </div></section>
    <section id="about" className="about area container" aria-labelledby="about-title">
      <Kicker index="03">The person behind the code</Kicker><h2 id="about-title" className="display">A little about me<span>.</span></h2>
      <div className="about-grid">
        <div className="about-photo"><Image src="/images/kutullo-workspace.webp" alt="Kutullo at his software development workspace" width={760} height={820} sizes="(max-width: 760px) 100vw, 44vw" className="workspace"/><span>Behind the build — a workspace in progress.</span></div>
        <div className="about-text"><h3>Good technology<br/>should feel <em>effortless.</em></h3><p>I&apos;m Kutullo Moropane, a South African software engineer and founder of Code Tech Agency. I enjoy designing and building systems that bring clarity to the way teams work.</p><p>My work spans web development, Zoho integrations, workflow automation and product engineering. I care about making technology useful — not just impressive.</p><a href="https://github.com/IKcracker" target="_blank" rel="noopener noreferrer" className="underlined">Follow what I&apos;m building <Arrow diagonal/></a></div>
      </div>
    </section>
    <section id="services" className="services area" aria-labelledby="services-title"><div className="container"><Kicker index="04">How I can help</Kicker><div className="section-heading"><h2 id="services-title">Thoughtful work. <em>Real value.</em></h2><p>From a fresh idea to a better workflow, I focus on solutions that move things forward.</p></div><div className="service-grid">{services.map(([number,title,description])=><div className="service" key={number}><span className="index">{number}</span><h3>{title}</h3><p>{description}</p><a href={enquiry} target="_blank" rel="noopener noreferrer" aria-label={"Enquire about "+title}><Arrow diagonal/></a></div>)}</div></div></section>
    <section id="contact" className="contact" aria-labelledby="contact-title"><div className="container contact-grid"><div><Kicker index="05">Next step</Kicker><h2 id="contact-title">Have an idea?<br/><em>Let&apos;s make it work.</em></h2><p>Tell me what you&apos;re trying to achieve. We can work out the right next step together.</p></div><div className="contact-action"><a href={enquiry} target="_blank" rel="noopener noreferrer">Start a conversation <Arrow diagonal/></a><span>Project enquiries are handled through Code Tech Agency.</span></div></div></section>
  </main>
  <footer className="footer"><div className="container footer-grid"><a href="#top" className="logo">kutullo<span>.</span></a><p>© 2026 Kutullo Moropane. Built with intention.</p><nav aria-label="Footer navigation"><a href="https://github.com/IKcracker" target="_blank" rel="noopener noreferrer">GitHub</a><a href="https://www.codetechagency.com/" target="_blank" rel="noopener noreferrer">Code Tech Agency</a><a href="#top">Back to top ↑</a></nav></div></footer>
</div>; }
