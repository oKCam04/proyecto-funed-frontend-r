import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from '../components/Button'


function RegistroPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    fechaNacimiento: '',
    email: '',
    password: '',
    confirmPassword: '',
    telefono: '',
    acepta_terminos: false
  })
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.apellido.trim()) {
      newErrors.apellido = 'El apellido es requerido'
    }

    if (!formData.tipoIdentificacion) {
      newErrors.tipoIdentificacion = 'El tipo de identificación es requerido'
    }

    if (!formData.numeroIdentificacion.trim()) {
      newErrors.numeroIdentificacion = 'El número de identificación es requerido'
    }

    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = 'La fecha de nacimiento es requerida'
    } else {
      const today = new Date()
      const birthDate = new Date(formData.fechaNacimiento)
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()
      
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      
      if (age < 16) {
        newErrors.fechaNacimiento = 'Debes tener al menos 16 años para registrarte'
      }
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirma tu contraseña'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido'
    }

    if (!formData.acepta_terminos) {
      newErrors.acepta_terminos = 'Debes aceptar los términos y condiciones'
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
      // Generar token de verificación
      const verificationToken = emailService.generateVerificationToken()
      
      // Simular registro en la base de datos
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Enviar email de verificación
      await emailService.sendVerificationEmail(
        formData.email,
        `${formData.nombre} ${formData.apellido}`,
        verificationToken
      )
      
      // Guardar datos temporales (sin activar la cuenta)
      localStorage.setItem('pendingUser', JSON.stringify({
        ...formData,
        verificationToken,
        verified: false,
        createdAt: new Date().toISOString()
      }))
      
      // Redirigir a página de verificación de email
      navigate(`/verificar-email?email=${encodeURIComponent(formData.email)}`)
      
    } catch (error) {
      setErrors({ general: 'Error al crear la cuenta. Intenta nuevamente.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear Cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
                {errors.general}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.nombre ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Tu nombre"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>

              <div>
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">
                  Apellido
                </label>
                <input
                  id="apellido"
                  name="apellido"
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.apellido ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Tu apellido"
                />
                {errors.apellido && (
                  <p className="mt-1 text-sm text-red-600">{errors.apellido}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tipoIdentificacion" className="block text-sm font-medium text-gray-700">
                  Tipo de Identificación
                </label>
                <select
                  id="tipoIdentificacion"
                  name="tipoIdentificacion"
                  value={formData.tipoIdentificacion}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.tipoIdentificacion ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Seleccionar tipo</option>
                  <option value="cedula">Cédula Nacional</option>
                  <option value="pasaporte">Pasaporte</option>
                  <option value="dimex">DIMEX</option>
                  <option value="didi">DIDI</option>
                </select>
                {errors.tipoIdentificacion && (
                  <p className="mt-1 text-sm text-red-600">{errors.tipoIdentificacion}</p>
                )}
              </div>

              <div>
                <label htmlFor="numeroIdentificacion" className="block text-sm font-medium text-gray-700">
                  Número de Identificación
                </label>
                <input
                  id="numeroIdentificacion"
                  name="numeroIdentificacion"
                  type="text"
                  value={formData.numeroIdentificacion}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.numeroIdentificacion ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="123456789"
                />
                {errors.numeroIdentificacion && (
                  <p className="mt-1 text-sm text-red-600">{errors.numeroIdentificacion}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="fechaNacimiento" className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento
              </label>
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fechaNacimiento ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.fechaNacimiento && (
                <p className="mt-1 text-sm text-red-600">{errors.fechaNacimiento}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                value={formData.telefono}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.telefono ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="+506 1234-5678"
              />
              {errors.telefono && (
                <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="••••••••"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div>
              <div className="flex items-center">
                <input
                  id="acepta_terminos"
                  name="acepta_terminos"
                  type="checkbox"
                  checked={formData.acepta_terminos}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="acepta_terminos" className="ml-2 block text-sm text-gray-900">
                  Acepto los{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    términos y condiciones
                  </a>{' '}
                  y la{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">
                    política de privacidad
                  </a>
                </label>
              </div>
              {errors.acepta_terminos && (
                <p className="mt-1 text-sm text-red-600">{errors.acepta_terminos}</p>
              )}
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegistroPage
