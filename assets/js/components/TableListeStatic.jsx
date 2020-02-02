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
                    <table className={"table_gift table-responsive table-sm"}>
                        <tbody>
                        {liste.listeItems.map(e =>{
                            i++;
                            return(
                                <>
                                    <div style={{paddingTop: "25px"}}>
                                        {i !== 1 && <hr/>}
                                        <p className={"mb-5 mt-5"} key={i} >

                                            <td><img className={"picture_item"} width={"100%"} src={e.item.picture}/></td>
                                            <td className={"info_gift"} width={"400px"}>
                                                <p className={"title_gift"}>{e.item.title}</p>
                                                <p className={"description_gift"}>{e.item.description}</p>
                                                <p className={"price_gift"}>{e.item.price} euros</p></td>

                                            {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}

                                            {e.userItem &&
                                            <td>

                                                <FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>
                                                {e.userItem.firstName} {e.userItem.lastName}

                                                {userSession.id === e.userItem.id

                                                &&
                                                <>

                                                        <span className={"btn"} onClick={() => {setConfirmDeleteReservedGift(true)}}>
                                                            <FontAwesomeIcon icon={faBan} color={"red"} size={"lg"}/>
                                                        </span>



                                                    {confirmDeleteReservedGift &&
                                                    <SweetAlert
                                                        info
                                                        showCancel
                                                        confirmBtnText="Oui"
                                                        confirmBtnBsStyle="danger"
                                                        btnSize="xs"
                                                        title="Supprimer la réservation ?"
                                                        onConfirm={() => {{handleDeleteReservedGift(e, liste.id), setConfirmDeleteReservedGift(false)}}}
                                                        onCancel={() => {setConfirmDeleteReservedGift(true)}}
                                                        focusCancelBtn
                                                    >
                                                        Oh oh oh
                                                    </SweetAlert>
                                                    }

                                                </>
                                                }
                                            </td>
                                            ||
                                            <>
                                                {auth &&
                                                <td>
                                                    <button className={"btn btn-sm button_liste text-white"} onClick={() => {handleReservedItem(e, liste.id)}}>
                                                        reserver
                                                    </button>
                                                </td>
                                                ||
                                                <td>
                                                    <button className={"btn btn-sm button_liste text-white"}>
                                                        <Link to={"/login"} className={"text-white"}><span>reserver</span></Link>
                                                    </button>
                                                </td>
                                                }
                                            </>
                                            }
                                        </p>
                                    </div>
                                </>
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