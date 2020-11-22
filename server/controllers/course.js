import Course from '../models/course';
import { filterCourses } from '../utils/filterCourses';
import axios from 'axios';

export const getCoursesByDepartment = async (req, res) => {
    const { dept } = req.params;
    const courses = await filterCourses(dept);

    res.json(courses);
}

export const migrateApiData = async (req, res) => {
    const response = await axios.get('https://ubcexplorer.io/getAllCourses');
    const data = response.data;

    data.forEach(async c => {
        const preq = c.preq.filter(s => {
            const firstWord = s.split(" ")[0];
            return firstWord.length === 3 || firstWord.length === 4;
        });

        const creq = c.creq.filter(s => {
            const firstWord = s.split(" ")[0];
            return firstWord.length === 3 || firstWord.length === 4;
        });

        const newCourse = new Course({
            preq: preq,
            creq: creq,
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

export const getCourseByName  = async (req, res) => {
    const { name } = req.params;
    const course = await Course.findOne({name});
    res.json(course);
}

export const orderCourses = async ( req, res) => {
    const { dept, year } = req.body;
    
    const courses = await filterCourses(dept, year);
    let idx = (year < 4) ? year - 1: 3;

    const prev = idx === 0? [] : courses[idx - 1];
    const current = courses[idx];

    const prereqs = [];
    prev.forEach(p => {
        const { preq } = p; 

        for(let i=0;i<preq.length;i++){
            if(preq[i].split(" ")[0] === p.code.split(" ")[0] && Number(p.code.split(" ")[1][0]) === year - 1){
                prereqs.push([p.code , preq[i]]);
            }
        }
    });
    current.forEach(c => {
        const { preq } = c; 

        for(let i=0;i<preq.length;i++){
            if(preq[i].split(" ")[0] === c.code.split(" ")[0]){
                prereqs.push([c.code , preq[i]]);
            }
        }
    });

    const indegree = {};
    const orgDegree = {};

    prev.forEach(p => {
        indegree[p.code] = 0;
        orgDegree[p.code] = 0;
    }); 
    current.forEach(c => {
        indegree[c.code] = 0;
        orgDegree[c.code] =0;
    });

    for(let i=0;i<prereqs.length;i++){
        if(indegree[prereqs[i][0]] === 0){
            indegree[prereqs[i][0]]++;       
            orgDegree[prereqs[i][0]]++;
        }
    }

    let result = [];
    let queue = [];
    const courseMap = {};
    
    prev.forEach(p => {
        if(indegree[p.code] === 0){
            queue.push(p.code);
        }

        courseMap[p.code] = p;
    }); 
    current.forEach(c => {
        if(indegree[c.code] === 0){
            queue.push(c.code);
        }

        courseMap[c.code] = c;
    });

    while(queue.length !== 0){
        let code = queue.shift();

        result.push({code, course: courseMap[code], numPreqs: orgDegree[code]});

        for(let i=0;i<prereqs.length;i++){
            if(prereqs[i][1] === code){
                indegree[prereqs[i][0]]--;

                if(indegree[prereqs[i][0]] === 0){
                    queue.push(prereqs[i][0]);
                }
            }
        }
    }

    res.json(result);
}