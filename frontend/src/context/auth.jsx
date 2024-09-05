import { createContext, useState } from 'react';
import axios from 'axios';

// Creamos un contexto para manejar la autenticación
export const AuthContext = createContext();


// Proveedor de autenticación que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario autenticado
  

  // Función para iniciar sesión
  const login = async (username, password) => {
    try {
      // Realizar la solicitud al endpoint de login
      const response = await axios.post('http://localhost:3000/login', { username, password });

      // Si la solicitud es exitosa, actualizar el estado del usuario con la respuesta del servidor
      setUser(response.data.user);
      console.log(response.data.user)
      // También podrías almacenar el token de autenticación en localStorage si es necesario
    } catch (error) {
      // Si hay un error en la solicitud, manejar el error
      console.error('Error al iniciar sesión:', error.response.data.error);
      throw new Error(error.response.data.error); // Lanzar un error para que el componente que llama a esta función pueda manejarlo
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    // Limpiar la información del usuario al cerrar sesión
    setUser(null);
    // También podrías eliminar el token de autenticación de localStorage si es necesario
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio
    
  };

  // Valor proporcionado por el contexto de autenticación
  const authContextValue = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
