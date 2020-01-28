import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/liste_items")
        .then(response => response.data['hydra:member'])
}

function deleteListeItem(id) {
    return axios.delete("https://localhost:8000/api/liste_items/" + id)
}


function find(id){
    return axios
        .get("https://localhost:8000/api/liste_items/" + id)
        .then(response => response.data);
}


function update(id, listeItem){
    return axios.put("https://localhost:8000/api/liste_items/" + id, {...listeItem, item: `/api/items/${listeItem.item.id}`, userItem: `/api/users/${listeItem.userItem.id}`});
}

function create(listeItem){
    return axios.post("https://localhost:8000/api/liste_items", {...listeItem, liste: `/api/listes/${listeItem.liste}`, item: `/api/items/${listeItem.item}`});
}

export default {
    findAll,
    delete : deleteListeItem,
    find,
    update,
    create
}