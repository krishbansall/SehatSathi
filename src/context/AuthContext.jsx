import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authAPI, setToken, clearToken, getToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true); // true while restoring session

  // ── Restore session from token on app load ─────────────────────────────────
  useEffect(() => {
    const restore = async () => {
      const token = getToken();
      if (!token) { setLoading(false); return; }
      try {
        const res = await authAPI.getMe();
        setUser(normalizeUser(res.data));
      } catch {
        clearToken();
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  // ── Normalize backend user → frontend shape ────────────────────────────────
  const normalizeUser = (u) => ({
    id:             u._id,
    name:           u.fullName,
    email:          u.email,
    role:           u.role,
    phone:          u.phone,
    photo:          u.photo || defaultPhoto(u.role),
    patientProfile: u.patientProfile,
    doctorProfileId:u.doctorProfileId,
    // doctor shorthand
    specialization: u.doctorProfileId?.specialization || '',
    hospital:       u.doctorProfileId?.hospital       || '',
    doctorId:       u.doctorProfileId?._id            || '',
  });

  const defaultPhoto = (role) =>
    role === 'doctor'
      ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const res = await authAPI.login({ email, password });
    setToken(res.data.token);
    setUser(normalizeUser(res.data.user));
    return res.data.user.role; // returns role so page can redirect
  }, []);

  // ── Register ───────────────────────────────────────────────────────────────
  const register = useCallback(async (formData) => {
    const payload = {
      fullName:     formData.fullName,
      email:        formData.email,
      password:     formData.password,
      phone:        formData.phone,
      role:         formData.role || 'patient',
      patientProfile: formData.role !== 'doctor' ? {
        age:    formData.age    || undefined,
        gender: formData.gender || undefined,
      } : undefined,
      doctorFields: formData.role === 'doctor' ? {
        specialization: formData.specialization,
        licenseNo:      formData.licenseNo,
        experience:     Number(formData.experience) || 0,
        fee:            500,
        hospital:       formData.hospital || '',
      } : undefined,
    };
    const res = await authAPI.register(payload);
    setToken(res.data.token);
    setUser(normalizeUser(res.data.user));
    return res.data.user.role;
  }, []);

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  // ── Demo role switcher (keeps mock-like UX for demo purposes) ──────────────
  const switchRole = useCallback((newRole) => {
    if (!user) return;
    setUser(prev => ({ ...prev, role: newRole }));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
