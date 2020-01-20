import axios from 'axios';

function register(user){
    return axios.post("https://localhost:8000/api/users", {...user, address: `/api/addresses/${user.address}`});
}

export default {
    register
}