import React,{useState, useContext} from 'react';
import authApi from "../services/authApi";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Fields";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const LoginPage = ({history}) => {

    const {setIsAuthenticated} = useContext(AuthContext);
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    // Gestion des champs
    const handleChange = ({currentTarget}) => {
        const {value, name} = currentTarget;
        setCredentials({...credentials, [name]:value});
    };

    // Gestion du submit
    const handleSubmit = async (event) =>{
        event.preventDefault();
        try {
            await authApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            toast.success("Vous êtes connecté 🎅");
            history.replace("/");

        }catch (error) {
            setError("Aucun compte ne possède cette adresse ou alors les informations ne correspondent pas !")
            toast.error("Une erreur est survenue 🎅");
        }
    };

    return(
        <>
            <div className={"container homecontainer"}>

        <h1>Connexion a l'application</h1>
            <form onSubmit={handleSubmit}>
                <Field type={"email"}
                       error={error}
                       name={"username"}
                       label={"Adresse email"}
                       placeholder={"aaa@aol.com"}
                       value={credentials.username}
                       onChange={handleChange}
                />
                <Field type={"password"}
                       name={"password"}
                       label={"Mot de passe"}
                       placeholder={"password"}
                       value={credentials.password}
                       onChange={handleChange}
                />
                <div className={"form-group"}>
                    <button className={"btn button_liste text-white"}>Je me connecte</button>
                    <Link to={"/register"} className={"btn btn-link"}>Je n'ai pas de compte</Link>
                </div>
            </form>
            </div>
        </>
    )
};
export default LoginPage;