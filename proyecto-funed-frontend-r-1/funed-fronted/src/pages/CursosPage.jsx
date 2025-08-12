import { useState } from 'react'
import Card from '../components/Card'

function CursosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const cursos = [
    {
      id: 1,
      titulo: "Maquillaje Profesional",
      descripcion: "Aprende técnicas avanzadas de maquillaje para eventos especiales y sesiones fotográficas",
      categoria: "maquillaje",
      duracion: "6 semanas",
      nivel: "Principiante",
      precio: "$299.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Maquillaje"
    },
    {
      id: 2,
      titulo: "Estética Facial Avanzada",
      descripcion: "Técnicas profesionales de limpieza facial, exfoliación y tratamientos anti-edad",
      categoria: "estetica",
      duracion: "8 semanas",
      nivel: "Intermedio",
      precio: "$399.99",
      imagen: "https://via.placeholder.com/300x200/20b2aa/FFFFFF?text=Estetica"
    },
    {
      id: 3,
      titulo: "Colorimetría y Tintes",
      descripcion: "Domina el arte de la colorimetría y aplicación de tintes profesionales",
      categoria: "peluqueria",
      duracion: "10 semanas",
      nivel: "Avanzado",
      precio: "$449.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Colorimetria"
    },
    {
      id: 4,
      titulo: "Corte y Peinado",
      descripcion: "Técnicas modernas de corte y peinado para diferentes tipos de cabello",
      categoria: "peluqueria",
      duracion: "12 semanas",
      nivel: "Intermedio",
      precio: "$379.99",
      imagen: "https://via.placeholder.com/300x200/20b2aa/FFFFFF?text=Peluqueria"
    },
    {
      id: 5,
      titulo: "Uñas Acrílicas y Gel",
      descripcion: "Aprende a crear uñas acrílicas y de gel con diseños únicos y duraderos",
      categoria: "manicura",
      duracion: "4 semanas",
      nivel: "Principiante",
      precio: "$199.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Manicura"
    },
    {
      id: 6,
      titulo: "Depilación Profesional",
      descripcion: "Técnicas de depilación con cera, hilo y láser para diferentes zonas corporales",
      categoria: "estetica",
      duracion: "6 semanas",
      nivel: "Intermedio",
      precio: "$249.99",
      imagen: "https://via.placeholder.com/300x200/20b2aa/FFFFFF?text=Depilacion"
    },
    {
      id: 7,
      titulo: "Maquillaje de Novias",
      descripcion: "Especialización en maquillaje para bodas y eventos de alta gama",
      categoria: "maquillaje",
      duracion: "4 semanas",
      nivel: "Avanzado",
      precio: "$349.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Novias"
    },
    {
      id: 8,
      titulo: "Tratamientos Corporales",
      descripcion: "Masajes terapéuticos, drenaje linfático y tratamientos reductores",
      categoria: "estetica",
      duracion: "8 semanas",
      nivel: "Intermedio",
      precio: "$329.99",
      imagen: "https://via.placeholder.com/300x200/20b2aa/FFFFFF?text=Corporales"
    },
    {
      id: 9,
      titulo: "Extensiones de Pestañas",
      descripcion: "Aplicación profesional de extensiones de pestañas y lifting",
      categoria: "maquillaje",
      duracion: "3 semanas",
      nivel: "Principiante",
      precio: "$179.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Pestanas"
    }
  ]

  const categorias = [
    { id: 'todos', nombre: 'Todos los cursos' },
    { id: 'maquillaje', nombre: 'Maquillaje' },
    { id: 'estetica', nombre: 'Estética' },
    { id: 'peluqueria', nombre: 'Peluquería' },
    { id: 'manicura', nombre: 'Manicura' }
  ]

  const filteredCursos = cursos.filter(curso => {
    const matchesSearch = curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'todos' || curso.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Nuestros Cursos de Belleza
        </h1>

        {/* Filtros */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar cursos
              </label>
              <input
                type="text"
                placeholder="Buscar por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoría
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCursos.map(curso => (
            <Card key={curso.id} className="hover:shadow-lg transition-shadow">
              <img 
                src={curso.imagen} 
                alt={curso.titulo}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {curso.titulo}
              </h3>
              <p className="text-gray-600 mb-4">
                {curso.descripcion}
              </p>
              <div className="flex justify-between items-center mb-4">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                  {curso.nivel}
                </span>
                <span className="text-gray-500 text-sm">
                  {curso.duracion}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  {curso.precio}
                </span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.location.href = `/curso/${curso.id}`}
                    className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                  >
                    Ver Detalles
                  </button>
                  <button className="bg-blue-800 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Inscribirse
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCursos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron cursos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CursosPage 