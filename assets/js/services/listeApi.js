import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/listes")
        .then(response => response.data['hydra:member'])
}

function deleteListe(id) {
    return axios.delete("https://localhost:8000/api/listes/" + id)
}


function find(id){
    return axios
        .get("https://localhost:8000/api/listes/" + id)
        .then(response => response.data);
}


function update(id, liste){
    return axios.put("https://localhost:8000/api/listes/" + id, liste);
}

function create(liste){
    return axios.post("https://localhost:8000/api/listes", {...liste, decoListe: `/api/deco_listes/${liste.decoListe}`});
}

export default {
    findAll,
    delete : deleteListe,
    find,
    update,
    create
}