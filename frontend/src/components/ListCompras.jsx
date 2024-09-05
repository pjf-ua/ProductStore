import { useEffect, useState } from "react";
import NavBar from "./NavBar"
import Compras from "./Compras"
import axios from 'axios'
export default function ListCompras() {
    const [user, setUser] = useState([]);
    const [articulos, setArticulos] = useState([]);
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
    useEffect(() => {
        const fetchCompras = async () => {
          try {
            const response = await axios.get(`http://localhost:3000/compras/${user.id}`);
            setArticulos(response.data);
            console.log(articulos)
          } catch (error) {
            console.error("Error al cargar las compras:", error);
          }
        };
        fetchCompras();
      }, [user.id]); // Se ejecuta cada vez que 'user.id' cambia
  return (
    <>
        <NavBar mostrar={false}/>
        {/*<Compras user={user} articulos={articulos}/>*/}
    </>
  )
}
