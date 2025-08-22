import { useEffect, useState } from 'react'
// import { api } from '../lib/api'
import Card from '../components/Card'

function CursosPage() {
  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  // useEffect(() => {
  //   api
  //     .get('/ofertaCursos')
  //     .then(({ data }) => {
  //       setOfertas(Array.isArray(data) ? data : [])
  //     })
  //     .catch((e) => {
  //       setError(e?.response?.data?.message || e.message)
  //     })
  //     .finally(() => {
  //       setLoading(false)
  //     })
  // }, [])

  const filtered = ofertas.filter((o) =>
    (o?.curso?.nombreCurso || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <div className="p-6">Cargando cursos…</div>
  if (error) return <div className="p-6 text-red-600">Error: {error}</div>

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Nuestros Cursos de Belleza
        </h1>

        {/* Buscador */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Buscar cursos
          </label>
          <input
            type="text"
            placeholder="Buscar por nombre de curso…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Lista desde la API */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((o) => (
            <Card key={o.id} className="hover:shadow-lg transition-shadow">
              <img
                src={`https://via.placeholder.com/600x360/1e40af/FFFFFF?text=${encodeURIComponent(
                  o.curso?.nombreCurso || 'Curso'
                )}`}
                alt={o.curso?.nombreCurso || 'Curso'}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {o.curso?.nombreCurso ?? 'Curso'}
              </h3>
              <p className="text-gray-500 mb-4">Código: {o.codigoCurso ?? '-'}</p>

              <div className="text-sm space-y-1 mb-4">
                <div className="flex justify-between">
                  <span className="opacity-70">Inicio</span>
                  <span>
                    {o.fechaInicioCurso
                      ? new Date(o.fechaInicioCurso).toLocaleDateString()
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Fin</span>
                  <span>
                    {o.fechaFinCurso
                      ? new Date(o.fechaFinCurso).toLocaleDateString()
                      : '-'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Horario</span>
                  <span>{o.horario ?? '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Cupos</span>
                  <span>{o.cupos ?? '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-70">Docente</span>
                  <span>
                    {o.docente?.especialidad ? o.docente.especialidad : `#${o.idDocente}`}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => (window.location.href = `/curso/${o.id}`)}
                  className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  Ver Detalles
                </button>
                <button
                  className="bg-blue-800 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  onClick={() => alert(`Inscribirme a oferta ${o.id}`)}
                >
                  Inscribirse
                </button>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
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
