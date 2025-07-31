import { Link } from 'react-router-dom'
import FunedLogo from './FunedLogo'

function Navbar() {
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
        <div className="space-x-4">
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
        </div>
      </div>
    </nav>
  )
}

export default Navbar 