import React, {useEffect, useState} from 'react';
import itemApi from "../services/itemApi";
import listeApi from "../services/listeApi";
import decoListeApi from "../services/decoListeApi";
import listeItemsApi from "../services/listeItemsApi";

//Wallpapers
import Bow from '../../img/listes/wallpapers/Bow.png';

//Motifs
import rennes from "../../img/listes/motifs/rennes.png";

//Timbres
import timbre01 from '../../img/listes/timbres/timbre01.png';
import TableListe from "../components/TableListe";
import DecoListe from "../components/DecoListe";
import {toast} from "react-toastify";

const DemoPage= ({match, history}) => {

    let i = 0;
    const [borderColor, setBorderColor] = useState("#F5624D");
    const [wallpaper, setWallpaper] = useState(Bow);
    const [motif, setMotif] = useState(rennes);
    const [timbre, setTimbre] = useState(timbre01);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    // Recuperation des cadeaux pour affichage dans la liste
    const [itemsListe, setItemsListe] = useState([]);



    // Objet DecoListe pour la base de donnée
    const [decoListe, setDecoListe] = useState({
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


    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setListe({...liste, [name]: value});
    };

    // Recuperation de la liste des items
    const handleItems = async () => {
        const data = await itemApi.findAll();
        setItems(data);
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

    useEffect(() => {
        handleItems();
    }, []);


    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Envoie de la decoListe en base de donnée
            const maDecoListe = await decoListeApi.create(decoListe);

            // Creation de la liste
            const maListe = {...liste,decoListe:maDecoListe.data.id};

            // Envoie de la liste en base de donnée
            const data = await listeApi.create(maListe);

            // on va rediriger directement l'utilisateur pour eviter une attente trop longue (cause : plusieurs requete api)
            history.replace("/listes");


            const idMaListe = data.data.id;

            // tab de stockage du useState des items selectionner dans la liste
            const maListeItems = [...itemsListe];

            for(let i = 0; i < maListeItems.length; i++){
                const itemListeCreate = {liste: idMaListe, item: maListeItems[i].item.id};
                await listeItemsApi.create(itemListeCreate);
            };

            toast.success("J'ai bien reçu votre liste 🎅");

            setErrors({});

        }catch ({response}) {
            const {violations} = response.data;
            if(violations){
                const apiErrors = {};
                violations.forEach(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setErrors(apiErrors);
                toast.error("Des erreurs dans votre liste 🎅");
            }
        }
    };


    const wallpaperStyle = {
        backgroundImage: `url(${decoListe.wallpaper})`
    };

    const borderStyle = {
        backgroundColor: `${decoListe.border}`
    };


    const handleChangeWallpaper = (value) => {
        setDecoListe({...decoListe, wallpaper:value});
        setWallpaper(value);
    };

    const handleChangeBorder = (value) => {
        setDecoListe({...decoListe, border:value});
        setBorderColor(value);
    };

    const handleChangeMotif = (value) => {
        setDecoListe({...decoListe, motif:value});
        setMotif(value);
    };
    const handleChangeTimbre = (value) => {
        setDecoListe({...decoListe, timbre:value});
        setTimbre(value);
    };

    // on ajoute l'item en local
    const handleAddGift = (item) => {
        const gift = {item, idProvisoire: 0};
        setItemsListe([...itemsListe,gift]);
        setSearch("");
    };


    // On supprime le cadeaux dans la liste, on utilise une id provisoire (cpt) pour eviter de supprimer les produits avec la meme id (produit identique)
    const handleDelete = (listeItem) => {
        const originalItemsListe = [...itemsListe];
        try{
            setItemsListe(itemsListe.filter(item => item.idProvisoire !== listeItem.idProvisoire));
        }catch (error) {
            console.log(error.response);
            setItemsListe(originalItemsListe);
        }
    };

    return(
        <div className={"container-fluid homecontainer"}>
            <div className={""}>
                {/* Component visuel décoration liste */}
                <div>
                    <DecoListe handleChangeBorder={handleChangeBorder} handleChangeMotif={handleChangeMotif} handleChangeTimbre={handleChangeTimbre} handleChangeWallpaper={handleChangeWallpaper}/>
                </div>

                <div className={"liste_size container"} >
                    <div className={"container d-flex col-12"} style={borderStyle}>
                        <div className={"container col-12 wallpapers-list"} style={wallpaperStyle}>
                            <div className={"container col-lg-6 col-md-10"}>
                                <img src={decoListe.motif} className={"motif"}/>
                            </div>
                            <div className={"container col-8 text-right"}>
                                <img src={decoListe.timbre} className={"timbre"}/>
                            </div>

                            {/* Boucle pour afficher les cadeaux dans la liste */}
                            <TableListe hideReservedBtn={true} handleAddGift={handleAddGift} errors={errors} handleSearch={handleSearch} handleChange={handleChange} handleSubmit={handleSubmit} liste={liste} itemsListe={itemsListe} handleDelete={handleDelete}  filteredItems={filteredItems} search={search}> </TableListe>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default DemoPage;