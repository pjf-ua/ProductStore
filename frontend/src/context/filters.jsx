import { createContext, useState } from "react";
//este se consume
export const FiltersContext = createContext()

//este provee de acceso al contexto
export function FilterProvider({ children }) {
    const [filters, setFilters] = useState({
        category: 'all',
        minPrice: 0
    })
    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}
        >
            {children}
        </FiltersContext.Provider>
    )
}