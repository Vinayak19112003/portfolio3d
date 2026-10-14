import { useEffect, useRef } from "react";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

export function InstagramReel({ url, title, poster }: { url: string; title: string; poster?: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = container.current;
    if (!host) return;
    // Instagram replaces this placeholder. Keep its DOM separate from React's.
    const placeholder = document.createElement("blockquote");
    placeholder.className = "instagram-media";
    placeholder.dataset.instgrmPermalink = url;
    placeholder.dataset.instgrmVersion = "14";
    const link = document.createElement("a");
    link.href = url;
    link.textContent = `Watch ${title} on Instagram`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    if (poster) {
      const image = document.createElement("img");
      image.src = poster;
      image.alt = `${title} cover`;
      image.loading = "lazy";
      link.prepend(image);
    }
    placeholder.append(link);
    host.replaceChildren(placeholder);

    const process = () => window.instgrm?.Embeds.process();
    let script = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    if (!script) {
      script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      document.body.append(script);
    }
    const failed = () => script?.remove();
    script.addEventListener("load", process);
    script.addEventListener("error", failed);
    process();
    return () => {
      script?.removeEventListener("load", process);
      script?.removeEventListener("error", failed);
      host.replaceChildren();
    };
  }, [url, title, poster]);

  return <div className="instagram-reel" ref={container} aria-label={`${title} Instagram reel`} />;
}
