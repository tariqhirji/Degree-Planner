import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'; 
import { connect } from 'react-redux';
import { getMe } from '../routes/authRoutes';
import { setUser } from '../store/userActions'; 
import {updateCreds, academia} from "../routes/userRoutes";
import {withAlert} from 'react-alert';
import './css/ProfileCard.css';

class ProfileCard extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            fullName: '',
            email: '',
            yearOfStudy: 0,
            degree: '',
            department: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit1 = this.handleSubmit1.bind(this);
        this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    componentDidMount(){
        const { user } = this.props;

        if(user){
            this.setState({...user});
        }
    }

    componentDidUpdate(prevProps){
        const { user } = this.props;

        if((user && !prevProps.user)){
            this.setState({...user});
        }
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit1(e){
        const {fullName, email} = this.state
        const { user } = this.props;
        e.preventDefault();

        if(!user){
            this.props.history.push('/');
            return;
        }

        const data = {
            fullName,
            email
        };

        const response = await updateCreds(data);
        
        if(response){
            const user = await getMe();
            this.props.dispatch(setUser(user));

            this.props.alert.success(`new name: ${fullName}, new email: ${email}`)
        }else{
            this.props.alert.error("Failed to Update Credentials")
        }
    }

    async handleSubmit2(e){
        const {yearOfStudy, degree, department} = this.state
        const {user} = this.props;
        e.preventDefault();

        if(!user){
            this.props.history.push('/');
            return;
        }

        const data = {
            yearOfStudy,
            degree,
            department
        };

        const result = await academia(data);

        if(result){
            const user = await getMe();
            this.props.dispatch(setUser(user));

            this.props.alert.success(`new year of study: ${yearOfStudy}, new degree: ${degree}, new department: ${department}`)
        }else{
            this.props.alert.error("Failed to update academia infomation")
        }
    }

    render() {
        const { username, fullName, email, yearOfStudy, degree, department } = this.state;
        
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
                                    value={fullName}
                                    name="fullName"
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
                                        placeholder="yearOfStudy of study" 
                                        onChange={this.handleChange}
                                        value={yearOfStudy}
                                        name="yearOfStudy"
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
const mapDispatchToProps = (dispatch) => ({dispatch});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)( withAlert()(ProfileCard)));