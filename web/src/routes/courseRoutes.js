import { API } from '../constants';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getCourseById = async (id) => {
    const response = await axios.get(`${API}/api/course/${id}`);
    const course = response.data;
    return course;
}

export const getCoursesByDepartment = async (dept) => {
    const response = await axios.get(`${API}/api/course/dept/${dept}`);
    const courses = response.data;
    return courses;
}