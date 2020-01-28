import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import PaginationListes from "../components/PaginationListes";
import listeApi from "../services/listeApi";
import listeItemsApi from "../services/listeItemsApi";
import userApi from '../services/userApi'
import jwtDecode from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'



const ListesPage = ({match, history}) => {
    const {id} = match.params;
    const idUrl = parseInt(id, 10);
    let i = 0;

    const [userSession, setUserSession] = useState({
        firstName: "",
        lastName: "",
        id:""
    });
    const [auth, setAuth] = useState(false);

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
    const fetchListes = async () => {
        try {
            // on recuperer les listes par l'id utilisateur
            const data = await userApi.findAllByUserId(idUrl);
            setListes(data);

        }catch (error) {
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
            console.log(addReservedUser)
            await listeItemsApi.update(listeItem.id, addReservedUser);
        }catch(error){
            console.log(error.response);
            setListes(originalListes);
        }
    }


    return(
        <>

            <div className={"container-fluid"}>
                <PaginationListes currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredListes.length} onPageChanged={handlePageChange}/>
            </div>
            <div className={"container homecontainer"}>
                <div className={"form-group col-8"}>
                    <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
                </div>


                {paginatedListes.map(liste => <>
                    <div key={liste.id} className={"container contour-list d-flex"} style={{backgroundColor: liste.decoListe.border}}>
                        <div className={"container col-12 wallpapers-list"} style={{backgroundImage: `url(${liste.decoListe.wallpaper})`}}>
                            <div className={"container col-lg-6 col-md-10"}>
                                <img src={liste.decoListe.motif} className={"motif"}/>
                            </div>
                            <div className={"container col-11 list"}>
                                <div className={"container info-list"}>
                                    <p className={"text-center"}>{liste.title}</p>
                                    <p className={"mt-5"}>{liste.description}</p>

                                    {liste.listeItems.map(e =>{
                                        i++;
                                    return(<>
                                        {i !== 1 && <hr/>}
                                        <p className={"mt-5 mb-5"} key={i}>
                                            {i}
                                            <img src={e.item.picture}/>
                                            {e.item.title}
                                            {e.item.description}
                                            {e.item.price}

                                            {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}
                                            {e.userItem &&
                                                <span className={"ml-5"}>
                                                    <FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>
                                                    {e.userItem.firstName}{e.userItem.lastName}
                                                    {userSession.id === e.userItem.id && <button onClick={() => {handleDeleteReservedGift(e, liste.id)}}>X</button>}
                                                </span>
                                             ||
                                                <>
                                                    {auth &&
                                                        <button className={"btn btn-sm button_liste text-white"} onClick={() => {handleReservedItem(e, liste.id)}}>
                                                            reserver
                                                        </button>
                                                    ||
                                                    <button className={"btn btn-sm button_liste text-white"}>
                                                        <Link to={"/login"} className={"text-white"}><span>reserver</span></Link>
                                                    </button>
                                                    }
                                                </>
                                            }



                                        </p>
                                        </>)})}

                                </div>

                            </div>

                        </div>
                    </div>


                    </>)}

            </div>
        </>
    )
}

export default ListesPage;