"use client";

import { useState } from "react";

type Stage = { label: string; eyebrow: string; explanation: string; detail: string; signal: string };
type Flow = { id: string; title: string; kicker: string; question: string; outcome: string; stages: Stage[] };

const flows: Flow[] = [
  {
    id: "crm", title: "CRM automation", kicker: "01 / CONNECTED WORKFLOWS",
    question: "What actually happens after someone submits a form?",
    outcome: "A good workflow makes the next step predictable without adding more admin.",
    stages: [
      { label:"Capture", eyebrow:"INPUT", explanation:"A visitor sends an enquiry. The form captures only the information needed for the next step.", detail:"A validated HTTP request or webhook carries fields such as contact details, service type and consent. Invalid input is rejected before entering the CRM.", signal:"POST /enquiry" },
      { label:"Validate", eyebrow:"LOGIC", explanation:"The system checks the details and determines what type of enquiry this is.", detail:"Field validation, duplicate checks and business rules keep the database clean. A CRM record can be matched or created through an API.", signal:"200 / validated" },
      { label:"Route", eyebrow:"AUTOMATION", explanation:"Rules assign the right owner and create the next action without manual sorting.", detail:"Workflow triggers, Deluge or server-side jobs route records by category, create tasks and handle retries or API failures.", signal:"trigger / assign" },
      { label:"Respond", eyebrow:"OUTPUT", explanation:"The person receives an acknowledgement and the team knows what to do next.", detail:"A templated email can confirm receipt while internal notifications link directly to the CRM record. Logging makes the flow observable.", signal:"event / delivered" },
    ],
  },
  {
    id: "logistics", title: "Logistics systems", kicker: "02 / OPERATIONAL VISIBILITY",
    question: "How does one shipment stay visible from start to finish?",
    outcome: "One source of truth means fewer status questions and clearer ownership.",
    stages: [
      { label:"Request", eyebrow:"INPUT", explanation:"A customer requests transport with locations, goods and timing.", detail:"A structured request becomes a job record. Addresses, dimensions and time windows are checked before dispatch.", signal:"job / created" },
      { label:"Plan", eyebrow:"DISPATCH", explanation:"The job is scheduled and assigned to the right available resources.", detail:"Operational rules consider route, capacity and date. Dispatch can assign a vehicle and attach service instructions.", signal:"route / assigned" },
      { label:"Track", eyebrow:"EVENTS", explanation:"Progress updates follow the job, so teams see the same status.", detail:"Driver updates, milestones or external tracking events create timestamped status changes. Customers see permitted updates.", signal:"status / in-transit" },
      { label:"Close", eyebrow:"OUTCOME", explanation:"Delivery evidence completes the journey and supports follow-up.", detail:"Proof of delivery, exceptions and completion events can trigger invoicing or customer notifications.", signal:"job / completed" },
    ],
  },
  {
    id: "product", title: "Digital products", kicker: "03 / PRODUCT THINKING",
    question: "How does an idea become a product people actually use?",
    outcome: "The best first release answers a real question, not every possible question.",
    stages: [
      { label:"Discover", eyebrow:"PROBLEM", explanation:"Start with the problem people experience rather than a list of features.", detail:"Research the user, their current process and the cost of the friction. Define one meaningful outcome.", signal:"hypothesis / defined" },
      { label:"Prototype", eyebrow:"DESIGN", explanation:"Make the journey tangible before investing in full development.", detail:"Map information architecture, build interactive prototypes, then test the core journey with representative users.", signal:"prototype / ready" },
      { label:"Build", eyebrow:"ENGINEERING", explanation:"Ship a focused, secure first version with dependable foundations.", detail:"Implement typed data contracts, authentication when necessary, robust error handling, responsive UI and automated checks.", signal:"release / staged" },
      { label:"Learn", eyebrow:"ITERATE", explanation:"Look at the real journey and improve what matters.", detail:"Use privacy-aware product analytics, user feedback and support signals to prioritise improvements rather than guessing.", signal:"feedback / loop" },
    ],
  },
];

