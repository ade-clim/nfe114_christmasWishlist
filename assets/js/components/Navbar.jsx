import React,{useContext, useState, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import authApi from "../services/authApi";
import userApi from '../services/userApi';
import AuthContext from "../contexts/AuthContext";
import jwtDecode from "jwt-decode";
import iconeUserNoel from '../../img/icones/Xmas_C-01.png';
import logo from "../../img/logo/logo.png"
import {toast} from "react-toastify";

const Navbar = ({history}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        id:""
    });

    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    // On récupére l'utilisateur en session
    const handleFetchUser = () => {
        const token = window.localStorage.getItem("authToken");
        if(token){
            const {firstName, lastName, id} = jwtDecode(token);
            setUser({firstName: firstName, lastName: lastName, id: id})
        }
    };

    const handleLogout = () => {
        authApi.logout();
        setIsAuthenticated(false);
        toast.info("Vous êtes déconnecté 🎅");
        history.push("/")
    };

    useEffect(() => {
        handleFetchUser();
    }, []);

    return(
        <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent col-12">
            <div className={"container col-12"}>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                        aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor01">

                    <ul className={"navbar-nav"}>
                        <li className={"nav-item"}>
                            <NavLink to={"/"} className="navbar-brand logo ml-3">logo</NavLink>
                        </li>
                    </ul>


                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to={"/demo"} className="nav-link text-danger">demo</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/liste/new"} className="nav-link text-dark">Creer</NavLink>
                        </li>
                        <li className="nav-item ">
                            <NavLink to={"/listes/searchlistes"} className="nav-link text-dark ">Rechercher</NavLink>
                        </li>


                        {(!isAuthenticated &&
                            (<>
                                    <li className="nav-item">
                                        <NavLink to={"/register"} className="nav-link text-danger">
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
                                <NavLink to={"/user/"+ user.id+"/listes"} className="nav-link text-dark">mes listes</NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={"/reservations/"+ user.id} className="nav-link text-dark">mes reservations</NavLink>
                            </li>


                            <li className="nav-item">
                                <Link to={"/users/"+ user.id} className="btn btn-link text-secondary">
                                    Bonjour <small>{user.firstName} {user.lastName}</small>
                                </Link>

                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-danger btn-sm mt-2">
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