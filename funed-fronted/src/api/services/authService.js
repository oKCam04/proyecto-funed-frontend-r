import axiosClient from '../axiosClient';

const authService = {
  login: async (email, password) => {
    const { data } = await axiosClient.post('/auth/login', { email, password });
    return data; // { token, user: { persona } }
  },

  register: async ({ id_persona, email, password }) => {
    const { data } = await axiosClient.post('/auth/register', {
      id_persona,
      email,
      password,
    });
    return data; // estructura que devuelva tu backend
  },
};

export default authService;
