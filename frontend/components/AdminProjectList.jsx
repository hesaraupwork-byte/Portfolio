'use client';

import { projectsAPI } from '@/lib/api';

export default function AdminProjectList({ projects, adminKey, onEdit, onChanged }) {
  const handleDelete = async (project) => {
    if (!confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    await projectsAPI.remove(project._id, adminKey);
    onChanged();
  };

  if (projects.length === 0) {
    return <p className="text-sm opacity-60">No projects yet. Add your first one above.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {projects.map((project) => (
        <li
          key={project._id}
          className="flex items-center gap-4 rounded-xl border border-black/[.08] p-3 dark:border-white/[.145]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.imageUrl}
            alt={project.title}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="font-medium">{project.title}</p>
            <p className="text-xs opacity-60">{project.category}</p>
          </div>
          <button
            type="button"
            onClick={() => onEdit(project)}
            className="rounded-full border border-black/[.08] px-4 py-1.5 text-sm dark:border-white/[.145]"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => handleDelete(project)}
            className="rounded-full border border-red-500/30 px-4 py-1.5 text-sm text-red-500"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
