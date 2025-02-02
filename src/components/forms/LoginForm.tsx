import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onSuccess?: () => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Reseteamos el error en cada intento

    try {
      await login(formData.email, formData.password, () => {
        if (onSuccess) {
          onSuccess(); 
        } else {
          router.push("/dashboard"); 
        }
      });
    } catch (err: any) {
      setLoading(false); // Detenemos el estado de carga si ocurre un error

      if (err.response) {
        // Aquí revisamos el error específico de la respuesta del backend
        switch (err.response.status) {
          case 401:
            // Error de credenciales incorrectas
            setError("Correo electrónico o contraseña incorrectos.");
            break;
          case 404:
            // Si el usuario no existe
            setError("El usuario no existe.");
            break;
          case 400:
            // Si hay un error en la solicitud, como campos vacíos
            setError("Por favor, complete todos los campos.");
            break;
          default:
            setError("Error al iniciar sesión. Intenta nuevamente.");
            break;
        }
      } else {
        // Si el error no tiene una respuesta, significa que puede ser un error de conexión o algo inesperado
        setError("Hubo un problema al conectar con el servidor. Intenta nuevamente.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold text-center mb-6">Iniciar Sesión</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          {loading ? "Iniciando..." : "Iniciar Sesión"}
        </button>

        <div className="text-center mt-4">
          <p>
            ¿No tienes una cuenta?{" "}
            <a href="/register" className="text-indigo-600 hover:text-indigo-700">
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </form>
  );
}
