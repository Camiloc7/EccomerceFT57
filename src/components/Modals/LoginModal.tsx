"use client";

import LoginForm from "@/components/forms/LoginForm";
import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Deshabilitar el scroll al abrir el modal
    } else {
      document.body.style.overflow = ""; // Habilitar el scroll al cerrar el modal
    }

    return () => {
      document.body.style.overflow = ""; // Limpiar en el desmontaje
    };
  }, [isOpen]);

  if (!isOpen) return null; // No renderizar si el modal no está abierto

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // Cerrar el modal cuando se hace clic fuera de él
    >
      <div
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} // Evitar que se cierre al hacer clic dentro del modal
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
          aria-label="Cerrar modal"
        >
          ×
        </button>

        <LoginForm onSuccess={onClose} />


      </div>
    </div>,
    document.body
  );
}
