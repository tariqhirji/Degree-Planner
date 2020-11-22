import Course from '../models/course';

export const filterCourses = async ( dept, year) => {
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

    return result;
}