import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogged, setIsLogged] = useState(false);

  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Realizar la solicitud al endpoint de login
      const response = await axios.post('http://localhost:3000/login', { username, password });

      // Si la solicitud es exitosa, imprimir el token de autenticación
      console.log('Token de autenticación:', response.data.token);
        setIsLogged(true)
        localStorage.setItem('token', response.data.token);
        navigateTo("/products")
      // Lógica adicional después del login exitoso (por ejemplo, redirección a otra página)
    } catch (error) {
      // Si hay un error en la solicitud, manejar el error
      console.error('Error al iniciar sesión:', error.response.data.error);
      setError(error.response.data.error);
    }
  };


  useEffect(() => {
    if(!isLogged) {
      navigateTo('/')
    }
  },[])

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="bg-white w-full md:w-2/5 p-9 rounded-lg flex justify-center flex-col shadow-xl">
        <div className="mb-5">
          <label htmlFor="username" className="block text-gray-700 uppercase font-bold">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div className="mb-5">
          <label htmlFor="password" className="block text-gray-700 uppercase font-bold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <input
          type="submit"
          value="Login"
          className="bg-yellow-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  );
}
