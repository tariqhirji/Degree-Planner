import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};
axios.defaults.withCredentials = true;

export const getAllDepartments = async () => {
    
}

export const getCoursesByDepartment = async () => {

}

export const getCourseById = async (id) => {
    const response = await axios.get(`${API}/api/course/${id}`);
    const course = response.data;
    return course;
}