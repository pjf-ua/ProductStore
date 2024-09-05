import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Carrito from './Carrito';
import ListProduct from './ListProduct';
import axios from 'axios'

export default function ListProductWithCarrito({ products }) {
    const [user, setUser] = useState([]);
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
    }, []);
    
    return (
      <>
        <NavBar mostrar={true}/>
        <ListProduct products={products} />
        <Carrito user={user} />
      </>
    );
  }
