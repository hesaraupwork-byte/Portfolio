'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const MotionLink = motion.create(Link);

export default function ProjectCard({ project }) {
  const badges = [project.category, ...(project.tags || [])].filter(Boolean);
  const videoRef = useRef(null);

  const handleHoverStart = () => {
    videoRef.current?.play().catch(() => {});
  };

  const handleHoverEnd = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <div className="flex flex-col gap-3">
      <MotionLink
        href={`/projects/${project._id}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.25 }}
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        className="group relative block aspect-[3/2] w-full text-left"
      >
        <div
          className="inverted-radius absolute inset-0 overflow-hidden"
          style={{ '--r': '20px', '--s': '56px', '--x': '30px', '--y': '10px' }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {project.videoUrl && (
            /* eslint-disable-next-line jsx-a11y/media-has-caption */
            <video
              ref={videoRef}
              src={project.videoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          )}

          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/5 to-transparent" />

          {badges.length > 0 && (
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 pr-3">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
          )}
        </div>
      </MotionLink>

      <h3 className="text-sm font-extrabold text-black">{project.title}</h3>
    </div>
  );
}
