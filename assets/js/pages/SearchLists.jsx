import React,{useState, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import userApi from "../services/userApi";
import Pagination from "../components/Pagination";
import rennes from "../../img/listes/motifs/rennes.png";


const SearchLists = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const itemsPerPage = 10;


    const fetchUsers = async () => {
        try{
            const data = await userApi.findAll();
            setUsers(data);

        }catch(error){
            console.log(error.response);
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

    // Filtrage des users en fonction de la recherche
    const filteredUsers = users.filter(
        u =>
            u.email.toLowerCase().includes(search.toLowerCase())
    );

    // PaginationListes des données
    const paginatedUsers = Pagination.getData(filteredUsers, currentPage, itemsPerPage);


    useEffect(() => {
        fetchUsers();
    },[]);

    return(
        <>
            <div className={"container homecontainer"}>

                <div>
                    <input type={"text"} onChange={handleSearch} className={"form-control"} value={search} placeholder={"Recherche simplifiée pour la démo..."}/>
                </div>
                <table className={"table table-hover"}>
                    <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th className={"text-center"}>Listes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {paginatedUsers.map(user => <tr key={user.id}>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.email}</td>
                        <td className={"text-center btn"}><Link to={"/listes/" + 2} className={"badge badge-pill badge-info"}>{user.liste.length}</Link></td>
                    </tr>)}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredUsers.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
};

export default SearchLists;