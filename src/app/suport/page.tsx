export default function Soporte() {
  return (
      <main className="bg-gray-50 text-gray-800 py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Soporte de AppleCore</h1>
          <p className="text-lg md:text-xl mb-6">
              ¿Tienes alguna pregunta o problema? ¡Estamos aquí para ayudarte!
          </p>
          <section className="bg-white text-gray-800 rounded-lg shadow-xl p-8 mt-8 max-w-3xl mx-auto">
              <h2 className="text-2xl font-semibold text-gray-700">Contáctanos</h2>
              <p className="mt-4 text-lg text-gray-600">
                  Si necesitas asistencia, por favor llena el formulario a continuación y nos pondremos en contacto contigo lo más pronto posible.
              </p>
              <form className="mt-6">
                  <div className="mb-4">
                      <label htmlFor="name" className="block text-left text-gray-700 font-semibold">Tu Nombre</label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                          placeholder="Ingresa tu nombre"
                          required
                      />
                  </div>
                  <div className="mb-4">
                      <label htmlFor="email" className="block text-left text-gray-700 font-semibold">Correo Electrónico</label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                          placeholder="Ingresa tu correo electrónico"
                          required
                      />
                  </div>
                  <div className="mb-4">
                      <label htmlFor="message" className="block text-left text-gray-700 font-semibold">Mensaje</label>
                      <textarea
                          id="message"
                          name="message"
                          className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
                          placeholder="Escribe tu mensaje"
                          required
                      ></textarea>
                  </div>
                  <button type="submit" className="bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 transition-all duration-300">
                      Enviar Mensaje
                  </button>
              </form>
              <h2 className="text-2xl font-semibold text-gray-700 mt-12">Preguntas Frecuentes</h2>
              <div className="mt-6">
                  <p className="text-lg text-gray-600 mb-4">
                      Aquí te dejamos algunas preguntas frecuentes que pueden ser útiles antes de contactar al soporte:
                  </p>
                  <div className="text-left space-y-4">
                      <div className="bg-gray-100 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700">¿Cómo puedo hacer un pedido?</h3>
                          <p className="text-gray-600">Para hacer un pedido, simplemente selecciona los productos que deseas comprar, agrégalos a tu carrito y sigue el proceso de pago.</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700">¿Cuáles son los métodos de pago disponibles?</h3>
                          <p className="text-gray-600">Aceptamos tarjetas de crédito y débito, además de otras opciones de pago que aparecerán en el proceso de compra.</p>
                      </div>
                      <div className="bg-gray-100 p-4 rounded-lg">
                          <h3 className="font-semibold text-gray-700">¿Puedo modificar mi pedido después de realizarlo?</h3>
                          <p className="text-gray-600">Una vez que el pedido ha sido procesado, no es posible modificarlo. Si necesitas realizar cambios, por favor contáctanos lo antes posible.</p>
                      </div>
                  </div>
              </div>
          </section>
      </main>
  );
}
