import React, { Component } from 'react';
import './css/UserAcademicForm.css'
import {academia} from '../routes/userRoutes';

class UserAcademicForm extends Component{
    constructor(){
        super();
        this.state = {
            university: '',
            year: Number,
            degree: '',
            dept: '',
            coursesTaken: []
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const{university, year, degree, dept, coursesTaken}= this.state;
        const data = {
            university: university,
            yearOfStudy: year,
            degree: degree,
            department: dept,
            coursesTaken: coursesTaken
        };
        const response = await academia(data);
        if(!response){
            alert("Error updating Academic Infomation!");
        }else{
            alert("Successfully updated Academic Infomation");
        }
    }

    toChangePassword(){
        this.props.history.push('/change_password/:token')
    }

    render(){
        const{university, year, degree, dept, coursesTaken} = this.state;
        return(
            <div className='academics'>
                <form onSubmit={this.handleSubmit} className='academics-form'>
                    <h2>Your Academics </h2>
                    <label className='university'>University </label>
                    <input
                        type='text'
                        name='university'
                        value={university}
                        onChange={this.handleChange}
                        required
                        className='input'
                    />

                    <label className='year'>Year of Study </label>
                    <input
                    type = 'number'
                    name='year'
                    value={year}
                    onChange={this.handleChange}
                    required
                    className='input'
                    />

                    <label className='degree'>Degree </label>
                    <input
                        type='text'
                        name='degree'
                        value={degree}
                        required
                        onChange={this.handleChange}
                        className='input'
                        />

                    <label className='dept'>Department </label>
                    <input
                        type='text'
                        name='dept'
                        value={dept}
                        onChange={this.handleChange}
                        className='input'
                        />

                    <label className='coursesTaken'>Courses Taken </label>
                    <input
                        type='text'
                        name='coursesTaken'
                        value={coursesTaken}
                        onChange={this.handleChange}
                        className='input'
                        />

                        <button className="btn-block">Submit </button>
                </form>

                <div className='change-password'>
                    <button className='my-auto' onSubmit={this.toChangePassword}>Change Password </button>
                </div>
            </div>
        )
    }
}
export default UserAcademicForm;