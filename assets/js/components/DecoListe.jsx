import React from 'react';

//Wallpapers
import Bow from "../../img/listes/wallpapers/Bow.png";
import Ice from "../../img/listes/wallpapers/Ice.png";
import Snow from "../../img/listes/wallpapers/Snow.png";
import Stars from "../../img/listes/wallpapers/Stars.png";
import Trees from "../../img/listes/wallpapers/Trees.png";

//Motifs
import rennes from "../../img/listes/motifs/rennes.png";
import santaclaus from "../../img/listes/motifs/santaclaus.png";
import rennes02 from "../../img/listes/motifs/rennes02.png";

//Null
import vide from '../../img/listes/miniature/vide.png'
//Timbres
import timbre01 from "../../img/listes/timbres/timbre01.png";
import timbre02 from "../../img/listes/timbres/timbre02.png";
import timbre03 from "../../img/listes/timbres/timbre03.png";
import timbre04 from "../../img/listes/timbres/timbre04.png";
import timbre05 from "../../img/listes/timbres/timbre05.png";
import timbre06 from "../../img/listes/timbres/timbre06.png";

//Miniature timbres
import timbreMini01 from "../../img/listes/miniature/timbres/timbre01.png";
import timbreMini02 from "../../img/listes/miniature/timbres/timbre02.png";
import timbreMini03 from "../../img/listes/miniature/timbres/timbre03.png";
import timbreMini04 from "../../img/listes/miniature/timbres/timbre04.png";
import timbreMini05 from "../../img/listes/miniature/timbres/timbre05.png";
import timbreMini06 from "../../img/listes/miniature/timbres/timbre06.png";

//Miniature motifs
import rennesMini from "../../img/listes/miniature//motifs/rennes.png";
import santaclausMini from "../../img/listes/miniature//motifs/santaclaus.png";
import rennes02Mini from "../../img/listes/miniature//motifs/rennes02.png";



const DecoListe = ({handleChangeWallpaper, handleChangeBorder, handleChangeMotif, handleChangeTimbre}) => {
    return(
        <>
            <div className="vertical-nav col-2" style={{minWidth: "150px"}}>
                <div className={"container"}>
                    <ul className="nav flex-column">
                        <div>
                            <p>WALLPAPERS</p>
                            <li>
                                <img src={Bow} width={"40px"} onClick={() => handleChangeWallpaper(Bow)}/>
                                <img src={Ice} width={"40px"} onClick={() => handleChangeWallpaper(Ice)}/>
                                <img src={Snow} width={"40px"} onClick={() => handleChangeWallpaper(Snow)}/>
                                <img src={Stars} width={"40px"} onClick={() => handleChangeWallpaper(Stars)}/>
                                <img src={Trees} width={"40px"} onClick={() => handleChangeWallpaper(Trees)}/>
                                <img src={vide} width={"40px"}  onClick={() => handleChangeWallpaper()}/>
                            </li>
                            <p className={"mt-5"}>COLORS</p>
                            <li>
                                <span className={"btn"} style={{backgroundColor: "#F5624D"}} onClick={() => handleChangeBorder("#F5624D")}></span>
                                <span className={"btn"} style={{backgroundColor: "#CC231E"}} onClick={() => handleChangeBorder("#CC231E")}></span>
                                <span className={"btn"} style={{backgroundColor: "#34A65F"}} onClick={() => handleChangeBorder("#34A65F")}></span>
                                <span className={"btn"} style={{backgroundColor: "#0F8A5F"}} onClick={() => handleChangeBorder("#0F8A5F")}></span>
                                <span className={"btn"} style={{backgroundColor: "#235E6F"}} onClick={() => handleChangeBorder("#235E6F")}></span>
                            </li>
                            <p className={"mt-5"}>MOTIFS</p>
                            <li>
                                <span className={"btn"} style={{backgroundImage: `url(${rennesMini})`, height: "40px",width:"40px"}} onClick={() => handleChangeMotif(rennes)}></span>
                                <span className={"btn"} style={{backgroundImage: `url(${santaclausMini})`, height: "40px",width:"40px"}} onClick={() => handleChangeMotif(santaclaus)}></span>
                                <span className={"btn"} style={{backgroundImage: `url(${rennes02Mini})`, height: "40px",width:"40px"}} onClick={() => handleChangeMotif(rennes02)}></span>
                                <span className={"btn"} style={{backgroundImage: `url(${vide})`, height: "40px",width:"40px"}} onClick={() => handleChangeMotif()}></span>
                            </li>
                            <p className={"mt-5"}>TIMBRES</p>
                            <li>
                                <img src={timbreMini01} width={"40px"} onClick={() => handleChangeTimbre(timbre01)}/>
                                <img src={timbreMini02} width={"40px"}onClick={() => handleChangeTimbre(timbre02)}/>
                                <img src={timbreMini03} width={"40px"}onClick={() => handleChangeTimbre(timbre03)}/>
                                <img src={timbreMini04} width={"40px"}onClick={() => handleChangeTimbre(timbre04)}/>
                                <img src={timbreMini05} width={"40px"}onClick={() => handleChangeTimbre(timbre05)}/>
                                <img src={timbreMini06} width={"40px"}onClick={() => handleChangeTimbre(timbre06)}/>
                                <img src={vide} width={"40px"} onClick={() => handleChangeTimbre()}/>
                            </li>
                            </div>
                    </ul>
                </div>
            </div>


        </>

    )
};

export default DecoListe;