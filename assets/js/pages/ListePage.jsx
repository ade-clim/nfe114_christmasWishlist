import React, {useEffect, useState} from 'react';
import Field from "../components/forms/Fields";
import itemApi from "../services/itemApi";
import listeApi from "../services/listeApi";
import {Link} from "react-router-dom";
import Bow from '../../img/Bow.png';
import Ice from '../../img/Ice.png';
import Snow from '../../img/Snow.png';
import Stars from '../../img/Stars.png';
import Trees from '../../img/Trees.png';
import rennes from "../../img/rennes.png";
import decoListeApi from "../services/decoListeApi";
import listeItemsApi from "../services/listeItemsApi";

const ListePage = ({history, match}) => {

    const {id} = match.params;
    let i = 0;
    const [borderColor, setBorderColor] = useState("#F5624D");
    const [wallpaper, setWallpaper] = useState(Bow);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");

    // Recuperation des cadeaux pour affichage dans la liste
    const [itemsListe, setItemsListe] = useState([]);



    // Objet DecoListe pour la base de donnée
    const [decoListe, setDecoListe] = useState({
        wallpaper: wallpaper,
        border: borderColor,
        motif: ""
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

            if(editing){
                await listeApi.update(id, liste);

            }else{

                // Envoie de la decoListe en base de donnée
                const maDecoListe = await decoListeApi.create(decoListe);

                // Creation de la liste
                const maListe = {...liste, title:"leleelel",decoListe:maDecoListe.data.id};

                // Envoie de la liste en base de donnée
                 const data = await listeApi.create(maListe);
                 const idMaListe = data.data.id;

                 // tab de stockage du useState des items selectionner dans la liste
                 const maListeItems = [...itemsListe];

                 for(let i = 0; i < maListeItems.length; i++){
                     await listeItemsApi.create({liste:idMaListe, item:maListeItems[i].id});
                 };

                // TODO : Flash notification success

                setErrors({});
                history.replace("/listes");
            };

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

    // Recuperation de la liste des items
    const handleItems = async () => {
        const data = await itemApi.findAll();
        setItems(data);
        console.log(data)
    };

    // Recuperation de la liste en cours de modification
    const fetchList = async (id) => {
        try {
            const {title, description} = await listeApi.find(id);
            setListe({title, description});
        }catch (error) {
           console.log(error.response);

        }
    };


    useEffect(() => {
        if(id !== "new")
        {
            setEditing(true);
            fetchList(id);
        }
        handleItems();
    }, [id]);


    const contourStyle = {
        backgroundImage: `url(${wallpaper})`
    };

    const borderStyle = {
        backgroundColor: `${borderColor}`
    };


    const handleChangeWallpaper = (value) => {
        setDecoListe({...decoListe, wallpaper:value});
        setWallpaper(value);
    };

    const handleChangeBorder = (value) => {
        setBorderColor(value);
    };

    const handleAddGift = ({id, title, description,price, picture}) => {
        const gift = {idProvisoire:0, id, title, description ,price, picture};
        setItemsListe([...itemsListe,gift]);
        setSearch("");
    };


    // On supprime le cadeaux dans la liste, on utilise une id provisoire (cpt) pour eviter de supprimer les produits avec la meme id (produit identique)
    const handleDelete = async (id) => {
        const originalItemsListe = [...itemsListe];
        setItemsListe(itemsListe.filter(item => item.idProvisoire !== id));

        try{

        }catch (error) {
            console.log(error.response)
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
        </section>
        <section>
            <span className={"btn"} onClick={() => handleChangeBorder("#F5624D")}> y</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#CC231E")}> d</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#34A65F")}> e</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#0F8A5F")}> r</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#235E6F")}> t</span>

        </section>
    </div>

        <div className={"container contour-list d-flex"} style={borderStyle}>
            <div className={"container col-12 wallpaper-list"} style={contourStyle}>
                <div className={"container col-lg-6 col-md-10"}>
                    <img src={rennes} className={"motif"}/>
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
                            {search.length !== 0 &&  <div>
                                {items.map(item => <p key={item.id}>
                                    <img src={item.picture}/> {item.title} {item.description} {item.price}
                                    <span className={"btn btn-success btn-sm"} onClick={() => handleAddGift(item)}>Add</span>
                                </p>
                                )}
                            </div>
                            }

                            {/* Boucle pour afficher les cadeaux dans la liste */}
                            {itemsListe.map(itemListe =>{
                                i++;
                                return(
                                    <p key={i}>
                                        <span hidden >{itemListe.idProvisoire = i}</span>
                                        <img src={itemListe.picture}/>
                                        {itemListe.title}
                                        {itemListe.description}
                                        {itemListe.price}
                                        <span className={"btn btn-danger btn-sm"} onClick={() => handleDelete(itemListe.idProvisoire)}>Delete</span>
                                    </p>)}
                                )
                            }



                            <div className={"form-group text-center mt-5"}>
                                <button className={"btn btn-success"} type={"submit"}>Enregistrer</button>
                            </div>
                        </form>
                    </div>

                </div>

            </div>
        </div>
      </div>
  )
};

export default ListePage;