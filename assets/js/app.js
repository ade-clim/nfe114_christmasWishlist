import React,{useState, useEffect, useRef} from 'react'
import ReactDom from 'react-dom'
import '../css/app.css';
import '../css/neige.css';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import authApi from "./services/authApi";
import AuthContext from "./contexts/AuthContext";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import ListePage from "./pages/ListePage";
import UserPage from "./pages/UserPage";
import ListesPage from "./pages/ListesPage";
import SearchLists from "./pages/SearchLists";

authApi.setup();

const App = () => {


    // TODO: Il faudrait par défaut qu'on demande à notre authApi si on est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar);

//<NavbarWithRouter/>
    return(

        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <HashRouter>
                <main>
                    <NavbarWithRouter />
                    <Switch>
                        <Route path={"/login"} component={LoginPage}/>
                        <Route path={"/register"} component={RegisterPage}/>


                        <Route path={"/listes/searchlistes/:id"} component={SearchLists}/>
                        <Route path={"/listes/searchlistes"} component={SearchLists}/>


                        <PrivateRoute path={"/listes/:id"} component={ListePage}/>
                        <PrivateRoute path={"/listes"} component={ListesPage}/>

                        <PrivateRoute path={"/users/:id"} component={UserPage}/>
                        <Route path={"/"} component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
        </AuthContext.Provider>
    )

};
const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
