"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { usePortfolioDesign } from "./portfolio-experience";
import { createUniverseEngine, type UniverseEngine } from "./system-universe-engine";

type Project={id:string;number:string;name:string;discipline:string;description:string;url:string;signal:string;accent:[number,number,number]};
const PROJECTS:Project[]=[
 {id:"velabridge",number:"01",name:"VelaBridge",discipline:"WEB EXPERIENCE",description:"A considered corporate experience that turns complex finance services into a clearer customer journey.",url:"https://velabridge.vercel.app/",signal:"Information → Understanding",accent:[.73,.96,.58]},
 {id:"noval",number:"02",name:"Noval Logistics",discipline:"OPERATIONS / CRM",description:"A connected logistics concept that brings shipments, dispatch and operational visibility into one journey.",url:"https://noval-logistics.vercel.app/",signal:"Events → Visibility",accent:[.52,.91,.69]},
 {id:"vaya",number:"03",name:"Vaya",discipline:"MOBILITY / PRODUCT",description:"An intercity travel idea connecting people and journeys with a simpler booking experience.",url:"https://vaya-wego.vercel.app/",signal:"Journeys → Connection",accent:[.85,.96,.59]},
 {id:"agency",number:"04",name:"Code Tech Agency",discipline:"SOFTWARE STUDIO",description:"The engineering practice behind bespoke software, websites and business workflow solutions.",url:"https://www.codetechagency.com/",signal:"Challenges → Solutions",accent:[.64,.89,.72]}
];

