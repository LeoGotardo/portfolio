import type Lenis from "lenis";

// The Lenis instance driving the page, when smooth scrolling is on (it is off under reduced motion).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Jumps straight to an element, through Lenis when it is driving the scroll so the two never disagree. */
export function jumpTo(target: HTMLElement) {
  if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
  else target.scrollIntoView({ behavior: "auto" });
}
