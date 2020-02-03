import React, {useEffect, useState} from 'react';
import userApi from "../services/userApi";
import listeApi from "../services/listeApi";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faGift} from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";
import listeItemsApi from "../services/listeItemsApi";
import TableListeStatic from "../components/TableListeStatic";
import ListeLoader from "../components/loaders/ListeLoader";
import {toast} from "react-toastify";

const ReservationListePage = ({match ,history}) => {
    const {id} = match.params;
    const idUrl = parseInt(id, 10);

    const[loading, setLoading] = useState(true);
    const [auth, setAuth] = useState(false);
    // Recuperation des cadeaux pour affichage dans la liste
    const [itemsListe, setItemsListe] = useState([]);

    // Objet DecoListe pour la base de donnée
    const [decoListe, setDecoListe] = useState({
        id: "",
        wallpaper: "",
        border: "",
        motif: "",
        timbre: ""
    });

    const [updateFetch, setUpdateFetch] = useState(false);


    const [liste, setListe] = useState({
        id:"",
        title: "",
        description: "",
        listeItems: itemsListe,
        decoListe: "",
        user: ""
    });


    const [userSession, setUserSession] = useState({
        firstName: "",
        lastName: "",
        id:""
    });

    // On récupére l'utilisateur en session
    const handleFetchUser = () => {
        const token = window.localStorage.getItem("authToken");
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            setUserSession({firstName: firstName, lastName: lastName, id: id});
            setAuth(true);
        }
    };


    // Permet de recuperer la whishlist ou l'on a reserver un item
    const fetchListe = async() => {
        try {
            // on recuperer les listes par l'id utilisateur
            const {id, title, description, decoListe, listeItems, user} = await listeApi.find(idUrl);
            const myDecoListe = {id: decoListe.id,wallpaper:decoListe.wallpaper , border:decoListe.border, motif:decoListe.motif, timbre: decoListe.timbre};
            setListe({id, title, description, decoListe, user, listeItems});
            setDecoListe(myDecoListe);
            setItemsListe(listeItems);
            setLoading(false);
        } catch (error) {
            console.log(error.response);
        }
    };


    // Supprimer une reservation de cadeaux en fonction de l'id
    const handleDeleteReservedGift = async(listeItem) => {
        console.log(listeItem)
        const originalListes = {...liste};

        for (let p = 0; p < liste.listeItems.length; p++) {
            if (liste.listeItems[p].id === listeItem.id) {
                liste.listeItems[p].userItem = null;
                setListe(liste);
                setUpdateFetch(true);

            }
        };
        try{
            const cancelReservedUser = {...listeItem};
            await listeItemsApi.deleteUserItem(listeItem.id, cancelReservedUser);
            toast.info("Votre réservation est supprimée 🎅");
        }catch(error){
            console.log(error.response);
            setListe(originalListes);
            toast.error("Une erreur est survenue 🎅");
        }
    };


    // Reserve l'item en fonction de l'id de l'utilisateur en session
    const handleReservedItem = async (listeItem) => {
        console.log(listeItem);
        const originalListes = liste;
        const copyModifListes = liste;

        // on recupére l'utilisateur en session dans le state
        const idUserSession = userSession;

        for (let p = 0; p < copyModifListes.listeItems.length; p++) {
            if (copyModifListes.listeItems[p].id === listeItem.id) {
                copyModifListes.listeItems[p].userItem = idUserSession;
                setListe(copyModifListes);
                setUpdateFetch(true);
            }
        }
        try{
            const addReservedUser = {...listeItem, userItem: idUserSession};
            await listeItemsApi.update(listeItem.id, addReservedUser);
            toast.success("Votre cadeaux est réservé 🎅");
        }catch(error){
            console.log(error.response);
            setListe(originalListes);
            toast.error("Une erreur est survenue 🎅");
        }
    };


    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        handleFetchUser();
        fetchListe();
        setUpdateFetch(false);
    },[updateFetch]);

    return (
        <>
            <div className={"container homecontainer"}>
                {loading && <ListeLoader/>}
                <div key={liste.id} className={"container contour-list d-flex"} style={{backgroundColor: decoListe.border}}>
                    <div className={"container col-12 wallpapers-list"} style={{backgroundImage: `url(${decoListe.wallpaper})`}}>
                        {liste.user.id === userSession.id && <div className={"text-right liste_edit"}>
                                <Link to={"/liste/edit/"+ liste.id}>
                                    <span className={"btn"}><FontAwesomeIcon icon={faEdit} color={"white"} size={"2x"}/></span>
                                </Link>
                            </div>
                        }
                        <div className={"container col-lg-6 col-md-10"}>
                            <img src={decoListe.motif} className={"motif"}/>
                        </div>
                        <div className={"container col-8 text-right"}>
                            <img src={decoListe.timbre} className={"timbre"}/>
                        </div>
                        <div className={"container col-11 list"}>
                            <div className={"container info-list"}>
                                <p className={"text-center text-uppercase"}>{liste.title}</p>
                                <p className={"mt-5"}>{liste.description}</p>

                                {/* Boucle pour afficher les cadeaux dans la liste */}
                                <TableListeStatic  userSession={userSession} auth={auth} liste={liste} itemsListe={itemsListe} handleDeleteReservedGift={handleDeleteReservedGift} handleReservedItem={handleReservedItem} > </TableListeStatic>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationListePage;