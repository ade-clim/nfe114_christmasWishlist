import React from 'react';
import slide from '../../img/HomePage/slide/slide.jpg';
import perso from '../../img/HomePage/slide/charaNoel.png';
import red from '../../img/HomePage/red.jpg'
const HomePage = () => {




    const handleCreateNewList = () => {

    };





    return(
        <div>
            <div>
                <div>
                    <div className={"perso_slide_container"}>
                        <img className={"img-fluid perso_slide"} src={perso}/>
                    </div>
                </div>
                <div>
                    <img height={"700px"} className="d-block w-100 img-responsive" src={slide}/>
                    <div className="snow">
                        <div className="snow__layer">
                            <div className="snow__fall"></div>
                        </div>
                        <div className="snow__layer">
                            <div className="snow__fall"></div>
                        </div>
                        <div className="snow__layer">
                            <div className="snow__fall"></div>
                            <div className="snow__fall"></div>
                            <div className="snow__fall"></div>
                        </div>
                        <div className="snow__layer">
                            <div className="snow__fall"></div>
                        </div>
                    </div>
                </div>






                <section>
                    <img className="d-block w-100 img-responsive" src={red}/>
                </section>
            </div>
        </div>
    )
};

export default HomePage;

