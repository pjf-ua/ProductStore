
export default function Articulos({articulo}) {
  return (
    <tr className="bg-white dark:bg-gray-800">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {articulo.title}
        </th>
        <td className="px-6 py-4">
            {articulo.quantity}
        </td>
        <td className="px-6 py-4">
            {articulo.price}
        </td>
    </tr>
  )
}
