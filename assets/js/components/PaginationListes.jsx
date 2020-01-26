import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons'


const PaginationListes = ({currentPage, itemsPerPage, length, onPageChanged}) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i =1; i<=pagesCount; i++){
        pages.push(i);
    }

    return(
        <div className={"pagination pagination-listes"}>
            <ul className="pagination pagination-listes pagination-sm">
                <li className={"arrow_left page-item"}>
                    {currentPage !== 1 && <button style={{backgroundColor: "transparent"}} className="page-link" onClick={() => onPageChanged(currentPage - 1)}><FontAwesomeIcon color={"#d4423e"} icon={faArrowAltCircleLeft} size={"6x"} /></button>}
                </li>

                <li className={"arrow_right page-item"}>
                    {currentPage !==  pagesCount &&  <button style={{backgroundColor: "transparent"}} className="page-link" onClick={() => onPageChanged(currentPage + 1)}><FontAwesomeIcon color={"#d4423e"} icon={faArrowAltCircleRight} size={"6x"}/></button>}

                </li>
            </ul>
        </div>
    )
};

PaginationListes.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return (items.slice(start, start + itemsPerPage));
};

export default PaginationListes;