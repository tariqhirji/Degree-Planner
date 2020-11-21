import React, {Component} from 'react';
import "./css/Login.css"

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
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
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

                 <button className="btn">SUBMIT </button>


                </form>
                
                <p onClick={this.toForgotPassword}>
                    Forgot Password
                </p>
            </div>
        )
    }
}

export default Login;