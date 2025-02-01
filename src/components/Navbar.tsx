"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "../context/AuthContext";
import LoginModal from "@/components/Modals/LoginModal"; // Importa el modal de login
import Modal from "@/components/Modals/Modal";
import RegisterForm from "@/components/forms/RegisterForm";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const [loadingUser, setLoadingUser] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // Nuevo estado para el modal de login

  useEffect(() => {
    if (isLoggedIn) {
      setLoadingUser(false);
    } else {
      setLoadingUser(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-4">
        {/* Menú Hamburguesa - Mobile */}
        <Sheet>
          <SheetTrigger asChild className="absolute left-4 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-sm font-medium">
                Inicio
              </Link>
              <Link href="/products" className="text-sm font-medium">
                Productos
              </Link>
              <Link href="/dashboard" className="text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo y Navegación Central */}
        <div className="flex-1 flex justify-center items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                fill="currentColor"
                d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
              />
            </svg>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-6">
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-primary">
              Productos
            </Link>
            <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
              Dashboard
            </Link>
          </div>
        </div>

        {/* Right Side Items */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Ver carrito</span>
            </Button>
          </Link>

          {loadingUser ? (
            <span className="text-sm text-gray-500">Cargando...</span>
          ) : !isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsRegisterModalOpen(true)}
              >
                Registrarse
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLoginModalOpen(true)} // Abre el modal de login
              >
                Iniciar Sesión
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Abrir menú de usuario</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white border rounded shadow-lg">
                <div className="px-4 py-2 text-sm text-gray-600">
                  Bienvenido, <strong>{user?.name}</strong>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Mi Perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">Mis Pedidos</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar Sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Modal de Login */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)} // Cerrar modal
      />

      {/* Modal para el formulario de registro */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)} // Cerrar modal
      >
        <RegisterForm onSuccess={() => setIsRegisterModalOpen(false)} />
      </Modal>
    </div>
  );
}
