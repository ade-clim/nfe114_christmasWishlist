import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Fields";
import itemApi from "../services/itemApi";
import listeApi from "../services/listeApi";
import decoListeApi from "../services/decoListeApi";
import listeItemsApi from "../services/listeItemsApi";
import SweetAlert from 'react-bootstrap-sweetalert';
import {toast} from "react-toastify";
//Wallpapers
import Bow from '../../img/listes/wallpapers/Bow.png';
import Ice from '../../img/listes/wallpapers/Ice.png';
import Snow from '../../img/listes/wallpapers/Snow.png';
import Stars from '../../img/listes/wallpapers/Stars.png';
import Trees from '../../img/listes/wallpapers/Trees.png';
//Motifs
import rennes from "../../img/listes/motifs/rennes.png";
import rennesfull from '../../img/listes/motifs/rennesfull.png';
import santaclaus from '../../img/listes/motifs/santaclaus.png';
import rennes02 from '../../img/listes/motifs/rennes02.png';
//Timbres
import timbre01 from '../../img/listes/timbres/timbre01.png';
import timbre02 from '../../img/listes/timbres/timbre02.png';
import timbre03 from '../../img/listes/timbres/timbre03.png';
import timbre04 from '../../img/listes/timbres/timbre04.png';
import timbre05 from '../../img/listes/timbres/timbre05.png';
import timbre06 from '../../img/listes/timbres/timbre06.png';

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faGift, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import TableListe from "../components/TableListe";
import jwtDecode from "jwt-decode";
import DecoListe from "../components/DecoListe";
import ListeLoader from "../components/loaders/ListeLoader";

