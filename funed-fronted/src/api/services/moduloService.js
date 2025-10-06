import axiosClient from '../axiosClient';

// Servicio de módulos
// Consumo del endpoint: GET /api/modulos/oferta/:id_oferta_curso
// Devuelve directamente el arreglo de módulos [{ id, nombre }]
const moduloService = {
  getByOferta: async (id_oferta_curso) => {
    const { data } = await axiosClient.get(`/api/modulos/oferta/${id_oferta_curso}`);
    // El backend responde { mensaje, modulos: [...] }
    return Array.isArray(data) ? data : data?.modulos ?? [];
  },
};

export default moduloService;