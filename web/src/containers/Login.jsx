import React, {Component} from 'react';
import "./css/Login.css"
import {loginUser} from "../routes/authRoutes/"

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toForgotPassword = this.toForgotPassword.bind(this);
        this.toHomePage = this.toHomePage.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const{username, password}= this.state;
        const data = {
            username,
            password
        };
        const res = await loginUser(data);
        const{user, errors} = res;
        if(user === null){
            for(let i=0; i < errors.length; i++){
                if(errors[i].field != null){
                    alert.error(errors[i].message);
                    break;
                }
            }
        } else{
        alert.success("success logging in");
        toHomePage();
        }

    }

    toHomePage(){
        this.props.history.push('/');
    }

    toForgotPassword(){
        this.props.history.push('/forgot_password');
    }

    render(){
        const{username, password} = this.state;
        return(
            <div className='login'>
                <form onSubmit={this.handleSubmit} className="form">
                    <h1 className='login-Title'>LogIn</h1>

                    <div className="form-group">
                        <label htmlFor='username'>Username </label>
                        <input
                            type="text"
                            name = 'username'
                            onChange={this.handleChange}
                            required
                            value={username}
                            className="form-control"
                        />
                    </div>

                    <div className='form-group'>
                        <label htmlFor='password'>Password </label>
                        <input
                            type="text"
                            name='password'
                            onChange={this.handleChange}
                            value={password}
                            required
                            className="form-control"
                        />
                    </div>

                    <p onClick={this.toForgotPassword}>
                        Forgot Password
                    </p>

                    <button className="btn">SUBMIT </button>
                </form>
            </div>
        )
    }
}

export default Login;