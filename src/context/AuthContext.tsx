"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string, onSuccess: () => void) => Promise<void>;  // Aquí agregamos onSuccess
  logout: () => void;
}

// Crear el contexto
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {  
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  // Verificar si hay un token al cargar la aplicación
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('userName');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser({ name: savedUser, email: '' }); 
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (email: string, password: string, onSuccess: () => void) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        email,
        password,
      });
      const { token, user } = response.data;
  
      // Guardar en localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', user.name);
  
      setToken(token);
      setUser({ name: user.name, email: user.email });
      setIsLoggedIn(true);
  
      // Llamar al callback onSuccess cuando el login sea exitoso
      onSuccess(); 
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw new Error('Error al iniciar sesión');
    }
  };
  

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
