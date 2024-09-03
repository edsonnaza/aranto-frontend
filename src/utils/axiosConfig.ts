import axios from 'axios';

// Configuración global de axios
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL as string;
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
