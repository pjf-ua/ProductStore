import { useState } from "react";
import { useId } from "react";
import { useCart } from "../hooks/useCart";
import "./Carrito.css"
import axios from 'axios'

function CartItem({ thumbnail, price, title, quantity, addToCart}) {
  return (
      <li>
      {/*<img src={thumbnail} alt="prodct" />*/}
        <div>
          <strong>{title}</strong> - ${price}
        </div>
        <footer className="items-center justify-center">
          <small>
            Cantidad: {quantity}
          </small>
          <button className="text-2xl" onClick={addToCart}>+</button>
        </footer>
    </li>
  )
}

export default function Carrito({ user }) {
  const cartCheckBoxId = useId()
  const { cart, totalCart, clearCart, addToCart } = useCart()
  const [alerta, setAlerta] = useState(null);

  console.log("useeeer", user)


  const handleCompra = () => {    
      // Realiza la compra de los productos
      cart.forEach(async (product) => {
        try {
          // Realiza la compra del producto actual
          const response = await axios.post('http://localhost:3000/compras', {
            user_id: user.id,
            product_id: product.id,
            quantity: product.quantity
            
          });
          setAlerta(
            <div className="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Compra realizada con éxito</span>
              </div>
            </div>
          );
        } catch (error) {
          console.error('Error al realizar la compra:', error);
          setAlerta(
            <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Error al realizar la compra</span>
              </div>
            </div>
          )
        }
      });
      setAlerta(null)
      // Limpia el carrito después de realizar la compra
      clearCart();
  };
  
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckBoxId}>
        C
      </label>
      <input type="checkbox" id={cartCheckBoxId} className="hidden"/>

      <aside className="cart justify-around">
      <h2 className="text-3xl font-bold underline mb-2">Carrito</h2> 
      {alerta}    
        <ul>
          {cart.map(product => (
            <CartItem 
              key={product.id}
              addToCart={() => addToCart(product)}
              {...product}
            />
          ))}
        </ul>
        <div className="flex justify-between items-center mt-3">
          <div className="bg-gray-500 rounded p-2">Total: ${totalCart.toFixed(2)}</div>
          <button onClick={clearCart} className="rounded bg-red-600 p-2">
            Vaciar
          </button>
        </div>
        <div className="bg-blue-600 mt-2 rounded p-2 items-center justify-center flex">
          <button onClick={handleCompra} className="w-full">
            Comprar
          </button>
          
        </div>
      </aside>
    </>
  );
}
