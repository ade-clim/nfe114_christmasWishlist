import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Fields";
import itemApi from "../services/itemApi";
import listeApi from "../services/listeApi";
import decoListeApi from "../services/decoListeApi";
import listeItemsApi from "../services/listeItemsApi";

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
import {faGift} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ListeEditPage = ({match}) => {

    const {id} = match.params;
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
        decoListe: ""
    });

    // Recuperation pour affichage des erreurs formulaires
    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });

    // Va nous permettre de verifier si modification ou création
    const [editing, setEditing] = useState(false);


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setListe({...liste, [name]: value});
    };



    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await listeApi.update(liste.id, liste);
            // TODO : Flash notification success
            setErrors({});

        }catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                // TODO : Flash notification de d'erreurs
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

    // on ajoute l'item en local puis en base de donnée
    const handleAddGift = async(item) => {
        const gift = {item, idProvisoire: 0};
        setItemsListe([...itemsListe, gift]);

        const listeItemAdd = {liste, item};

        setSearch("");
        try{
            await listeItemsApi.createListeEditPage(listeItemAdd);
        }catch(error){
            console.log(error.response);
        }
        setUpdateFetch(true);
    };


    // Recuperation de la liste en cours de modification
    const fetchList = async (idEditListe) => {
        try {
            const {id, title, description, decoListe, listeItems} = await listeApi.find(idEditListe);
            const myDecoListe = {id: decoListe.id,wallpaper:decoListe.wallpaper , border:decoListe.border, motif:decoListe.motif, timbre: decoListe.timbre};
            setListe({id, title, description, decoListe});
            setDecoListe(myDecoListe);
            setItemsListe(listeItems);

        }catch (error) {
           console.log(error.response);

        }
    };


    useEffect(() => {
        fetchList(id);
        handleItems();
        setUpdateFetch(false);
    }, [updateFetch]);


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





    // On supprime le cadeaux dans la liste, on utilise une id provisoire (cpt) pour eviter de supprimer les produits avec la meme id (produit identique)
    const handleDelete = async (ListeItem) => {
        const originalItemsListe = [...itemsListe];
        setItemsListe(itemsListe.filter(item => item.item.idProvisoire !== ListeItem.item.idProvisoire));

        try{
            await listeItemsApi.deleteListeItem(ListeItem.id);
        }catch (error) {
            console.log(error.response);
            setItemsListe(originalItemsListe);
        }
    };

  return(
      <div className={"container homecontainer"}>
          {/* {(!editing && <h1>Création d'une liste</h1>) || (<h1>Modification de la liste</h1>) }*/}
    <div className={"container"}>
        <section>
            <img src={Bow} width={"40px"} onClick={() => handleChangeWallpaper(Bow)}/>
            <img src={Ice} width={"40px"} onClick={() => handleChangeWallpaper(Ice)}/>
            <img src={Snow} width={"40px"} onClick={() => handleChangeWallpaper(Snow)}/>
            <img src={Stars} width={"40px"} onClick={() => handleChangeWallpaper(Stars)}/>
            <img src={Trees} width={"40px"} onClick={() => handleChangeWallpaper(Trees)}/>
            <img src={Trees} width={"40px"} onClick={() => handleChangeWallpaper()}/>
        </section>
        <section>
            <span className={"btn"} onClick={() => handleChangeBorder("#F5624D")}> y</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#CC231E")}> d</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#34A65F")}> e</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#0F8A5F")}> r</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#235E6F")}> t</span>
        </section>
        <section>
            <span className={"btn"} onClick={() => handleChangeMotif(rennes)}> r</span>
            <span className={"btn"} onClick={() => handleChangeMotif(santaclaus)}> p</span>
            <span className={"btn"} onClick={() => handleChangeMotif(rennes02)}> d</span>
            <span className={"btn"} onClick={() => handleChangeMotif()}> p</span>
            <span className={"btn"} onClick={() => handleChangeMotif()}> y</span>
        </section>
        <section>
            <span className={"btn"} onClick={() => handleChangeTimbre(timbre01)}> 1</span>
            <span className={"btn"} onClick={() => handleChangeTimbre(timbre02)}> 2</span>
            <span className={"btn"} onClick={() => handleChangeTimbre(timbre03)}> 3</span>
            <span className={"btn"} onClick={() => handleChangeTimbre(timbre04)}> 4</span>
            <span className={"btn"} onClick={() => handleChangeTimbre(timbre05)}> t</span>
            <span className={"btn"} onClick={() => handleChangeTimbre(timbre06)}> t</span>
            <span className={"btn"} onClick={() => handleChangeTimbre()}> t</span>
        </section>

    </div>
        <div className={"container contour-list d-flex"} style={borderStyle}>
            <div className={"container col-12 wallpapers-list"} style={wallpaperStyle}>
                <div className={"container col-lg-6 col-md-10"}>
                    <img src={decoListe.motif} className={"motif"}/>

                </div>
                <div className={"container col-8 text-right"}>
                    <img src={decoListe.timbre} className={"timbre"}/>
                </div>
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

                            {/* Boucle pour afficher les cadeaux dans la liste */}
                            {itemsListe.map(liste =>{
                                i++;
                                return(<>
                                    {i !== 1 && <hr/>}
                                    <p key={i} className={"mt-5 mb-5"}>
                                        {i}
                                        <span hidden >{liste.item.idProvisoire = i}</span>
                                        <img src={liste.item.picture}/>
                                        {liste.item.title}
                                        {liste.item.description}
                                        {liste.item.price}
                                        <span className={"btn btn-danger btn-sm"} onClick={() => handleDelete(liste)}>Delete</span>
                                    </p>
                                </>)})}



                            <div className={"form-group text-center mt-5"}>
                                <button className={"btn button_liste text-white"} type={"submit"}>Enregistrer</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
      </div>
  )
};

export default ListeEditPage;