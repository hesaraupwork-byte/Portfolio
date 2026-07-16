'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { FaVideo } from 'react-icons/fa6';
import WebGLErrorBoundary from './WebGLErrorBoundary';
import HeroShatterVideo from './HeroShatterVideo';
import { FILL_HOVER } from '@/lib/hoverFill';

const HERO_VIDEO_SRC = '/hero-video.mp4';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

async function hasWebGL() {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return false;

    const { WebGLRenderer } = await import('three');
    const renderer = new WebGLRenderer({ canvas, failIfMajorPerformanceCaveat: true });
    const ok = !!renderer.getContext();
    renderer.dispose();
    renderer.forceContextLoss();
    return ok;
  } catch {
    return false;
  }
}

export default function Hero() {
  const [canRender3D, setCanRender3D] = useState(false);
  const [videoOk, setVideoOk] = useState(null); // null = checking, true = ok, false = missing

  useEffect(() => {
    let cancelled = false;
    hasWebGL().then((ok) => {
      if (!cancelled) setCanRender3D(ok);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const probe = document.createElement('video');
    probe.muted = true;
    probe.oncanplay = () => setVideoOk(true);
    probe.onerror = () => setVideoOk(false);
    probe.src = HERO_VIDEO_SRC;
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-20 pb-8"
    >
      {canRender3D && (
        <div className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full opacity-70 lg:w-1/2">
          <WebGLErrorBoundary>
            <HeroScene />
          </WebGLErrorBoundary>
        </div>
      )}

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div className="relative flex flex-col items-center gap-6 text-center lg:items-start lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--muted)]"
          >
            Graphic Designer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-glitch max-w-xl text-5xl font-extrabold tracking-tight uppercase sm:text-6xl lg:text-7xl"
          >
            Nadil Hesara
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-lg text-[var(--muted)]"
          >
            Branding · Illustration · UI Design · Print &amp; Digital Media
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-4 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#projects"
              className="rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className={`rounded-full border border-white/15 px-6 py-3 text-sm font-medium ${FILL_HOVER}`}
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[16rem] overflow-hidden rounded-2xl border border-[var(--accent)]/40 bg-white/[0.03] shadow-[0_0_22px_-6px_rgba(57,255,20,0.35)] sm:max-w-[20rem]"
        >
          {videoOk && <HeroShatterVideo src={HERO_VIDEO_SRC} />}

          {videoOk === false && (
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--muted)]">
              <FaVideo className="text-3xl" />
              <span className="text-xs">Add hero-video.mp4</span>
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
        </motion.div>
      </div>
    </section>
  );
}
