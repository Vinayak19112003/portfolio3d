import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import {
  buildProjectBrief,
  buildProjectMailto,
  contactEmail,
} from "../lib/enquiry.mjs";
export function ProjectEnquiry() {
  const [prepared, setPrepared] = useState<{
    brief: string;
    mailto: string;
  } | null>(null);
  const [copyStatus, setCopyStatus] = useState("");
  function prepare(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fields = Object.fromEntries(new FormData(e.currentTarget).entries());
    setPrepared({
      brief: buildProjectBrief(fields),
      mailto: buildProjectMailto(fields),
    });
    setCopyStatus("");
  }
  async function copyBrief() {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(prepared.brief);
      setCopyStatus("Project brief copied.");
    } catch {
      setCopyStatus(
        "Copy is unavailable here. Select and copy the brief below.",
      );
    }
  }
  return (
    <section
      className="contact-section"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="shell contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">05 / Start a conversation</p>
          <h2 id="contact-heading">
            What are
            <br />
            we making<span>?</span>
          </h2>
          <p>
            Tell me what you have in mind. A website, a film, a workflow—or
            something that connects all three.
          </p>
          <a className="contact-email" href={"mailto:" + contactEmail}>
            {contactEmail} <ArrowUpRight size={18} />
          </a>
          <p className="contact-fine">
            Prefer email? Send your goal, a reference, and your timeline.
          </p>
        </div>
        <form
          className="enquiry-form"
          onSubmit={prepare}
          onChange={() => {
            setPrepared(null);
            setCopyStatus("");
          }}
        >
          <div className="field-row">
            <label>
              Your name
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={80}
                placeholder="Your name"
              />
            </label>
            <label>
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={150}
                placeholder="you@company.com"
              />
            </label>
          </div>
          <label>
            What do you need?
            <select name="service" required defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Website or application</option>
              <option>Video editing or brand film</option>
              <option>AI or workflow automation</option>
              <option>A combined project</option>
            </select>
          </label>
          <label>
            A little about the project
            <textarea
              name="brief"
              required
              minLength={20}
              maxLength={2000}
              rows={4}
              placeholder="Your goal, audience, references, and the work you need."
            />
          </label>
          <div className="field-row">
            <label>
              Budget range <span>(optional)</span>
              <input
                name="budget"
                maxLength={80}
                placeholder="e.g. ₹25,000–₹50,000"
              />
            </label>
            <label>
              Target date <span>(optional)</span>
              <input name="deadline" type="date" />
            </label>
          </div>
          <button type="submit" className="button button-ivory">
            Prepare project email <ArrowUpRight size={17} />
          </button>
          <p className="form-note">
            Prepare your brief, then open it in your email app. This website
            does not submit or store your enquiry.
          </p>
          {prepared ? (
            <div className="prepared-brief">
              <p>
                <Check size={17} /> Your project brief is ready.
              </p>
              <div className="button-row">
                <a className="button button-red" href={prepared.mailto}>
                  <Mail size={16} /> Open email app
                </a>
                <button
                  type="button"
                  className="copy-button"
                  onClick={copyBrief}
                >
                  <Copy size={16} /> Copy brief
                </button>
              </div>
              <details>
                <summary>Review your brief</summary>
                <textarea
                  aria-label="Prepared project brief"
                  readOnly
                  value={prepared.brief}
                  rows={10}
                />
              </details>
              <p role="status">{copyStatus}</p>
            </div>
          ) : null}
        </form>
      </div>
    </section>
  );
}
