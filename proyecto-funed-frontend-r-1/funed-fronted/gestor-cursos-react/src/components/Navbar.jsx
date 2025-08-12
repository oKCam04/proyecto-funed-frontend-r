import { useState } from 'react'
import { Link } from 'react-router-dom'
import FunedLogo from './FunedLogo'
import Button from './Button'

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  // Simulación de estado de autenticación (en un caso real, esto vendría de un contexto de autenticación)
  const [isAdmin, setIsAdmin] = useState(true) // Temporalmente true para probar

  return (
    <nav className="bg-blue-800 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 hover:text-blue-200 transition-colors">
          <div className="flex-shrink-0">
            <img 
              src="/logo.png"
              alt="FUNED Logo" 
              className="h-12 w-auto object-contain drop-shadow-sm"
              onError={(e) => {
                console.error('Error loading logo in navbar')
                e.target.style.display = 'none'
              }}
            />
          </div>
          <div>
            <div className="text-xl font-bold">Academia Funed</div>
            <div className="text-xs text-blue-200">Educación a tu Alcance</div>
          </div>
        </Link>
        
        {/* Menú para escritorio */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="hover:text-blue-200 transition-colors">
            Inicio
          </Link>
          <Link to="/cursos" className="hover:text-blue-200 transition-colors">
            Cursos
          </Link>
          <Link to="/sobre-nosotros" className="hover:text-blue-200 transition-colors">
            Sobre Nosotros
          </Link>
          <Link to="/contacto" className="hover:text-blue-200 transition-colors">
            Contacto
          </Link>
          {isAdmin && (
            <Link to="/admin/cursos" className="hover:text-blue-200 transition-colors">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin
              </span>
            </Link>
          )}
          <div className="ml-4 flex space-x-2">
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-white text-white hover:bg-white hover:text-blue-800">
                Iniciar sesión
              </Button>
            </Link>
            <Link to="/registro">
              <Button size="sm" className="bg-white text-blue-800 hover:bg-blue-100">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Botones de acceso siempre visibles en móvil */}
        <div className="md:hidden flex items-center space-x-2">
          <Link to="/registro">
            <Button size="sm" className="bg-white text-blue-800 hover:bg-blue-100">
              Registrarse
            </Button>
          </Link>
          <button 
            className="text-white focus:outline-none" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Menú móvil desplegable */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 mt-2 p-4 rounded-lg">
          <div className="flex flex-col space-y-3">
            <Link to="/" className="hover:text-blue-200 transition-colors" onClick={() => setMenuOpen(false)}>
              Inicio
            </Link>
            <Link to="/cursos" className="hover:text-blue-200 transition-colors" onClick={() => setMenuOpen(false)}>
              Cursos
            </Link>
            <Link to="/sobre-nosotros" className="hover:text-blue-200 transition-colors" onClick={() => setMenuOpen(false)}>
              Sobre Nosotros
            </Link>
            <Link to="/contacto" className="hover:text-blue-200 transition-colors" onClick={() => setMenuOpen(false)}>
              Contacto
            </Link>
            {isAdmin && (
              <Link to="/admin/cursos" className="hover:text-blue-200 transition-colors" onClick={() => setMenuOpen(false)}>
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Admin
                </span>
              </Link>
            )}
            <Link to="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full border-white text-white hover:bg-white hover:text-blue-800">
                Iniciar sesión
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar