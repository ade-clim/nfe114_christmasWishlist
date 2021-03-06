import React, {useContext, useEffect} from 'react';
import AuthContext from "../contexts/AuthContext";
import {Redirect, Route} from "react-router-dom";


const PrivateRoute = ({match,path, component}) => {

    const {isAuthenticated} = useContext(AuthContext);
    return isAuthenticated ? (<Route path={path} component={component} />) : (<Redirect to={"/login"}/>);
};

export default PrivateRoute;