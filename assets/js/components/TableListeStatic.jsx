import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faGift} from "@fortawesome/free-solid-svg-icons";
import Field from "./forms/Fields";
import SweetAlert from 'react-bootstrap-sweetalert';
import {Link} from "react-router-dom";

const TableListeStatic = ({userSession, auth, hideReservedBtn, liste, itemsListe, handleDeleteReservedGift, handleReservedItem, handleDelete, search, filteredItems, handleSubmit, handleChange, errors, handleSearch, handleAddGift }) => {
    let i = 0;
    const [confirmDeleteItem, setConfirmDeleteItem] = useState(false);
    const [confirmDeleteReservedGift, setConfirmDeleteReservedGift] = useState(false);

    return(
        <div className={"container"}>
            <div className={"row"}>
                <div>
                    <table  className={"table_gift table-responsive table-sm"}>
                        <tbody>
                        {liste.listeItems.map(e =>{
                            i++;
                            return(
                                <tr>
                                    <div>
                                        {i !== 1 && <hr/>}
                                        <p className={"mb-4 mt-4"} key={i} >
                                            <td><img className={"picture_item"} width={"100%"} src={e.item.picture}/></td>
                                            <td width={"600px"}>
                                                <p className={"title_gift"}>{e.item.title}</p>
                                                <p className={"description_gift"}>{e.item.description}</p>
                                                <br/>
                                                <p className={"price_gift"}>{e.item.price} euros</p>
                                                {e.userItem
                                                &&
                                                <>
                                                    {userSession.id === e.userItem.id
                                                    &&
                                                    <div  className={"text-right"}><FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>{e.userItem.firstName} {e.userItem.lastName}
                                                    <button className={"btn"} onClick={() => {handleDeleteReservedGift(e, liste.id)}}><FontAwesomeIcon icon={faBan} color={"red"} size={"lg"}/></button>
                                                    </div>
                                                    }
                                                </>
                                                ||
                                                <>
                                                    {auth &&
                                                        <div className={"text-right"}>
                                                            <button className={"btn btn-sm button_liste text-white"} onClick={() => {handleReservedItem(e, liste.id)}}>
                                                                reserver
                                                            </button>
                                                        </div>

                                                    ||
                                                    <td>
                                                        <button className={"btn btn-sm button_liste text-white"}>
                                                            <Link to={"/login"} className={"text-white"}><span>reserver</span></Link>
                                                        </button>
                                                    </td>
                                                    }
                                                </>
                                                }
                                            </td>

                                            {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}

                                        </p>
                                    </div>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>

    )
};

export default TableListeStatic;