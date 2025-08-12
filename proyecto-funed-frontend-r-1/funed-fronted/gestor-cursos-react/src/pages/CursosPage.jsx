import { useState } from 'react'
import Card from '../components/Card'
import Button from '../components/Button'
import { Link } from 'react-router-dom'

function CursosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('todos')

  const cursos = [
    // ... existing code ...
  ]

  const categorias = [
    // ... existing code ...
  ]

  const filteredCursos = cursos.filter(curso => {
    // ... existing code ...
  })

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Nuestros Cursos de Belleza
        </h1>

        {/* Filtros */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          // ... existing code ...
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
              </div>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">
                  {curso.precio}
                </span>
                <div className="space-x-2">
                  <Link to={`/cursos/${curso.id}`}>
                    <Button variant="outline" size="sm">Ver detalles</Button>
                  </Link>
                  <Button variant="primary" size="sm">Inscribirse</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredCursos.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No se encontraron cursos con los filtros seleccionados.
          </div>

          // ... existing code ...
        )}
        
      </div>
    </div>
  )
}

export default CursosPage