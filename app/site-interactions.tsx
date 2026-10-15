"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";

const destinations = [
  { label: "Explore selected work", hint: "Projects & real demos", href: "#work", keywords: "portfolio cases demos vela noval vaya" },
  { label: "Discover the interactive lab", hint: "See how systems work", href: "#explore", keywords: "how automation works workflow logistics build crm" },
  { label: "About Kutullo", hint: "Person behind the code", href: "#about", keywords: "about biography developer engineer" },
  { label: "Services & capabilities", hint: "Find the right solution", href: "#services", keywords: "websites integrations apps zoho services" },
  { label: "Start a conversation", hint: "Discuss a project", href: "#contact", keywords: "contact email enquiries project work" },
];

export default function SiteInteractions() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const [visible, setVisible] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const matching = useMemo(() => {
    const text = query.toLowerCase().trim();
    return destinations.filter(item => !text || (item.label + " " + item.hint + " " + item.keywords).toLowerCase().includes(text));
  }, [query]);

  const launch = useCallback(() => {
    if (typeof document !== "undefined") previouslyFocused.current = document.activeElement as HTMLElement | null;
    setQuery("");
    setHighlighted(0);
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    previouslyFocused.current?.focus();
  }, []);

  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      const target = e.target;
      const editing = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close(); else launch();
      } else if (!editing && e.key === "/" && !open) {
        e.preventDefault();
        launch();
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close, launch]);

  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  useEffect(() => {
    const bar = progressRef.current;
    if (!bar) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = "scaleX(" + ratio + ")";
      setVisible(window.scrollY > 420);
    };
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(".work .project, .focus-item, .service, .about-grid > *, .lab-scenario-bar, .lab-surface, .contact-action"));
    const targets = nodes.filter(node => node.getBoundingClientRect().top > window.innerHeight * .87);
    targets.forEach(node => node.classList.add("is-reveal-pending"));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .07, rootMargin: "0px 0px -25px 0px" });
    targets.forEach(node => observer.observe(node));
    return () => { observer.disconnect(); targets.forEach(node => node.classList.remove("is-reveal-pending", "is-revealed")); };
  }, []);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    function onPointerMove(e: PointerEvent) {
      if (!(e.target instanceof Element)) return;
      const tile = e.target.closest<HTMLElement>(".service, .focus-item, .project-art, .lab-inspector");
      if (!tile) return;
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty("--spot-x", (e.clientX - rect.left) + "px");
      tile.style.setProperty("--spot-y", (e.clientY - rect.top) + "px");
    }
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => document.removeEventListener("pointermove", onPointerMove);
  }, []);

  const visit = (href: string) => {
    close();
    const node = document.querySelector(href);
    window.history.pushState(null, "", href);
    node?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
  };

  function onInputKeyDown(e: ReactKeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") { e.preventDefault(); setHighlighted(index => Math.min(index + 1, matching.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setHighlighted(index => Math.max(index - 1, 0)); }
    if (e.key === "Enter" && matching[highlighted]) { e.preventDefault(); visit(matching[highlighted].href); }
  }

  return <>
    <div className="site-reading-progress" aria-hidden="true"><div ref={progressRef}/></div>
    <button className={"site-discovery-trigger" + (visible ? " is-compact" : "")} type="button" onClick={launch} aria-label="Explore the portfolio using keyboard commands" title="Explore the portfolio — press slash or Ctrl K">
      <span className="discovery-mark" aria-hidden="true">✳</span><span>Explore</span><kbd>⌘ K</kbd>
    </button>
    {open && <div className="site-command-overlay" role="presentation" onPointerDown={e => { if (e.target === e.currentTarget) close(); }}>
      <div className="site-command-dialog" role="dialog" aria-modal="true" aria-label="Explore the portfolio">
        <div className="site-command-search">
          <span aria-hidden="true">⌕</span>
          <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setHighlighted(0); }} onKeyDown={onInputKeyDown} aria-label="Search portfolio sections" placeholder="What would you like to explore?" />
          <button type="button" onClick={close} aria-label="Close explorer"><kbd>ESC</kbd></button>
        </div>
        <div className="site-command-results">
          <p>EXPLORE THE PORTFOLIO</p>
          {matching.length ? matching.map((item, index) => <button key={item.href} className={"site-command-option" + (index===highlighted ? " selected" : "")} type="button" onMouseEnter={() => setHighlighted(index)} onClick={() => visit(item.href)}>
            <span><strong>{item.label}</strong><small>{item.hint}</small></span><span aria-hidden="true">↗</span>
          </button>) : <p className="site-command-empty">No matching section. Try “automation”, “projects”, or “contact”.</p>}
        </div>
        <div className="site-command-footer"><span>↑ ↓ navigate</span><span>↵ open</span><span>ESC close</span></div>
      </div>
    </div>}
  </>;
}
