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
import NewListePage from "./pages/NewListePage";
import ListeEditPage from "./pages/ListeEditPage";
import UserPage from "./pages/UserPage";
import ListesPage from "./pages/ListesPage";
import SearchLists from "./pages/SearchLists";
import ReservationGift from "./pages/ReservationGift"
import ReservationListePage from "./pages/ReservationListePage";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwtDecode from "jwt-decode";
import userApi from "./services/userApi";
import DemoPage from "./pages/DemoPage";
authApi.setup();

const App = () => {


    // TODO: Il faudrait par défaut qu'on demande à notre authApi si on est connecté ou non
    const [isAuthenticated, setIsAuthenticated] = useState(authApi.isAuthenticated());
    const NavbarWithRouter = withRouter(Navbar);

    //<NavbarWithRouter/>
    //<PrivateRoute path={"/listes/"} component={ListesPage}/>
    return(

        <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <HashRouter>
                <main>
                    <NavbarWithRouter />
                    <Switch>
                        <Route path={"/login"} component={LoginPage}/>
                        <Route path={"/register"} component={RegisterPage}/>
                        <Route path={"/demo"} component={DemoPage}/>

                        <PrivateRoute path={"/reservations/listes/:id"} component={ReservationListePage}/>
                        <PrivateRoute path={"/reservations/:id"} component={ReservationGift}/>

                        <Route path={"/listes/searchlistes/:id"} component={SearchLists}/>
                        <Route path={"/listes/searchlistes"} component={SearchLists}/>


                        <PrivateRoute path={"/liste/edit/:id"} component={ListeEditPage}/>
                        <PrivateRoute path={"/liste/new"} component={NewListePage}/>


                        <Route path={"/user/:id/listes"} component={ListesPage}/>

                        <PrivateRoute path={"/users/:id"} component={UserPage}/>

                        <Route path={"/"} component={HomePage}/>
                    </Switch>
                </main>
            </HashRouter>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} autoClose={4500}/>
        </AuthContext.Provider>
    )

};
const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
