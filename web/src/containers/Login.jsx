import React, {Component} from 'react';
import { login } from "../routes/authRoutes";
import "./css/Login.css"

class Login extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            password: '',
            errors: []

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.toForgotPassword = this.toForgotPassword.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        
        const { username, password } = this.state;
        
        const userResponse = await login({username, password});
        const{ user } = userResponse;

        if(user){
            this.props.history.push('/');
        } else{
            this.setState({errors: userResponse.errors});
        }
    }

    toForgotPassword(){
        this.props.history.push('/forgot_password');
    }

    render(){
        const{ username, password, errors } = this.state;

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

                    <button className="btn">SUBMIT</button>

                    <div style={{color: 'red'}}>
                        {errors.map(err => <p>
                            {`${err.field} error: ${err.message}`}
                        </p>)}
                    </div>
                </form>
            </div>
        )
    }
}

export default Login;