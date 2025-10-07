import axiosClient from '../axiosClient';

// Servicio de notas por módulo (por estudiante y oferta de curso)
// Endpoint: GET /api/notas-modulo/:id_persona/:id_oferta_curso
// Devuelve { notas: [...] } o arreglo directo
const calificacionesService = {
  getNotasModuloByPersonaOferta: async (id_persona, id_oferta_curso) => {
    const { data } = await axiosClient.get(`/api/notas-modulo/${id_persona}/${id_oferta_curso}`);
    const list = Array.isArray(data) ? data : data?.notas;
    return Array.isArray(list) ? list : [];
  },
};

export default calificacionesService;