import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};
axios.defaults.withCredentials = true;

export const academia = async(data) => {
    const response = await axios.post(`${API}/api/user/academia`, data, config);
    const {success} = response.data;
    return success;
}
