import React, {useEffect, useState} from 'react';
import PaginationListes from "../components/PaginationListes";
import listeApi from "../services/listeApi";
import rennes from '../../img/rennes.png'
const ListesPage = (props) => {

    const [listes, setListes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 1;


    // Permet de recuperer les wishlist lié à l'user en session (voir dossier doctrine)
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


    // Supprimer une liste en fonction de l'id
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
            c.title.toLowerCase().includes(search.toLowerCase()) ||
            c.description.toLowerCase().includes(search.toLowerCase())
            );

    // PaginationListes des données
    const paginatedListes = PaginationListes.getData(filteredListes, currentPage, itemsPerPage);

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
                    <div key={liste.id} className={"container contour-list d-flex"} style={{backgroundImage: `url(${liste.decoListe.border})`}}>
                        <div className={"container col-12 wallpaper-list"} style={{backgroundImage: `url(${liste.decoListe.wallpaper})`}}>
                            <div className={"container col-lg-6 col-md-10"}>
                                <img src={rennes} className={"motif"}/>
                            </div>
                            <div className={"container col-11 list"}>
                                <div className={"container info-list"}>
                                    <p>{liste.title}</p>
                                    <p>{liste.description}</p>
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