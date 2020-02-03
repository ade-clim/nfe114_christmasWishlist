import React,{useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBan, faGift, faTrash} from "@fortawesome/free-solid-svg-icons";
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
                        <table>
                            <tbody>
                                {filteredItems.map(item => <div key={item.id}>
                                    <tr>
                                        <div className={"mt-4 mb-4"}>
                                            <td ><img className={"picture_item"} src={item.picture} width={"100%"}/> </td>
                                            <td className={"info_gift"} width={"400px"}>
                                                {item.idProvisoire}
                                                <p className={"title_gift"}>{item.title}</p>
                                                <p className={"description_gift"}>{item.description}</p>
                                                <p className={"price_gift"}>{item.price} euros</p>
                                            </td>
                                            <td><div className={"btn btn-success btn-sm"} onClick={() => handleAddGift(item)}>Add</div></td>
                                        </div>
                                    </tr>
                                </div>
                                )}
                            </tbody>
                        </table>
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

                                                        <td ><img className={"picture_item"} width={"100%"} src={liste.item.picture}/></td>
                                                        <td className={"info_gift"} width={"400px"}>
                                                            <p className={"title_gift"}>{liste.item.title}</p>
                                                            <p className={"description_gift"}>{liste.item.description}</p>
                                                            <p className={"price_gift"}>{liste.item.price} euros</p>
                                                            <p className={""}><button className={"btn btn-sm button_liste"} onClick={() => handleDelete(liste)}>delete</button></p>
                                                        </td>
                                                        {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}
                                                        {!hideReservedBtn && <>
                                                            {liste.userItem &&
                                                            <td><FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>{liste.userItem.firstName}{liste.userItem.lastName}
                                                                <button  className={"btn btn-sm"} onClick={() => {handleDeleteReservedGift(liste)}}>
                                                                    <FontAwesomeIcon icon={faBan} color={"red"} size={"lg"}/>
                                                                </button>
                                                            </td>
                                                            ||
                                                            <td><button className={"btn btn-sm button_liste text-white"} onClick={() => {handleReservedItem(liste)}}>
                                                                reserver
                                                            </button></td>
                                                            }
                                                        </>}

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
                        <button style={{backgroundColor: "#2bbdc1"}} className={"btn button_liste text-white"} type={"submit"}>Enregistrer</button>
                    </div>
                </form>

            </div>
        </div>
    )
};

export default TableListe;