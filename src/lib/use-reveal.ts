import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

/** Adds `reveal-in` once the element scrolls into view. */
export function useInView<T extends HTMLElement>(options?: { threshold?: number; once?: boolean }) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            if (options?.once !== false) observer.unobserve(entry.target);
          } else if (options?.once === false) {
            setInView(false);
          }
        });
      },
      { threshold: options?.threshold ?? 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.once]);

  return { ref, inView };
}

/** Reveals a list of items one after another once the container is visible. */
export function useSequence(count: number, active: boolean, stepMs = 900) {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (!active) return;
    if (visible >= count) return;
    const t = setTimeout(() => setVisible((v) => Math.min(v + 1, count)), visible === 0 ? 120 : stepMs);
    return () => clearTimeout(t);
  }, [active, visible, count, stepMs]);
  return visible;
}
