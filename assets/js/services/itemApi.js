import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/items")
        .then(response => response.data['hydra:member']);
}

function deleteUser(id){
    return axios.delete("https://localhost:8000/api/items/" + id);
}

function find(id){
    return axios
        .get("https://localhost:8000/api/items/" + id)
        .then(response => response.data);
}

function update(id, item){
    return axios.put("https://localhost:8000/api/items/" + id, item);
}

function create(item){
    return axios.post("https://localhost:8000/api/items", item);
}

export default {
    findAll,
    delete : deleteUser,
    find,
    update
}