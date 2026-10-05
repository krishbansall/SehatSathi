/**
 * SehatSathi API Service Layer
 * All HTTP calls to the backend go through here.
 * Base URL: http://localhost:5000/api
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Token helpers ────────────────────────────────────────────────────────────
export const getToken  = ()        => localStorage.getItem('ss_token');
export const setToken  = (token)   => localStorage.setItem('ss_token', token);
export const clearToken = ()       => localStorage.removeItem('ss_token');

// ─── Core fetch wrapper ───────────────────────────────────────────────────────
const request = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  };

  // Remove Content-Type for FormData (multipart uploads)
  if (options.body instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data; // { success, data, message }
};

// ─── Convenience methods ──────────────────────────────────────────────────────
const get    = (url, params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return request(`${url}${qs ? '?' + qs : ''}`);
};
const post   = (url, body)        => request(url, { method: 'POST',   body: JSON.stringify(body) });
const put    = (url, body)        => request(url, { method: 'PUT',    body: JSON.stringify(body) });
const patch  = (url, body)        => request(url, { method: 'PATCH',  body: JSON.stringify(body) });
const del    = (url)              => request(url, { method: 'DELETE' });
const upload = (url, formData)    => request(url, { method: 'POST',   body: formData });

// ═══════════════════════════════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════════════════════════════
export const authAPI = {
  register:       (data)  => post('/auth/register', data),
  login:          (data)  => post('/auth/login', data),
  getMe:          ()      => get('/auth/me'),
  updateMe:       (data)  => put('/auth/me', data),
  changePassword: (data)  => put('/auth/change-password', data),
};

// ═══════════════════════════════════════════════════════════════════
//  DOCTORS
// ═══════════════════════════════════════════════════════════════════
export const doctorAPI = {
  getAll:       (params) => get('/doctors', params),
  getById:      (id)     => get(`/doctors/${id}`),
  getSlots:     (id, date) => get(`/doctors/${id}/slots`, { date }),
  addReview:    (id, data) => post(`/doctors/${id}/reviews`, data),
  updateProfile:(data)   => put('/doctors/profile/me', data),
};

// ═══════════════════════════════════════════════════════════════════
//  APPOINTMENTS
// ═══════════════════════════════════════════════════════════════════
export const appointmentAPI = {
  book:         (data)         => post('/appointments', data),
  getAll:       (params)       => get('/appointments', params),
  getById:      (id)           => get(`/appointments/${id}`),
  updateStatus: (id, data)     => patch(`/appointments/${id}/status`, data),
};

// ═══════════════════════════════════════════════════════════════════
//  MEDICAL RECORDS
// ═══════════════════════════════════════════════════════════════════
export const recordAPI = {
  getAll:   (params)   => get('/records', params),
  getById:  (id)       => get(`/records/${id}`),
  create:   (formData) => upload('/records', formData),
  update:   (id, data) => put(`/records/${id}`, data),
  delete:   (id)       => del(`/records/${id}`),
};

// ═══════════════════════════════════════════════════════════════════
//  HOSPITALS
// ═══════════════════════════════════════════════════════════════════
export const hospitalAPI = {
  getAll:       (params) => get('/hospitals', params),
  getById:      (id)     => get(`/hospitals/${id}`),
  getOsmNearby: (lat, lon, radius = 5000) => get('/hospitals/osm-nearby', { lat, lon, radius }),
};

// ═══════════════════════════════════════════════════════════════════
//  AI RISK ASSESSMENT
// ═══════════════════════════════════════════════════════════════════
export const riskAPI = {
  assess:     (data) => post('/risk/assess', data),
  getHistory: ()     => get('/risk/history'),
  getById:    (id)   => get(`/risk/${id}`),
};
