import  { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_URL_BACKEND;

interface User {
  name: string;
  // Puedes agregar más campos si es necesario
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Aquí podrías hacer una solicitud para validar el token y obtener al usuario
      setUser({ name: 'Usuario Ejemplo' });
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/login`, { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user); // Ajusta esto según lo que devuelva tu API
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Aquí podrías manejar errores específicos, como mostrar un mensaje al usuario
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
