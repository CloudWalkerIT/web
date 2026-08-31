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

    // Wait one frame so layout is settled before jumping.
    requestAnimationFrame(() => {
      el.scrollIntoView();
    });
  }, [pathname]);

  return null;
}
