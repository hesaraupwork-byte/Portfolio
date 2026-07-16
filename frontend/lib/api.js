const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const projectsAPI = {
  getAll: async () => {
    const res = await fetch(`${API_URL}/api/projects`);
    return res.json();
  },

  getOne: async (id) => {
    const res = await fetch(`${API_URL}/api/projects/${id}`);
    return res.json();
  },

  create: async (formData, adminKey) => {
    const res = await fetch(`${API_URL}/api/projects`, {
      method: 'POST',
      headers: { 'x-admin-key': adminKey },
      body: formData
    });
    return res.json();
  },

  update: async (id, formData, adminKey) => {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'PUT',
      headers: { 'x-admin-key': adminKey },
      body: formData
    });
    return res.json();
  },

  remove: async (id, adminKey) => {
    const res = await fetch(`${API_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: { 'x-admin-key': adminKey }
    });
    return res.json();
  }
};

export const contactAPI = {
  send: async ({ name, email, message }) => {
    const res = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });
    return res.json();
  }
};

export const adminAPI = {
  verify: async (adminKey) => {
    const res = await fetch(`${API_URL}/api/admin/verify`, {
      method: 'POST',
      headers: { 'x-admin-key': adminKey }
    });
    return res;
  }
};
