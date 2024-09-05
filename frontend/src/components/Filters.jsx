import { useState, useId } from 'react'
import { useFilters } from '../hooks/useFilters'

export default function Filters() {
    const { filters, setFilters } = useFilters()

    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState,
            category: event.target.value
        }))
    }
  return (
    <section className='flex items-center justify-center gap-6 p-4'>
        <div>
            <label htmlFor={minPriceFilterId}>Precio a partir de: </label>
            <input 
                type="range"
                id={minPriceFilterId}
                min='0'
                max='1000'
                onChange={handleChangeMinPrice}
                value={filters.minPrice}
            />
            <span>${filters.minPrice}</span>
        </div>

        <div>
            <label htmlFor={categoryFilterId}>Categoria</label>
            <select className='mx-3' id={categoryFilterId} onChange={handleChangeCategory}>
                <option value="all">Todas</option>
                <option value="laptops">Portatiles</option>
                <option value="smartphones">Moviles</option>
            </select>
            
        </div>
    </section>
  )
}
