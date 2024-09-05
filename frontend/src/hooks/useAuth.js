import { useContext } from "react"
import { AuthContext } from "../context/auth"

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(context === undefined) {
    throw new Error('useAuth debe inicializar a un provider')
}

return context
}