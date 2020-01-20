import React,{useState, useEffect} from 'react';
import userApi from "../services/userApi";
import Field from "../components/forms/Fields";
import {Link} from "react-router-dom";
import addressApi from "../services/addressApi";


const UserPage = ({history, match}) => {

    const {id} = match.params;
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    const [address, setAddress]= useState({
        id: "",
        street: "",
        number: "",
        city: "",
        postalCode: ""
    });
    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: ""
    });

    // Recuperation du client en fonction de l'id
    const fetchUser = async id => {
        try {
            const {firstName, lastName, email, phone, address} = await userApi.find(id);
            setUser({firstName, lastName, email, phone});
            setAddress({id: address.id, street: address.street, number: address.number, city: address.city, postalCode: address.postalCode});

        }catch (error) {
            console.log(error.response);
            // TODO : notification flash d'une erreur
            history.replace("/users");
        }
    };

    // Chargement du customer si besoin au chargement du composant ou au changement de l'id
    useEffect(() => {
        fetchUser(id);
    }, [id]);

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    };

    // Gestion des changements des inputs dans le formulaire
    const handleChangeAddress = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setAddress({...address, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await userApi.update(id,user);
            await addressApi.update(address.id, address);
            // TODO : Flash notification de succéss

            setErrors({});

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

    return(
            <div className={"container homecontainer"}>
            <h1>Modification du client</h1>
            <form onSubmit={handleSubmit}>
                <Field name={"lastName"}
                       label={"Nom de famille"}
                       placeholder={"Nom de famille du client"}
                       value={user.lastName}
                       onChange={handleChange}
                       error={errors.lastName}
                />
                <Field name={"firstName"}
                       label={"Prénom"}
                       placeholder={"Prénom du client"}
                       value={user.firstName}
                       onChange={handleChange}
                       error={errors.firstName}
                />
                <Field name={"email"}
                       label={"Email"}
                       placeholder={"Adresse email du client"}
                       type={"email"}
                       value={user.email}
                       onChange={handleChange}
                       error={errors.email}
                />
                <Field name={"phone"}
                       label={"Téléphone"}
                       placeholder={"Téléphone du client"}
                       value={user.phone}
                       onChange={handleChange}
                />
                <Field name={"number"}
                       label={"Numéro de rue"}
                       placeholder={"Numéro de rue"}
                       value={address.number}
                       onChange={handleChangeAddress}
                />
                <Field name={"street"}
                       label={"Rue"}
                       placeholder={"Rue"}
                       value={address.street}
                       onChange={handleChangeAddress}
                />
                <Field name={"postalCode"}
                       label={"Code postal"}
                       placeholder={"Code postal"}
                       value={address.postalCode}
                       onChange={handleChangeAddress}
                />
                <Field name={"city"}
                       label={"Ville"}
                       placeholder={"Ville"}
                       value={address.city}
                       onChange={handleChangeAddress}
                />
                <div className={"form-group"}>
                    <button type={"submit"} className={"btn btn-success"}>
                        Enregister
                    </button>
                    <Link to={"/users"} className={"btn btn-link"}>
                        Retour à la liste
                    </Link>
                </div>
            </form>
            </div>
    )
};

export default UserPage;