import React, { Component } from 'react'
import { connect } from 'react-redux';
import './css/ProfileCard.css'
import {updateCreds, academia} from "../routes/userRoutes";


class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.user.username,
            name: this.props.user.fullName,
            email: this.props.user.email,
            year: this.props.user.yearOfStudy,
            degree: this.props.user.degree,
            department: this.props.user.department,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit1(e){
        const {name, email} = this.state
        e.preventDefault();
        const data = {
            name,
            email
        }
        const response = await updateCreds(data);
        if(response){
            alert(`new Name: ${name}, new email: ${email}`)
        }else{
            alert("Failed to Update Credentials")
        }
    }

    async handleSubmit2(e){
        const {year, degree, department} = this.state
        e.preventDefault();

        const data = {
            year,
            degree,
            department
        };
        const result = await academia(data);
        if(result){
        alert(`new year: ${year}, new degree: ${degree}, new department: ${department}`)
        }else{
            alert("Failed to update academia infomation")
        }
    }

    render() {
        const { username, name, email, year, degree, department } = this.state;
        

        return (
            <div className="ProfileCard col-12">
                <div className="card rounded">
                    <div className="card-header text-center">
                        <h1>My Profile</h1>
                    </div>
                    <div className="card-title text-center mt-3 mb-0">
                        <h5 className="text-muted">
                            Here is where you can make changes to your account preferences. <br/>
                            Once you have filled in your desired changes, press submit to confirm the changes.
                        </h5>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-4 my-3">
                                <h4>Username:</h4>
                            </div>
                            <div className="col-8 my-3">
                                <input
                                    className="form-control"
                                    type="text" 
                                    placeholder="username"
                                    value={username} 
                                    disabled
                                />
                            </div>
                        </div>
                        <form onSubmit={this.handleSubmit1}>
                        <div className="row">
                            <div className="col-4 my-3">
                                <h4>Full Name:</h4>
                            </div>
                            <div className="col-8 my-3">
                                <input
                                    className="form-control"
                                    type="text" 
                                    placeholder="Name" 
                                    onChange={this.handleChange}
                                    value={name}
                                    name="name"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4 my-3">
                                <h4>Email:</h4>
                            </div>
                            <div className="col-8 my-3">
                                <input
                                    className="form-control"
                                    type="email" 
                                    placeholder="Email" 
                                    onChange={this.handleChange}
                                    value={email}
                                    name="email"
                                />
                            </div>
                        </div>

                        <div className="row text-center my-3">
                            <div className="col-12">
                                <button className=" btn profileBtn">
                                    Confirm Changes
                                </button>
                            </div>
                        </div>
                        
                        </form>
                        <hr className="mt-4"/>
                        <form onSubmit={this.handleSubmit2}>
                            <div className="row">
                                <div className="col-4 my-3">
                                    <h4>Year of Study:</h4>
                                </div>
                                <div className="col-8 my-3">
                                    <input
                                        className="form-control"
                                        type="number" 
                                        placeholder="Year of study" 
                                        onChange={this.handleChange}
                                        value={year}
                                        name="year"
                                        min = '0'
                                        max = '6'
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 my-3">
                                    <h4>Degree:</h4>
                                </div>
                                <div className="col-8 my-3">
                                    <input
                                        className="form-control"
                                        type="text" 
                                        placeholder="Degree title" 
                                        onChange={this.handleChange}
                                        value={degree}
                                        name="degree"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-4 my-3 ">
                                    <h4>Department:</h4>
                                </div>
                                <div className="col-8 my-3">
                                    <input
                                        className="form-control"
                                        type="text" 
                                        placeholder="Department name" 
                                        onChange={this.handleChange}
                                        value={department}
                                        name="department"
                                    />
                                </div>
                            </div>
                            <div className="row text-center mt-3">
                                <div className="col-12">
                                    <button className=" btn profileBtn">
                                        Confirm Changes
                                    </button>
                                </div>
                            </div>  
                        </form>               
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({user : state.user});
export default connect(mapStateToProps)(ProfileCard);
