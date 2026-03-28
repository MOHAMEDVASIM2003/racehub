import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from './api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('raceline_token');
    if (token) {
      api.getMe()
        .then((data) => setUser(data.user))
        .catch(() => {
          localStorage.removeItem('raceline_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await api.login({ email, password });
    localStorage.setItem('raceline_token', data.token);
    setUser(data.user);
    return data;
  };

  const signup = async (name, email, password) => {
    const data = await api.signup({ name, email, password });
    localStorage.setItem('raceline_token', data.token);
    setUser(data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('raceline_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
