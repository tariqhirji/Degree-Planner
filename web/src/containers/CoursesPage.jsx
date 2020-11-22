import React, { Component } from 'react';
import Sidebar from '../components/Sidebar';
import {getUserCourses} from '../routes/userRoutes';
import './css/CoursesPage.css';

class CoursesPage extends Component{
    constructor(){
        super();
        this.state ={
            courseList: []
        }
    }

    async componentDidMount(){
       const coursesJSON = await getUserCourses();
       this.setState({courseList: coursesJSON});       
    }


    render(){
        const{courseList} = this.state;
        console.log(courseList);
        return(
            <div className='Courses'>
                <Sidebar/>
                <div className="Courses-Info" >
                    <div className="container h-100 w-100">
                        <div className="row justify-content-center align-items-center text-center h-100 w-100">
                            <div className="col-12">
                                <h1>Your Courses </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default CoursesPage;