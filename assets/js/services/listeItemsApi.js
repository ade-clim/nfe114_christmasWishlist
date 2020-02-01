import axios from 'axios';
import {LISTEITEMS_API} from "../config";

function findAll() {
    return axios
        .get("https://localhost:8000/api/liste_items")
        .then(response => response.data['hydra:member'])
}

function deleteListeItem(id) {
    return axios.delete(LISTEITEMS_API + "/" + id)
}


function find(id){
    return axios
        .get(LISTEITEMS_API + "/" + id)
        .then(response => response.data);
}


function update(id, listeItem){
    return axios.put(LISTEITEMS_API + "/" + id, {...listeItem, item: `/api/items/${listeItem.item.id}`, userItem: `/api/users/${listeItem.userItem.id}`});
}

function deleteUserItem(id, listeItem){
    return axios.put(LISTEITEMS_API + "/" + id, {...listeItem, item: `/api/items/${listeItem.item.id}`, userItem: null});
}


function create(listeItem){
    return axios.post(LISTEITEMS_API, {...listeItem, liste: `/api/listes/${listeItem.liste}`, item: `/api/items/${listeItem.item}`});
}

function createListeEditPage(listeItem){
    return axios.post(LISTEITEMS_API, {...listeItem, liste: `/api/listes/${listeItem.liste.id}`, item: `/api/items/${listeItem.item.id}`});
}

export default {
    findAll,
    deleteListeItem,
    deleteUserItem,
    find,
    createListeEditPage,
    update,
    create
}