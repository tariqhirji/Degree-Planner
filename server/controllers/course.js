import Course from '../models/course';
import axios from 'axios';

export const getCoursesByDepartment = async (req, res) => {
    const { dept } = req.params;
    const result = [ [], [], [], []];

    const courses = await Course.find({dept});

    courses.forEach(c => {
        for(let i=0;i<c.code.length;i++){
            if(c.code[i] >= '0' && c.code[i] <= '9'){
                const idx = Number(c.code[i] - 1);
                result[idx].push(c);
                break;
            }
        }
    });

    res.json(result);
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

export const getCourseData = async (req,res) => {
    const {id} = req.params;
    const course = await Course.findOne({_id:id});

    res.json(course);
}