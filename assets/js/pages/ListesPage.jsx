import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import Pagination from "../components/Pagination";
import listeApi from "../services/listeApi";

const ListesPage = (props) => {

    const [listes, setListes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;


    // Permet de recuperer les categories
    const fetchListes = async () => {
        try {
            const data = await listeApi.findAll();
            setListes(data);
        }catch (error) {
            console.log(error.response);
        }
    };


    // useEffect indique à React que notre composant doit être exécuter apres chaque affichage
    useEffect(() => {
        fetchListes();
    },[]);


    // Supprimer une categorie en fonction de l'id
    const handleDelete = async (id)=>{
        const originalListes = [...listes];
        setListes(listes.filter(liste => liste.id !== id));

        try {
            await listeApi.delete(id);
        }catch (error) {
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
            c.title.toLowerCase().includes(search.toLowerCase())
            );

    // Pagination des données
    const paginatedListes = Pagination.getData(filteredListes, currentPage, itemsPerPage);



    return(
        <>
            <div className={"container homecontainer"}>
            <div className={"mb-5 d-flex justify-content-between align-items-center"}>
                <h1>Liste des catégories</h1>
                <Link to={"/categorys/new"} className={"btn btn-primary"} >Créer une catégorie</Link>
            </div>
            <div className={"form-group"}>
                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
            </div>
            <table className={"table table-hover"}>
                <thead>
                <tr>
                    <th>Id.</th>
                    <th>Title</th>
                </tr>
                </thead>
                <tbody>
                {paginatedListes.map(liste => <tr key={liste.id}>
                    <td>{liste.id}</td>
                    <td>{liste.title}</td>
                    <td className={"text-center"}><Link to={"/listes/"+ liste.id} className={"badge badge-pill badge-info"}>uu</Link></td>

                    <td>
                        <Link  to={"/categorys/" + liste.id} className={"btn btn-sm btn-primary mr-1"}>Editer</Link>
                        <button  className={"btn btn-sm btn-danger"} onClick={() => handleDelete(liste.id)}>supprimer</button>
                    </td>
                </tr>)}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredListes.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
}

export default ListesPage;