function OpenArrow(){return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 19 19 5M7 5h12v12" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;}

export default function SystemUniverse(){
 const version=usePortfolioDesign();
 if(version!=="glass")return null;
 return <UniverseExperience/>;
}

function UniverseExperience(){
 const canvasRef=useRef<HTMLCanvasElement>(null);
 const sceneRef=useRef<HTMLDivElement>(null);
 const markerRefs=useRef<(HTMLButtonElement|null)[]>([]);
 const rotationRef=useRef({yaw:.28,pitch:-.15,drag:false,x:0,y:0,frame:0});
 const activeRef=useRef(0);
 const playRef=useRef(true);
 const drawRef=useRef<(()=>void)|null>(null);
 const [active,setActive]=useState(0);
 const [playing,setPlaying]=useState(true);
 const [supported,setSupported]=useState(true);
 const project=PROJECTS[active];

 const select=(index:number)=>{
  activeRef.current=index;
  setActive(index);
  drawRef.current?.();
 };
 const toggle=()=>{
  playRef.current=!playRef.current;
  setPlaying(playRef.current);
  drawRef.current?.();
 };
 const reset=()=>{
  rotationRef.current.yaw=.28;
  rotationRef.current.pitch=-.15;
  drawRef.current?.();
 };

 useEffect(()=>{
  const canvas=canvasRef.current;
  const container=sceneRef.current;
  if(!canvas||!container)return;
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");
  const lowDevice=(navigator.hardwareConcurrency||8)<=3;
  let engine:UniverseEngine|null=null;
  let raf=0,alive=true,visible=true;
  let last=0,elapsed=0;
  const getGl=()=>{
   try{return canvas.getContext("webgl2",{alpha:false,antialias:false,powerPreference:lowDevice?"low-power":"default",preserveDrawingBuffer:false});}
   catch{return null;}
  };
  const gl=getGl();
  if(gl){
   try{engine=createUniverseEngine(gl);setSupported(true);}
   catch(error){console.warn("3D shader unavailable; accessible project navigator remains active.",error);setSupported(false);}
  }else setSupported(false);
  const resize=()=>{
   if(!canvas)return;
   const rect=canvas.getBoundingClientRect();
   const dpr=Math.min(window.devicePixelRatio||1,lowDevice?1:1.25);
   canvas.width=Math.max(1,Math.min(1100,Math.round(rect.width*dpr)));
   canvas.height=Math.max(1,Math.min(740,Math.round(rect.height*dpr)));
   drawRef.current?.();
  };
  const projector=()=>{
   const canvasWidth=canvas.clientWidth,canvasHeight=canvas.clientHeight;
   const r=rotationRef.current;
   PROJECTS.forEach((_,i)=>{
    const button=markerRefs.current[i];
    if(!button)return;
    const t=i*Math.PI*.5-.7;
    let x=Math.cos(t)*1.83;
    let y=Math.sin(t*1.6)*.49;
    let z=Math.sin(t)*1.18;
    const ca=Math.cos(r.yaw*.9),sa=Math.sin(r.yaw*.9);
    const nx=x*ca+z*sa,nz=z*ca-x*sa;
    const cb=Math.cos(r.pitch),sb=Math.sin(r.pitch);
    const ny=y*cb-nz*sb;
    z=nz*cb+y*sb;
    const scale=canvasHeight*1.0/(4.7-z);
    const px=canvasWidth/2+nx*scale;
    const py=canvasHeight/2-ny*scale;
    button.style.left=(px/canvasWidth*100)+"%";
    button.style.top=(py/canvasHeight*100)+"%";
    button.style.setProperty("--orbit-depth",String(z));
    button.style.zIndex=z>0?"5":"2";
    button.style.opacity=z<-.65?".66":"1";
   });
  };
  const render=(now:number)=>{
   raf=0;
   if(!alive||!visible)return;
   if(last>0&&now-last<32){raf=window.requestAnimationFrame(render);return;}
   const delta=Math.min(now-last,50)||16;
   last=now;
   const r=rotationRef.current;
   if(playRef.current&&!r.drag&&!reduce.matches){
    elapsed+=delta/1000;
    r.yaw+=delta*.00013;
   }
   projector();
   engine?.render(elapsed,r.yaw,r.pitch,PROJECTS[activeRef.current].accent);
   if(!reduce.matches&&engine)raf=window.requestAnimationFrame(render);
  };
  const draw=()=>{
   if(!alive)return;
   projector();
   engine?.render(elapsed,rotationRef.current.yaw,rotationRef.current.pitch,PROJECTS[activeRef.current].accent);
  };
  drawRef.current=draw;
  const observer=new ResizeObserver(resize);
  observer.observe(canvas);
  resize();
  const viewport=new IntersectionObserver(([entry])=>{
   visible=entry.isIntersecting;
   if(visible&&!raf)raf=requestAnimationFrame(render);
   else if(!visible&&raf){cancelAnimationFrame(raf);raf=0;last=0;}
  },{threshold:0});
  viewport.observe(container);
  const lose=(event:Event)=>{
   event.preventDefault();
   engine?.dispose();engine=null;
   setSupported(false);
   if(raf){cancelAnimationFrame(raf);raf=0;}
  };
  const restore=()=>{
   try{const restored=canvas.getContext("webgl2");if(restored){engine=createUniverseEngine(restored);setSupported(true);resize();if(visible)raf=requestAnimationFrame(render);}}
   catch{setSupported(false);}
  };
  canvas.addEventListener("webglcontextlost",lose);
  canvas.addEventListener("webglcontextrestored",restore);
  if(engine)raf=requestAnimationFrame(render);
  else projector();
  return()=>{
   alive=false;
   if(raf)cancelAnimationFrame(raf);
   viewport.disconnect();observer.disconnect();
   canvas.removeEventListener("webglcontextlost",lose);
   canvas.removeEventListener("webglcontextrestored",restore);
   drawRef.current=null;
   engine?.dispose();
  };
 },[]);

 const pointerDown=(event:ReactPointerEvent<HTMLCanvasElement>)=>{
  const r=rotationRef.current;
  r.drag=true;r.x=event.clientX;r.y=event.clientY;
  event.currentTarget.setPointerCapture(event.pointerId);
 };
 const pointerMove=(event:ReactPointerEvent<HTMLCanvasElement>)=>{
  const r=rotationRef.current;
  if(!r.drag)return;
  const dx=event.clientX-r.x,dy=event.clientY-r.y;
  r.x=event.clientX;r.y=event.clientY;
  r.yaw+=dx*.006;
  r.pitch=Math.max(-.85,Math.min(.85,r.pitch+dy*.004));
  drawRef.current?.();
 };
 const pointerUp=(event:ReactPointerEvent<HTMLCanvasElement>)=>{
  rotationRef.current.drag=false;
  if(event.currentTarget.hasPointerCapture(event.pointerId))event.currentTarget.releasePointerCapture(event.pointerId);
 };

 return <section id="universe" className="universe-section" aria-labelledby="universe-title">
  <div className="container universe-heading">
   <div><p className="universe-kicker"><span className="universe-live"/> INTERACTIVE 3D / THE SYSTEMS UNIVERSE</p>
     <h2 id="universe-title">Software is a <em>living system.</em></h2>
   </div>
   <p>Go beyond screenshots. Rotate the universe, select an orbiting project and see what I&apos;m building. Every node leads to a real product.</p>
  </div>
  <div className="container universe-stage">
   <div className="universe-viewport" ref={sceneRef}>
    <div className="universe-topline"><span><i/> WEBGL / LIVE RENDER</span><span>KT-OS / EXPLORER 01</span></div>
    <canvas ref={canvasRef} className="universe-canvas"
      aria-label="Interactive rotating 3D network with four project nodes. Use the accessible project buttons to explore."
      onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp}/>
    {!supported&&<div className="universe-fallback" aria-hidden="true"><div className="universe-fallback-core"><span>✳</span></div><span>STATIC SYSTEMS VIEW</span></div>}
    <div className="universe-center-label" aria-hidden="true">K / M<span>CONNECTED WORLDS</span></div>
    <div className="universe-nodes">
      {PROJECTS.map((item,i)=><button key={item.id} type="button" ref={element=>{markerRefs.current[i]=element;}}
        className={"universe-node"+(active===i?" is-selected":"")} onClick={()=>select(i)}
        aria-pressed={active===i} aria-label={"Inspect "+item.name}>
          <span className="universe-node-dot"/><span className="universe-node-name">{item.name}</span>
        </button>)}
    </div>
    <div className="universe-view-footer">
      <span className="universe-instruction">↗ DRAG TO ROTATE <i/> SELECT A NODE</span>
      <div className="universe-scene-controls">
        <button type="button" onClick={reset} aria-label="Reset 3D rotation">Reset ↺</button>
        <button type="button" onClick={toggle} aria-label={playing?"Pause 3D animation":"Resume 3D animation"} aria-pressed={!playing}>{playing?"Pause Ⅱ":"Play ▶"}</button>
      </div>
    </div>
   </div>
   <div className="universe-inspector">
    <div className="universe-inspector-top"><span>PROJECT INSPECTOR</span><span>{project.number} / 04</span></div>
    <p className="universe-inspector-id">NODE {project.number} <span>● ACTIVE</span></p>
    <div className="universe-inspector-body" key={project.id}>
      <div className="universe-node-symbol" aria-hidden="true"><span>◇</span><i/></div>
      <p className="universe-category">{project.discipline}</p>
      <h3>{project.name}<span>.</span></h3>
      <p>{project.description}</p>
      <div className="universe-signal"><span>CORE CONNECTION</span><strong>{project.signal}</strong></div>
    </div>
    <div className="universe-inspector-bottom">
      <a href={project.url} target="_blank" rel="noopener noreferrer">Launch live project <OpenArrow/></a>
      <p>No simulation data or invented results. These links open the actual projects.</p>
    </div>
   </div>
  </div>
  <div className="container universe-bottom">
   <span>04 CONNECTED WORLDS</span><span>01 ENGINEERING MINDSET</span>
   <span>INFINITE THINGS TO BUILD <b>↗</b></span>
  </div>
 </section>;
}
