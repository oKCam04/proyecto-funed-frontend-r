import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Estado global de sesión
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [persona, setPersona] = useState(() => {
    try {
      const raw = localStorage.getItem("persona");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // Persistencia + header Authorization
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    if (persona) localStorage.setItem("persona", JSON.stringify(persona));
    else localStorage.removeItem("persona");
  }, [persona]);

  // API pública del contexto
  const login = ({ token, persona }) => {
    setToken(token);
    setPersona(persona);
  };

  const logout = () => {
    setToken(null);
    setPersona(null);
  };

  const hasRole = (roles) => {
    const role = (persona?.rol || "").normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
    const list = Array.isArray(roles) ? roles : [roles];
    return list
      .map(r => r.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim())
      .includes(role);
  };

  const value = useMemo(() => ({
    token, persona, isAuthenticated: !!token,
    login, logout, hasRole
  }), [token, persona]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
