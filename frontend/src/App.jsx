import { useEffect, useState } from "react";
import { useFilters } from './hooks/useFilters';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from './context/carrito';
import Login from './components/Login';
import ListProductWithCarrito from "./components/ListProductWithCarrito";
import ListCompras from "./components/ListCompras";

export default function App() {
  const [products, setProducts] = useState([]);
  const { filterProducts } = useFilters();
  const filteredProducts = filterProducts(products);

  useEffect(() => {
    fetchProducts();
  }, []); // Se ejecuta solo una vez al montar el componente

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/products" element={<ListProductWithCarrito products={filteredProducts} />} />
          <Route path="/compras" element={<ListCompras />}/>
        </Routes>
      </Router>
    </CartProvider>
  );
}
