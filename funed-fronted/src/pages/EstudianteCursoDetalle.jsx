import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EstudianteCursoDetallePage() {
  const navigate = useNavigate();
  // 🔹 Array dinámico de módulos
  const [modulos] = useState([
    { id: 1, titulo: "Introducción a React", duracion: "2h 30m", estado: "Completado", nota: 95 },
    { id: 2, titulo: "Components y Props", duracion: "3h 15m", estado: "Completado", nota: 88 },
    { id: 3, titulo: "State Management", duracion: "4h 00m", estado: "Completado", nota: 92 },
    { id: 4, titulo: "React Hooks", duracion: "3h 45m", estado: "Completado", nota: 90 },
    { id: 5, titulo: "TypeScript Fundamentals", duracion: "2h 20m", estado: "Completado", nota: 85 },
    { id: 6, titulo: "TypeScript con React", duracion: "3h 30m", estado: "Completado", nota: 87 },
    { id: 7, titulo: "Testing con Jest", duracion: "2h 45m", estado: "En Progreso", nota: 76 },
    { id: 8, titulo: "Proyecto Final", duracion: "5h 00m", estado: "Pendiente", nota: null },
  ]);

  // 🔹 Array de recursos para 'Descargas'
  const [recursos] = useState([
    { id: 1, nombre: "Guía de React Hooks", tipo: "PDF", tamano: "2.3 MB" },
    { id: 2, nombre: "Plantillas de Proyecto", tipo: "ZIP", tamano: "15.7 MB" },
    { id: 3, nombre: "Cheat Sheet TypeScript", tipo: "PDF", tamano: "1.1 MB" },
    { id: 4, nombre: "Videos de Repaso", tipo: "Playlist", tamano: "2.5 GB" },
  ]);

  // 🔹 Simular descarga
  const [downloadingId, setDownloadingId] = useState(null);
  const tipoToExt = (tipo) => {
    const map = { PDF: "pdf", ZIP: "zip", Playlist: "txt" };
    return map[tipo] || "bin";
  };
  const handleDownload = (recurso) => {
    setDownloadingId(recurso.id);
    // Simula espera de red y descarga de un archivo dummy
    setTimeout(() => {
      const contenido = `Recurso: ${recurso.nombre}\nTipo: ${recurso.tipo}\nTamaño: ${recurso.tamano}\n\nEste es un archivo de ejemplo para simular descarga.`;
      const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${recurso.nombre}.${tipoToExt(recurso.tipo)}`.replace(/\s+/g, "-");
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setDownloadingId(null);
    }, 900);
  };

  // 🔹 Estado para Tabs
  const [activeTab, setActiveTab] = useState("modulos");

  // 🔹 Array dinámico de asistencia
  const [asistencias] = useState([
    { id: 1, fecha: "2025-01-15", estado: "Presente" },
    { id: 2, fecha: "2025-01-22", estado: "Presente" },
    { id: 3, fecha: "2025-01-29", estado: "Ausente" },
    { id: 4, fecha: "2025-02-05", estado: "Presente" },
    { id: 5, fecha: "2025-02-12", estado: "Presente" },
    { id: 6, fecha: "2025-02-19", estado: "Presente" },
    { id: 7, fecha: "2025-02-26", estado: "Presente" },
    { id: 8, fecha: "2025-03-05", estado: "Ausente" },
  ]);

  // 🔹 Helpers de calificación cualitativa
  const getEtiqueta = (nota) => {
    if (nota === null || nota === undefined) return "Pendiente";
    if (nota >= 90) return "Excelente";
    if (nota >= 80) return "Bueno";
    if (nota >= 70) return "Aceptable";
    return "Insuficiente";
  };

  const getEtiquetaColor = (nota) => {
    if (nota === null || nota === undefined) return "text-gray-500";
    if (nota >= 90) return "text-green-600";
    if (nota >= 80) return "text-orange-500";
    if (nota >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  // 🔹 Helpers de asistencia
  const formatFecha = (isoDate) => {
    const d = new Date(isoDate);
    const dia = d.getDate().toString().padStart(2, "0");
    const meses = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    const mes = meses[d.getMonth()];
    return `${dia} ${mes}`;
  };

  const asistCardClasses = (estado) =>
    estado === "Presente"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";

  const asistIcon = (estado) => (estado === "Presente" ? "✅" : "⏰");

  const asistLabelColor = (estado) => (estado === "Presente" ? "text-green-700" : "text-red-600");

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button
        className="bg-blue-700 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
        onClick={() => navigate("/Estudiante")}
      >
        Volver
      </button>
      {/* Encabezado del curso */}
      <h1 className="text-3xl font-bold">Desarrollo Web Frontend</h1>
      <p className="text-gray-600 mb-4">
        Aprende React, TypeScript y las mejores prácticas para crear aplicaciones web modernas.
      </p>
      <div className="flex items-center gap-6 text-gray-500 mb-6">
        <span>👨‍🏫 Dr. María González</span>
        <span>📅 Inicio: 15 de Enero, 2024</span>
        <span>⏳ Duración: 12 semanas</span>
      </div>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Promedio" value="91" color="blue" />
        <StatCard title="Asistencia" value="75%" color="green" />
        <StatCard title="Módulos" value="6/8" color="orange" />
        <StatCard title="Recursos" value="4" color="purple" />
      </div>

      {/* Progreso General */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <p className="text-gray-600 mb-2">Progreso General</p>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div className="bg-blue-600 h-3 rounded-full" style={{ width: "75%" }}></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">6 de 8 módulos completados</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b mb-4">
        <button
          className={`pb-2 -mb-px ${
            activeTab === "modulos" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("modulos")}
        >
          Módulos
        </button>
        <button
          className={`pb-2 -mb-px ${
            activeTab === "calificaciones" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("calificaciones")}
        >
          Calificaciones
        </button>
        <button
          className={`pb-2 -mb-px ${
            activeTab === "asistencia" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("asistencia")}
        >
          Asistencia
        </button>
        <button
          className={`pb-2 -mb-px ${
            activeTab === "recursos" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("recursos")}
        >
          Recursos
        </button>
        <button
          className={`pb-2 -mb-px ${
            activeTab === "certificado" ? "border-b-2 border-blue-600 font-semibold" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("certificado")}
        >
          Certificado
        </button>
      </div>

      {/* Contenido: Módulos */}
      {activeTab === "modulos" && (
        <div className="space-y-4">
          {modulos.map((modulo) => (
            <div
              key={modulo.id}
              className="flex justify-between items-center p-4 bg-white rounded-lg shadow border"
            >
              <div>
                <h3 className="font-medium">{modulo.titulo}</h3>
                <p className="text-sm text-gray-500">Duración: {modulo.duracion}</p>
              </div>
              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    modulo.estado === "Completado"
                      ? "bg-green-100 text-green-600"
                      : modulo.estado === "En Progreso"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {modulo.estado}
                </span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  {modulo.estado === "Completado" ? "Revisar ▶" : "Continuar ▶"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contenido: Certificado */}
      {activeTab === "certificado" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-2xl">🎓</span>
                <div>
                  <h3 className="font-semibold text-lg">Solicita tu Certificado</h3>
                  <p className="text-sm text-gray-500">Curso: Desarrollo Web Frontend</p>
                </div>
              </div>
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={() => alert("Solicitud enviada para: Desarrollo Web Frontend")}
              >
                Solicitar certificado
              </button>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              Tu certificado estará disponible una vez validemos los requisitos del curso. Tiempo estimado: 24-48 horas.
            </div>
          </div>
        </div>
      )}

      {/* Contenido: Recursos */}
      {activeTab === "recursos" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <span>📄</span>
              <h3 className="font-semibold">Recursos Adicionales</h3>
            </div>
            <div className="space-y-3">
              {recursos.map((r) => (
                <div key={`rec-${r.id}`} className="flex items-center justify-between bg-white rounded-xl border p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">📘</div>
                    <div>
                      <p className="font-semibold">{r.nombre}</p>
                      <p className="text-sm text-gray-500">{r.tipo} · {r.tamano}</p>
                    </div>
                  </div>
                  <button
                    className={`flex items-center gap-2 border rounded-lg px-4 py-2 transition ${
                      downloadingId === r.id ? "bg-gray-100 text-gray-500" : "hover:bg-gray-50"
                    }`}
                    disabled={downloadingId === r.id}
                    onClick={() => handleDownload(r)}
                  >
                    <span>⬇️</span>
                    {downloadingId === r.id ? "Descargando..." : "Descargar"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenido: Calificaciones */}
      {activeTab === "calificaciones" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <span>📊</span>
              <h3 className="font-semibold">Historial de Calificaciones</h3>
            </div>
            <div className="space-y-3">
              {modulos.map((modulo, idx) => (
                <div
                  key={`cal-${modulo.id}`}
                  className="flex items-center justify-between bg-white rounded-xl border p-4"
                >
                  <div>
                    <p className="font-semibold">Módulo {idx + 1}</p>
                    <p className="text-sm text-gray-500">Calificación obtenida</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">
                      {modulo.nota !== null && modulo.nota !== undefined ? `${modulo.nota}/100` : "-"}
                    </p>
                    <p className={`text-sm ${getEtiquetaColor(modulo.nota)}`}>{getEtiqueta(modulo.nota)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Contenido: Asistencia */}
      {activeTab === "asistencia" && (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow border p-4">
            <div className="flex items-center gap-2 mb-4 text-gray-700">
              <span>📅</span>
              <h3 className="font-semibold">Registro de Asistencia</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {asistencias.map((a) => (
                <div
                  key={`asis-${a.id}`}
                  className={`rounded-xl border p-5 ${asistCardClasses(a.estado)}`}
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <div className="text-2xl opacity-80">{asistIcon(a.estado)}</div>
                    <p className="font-semibold">{formatFecha(a.fecha)}</p>
                    <p className={`text-sm ${asistLabelColor(a.estado)}`}>{a.estado}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "text-blue-600",
    green: "text-green-600",
    orange: "text-orange-600",
    purple: "text-purple-600",
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white text-center">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${colorMap[color] || ""}`}>{value}</p>
    </div>
  );
}
