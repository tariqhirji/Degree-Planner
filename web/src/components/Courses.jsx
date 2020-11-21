import React, { Component } from 'react';
import { getCoursesByDepartment } from '../routes/courseRoutes';
import CourseColumn from './CourseColumn';
import './css/Courses.css';

class CoursesList extends Component{
    constructor(){
        super();

        this.state = {
            courses: [ [], [], [], [] ]
        };

        this.getCourses = this.getCourses.bind(this);
    }

    componentDidMount(){
        const { department } = this.props;

        if(department) {
            await this.getCourses();
        }
    }

    componentDidUpdate(prevProps){
        const { department } = this.props;

        if(department !== prevProps.department && department){
            await this.getCourses();
        }
    }

    async getCourses(){
        const { department } = this.props;

        const courses = await getCoursesByDepartment(department);

        this.setState({courses});
    }

    render(){
        const { courses } = this.state;

        return(
            <div className='courses-list'>
               {courses.map(col => 
                    col.length === 0? 
                    (<h1>
                        Courses unavailable
                    </h1>) :
                    (<CourseColumn 
                        courses = {JSON.stringify(col)}
                    />)
                )}
            </div>
        )
    }
}

export default CoursesList;