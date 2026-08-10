"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center">
          <img src="/logoNew.png" alt="Casavora" className="h-10 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-ink-soft">
          <a href="#familiar" className="hover:text-ink transition-colors">Problem</a>
          <a href="#demo" className="hover:text-ink transition-colors">Prototype</a>
          <a href="#roadmap" className="hover:text-ink transition-colors">Roadmap</a>
          <a href="#survey" className="hover:text-ink transition-colors">Shape it</a>
        </nav>
        <Button
          render={<a href="#founding" />} nativeButton={false}
          className="h-auto rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover-lift"
        >
          Join founding members
        </Button>
      </div>
    </header>
  );
}
