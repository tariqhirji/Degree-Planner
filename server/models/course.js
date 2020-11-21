import mongoose from 'mongoose';
const schema = mongoose.Schema;
const courseSchema = new schema({
    name: String,
    number: Number,
    subjectCode: String,
    preReq: [Course],
    antiReq: [Course],
    weight: Number,
    category: String


});

const Course = mongoose.model('course',coursesSchema);

export default Course;