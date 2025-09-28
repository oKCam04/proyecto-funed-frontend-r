import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/Button';
import ofertaCursoService from '../api/services/ofertaCursoService';

const formatCOP = (v) =>
  typeof v === 'number'
    ? v.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
      })
    : 'Consultar';

function ProcesoPagoPage() {
  const { id } = useParams();
  const [oferta, setOferta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [comprobante, setComprobante] = useState(null);
  const [referencia, setReferencia] = useState('');
  const [isUploaded, setIsUploaded] = useState(false);

  useEffect(() => {
    async function loadOferta() {
      try {
        const data = await ofertaCursoService.getById(id);
        setOferta(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    }
    loadOferta();
  }, [id]);

  const precioFormateado = useMemo(() => {
    if (!oferta?.precio) return 'Consultar';
    const numericPrice = parseFloat(oferta.precio);
    if (isNaN(numericPrice)) return 'Consultar';
    return formatCOP(numericPrice);
  }, [oferta]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setComprobante(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comprobante) {
      alert('Por favor, sube el comprobante de pago.');
      return;
    }
    console.log('Enviando pago:', { cursoId: id, referencia, comprobante: comprobante.name });
    // Aquí iría la lógica para subir el archivo y los datos a la API
    setIsUploaded(true);
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Cargando información de pago...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4 py-16 text-center text-red-600">Error: {error}</div>;
  }

  if (isUploaded) {
    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-lg shadow-xl">
                <h1 className="text-3xl font-bold text-green-600 mb-4">¡Gracias!</h1>
                <p className="text-gray-700 text-lg mb-6">
                    Hemos recibido tu comprobante para el curso <span className="font-semibold">{oferta?.curso?.nombre_curso}</span>. 
                    Tu pago será verificado en las próximas 24 horas y recibirás un correo de confirmación con los detalles de acceso.
                </p>
                <Link to="/cursos">
                    <Button variant="primary">Explorar más cursos</Button>
                </Link>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto mb-4">
            <Link to={`/curso/${id}`}>
                <Button variant="secondary">‹ Volver al curso</Button>
            </Link>
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:flex">
          {/* Columna Izquierda: Instrucciones y QR */}
          <div className="md:w-1/2 p-8 bg-gray-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Completa tu Inscripción</h2>
            
            <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-700">Resumen del Curso</h3>
                <p className="text-gray-600">{oferta?.curso?.nombre_curso}</p>
                <p className="text-2xl font-bold text-blue-600 mt-2">{precioFormateado}</p>
            </div>

            <div className="mb-6">
                <h3 className="font-semibold text-lg text-gray-700">Instrucciones de Pago</h3>
                <ol className="list-decimal list-inside text-gray-600 space-y-2 mt-2">
                    <li>Escanea el código QR con tu aplicación bancaria.</li>
                    <li>Realiza una transferencia por el valor exacto de <strong>{precioFormateado}</strong>.</li>
                    <li>Asegúrate de que la transferencia sea a nombre de "Academia Funed".</li>
                    <li>Guarda el comprobante de pago.</li>
                    <li>Sube el comprobante en el formulario de la derecha.</li>
                </ol>
            </div>

            <div className="text-center">
                <img src="https://via.placeholder.com/300/FFFFFF/000000?text=QR+de+Pago" alt="Código QR para pago" className="mx-auto rounded-md shadow-md"/>
            </div>
             <div className="mt-6 text-sm text-gray-500">
                <h4 className="font-semibold">¿Problemas con el pago?</h4>
                <p>Contáctanos por WhatsApp al +57 300 123 4567 o al correo <a href="mailto:pagos@funed.com" className="text-blue-600 hover:underline">pagos@funed.com</a>.</p>
            </div>
          </div>

          {/* Columna Derecha: Formulario de subida */}
          <div className="md:w-1/2 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Sube tu Comprobante</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="referencia" className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Referencia (Opcional)
                </label>
                <input 
                  type="text" 
                  id="referencia"
                  value={referencia}
                  onChange={(e) => setReferencia(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Ej: 0123456789"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="comprobante" className="block text-sm font-medium text-gray-700 mb-2">
                  Comprobante de Pago
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                        <span>Sube un archivo</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf"/>
                      </label>
                      <p className="pl-1">o arrástralo aquí</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF hasta 10MB
                    </p>
                  </div>
                </div>
                {comprobante && <p className="text-sm text-green-600 mt-2">Archivo seleccionado: {comprobante.name}</p>}
              </div>

              <div>
                <Button type="submit" variant="primary" className="w-full">
                  Confirmar y Enviar Pago
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcesoPagoPage;