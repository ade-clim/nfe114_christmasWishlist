import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGift} from "@fortawesome/free-solid-svg-icons";
import Field from "./forms/Fields";
import SweetAlert from 'react-bootstrap-sweetalert';

const TableListe = ({hideReservedBtn, liste, itemsListe, handleDeleteReservedGift, handleReservedItem, handleDelete, search, filteredItems, handleSubmit, handleChange, errors, handleSearch, handleAddGift }) => {
    let i = 0;
    const [confirmDeleteItem, setConfirmDeleteItem] = useState(false);
    const [confirmDeleteReservedGiftGift, setConfirmDeleteReservedGiftGift] = useState(false);

    return(
        <div className={"container col-11 list"}>
            <div className={"container info-list"}>
                <form onSubmit={handleSubmit}>
                    <Field name={"title"}
                           placeholder={"Titre de ma liste"}
                           onChange={handleChange}
                           value={liste.title}
                           error={errors.title}
                           supp={"inputTransparent text-center text-uppercase"}
                    />
                    <Field name={"description"}
                           placeholder={"Description de ma liste"}
                           onChange={handleChange}
                           value={liste.description}
                           error={errors.description}
                           supp={"inputTransparent"}
                    />
                    <div className={"form-group text-center"}>
                        <input type={"text"} onChange={handleSearch} value={search} className={"form-control col-4"} placeholder={"Rechercher vos cadeaux"}/>
                    </div>

                    {/* Boucle pour afficher la selection de cadeaux disponible */}
                    {search.length !== 0 &&  <>
                        {filteredItems.map(item => <div key={item.id}>
                                <img src={item.picture}/> {item.title} {item.description} {item.price}
                                <div className={"btn btn-success btn-sm"} onClick={() => handleAddGift(item)}>Add</div>
                            </div>
                        )}
                    </>}

                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-12"}>
                                <table className={"table_gift table-responsive table-sm"}>
                                    <tbody>
                                    {itemsListe.map(liste =>{
                                        i++;
                                        return(<>
                                                {i !== 1 && <hr/>}
                                                <div className={"mt-5 mb-5"}>
                                                    <tr>
                                                        <td scope={"row"}>{i}<span hidden >{liste.item.idProvisoire = i}</span></td>
                                                        <td ><img className={"picture_item"} width={"100%"} src={liste.item.picture}/></td>
                                                        <td>{liste.id}{liste.item.title} <br/> {liste.item.description}</td>
                                                        <td>{liste.item.price} euros</td>

                                                        {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}
                                                        {!hideReservedBtn && <>
                                                            {liste.userItem &&
                                                            <td ><FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>{liste.userItem.firstName}{liste.userItem.lastName}
                                                                <button onClick={() => {setConfirmDeleteReservedGiftGift(true)}}>
                                                                    X
                                                                </button>

                                                                {confirmDeleteReservedGiftGift &&
                                                                <SweetAlert
                                                                    info
                                                                    showCancel
                                                                    confirmBtnText="Oui"
                                                                    confirmBtnBsStyle="danger"
                                                                    btnSize="xs"
                                                                    title="Supprimer la réservation ?"
                                                                    onConfirm={() => {{handleDeleteReservedGift(liste), setConfirmDeleteReservedGiftGift(false)}}}
                                                                    onCancel={() => {setConfirmDeleteReservedGiftGift(false)}}
                                                                    focusCancelBtn
                                                                >
                                                                    Oh oh oh
                                                                </SweetAlert>
                                                                }
                                                            </td>
                                                            ||
                                                            <td><button className={"btn btn-sm button_liste text-white"} onClick={() => {handleReservedItem(liste)}}>
                                                                reserver
                                                            </button></td>
                                                            }
                                                        </>}

                                                        <td>
                                                            <button className={"btn btn-danger btn-sm"} onClick={() => setConfirmDeleteItem(true)}>
                                                                Delete{liste.id}
                                                            </button>

                                                            {confirmDeleteItem &&
                                                            <>

                                                                {liste.id}
                                                                <SweetAlert
                                                                    danger
                                                                    showCancel
                                                                    confirmBtnText="Oui"
                                                                    confirmBtnBsStyle="danger"
                                                                    btnSize="xs"
                                                                    title="Supprimer le cadeaux?"
                                                                    onConfirm={() => {{handleDelete(liste), setConfirmDeleteItem(false)}}}
                                                                    onCancel={() => {setConfirmDeleteItem(false)}}
                                                                    focusCancelBtn
                                                                >
                                                                    Oh oh oh
                                                                </SweetAlert>
                                                            </>


                                                            }

                                                        </td>
                                                        <td><button className={"btn btn-danger btn-sm"} onClick={() => handleDelete(liste)}>ddd</button></td>
                                                    </tr>
                                                </div>
                                            </>
                                        )
                                    })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    <div className={"form-group text-center mt-5"}>
                        <button className={"btn button_liste text-white"} type={"submit"}>Enregistrer</button>
                    </div>
                </form>

            </div>
        </div>
    )
};

export default TableListe;