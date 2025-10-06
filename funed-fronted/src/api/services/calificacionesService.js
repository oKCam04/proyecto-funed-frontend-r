import axiosClient from '../axiosClient';

// Servicio de calificaciones
// Consumo del endpoint: GET /api/calificaciones/oferta/:id_oferta_curso
// Devuelve un arreglo de calificaciones con modulo y docente
const calificacionesService = {
  getByOferta: async (id_oferta_curso) => {
    const { data } = await axiosClient.get(`/api/calificaciones/oferta/${id_oferta_curso}`);
    const list = Array.isArray(data) ? data : data?.calificaciones;
    return Array.isArray(list) ? list : [];
  },
};

export default calificacionesService;