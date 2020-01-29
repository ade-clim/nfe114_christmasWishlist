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

function deleteUserItem(id, listeItem){
    return axios.put("https://localhost:8000/api/liste_items/" + id, {...listeItem, item: `/api/items/${listeItem.item.id}`, userItem: null});
}


function create(listeItem){
    return axios.post("https://localhost:8000/api/liste_items", {...listeItem, liste: `/api/listes/${listeItem.liste.id}`, item: `/api/items/${listeItem.item.id}`});
}

export default {
    findAll,
    deleteListeItem,
    deleteUserItem,
    find,
    update,
    create
}