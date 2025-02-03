import React, { useState, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modals/Modal"; 
import RegisterForm from "@/components/forms/RegisterForm"; 
interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}
export default function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(formData.email, formData.password, () => {
        onSuccess ? onSuccess() : router.push("/dashboard");
      });
    } catch (err: unknown) {
      setLoading(false);
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 400) {
            if (err.response.data.message === "Invalid password") {
              setError("La contraseña es incorrecta. Intenta nuevamente.");
            } else if (err.response.data.message === "User does not exist") {
              setError("El usuario no existe. Verifica tu correo electrónico.");
            } else {
              setError("Hubo un problema con los datos de la solicitud.");
            }
          } else {
            const errorMessages: Record<number, string> = {
              401: "Correo electrónico o contraseña incorrectos.",
              404: "El usuario no existe.",
              500: "Error en el servidor. Intenta nuevamente más tarde.",
            };
            setError(errorMessages[err.response.status] || "Error al iniciar sesión. Intenta nuevamente.");
          }
        } else {
          setError("Hubo un problema con la solicitud. Intenta nuevamente.");
        }
      } else {
        console.error("Error desconocido:", err); 
        setError("Hubo un problema al conectar con el servidor. Intenta nuevamente.");
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
      <h2 className="text-2xl font-semibold text-center mb-6">Iniciar Sesión</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
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
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña</label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
        </button>
      </div>
      {formData.password && !/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(formData.password) && (
        <div className="text-red-600 text-sm mt-2">
          La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.
        </div>
      )}
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-indigo-500"
        disabled={loading}
      >
        {loading ? "Iniciando..." : "Iniciar Sesión"}
      </button>
      <div className="text-center mt-4">
        <p>
          ¿No tienes una cuenta?{" "}
          <Button
            variant="ghost"
            size="sm"    
            onClick={() => setIsRegisterModalOpen(true)}
            className="text-indigo-600 hover:text-indigo-700 underline"
          >
            Regístrate aquí
          </Button>
        </p>
      </div>
      <Modal isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
        <RegisterForm onSuccess={() => setIsRegisterModalOpen(false)} />
      </Modal>
    </form>
  );
}
