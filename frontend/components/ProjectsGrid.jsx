'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useProjects from '@/hooks/useProjects';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid() {
  const { projects, loading, error } = useProjects();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category).filter(Boolean));
    return ['All', ...set];
  }, [projects]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  return (
    <section id="projects" className="w-full min-w-0 py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="folded-panel relative min-w-0 overflow-hidden"
        style={{
          marginLeft: 'calc(50% - 50vw + 3px)',
          marginRight: 'calc(50% - 50vw + 3px)',
          width: 'calc(100vw - 6px)',
        }}
      >
        <div className="panel-notch top-0 right-0" />
        <div className="panel-notch bottom-0 left-0 rotate-180" />

        <div className="mx-auto max-w-6xl px-6 pt-8 pb-36 sm:px-12 sm:pt-10 sm:pb-40">
          <h2 className="font-extrabold tracking-tight text-black uppercase">
            <span className="block text-2xl sm:text-3xl">selected</span>
            <span className="block text-5xl sm:text-7xl">projects</span>
          </h2>

          {loading && <p className="mt-12 text-sm text-black/70">Loading projects…</p>}
          {error && <p className="mt-12 text-sm text-red-900">Could not load projects.</p>}

          {!loading && !error && projects.length === 0 && (
            <p className="mt-12 text-sm text-black/70">No projects added yet.</p>
          )}

          {!loading && !error && projects.length > 0 && (
            <>
              {categories.length > 2 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                        activeCategory === cat
                          ? 'border-black bg-black font-extrabold text-[var(--accent)]'
                          : 'border-black/25 text-black/70 hover:border-black hover:text-[var(--accent)] hover:bg-black'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              <motion.div
                layout
                className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((project) => (
                    <motion.div
                      key={project._id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard project={project} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
