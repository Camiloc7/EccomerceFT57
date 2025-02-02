"use client";

import { Button } from "@/components/ui/button";
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
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = ""; 
    }

    return () => {
      document.body.style.overflow = ""; 
    };
  }, [isOpen]);

  if (!isOpen) return null; 

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} 
    >
      <div
        className="bg-white rounded-lg shadow-md p-6 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()} 
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
