import React from 'react'
import ReactDom from 'react-dom'
import '../css/app.css';
import {HashRouter, Switch, Route, withRouter} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import authApi from "./services/authApi";
import HomePage from "./pages/HomePage";

authApi.setup();
const App = () => {
    return(
        <HashRouter>
            <main>
                <Switch>
                    <Route path={"/login"} component={LoginPage}/>

                    <Route path={"/"} component={HomePage}/>
                </Switch>



            </main>








        </HashRouter>
    )

};
const rootElement = document.querySelector('#app');
ReactDom.render(<App/>, rootElement);
