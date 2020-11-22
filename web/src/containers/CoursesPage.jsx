import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import {getUserCourses,removeCourse} from '../routes/userRoutes';
import CourseCard from '../components/CourseCard';
import './css/CoursesPage.css';

class CoursesPage extends Component{
    constructor(){
        super();
        this.state ={
            courseList: []
        }

        this.handleRemove = this.handleRemove.bind(this);
    }

    async componentDidMount(){
       const coursesJSON = await getUserCourses();
       this.setState({courseList: coursesJSON});       
    }

    async handleRemove(id){
        await removeCourse({id});
        const coursesJSON = await getUserCourses();
        this.setState({courseList: coursesJSON});   
    }

    render(){
        const{courseList} = this.state;
        const courses = courseList.map( item =>{
        return <li className="list-group-item p-0"> <CourseCard course = {item} handleRemove ={this.handleRemove} /> </li>
        });

        return(
            <div className='Courses'>
                <Sidebar/>
                <div className="Courses-Info" >
                <div className="container h-100 w-100">
                    <div className="row justify-content-center align-items-center text-center h-100 w-100 mr-0">
                        <div className="col-12">
                            <h1 className="my-4">Your Courses </h1>
                            <ul className="list-group mt-2 mb-5">
                                {courses}
                            </ul>
                        </div>
                    </div>
                </div>

                
            </div>
            </div>
        )
    }
}
export default CoursesPage;