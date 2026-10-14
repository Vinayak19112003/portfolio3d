import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Menu, X } from "lucide-react";
import { ProjectDialog } from "./components/ProjectDialog";
import { ProjectVisual } from "./components/ProjectVisual";
import { ProjectEnquiry } from "./components/ProjectEnquiry";
import { projects, type Project } from "./data/projects";

const filters = ["All", "Websites & apps", "Tools", "Video & motion"] as const;

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState<string>("All");
  const [selected, setSelected] = useState<Project | null>(null);
  const projectTrigger = useRef<HTMLElement | null>(null);
  function openProject(project: Project, trigger: HTMLElement) {
    projectTrigger.current = trigger;
    setSelected(project);
  }
  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);
  useEffect(() => {
    const resize = () => {
      if (window.innerWidth >= 760) setMenuOpen(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", key);
    };
  }, []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <a className="wordmark" href="#main" aria-label="Vinayak Deshmuk home">
          VD<span>.</span>
        </a>
        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav
          id="site-navigation"
          className={menuOpen ? "nav-links is-open" : "nav-links"}
          aria-label="Main navigation"
          onClick={() => setMenuOpen(false)}
        >
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact" className="button button-red nav-cta">
            Start a project <ArrowUpRight size={15} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero shell" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> Vinayak Deshmuk · Creative
              technologist
            </p>
            <h1 id="hero-heading">
              Websites.
              <br />
              Films.
              <br />
              <span>
                Intelligent
                <br className="small-line-break" /> systems.
              </span>
            </h1>
            <p className="hero-intro">
              I build websites, create videos, and automate workflows for
              creators and businesses.
            </p>
            <div className="button-row">
              <a href="#work" className="button button-red">
                Explore my work <ArrowDown size={16} />
              </a>
              <a href="#contact" className="button button-outline">
                Start a project <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="discipline-line">
              Development <span>/</span> Video & motion <span>/</span> AI
              automation
            </p>
          </div>
          <div className="hero-stage" aria-label="Featured work previews">
            <button
              className="hero-groom"
              onClick={(e) => openProject(projects[0], e.currentTarget)}
              aria-label="Explore Groom Room by Asha booking app"
            >
              <div className="mini-nav">
                <span>
                  ✦ Groom Room <small>by Asha</small>
                </span>
                <span className="mini-tag">Booking app</span>
              </div>
              <div className="groom-preview">
                <div>
                  <p className="mini-eyebrow">PET CARE, SIMPLIFIED</p>
                  <h2>
                    A little care.
                    <br />A happier pet.
                  </h2>
                  <p>Appointments that fit your pet.</p>
                  <span className="mini-button">Explore the project ↗</span>
                </div>
                <img
                  src="/images/groom-room.webp"
                  width="800"
                  height="552"
                  alt="A dog and cat being groomed in a warm studio"
                />
              </div>
              <div className="groom-footer">
                <span>Breed-aware scheduling</span>
                <span>Self-serve bookings</span>
              </div>
            </button>
            <button
              className="hero-neo"
              onClick={(e) => openProject(projects[4], e.currentTarget)}
              aria-label="Watch Neo introduction film"
            >
              <img
                src="/images/neo-poster.webp"
                width="1080"
                height="1920"
                alt="Neo in a dark silhouette, arms crossed"
              />
              <span className="neo-title">NEO</span>
              <span className="neo-subtitle">An AI introduction film ↗</span>
            </button>
            <button
              className="hero-trace"
              onClick={(e) => openProject(projects[1], e.currentTarget)}
              aria-label="Explore TraceReel browser-to-video toolkit"
            >
              <div>
                <span className="trace-mark">▣</span>
                <strong>TraceReel</strong>
                <span className="trace-description">
                  Browser traces → demo videos
                </span>
              </div>
              <div className="trace-wave" aria-hidden="true">
                {[
                  12, 24, 38, 18, 44, 31, 22, 42, 52, 18, 32, 40, 16, 50, 28,
                  44, 20, 34, 48, 26, 16, 36, 42, 20,
                ].map((height, i) => (
                  <i key={i} style={{ height }} />
                ))}
              </div>
              <span className="trace-foot">
                An engineering project <ArrowUpRight size={15} />
              </span>
            </button>
          </div>
        </section>
        <section
          className="work-section light-section"
          id="work"
          aria-labelledby="work-heading"
        >
          <div className="shell">
            <div className="section-top">
              <div>
                <p className="eyebrow red">01 / Selected work</p>
                <h2 id="work-heading">
                  Built. Directed.
                  <br className="mobile-only" /> Delivered.
                </h2>
              </div>
              <p className="section-note">
                Working products and finished films.
                <br />
                Explore the craft behind each one.
              </p>
            </div>
            <div
              className="work-filters"
              role="group"
              aria-label="Filter projects"
            >
              {filters.map((f) => (
                <button
                  key={f}
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              {visible.length} projects shown
            </p>
            <div className="project-grid">
              {visible.map((p) => (
                <article className={"project-card project-" + p.id} key={p.id}>
                  <button
                    className="project-image-button"
                    onClick={(e) => openProject(p, e.currentTarget)}
                    aria-label={(p.video ? "Watch " : "Explore ") + p.title}
                  >
                    <ProjectVisual project={p} />
                    <span className="project-action">
                      {p.video ? "Watch film" : "Explore project"}{" "}
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                  <div className="project-title-row">
                    <div>
                      <h3>
                        <button onClick={(e) => openProject(p, e.currentTarget)}>
                          {p.title}
                        </button>
                      </h3>
                      <p>{p.subtitle}</p>
                    </div>
                    <span className="project-number">{p.number}</span>
                  </div>
                  <div className="project-meta">
                    <span>{p.category}</span>
                    <span>{p.label}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section
          className="services-section shell"
          id="services"
          aria-labelledby="services-heading"
        >
          <div className="section-top">
            <div>
              <p className="eyebrow red">02 / How I can help</p>
              <h2 id="services-heading">
                From the first idea
                <br />
                to the final frame.
              </h2>
            </div>
            <p className="section-note">
              One person to work with.
              <br />A clear scope. Thoughtful execution.
            </p>
          </div>
          <div className="services-grid">
            <article>
              <span className="service-number">01</span>
              <h3>
                Websites
                <br />& applications
              </h3>
              <p>
                A considered online presence, a useful booking flow, or a custom
                tool built around your business.
              </p>
              <ul>
                <li>Business websites & landing pages</li>
                <li>Booking systems & dashboards</li>
                <li>Interactive web applications</li>
              </ul>
              <a href="#contact">
                Discuss a website <ArrowUpRight size={17} />
              </a>
            </article>
            <article>
              <span className="service-number">02</span>
              <h3>
                Video
                <br />& motion
              </h3>
              <p>
                Videos with a clear message, purposeful pacing, and a visual
                identity that belongs to your brand.
              </p>
              <ul>
                <li>Short-form videos & brand promos</li>
                <li>Motion graphics & product demos</li>
                <li>AI video direction & editing</li>
              </ul>
              <a href="#contact">
                Discuss a film <ArrowUpRight size={17} />
              </a>
            </article>
            <article>
              <span className="service-number">03</span>
              <h3>
                AI
                <br />& automation
              </h3>
              <p>
                Practical integrations and workflows that connect your tools and
                reduce repeated manual tasks.
              </p>
              <ul>
                <li>Custom workflow integrations</li>
                <li>AI-assisted business tools</li>
                <li>Browser & media automation</li>
              </ul>
              <a href="#contact">
                Discuss a workflow <ArrowUpRight size={17} />
              </a>
            </article>
          </div>
        </section>
        <section
          className="about-section light-section"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="shell about-grid">
            <div className="identity-panel">
              <span className="identity-monogram" aria-hidden="true">
                VD<span>.</span>
              </span>
              <p>
                Developer.
                <br />
                Editor.
                <br />
                Builder.
              </p>
              <div className="identity-footer">
                <span>Based in India</span>
                <ArrowUpRight size={24} />
              </div>
            </div>
            <div className="about-copy">
              <p className="eyebrow red">03 / The person behind the work</p>
              <h2 id="about-heading">Hi, I’m Vinayak.</h2>
              <p className="about-lead">
                I work where software and storytelling meet.
              </p>
              <p>
                I build web experiences, create videos, and develop tools that
                connect the two. My work includes a pet-grooming booking app, an
                interactive learning product, and a toolkit that turns browser
                traces into demo videos.
              </p>
              <p>
                When you bring me a project, you work directly with me—from
                understanding the brief to reviewing the final delivery.
              </p>
              <a
                href="https://github.com/Vinayak19112003"
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Explore my public GitHub <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section
          className="process-section shell"
          aria-labelledby="process-heading"
        >
          <div className="section-top">
            <div>
              <p className="eyebrow red">04 / Working together</p>
              <h2 id="process-heading">A simple way forward.</h2>
            </div>
          </div>
          <ol className="process-grid">
            <li>
              <span>01</span>
              <h3>Understand</h3>
              <p>
                Your goal, audience, references, and what the finished work
                needs to do.
              </p>
            </li>
            <li>
              <span>02</span>
              <h3>Define</h3>
              <p>
                A clear proposal covering deliverables, timeline, and budget.
              </p>
            </li>
            <li>
              <span>03</span>
              <h3>Create</h3>
              <p>
                Build or edit, share progress, and refine through agreed
                reviews.
              </p>
            </li>
            <li>
              <span>04</span>
              <h3>Deliver</h3>
              <p>
                The final files or application, with the handover your project
                needs.
              </p>
            </li>
          </ol>
        </section>
        <ProjectEnquiry />
      </main>
      <footer className="site-footer shell">
        <a className="wordmark" href="#main" aria-label="Back to top">
          VD<span>.</span>
        </a>
        <p>Vinayak Deshmuk · Development, video & automation</p>
        <div>
          <a href="mailto:vinayak19112003@gmail.com">
            Email <ArrowUpRight size={14} />
          </a>
          <a
            href="https://github.com/Vinayak19112003"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <ArrowUpRight size={14} />
          </a>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
      {selected ? (
        <ProjectDialog project={selected} returnFocus={projectTrigger.current} onClose={() => setSelected(null)} />
      ) : null}
    </>
  );
}
