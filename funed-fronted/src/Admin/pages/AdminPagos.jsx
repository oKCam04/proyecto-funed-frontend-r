import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

// Datos de ejemplo (mock data)
const mockPagos = [
  {
    id: 1,
    nombre: 'Ana Sofía Rodríguez',
    curso: 'Maquillaje Profesional',
    fecha: '2024-09-26',
    imagenUrl: 'https://via.placeholder.com/300x400.png?text=Comprobante+1',
    estado: 'pendiente',
  },
  {
    id: 2,
    nombre: 'Carlos Alberto Gómez',
    curso: 'Estética Facial',
    fecha: '2024-09-25',
    imagenUrl: 'https://via.placeholder.com/300x400.png?text=Comprobante+2',
    estado: 'pendiente',
  },
  {
    id: 3,
    nombre: 'Valentina Torres',
    curso: 'Colorimetría y Tintes',
    fecha: '2024-09-25',
    imagenUrl: 'https://via.placeholder.com/300x400.png?text=Comprobante+3',
    estado: 'aceptado',
  },
    {
    id: 4,
    nombre: 'Juan David Pérez',
    curso: 'Corte y Peinado',
    fecha: '2024-09-24',
    imagenUrl: 'https://via.placeholder.com/300x400.png?text=Comprobante+4',
    estado: 'rechazado',
  },
];

function AdminPagos() {
  const [pagos, setPagos] = useState(mockPagos);
  const [selectedPago, setSelectedPago] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAction = (id, newStatus) => {
    setPagos(pagos.map(p => p.id === id ? { ...p, estado: newStatus } : p));
    console.log(`Pago ${id} marcado como ${newStatus}`);
  };

  const openModal = (pago) => {
    setSelectedPago(pago);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPago(null);
  };
  
  const getStatusBadge = (estado) => {
    switch (estado) {
      case 'aceptado':
        return 'bg-green-100 text-green-800';
      case 'rechazado':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Pagos
            </h1>
            <p className="text-gray-600">
              Revisa, aprueba o rechaza los comprobantes de pago de los estudiantes.
            </p>
          </div>
          <div>
            <Link to="/admin">
                <Button variant="secondary">‹ Volver al Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Pagos Pendientes y Recientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {pagos.map((pago) => (
              <div key={pago.id} className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-semibold text-gray-800">{pago.nombre}</h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusBadge(pago.estado)}`}>
                      {pago.estado}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{pago.curso}</p>
                </div>
                
                <div className="aspect-w-3 aspect-h-4">
                    <img 
                        src={pago.imagenUrl} 
                        alt={`Comprobante de ${pago.nombre}`} 
                        className="object-cover w-full h-full cursor-pointer"
                        onClick={() => openModal(pago)}
                    />
                </div>

                <div className="p-4 mt-auto bg-gray-50">
                  <div className="flex justify-around gap-2">
                    {pago.estado === 'pendiente' && (
                      <>
                        <Button variant="success" size="sm" onClick={() => handleAction(pago.id, 'aceptado')}>
                          Aceptar
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleAction(pago.id, 'rechazado')}>
                          Rechazar
                        </Button>
                      </>
                    )}
                     <Button variant="secondary" size="sm" onClick={() => openModal(pago)}>
                        Detalles
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedPago && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-2xl font-bold mb-4">Detalles del Pago</h2>
            <img 
                src={selectedPago.imagenUrl} 
                alt={`Comprobante de ${selectedPago.nombre}`} 
                className="w-full rounded-lg mb-4"
            />
            <p><strong>Estudiante:</strong> {selectedPago.nombre}</p>
            <p><strong>Curso:</strong> {selectedPago.curso}</p>
            <p><strong>Fecha:</strong> {selectedPago.fecha}</p>
            <p><strong>Estado:</strong> <span className={`font-semibold ${selectedPago.estado === 'aceptado' ? 'text-green-600' : selectedPago.estado === 'rechazado' ? 'text-red-600' : 'text-yellow-600'}`}>{selectedPago.estado}</span></p>
            <div className="mt-6 flex justify-end gap-3">
                <Button variant="secondary" onClick={closeModal}>Cerrar</Button>
                {selectedPago.estado === 'pendiente' && (
                    <>
                        <Button variant="success" onClick={() => { handleAction(selectedPago.id, 'aceptado'); closeModal(); }}>Aceptar Pago</Button>
                        <Button variant="danger" onClick={() => { handleAction(selectedPago.id, 'rechazado'); closeModal(); }}>Rechazar Pago</Button>
                    </>
                )}
            </div>
        </Modal>
      )}
    </div>
  );
}

export default AdminPagos;
