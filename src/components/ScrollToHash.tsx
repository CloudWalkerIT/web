"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * The App Router restores scroll position after hydration, which cancels
 * the browser's native jump to location.hash on both fresh loads and
 * client-side navigations. This re-applies the jump once per navigation.
 */
export default function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const el = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!el) return;

    // behavior: "instant" on purpose. The page sets scroll-behavior: smooth
    // globally, and a smooth jump started here loses a race with the App
    // Router's scroll restoration, which cancels it mid-animation and the
    // page ends back at the top. An instant jump cannot be interrupted.
    // The second application catches a restoration that fires after us.
    el.scrollIntoView({ behavior: "instant" });
    const t = setTimeout(() => el.scrollIntoView({ behavior: "instant" }), 150);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
