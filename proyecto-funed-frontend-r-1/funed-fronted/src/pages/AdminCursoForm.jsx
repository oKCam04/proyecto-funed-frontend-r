import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/Button'

function AdminCursoForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = Boolean(id)
  
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    descripcionCompleta: '',
    categoria: '',
    tipo: 'Presencial',
    duracion: '',
    nivel: 'Principiante',
    precio: '',
    instructor: '',
    estado: 'activo',
    horarios: [''],
    temario: [''],
    requisitos: [''],
    certificacion: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loadingCurso, setLoadingCurso] = useState(isEditing)

  useEffect(() => {
    if (isEditing) {
      loadCurso()
    }
  }, [id, isEditing])

  const loadCurso = async () => {
    setLoadingCurso(true)
    try {
      const savedCursos = localStorage.getItem('adminCursos')
      if (savedCursos) {
        const cursos = JSON.parse(savedCursos)
        const curso = cursos.find(c => c.id === parseInt(id))
        if (curso) {
          setFormData({
            titulo: curso.titulo || '',
            descripcion: curso.descripcion || '',
            descripcionCompleta: curso.descripcionCompleta || '',
            categoria: curso.categoria || '',
            tipo: curso.tipo || 'Presencial',
            duracion: curso.duracion || '',
            nivel: curso.nivel || 'Principiante',
            precio: curso.precio?.toString() || '',
            instructor: curso.instructor || '',
            estado: curso.estado || 'activo',
            horarios: curso.horarios || [''],
            temario: curso.temario || [''],
            requisitos: curso.requisitos || [''],
            certificacion: curso.certificacion || ''
          })
        }
      }
    } catch (error) {
      console.error('Error loading curso:', error)
    } finally {
      setLoadingCurso(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleArrayChange = (index, value, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }))
  }

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }))
  }

  const removeArrayItem = (index, field) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es requerido'
    }

    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'La descripción es requerida'
    }

    if (!formData.categoria) {
      newErrors.categoria = 'La categoría es requerida'
    }

    if (!formData.duracion.trim()) {
      newErrors.duracion = 'La duración es requerida'
    }

    if (!formData.precio || isNaN(parseFloat(formData.precio))) {
      newErrors.precio = 'El precio debe ser un número válido'
    }

    if (!formData.instructor.trim()) {
      newErrors.instructor = 'El instructor es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      const savedCursos = localStorage.getItem('adminCursos')
      let cursos = savedCursos ? JSON.parse(savedCursos) : []

      const cursoData = {
        ...formData,
        precio: parseFloat(formData.precio),
        horarios: formData.horarios.filter(h => h.trim()),
        temario: formData.temario.filter(t => t.trim()),
        requisitos: formData.requisitos.filter(r => r.trim()),
        fechaCreacion: isEditing ? cursos.find(c => c.id === parseInt(id))?.fechaCreacion : new Date().toISOString().split('T')[0],
        inscripciones: isEditing ? cursos.find(c => c.id === parseInt(id))?.inscripciones || 0 : 0
      }

      if (isEditing) {
        cursos = cursos.map(c => c.id === parseInt(id) ? { ...cursoData, id: parseInt(id) } : c)
      } else {
        const newId = Math.max(...cursos.map(c => c.id), 0) + 1
        cursos.push({ ...cursoData, id: newId })
      }

      localStorage.setItem('adminCursos', JSON.stringify(cursos))
      
      navigate('/admin/cursos', {
        state: { 
          message: isEditing ? 'Curso actualizado exitosamente' : 'Curso creado exitosamente' 
        }
      })

    } catch (error) {
      setErrors({ general: 'Error al guardar el curso. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  if (loadingCurso) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando curso...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}
            </h1>
            <p className="text-gray-600">
              {isEditing ? 'Modifica los datos del curso' : 'Completa la información del nuevo curso'}
            </p>
          </div>
          <Button 
            onClick={() => navigate('/admin/cursos')}
            variant="secondary"
          >
            ← Volver a Cursos
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {errors.general}
              </div>
            )}

            {/* Información Básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título del Curso *
                </label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.titulo ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: Maquillaje Profesional"
                />
                {errors.titulo && (
                  <p className="mt-1 text-sm text-red-600">{errors.titulo}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Categoría *
                </label>
                <select
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.categoria ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="maquillaje">Maquillaje</option>
                  <option value="estetica">Estética</option>
                  <option value="peluqueria">Peluquería</option>
                  <option value="manicura">Manicura</option>
                </select>
                {errors.categoria && (
                  <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Corta *
              </label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.descripcion ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Descripción breve del curso para la lista de cursos"
              />
              {errors.descripcion && (
                <p className="mt-1 text-sm text-red-600">{errors.descripcion}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descripción Completa
              </label>
              <textarea
                name="descripcionCompleta"
                value={formData.descripcionCompleta}
                onChange={handleChange}
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción detallada del curso para la página de detalles"
              />
            </div>

            {/* Detalles del Curso */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Curso
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duración *
                </label>
                <input
                  type="text"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.duracion ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: 6 semanas"
                />
                {errors.duracion && (
                  <p className="mt-1 text-sm text-red-600">{errors.duracion}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel
                </label>
                <select
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                  <option value="Avanzado">Avanzado</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Precio (USD) *
                </label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.precio ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="299.99"
                />
                {errors.precio && (
                  <p className="mt-1 text-sm text-red-600">{errors.precio}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instructor *
                </label>
                <input
                  type="text"
                  name="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.instructor ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Nombre del instructor"
                />
                {errors.instructor && (
                  <p className="mt-1 text-sm text-red-600">{errors.instructor}</p>
                )}
              </div>
            </div>

            {/* Horarios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Horarios Disponibles
              </label>
              {formData.horarios.map((horario, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={horario}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'horarios')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Lunes y Miércoles 9:00-12:00"
                  />
                  {formData.horarios.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeArrayItem(index, 'horarios')}
                      variant="secondary"
                      className="px-3 py-2"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addArrayItem('horarios')}
                variant="secondary"
                className="mt-2"
              >
                + Agregar Horario
              </Button>
            </div>

            {/* Temario */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temario del Curso
              </label>
              {formData.temario.map((tema, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tema}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'temario')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Introducción al maquillaje profesional"
                  />
                  {formData.temario.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeArrayItem(index, 'temario')}
                      variant="secondary"
                      className="px-3 py-2"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addArrayItem('temario')}
                variant="secondary"
                className="mt-2"
              >
                + Agregar Tema
              </Button>
            </div>

            {/* Requisitos */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requisitos
              </label>
              {formData.requisitos.map((requisito, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={requisito}
                    onChange={(e) => handleArrayChange(index, e.target.value, 'requisitos')}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Ninguno"
                  />
                  {formData.requisitos.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeArrayItem(index, 'requisitos')}
                      variant="secondary"
                      className="px-3 py-2"
                    >
                      ✕
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                onClick={() => addArrayItem('requisitos')}
                variant="secondary"
                className="mt-2"
              >
                + Agregar Requisito
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Certificación
              </label>
              <input
                type="text"
                name="certificacion"
                value={formData.certificacion}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Certificado de Maquillaje Profesional FUNED"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estado del Curso
              </label>
              <select
                name="estado"
                value={formData.estado}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6 border-t">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading 
                  ? (isEditing ? 'Actualizando...' : 'Creando...') 
                  : (isEditing ? 'Actualizar Curso' : 'Crear Curso')
                }
              </Button>
              <Button
                type="button"
                onClick={() => navigate('/admin/cursos')}
                variant="secondary"
                className="flex-1"
              >
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminCursoForm
