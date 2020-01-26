import React,{useContext, useState, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import authApi from "../services/authApi";
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import iconeUserNoel from '../../img/icones/Xmas_C-01.png';
import gift from '../../img/icones/Xmas_C-05.png';
const Navbar = ({history}) => {

    // Recup données du Cartcontext
    //const contextValue = useContext(CartContext);

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        id:""
    });

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);


    const handleFetchUser = () => {
        const token = window.localStorage.getItem("authToken");
        console.log(token)
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            setUser({firstName: firstName, lastName: lastName, id: id})
        }
    };

    const handleLogout = () => {
        authApi.logout();
        setIsAuthenticated(false);
        history.push("/login")
    };

    useEffect(() => {
        handleFetchUser();
    }, []);

    return(
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent">
            <div className={"container col-11"}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">

                    <ul className={"navbar-nav"}>
                        <li className={"nav-item"}>
                            <NavLink to={"/"} className="navbar-brand logo">My Christmas Wishlist</NavLink>
                        </li>
                    </ul>




                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to={"/listes/new"} className="nav-link text-dark">Creer ma liste</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to={"/listes/searchlistes"} className="nav-link text-dark ">Rechercher une liste</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={"/listes"} className="nav-link text-dark">mes listes</NavLink>
                        </li>



                        {(!isAuthenticated &&
                            (<>
                                    <li className="nav-item">
                                        <NavLink to={"/register"} className="nav-link">
                                            Inscription
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={"/login"} className="">
                                            <img src={iconeUserNoel} width={"60px"}/>
                                        </NavLink>
                                    </li>
                                </>
                            )) || (<>
                            <li className="nav-item">
                                <Link to={"/users/"+ user.id} className="btn btn-link text-secondary">
                                    Bonjour <small>{user.firstName} {user.lastName}</small>
                                </Link>

                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger">
                                    Deconnexion
                                </button>
                            </li>
                        </>)}
                    </ul>
                </div>
            </div>
        </nav>
        </header>
    )
};
export default Navbar;