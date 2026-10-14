import { useState } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight, Menu, X, Play, Plus } from "lucide-react";
import { projects, type Project } from "./data/projects";
import { ProjectVisual } from "./components/ProjectVisual";
import { ProjectEnquiry } from "./components/ProjectEnquiry";
import { InstagramReel } from "./components/InstagramReel";
import { OpenSourceSection, OpenSourcePage } from "./components/OpenSource";
import { AutoplayFilm } from "./components/AutoplayFilm";

export const projectPath = (project: Project) => `/work/${project.id}/`;
const findProject = (id: string) => projects.find((project) => project.id === id)!;

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header shell">
    <a className="wordmark" href="/" aria-label="Vinayak Deshmuk home">vinayak<span>✳</span><small>DESIGN × TECHNOLOGY</small></a>
    <button className="menu-toggle" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    <nav id="site-navigation" className={open ? "navigation is-open" : "navigation"} aria-label="Main navigation" onClick={() => setOpen(false)}>
      <a href="/#work">Selected work <span>05</span></a><a href="/#open-source">Open source</a><a href="/#about">About</a><a className="nav-contact" href="/#contact">Let’s talk <ArrowUpRight size={16}/></a>
    </nav>
  </header>;
}
function GroomScreen({ priority = false }: { priority?: boolean }) {
  return <div className="browser-frame"><div className="browser-bar"><span>● ● ●</span><span>Groom Room by Asha</span><ArrowUpRight size={12}/></div><img src="/images/groom-interface.jpg" alt="Groom Room’s live booking interface, with pet grooming services and appointment booking" width="1348" height="926" loading={priority ? "eager" : "lazy"}/></div>;
}
function Feature({ project, index }: { project: Project; index: string }) {
  return <article className={`feature feature-${project.id}`}>
    {project.video ? <div className="feature-art feature-video"><AutoplayFilm src={project.video} poster={project.poster} title={`${project.title} film`}/><a className="art-action" href={projectPath(project)} aria-label={`Explore ${project.title}`}><ArrowUpRight size={22}/></a></div> : <a className="feature-art" href={projectPath(project)} aria-label={`Explore ${project.title}`}>
      {project.id === "groom-room" ? <GroomScreen/> : <ProjectVisual project={project}/>}
      <span className="art-action">{project.instagram ? <Play size={18}/> : <ArrowUpRight size={22}/>}</span>
    </a>}
    <div className="feature-copy"><div className="project-meta"><span>{index} / {project.label}</span><span>{project.instagram ? "FILM & MOTION" : project.category.toUpperCase()}</span></div>
      <a href={projectPath(project)}><h3>{project.title}<ArrowUpRight/></h3></a>{project.client && <p className="client-credit">Client: {project.client}</p>}<p>{project.subtitle}</p>
    </div>
  </article>;
}
function Home() {
  return <>
    <section className="hero shell" aria-labelledby="hero-heading">
      <div className="hero-topline"><span className="eyebrow"><i/> Freelance developer & video editor</span><span className="hero-location">BASED IN INDIA · WORKING EVERYWHERE</span></div>
      <h1 id="hero-heading">I build digital<br/>experiences.<br/><em>And the stories</em><br/><em>around them.</em><span className="hero-asterisk" aria-hidden="true">✳</span></h1>
      <div className="hero-bottom"><p>I build websites and apps, edit videos,<br/>and create tools that automate tasks.<br/><strong>Explore each kind of work below.</strong></p><a className="round-link" href="#work"><span>Discover the work</span><span className="circle"><ArrowDown size={24}/></span></a></div>
    </section>
    <section className="work-section shell" id="work" aria-labelledby="work-heading">
      <div className="section-heading"><p className="eyebrow">01 / Selected work</p><h2 id="work-heading">Find the work.<br/><em>By what you need.</em></h2><p>Websites and coding, video editing, and contributions to open-source projects. Choose a category to explore.</p></div>
      <nav className="work-categories" aria-label="Work categories"><a href="#coding">Websites & coding <span>03</span><ArrowDown size={16}/></a><a href="#video-editing">Video editing <span>02</span><ArrowDown size={16}/></a><a href="#open-source">Open source<ArrowDown size={16}/></a></nav>
      <section className="work-group" id="coding" aria-labelledby="coding-heading"><div className="work-group-heading"><div><p className="eyebrow">Build / 03 projects</p><h2 id="coding-heading">Websites & coding</h2></div><p>Websites, apps, and useful tools I’ve built. Open a project to see how it works.</p></div><div className="coding-grid"><Feature project={findProject("tracereel")} index="01"/><Feature project={findProject("groom-room")} index="02"/><Feature project={findProject("mathlens")} index="03"/></div></section>
      <section className="work-group" id="video-editing" aria-labelledby="editing-heading"><div className="work-group-heading"><div><p className="eyebrow">Edit / 02 films</p><h2 id="editing-heading">Video editing</h2></div><p>Brand promos and short videos. Editing, animated text, and sound brought together.</p></div><div className="editing-grid"><Feature project={findProject("branzyne-film")} index="04"/><Feature project={findProject("neo-film")} index="05"/></div></section>
    </section>
    <OpenSourceSection/>
    <section className="services-section" id="services" aria-labelledby="services-heading"><div className="shell"><div className="section-heading"><p className="eyebrow">03 / What I can do for you</p><h2 id="services-heading">From the first idea<br/><em>to the final detail.</em></h2></div>
      {[
        ["01", "Websites & apps", "Design & coding", "A website for your business, a booking app, or a custom tool. Designed for your audience and built to be easy to use.", "Web design / Development / Custom tools"],
        ["02", "Video editing", "Brand promos & short videos", "Turn your footage and ideas into a finished video, with clear storytelling, animated text, and sound.", "Editing / Animated text / Sound"],
        ["03", "AI & automation", "Tools that save you time", "Connect your apps and automate repetitive tasks with practical workflows and custom tools.", "Workflows / App integrations / AI tools"],
      ].map(([n,title,label,description,tags]) => <a className="service-row" href="#contact" key={n}><span className="service-number">{n}</span><div><span className="eyebrow">{label}</span><h3>{title}</h3></div><div className="service-description"><p>{description}</p><small>{tags}</small></div><ArrowUpRight className="service-arrow"/></a>)}
    </div></section>
    <section className="about-section shell" id="about" aria-labelledby="about-heading"><div className="about-mark" aria-hidden="true"><span>v<span className="mark-dot">.</span></span><small>CURIOUS BY NATURE.<br/>INTENTIONAL BY DESIGN.</small></div><div className="about-copy"><p className="eyebrow">04 / The person behind the work</p><h2 id="about-heading">Hi, I’m Vinayak.<br/><em>A builder with<br/>a storyteller’s eye.</em></h2><p>I work where design, development, and moving images meet. I like making complex things feel simple—and giving useful ideas a memorable form.</p><p>From a creative tool to a cinematic introduction, I bring the same attention to how something works and how it feels.</p><a className="text-link" href="#contact">Let’s make something together <ArrowUpRight size={18}/></a></div></section>
    <section className="process-section shell" aria-label="How we work"><p className="eyebrow">05 / A clear way forward</p><div className="process-grid">{[["01","Listen","Your goals, your audience, and what success looks like."],["02","Shape","A clear direction, scope, and visual approach."],["03","Make","Build, share progress, and refine the details."],["04","Launch","Final checks, delivery, and a considered handover."]].map(([n,title,copy]) => <div key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></div>)}</div></section>
    <ProjectEnquiry/>
  </>;
}
function FilmPlayer({ project }: { project: Project }) {
  const [playing, setPlaying] = useState(false);
  if (project.video) return <div className="film-player"><div className="film-player-stage"><AutoplayFilm src={project.video} poster={project.poster} title={`${project.title} film`}/></div><div className="instagram-link"><p>{project.client ? `Client: ${project.client}. Original 35-second promo.` : "Original 34-second introduction film."}</p><a className="text-link" href={project.instagram} target="_blank" rel="noopener noreferrer">Watch on Instagram<ArrowUpRight size={17}/></a></div></div>;
  return <div className="film-player"><div className="film-player-stage">{playing ? <InstagramReel url={project.instagram!} title={project.title} poster={project.poster}/> : <button className="film-load" onClick={() => setPlaying(true)} aria-label={`Load ${project.title} Instagram reel`}><ProjectVisual project={project}/><span className="film-play"><span className="circle"><Play fill="currentColor" size={20}/></span>Play Instagram reel</span></button>}</div><div className="instagram-link"><p>Film hosted on Instagram. Playback may require an Instagram login.</p><a className="text-link" href={project.instagram} target="_blank" rel="noopener noreferrer">Watch on Instagram <ArrowUpRight size={17}/></a></div></div>;
}
function CaseStudy({ project }: { project: Project }) {
  const next = projects[(projects.findIndex(p => p.id === project.id) + 1) % projects.length];
  return <article className={`case-study case-${project.id}`}>
    <div className="case-header shell"><a className="back-link" href="/#work"><ArrowLeft size={16}/> All selected work</a><div className="project-meta"><span>{project.label}</span><span>{project.category}</span></div><h1>{project.title}</h1><p className="case-subtitle">{project.subtitle}</p>{project.client && <p className="case-client">Client: <a href={project.live} target="_blank" rel="noopener noreferrer">{project.client}<ArrowUpRight size={15}/></a></p>}<div className="case-intro"><p>{project.description}</p><div className="case-actions">{project.live && <a className="button button-ivory" href={project.live} target="_blank" rel="noopener noreferrer">{project.instagram ? "Visit brand website" : project.id === "tracereel" ? "Explore interactive showcase" : "Explore live demo"}<ArrowUpRight size={17}/></a>}{project.source && <a className="button button-ivory" href={project.source} target="_blank" rel="noopener noreferrer">Explore the source<ArrowUpRight size={17}/></a>}{project.instagram && <a className="button button-ivory" href="#film">Watch the film<ArrowDown size={17}/></a>}</div></div></div>
    <div className="case-showcase shell" id={project.instagram ? "film" : "project-visual"}>{project.instagram ? <FilmPlayer project={project}/> : <div className={`case-art case-art-${project.id}`}>{project.id === "groom-room" ? <GroomScreen priority/> : <ProjectVisual project={project}/>}</div>}</div>
    <div className="case-details shell"><aside><p className="eyebrow">Inside the project</p><h2>Purpose.<br/>Process.<br/><em>Details.</em></h2><a className="text-link" href="/#contact">Have something in mind?<ArrowUpRight size={16}/></a></aside><div className="case-story"><section><span className="eyebrow">01 / The brief</span><h2>A problem worth solving.</h2><p>{project.problem}</p></section><section><span className="eyebrow">02 / The approach</span><h2>Making the idea work.</h2><p>{project.approach}</p></section><section><span className="eyebrow">03 / The delivery</span><h2>What came together.</h2><ul>{project.deliverables.map(item => <li key={item}><Plus size={15}/>{item}</li>)}</ul></section>{project.caveat && <p className="project-note">{project.caveat}</p>}</div></div>
    <a className="next-project shell" href={projectPath(next)}><span className="eyebrow">Up next / {next.label}</span><span>{next.title}<ArrowUpRight/></span></a>
  </article>;
}
export default function App({ initialPath }: { initialPath?: string }) {
  const path = (initialPath ?? (typeof window !== "undefined" ? window.location.pathname : "/")).replace(/\/+$/, "") || "/";
  const project = projects.find(p => path === `/work/${p.id}`);
  return <><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{path === "/" ? <Home/> : path === "/open-source" ? <OpenSourcePage/> : project ? <CaseStudy project={project}/> : <section className="not-found shell"><p className="eyebrow">404 / Page not found</p><h1>Let’s get you<br/><em>back to the work.</em></h1><a className="button button-ivory" href="/">Back home <ArrowUpRight size={18}/></a></section>}</main><footer className="site-footer shell"><a className="footer-name" href="/">vinayak<span>✳</span></a><div><span>Design. Build. Tell a story.</span><a href="mailto:vinayak19112003@gmail.com">Email <ArrowUpRight size={14}/></a><a href="https://github.com/Vinayak19112003" target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={14}/></a><span>© {new Date().getFullYear()} Vinayak Deshmuk</span></div></footer></>;
}
