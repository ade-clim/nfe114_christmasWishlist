import React,{useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import userApi from "../services/userApi";
import Pagination from "../components/Pagination";


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
            u.email.toLowerCase().includes(search.toLowerCase()) ||
            u.firstName.toLowerCase().includes(search.toLowerCase()) ||
            u.lastName.toLowerCase().includes(search.toLowerCase())
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
                        <td className={"text-center"}>
                            <button disabled={user.liste.length === 0} className={"btn badge badge-pill badge-white border"}>
                                {user.liste.length}
                            </button>
                        </td>
                        <td><button disabled={user.liste.length === 0} className={"btn button_liste btn-sm"}>
                            {user.liste.length !== 0 &&
                            <Link to={"/listes/"+ user.id} className={"text-white"}>voir</Link> ||
                            <span>voir</span>}
                        </button></td>

                    </tr>)}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage} itemsPerPage={itemsPerPage} length={filteredUsers.length} onPageChanged={handlePageChange}/>
            </div>
        </>
    )
};

export default SearchLists;