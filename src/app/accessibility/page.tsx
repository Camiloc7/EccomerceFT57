export default function Accesibilidad() {
    return (
        <main className="bg-gray-50 text-gray-800 py-16 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Compromiso de Accesibilidad - AppleCore
            </h1>
            <p className="text-lg md:text-xl mb-6">
                En AppleCore, nos esforzamos por garantizar que nuestros productos y servicios sean accesibles para todos.
            </p>
            <section className="bg-white text-gray-800 rounded-lg shadow-xl p-8 mt-8 max-w-3xl mx-auto">
                
                <h2 className="text-2xl font-semibold text-gray-700">1. Nuestro compromiso</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Nos comprometemos a proporcionar una experiencia inclusiva para todas las personas, independientemente de sus habilidades o discapacidades.
                </p>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">2. Medidas de accesibilidad</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Hemos implementado diversas medidas para garantizar la accesibilidad, incluyendo:
                </p>
                <ul className="list-disc text-left mx-auto mt-4 text-lg text-gray-600 max-w-2xl">
                    <li>Compatibilidad con lectores de pantalla.</li>
                    <li>Navegación con teclado.</li>
                    <li>Texto alternativo en imágenes.</li>
                    <li>Contrastes adecuados para mejorar la legibilidad.</li>
                    <li>Etiquetas claras y accesibles en formularios.</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">3. Mejoras continuas</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Estamos comprometidos con la mejora continua de nuestra accesibilidad. Probamos regularmente nuestra plataforma y realizamos ajustes 
                    para cumplir con las mejores prácticas y estándares, como las Pautas de Accesibilidad para el Contenido Web (WCAG).
                </p>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">4. Contacto y retroalimentación</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Si encuentras alguna barrera de accesibilidad en nuestro sitio o tienes sugerencias para mejorar, por favor contáctanos en 
                    <strong> soporte@applecore.com</strong>. Apreciamos tu ayuda para hacer AppleCore más accesible para todos.
                </p>

                
        
            </section>
        </main>
    );
}
