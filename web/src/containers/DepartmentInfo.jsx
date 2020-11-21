import React, {Component} from 'react';
import { getAllDepartments } from '../routes/departmentRoutes';

class DepartmentInfo extends Component{
    constructor(){
        super();

        this.state = {
            departments: [],
            departmentId: null
        }

        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount(){
        const departments = await getAllDepartments();
        this.setState({departments});
    }

    handleChange(e){
        this.setState({departmentId: e.target.value});
    }

    render(){
        const { departments, departmentId } = this.state;

        return(
            <div>
                <select onChange={this.handleChange} value={departmentId}>
                    <option value=''></option>

                    {departments.map(department =>
                        <option value={department._id} key={department._id}>
                            {department.name}
                        </option>
                    )}
                </select>
            </div>
        )
    }
}

export default DepartmentInfo;