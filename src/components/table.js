import  React from 'react';
import { useTable, useSortBy } from 'react-table'
import {FiChevronDown} from 'react-icons/fi'
import {FiChevronUp} from 'react-icons/fi'




const Table = ({columns, data})=>{
    const { 
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow} = useTable({ columns, data }, useSortBy,)
    
return(
    <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                   <span> {column.render('Header')}</span>
                   <span style={{float:'right'}}>
                   {column.isSortedDesc ? (
                    <FiChevronDown />
                   ):(
                    <FiChevronUp/>
                   )}
                   </span>

                </th>
                ))}
                </tr>
            ))}
            </thead>
            <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row)
                return (
                    <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                        return (
                        <td
                            {...cell.getCellProps()}
                        >
                            {cell.render('Cell')}
                        </td>
                        )
                    })}
                    </tr>
        )
         })}
            </tbody>
         </table>
)
}
export default Table