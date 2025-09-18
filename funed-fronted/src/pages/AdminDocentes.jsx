import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../components/Card"
import Button from "../components/Button"
import Modal from "../components/Modal"
import docenteService from "../api/services/docenteService"

function AdminDocentesPage() {
  const navigate = useNavigate()

  const [docentes, setDocentes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  // filtros
  const [searchTerm, setSearchTerm] = useState("")

  // formulario
  const [formData, setFormData] = useState({
    id: null,
    idPersona: "",
    especialidad: "",
    fechaContratacion: "",
    fechaTerminacion: "",
  })
  const [editMode, setEditMode] = useState(false)
  const [editOpen, setEditOpen] = useState(false)

  // cargar docentes desde API
  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const data = await docenteService.list()
        // Normalizamos la respuesta para que siempre tenga `id`
        const normalized = data.map((d) => ({
          ...d,
          id: d.id || d.idDocente, // 👈 asegura que tengamos `id`
        }))
        setDocentes(Array.isArray(normalized) ? normalized : [])
      } catch (err) {
        console.error(err)
        setError("Error al cargar docentes.")
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // filtros locales
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase()
    return docentes.filter(
      (d) =>
        !q ||
        d.especialidad?.toLowerCase().includes(q) ||
        d.idPersona?.toString().includes(q)
    )
  }, [docentes, searchTerm])

  // handlers form
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((s) => ({ ...s, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      id: null,
      idPersona: "",
      especialidad: "",
      fechaContratacion: "",
      fechaTerminacion: "",
    })
    setEditMode(false)
    setEditOpen(false)
  }

  // guardar usando API
  const saveDocente = async () => {
    setError("")
    setSuccess("")

    const { id, idPersona, especialidad, fechaContratacion, fechaTerminacion } = formData
    if (!idPersona || !especialidad || !fechaContratacion) {
      setError("Completa todos los campos obligatorios.")
      return
    }

    try {
      if (editMode && id != null) {
        // update
        const updated = await docenteService.update(id, {
          idPersona,
          especialidad,
          fechaContratacion,
          fechaTerminacion,
        })
        setDocentes((list) =>
          list.map((d) => (d.id === id ? { ...updated, id } : d))
        )
        setSuccess("Docente actualizado correctamente.")
      } else {
        // create
        const newDocente = await docenteService.create({
          idPersona,
          especialidad,
          fechaContratacion,
          fechaTerminacion,
        })
        // normalizamos id en nuevo registro
        const withId = { ...newDocente, id: newDocente.id || newDocente.idDocente }
        setDocentes((list) => [withId, ...list])
        setSuccess("Docente creado correctamente.")
      }
      resetForm()
    } catch (err) {
      console.error(err)
      setError("No se pudo guardar el docente.")
    }
  }

  // editar
  const handleEdit = (id) => {
    const d = docentes.find((x) => x.id === id)
    if (!d) return
    setFormData(d)
    setEditMode(true)
    setEditOpen(true)
  }

  // eliminar usando API
  const handleDelete = async (id) => {
    const d = docentes.find((x) => x.id === id)
    if (!d) return
    if (!window.confirm(`¿Eliminar al docente?`)) return

    try {
      await docenteService.remove(id)
      setDocentes((list) => list.filter((x) => x.id !== id))
      setSuccess("Docente eliminado correctamente.")
    } catch (err) {
      console.error(err)
      setError("No se pudo eliminar el docente.")
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
          Administración de Docentes
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
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Crear nuevo docente
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              saveDocente()
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ID Persona *
                </label>
                <input
                  type="number"
                  name="idPersona"
                  value={formData.idPersona}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Especialidad *
                </label>
                <input
                  type="text"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2"
                  required
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Contratación *
                </label>
                <input
                  type="date"
                  name="fechaContratacion"
                  value={formData.fechaContratacion}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fecha Terminación
                </label>
                <input
                  type="date"
                  name="fechaTerminacion"
                  value={formData.fechaTerminacion}
                  onChange={handleChange}
                  className="w-full rounded-lg border px-4 py-2"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">
                {editMode ? "Guardar cambios" : "Crear docente"}
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
            Gestionar docentes existentes
          </h2>
          <input
            type="text"
            placeholder="Buscar por especialidad o ID persona…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border px-4 py-2"
          />
        </Card>

        {/* Lista */}
        {loading ? (
          <div className="text-center text-gray-500">Cargando docentes…</div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500">No hay docentes.</p>
        ) : (
          <div className="space-y-4">
            {filtered.map((d) => (
              <Card key={d.id} className="flex justify-between p-4">
                <div>
                  <h3 className="text-lg font-semibold">
                    ID Persona: {d.idPersona}
                  </h3>
                  <p>Especialidad: {d.especialidad}</p>
                  <p>
                    Contratación: {d.fechaContratacion} <br />
                    Terminación: {d.fechaTerminacion || "—"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleEdit(d.id)}>
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(d.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal edición */}
        <Modal
          open={editOpen}
          title="Editar docente"
          onClose={() => setEditOpen(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault()
              saveDocente()
            }}
            className="space-y-4"
          >
            <input
              type="number"
              name="idPersona"
              value={formData.idPersona}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
            <input
              type="text"
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
            <input
              type="date"
              name="fechaContratacion"
              value={formData.fechaContratacion}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
              required
            />
            <input
              type="date"
              name="fechaTerminacion"
              value={formData.fechaTerminacion}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2"
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

export default AdminDocentesPage
