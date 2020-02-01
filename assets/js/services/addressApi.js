import axios from 'axios';
import {ADDRESS_API} from "../config";

function findAll() {
    return axios
        .get(ADDRESS_API)
        .then(response => response.data['hydra:member'])
}

function deleteAddress(id) {
    return axios.delete(ADDRESS_API + "/" + id)
}

function find(id){
    return axios
        .get(ADDRESS_API + "/" + id)
        .then(response => response.data);
}

function update(id, address){
    return axios.put(ADDRESS_API + "/" + id, address);
}

function create(address){
    return axios.post(ADDRESS_API, address);
}

export default {
    create,
    findAll,
    deleteAddress,
    find,
    update
}