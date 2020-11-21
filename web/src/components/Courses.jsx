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

    async componentDidMount(){
        const { department } = this.props;

        if(department) {
            await this.getCourses();
        } else{ 
            this.setState({courses: [[], [], [], [] ]});
        }
    }

    async componentDidUpdate(prevProps){
        const { department } = this.props;

        if(department !== prevProps.department && department){
            await this.getCourses();
        } 

        else if(department !== prevProps.department && !department){
            this.setState({courses: [[], [], [], [] ]});
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
            <div className='row courses'>
                {courses.map((_, i) => {
                    if(i === 0){
                        return  (<h2 className='col-3'>
                                    First year
                                </h2>)
                    } else if(i === 1){
                        return (<h2 className='col-3'>
                                 Second year
                               </h2>)
                    } else if(i === 2){
                        return (<h2 className='col-3'>
                                 Third year
                               </h2>)
                    } else{
                        return (<h2 className='col-3'>
                                  Fourth year
                               </h2>)
                    }
                })}

               {courses.map(col => 
                    col.length === 0? 
                    (<p className='col-3'>
                        Courses unavailable
                    </p>) :
                    (<CourseColumn 
                        courses = {JSON.stringify(col)}
                    />)
                )}
            </div>
        )
    }
}

export default CoursesList;