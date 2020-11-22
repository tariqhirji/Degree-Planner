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

    const list = courses[idx];
    
    const adjList = {};
    const indegree = {};
    const copy = {};

    for(let i=0;i<list.length;i++){
        //prereqs themselves
        adjList[list[i].code] = [...list[i].preq];

        //num prereqs
        indegree[list[i].code] = list[i].preq.length;
        copy[list[i].code] = list[i].preq.length;
    }

    let result = [];
    let queue = [];

    for(let i=0;i<list.length;i++){
        if(indegree[list[i].code] === 0){
            queue.push(list[i]);
        }
    }

    while(queue.length !== 0){
        let curr = queue.unshift();
        const { code } = curr;
        
        res.add({
            code,
            numPreqs: copy[code]
        });

        for(let i=0;i<adjList[code].length;i++){
            indegree[adjList[code][i]]--;

            if(indegree[adjList[code][i]] === 0){
                //queue.push
            }
        }
    }

    res.json(adjList);
}