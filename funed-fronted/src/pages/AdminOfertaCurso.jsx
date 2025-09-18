import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import Button from "../components/Button"
import Modal from "../components/Modal"
import ofertaCursoService from "../api/services/ofertaCursoService" // ✅ Service real

function AdminOfertaCursosPage() {
  const navigate = useNavigate()

  const [ofertas, setOfertas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // filtros
  const [searchTerm, setSearchTerm] = useState("")

  // formulario
  const [formData, setFormData] = useState({
    id: null,
    codigoCurso: "",
    idCurso: "",
    fechaInicioCurso: "",
    fechaFinCurso: "",
    horario: "",
    cupos: "",
    idDocente: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  // cargar ofertas desde API
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await ofertaCursoService.list()
        setOfertas(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error(err)
        setError("Error al cargar las ofertas de cursos.")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // filtros locales
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return ofertas.filter(
      (o) =>
        !q ||
        o.codigoCurso?.toString().includes(q) ||
        o.idCurso?.toString().includes(q) ||
        o.idDocente?.toString().includes(q) ||
        o.horario?.toLowerCase().includes(q)
    )
  }, [ofertas, searchTerm])

  // handlers form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((s) => ({ ...s, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      id: null,
      codigoCurso: "",
      idCurso: "",
      fechaInicioCurso: "",
      fechaFinCurso: "",
      horario: "",
      cupos: "",
      idDocente: "",
    })
    setEditMode(false)
    setEditOpen(false)
  }

  // guardar (create/update con API)
  const saveOferta = async () => {
    setError("")
    setSuccess("")

    const { id, codigoCurso, idCurso, fechaInicioCurso, fechaFinCurso, horario, cupos, idDocente } =
      formData

    if (!codigoCurso || !idCurso || !fechaInicioCurso || !fechaFinCurso || !horario || !cupos || !idDocente) {
      setError("Completa todos los campos obligatorios.")
      return
    }

    try {
      if (editMode && id != null) {
        const updated = await ofertaCursoService.update(id, formData)
        setOfertas((list) => list.map((o) => (o.id === id ? updated : o)))
        setSuccess("Oferta actualizada correctamente.")
      } else {
        const newOferta = await ofertaCursoService.create(formData)
        setOfertas((list) => [newOferta, ...list])
        setSuccess("Oferta creada correctamente.")
      }
      resetForm()
    } catch (err) {
      console.error(err)
      setError("No se pudo guardar la oferta.")
    }
  }

  // editar
  const handleEdit = (id) => {
    const o = ofertas.find((x) => x.id === id)
    if (!o) return
    setFormData(o)
    setEditMode(true)
    setEditOpen(true)
  }

  // eliminar usando API
  const handleDelete = async (id) => {
    const o = ofertas.find((x) => x.id === id)
    if (!o) return
    if (!window.confirm(`¿Eliminar la oferta del curso con código ${o.codigoCurso}?`)) return

    try {
      await ofertaCursoService.remove(id)
      setOfertas((list) => list.filter((x) => x.id !== id))
      setSuccess("Oferta eliminada correctamente.")
    } catch (err) {
      console.error(err)
      setError("No se pudo eliminar la oferta.")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Botón volver */}
        <div className="mb-4">
          <Button variant="outline" onClick={() => navigate("/admin")}>
            ← Volver
          </Button>
        </div>

        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Administración de Ofertas de Cursos
        </h1>

        {error && (
          <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
            {success}
          </div>
        )}

        {/* Crear */}
        <Card className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Crear nueva oferta</h2>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              saveOferta()
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="number"
                name="codigoCurso"
                value={formData.codigoCurso}
                onChange={handleChange}
                placeholder="Código del curso"
                className="w-full rounded border px-4 py-2"
                required
              />
              <input
                type="number"
                name="idCurso"
                value={formData.idCurso}
                onChange={handleChange}
                placeholder="ID Curso"
                className="w-full rounded border px-4 py-2"
                required
              />
              <input
                type="date"
                name="fechaInicioCurso"
                value={formData.fechaInicioCurso}
                onChange={handleChange}
                className="w-full rounded border px-4 py-2"
                required
              />
              <input
                type="date"
                name="fechaFinCurso"
                value={formData.fechaFinCurso}
                onChange={handleChange}
                className="w-full rounded border px-4 py-2"
                required
              />
              <input
                type="text"
                name="horario"
                value={formData.horario}
                onChange={handleChange}
                placeholder="Horario (ej: Lun-Vie 8-12)"
                className="w-full rounded border px-4 py-2"
                required
              />
              <input
                type="number"
                name="cupos"
                value={formData.cupos}
                onChange={handleChange}
                placeholder="Cupos"
                className="w-full rounded border px-4 py-2"
                required
              />
              <input
                type="number"
                name="idDocente"
                value={formData.idDocente}
                onChange={handleChange}
                placeholder="ID Docente"
                className="w-full rounded border px-4 py-2"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                Crear oferta
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Limpiar
              </Button>
            </div>
          </form>
        </Card>

        {/* Buscar */}
        <Card className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Gestionar ofertas existentes
          </h2>
          <input
            type="text"
            placeholder="Buscar por código, curso, docente o horario…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded border px-4 py-2"
          />
        </Card>

        {/* Lista */}
        {loading ? (
          <div className="text-center text-gray-500">Cargando ofertas…</div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No hay ofertas.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((o) => (
              <Card key={o.id} className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold">Código: {o.codigoCurso}</h3>
                  <p>Curso ID: {o.idCurso}</p>
                  <p>Docente ID: {o.idDocente}</p>
                  <p>Horario: {o.horario}</p>
                  <p>Cupos: {o.cupos}</p>
                  <p>
                    Inicio: {o.fechaInicioCurso} – Fin: {o.fechaFinCurso}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(o.id)}>
                    Editar
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(o.id)}>
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal edición */}
        <Modal open={editOpen} title="Editar oferta" onClose={() => setEditOpen(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              saveOferta()
            }}
            className="space-y-4"
          >
            <input
              type="number"
              name="codigoCurso"
              value={formData.codigoCurso}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
            <input
              type="number"
              name="idCurso"
              value={formData.idCurso}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
            <input
              type="date"
              name="fechaInicioCurso"
              value={formData.fechaInicioCurso}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
            <input
              type="date"
              name="fechaFinCurso"
              value={formData.fechaFinCurso}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
            <input
              type="text"
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
            <input
              type="number"
              name="cupos"
              value={formData.cupos}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />
            <input
              type="number"
              name="idDocente"
              value={formData.idDocente}
              onChange={handleChange}
              className="w-full rounded border px-4 py-2"
              required
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  )
}

export default AdminOfertaCursosPage
