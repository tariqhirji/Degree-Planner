import React,{Component} from 'react';
import { signup } from '../../routes/authRoutes';
import './SignUp.css';
class SignUp extends Component{
    constructor(){
        super();
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }
    async handleSubmit(e){
        e.preventDefault();
        const{username,email,password,confirmpassword} = this.state;
        if(password!==confirmpassword) {
            alert('passwords do not match!');
            return;
        }
        const res = await signup({username,email,password});
        if(res === null) return;
        this.props.history.push('/');
    }

    render(){
        return(
            <div className = "signUpContainer">
                <form className = "SignUp" onSubmit = {this.handleSubmit}>
                    <h3><em>Sign Up</em></h3>
                    <hr></hr>
                    <div className = "form-group">
                        <label for="username">UserName</label>
                        <input  onChange = {this.handleChange}type = "text" className="form-control" id = "username" name = "username"  required></input>
                    </div>
                    <div className = "form-group">
                        <label for="email">Email</label>
                        <input onChange = {this.handleChange} type = "text" className="form-control" id = "email" name= "email" required></input>
                    </div>
                    <div className = "form-group">
                        <label for="username">Password</label>
                        <input onChange = {this.handleChange} type = "password" className="form-control" id = "password" name = "password" required></input>
                    </div>
                    <div className = "form-group">
                        <label for="username">Confirm Password</label>
                        <input onChange = {this.handleChange} type = "password" className="form-control" id = "confirmpassword" name= "confirmpassword" required></input>
                    </div>

                    <br></br>
                    <button type="submit" className="btn btn-success">Sign Up</button>
                </form>
            </div>
        )
    }
}
export default SignUp;