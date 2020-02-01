import axios from 'axios';
import {DECOLISTES_API} from "../config";

function findAll() {
    return axios
        .get(DECOLISTES_API)
        .then(response => response.data['hydra:member']);
}

function deleteDecoListe(id){
    return axios.delete(DECOLISTES_API + "/" + id);
}

function find(id){
    return axios
        .get(DECOLISTES_API + "/" + id)
        .then(response => response.data);
}

function update(id, decoListe){
    return axios.put(DECOLISTES_API + "/" + id, {...decoListe, wallpaper: decoListe.wallpaper, border: decoListe.border, motif: decoListe.motif, timbre: decoListe.timbre});
}

function create(decoListe){

    return axios.post(DECOLISTES_API, decoListe);
}

export default {
    findAll,
    delete : deleteDecoListe,
    find,
    update,
    create
}