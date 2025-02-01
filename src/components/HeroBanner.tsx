export default function HeroBanner() {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 px-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Bienvenido a AppleCore</h1>
      <p className="text-lg md:text-xl mb-6">
        Descubre los mejores productos a precios increíbles. ¡Compra ahora y vive la experiencia!
      </p>
      <button className="bg-white text-indigo-600 py-2 px-6 rounded-md font-semibold hover:bg-gray-200">
        Ver productos destacados
      </button>
    </div>
  );
}
