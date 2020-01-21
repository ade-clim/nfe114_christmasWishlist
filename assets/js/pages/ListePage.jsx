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

const ListePage = ({history, match}) => {

    const {id} = match.params;

    const [borderColor, setBorderColor] = useState("");
    const [wallpaper, setWallpaper] = useState(Bow);
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [liste, setListe] = useState({
        title: "",
        description: ""
    });
    const [errors, setErrors] = useState({
        title: "",
        description: ""
    });

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
                await listeApi.create(liste);

                // TODO : Flash notification success
                setListe({
                    title: "",
                    description: ""
                });
                setErrors({});
                history.replace("/listes");
            }


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
        setWallpaper(value);
    };

    const handleChangeBorder = (value) => {
        console.log(value)
        setBorderColor(value);
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
            <span className={"btn"} onClick={() => handleChangeBorder("#ffea00")}> yellow</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#cc3300")}> d</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#0033cc")}> e</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#ff6600")}> r</span>
            <span className={"btn"} onClick={() => handleChangeBorder("#009900")}> t</span>

        </section>
    </div>

        <div className={"container contour-list d-flex"} style={borderStyle}>
            <div className={"container col-12 wallpaper-list"} style={contourStyle}>
                <div className={"container col-lg-6"}>
                    <img src={rennes} className={"motif"}/>
                </div>
                <div className={"container col-11 list"}>

                    <div className={"container info-list"}>
                        <form onSubmit={handleSubmit}>
                            <Field name={"title"}
                                   placeholder={"Titre du produit"}
                                   label={"Titre"}
                                   onChange={handleChange}
                                   value={liste.title}
                                   error={errors.title}
                            />
                            <Field name={"description"}
                                   placeholder={"Description du produit"}
                                   label={"Description"}
                                   onChange={handleChange}
                                   value={liste.description}
                                   error={errors.description}
                            />
                            <div className={"form-group"}>
                                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher vos cadeaux"}/>
                            </div>

                            {search.length !== 0 &&  <div>
                                {items.map(item => <p>
                                    <img src={item.picture}/>{item.title} {item.description} {item.price}
                                </p>)}
                            </div>}

                            <div className={"form-group"}>
                                <button className={"btn btn-success"} type={"submit"}>Enregistrer</button>
                                <Link to={"/"} className={"btn btn-link"}>Retour à la liste</Link>
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