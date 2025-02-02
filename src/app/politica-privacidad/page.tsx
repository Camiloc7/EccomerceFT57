export default function PoliticaDePrivacidad() {
    return (
        <main className="bg-gray-50 text-gray-800 py-16 px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Política de Privacidad de AppleCore</h1>
            <p className="text-lg md:text-xl mb-6">
                Tu privacidad es importante para nosotros. Aquí te explicamos cómo recopilamos y usamos tus datos.
            </p>

            <section className="bg-white text-gray-800 rounded-lg shadow-xl p-8 mt-8 max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700">1. Introducción</h2>
                <p className="mt-4 text-lg text-gray-600">
                    En AppleCore, nos comprometemos a proteger y respetar tu privacidad. Esta política describe cómo recopilamos, 
                    utilizamos y protegemos tu información personal.
                </p>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">2. Información que recopilamos</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Recopilamos información personal cuando realizas una compra, te registras en nuestro sitio, o interactúas de 
                    otra manera. Esto incluye:
                </p>
                <ul className="list-inside list-none space-y-2 mt-4 text-lg text-gray-600">
                    <li>• Nombre y apellido</li>
                    <li>• Correo electrónico</li>
                    <li>• Dirección de envío</li>
                    <li>• Información de pago (tarjetas de crédito o débito)</li>
                    <li>• Historial de compras</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">3. Cómo usamos tu información</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Usamos tu información para:
                </p>
                <ul className="list-inside list-none space-y-2 mt-4 text-lg text-gray-600">
                    <li>• Procesar y gestionar tus pedidos</li>
                    <li>• Proporcionar soporte al cliente</li>
                    <li>• Mejorar nuestros productos y servicios</li>
                    <li>• Enviarte promociones y actualizaciones</li>
                </ul>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">4. Seguridad de la información</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Implementamos medidas de seguridad razonables para proteger tu información personal, aunque ningún sistema 
                    es 100% seguro.
                </p>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">5. Cookies</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Utilizamos cookies para mejorar tu experiencia en nuestro sitio, personalizar contenido y analizar el tráfico.
                    Puedes desactivar las cookies desde la configuración de tu navegador.
                </p>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">6. Cambios a esta política</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Nos reservamos el derecho de modificar esta política. Cualquier cambio será publicado aquí con la fecha de 
                    actualización.
                </p>

                <h2 className="text-2xl font-semibold text-gray-700 mt-8">7. Contacto</h2>
                <p className="mt-4 text-lg text-gray-600">
                    Si tienes preguntas sobre esta política de privacidad, por favor contáctanos en <strong>soporte@applecore.com</strong>.
                </p>
            </section>
        </main>
    );
}
