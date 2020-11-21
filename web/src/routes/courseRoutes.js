import { API } from '../constants';
import axios from 'axios';

const config = {headers: {'content-type': 'application/json'}};
axios.defaults.withCredentials = true;

export const getCoursesByDepartment = async () => {

}