"use client";

import { useEffect, useRef } from "react";
import { usePortfolioDesign } from "./portfolio-experience";

type Point = { angle: number; radius: number; speed: number; size: number; drift: number; x: number; y: number };

export default function KineticField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const version = usePortfolioDesign();
  useEffect(() => {
    if (version !== "glass") return;
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    let frame = 0;
    let active = true;
    let width = 1, height = 1, elapsed = 0, last = 0;
    let px = -9999, py = -9999;
    const dots: Point[] = Array.from({ length: 76 }, (_, i) => ({
      angle: i * 2.39996,
      radius: .17 + (i % 13) / 12 * .38,
      speed: ((i % 4) + 1) * .000032,
      size: i % 11 === 0 ? 2.15 : i % 5 === 0 ? 1.6 : .9,
      drift: i * .613,
      x: 0, y: 0
    }));
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; if(active && !frame) frame = requestAnimationFrame(render); }, { threshold: 0.04 });
    observer.observe(parent);
    function resize() {
      if (!canvas || !parent || !ctx) return;
      const box = parent.getBoundingClientRect();
      width = Math.max(1, box.width);
      height = Math.max(1, box.height);
      const scale = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();
    function move(event: PointerEvent) {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      px = event.clientX - rect.left;
      py = event.clientY - rect.top;
    }
    function leave() { px = -9999; py = -9999; }
    parent.addEventListener("pointermove", move, { passive: true });
    parent.addEventListener("pointerleave", leave);
    function render(now: number) {
      frame = 0;
      if (!active || !ctx) return;
      if (now - last < 30) { frame = requestAnimationFrame(render); return; }
      const dt = Math.min(45, now - (last || now));
      last = now;
      elapsed += dt;
      const centerX = width * .51;
      const centerY = height * .47;
      const rx = Math.min(width * .44, 275);
      const ry = Math.min(height * .44, 293);
      ctx.clearRect(0, 0, width, height);
      for (let ring = 0; ring < 3; ring++) {
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, rx * (.52 + ring * .25), ry * (.52 + ring * .25), -.38, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(175,219,162," + (.09 - ring * .018) + ")";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      dots.forEach((dot, i) => {
        const angle = dot.angle + elapsed * dot.speed;
        const radius = dot.radius;
        let x = centerX + Math.cos(angle) * rx * (1.12 + radius);
        let y = centerY + Math.sin(angle) * ry * (.83 + radius * .72);
        const dx = x - px, dy = y - py;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = Math.max(0, 1 - dist / 160);
        x += dx / dist * 52 * force * force;
        y += dy / dist * 52 * force * force;
        dot.x = x;
        dot.y = y;
        const opacity = .22 + .42 * (.5 + .5 * Math.sin(elapsed * .0014 + dot.drift));
        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(202,250,169," + opacity + ")";
        ctx.fill();
      });
      for (let i = 0; i < dots.length; i += 3) {
        const a = dots[i];
        const b = dots[(i + 9) % dots.length];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 155) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = "rgba(188,225,173," + (.14 * (1 - dist / 155)) + ")";
          ctx.lineWidth = .65;
          ctx.stroke();
        }
      }
      frame = requestAnimationFrame(render);
    }
    frame = requestAnimationFrame(render);
    return () => {
      active = false;
      observer.disconnect();
      resizeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, [version]);
  if (version !== "glass") return null;
  return <canvas ref={canvasRef} className="kinetic-field" aria-hidden="true"/>;
}
