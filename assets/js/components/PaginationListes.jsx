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
        <div className={"container-fluid"}>
            <div className={"pagination-listes"} style={{width: "99%"}}>
                <ul className="pagination pagination-sm">
                    <div className={"row col-12 justify-content-around"}>
                            <div className={"col-8"}>
                                <li>
                                    {currentPage !== 1 && <button style={{backgroundColor: "transparent"}} className="page-link" onClick={() => onPageChanged(currentPage - 1)}><FontAwesomeIcon color={"#d4423e"} icon={faArrowAltCircleLeft} size={"6x"} /></button>}
                                </li>
                            </div>

                            <div >
                                <li >
                                    {currentPage !==  pagesCount &&  <button style={{backgroundColor: "transparent"}} className="page-link " onClick={() => onPageChanged(currentPage + 1)}><FontAwesomeIcon color={"#d4423e"} icon={faArrowAltCircleRight} size={"6x"}/></button>}
                                </li>
                            </div>
                    </div>
                </ul>



            </div>
        </div>

    )
};

PaginationListes.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return (items.slice(start, start + itemsPerPage));
};

export default PaginationListes;