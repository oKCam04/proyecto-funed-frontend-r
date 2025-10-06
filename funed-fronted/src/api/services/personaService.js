import axiosClient from '../axiosClient';

const personasService = {
  list: async (params) => {
    const { data } = await axiosClient.get('/api/personas', { params });
    return data;
  },
  create: async (payload) => {
    // payload: { nombre, apellido, tipoIdentificacion, numeroIdentificacion, fechaNacimiento, correo, telefono }
    const { data } = await axiosClient.post('/api/personas', payload);
    return data; // puede ser { id } o el objeto completo
  },
  getById: async (id) => {
    const { data } = await axiosClient.get(`/api/personas/${id}`);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await axiosClient.patch(`/api/personas/${id}`, payload);
    return data;
  },
};

export default personasService;
