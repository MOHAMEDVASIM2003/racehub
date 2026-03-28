const API_URL = process.env.REACT_APP_API_URL;

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('raceline_token');

  const headers = { 'Content-Type': 'application/json', ...options.headers };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

export const api = {
  // Auth
  signup: (body) => request('/auth/signup', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),

  // Events
  getEvents: () => request('/events'),
  getEvent: (id) => request(`/events/${id}`),
  registerEvent: (eventId, body) => request(`/events/${eventId}/register`, { method: 'POST', body: JSON.stringify(body) }),

  // Community
  getMembers: () => request('/community/members'),
  joinCommunity: (body) => request('/community/join', { method: 'POST', body: JSON.stringify(body) }),

  // Subscriptions
  getPlans: () => request('/subscriptions/plans'),
  subscribe: (body) => request('/subscriptions', { method: 'POST', body: JSON.stringify(body) }),

  // Newsletter
  subscribeNewsletter: (email) => request('/newsletter/subscribe', { method: 'POST', body: JSON.stringify({ email }) }),
};
