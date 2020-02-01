import axios from 'axios';
import {LISTES_API} from "../config";

function findAll() {
    return axios
        .get(LISTES_API)
        .then(response => response.data['hydra:member'])
}

function deleteListe(id) {
    return axios.delete(LISTES_API + "/" + id)
}




function find(id){
    return axios
        .get(LISTES_API + "/" + id)
        .then(response => response.data)
}


function update(id, liste){
    return axios.put(LISTES_API + "/" + id, {...liste, decoListe: `/api/deco_listes/${liste.decoListe.id}`});
}

function create(liste){
    return axios.post(LISTES_API, {...liste, decoListe: `/api/deco_listes/${liste.decoListe}`});
}

export default {
    findAll,
    delete : deleteListe,
    find,
    update,
    create
}