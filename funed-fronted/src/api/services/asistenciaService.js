import axiosClient from '../axiosClient';

// Servicio de asistencias
// Endpoint: GET /api/asistencia/persona/:id_persona/curso/:id_curso_matriculado
// Devuelve { mensaje, asistencias: [...] } o un arreglo directo
const asistenciaService = {
  getByPersonaCurso: async (id_persona, id_curso_matriculado) => {
    const { data } = await axiosClient.get(`/api/asistencia/persona/${id_persona}/curso/${id_curso_matriculado}`);
    const list = Array.isArray(data) ? data : data?.asistencias;
    return Array.isArray(list) ? list : [];
  },
};

export default asistenciaService;