function LineArrow() {
  return <svg width="15" height="15" aria-hidden="true" fill="none" viewBox="0 0 16 16"><path d="M2 8h11m-4-4 4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

export default function InteractionLab() {
  const [flowIndex, setFlowIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [showMechanics, setShowMechanics] = useState(false);
  const flow = flows[flowIndex];
  const stage = flow.stages[stepIndex];

  const selectFlow = (index: number) => { setFlowIndex(index); setStepIndex(0); setShowMechanics(false); };
  const selectStep = (index: number) => { setStepIndex(index); setShowMechanics(false); };
  const advance = () => selectStep((stepIndex + 1) % flow.stages.length);

  return <section id="explore" className="interaction-lab-area area" aria-labelledby="lab-title">
    <div className="container">
      <p className="kicker"><span>05</span><span>/</span>THE INTERACTIVE LAB</p>
      <div className="section-heading lab-heading">
        <div>
          <h2 id="lab-title">Don&apos;t just look.<br/><em>Explore how it works.</em></h2>
          <p className="lab-intro">Good software feels simple on the surface. There&apos;s thoughtful engineering underneath. Pick a question and follow the flow.</p>
        </div>
        <p className="lab-hint"><span aria-hidden="true">✳</span> An interactive, illustrative walkthrough — not a live customer system.</p>
      </div>

      <div className="lab-scenario-bar" role="group" aria-label="Choose a system to explore">
        {flows.map((item, index) => <button key={item.id} className={"lab-scenario" + (index === flowIndex ? " active" : "")} type="button" aria-pressed={index===flowIndex} onClick={() => selectFlow(index)}>
          <span className="lab-scenario-num">0{index + 1}</span><span>{item.title}</span><LineArrow/>
        </button>)}
      </div>
      <div className="lab-surface">
        <div className="lab-surface-head"><span><i className="lab-live-indicator"/> SYSTEM EXPLORER</span><span>SELECT A STAGE TO INSPECT</span></div>
        <div className="lab-content">
          <div className="lab-explorer">
            <div className="lab-flow-title">
              <p className="lab-mini-label">{flow.kicker}</p>
              <h3>{flow.question}</h3>
            </div>
            <div className="lab-flow-track" role="group" aria-label="Workflow stages">
              {flow.stages.map((item, index) => <button
                key={item.label}
                type="button"
                className={"lab-node" + (index === stepIndex ? " is-current" : "") + (index < stepIndex ? " is-passed" : "")}
                onClick={() => selectStep(index)}
                aria-pressed={index===stepIndex}
                aria-label={"Stage " + (index + 1) + ": " + item.label}
              >
                <span className="lab-node-circle"><span>{String(index+1).padStart(2,"0")}</span></span>
                <span className="lab-node-label">{item.label}</span>
                <span className="lab-node-type">{item.eyebrow}</span>
              </button>)}
            </div>
            <div className="lab-explorer-bottom"><span className="lab-outcome-label">THE BIG PICTURE</span><p>{flow.outcome}</p></div>
          </div>
          <div className="lab-inspector" aria-live="polite" aria-atomic="true" key={flow.id + "-" + stepIndex}>
            <div className="lab-inspector-top"><span>STEP {String(stepIndex+1).padStart(2,"0")} / 04</span><span className="lab-inspector-active">● ACTIVE STAGE</span></div>
            <p className="lab-stage-type">{stage.eyebrow}</p>
            <h4>{stage.label}<span>.</span></h4>
            <p className="lab-stage-description">{stage.explanation}</p>
            <button className="lab-mechanics-toggle" onClick={() => setShowMechanics(v=>!v)} type="button" aria-expanded={showMechanics} aria-controls="lab-mechanics">
              {showMechanics ? "Hide the engineering" : "What makes this work?"} <span aria-hidden="true">{showMechanics ? "−" : "+"}</span>
            </button>
            {showMechanics && <div className="lab-mechanics" id="lab-mechanics"><p className="lab-mini-label">BEHIND THE INTERFACE</p><p>{stage.detail}</p></div>}
            <div className="lab-inspector-bottom"><code>{stage.signal}</code><button type="button" onClick={advance}>{stepIndex === 3 ? "Replay flow" : "Next stage"} <LineArrow/></button></div>
          </div>
        </div>
        <div className="lab-footer"><p>Curious what a workflow like this could do for your business?</p><a href="https://www.codetechagency.com/contact" target="_blank" rel="noopener noreferrer">Let&apos;s discuss your idea <LineArrow/></a></div>
      </div>
    </div>
  </section>;
}
