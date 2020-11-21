import { API } from '../constants';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const getAllDepartments = async () => {
    const response = await axios.get(`${API}/api/department`);
    const departments = response.data;
    return departments;
}