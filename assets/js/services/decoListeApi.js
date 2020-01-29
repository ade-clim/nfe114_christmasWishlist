import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/deco_listes")
        .then(response => response.data['hydra:member']);
}

function deleteDecoListe(id){
    return axios.delete("https://localhost:8000/api/deco_listes/" + id);
}

function find(id){
    return axios
        .get("https://localhost:8000/api/deco_listes/" + id)
        .then(response => response.data);
}

function update(id, decoListe){
    return axios.put("https://localhost:8000/api/deco_listes/" + id, {...decoListe, wallpaper: decoListe.wallpaper, border: decoListe.border, motif: decoListe.motif, timbre: decoListe.timbre});
}

function create(decoListe){

    return axios.post("https://localhost:8000/api/deco_listes", decoListe);
}

export default {
    findAll,
    delete : deleteDecoListe,
    find,
    update,
    create
}