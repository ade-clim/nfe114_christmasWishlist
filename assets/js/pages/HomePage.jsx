import React,{useState, useEffect} from 'react';
import itemApi from "../services/itemApi";

const HomePage = () => {




    const handleCreateNewList = () => {

    };





    return(
        <div className={"container homecontainer"}>
            <div className={"text-right"}>
                <button className={"btn btn-danger"} onClick={handleCreateNewList}>Creer une liste</button>
            </div>

        </div>
    )
};

export default HomePage;

