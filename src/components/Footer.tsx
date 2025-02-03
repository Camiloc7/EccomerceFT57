"use client"; 
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
export default function Footer() {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center gap-6 mb-4">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <button className="hover:text-blue-600">
              <Facebook className="h-6 w-6" />
              <span className="sr-only">Facebook</span>
            </button>
          </Link>
          <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <button className="hover:text-pink-600">
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </button>
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <button className="hover:text-sky-500">
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </button>
          </Link>
          <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <button className="hover:text-red-600">
              <Youtube className="h-6 w-6" />
              <span className="sr-only">YouTube</span>
            </button>
          </Link>
        </div>
        <Separator className="my-4 border-gray-700" />
        <div className="text-center mb-4 md:hidden">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className="text-sm text-gray-400 hover:text-white"
          >
            {showInfo ? "Ocultar información" : "Más información"}
          </button>
        </div>
        <div
          className={`${showInfo ? "block" : "hidden"
            } md:block`} 
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Acerca de nosotros</h2>
              <p className="text-sm">
                Somos una tienda comprometida con brindar la mejor experiencia de compra en línea.
                Encuentra productos de calidad, soporte dedicado y envíos rápidos.
              </p>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Links útiles</h2>
              <ul className="space-y-2 text-sm">
                <div>
                  <Link href="/shop-guide" className="hover:underline">
                    Cómo comprar
                  </Link>
                </div>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Términos y condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Política de privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/suport" className="hover:underline">
                    Soporte
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-white mb-4">Contáctanos</h2>
              <ul className="space-y-2 text-sm">
                <li>
                  <span className="block">Teléfono: +57 300 123 4567</span>
                </li>
                <li>
                  <span className="block">Email: soporte@applecore.com</span>
                </li>
                <li>
                  <span className="block">Horario: Lun-Vie, 9am - 6pm</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator className="my-8 border-gray-700" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm">
            © {new Date().getFullYear()} AppleCore. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="/terms" className="hover:underline">
              Términos
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacidad
            </Link>
            <Link href="/accessibility" className="hover:underline">
              Accesibilidad
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
