import React from 'react';
import slide from '../../img/HomePage/slide/slide.jpg';
import perso from '../../img/HomePage/slide/charaNoel.png';

const HomePage = () => {


    return(<>
            <div>
                <div className={"perso_slide_container"}>
                    <img className={"perso_slide"} src={perso}/>
                </div>

                <div className={"text_slide"}>

                </div>
                <div>
                    <img height={"700px"} className="d-block w-100 img-responsive slide_background" src={slide}/>


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
            </div>
            <section >
                <div className={"container-fluid test"}>

                </div>
            </section>
            <section >
                <div className={"container-fluid testtest"}>

                </div>
            </section>
        </>
    )
};

export default HomePage;

