import { useEffect, useRef, useState } from "react";

export function AutoplayFilm({ src, poster, title, width = 1080, height = 1920 }: { src: string; poster?: string; title: string; width?: number; height?: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const element = video.current;
    if (!element) return;
    // Set native mute state before assigning a source or attempting playback.
    element.muted = true;
    element.defaultMuted = true;
    const preference = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(preference?.matches ?? false);
    updatePreference();
    preference?.addEventListener("change", updatePreference);
    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.25;
        setVisible(inView);
        if (inView) setLoaded(true);
      }, { threshold: [0, 0.25] });
      observer.observe(element);
    } else {
      setLoaded(true);
      setVisible(true);
    }
    return () => {
      observer?.disconnect();
      preference?.removeEventListener("change", updatePreference);
    };
  }, [src]);

  useEffect(() => {
    const element = video.current;
    if (!element || !loaded) return;
    let cancelled = false;
    if (visible && !reducedMotion) {
      const playback = element.play();
      playback?.then(() => { if (!cancelled) setBlocked(false); }).catch(() => {
        if (!cancelled) setBlocked(true);
      });
    } else element.pause();
    return () => { cancelled = true; };
  }, [loaded, visible, reducedMotion]);

  return <div className="autoplay-film">
    <video ref={video} src={loaded ? src : undefined} poster={poster} width={width} height={height} style={{ aspectRatio: `${width} / ${height}` }} controls muted={loaded} playsInline loop autoPlay={loaded && visible && !reducedMotion} preload="none" aria-label={title} onError={() => setFailed(true)}>
      Your browser does not support this video. Use the link below to watch.
    </video>
    <p className="autoplay-film-note" role="status">{failed ? "Video unavailable here. Open the project or use its watch link." : blocked || reducedMotion ? "Press play to watch. Starts muted; use the sound control to listen." : "Starts muted · Use the sound control to listen."}</p>
  </div>;
}
