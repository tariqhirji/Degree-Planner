import mongoose from 'mongoose';

const DepartmentSchema  = new mongoose.Schema({
    name: String
});

const Department = mongoose.model('department', DepartmentSchema);
export default Department;