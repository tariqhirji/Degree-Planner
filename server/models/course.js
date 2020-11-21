import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
    preq: [String],
    creq: [String],
    dept: String,
    code: String,
    name: String,
    cred: Number,
    desc: String,
    link: String,
    prer: String,
    crer: String
});

const Course = mongoose.model('course', CourseSchema);
export default Course;