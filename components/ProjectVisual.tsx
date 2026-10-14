import type { Project } from "../data/projects";
export function ProjectVisual({ project }: { project: Project }) {
  if (project.id === "groom-room")
    return (
      <div className="groom-cover">
        <div className="groom-cover-copy">
          <span className="cover-kicker">GROOM ROOM / BY ASHA</span>
          <h4>
            A little care.
            <br />A happier pet.
          </h4>
          <span className="cover-service">Booking, made personal.</span>
        </div>
        <img
          src={project.poster}
          width="800"
          height="552"
          loading="lazy"
          alt="Pet grooming studio with a dog and cat"
        />
      </div>
    );
  if (project.id === "tracereel")
    return (
      <div className="trace-cover">
        <div className="trace-cover-title">
          <span>▣</span> TraceReel
        </div>
        <p>
          From browser action
          <br />
          to a finished film.
        </p>
        <div className="trace-diagram" aria-hidden="true">
          <div>
            <span>01</span>
            <b>Capture</b>
            <i />
          </div>
          <div>
            <span>02</span>
            <b>Reconstruct</b>
            <i />
          </div>
          <div>
            <span>03</span>
            <b>Render</b>
            <i />
          </div>
        </div>
        <div className="trace-timeline" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <span className="cover-note">Trace reconstruction toolkit</span>
      </div>
    );
  if (project.id === "mathlens")
    return (
      <div className="math-cover">
        <span className="cover-kicker">MATHLENS / VISUAL MATHEMATICS</span>
        <h4>
          Make the
          <br />
          abstract visible.
        </h4>
        <svg
          viewBox="0 0 420 220"
          role="img"
          aria-label="Coordinate graph illustrating slope"
        >
          <defs>
            <pattern
              id="math-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M30 0H0V30"
                fill="none"
                stroke="#c6d0c6"
                strokeWidth="0.7"
              />
            </pattern>
          </defs>
          <rect width="420" height="220" fill="url(#math-grid)" />
          <path d="M0 180H420M100 0V220" stroke="#506052" strokeWidth="1.2" />
          <path d="M35 212L370 32" stroke="#324d38" strokeWidth="3" />
          <path
            d="M160 145H300V70"
            fill="none"
            stroke="#bc4935"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
          <circle cx="160" cy="145" r="6" fill="#bc4935" />
          <circle cx="300" cy="70" r="6" fill="#bc4935" />
          <text x="206" y="168" fontSize="13" fill="#324d38">
            run
          </text>
          <text x="310" y="110" fontSize="13" fill="#324d38">
            rise
          </text>
        </svg>
        <span className="cover-note">Interactive slope & Z-Score lessons</span>
      </div>
    );
  return (
    <div
      className={
        "film-cover " +
        (project.id === "neo-film" ? "neo-cover" : "branzyne-cover")
      }
    >
      <img
        src={project.poster}
        width="1080"
        height="1920"
        loading="lazy"
        alt={
          project.id === "neo-film"
            ? "Neo’s silhouette from the introduction film"
            : "Branzyne brand reveal from the supplied promotional film"
        }
      />
      {project.id === "neo-film" ? (
        <span className="film-cover-title">NEO</span>
      ) : null}
      <span className="film-cover-label">
        {project.id === "neo-film" ? "AI INTRODUCTION" : "BRAND PROMOTION"} /{" "}
        {project.id === "neo-film" ? "34" : "35"} SEC
      </span>
    </div>
  );
}
