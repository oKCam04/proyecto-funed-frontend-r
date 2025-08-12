import { useParams, Link } from 'react-router-dom'
import Button from '../components/Button'

function CursoDetallePage() {
  const { id } = useParams()
  
  // En un caso real, estos datos vendrían de una API
  // Por ahora, usamos los mismos datos de CursosPage
  const cursos = [
    {
      id: 1,
      titulo: "Maquillaje Profesional",
      descripcion: "Aprende técnicas avanzadas de maquillaje para eventos especiales y sesiones fotográficas",
      categoria: "maquillaje",
      duracion: "6 semanas",
      nivel: "Principiante",
      precio: "$299.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Maquillaje",
      detalles: [
        "Técnicas de maquillaje para diferentes ocasiones",
        "Uso profesional de herramientas y productos",
        "Maquillaje para fotografía y video",
        "Prácticas supervisadas"
      ],
      instructor: "Ana Martínez",
      horarios: "Lunes y Miércoles de 18:00 a 20:00"
    },
    // Aquí irían los demás cursos con sus detalles
  ]
  
  const curso = cursos.find(c => c.id === parseInt(id))
  
  if (!curso) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Curso no encontrado</h2>
        <Link to="/cursos">
          <Button>Volver a cursos</Button>
        </Link>
      </div>
    )
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={curso.imagen} 
              alt={curso.titulo}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{curso.titulo}</h1>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                {curso.nivel}
              </span>
              <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                {curso.duracion}
              </span>
              <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm">
                {curso.categoria}
              </span>
            </div>
            
            <p className="text-gray-600 mb-6">{curso.descripcion}</p>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Contenido del curso:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {curso.detalles?.map((detalle, index) => (
                  <li key={index} className="text-gray-600">{detalle}</li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Información adicional:</h3>
              <p className="text-gray-600"><strong>Instructor:</strong> {curso.instructor}</p>
              <p className="text-gray-600"><strong>Horarios:</strong> {curso.horarios}</p>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-green-600">{curso.precio}</span>
              <Button>Inscribirse ahora</Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Link to="/cursos">
          <Button variant="outline">← Volver a cursos</Button>
        </Link>
      </div>
    </div>
  )
}

export default CursoDetallePage