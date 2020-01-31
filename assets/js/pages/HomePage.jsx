import React from 'react';
import {Link} from "react-router-dom";
import slide from '../../img/HomePage/slide/slide.png';
import perso from '../../img/HomePage/slide/charaNoel.png';
import snowMan from '../../img/HomePage/img/snowman.png';
const HomePage = () => {


    return(<>
                <div className={"perso_slide_container"}>
                    <img className={"perso_slide"} src={perso}/>
                </div>
                <div className={"text_slide"}>
                    <p className={"text_title col-12"}>MY CHRISTMAS WISHLIST </p>
                    <p className={"text_content col-10 text-red"}>"Créer, partage et soit sage Hohoho"</p>
                    <p className={"col-8"}>Papa noel</p>
                    <div className={"btn_slide"}>
                        <Link to={"/liste/new"}><button className={"btn btn_slide_btn col-3"}>creer</button></Link>
                    </div>

                </div>

                <div className={""}>
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

            <section className={"text-center section01"}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <h3>Bootstrap 4 Ready</h3>
                                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4
                                    framework!</p>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="mx-auto mb-5 mb-lg-0 mb-lg-3 snow_man">
                                <img src={snowMan}/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <h3>Bootstrap 4 Ready</h3>
                                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4
                                    framework!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"text-center section02"}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <h3>Bootstrap 4 Ready</h3>
                                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4
                                    framework!</p>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 snow_man">
                                <img src={snowMan}/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <h3>Bootstrap 4 Ready</h3>
                                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4
                                    framework!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={"text-center section03"}>
                <div className="container" >
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <h3>Bootstrap 4 Ready</h3>
                                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4
                                    framework!</p>
                            </div>
                        </div>
                        <div className="col-lg-4 ">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3 snow_man">
                                <img src={snowMan}/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <h3>Bootstrap 4 Ready</h3>
                                <p className="lead mb-0">Featuring the latest build of the new Bootstrap 4
                                    framework!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
};

export default HomePage;

