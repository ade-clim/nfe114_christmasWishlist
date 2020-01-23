import React, {useEffect, useState} from 'react';
import Pagination from "../components/Pagination";
import listeApi from "../services/listeApi";

const ListesPage = (props) => {

    const [listes, setListes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;


    // Permet de recuperer les wishlist lié à l'user en session
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
            <div className={"form-group"}>
                <input type={"text"} onChange={handleSearch} value={search} className={"form-control"} placeholder={"Rechercher ..."}/>
            </div>

                <div className={"container contour-list d-flex"} >
                    <div className={"container col-12 wallpaper-list"}>
                        <div className={"container col-lg-6 col-md-10"}>
                            <img className={"motif"}/>
                        </div>
                        <div className={"container col-11 list"}>
                            <div className={"container info-list"}>

                            </div>

                        </div>

                    </div>
                </div>
















            <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredListes.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
}

export default ListesPage;