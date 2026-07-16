'use client';

import { useEffect, useState } from 'react';
import { adminAPI, projectsAPI } from '@/lib/api';
import ProjectForm from '@/components/ProjectForm';
import AdminProjectList from '@/components/AdminProjectList';

const STORAGE_KEY = 'portfolio_admin_key';

export default function AdminPage() {
  const [adminKey, setAdminKey] = useState('');
  const [keyInput, setKeyInput] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [authError, setAuthError] = useState('');

  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) setAdminKey(saved);
  }, []);

  const loadProjects = async () => {
    setLoadingProjects(true);
    const data = await projectsAPI.getAll();
    setProjects(Array.isArray(data) ? data : []);
    setLoadingProjects(false);
  };

  useEffect(() => {
    if (adminKey) loadProjects();
  }, [adminKey]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setAuthError('');
    try {
      const res = await adminAPI.verify(keyInput);
      if (res.ok) {
        sessionStorage.setItem(STORAGE_KEY, keyInput);
        setAdminKey(keyInput);
      } else {
        setAuthError('Invalid admin key');
      }
    } catch {
      setAuthError('Could not reach the server');
    } finally {
      setVerifying(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAdminKey('');
    setKeyInput('');
  };

  if (!adminKey) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <form
          onSubmit={handleVerify}
          className="flex w-full max-w-sm flex-col gap-4 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]"
        >
          <h1 className="text-lg font-semibold">Admin Access</h1>
          <input
            type="password"
            placeholder="Admin key"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            required
            className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm dark:border-white/[.145]"
          />
          {authError && <p className="text-sm text-red-500">{authError}</p>}
          <button
            type="submit"
            disabled={verifying}
            className="rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90 disabled:opacity-50"
          >
            {verifying ? 'Checking…' : 'Enter'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Manage Projects</h1>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-full border border-black/[.08] px-4 py-2 text-sm dark:border-white/[.145]"
        >
          Log out
        </button>
      </div>

      {!showForm && (
        <button
          type="button"
          onClick={() => {
            setEditingProject(null);
            setShowForm(true);
          }}
          className="mb-6 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:opacity-90"
        >
          + Add Project
        </button>
      )}

      {showForm && (
        <div className="mb-8">
          <ProjectForm
            adminKey={adminKey}
            editingProject={editingProject}
            onDone={() => {
              setShowForm(false);
              setEditingProject(null);
              loadProjects();
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingProject(null);
            }}
          />
        </div>
      )}

      {loadingProjects ? (
        <p className="text-sm opacity-60">Loading projects…</p>
      ) : (
        <AdminProjectList
          projects={projects}
          adminKey={adminKey}
          onEdit={(project) => {
            setEditingProject(project);
            setShowForm(true);
          }}
          onChanged={loadProjects}
        />
      )}
    </div>
  );
}
