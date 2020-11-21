import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            trim: true
        },
        email: {
            type: String,
            trim: true
        },
        password: {
            type: String
        },

        university: {
            type: String,
        },

        degree:{
            type: String
        },
        coursesTaken:{
            type: []
        },
        yearOfStudy:{
            type: Number
        },
        department:{
            type: []
        }

    },
    {timestamps: true}
);

const User = mongoose.model('user', UserSchema);
export default User;