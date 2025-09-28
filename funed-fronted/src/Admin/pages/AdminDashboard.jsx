import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalCursos: 0,
    totalEstudiantes: 0,
    cursosActivos: 0,
    inscripcionesRecientes: 0
  })

  useEffect(() => {
    // Simular carga de estadísticas
    const loadStats = async () => {
      await new Promise(resolve => setTimeout(resolve, 500))
      setStats({
        totalCursos: 12,
        totalEstudiantes: 245,
        cursosActivos: 8,
        inscripcionesRecientes: 15
      })
    }
    loadStats()
  }, [])

  const quickActions = [
    {
      title: 'Gestionar Cursos',
      description: 'Crear, editar y eliminar cursos',
      link: '/admin/cursos',
      icon: '📚',
      color: 'bg-blue-500'
    },
    {
      title: 'Ver Estudiantes',
      description: 'Administrar usuarios registrados',
      link: '/admin/estudiantes',
      icon: '👥',
      color: 'bg-green-500'
    },
    {
      title: 'Inscripciones',
      description: 'Gestionar inscripciones a cursos',
      link: '/admin/inscripciones',
      icon: '📋',
      color: 'bg-purple-500'
    },
    {
      title: 'Reportes',
      description: 'Ver estadísticas y reportes',
      link: '/admin/reportes',
      icon: '📊',
      color: 'bg-orange-500'
    }
  ]

  const pagosRecientes = [
    { id: 1, curso: 'Maquillaje Profesional', time: 'Hace 10 min' },
    { id: 2, curso: 'Estética Facial', time: 'Hace 45 min' },
    { id: 3, curso: 'Colorimetría y Tintes', time: 'Hace 2 horas' },
    { id: 4, curso: 'Corte y Peinado', time: 'Ayer' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Bienvenido al sistema de gestión de Academia FUNED
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                📚
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Cursos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalCursos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                👥
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Estudiantes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEstudiantes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                ✅
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Cursos Activos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cursosActivos}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4">
                📈
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Inscripciones Recientes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.inscripcionesRecientes}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Acciones Rápidas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    to={action.link}
                    className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center mb-3">
                      <div className={`p-2 rounded-lg ${action.color} text-white text-xl mr-3`}>
                        {action.icon}
                      </div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Actividad Reciente
              </h2>
              <div className="space-y-3">
                {pagosRecientes.map((pago) => (
                  <div key={pago.id} className="flex items-center justify-between border border-blue-100 rounded-lg p-3">
                    <div>
                      <p className="font-medium text-gray-900">Pago curso {pago.curso}</p>
                      <p className="text-xs text-gray-400 mt-1">{pago.time}</p>
                    </div>
                    <Link to="/admin/inscripciones">
                      <Button>Revisar</Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Course Management */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Gestión Rápida de Cursos
            </h2>
            <Link to="/admin/cursos">
              <Button variant="primary">
                + Crear Nuevo Curso
              </Button>
            </Link>
            <Link to="/admin/docentes"  >
                <Button>+ Agregar Nuevo Docente</Button>
            </Link>
            <Link to="/admin/oferta-cursos">
                <Button>+ Agregar Nueva Oferta </Button>
            </Link>
            <Link to="/admin/pagos">
                <Button variant="success">+ Gestionar Pagos</Button>
            </Link>
          </div>

          <div className="text-center py-8 text-gray-500">
            <p className="mb-4">Accede a la gestión completa de cursos</p>
            <Link to="/admin/cursos">
              <Button variant="secondary">
                Ver Todos los Cursos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
