import React,{useState, useEffect} from 'react';
import slide from '../../img/slide/slide.jpg';
import perso from '../../img/slide/charaNoel.png';
const HomePage = () => {




    const handleCreateNewList = () => {

    };





    return(
        <div>
            <div>
                <div className={"perso_slide_container"}>
                    <img className={" img-fluid"} src={perso}/>
                </div>


                <img height={"700px"} className="d-block w-100" src={slide}/>
            </div>
        </div>
    )
};

export default HomePage;

