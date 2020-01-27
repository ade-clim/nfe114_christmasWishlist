import axios from 'axios';

function findAll() {
    return axios
        .get("https://localhost:8000/api/users")
        .then(response => response.data['hydra:member']);
}

function deleteUser(id){
    return axios.delete("https://localhost:8000/api/users/" + id);
}

function find(id){
    return axios
        .get("https://localhost:8000/api/users/" + id)
        .then(response => response.data);
}

function findAllByUserId(id){
    return axios
        .get("https://localhost:8000/api/users/" + id + "/listes")
        .then(response => response.data['hydra:member'])
}

function update(id, user){
    return axios.put("https://localhost:8000/api/users/" + id, user);
}

function create(user){
    return axios.post("https://localhost:8000/api/users", user);
}

export default {
    findAll,
    delete : deleteUser,
    find,
    findAllByUserId,
    update
}