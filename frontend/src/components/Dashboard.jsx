const [user, setUser] = useState(null);import  { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  
  const navigateTo = useNavigate()
  useEffect(() => {
    // Obtener el token de autenticación almacenado en localStorage
    const token = localStorage.getItem('token');

    // Verificar si el token existe
    if (token) {
      // Si el token existe, enviar una solicitud al servidor para obtener los detalles del usuario
      axios.get('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // Si la solicitud es exitosa, establecer el estado del usuario con los datos recibidos
        setUser(response.data);
      })
      .catch(error => {
        // Si hay un error en la solicitud, puedes manejarlo aquí
        console.error('Error al obtener los detalles del usuario:', error);
      });
    }
    else {
      navigateTo("/")
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <h2>Información del usuario:</h2>
          <p>Nombre de usuario: {user.username}</p>
          {/* Agrega más campos según la estructura de datos del usuario */}
        </div>
      )}
    </div>
  );
}
