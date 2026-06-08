const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const details = await response.json().catch(() => ({}));
    throw new Error(details.message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getProfiles() {
  return request('/profiles');
}

export function recordSwipe(profileId, action) {
  return request('/swipes', {
    method: 'POST',
    body: JSON.stringify({ profile: profileId, action })
  });
}
