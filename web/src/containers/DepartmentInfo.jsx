import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllDepartments } from '../routes/departmentRoutes';
import Sidebar from '../components/Sidebar';
import Courses from '../components/Courses';
import  './css/DepartmentInfo.css';

class DepartmentInfo extends Component{
    constructor(){
        super();

        this.state = {
            departments: [],
            departmentName: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        const departments = await getAllDepartments();
        this.setState({departments});
    }

    handleChange(e){
        this.setState({departmentName: e.target.value});
    }

    render(){
        const { departments, departmentName } = this.state;
        const { signedIn } = this.props;

        if(!signedIn){
            return <Redirect to = '/'/>
        }

        return(
            <div className='departments'>
                <Sidebar/>

                <div className='dept-container text-center'>
                    <h1 className='mb-3'>Select a Department</h1>

                    <select onChange={this.handleChange} value={departmentName}>
                        <option value=''></option>

                        {departments.map(department =>
                            <option value={department.name} key={department.name}>
                                {department.name}
                            </option>
                        )}
                    </select>
                </div>

                < Courses  department = {departmentName} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({signedIn: state.signedIn});

export default connect(mapStateToProps)(DepartmentInfo);