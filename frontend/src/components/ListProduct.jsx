import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import axios from 'axios'

export default function ListProduct({products}) {
/*
    useEffect(() => {
      // Fetch para obtener los productos del endpoint /products
      fetch('http://localhost:3000/products')
        .then(response => response.json())
        .then(data => {
          // Establecer el estado de los productos con los datos obtenidos
          setProducts(data);
        })
        .catch(error => {
          console.error('Error al obtener los productos:', error);
        });
    }, []); */
  return (
    <div className="p-6">
      <ul className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {products.slice(0,12).map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  )
}
