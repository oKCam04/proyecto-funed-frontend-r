import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

function AdminCursos() {
  const navigate = useNavigate()
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [cursoToDelete, setCursoToDelete] = useState(null)

  // Datos iniciales de cursos
  const cursosIniciales = [
    {
      id: 1,
      titulo: "Maquillaje Profesional",
      descripcion: "Aprende técnicas avanzadas de maquillaje para eventos especiales y sesiones fotográficas",
      categoria: "maquillaje",
      tipo: "Presencial",
      duracion: "6 semanas",
      nivel: "Principiante",
      precio: 299.99,
      estado: "activo",
      instructor: "María González",
      fechaCreacion: "2024-01-15",
      inscripciones: 25
    },
    {
      id: 2,
      titulo: "Estética Facial Avanzada",
      descripcion: "Técnicas profesionales de limpieza facial, exfoliación y tratamientos anti-edad",
      categoria: "estetica",
      tipo: "Presencial",
      duracion: "8 semanas",
      nivel: "Intermedio",
      precio: 399.99,
      estado: "activo",
      instructor: "Dr. Ana Martínez",
      fechaCreacion: "2024-01-20",
      inscripciones: 18
    },
    {
      id: 3,
      titulo: "Colorimetría y Tintes",
      descripcion: "Domina el arte de la colorimetría y aplicación de tintes profesionales",
      categoria: "peluqueria",
      tipo: "Presencial",
      duracion: "10 semanas",
      nivel: "Avanzado",
      precio: 449.99,
      estado: "activo",
      instructor: "Carlos Rodríguez",
      fechaCreacion: "2024-02-01",
      inscripciones: 12
    }
  ]

  useEffect(() => {
    // Simular carga de cursos desde API
    const loadCursos = async () => {
      setLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Cargar desde localStorage o usar datos iniciales
      const savedCursos = localStorage.getItem('adminCursos')
      if (savedCursos) {
        setCursos(JSON.parse(savedCursos))
      } else {
        setCursos(cursosIniciales)
        localStorage.setItem('adminCursos', JSON.stringify(cursosIniciales))
      }
      setLoading(false)
    }

    loadCursos()
  }, [])

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

  const handleDelete = (curso) => {
    setCursoToDelete(curso)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    const updatedCursos = cursos.filter(c => c.id !== cursoToDelete.id)
    setCursos(updatedCursos)
    localStorage.setItem('adminCursos', JSON.stringify(updatedCursos))
    setShowDeleteModal(false)
    setCursoToDelete(null)
  }

  const toggleEstado = (id) => {
    const updatedCursos = cursos.map(curso => 
      curso.id === id 
        ? { ...curso, estado: curso.estado === 'activo' ? 'inactivo' : 'activo' }
        : curso
    )
    setCursos(updatedCursos)
    localStorage.setItem('adminCursos', JSON.stringify(updatedCursos))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando cursos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Gestión de Cursos
            </h1>
            <p className="text-gray-600">
              Administra todos los cursos de la academia
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/admin">
              <Button variant="secondary">
                ← Volver al Dashboard
              </Button>
            </Link>
            <Link to="/admin/cursos/nuevo">
              <Button variant="primary">
                + Crear Nuevo Curso
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid md:grid-cols-3 gap-4">
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
            <div className="flex items-end">
              <div className="text-sm text-gray-600">
                <p>Total: {filteredCursos.length} cursos</p>
                <p>Activos: {filteredCursos.filter(c => c.estado === 'activo').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de Cursos */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duración
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Inscripciones
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCursos.map((curso) => (
                  <tr key={curso.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {curso.titulo}
                        </div>
                        <div className="text-sm text-gray-500">
                          {curso.instructor}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        {curso.categoria}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {curso.duracion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ${curso.precio}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleEstado(curso.id)}
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          curso.estado === 'activo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {curso.estado}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {curso.inscripciones}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Link
                          to={`/admin/cursos/editar/${curso.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Editar
                        </Link>
                        <button
                          onClick={() => handleDelete(curso)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredCursos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No se encontraron cursos que coincidan con tu búsqueda.
            </p>
            <Link to="/admin/cursos/nuevo">
              <Button variant="primary">
                Crear Primer Curso
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Modal de Confirmación de Eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar el curso "{cursoToDelete?.titulo}"? 
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-3">
              <Button 
                onClick={confirmDelete}
                variant="primary"
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </Button>
              <Button 
                onClick={() => setShowDeleteModal(false)}
                variant="secondary"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminCursos
