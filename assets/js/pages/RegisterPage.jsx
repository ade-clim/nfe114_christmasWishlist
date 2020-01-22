import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import Field from "../components/forms/Fields";
import registerApi from "../services/registerApi";
import addressApi from "../services/addressApi";

const RegisterPage = ({history}) => {

    const [user, setUser] = useState({
       firstName: "",
       lastName: "",
        email: "",
        phone: "",
        password: "",
        passwordConfirm: "",
        address: ""
    });

    const [address, setAddress]= useState({
        street: "",
        number: "",
        city: " ",
        postalCode: " "
    });

    const [errors, setErrors] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    // Gestion des changements des inputs dans le formulaire
    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setUser({...user, [name]: value});
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiErrors = {};

        if(user.password !== user.passwordConfirm){
            apiErrors.passwordConfirm = "Votre confirmation de mot de passe n'est pas conforme avec le mot de passe original";
            setErrors(apiErrors);
            return;
        }

        try {

            // AJOUTER UNE  VERIFICATION AVANT ENVOIE DE L'ADRESSES
            //Creation addresses par default
            const addresseUser = await addressApi.create(address);
            const myUser = {...user, address: addresseUser.data.id};
            await registerApi.register(myUser);
            // TODO : Flash notification success
            setErrors({});
            history.replace("/login");

        }catch(error){
            const {violations} = error.response.data;
            if(violations){
                violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                });
                setErrors(apiErrors);
            }
        }
    };

    return(
            <div className={"container homecontainer"}>
        <h1>Formulaire d'inscription</h1>
            <form onSubmit={handleSubmit}>
                <Field name={"firstName"}
                       label={"Prénom"}
                       placeholder={"Votre prénom"}
                       error={errors.firstName}
                       value={user.firstName}
                       onChange={handleChange}
                />
                <Field name={"lastName"}
                       label={"Nom"}
                       placeholder={"Votre nom"}
                       error={errors.lastName}
                       value={user.lastName}
                       onChange={handleChange}
                />
                <Field name={"email"}
                       label={"Adresse email"}
                       placeholder={"Votre adresse email"}
                       error={errors.email}
                       value={user.email}
                       onChange={handleChange}
                />
                <Field name={"password"}
                       label={"Mot de passe"}
                       type={"password"}
                       placeholder={"Votre mot de passe"}
                       error={errors.password}
                       value={user.password}
                       onChange={handleChange}
                />
                <Field name={"passwordConfirm"}
                       label={"Confirmation du mot de passe"}
                       type={"password"}
                       placeholder={"Confirmez votre mot de passe"}
                       error={errors.passwordConfirm}
                       value={user.passwordConfirm}
                       onChange={handleChange}
                />
                <div className={"form-group"}>
                    <button type={"submit"} className={"btn btn-success"}>Confirmation</button>
                    <Link to={"/login"} className={"btn btn-link"}>J'ai déjà un compte</Link>
                </div>
            </form>
            </div>
    )
};

export default RegisterPage;