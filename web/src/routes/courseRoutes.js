import { API } from '../constants';
import axios from 'axios';

axios.defaults.withCredentials = true;
const config = {headers: {'content-type': 'application/json'}};

export const getCourseById = async (id) => {
    const response = await axios.get(`${API}/api/course/${id}`);
    const course = response.data;
    return course;
}

export const getCourseByName = async (name) => {
    const response = await axios.get(`${API}/api/course/name/${name}`);
    const course = response.data;
    return course;
}

export const getCoursesByDepartment = async (dept) => {
    const response = await axios.get(`${API}/api/course/dept/${dept}`);
    const courses = response.data;
    return courses;
}

export const getCoursePathData = async (data) => {
    const response = await axios.post(`${API}/api/course/order`, data, config);
    const courses = response.data;
    return courses;
}