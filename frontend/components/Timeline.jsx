'use client';

import { motion } from 'framer-motion';
import { HiOutlineBriefcase, HiOutlineAcademicCap } from 'react-icons/hi2';

function TimelineList({ title, icon: Icon, items }) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] text-black shadow-[0_0_18px_-2px_rgba(57,255,20,0.6)]">
          <Icon className="text-xl" />
        </span>
        <h3 className="text-xl font-extrabold tracking-tight text-[var(--foreground)] uppercase">
          {title}
        </h3>
      </div>

      <ol className="relative mt-8 flex flex-col gap-4 border-l border-white/10 pl-7">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.07 }}
            className="group relative rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors duration-300 hover:border-[var(--accent)]/60 hover:bg-white/[0.05]"
          >
            <span className="absolute top-1/2 -left-[34px] h-3 w-3 -translate-y-1/2 rounded-full bg-[var(--accent)] shadow-[0_0_10px_2px_rgba(57,255,20,0.6)] transition-transform duration-300 group-hover:scale-125" />
            <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
            {item.org && (
              <p className="mt-1 text-sm text-[var(--muted)]">{item.org}</p>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export default function Timeline({ experience, education }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mt-20 grid grid-cols-1 gap-12 sm:grid-cols-2"
    >
      <TimelineList title="Experience" icon={HiOutlineBriefcase} items={experience} />
      <TimelineList title="Education" icon={HiOutlineAcademicCap} items={education} />
    </motion.div>
  );
}
