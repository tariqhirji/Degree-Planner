import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { getAllDepartments } from '../routes/departmentRoutes';
import { getCoursePathData } from '../routes/courseRoutes';
import { initTreeChart } from '../utils/initTreeChart';
import Sidebar from '../components/Sidebar';
import ReactCharts from 'echarts-for-react';
import './css/Home.css';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            options: {},
            departmentName: null,
            departments: [],
            courses: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.toCourse  = this.toCourse.bind(this);
    }

    async componentDidMount(){
        const departments = await getAllDepartments();
        this.setState({departments});
    }

    async handleChange(e){        
        const courses = await getCoursePathData({dept: e.target.value});

        const dept = (courses.length > 0) ? courses[0].course.dept: '';
        const options = initTreeChart(courses, dept);

        this.setState({
            courses,
            departmentName: dept,
            options
        });
    }

    toCourse(id){
        this.props.history.push(`/course/${id}`);
    }

    render(){
        const { options, departmentName, departments, courses } = this.state;

        const style = {
            height: '100%',
            width: '100%'
        }

        return (
            <div className="Home">
                < Sidebar />

                <ReactCharts
                    option = {options}
                    style = {style}
                />

                <div className='home-container text-center'>
                    <h1 className='mb-3'>Select a Department</h1>

                    <select onChange={this.handleChange} value={departmentName}>
                        <option value='home'></option>

                        {departments.map(department =>
                            <option value={department.name} key={department.name}>
                                {department.name}
                            </option>
                        )}
                    </select>

                    {courses.map(c => 
                        <div onClick={() => this.toCourse(c.course._id)} className='course'>
                            <p>{c.code}</p>
                            <p>Number of prerequisites: {c.numPreqs}</p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
};

export default withRouter(Home);