import axios from 'axios';
import {USERS_API} from "../config";

function register(user){
    return axios.post(USERS_API, {...user, address: `/api/addresses/${user.address}`});
}

export default {
    register
}