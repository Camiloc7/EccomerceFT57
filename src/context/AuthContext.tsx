"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, onSuccess: () => void) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("userName");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser({ name: savedUser, email: "" });
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string, onSuccess: () => void) => {
    try {
      if (!process.env.NEXT_PUBLIC_API_URL) {
        throw new Error("La variable NEXT_PUBLIC_API_URL no está definida en el .env.local");
      }
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", user.name);

      setToken(token);
      setUser({ name: user.name, email: user.email });
      setIsLoggedIn(true);

      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error en la petición:", error.response?.data || error.message);
      } else {
        console.error("Error desconocido:", error);
      }
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
