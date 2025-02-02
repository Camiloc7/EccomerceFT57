import { CartProvider } from "../context/CartContext"; 
import { AuthProvider } from "../context/AuthContext"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
export const metadata = {
  title: "AppleCore",
  description: "AppleCore",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <CartProvider> 
            <Navbar />
            <main className="flex-grow p-4">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

