import { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'

function RegistroPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    tipoIdentificacion: 'cedula', // Valor por defecto
    numeroIdentificacion: '',
    fechaNacimiento: '',
    telefono: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  // Función para simular el envío de un correo de activación
  const sendActivationEmail = async (email) => {
    // Simulamos una llamada a API con un retraso
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Correo de activación enviado a: ${email}`)
        resolve(true)
      }, 1500) // Simulamos 1.5 segundos de retraso
    })
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Limpiar mensajes previos
    setError('')
    setSuccess('')
    
    // Validación básica
    if (
      !formData.nombre || 
      !formData.apellido || 
      !formData.email || 
      !formData.tipoIdentificacion || 
      !formData.numeroIdentificacion || 
      !formData.fechaNacimiento || 
      !formData.telefono || 
      !formData.password
    ) {
      setError('Por favor, completa todos los campos')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    
    // Validar formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, introduce un correo electrónico válido')
      return
    }
    
    try {
      setLoading(true)
      
      // Simulación de registro exitoso
      console.log('Registro con:', formData)
      
      // Enviar correo de activación
      const emailSent = await sendActivationEmail(formData.email)
      
      if (emailSent) {
        setEmailSent(true)
        setSuccess(`¡Registro exitoso! Hemos enviado un correo de activación a ${formData.email}. Por favor, revisa tu bandeja de entrada para activar tu cuenta.`)
        
        // Limpiar el formulario después del registro exitoso
        setFormData({
          nombre: '',
          apellido: '',
          email: '',
          tipoIdentificacion: 'cedula',
          numeroIdentificacion: '',
          fechaNacimiento: '',
          telefono: '',
          password: '',
          confirmPassword: ''
        })
      }
    } catch (error) {
      console.error('Error durante el registro:', error)
      setError('Ocurrió un error durante el registro. Por favor, inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Crear una cuenta</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-800 hover:text-blue-700">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        
        {!emailSent ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input
                    id="apellido"
                    name="apellido"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Tipo y Número de Identificación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tipoIdentificacion" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Identificación</label>
                  <select
                    id="tipoIdentificacion"
                    name="tipoIdentificacion"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    value={formData.tipoIdentificacion}
                    onChange={handleChange}
                  >
                    <option value="cedula">Cédula</option>
                    <option value="pasaporte">Pasaporte</option>
                    <option value="tarjeta_identidad">Tarjeta de Identidad</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="numeroIdentificacion" className="block text-sm font-medium text-gray-700 mb-1">Número de Identificación</label>
                  <input
                    id="numeroIdentificacion"
                    name="numeroIdentificacion"
                    type="text"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Número de Identificación"
                    value={formData.numeroIdentificacion}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Fecha de Nacimiento y Teléfono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento</label>
                  <input
                    id="fechaNacimiento"
                    name="fechaNacimiento"
                    type="date"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              {/* Correo Electrónico */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              
              {/* Contraseña y Confirmación */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Procesando...' : 'Registrarse'}
              </Button>
            </div>
          </form>
        ) : (
          <div className="mt-6 text-center">
            <p className="mb-4">Revisa tu correo electrónico para activar tu cuenta.</p>
            <Button 
              type="button" 
              className="mt-4" 
              onClick={() => {
                setEmailSent(false)
                setSuccess('')
              }}
            >
              Volver al formulario
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default RegistroPage