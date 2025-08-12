import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from '../components/Button'

function CourseDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Datos de cursos (en una app real, esto vendría de una API)
  const cursos = [
    {
      id: 1,
      titulo: "Maquillaje Profesional",
      descripcion: "Aprende técnicas avanzadas de maquillaje para eventos especiales y sesiones fotográficas",
      descripcionCompleta: "Este curso completo de maquillaje profesional te enseñará desde las técnicas básicas hasta las más avanzadas. Aprenderás sobre teoría del color, tipos de piel, productos profesionales, y técnicas específicas para diferentes ocasiones como bodas, sesiones fotográficas, y eventos especiales.",
      categoria: "maquillaje",
      tipo: "Presencial",
      duracion: "6 semanas",
      nivel: "Principiante",
      precio: "$299.99",
      imagen: "https://via.placeholder.com/600x400/1e40af/FFFFFF?text=Maquillaje",
      instructor: "María González",
      horarios: ["Lunes y Miércoles 9:00-12:00", "Martes y Jueves 14:00-17:00"],
      temario: [
        "Introducción al maquillaje profesional",
        "Teoría del color y tipos de piel",
        "Productos y herramientas profesionales",
        "Técnicas de base y corrección",
        "Maquillaje de ojos avanzado",
        "Maquillaje para diferentes ocasiones"
      ],
      requisitos: ["Ninguno", "Ganas de aprender"],
      certificacion: "Certificado de Maquillaje Profesional FUNED"
    },
    {
      id: 2,
      titulo: "Estética Facial Avanzada",
      descripcion: "Técnicas profesionales de limpieza facial, exfoliación y tratamientos anti-edad",
      descripcionCompleta: "Curso especializado en estética facial que abarca desde tratamientos básicos hasta técnicas avanzadas de rejuvenecimiento. Aprenderás sobre anatomía facial, tipos de piel, protocolos de tratamiento y uso de equipos profesionales.",
      categoria: "estetica",
      tipo: "Presencial",
      duracion: "8 semanas",
      nivel: "Intermedio",
      precio: "$399.99",
      imagen: "https://via.placeholder.com/600x400/20b2aa/FFFFFF?text=Estetica",
      instructor: "Dr. Ana Martínez",
      horarios: ["Lunes a Viernes 10:00-13:00"],
      temario: [
        "Anatomía y fisiología de la piel",
        "Diagnóstico de tipos de piel",
        "Técnicas de limpieza profunda",
        "Tratamientos anti-edad",
        "Uso de equipos profesionales",
        "Protocolos de seguridad e higiene"
      ],
      requisitos: ["Conocimientos básicos de estética", "Certificado de educación secundaria"],
      certificacion: "Certificado de Estética Facial Avanzada FUNED"
    },
    {
      id: 3,
      titulo: "Colorimetría y Tintes",
      descripcion: "Domina el arte de la colorimetría y aplicación de tintes profesionales",
      descripcionCompleta: "Curso avanzado de colorimetría que te permitirá dominar el arte del color en el cabello. Aprenderás teoría del color, técnicas de aplicación, corrección de color y tendencias actuales en coloración.",
      categoria: "peluqueria",
      tipo: "Presencial",
      duracion: "10 semanas",
      nivel: "Avanzado",
      precio: "$449.99",
      imagen: "https://via.placeholder.com/600x400/1e40af/FFFFFF?text=Colorimetria",
      instructor: "Carlos Rodríguez",
      horarios: ["Martes y Jueves 15:00-18:00"],
      temario: [
        "Teoría del color aplicada al cabello",
        "Tipos de tintes y su aplicación",
        "Técnicas de decoloración",
        "Corrección de color",
        "Mechas y reflejos",
        "Tendencias en coloración"
      ],
      requisitos: ["Experiencia previa en peluquería", "Curso básico de peluquería"],
      certificacion: "Certificado de Colorimetría Profesional FUNED"
    }
  ]

  const curso = cursos.find(c => c.id === parseInt(id))

  if (!curso) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Curso no encontrado</h1>
          <Button onClick={() => navigate('/cursos')} variant="primary">
            Volver a cursos
          </Button>
        </div>
      </div>
    )
  }

  const handleInscribirse = () => {
    setShowLoginModal(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-600">
            <li>
              <button 
                onClick={() => navigate('/')}
                className="hover:text-blue-600"
              >
                Inicio
              </button>
            </li>
            <li>/</li>
            <li>
              <button 
                onClick={() => navigate('/cursos')}
                className="hover:text-blue-600"
              >
                Cursos
              </button>
            </li>
            <li>/</li>
            <li className="text-gray-900 font-medium">{curso.titulo}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contenido principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={curso.imagen} 
                alt={curso.titulo}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {curso.categoria}
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {curso.tipo}
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                    {curso.nivel}
                  </span>
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {curso.titulo}
                </h1>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {curso.descripcionCompleta}
                </p>

                {/* Información del instructor */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Instructor</h3>
                  <p className="text-gray-700">{curso.instructor}</p>
                </div>

                {/* Temario */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Temario del Curso</h3>
                  <ul className="space-y-2">
                    {curso.temario.map((tema, index) => (
                      <li key={index} className="flex items-start">
                        <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="text-gray-700">{tema}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requisitos */}
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h3>
                  <ul className="space-y-2">
                    {curso.requisitos.map((requisito, index) => (
                      <li key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700">{requisito}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {curso.precio}
                </div>
                <p className="text-gray-600">Precio del curso</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duración:</span>
                  <span className="font-medium">{curso.duracion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Modalidad:</span>
                  <span className="font-medium">{curso.tipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nivel:</span>
                  <span className="font-medium">{curso.nivel}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Horarios disponibles:</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {curso.horarios.map((horario, index) => (
                    <li key={index}>{horario}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Certificación:</strong> {curso.certificacion}
                </p>
              </div>

              <Button 
                onClick={handleInscribirse}
                variant="primary"
                className="w-full mb-3"
              >
                Inscribirse Ahora
              </Button>
              
              <Button 
                onClick={() => navigate('/cursos')}
                variant="secondary"
                className="w-full"
              >
                Volver a Cursos
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Login */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Iniciar Sesión</h3>
            <p className="text-gray-600 mb-4">
              Para inscribirte en este curso, necesitas iniciar sesión o crear una cuenta.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={() => {
                  setShowLoginModal(false)
                  navigate('/login')
                }}
                variant="primary"
                className="flex-1"
              >
                Iniciar Sesión
              </Button>
              <Button 
                onClick={() => {
                  setShowLoginModal(false)
                  navigate('/registro')
                }}
                variant="secondary"
                className="flex-1"
              >
                Registrarse
              </Button>
            </div>
            <Button 
              onClick={() => setShowLoginModal(false)}
              variant="secondary"
              className="w-full mt-3"
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CourseDetailPage
