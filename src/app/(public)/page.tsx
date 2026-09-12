"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const projects = [
  { name: "EMCS App", repo: "emcs-app", type: "Frontend", description: "Modern operational dashboard with forms, reporting, and data visualization for structured enterprise workflows.", stack: ["React 19", "TypeScript", "Vite", "Tailwind", "Recharts"], accent: "violet" },
  { name: "Enterprise Starter", repo: "StarterV1", type: "Backend", description: "Reusable, security-minded backend foundation for enterprise APIs, authentication, validation, and scalable services.", stack: ["Node.js", "Express", "TypeScript", "Prisma", "Redis"], accent: "blue" },
  { name: "Technical Docs API", repo: "New_Godoc_BE", type: "Backend", description: "Documentation service designed around secure uploads, dual-database workflows, scheduled jobs, and production logging.", stack: ["Express", "Prisma", "Redis", "Zod", "Winston"], accent: "cyan" },
  { name: "KPIN Portal", repo: "FE_KPIN", type: "Frontend", description: "Supplier-facing portal and workflow UI built to make multi-role enterprise processes clear and dependable.", stack: ["React", "React Router", "REST API"], accent: "orange" },
  { name: "Portfolio System", repo: "06.-Portofolio", type: "Full Stack", description: "This modular portfolio platform with content management, protected administration, and a public project showcase.", stack: ["Next.js 16", "React 19", "MongoDB", "Tailwind"], accent: "lime" },
  { name: "miniOS", repo: "miniOS", type: "Experiment", description: "A compact public engineering experiment focused on learning, systems thinking, and building from first principles.", stack: ["Systems", "Open Source"], accent: "pink" },
];

const filters = ["All", "Full Stack", "Backend", "Frontend", "Experiment"];

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");
  const visibleProjects = useMemo(() => projects.filter((project) => activeFilter === "All" || project.type === activeFilter), [activeFilter]);

  return (
    <main className="portfolio-dashboard">
      <section className="dash-shell dash-hero" aria-labelledby="portfolio-title">
        <div className="hero-copy">
          <div className="eyebrow"><span /> PORTFOLIO / 2026</div>
          <h1 id="portfolio-title">Jidan<br /><em>Fatahillah.</em></h1>
          <p className="hero-role">Full Stack Web Engineer <span>—</span> Enterprise Applications &amp; Integration</p>
          <p className="hero-summary">I turn complex business processes into reliable software—from architecture and APIs to polished interfaces, integrations, and production support.</p>
          <div className="hero-actions">
            <a className="dash-button primary" href="#projects">Explore work <span>↗</span></a>
            <a className="dash-button" href="https://github.com/theCrudify" target="_blank" rel="noreferrer">GitHub profile</a>
          </div>
        </div>

        <div className="hero-panel">
          <div className="portrait-frame">
            <Image src="/images/profile-photo.png" alt="Jidan Fatahillah" fill priority sizes="(max-width: 900px) 80vw, 420px" />
            <div className="portrait-code">JF—23</div>
          </div>
          <div className="availability"><i /> Available for new opportunities</div>
          <div className="quick-facts">
            <div><b>7+</b><span>enterprise projects</span></div>
            <div><b>4</b><span>client environments</span></div>
            <div><b>3.74</b><span>GPA · cum laude</span></div>
          </div>
        </div>
      </section>

      <section className="dash-strip" aria-label="Core technology stack">
        <span>NODE.JS</span><span>REACT</span><span>ANGULAR</span><span>.NET</span><span>GO</span><span>SQL SERVER</span><span>SAP B1</span><span>AZURE</span>
      </section>

      <section className="dash-shell section-block" id="projects">
        <div className="section-heading">
          <div><p className="section-index">01 / PUBLIC WORK</p><h2>Selected repositories</h2></div>
          <p>Public GitHub work, translated into the engineering capabilities behind each repository.</p>
        </div>
        <div className="project-filters" role="group" aria-label="Filter projects">
          {filters.map((filter) => <button key={filter} className={activeFilter === filter ? "active" : ""} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
        </div>
        <div className="project-grid">
          {visibleProjects.map((project, index) => (
            <article className={`project-tile accent-${project.accent}`} key={project.repo}>
              <div className="project-top"><span>0{index + 1}</span><span>{project.type}</span></div>
              <div className="project-symbol" aria-hidden="true">{project.name.slice(0, 2).toUpperCase()}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
              <a href={`https://github.com/theCrudify/${project.repo}`} target="_blank" rel="noreferrer">View repository <span>↗</span></a>
            </article>
          ))}
        </div>
      </section>

      <section className="dash-shell section-block expertise-section">
        <div className="section-heading"><div><p className="section-index">02 / ENGINEERING PROFILE</p><h2>Built for the whole lifecycle.</h2></div></div>
        <div className="expertise-grid">
          <article><span>01</span><h3>Product &amp; architecture</h3><p>Requirements, process mapping, prototyping, data modeling, system design, and pragmatic delivery planning.</p></article>
          <article><span>02</span><h3>Backend &amp; integration</h3><p>Typed REST APIs, transactions, RBAC, logging, validation, SAP B1, customs, e-signature, and payment integrations.</p></article>
          <article><span>03</span><h3>Frontend systems</h3><p>Responsive React and Angular interfaces, typed API layers, reusable components, dashboards, and role-based workflows.</p></article>
          <article><span>04</span><h3>Production ownership</h3><p>Azure deployment, SQL performance, diagnostics, stability improvements, production support, and junior mentoring.</p></article>
        </div>
      </section>

      <section className="dash-shell career-card">
        <div className="career-heading"><p className="section-index">03 / CURRENTLY</p><h2>PT IDS Teknologi Indonesia</h2><p>Full Stack Web Engineer · Enterprise Applications &amp; Integration</p></div>
        <div className="career-meta"><span>JUL 2025 — PRESENT</span><span>BANTEN, INDONESIA</span></div>
        <p className="career-copy">Delivering enterprise systems across manufacturing, mining, procurement, inventory, production, customs, automated payments, digital signatures, and approval workflows.</p>
        <div className="career-tags"><span>Architecture</span><span>Full-stack delivery</span><span>Enterprise integration</span><span>Mentoring</span></div>
      </section>

      <section className="dash-shell closing-panel">
        <p>Have a complex process that needs a clear system?</p>
        <h2>Let’s build something dependable.</h2>
        <div><a href="/contact" className="dash-button primary">Start a conversation <span>↗</span></a><a href="/resume" className="text-link">View full résumé →</a></div>
      </section>
    </main>
  );
}
