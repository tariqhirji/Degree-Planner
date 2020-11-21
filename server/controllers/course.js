import Course from '../models/course';
import axios from 'axios';

export const getCoursesByDepartment = (req, res) => {
    
}

export const migrateApiData = async (req, res) => {
    const response = await axios.get('https://ubcexplorer.io/getAllCourses');
    const data = response.data;

    data.forEach(async c => {
        const newCourse = new Course({
            preq: c.preq,
            creq: c.creq,
            dept: c.dept,
            code: c.code,
            name: c.code,
            cred: c.cred,
            desc: c.desc,
            prer: c.prer,
            crer: c.crer,
            link: c.link
        });

        await newCourse.save();
    });

    res.json({msg: 'Finished'});
}