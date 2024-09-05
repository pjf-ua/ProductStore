import { createContext, useState } from "react";
import { useEffect } from "react";


export const CartContext = createContext()

export function CartProvider( { children }) {
    const [cart, setCart] = useState([])
    const [totalCart, setTotalCart] = useState(0)

    useEffect(() => {
        // Calcular el total del carrito cada vez que el carrito se actualiza
        const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
        setTotalCart(total)
    }, [cart])
    /*
    const isCartEmpty = () => {
        return cart.length === 0;
    }
    */
    const addToCart = product => {
        //forma sencilla de añadir al carrito
        //setCart([ ...cart, product])
        //checkear si el product esta en el carrito
        const productInCartIndex = cart.findIndex(items => items.id === product.id)

        if(productInCartIndex >= 0) {
            //creamos carrito nuevo
            const newCart = structuredClone(cart)
            newCart[productInCartIndex].quantity += 1
            return setCart(newCart)
        }

        setCart(prevState => ([
            ...prevState,
            {
                ... product,
                quantity: 1
            }
        ]))
    }
    const clearCart = () => {
        setCart([])
    }

    const removeFromCart = product => {
        //ponemos el carrito con lo que teniamos antes
        setCart(prevState => prevState.filter(item => item.id !== product.id))
    }

    return (
        <CartContext.Provider value={{
            cart,
            totalCart,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}