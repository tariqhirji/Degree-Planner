import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}, withCredentials: true};

export const forgotPassword = async (data) => {
    const response = await axios.post(`${API}/api/user/forgot_password`, data, config);
    console.log(response);
    const { success } = response.data;
    return success;
}


export const loginUser = async(data) =>{
    const response = await axios.post(`${API}/api/user/login`, data, config);
    return response.data;
}
    

    
