import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modals/Modal";
import LoginForm from "@/components/forms/LoginForm";

interface RegisterFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function RegisterForm({ onSuccess, onClose }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    phone: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const passwordPattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  const phonePattern = /^[0-9]{1,12}$/;
  const addressPattern = /^(?!.*(asdfg)).+$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    if (/[^0-9]/.test(phoneValue)) {
      return;
    }
    setFormData({ ...formData, phone: phoneValue });
  };

  const openLoginModal = () => {
    if (onClose) {
      onClose();
      setTimeout(() => {
        setIsLoginModalOpen(true);
      }, 300);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    // Validaciones
    if (!passwordPattern.test(formData.password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
      setLoading(false);
      return;
    }
  
    if (!phonePattern.test(formData.phone)) {
      setError("El número de teléfono solo puede tener hasta 12 dígitos.");
      setLoading(false);
      return;
    }
  
    if (!addressPattern.test(formData.address)) {
      setError("La dirección es inválida.");
      setLoading(false);
      return;
    }
  
    try {
      // Enviar solicitud de registro
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/users/register`,
        formData
      );
      // Verificar si onSuccess existe y llamarla
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: unknown) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          setError("Este correo ya está registrado. ¿Quieres iniciar sesión?");
          openLoginModal();
        } else {
          setError("Hubo un error al registrar el usuario. Intenta nuevamente.");
        }
      } else {
        setError("Hubo un error desconocido.");
      }
    }
  };
  

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">Registro de Usuario</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección</label>
          <input
            type="text"
            name="address"
            id="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-indigo-500"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
      <div className="text-center mt-4">
        <p>
          ¿Ya tienes una cuenta?{" "}
          <Button
            variant="ghost"
            size="sm"
            onClick={openLoginModal}
            className="text-indigo-600 hover:text-indigo-700 underline"
          >
            Inicia sesión aquí
          </Button>
        </p>
      </div>
      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <LoginForm onSuccess={closeLoginModal} />
      </Modal>
    </div>
  );
}
