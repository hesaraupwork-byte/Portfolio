import Link from 'next/link';
import { notFound } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi2';
import { FILL_HOVER } from '@/lib/hoverFill';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

async function getProject(id) {
  const res = await fetch(`${API_URL}/api/projects/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

function ImageFrame({ src, alt }) {
  return (
    <div className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}

export default async function ProjectDetailPage({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <Link
        href="/#projects"
        aria-label="Back to portfolio"
        className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-lg ${FILL_HOVER}`}
      >
        <HiArrowLeft />
      </Link>

      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_340px]">
        <div className="flex flex-col gap-6">
          {project.videoUrl && (
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
              <video
                src={project.videoUrl}
                controls
                playsInline
                className="w-full rounded-xl"
              />
            </div>
          )}
          <ImageFrame src={project.imageUrl} alt={project.title} />
          {project.images?.map((img) => (
            <ImageFrame key={img.publicId} src={img.url} alt={project.title} />
          ))}
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:h-fit">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[var(--accent)]">
              {project.category}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              {project.title}
            </h1>
          </div>

          <p className="whitespace-pre-line text-sm leading-relaxed text-[var(--muted)]">
            {project.description}
          </p>

          {project.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium ${FILL_HOVER}`}
            >
              External Link ↗
            </a>
          )}
        </aside>
      </div>
    </div>
  );
}
