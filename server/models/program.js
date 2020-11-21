import mongoose from 'mongoose';
import course from '../models/course.js'

const ProgramSchema = new mongoose.Schema({
    areaofStudy:{
        type: String,
        trim: true,
    },
    department:{
        type: String,
        trim: true,
    },
    type:{
        type: String,
        trim: true,
    },
    courseList:{
        type: [Course],
        trim: true,
    }
});
const array = [];
const Program = mongoose.model('program', ProgramSchema);
export default Program;