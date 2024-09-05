import Filters from "./Filters";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function NavBar({mostrar}) {
  const navigateTo = useNavigate();
  

  const handleLogout = () => {
    // Eliminar el token de autenticación del localStorage
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio
    navigateTo('/');
  };

  return (
    <header>
        <nav className="flex w-full justify-center bg-green-400 p-4">
        <ul className="flex gap-3 items-center">
            <li>
                <Link to="/products">Buscar productos</Link>
            </li>
            <li>
                <Link to="/compras">Compras realizadas</Link>
            </li>
            <li>
                <button onClick={handleLogout} className="text-white px-3 py-2 rounded-md bg-black">
                  Cerrar sesión
                </button>
            </li>
        </ul>
      </nav>
      {mostrar ? 
        <Filters />
        :
        <></>
      }
    </header>
  )
}
