import React from 'react';
import {Link} from "react-router-dom";
import slide from '../../img/HomePage/slide/slide.png';
import perso from '../../img/HomePage/slide/charaNoel.png';
import snowMan from '../../img/HomePage/Section02/snowman.png';
import bgSnowman from '../../img/HomePage/Section02/snowman_bg.png'
import letter from '../../img/HomePage/Section01/letter.png'
import bagGift from '../../img/HomePage/Section03/bagGifts.png';


const HomePage = () => {
    return(
        <div className={"container-fluid"} style={{width:"100vw", paddingRight:"0px", paddingLeft:"0px"}}>
            <div className={""}>
                <div className={"perso_slide_container"}>
                    <img className={"perso_slide"} src={perso}/>
                </div>
                <div className={"text_slide"}>
                    <h1 className={"text_title col-12"}>MY CHRISTMAS WISHLIST</h1>
                    <p className={"text_content text-center"}>"Créer, partage et soit sage Hohoho"</p>
                    <p className={"text-center"}>Papa noel</p>
                    <div className={"text-center mt-4"}>
                        <Link to={"/liste/new"}><button className={"btn btn_slide_btn col-3"}>creer</button></Link>
                    </div>

                </div>

                <div className={""}>
                    <img height={"700px"} className="w-100 img-responsive slide_background" src={slide}/>

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
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="section01_letter">
                                <img width={"60%"} src={letter}/>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="mx-auto mb-5 mb-lg-0 mb-lg-3 text-left">
                                <h3> Sed nec erat bibendum</h3>
                                <p className="lead mb-0">Quisque convallis mauris a lectus lacinia pulvinar. Proin vel lorem nisl. Phasellus in ante id ante tincidunt ultrices.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={"text-center section03"}>
                    <div className="container-fluid" >
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="mx-auto mb-5 mb-lg-0 mb-lg-3 text-right">
                                    <h3>Lorem ipsum dolor sit amet</h3>
                                    <p className="lead mb-0">Quisque convallis mauris a lectus lacinia pulvinar.</p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className=" mx-auto mb-5 mb-lg-0 mb-lg-3 section02_bag">
                                    <img  src={bagGift}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                <section className={"text-center section02"}>
                        <div className={"row"} style={{marginRight:"0px", marginLeft:"0px"}}>
                            <div className={""}>
                                <div className="">
                                    <div className="snow_man">
                                        <img src={snowMan}/>
                                    </div>
                                </div>
                                <div className={"section02_bg"} style={{paddingRight:"0px", paddingLeft:"0px"}}>
                                    <img src={bgSnowman} width={"100%"}/>
                                </div>

                            </div>
                    </div>

                </section>

            </div>
        </div>
    )
};

export default HomePage;

