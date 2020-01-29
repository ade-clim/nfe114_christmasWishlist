import React, {useEffect, useState} from 'react';
import userApi from "../services/userApi";
import listeApi from "../services/listeApi";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faGift} from "@fortawesome/free-solid-svg-icons";
import jwtDecode from "jwt-decode";

const ReservationListePage = ({match ,history}) => {
    const {id} = match.params;
    const idUrl = parseInt(id, 10);

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


    const [liste, setListe] = useState({
        id:"",
        title: "",
        description: "",
        itemsListe: "",
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
            setListe({id, title, description, decoListe, user});
            setDecoListe(myDecoListe);
            setItemsListe(listeItems);
        } catch (error) {
            console.log(error.response);
        }
    };


    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        handleFetchUser();
        fetchListe();
    },[]);

    return (
        <>
            <div className={"container homecontainer"}>
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
                                {itemsListe.map(e =>
                                    <div className={"mt-5 mb-5"}>
                                        <img src={e.item.picture}/>
                                        {e.item.title}
                                        {e.item.description}
                                        {e.item.price}

                                        {/* si le cadeau est reserver alors afficher l'utilisateur et cacher le button de reservation */}
                                        {e.userItem &&
                                        <span className={"ml-5"}>
                                                <FontAwesomeIcon color={"green"} icon={faGift} size={"lg"}/>
                                            {e.userItem.firstName}{e.userItem.lastName}
                                            {userSession.id === e.userItem.id &&
                                            <button>X</button>}
                                        </span>
                                        ||
                                        <>
                                            {auth && <button className={"btn btn-sm button_liste text-white"}>
                                                reserver
                                            </button>
                                            ||
                                            <button className={"btn btn-sm button_liste text-white"}>
                                                <Link to={"/liste/new"} className={"text-white"}><span>reserver</span></Link>
                                            </button>
                                            }
                                            </>
                                        }
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationListePage;