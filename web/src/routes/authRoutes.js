import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}, withCredentials: true};

export const forgotPassword = async (data) => {
    const response = await axios.post(`${API}/api/user/forgot_password`, data, config);
    const { success } = response.data;
    return success;
}

export const changePassword = async (data) => {
    const response = await axios.post(`${API}/api/user/change_password`, data, config);
    const userResponse = response.data;
    return userResponse;
}

export const loginUser = async (data) => {
    const response = await axios.post(`${API}/api/user/login`, data, config);
    const userResponse = response.data;
    return userResponse;
}