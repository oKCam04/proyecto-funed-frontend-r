import { useState, useEffect } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'

function AdminCursosPage() {
  // Estados para gestionar los cursos y el formulario
  const [cursos, setCursos] = useState([
    {
      id: 1,
      titulo: "Maquillaje Profesional",
      descripcion: "Aprende técnicas avanzadas de maquillaje para eventos especiales y sesiones fotográficas",
      categoria: "maquillaje",
      duracion: "6 semanas",
      nivel: "Principiante",
      precio: "299.99",
      imagen: "https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Maquillaje"
    },
    // Otros cursos iniciales...
  ])
  
  const [formData, setFormData] = useState({
    id: null,
    titulo: '',
    descripcion: '',
    categoria: 'maquillaje',
    duracion: '',
    nivel: 'Principiante',
    precio: '',
    imagen: 'https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Nuevo'
  })
  
  const [editMode, setEditMode] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const categorias = [
    { id: 'todos', nombre: 'Todos los cursos' },
    { id: 'maquillaje', nombre: 'Maquillaje' },
    { id: 'estetica', nombre: 'Estética' },
    { id: 'peluqueria', nombre: 'Peluquería' },
    { id: 'manicura', nombre: 'Manicura' }
  ]

  const niveles = ['Principiante', 'Intermedio', 'Avanzado']

  // Filtrar cursos según búsqueda y categoría
  const filteredCursos = cursos.filter(curso => {
    const matchesSearch = curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         curso.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'todos' || curso.categoria === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Limpiar el formulario
  const resetForm = () => {
    setFormData({
      id: null,
      titulo: '',
      descripcion: '',
      categoria: 'maquillaje',
      duracion: '',
      nivel: 'Principiante',
      precio: '',
      imagen: 'https://via.placeholder.com/300x200/1e40af/FFFFFF?text=Nuevo'
    })
    setEditMode(false)
  }

  // Manejar envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validación básica
    if (!formData.titulo || !formData.descripcion || !formData.duracion || !formData.precio) {
      setError('Por favor, completa todos los campos obligatorios')
      return
    }

    if (editMode) {
      // Actualizar curso existente
      setCursos(cursos.map(curso => 
        curso.id === formData.id ? formData : curso
      ))
      setSuccess(`El curso "${formData.titulo}" ha sido actualizado correctamente`)
    } else {
      // Crear nuevo curso
      const newCurso = {
        ...formData,
        id: Date.now() // Generar ID único basado en timestamp
      }
      setCursos([...cursos, newCurso])
      setSuccess(`El curso "${formData.titulo}" ha sido creado correctamente`)
    }

    // Limpiar formulario después de enviar
    resetForm()
  }

  // Editar curso
  const handleEdit = (id) => {
    const cursoToEdit = cursos.find(curso => curso.id === id)
    if (cursoToEdit) {
      setFormData(cursoToEdit)
      setEditMode(true)
      // Desplazar hacia el formulario
      document.getElementById('curso-form').scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Eliminar curso
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este curso? Esta acción no se puede deshacer.')) {
      const cursoToDelete = cursos.find(curso => curso.id === id)
      setCursos(cursos.filter(curso => curso.id !== id))
      setSuccess(`El curso "${cursoToDelete.titulo}" ha sido eliminado correctamente`)
      
      // Si estamos editando el curso que se eliminó, resetear el formulario
      if (formData.id === id) {
        resetForm()
      }
    }
  }

  // Duplicar curso (para ofrecer variantes)
  const handleDuplicate = (id) => {
    const cursoToDuplicate = cursos.find(curso => curso.id === id)
    if (cursoToDuplicate) {
      const duplicatedCurso = {
        ...cursoToDuplicate,
        id: Date.now(),
        titulo: `${cursoToDuplicate.titulo} (Copia)`
      }
      setCursos([...cursos, duplicatedCurso])
      setSuccess(`Se ha creado una copia del curso "${cursoToDuplicate.titulo}"`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Administración de Cursos
        </h1>

        {/* Mensajes de error y éxito */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-6" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {/* Formulario de creación/edición */}
        <Card className="mb-8" id="curso-form">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            {editMode ? 'Editar Curso' : 'Crear Nuevo Curso'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Título del curso"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría *</label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {categorias.filter(cat => cat.id !== 'todos').map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Descripción *</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Descripción detallada del curso"
                rows="3"
                required
              ></textarea>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duración *</label>
                <input
                  type="text"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ej: 6 semanas"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nivel *</label>
                <select
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {niveles.map(nivel => (
                    <option key={nivel} value={nivel}>
                      {nivel}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Precio *</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="precio"
                    value={formData.precio}
                    onChange={handleChange}
                    className="w-full pl-8 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="99.99"
                    step="0.01"
                    min="0"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">URL de Imagen</label>
              <input
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
            
            <div className="flex space-x-3">
              <Button type="submit" variant="primary">
                {editMode ? 'Actualizar Curso' : 'Crear Curso'}
              </Button>
              
              {editMode && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar Edición
                </Button>
              )}
            </div>
          </form>
        </Card>

        {/* Filtros */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Gestionar Cursos Existentes
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Filtrar por categoría
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
        </Card>

        {/* Lista de cursos */}
        <div className="space-y-4">
          {filteredCursos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No se encontraron cursos que coincidan con tu búsqueda.
              </p>
            </div>
          ) : (
            filteredCursos.map(curso => (
              <Card key={curso.id} className="hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 mb-4 md:mb-0 md:mr-6">
                    <img 
                      src={curso.imagen} 
                      alt={curso.titulo}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="md:w-3/4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {curso.titulo}
                    </h3>
                    
                    <p className="text-gray-600 mb-4">
                      {curso.descripcion}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                        {curso.nivel}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        {curso.duracion}
                      </span>
                      <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded text-sm">
                        {categorias.find(cat => cat.id === curso.categoria)?.nombre || curso.categoria}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                        ${curso.precio}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="primary" 
                        size="sm" 
                        onClick={() => handleEdit(curso.id)}
                      >
                        Editar
                      </Button>
                      
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDelete(curso.id)}
                      >
                        Eliminar
                      </Button>
                      
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => handleDuplicate(curso.id)}
                      >
                        Duplicar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminCursosPage