import { useContext } from "react";
import { CartContext } from "../context/carrito";

export const useCart = () => {
    const context = useContext(CartContext)

    if(context === undefined) {
        throw new Error('useCart debe inicializar a un provider')
    }

    return context
}