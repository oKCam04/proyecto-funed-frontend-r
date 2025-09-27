import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import cursoPersonaService from "../api/services/cursoPersonaService";

export default function EstudiantePage() {
  const { usuario } = useAuth(); // usamos usuario del contexto (idPersona está aquí)
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCursos = async () => {
    try {
      console.log("👤 Usuario en contexto:", usuario); 

      if (usuario?.idPersona) {
        console.log("🔑 idPersona usado:", usuario.idPersona);

        const data = await cursoPersonaService.getByPersona(usuario.idPersona);
        console.log("📌 Respuesta API cursosPersonas:", data);

        setCursos(data?.cursos || []);
      } else {
        console.warn("⚠️ No hay idPersona en usuario");
      }
    } catch (error) {
      console.error("❌ Error cargando cursos:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCursos();
}, [usuario]);


  if (loading) return <p className="text-center mt-10">Cargando cursos...</p>;

  // Métricas
  const totalCursos = cursos.length;
  const completados = cursos.filter((c) => c.resultado === "Aprobado").length;
  const enProgreso = cursos.filter((c) => c.estado === "Activo").length;
  const promedio = totalCursos > 0 ? Math.round((completados / totalCursos) * 100) : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">Panel de Cursos</h1>
      <p className="text-gray-600 mb-6">
        Gestiona tu progreso y accede a todos tus cursos
      </p>

      {/* Estadísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Cursos" value={totalCursos} color="blue" />
        <StatCard title="Completados" value={completados} color="green" />
        <StatCard title="En Progreso" value={enProgreso} color="orange" />
        <StatCard title="Progreso Promedio" value={`${promedio}%`} color="indigo" />
      </div>

      {/* Cursos */}
      <div className="grid md:grid-cols-2 gap-6">
        {cursos.map((curso) => (
          <CursoCard key={curso.idMatricula} curso={curso} />
        ))}
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "text-blue-600 bg-blue-100",
    green: "text-green-600 bg-green-100",
    orange: "text-orange-600 bg-orange-100",
    indigo: "text-indigo-600 bg-indigo-100",
  };

  return (
    <div className="p-4 rounded-lg shadow bg-white">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-2xl font-bold ${colorMap[color] || ""}`}>{value}</p>
    </div>
  );
}

function CursoCard({ curso }) {
  const progreso =
    curso.resultado === "Aprobado"
      ? 100
      : curso.estado === "Activo"
      ? 60 // TODO: calcular real con módulos completados
      : 0;

  return (
    <div className="p-6 bg-white rounded-lg shadow border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <span
          className={`px-3 py-1 text-sm rounded-full ${
            curso.resultado === "Aprobado"
              ? "bg-green-100 text-green-600"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          {curso.resultado === "Aprobado" ? "Completado" : curso.estado}
        </span>
        <span className="text-sm text-gray-500">{curso.tipo}</span>
      </div>

      <h2 className="text-xl font-semibold mb-2">{curso.nombre}</h2>
      <p className="text-gray-600 mb-4">{curso.temario}</p>

      {/* Barra de progreso */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: `${progreso}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-1">{progreso}%</p>
      </div>

      <p className="text-sm text-gray-500 mb-4">
        {curso.duracion} horas · {curso.horario}
      </p>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        {curso.resultado === "Aprobado" ? "Revisar" : "Continuar"}
      </button>
    </div>
  );
}
