import { API } from '../constants';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getCoursesByDepartment = async (dept) => {
    const response = await axios.get(`${API}/api/course/dept/${dept}`);
    const courses = response.data;
    return courses;
}