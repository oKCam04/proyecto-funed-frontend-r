import axiosClient from '../api/axiosClient';

const cursosService = {
  list: async (params) => {
    const { data } = await axiosClient.get('/cursos', { params });
    return data;
  },
  getById: async (id) => {
    const { data } = await axiosClient.get(`/cursos/${id}`);
    return data;
  },
  create: async (payload) => {
    const { data } = await axiosClient.post('/cursos', payload);
    return data;
  },
  update: async (id, payload) => {
    const { data } = await axiosClient.put(`/cursos/${id}`, payload);
    return data;
  },
  remove: async (id) => {
    const { data } = await axiosClient.delete(`/cursos/${id}`);
    return data;
  },
};

export default cursosService;
