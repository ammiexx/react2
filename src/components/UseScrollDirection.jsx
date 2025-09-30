import { useEffect, useRef, useState } from "react";

/**
 * useScrollDirection - returns "up" or "down"
 * Reacts immediately to scroll changes and is debounced via rAF for performance.
 */
export function useScrollDirection({ thresholdPixels = 0 } = {}) {
  const [scrollDirection, setScrollDirection] = useState("up");
  const lastScrollYRef = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      window.requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const direction = currentY > lastScrollYRef.current ? "down" : "up";

        setScrollDirection((prev) => {
          // update only if direction changed and movement passes threshold
          if (direction !== prev && Math.abs(currentY - lastScrollYRef.current) > thresholdPixels) {
            return direction;
          }
          return prev;
        });

        lastScrollYRef.current = currentY > 0 ? currentY : 0;
        tickingRef.current = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [thresholdPixels]);

  return scrollDirection;
}
