'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FILL_HOVER } from '@/lib/hoverFill';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
];

const MOBILE_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Me' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: "Let's Talk" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [pillStyle, setPillStyle] = useState(null);
  const [pillTarget, setPillTarget] = useState('#home');
  const [activeHref, setActiveHref] = useState('#home');
  const navRef = useRef(null);
  const linkRefs = useRef({});
  const isHoveringRef = useRef(false);

  const measurePill = (href) => {
    const linkEl = linkRefs.current[href];
    if (!linkEl || !navRef.current) return;
    const linkRect = linkEl.getBoundingClientRect();
    const navRect = navRef.current.getBoundingClientRect();
    setPillStyle({ left: linkRect.left - navRect.left, width: linkRect.width });
    setPillTarget(href);
  };

  useEffect(() => {
    measurePill(activeHref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isHoveringRef.current) measurePill(activeHref);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeHref]);

  useEffect(() => {
    const sections = LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (href) => {
    isHoveringRef.current = true;
    measurePill(href);
  };

  const handleMouseLeaveNav = () => {
    isHoveringRef.current = false;
    measurePill(activeHref);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="border-b border-white/10 bg-[var(--background)]/70 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-lg font-semibold tracking-tight">
            Nadil <span className="text-[var(--accent)]">Hesara</span>
          </a>

          <ul
            ref={navRef}
            onMouseLeave={handleMouseLeaveNav}
            className="relative hidden gap-1 text-sm font-medium sm:flex"
          >
            <motion.div
              initial={false}
              animate={{
                left: pillStyle?.left ?? 0,
                width: pillStyle?.width ?? 0,
                opacity: pillStyle ? 1 : 0,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className="absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-[var(--accent)]"
            />
            {LINKS.map((link) => (
              <li key={link.href} className="relative z-10">
                <a
                  ref={(el) => {
                    linkRefs.current[link.href] = el;
                  }}
                  href={link.href}
                  onMouseEnter={() => handleMouseEnter(link.href)}
                  className={`block rounded-full px-4 py-2 transition-colors duration-300 ${
                    pillTarget === link.href
                      ? 'text-black'
                      : 'text-[var(--muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 sm:hidden ${FILL_HOVER}`}
            aria-label="Toggle menu"
          >
            <span className="text-lg">{open ? '✕' : '☰'}</span>
          </button>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[var(--background)] sm:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <a
              href="#home"
              onClick={() => setOpen(false)}
              className="text-lg font-semibold tracking-tight"
            >
              Nadil <span className="text-[var(--accent)]">Hesara</span>
            </a>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-lg ${FILL_HOVER}`}
            >
              ✕
            </button>
          </div>

          <ul className="flex flex-1 flex-col justify-center gap-5 px-6 pb-20">
            {MOBILE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-glitch block text-4xl font-extrabold tracking-tight uppercase ${
                    activeHref === link.href
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--foreground)]'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
