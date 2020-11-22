import React, {Component} from 'react';
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
            departments: []
        }

        this.handleChange = this.handleChange.bind(this);
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
            departmentName: dept,
            options
        });
    }

    render(){
        const { options, departmentName, departments } = this.state;

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
                </div>
            </div>
        )
    }
};

export default Home;