import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};
axios.defaults.withCredentials = true;

export const academia = async(data) => {
    const response = await axios.post(`${API}/api/user/academia`, data, config);
    const {success} = response.data;
    return success;
}

export const updateCreds = async(data) => {
    const response = await axios.post(`${API}/api/user/updateCredentials`, data, config);
    const {success} = response.data;
    return success;
}

export const addCourse = async(data) =>{
    const response = await axios.post(`${API}/api/user/addCourse`, data, config);
    const {success} = response.data;
    return success;
}

export const removeCourse = async(data) =>{
    const{id} = data;
    const response = await axios.delete(`${API}/api/user/deleteCourse/${id}`);
    const {success} = response.data;
    return success;
}

export const checkUserCourse = async(id) =>{
    const response = await axios.get(`${API}/api/user/checkUserCourses/${id}`);
    const {exists} = response.data;
    return exists;
}
