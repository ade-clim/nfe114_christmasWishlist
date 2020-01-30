import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGift} from "@fortawesome/free-solid-svg-icons";
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
                <div className={"col-12"}>
                    <table className={"table_gift table-responsive table-sm"}>
                        <tbody>
                        {liste.listeItems.map(e =>{
                            i++;
                            return(
                                <>
                                    {i !== 1 && <hr/>}
                                    <p className={"mt-5 mb-5"} key={i}>
                                        <td scope={"row"}>{i}</td>
                                        <td><img className={"picture_item"} width={"100%"} src={e.item.picture}/></td>
                                        <td>{e.item.title} <br/> {e.item.description}</td>
                                        <td>{e.item.price} euros</td>

                                        {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}

                                        {e.userItem &&
                                        <td><FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>{e.userItem.firstName}{e.userItem.lastName}
                                            {userSession.id === e.userItem.id
                                            &&
                                            <>
                                                <button onClick={() => {setConfirmDeleteReservedGift(true)}}>
                                                    X
                                                </button>

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