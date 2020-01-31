import React from 'react';
import Bow from "../../img/listes/wallpapers/Bow.png";
import Ice from "../../img/listes/wallpapers/Ice.png";
import Snow from "../../img/listes/wallpapers/Snow.png";
import Stars from "../../img/listes/wallpapers/Stars.png";
import Trees from "../../img/listes/wallpapers/Trees.png";
import rennes from "../../img/listes/motifs/rennes.png";
import santaclaus from "../../img/listes/motifs/santaclaus.png";
import rennes02 from "../../img/listes/motifs/rennes02.png";
import timbre01 from "../../img/listes/timbres/timbre01.png";
import timbre02 from "../../img/listes/timbres/timbre02.png";
import timbre03 from "../../img/listes/timbres/timbre03.png";
import timbre04 from "../../img/listes/timbres/timbre04.png";
import timbre05 from "../../img/listes/timbres/timbre05.png";
import timbre06 from "../../img/listes/timbres/timbre06.png";


const DecoListe = ({handleChangeWallpaper, handleChangeBorder, handleChangeMotif, handleChangeTimbre}) => {
    return(
        <>
            <div className="vertical-nav col-2 d-md-block" style={{minWidth: "100px"}}>
                <div className="container col-12">
                    <ul className="nav flex-column mt-3">
                        <li className="">
                            <div className={"deco_liste_panel"}>
                                <section>
                                    <img src={Bow} width={"40px"} onClick={() => handleChangeWallpaper(Bow)}/>
                                    <img src={Ice} width={"40px"} onClick={() => handleChangeWallpaper(Ice)}/>
                                    <img src={Snow} width={"40px"} onClick={() => handleChangeWallpaper(Snow)}/>
                                    <img src={Stars} width={"40px"} onClick={() => handleChangeWallpaper(Stars)}/>
                                    <img src={Trees} width={"40px"} onClick={() => handleChangeWallpaper(Trees)}/>
                                    <img src={Trees} width={"40px"} onClick={() => handleChangeWallpaper()}/>
                                </section>
                                <section>
                                    <span className={"btn"} onClick={() => handleChangeBorder("#F5624D")}> y</span>
                                    <span className={"btn"} onClick={() => handleChangeBorder("#CC231E")}> d</span>
                                    <span className={"btn"} onClick={() => handleChangeBorder("#34A65F")}> e</span>
                                    <span className={"btn"} onClick={() => handleChangeBorder("#0F8A5F")}> r</span>
                                    <span className={"btn"} onClick={() => handleChangeBorder("#235E6F")}> t</span>
                                </section>
                                <section>
                                    <span className={"btn"} onClick={() => handleChangeMotif(rennes)}> r</span>
                                    <span className={"btn"} onClick={() => handleChangeMotif(santaclaus)}> p</span>
                                    <span className={"btn"} onClick={() => handleChangeMotif(rennes02)}> d</span>
                                    <span className={"btn"} onClick={() => handleChangeMotif()}> p</span>
                                    <span className={"btn"} onClick={() => handleChangeMotif()}> y</span>
                                </section>
                                <section>
                                    <span className={"btn"} onClick={() => handleChangeTimbre(timbre01)}> 1</span>
                                    <span className={"btn"} onClick={() => handleChangeTimbre(timbre02)}> 2</span>
                                    <span className={"btn"} onClick={() => handleChangeTimbre(timbre03)}> 3</span>
                                    <span className={"btn"} onClick={() => handleChangeTimbre(timbre04)}> 4</span>
                                    <span className={"btn"} onClick={() => handleChangeTimbre(timbre05)}> t</span>
                                    <span className={"btn"} onClick={() => handleChangeTimbre(timbre06)}> t</span>
                                    <span className={"btn"} onClick={() => handleChangeTimbre()}> t</span>
                                </section>
                            </div>
                        </li>

                    </ul>
                </div>
            </div>


        </>

    )
};

export default DecoListe;