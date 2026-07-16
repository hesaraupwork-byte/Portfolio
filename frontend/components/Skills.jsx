'use client';

import { motion } from 'framer-motion';
import AppBadge from './AppBadge';
import { APP_TOOLS, EXTRA_SKILLS } from '@/lib/tools';

function SkillTile({ visual, label }) {
  return (
    <div className="flex w-32 shrink-0 flex-col items-center gap-2 rounded-xl border border-white/10 px-4 py-6 text-center transition-colors hover:border-[var(--accent)]">
      {visual}
      <span className="text-xs font-medium text-[var(--muted)]">{label}</span>
    </div>
  );
}

export default function Skills() {
  const tiles = [
    ...APP_TOOLS.map((tool) => ({
      key: tool.label,
      visual: <AppBadge label={tool.label} />,
      label: tool.name,
    })),
    ...EXTRA_SKILLS.map(({ icon: Icon, label }) => ({
      key: label,
      visual: <Icon className="text-3xl text-[var(--accent)]" />,
      label,
    })),
  ];
  const track = [...tiles, ...tiles];

  return (
    <section id="skills" className="w-full min-w-0 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="relative w-screen min-w-0 overflow-hidden"
        style={{
          marginLeft: 'calc(50% - 50vw)',
          marginRight: 'calc(50% - 50vw)',
          maskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        }}
      >
        <motion.div
          className="flex w-max gap-3"
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {track.map((tile, i) => (
            <SkillTile key={`${tile.key}-${i}`} visual={tile.visual} label={tile.label} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
