import React, { Component } from 'react';
import { changePassword } from '../routes/authRoutes';
import './css/ChangePassword.css'
class ChangePassword extends Component{
    constructor(){
        super();

        this.state = {
            newPassword: '',
            oldPassword:'',
            confirmPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const { token } = this.props.match.params;
        const { newPassword,confirmPassword } = this.state;
        if(newPassword!==confirmPassword){
            //change alert to something else later
            alert("Passwords do not match!");
            return;
        }
        const userResponse = await changePassword({token, newPassword});
        const { user} = userResponse;

        if(user){
            this.props.history.push('/');
        }
    }

    render(){
        const { newPassword,oldPassword,confirmPassword} = this.state;

        return(
            <div className="changePasswordContainer">
                <form className = "changePassword"onSubmit={this.handleSubmit}>
                <h3>Change Password</h3>
                <br></br>
                <div className = "form-group">
                        <label htmlFor="oldPassword">Old Password</label>
                        <input
                            className="form-control"
                            name = 'oldPassword'
                            type ='password'
                            value = {oldPassword}
                            onChange={this.handleChange}
                            required
                        />
                </div>
                <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            className="form-control"
                            name = 'newPassword'
                            type ='password'
                            value = {newPassword}
                            onChange={this.handleChange}
                            required
                        />
                </div>
                <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            className="form-control"
                            name = 'confirmPassword'
                            type ='password'
                            value = {confirmPassword}
                            onChange={this.handleChange}
                            required
                        />
                </div>

                    <button className="btn btn-submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default ChangePassword;