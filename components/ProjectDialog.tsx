import { useEffect, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import type { Project } from "../data/projects";
import { InstagramReel } from "./InstagramReel";
export function ProjectDialog({
  project,
  returnFocus,
  onClose,
}: {
  project: Project;
  returnFocus?: HTMLElement | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };
  }, [returnFocus]);
  return (
    <dialog
      ref={ref}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label="Close project details"
        >
          <X size={22} />
        </button>
        <p className="eyebrow red">
          {project.category} / {project.label}
        </p>
        <h2 id="project-dialog-title">{project.title}</h2>
        <p className="dialog-intro">{project.description}</p>
        {project.instagram ? (
          <>
            <InstagramReel url={project.instagram} title={project.title} poster={project.poster} />
            <p className="instagram-link">
              <a href={project.instagram} target="_blank" rel="noopener noreferrer">
                Watch on Instagram <ArrowUpRight size={16} />
              </a>
            </p>
          </>
        ) : project.poster ? (
          <img
            className="dialog-project-image"
            src={project.poster}
            alt="Groom Room pet-grooming project"
          />
        ) : null}
        <div className="case-grid">
          <section>
            <h3>The brief</h3>
            <p>{project.problem}</p>
          </section>
          <section>
            <h3>The approach</h3>
            <p>{project.approach}</p>
          </section>
        </div>
        <section className="deliverables">
          <h3>What’s inside</h3>
          <ul>
            {project.deliverables.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        {project.caveat ? (
          <p className="project-caveat">{project.caveat}</p>
        ) : null}
        <div className="button-row">
          {project.live ? (
            <a
              className="button button-red"
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.instagram ? "Visit the brand" : "Open live demo"}{" "}
              <ArrowUpRight size={16} />
            </a>
          ) : null}
          {project.source ? (
            <a
              className="button button-red"
              href={project.source}
              target="_blank"
              rel="noopener noreferrer"
            >
              View public source <ArrowUpRight size={16} />
            </a>
          ) : null}
          <a
            href="#contact"
            className="button button-outline light-outline"
            onClick={onClose}
          >
            Discuss a similar project <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </dialog>
  );
}
