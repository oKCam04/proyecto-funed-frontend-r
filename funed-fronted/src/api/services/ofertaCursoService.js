import axiosClient from '../axiosClient';

const ofertaCursoService = {
  list: async (params) => {
    const { data } = await axiosClient.get('/api/ofertaCursos', { params });
    return data;
  },
  getById: async (id) => {
    const { data } = await axiosClient.get(`/api/ofertaCursos/${id}`);
    return data;
  },
  create: async (payload) => {
    const { data } = await axiosClient.post('/api/ofertaCursos', payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await axiosClient.put(`/api/ofertaCursos/${id}`, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await axiosClient.delete(`/api/ofertaCursos/${id}`);
    return data;
  },
};

export default ofertaCursoService;
