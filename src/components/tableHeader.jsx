import React, {useState} from 'react';
import PropTypes from 'prop-types'; // ES6
import {TiArrowSortedDown, TiArrowSortedUp} from "react-icons/ti";

const TableHeader = ({onSort, currentSort, columns}) => {
    const [sortedItem, setSortedItem] = useState(null)
    let isSorted = null
    const handleSort = (item) => {
        console.log('item',item)
        setSortedItem(item)
        console.log('currentSort.iterator ',currentSort.iterator)
        isSorted = currentSort.iterator === item
        if (isSorted) {
            onSort({
                ...currentSort,
                order: currentSort.order === "asc" ? "desc" : "asc",
            })
        } else {
            onSort(
                {
                    iterator: item,
                    order: "asc",
                })
        }
    }
    return (
        <thead>
            <tr>
                {columns && Object.keys(columns).map((column, index) => {
                   return (
                    <th
                        key={index}
                        {...{role: columns[column].iterator && "button"}}
                        onClick={columns[column].iterator ? () => handleSort(columns[column].iterator) : undefined}>
                        {columns[column].name}
                        {sortedItem === columns[column].iterator
                           ? currentSort.order === "asc"
                               ? <TiArrowSortedDown/> //'🔽'
                               : <TiArrowSortedUp/>//'🔼'
                           : ''}
                    </th>)
                })}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired,
}
export default TableHeader;
