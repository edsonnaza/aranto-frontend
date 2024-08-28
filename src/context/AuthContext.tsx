import  { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

//const URL = import.meta.env.VITE_URL_BACKEND;
const URL = import.meta.env.VITE_LOCALURL_BACKEND;

interface User {
  name: string;
  // Puedes agregar más campos si es necesario
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error:string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userLocalStorage   = localStorage.getItem('User') 
    if (token && userLocalStorage) {
      // Aquí podrías hacer una solicitud para validar el token y obtener al usuario
      const parsedUser: User = JSON.parse(userLocalStorage);
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${URL}/login`, { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('User',user)
      setUser(user); // Ajusta esto según lo que devuelva tu API
      
    } catch (error:any) {
      if (error.response && error.response.data) {
        setError(error.response.data.message)
        console.error('Error al iniciar sesión:', error.response.data.message);

      } else {
        console.error('Error desconocido:', error);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login,logout}}>
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
