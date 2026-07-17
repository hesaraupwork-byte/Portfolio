'use client';

import { motion } from 'framer-motion';
import PlaceholderPhoto from './PlaceholderPhoto';
import AppBadge from './AppBadge';
import Timeline from './Timeline';
import { APP_TOOLS, EXTRA_SKILLS } from '@/lib/tools';
import { EXPERIENCE, EDUCATION } from '@/lib/resumeData';

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold tracking-tight uppercase sm:text-7xl"
      >
        <span className="text-[var(--foreground)]">about</span>{' '}
        <span className="text-[var(--accent)]">me</span>
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid aspect-[4/3] grid-cols-2 grid-rows-2 gap-3"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/photo-1.jpg"
            alt="Nadil Hesara"
            className="h-full w-full rounded-2xl rounded-tr-[48px] object-cover"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/about/photo-3.jpg"
            alt="Nadil Hesara"
            className="row-span-2 h-full w-full rounded-2xl object-cover"
          />
          <img
            src="/about/photo-2.jpg"
            alt="Nadil Hesara"
            className="h-full w-full rounded-2xl rounded-tr-[48px] object-cover object-[center_18%]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-lg leading-relaxed text-[var(--muted)]">
            I&apos;m {' '}
            <strong className="font-semibold text-[var(--foreground)]">
              Nadil Hesara,
            </strong>{' '}
            a passionate Graphic Designer and Digital Artist specializing in creative visual design, branding, social media content, vector illustrations, and photo manipulation. I combine creativity and attention to detail to transform ideas into engaging, professional visuals that make an impact.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-[var(--muted)]">
            My work spans from{' '}
            <strong className="font-semibold text-[var(--foreground)]">
              logo animation
            </strong>{' '}
            to{' '}
            <strong className="font-semibold text-[var(--foreground)]">
              social media marketing
            </strong>{' '}
             I&apos;m also the owner of{' '}
            <strong className="font-semibold text-[var(--foreground)]">
              Nax Marketing Agency
            </strong>
            . I care about clean typography, thoughtful color, and design
            that actually solves a problem for the people using it.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {APP_TOOLS.filter((tool) => tool.label !== 'Pr' && tool.label !== 'Ae').map((tool) => (
              <AppBadge key={tool.label} label={tool.label} size="sm" />
            ))}
            {EXTRA_SKILLS.map(({ icon: Icon, label }) => (
              <span
                key={label}
                title={label}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-xs text-black"
              >
                <Icon />
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <Timeline experience={EXPERIENCE} education={EDUCATION} />
    </section>
  );
}