const ListeEditPage = ({match, history}) => {

    const {id} = match.params;
    const idUrl = parseInt(id, 10);

    const[loading, setLoading] = useState(true);
    let i = 0;
    const [borderColor, setBorderColor] = useState("");
    const [wallpaper, setWallpaper] = useState();
    const [motif, setMotif] = useState();
    const [timbre, setTimbre] = useState();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    const [updateFetch, setUpdateFetch] = useState(false);
    // Recuperation des cadeaux pour affichage dans la liste
    const [itemsListe, setItemsListe] = useState([]);

    const [confirmDeleteListe, setConfirmDeleteListe] = useState(false);


    const [userSession, setUserSession] = useState({
        firstName: "",
        lastName: "",
        id:""
    });
    // Objet DecoListe pour la base de donnée
    const [decoListe, setDecoListe] = useState({
        id: "",
        wallpaper: wallpaper,
        border: borderColor,
        motif: motif,
        timbre: timbre
    });

    // Objet Liste pour la base de donnée
    const [liste, setListe] = useState({
        title: "",
        description: "",
        decoListe: "",
        listeItems: "",
        user: ""
    });

    // Recuperation pour affichage des erreurs formulaires
    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });

    // Va nous permettre de verifier si modification ou création
    const [editing, setEditing] = useState(false);


    // On récupére l'utilisateur en session et on vérifie si il correspond à l'utilisateur proprietaire de la liste
    const handleFetchUser = (user) => {
        const token = window.localStorage.getItem("authToken");
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            setUserSession({firstName: firstName, lastName: lastName, id: id});
            if(user.id !== id){
                history.replace("/");
            }
        }
    };

    // Recuperation de la liste en cours de modification
    const fetchList = async (idEditListe) => {
        try {
            const {id, title, description, decoListe, listeItems, user} = await listeApi.find(idEditListe);
            const myDecoListe = {id: decoListe.id,wallpaper:decoListe.wallpaper , border:decoListe.border, motif:decoListe.motif, timbre: decoListe.timbre};
            setListe({id, title, description, decoListe, listeItems, user});
            setDecoListe(myDecoListe);
            setItemsListe(listeItems);
            setLoading(false);
            // verif securité
            handleFetchUser(user);

        }catch (error) {
            console.log(error.response);

        }
    };

    useEffect(() => {
        fetchList(id);
        handleItems();
        setUpdateFetch(false);
    }, [updateFetch]);





    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setListe({...liste, [name]: value});
    };



    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const listeSend = {decoListe : decoListe, title: liste.title, description: liste.description};
            await listeApi.update(liste.id, listeSend);
            toast.success("Votre liste est modifié 🎅");
            setErrors({});

        }catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Une erreur est survenue 🎅");
            }
        }
    };

    // Gestion de la recherche
    const handleSearch = (event) => {
        const value = event.currentTarget.value;
        setSearch(value);
    };

    // Filtrage des items en fonction de la recherche
    const filteredItems = items.filter(
        c =>
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase()) ||
            c.price.toLowerCase().includes(search.toLowerCase())
    );

    // Recuperation de la liste des items
    const handleItems = async () => {
        const data = await itemApi.findAll();
        setItems(data);
    };


    // On supprime le cadeaux dans la liste, on utilise une id provisoire (cpt) pour eviter de supprimer les produits avec la meme id (produit identique)
    const handleDelete = async (listeItem) => {
        const originalItemsListe = [...itemsListe];
        setItemsListe(itemsListe.filter(item => item.id !== listeItem.id));

        try{
            await listeItemsApi.deleteListeItem(listeItem.id);
            toast.info("Votre cadeaux est supprimée 🎅");
        }catch (error) {
            console.log(error.response);
            setItemsListe(originalItemsListe);
            toast.error("Une erreur est survenue 🎅");
        }
    };


    // on ajoute l'item en local puis en base de donnée
    const handleAddGift = async(item) => {
        const gift = {item, idProvisoire: 0};
        setItemsListe([...itemsListe, gift]);

        const listeItemAdd = {liste, item};

        setSearch("");
        try{
            await listeItemsApi.createListeEditPage(listeItemAdd);
            toast.success("Votre cadeaux est ajouter 🎅");
        }catch(error){
            console.log(error.response);
            toast.error("Une erreur est survenue 🎅");
        }
        setUpdateFetch(true);
    };



    const wallpaperStyle = {
        backgroundImage: `url(${decoListe.wallpaper})`
    };

    const borderStyle = {
        backgroundColor: `${decoListe.border}`
    };


    const handleChangeWallpaper = async(value) => {
        setDecoListe({...decoListe, wallpaper:value})
        setWallpaper(value);
        const wallpaperUpdate = {...decoListe, wallpaper:value};
        try{
            await decoListeApi.update(decoListe.id, wallpaperUpdate);
        }catch(error){
            console.log(error)
        }


    };

    const handleChangeBorder = async(value) => {
        setDecoListe({...decoListe, border:value});
        setBorderColor(value);
        const borderUpdate = {...decoListe, border:value};
        try{
            await decoListeApi.update(decoListe.id, borderUpdate);
        }catch(error){
            console.log(error)
        }
    };

    const handleChangeMotif = async(value) => {
        setDecoListe({...decoListe, motif:value});
        setMotif(value);
        const motifUpdate = {...decoListe, motif:value};
        try{
            await decoListeApi.update(decoListe.id, motifUpdate);
        }catch(error){
            console.log(error)
        }

    };
    const handleChangeTimbre = async(value) => {
        setDecoListe({...decoListe, timbre:value});
        setTimbre(value);
        const timbreUpdate = {...decoListe, timbre:value};
        try{
            await decoListeApi.update(decoListe.id, timbreUpdate);
        }catch(error){
            console.log(error)
        }
    };



    // Supprimer une reservation de cadeaux en fonction de l'id
    const handleDeleteReservedGift = async(listeItem) => {
        const originalListes = liste;
        const copyModifListes = liste;

        for (let p = 0; p < copyModifListes.listeItems.length; p++) {
            if (copyModifListes.listeItems[p].id === listeItem.id) {
                copyModifListes.listeItems[p].userItem = null;
                setListe(copyModifListes);
                setUpdateFetch(true);
            }
        };
        try{
            const cancelReservedUser = {...listeItem, userItem: null};
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
        const originalListes = liste;
        const copyModifListes = liste;
        for (let p = 0; p < copyModifListes.listeItems.length; p++) {
            if (copyModifListes.listeItems[p].id === listeItem.id) {
                copyModifListes.listeItems[p].userItem = copyModifListes.user;
                setListe(copyModifListes);
                setUpdateFetch(true);
            }
        }
        try{
            const addReservedUser = {...listeItem, userItem: copyModifListes.user};
            await listeItemsApi.update(listeItem.id, addReservedUser);
            toast.success("Votre cadeaux est réservé 🎅");
        }catch(error){
            console.log(error.response);
            setListe(originalListes);
            toast.error("Une erreur est survenue 🎅");
        }
    };

    // SUPPRIMER LA LISTE
    const handleDeleteListe = async (listeId) => {
        try {
            await listeApi.delete(listeId);
            history.replace("/user/"+ liste.user.id+"/listes");
            toast.success("Votre liste est supprimée 🎅");

        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue 🎅");
        }
    }

  return(

      <div className={"container-fluid homecontainer"}>

          {/* Component visuel décoration liste */}
          <div >
              <DecoListe handleChangeBorder={handleChangeBorder} handleChangeMotif={handleChangeMotif} handleChangeTimbre={handleChangeTimbre} handleChangeWallpaper={handleChangeWallpaper}/>
          </div>

          <div className={"liste_size container"} >
              {loading && <div style={{position: "absolute"}}><ListeLoader/></div>}
              <div className={"container d-flex col-12"} style={borderStyle}>
                  <div className={"container col-12 wallpapers-list"} style={wallpaperStyle}>
                      <div className={"text-right liste_edit"}>
                          <button className={"btn btn-sm bg-white"} onClick={() => {{handleDeleteListe(liste.id)}}}>
                              <FontAwesomeIcon icon={faTrash} color={"red"} size={"2x"}/>
                          </button>

                      </div>
                      <div className={"container col-lg-6 col-md-10"}>
                          <img src={decoListe.motif} className={"motif"}/>

                      </div>
                      <div className={"container col-8 text-right"}>
                          <img src={decoListe.timbre} className={"timbre"}/>
                      </div>

                      {/* Boucle pour afficher les cadeaux dans la liste */}
                      <TableListe handleAddGift={handleAddGift} errors={errors} handleSearch={handleSearch} handleChange={handleChange} handleSubmit={handleSubmit} liste={liste} itemsListe={itemsListe} handleDelete={handleDelete} handleDeleteReservedGift={handleDeleteReservedGift} handleReservedItem={handleReservedItem} filteredItems={filteredItems} search={search}> </TableListe>
                  </div>
              </div>

          </div>


      </div>
  )
};

export default ListeEditPage;