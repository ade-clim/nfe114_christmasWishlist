import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PaginationListes from "../components/PaginationListes";
import listeApi from "../services/listeApi";
import listeItemsApi from "../services/listeItemsApi";
import userApi from '../services/userApi'
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faGift } from '@fortawesome/free-solid-svg-icons';
import santaGift from "../../img/santa/santa_gift.png";
import SweetAlert from "react-bootstrap-sweetalert";
import TableListeStatic from "../components/TableListeStatic";



const ListesPage = ({match, history}) => {
    const {id} = match.params;
    const idUrl = parseInt(id, 10);
    let i = 0;

    const [confirmDeleteReservedGift, setConfirmDeleteReservedGift] = useState(false);
    const [userSession, setUserSession] = useState({
        firstName: "",
        lastName: "",
        id:""
    });
    const [auth, setAuth] = useState(false);

    const [up, setUp] = useState(false);
    const [listes, setListes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 1;



    // On récupére l'utilisateur en session
    const handleFetchUser = () => {
        const token = window.localStorage.getItem("authToken");
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            setUserSession({firstName: firstName, lastName: lastName, id: id});
            setAuth(true);
        }
    };


    // Permet de recuperer les wishlist lié à l'user en session (voir dossier doctrine)
    const fetchListes = async() => {
        try {
            // on recuperer les listes par l'id utilisateur
            const data = await userApi.findAllByUserId(idUrl);
            setListes(data);
            if(data.length === 0){
                setUp(true);
            }
        } catch (error) {
            console.log(error.response);
        }
    };


    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        fetchListes();
        handleFetchUser();

    },[]);


    // Supprimer une liste en fonction de l'id
    const handleDelete = async (id)=>{
        const originalListes = [...listes];
        setListes(listes.filter(liste => liste.id !== id));

        try {
            await listeApi.delete(id);
        }catch (error) {
            console.log(error.response);
            setListes(originalListes);
        }
    };

    // Gestion du changement de page
    const handlePageChange = (page) => setCurrentPage(page);

    // Gestion de la recherche
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
        setCurrentPage(1);
    };

    // Filtrage des categories en fonction de la recherche
    const filteredListes = listes.filter(
        c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
            );

    // PaginationListes des données
    const paginatedListes = PaginationListes.getData(filteredListes, currentPage, itemsPerPage);


    // Supprimer une reservation de cadeaux en fonction de l'id
    const handleDeleteReservedGift = async(listeItem, listeId) => {
        const originalListes = [...listes];
        const copyModifListes = [...listes];

        for(let i = 0; i < copyModifListes.length; i++) {
            if (copyModifListes[i].id === listeId) {

                for (let p = 0; p < copyModifListes[i].listeItems.length; p++) {
                    if (copyModifListes[i].listeItems[p].id === listeItem.id) {
                        originalListes[i].listeItems[p].userItem = null;
                        setListes(copyModifListes);
                    }
                }
            }
        };
        try{
            const cancelReservedUser = {...listeItem, userItem: userSession};
            await listeItemsApi.deleteUserItem(listeItem.id, cancelReservedUser);

        }catch(error){
            console.log(error.response);
            setListes(originalListes);
        }
    };



    // Reserve l'item en fonction de l'id de l'utilisateur en session
    const handleReservedItem = async (listeItem, listeId) => {
        const originalListes = [...listes];
        const copyModifListes = [...listes];

        // on recupére l'utilisateur en session dans le state
        const idUserSession = userSession;

        for(let i = 0; i < copyModifListes.length; i++) {
            if (copyModifListes[i].id === listeId) {
                for (let p = 0; p < copyModifListes[i].listeItems.length; p++) {
                    if (copyModifListes[i].listeItems[p].id === listeItem.id) {
                        originalListes[i].listeItems[p].userItem = idUserSession;
                        setListes(copyModifListes);
                    }
                }
            }
        };
        try{
            const addReservedUser = {...listeItem, userItem: idUserSession};
            await listeItemsApi.update(listeItem.id, addReservedUser);
        }catch(error){
            console.log(error.response);
            setListes(originalListes);
        }
    };


    return(<>
        {!up && <div>
            <div className={"container-fluid"}>
                <PaginationListes currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredListes.length} onPageChanged={handlePageChange}/>
            </div>


            <div className={"container homecontainer"}>
                {listes.length > 1  && <div className={"col-9"}>
                    <p><input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/></p>
                </div>}
                {paginatedListes.map(liste => <>
                    <div key={liste.id} className={"container contour-list d-flex"} style={{backgroundColor: liste.decoListe.border}}>
                        <div className={"container col-12 wallpapers-list"} style={{backgroundImage: `url(${liste.decoListe.wallpaper})`}}>
                            {liste.user.id === userSession.id && <div className={"text-right liste_edit"}>
                                <Link to={"/liste/edit/"+ liste.id}>
                                    <button className={"btn btn-sm bg-white"}><FontAwesomeIcon icon={faEdit} color={"gray"} size={"2x"}/></button>
                                </Link>
                            </div>}
                            <div className={"container col-lg-6 col-md-10"}>
                                <img src={liste.decoListe.motif} className={"motif"}/>
                            </div>
                            <div className={"container col-8 text-right"}>
                                <img src={liste.decoListe.timbre} className={"timbre"}/>
                            </div>
                            <div className={"container col-11 list"}>
                                <div className={"container info-list"}>
                                    <p style={{marginTop: "35px"}} className={"text-center text-uppercase"}>{liste.title}</p>
                                    <p style={{marginTop: "65px"}} className={"ml-3"}>{liste.description}</p>


                                    {liste.listeItems.length === 0 &&
                                        <div className={"text-center mt-5 "}>
                                            <div className={"no_gift"}>
                                                <h6>Aucun cadeaux pour l'instant</h6>
                                                <img src={santaGift}/>
                                            </div>

                                        </div>

                                    ||
                                    <>
                                        {/* Boucle pour afficher les cadeaux dans la liste */}
                                        <TableListeStatic  userSession={userSession} auth={auth} handleSearch={handleSearch}  liste={liste} itemsListe={liste.itemsListe} handleDelete={handleDelete} handleDeleteReservedGift={handleDeleteReservedGift} handleReservedItem={handleReservedItem} filteredItems={filteredListes} search={search}> </TableListeStatic>
                                    </>
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
        </div>
        ||
        <div className={"container homecontainer"}>
            <div className={"reservation_fond"} >
                <div className={"text-center"}>
                    <p style={{fontSize: "1.1em"}}>Vous n'avez pas encore crée de liste</p>
                    <Link to={"/liste/new"}><button className={"btn button_liste text-white"}>Crée une liste</button></Link>
                </div>
                <div className={"liste_santa_gift"}>
                    <img src={santaGift}/>
                </div>
            </div>
        </div>
        }
        </>
    )
}

export default ListesPage;