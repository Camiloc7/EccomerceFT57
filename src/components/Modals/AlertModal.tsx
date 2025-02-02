"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}
export default function AlertModal({
  isOpen,
  message,
  onClose,
}: AlertModalProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); 
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);
  if (!isOpen) return null;
  return createPortal(
    <div
      className="fixed top-4 right-4 z-50 p-4 bg-blue-500 text-white rounded-lg shadow-md max-w-xs"
      onClick={onClose} 
    >
      <h3 className="text-sm font-medium text-center">{message}</h3>
    </div>,
    document.body
  );
}
