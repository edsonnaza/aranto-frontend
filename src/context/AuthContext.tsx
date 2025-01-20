import { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_LOCALURL_BACKEND;

interface User {
  usuario_id: string;
  user_name: string;
  user_lastname: string;
  email: string;
  roles: string;
  inactivo: boolean;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userLocalStorage = localStorage.getItem('user');

    const validateToken = async () => {
      if (token && userLocalStorage) {
        try {
          const response = await axios.get(`${URL}/validate-token`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // Token válido, recupera el usuario del localStorage
          const parsedUser: User = JSON.parse(userLocalStorage);
          setUser(parsedUser);
        } catch (error: any) {
          console.error('Error validando token:', error.response?.data?.message || error.message);
          // Token inválido, realiza logout
          logout();
        }
      }
      setLoading(false);
    };

    validateToken();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/login`, { email, password });
      const { refreshToken, user } = response.data;
      localStorage.setItem('token', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error desconocido');
      console.error('Error al iniciar sesión:', error.response?.data?.message || error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // Opcional: Interceptor global de Axios para manejar errores de token
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn('Token inválido o expirado. Realizando logout...');
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => axios.interceptors.response.eject(interceptor);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
