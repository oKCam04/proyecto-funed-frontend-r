
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import Modal from "../components/Modal";
import cursosService from "../api/services/cursoService"; 

function AdminCursosPage() {
  const navigate = useNavigate(); 

  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("todos");

  // formulario
  const [formData, setFormData] = useState({
    id: null,
    nombreCurso: "",
    duracion: "",
    temario: "",
    tipoCurso: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // modal

  // cargar cursos
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await cursosService.list();
        setCursos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(
          err?.response?.status === 401
            ? "No autorizado (401). Inicia sesión nuevamente."
            : "Error al cargar cursos."
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // filtros locales
  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return cursos.filter((c) => {
      const byText =
        !q ||
        c.nombreCurso?.toLowerCase().includes(q) ||
        c.temario?.toLowerCase().includes(q) ||
        c.tipoCurso?.toLowerCase().includes(q);
      const byTipo = tipoFiltro === "todos" || c.tipoCurso === tipoFiltro;
      return byText && byTipo;
    });
  }, [cursos, searchTerm, tipoFiltro]);

  // handlers form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: null,
      nombreCurso: "",
      duracion: "",
      temario: "",
      tipoCurso: "",
    });
    setEditMode(false);
    setEditOpen(false);
  };

  // guardar (POST/PUT)
  const saveCurso = async () => {
    setError("");
    setSuccess("");

    const { id, nombreCurso, duracion, temario, tipoCurso } = formData;
    if (!nombreCurso || !duracion || !temario || !tipoCurso) {
      setError("Completa todos los campos obligatorios.");
      return;
    }
    const payload = {
      nombreCurso,
      duracion: Number(duracion),
      temario,
      tipoCurso,
    };

    try {
      if (editMode && id != null) {
        const updated = await cursosService.update(id, payload);
        setCursos((list) => list.map((c) => (c.id === updated.id ? updated : c)));
        setSuccess(`"${updated.nombreCurso}" actualizado correctamente.`);
      } else {
        const created = await cursosService.create(payload);
        setCursos((list) => [created, ...list]);
        setSuccess(`"${created.nombreCurso}" creado correctamente.`);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.status === 401
          ? "No autorizado (401). Verifica tu sesión/token."
          : err?.response?.data?.message || "No se pudo guardar el curso."
      );
    }
  };

  // crear (form visible)
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setEditMode(false);
    await saveCurso();
  };

  // editar → abrir modal
  const handleEdit = (id) => {
    const c = cursos.find((x) => x.id === id);
    if (!c) return;
    setFormData({
      id: c.id,
      nombreCurso: c.nombreCurso ?? "",
      duracion: c.duracion ?? "",
      temario: c.temario ?? "",
      tipoCurso: c.tipoCurso ?? "",
    });
    setEditMode(true);
    setEditOpen(true);
  };

  // eliminar
  const handleDelete = async (id) => {
    const c = cursos.find((x) => x.id === id);
    if (!c) return;
    if (!window.confirm(`¿Eliminar el curso "${c.nombreCurso}"?`)) return;

    try {
      await cursosService.remove(id);
      setCursos((list) => list.filter((x) => x.id !== id));
      setSuccess(`"${c.nombreCurso}" eliminado correctamente.`);
      if (formData.id === id) resetForm();
    } catch (err) {
      console.error(err);
      setError(
        err?.response?.status === 401
          ? "No autorizado (401). Verifica tu sesión/token."
          : "No se pudo eliminar el curso."
      );
    }
  };

  // UI helpers
  const tiposSugeridos = ["Técnico", "Curso corto", "Diplomado", "Seminario"];
  const uniqueTipos = [
    "todos",
    ...Array.from(new Set(cursos.map((c) => c.tipoCurso).filter(Boolean))),
  ];
  const fmtDate = (s) => (s ? new Date(s).toLocaleString() : "");

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
          Administración de Cursos
        </h1>

        {error && (
          <div className="mb-6 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
            <span className="block sm:inline">{success}</span>
          </div>
        )}

        {/* Crear (form visible) */}
        <Card className="mb-8" id="curso-form">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Crear nuevo curso
          </h2>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre del curso *
                </label>
                <input
                  type="text"
                  name="nombreCurso"
                  value={formData.nombreCurso}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Maquillaje Profesional"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tipo de curso *
                </label>
                <input
                  list="tipos"
                  name="tipoCurso"
                  value={formData.tipoCurso}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Técnico / Curso corto / …"
                  required
                />
                <datalist id="tipos">
                  {tiposSugeridos.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Duración (horas) *
                </label>
                <input
                  type="number"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="40"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Temario / Contenido *
              </label>
              <textarea
                name="temario"
                value={formData.temario}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Técnicas de maquillaje social, fotografía, cuidado de la piel…"
                rows="3"
                required
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" variant="primary">Crear curso</Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Limpiar
              </Button>
            </div>
          </form>
        </Card>

        {/* Filtros */}
        <Card className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Gestionar cursos existentes
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Buscar
              </label>
              <input
                type="text"
                placeholder="Buscar por nombre, temario o tipo…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Filtrar por tipo de curso
              </label>
              <select
                value={tipoFiltro}
                onChange={(e) => setTipoFiltro(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                {uniqueTipos.map((t) => (
                  <option key={t} value={t}>
                    {t === "todos" ? "Todos" : t}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Card>

        {/* Lista */}
        {loading ? (
          <div className="text-center text-gray-500">Cargando cursos…</div>
        ) : filtered.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No se encontraron cursos que coincidan con tu búsqueda.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((c) => (
              <Card key={c.id} className="transition-shadow hover:shadow-lg">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <div className="flex-1">
                    <div className="mb-2 flex items-center gap-3">
                      <h3 className="text-xl font-semibold text-gray-800">
                        {c.nombreCurso}
                      </h3>
                      {c.tipoCurso && (
                        <span className="rounded bg-teal-100 px-2 py-1 text-sm text-teal-800">
                          {c.tipoCurso}
                        </span>
                      )}
                    </div>

                    <p className="mb-2 text-gray-600">
                      <span className="font-medium">Duración:</span> {c.duracion}{" "}
                      hora{Number(c.duracion) === 1 ? "" : "s"}
                    </p>

                    {c.temario && (
                      <p className="mb-3 text-gray-600">
                        <span className="font-medium">Temario:</span> {c.temario}
                      </p>
                    )}

                    <div className="text-sm text-gray-400">
                      <span className="mr-4">Creado: {fmtDate(c.createdAt)}</span>
                      <span>Actualizado: {fmtDate(c.updatedAt)}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="primary" size="sm" onClick={() => handleEdit(c.id)}>
                      Editar
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(c.id)}>
                      Eliminar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal edición */}
        <Modal
          open={editOpen}
          title="Editar curso"
          onClose={() => setEditOpen(false)}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveCurso(); // PUT en modo edición
            }}
            className="space-y-4"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre del curso *
                </label>
                <input
                  type="text"
                  name="nombreCurso"
                  value={formData.nombreCurso}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Tipo de curso *
                </label>
                <input
                  list="tipos"
                  name="tipoCurso"
                  value={formData.tipoCurso}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  required
                />
                <datalist id="tipos">
                  {tiposSugeridos.map((t) => (
                    <option key={t} value={t} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Duración (horas) *
                </label>
                <input
                  type="number"
                  name="duracion"
                  value={formData.duracion}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Temario / Contenido *
              </label>
              <textarea
                name="temario"
                value={formData.temario}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                rows="3"
                required
              />
            </div>

            <div className="flex justify-between gap-3">
              <Button type="button" variant="outline" onClick={() => navigate("/admin")}>
                ← Volver
              </Button>
              <div className="flex gap-3">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancelar
                </Button>
                <Button type="submit" variant="primary">
                  Guardar cambios
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
}

export default AdminCursosPage;
