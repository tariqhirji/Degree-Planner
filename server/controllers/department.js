import Department from '../models/department';
import axios from 'axios';

export const getAllDepartments = async (req, res) => {
    const departments = await Department.find({});

    departments.sort(function (a, b) {
        if (a.name > b.name) return 1;
        if (a.name < b.name) return -1;
        return 0;
    });

    res.json(departments);
}

export const generateDepartments = async (req, res) => {
    const map = {};

    const response = await axios.get('https://ubcexplorer.io/getAllCourses');
    const data = response.data;

    data.forEach(c => {
        map[c.dept] = true;
    });

    Object.keys(map).forEach(async d =>{
        const newDepartment = new Department({
            name: d
        });

        await newDepartment.save();
    });

    res.json({msg: 'Success'});
}