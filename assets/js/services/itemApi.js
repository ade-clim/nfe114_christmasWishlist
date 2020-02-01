import axios from 'axios';
import {ITEMS_API} from "../config";

function findAll() {
    return axios
        .get(ITEMS_API)
        .then(response => response.data['hydra:member']);
}

function deleteUser(id){
    return axios.delete(ITEMS_API + "/" + id);
}

function find(id){
    return axios
        .get(ITEMS_API + "/" + id)
        .then(response => response.data);
}

function update(id, item){
    return axios.put(ITEMS_API + "/" + id, item);
}

function create(item){
    return axios.post(ITEMS_API, item);
}

export default {
    findAll,
    delete : deleteUser,
    find,
    update
}