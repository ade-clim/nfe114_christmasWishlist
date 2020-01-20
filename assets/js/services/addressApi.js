import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/addresses")
        .then(response => response.data['hydra:member'])
}

function deleteAddress(id) {
    return axios.delete("https://localhost:8000/api/addresses/" + id)
}

function find(id){
    return axios
        .get("https://localhost:8000/api/addresses/" + id)
        .then(response => response.data);
}

function update(id, address){
    return axios.put("https://localhost:8000/api/addresses/" + id, address);
}

function create(address){
    return axios.post("https://localhost:8000/api/addresses", address);
}

export default {
    create,
    findAll,
    deleteAddress,
    find,
    update
}