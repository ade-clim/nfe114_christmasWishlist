import React,{useEffect, useState} from 'react';
import userApi from "../services/userApi";
import {Link} from "react-router-dom";
import santaUp from '../../img/santa/santa_up.png';

const ReservationGift = ({match, history}) => {
    const {id} = match.params;
    const idUrl = parseInt(id, 10);


    const [listeItems, setListeItems] = useState([]);
    const handleFetchListeItemsByUSer = async() => {
        try{
            const data = await userApi.findAllListeItemByUser(idUrl);
            setListeItems(data);
        }catch(error){
            console.log(error.response);
        }
    };


    useEffect(() => {
        handleFetchListeItemsByUSer();
    },[]);

    return(
        <>
            <div className={"container homecontainer"}>
                {listeItems.length !== 0 &&
                <table className={"table table-hover"}>
                    <thead>
                    <tr>
                        <th>Titre listes</th>
                        <th>Description listes</th>
                        <th>Crée par</th>
                        <th>Cadeaux reserver</th>
                    </tr>
                    </thead>
                    <tbody>
                    {listeItems.map(item => <tr key={item.id}>
                        <td>{item.liste.title}</td>
                        <td>{item.liste.description}</td>
                        <td>{item.liste.user.firstName} {item.liste.user.lastName}</td>
                        <td>{item.item.title}</td>
                        <td><Link to={"/listes/"+item.liste.user.id}><button className={"btn btn-sm text-white button_liste"}>voir</button></Link></td>
                    </tr>)}

                    </tbody>c
                </table> ||
                        <div className={"reservation_fond"} >
                            <div className={"text-center"}>
                                <p style={{fontSize: "1.2em"}}>Vous n'avez pas encore réservé de cadeaux</p>
                                <Link to={"/listes/searchlistes"}><button className={"btn button_liste text-white mt-2"}>Rechercher une liste</button></Link>
                            </div>
                            <div className={"reservation_santa_up"}>
                                <img src={santaUp}/>
                            </div>
                        </div>
                }


            </div>
        </>
    )
};


export default ReservationGift;