'use client';

import { useState } from 'react';
import { projectsAPI } from '@/lib/api';
import { CATEGORIES } from '@/lib/categories';

const emptyForm = {
  title: '',
  description: '',
  category: '',
  tags: '',
  projectUrl: '',
  order: 0,
};

export default function ProjectForm({ adminKey, editingProject, onDone, onCancel }) {
  const [form, setForm] = useState(
    editingProject
      ? {
          title: editingProject.title || '',
          description: editingProject.description || '',
          category: editingProject.category || '',
          tags: (editingProject.tags || []).join(', '),
          projectUrl: editingProject.projectUrl || '',
          order: editingProject.order || 0,
        }
      : emptyForm
  );
  const [file, setFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [videoFile, setVideoFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!editingProject && !file) {
      setError('Please choose an image');
      return;
    }

    setSaving(true);
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (file) formData.append('image', file);
      galleryFiles.forEach((f) => formData.append('gallery', f));
      if (videoFile) formData.append('video', videoFile);

      const result = editingProject
        ? await projectsAPI.update(editingProject._id, formData, adminKey)
        : await projectsAPI.create(formData, adminKey);

      if (result?._id) {
        onDone();
      } else {
        setError(result?.message || 'Failed to save project');
      }
    } catch {
      setError('Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]"
    >
      <h3 className="text-lg font-semibold">
        {editingProject ? 'Edit Project' : 'New Project'}
      </h3>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
        className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />
      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        required
        rows={4}
        className="resize-none rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        required
        className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      >
        <option value="" disabled>
          Select a category
        </option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        name="tags"
        placeholder="Tags, comma separated"
        value={form.tags}
        onChange={handleChange}
        className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />
      <input
        name="projectUrl"
        placeholder="Live/external URL (optional)"
        value={form.projectUrl}
        onChange={handleChange}
        className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />
      <input
        type="number"
        name="order"
        placeholder="Display order"
        value={form.order}
        onChange={handleChange}
        className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
      />

      <div>
        <label className="block text-sm font-medium mb-1">
          {editingProject ? 'Replace image (optional)' : 'Project image'}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Gallery images (up to 10, optional{editingProject ? ' — adds to existing' : ''})
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setGalleryFiles(Array.from(e.target.files || []).slice(0, 10))}
          className="text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          {editingProject && editingProject.videoUrl
            ? 'Replace video (optional)'
            : 'Project video (optional)'}
        </label>
        <input
          type="file"
          accept="video/*"
          onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
          className="text-sm"
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90 disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-black/[.08] px-5 py-2.5 text-sm font-medium dark:border-white/[.145]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
