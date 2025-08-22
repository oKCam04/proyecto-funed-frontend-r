import axiosClient from '../axiosClient';

const personasService = {
  create: async (payload) => {
    // payload: { nombre, apellido, tipoIdentificacion, numeroIdentificacion, fechaNacimiento, correo, telefono }
    const { data } = await axiosClient.post('/api/personas', payload);
    return data; // puede ser { id } o el objeto completo
  },
  // (agrega más métodos si los necesitas)
};

export default personasService;
