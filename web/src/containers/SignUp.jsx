import React,{Component} from 'react';
import { register } from '../routes/authRoutes';
import './css/SignUp.css';

class SignUp extends Component{
    constructor(){
        super();

        this.state = {
            username: '',
            email: '',
            password: '',
            confirmpassword: '',
            errors: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }
    async handleSubmit(e){
        e.preventDefault();
        const{ username, email, password, confirmpassword} = this.state;
        
        if(password!==confirmpassword) {
            this.setState({errors: [{
                    field: 'Password',
                    message: 'Passwords do not match'
                }]    
            });

            return;
        }
        
        const userResponse = await register({username, email, password}); 
        const { user } = userResponse;

        if(user){
            this.props.history.push('/');
        } else{
            this.setState({errors: userResponse.errors});
        }
    }

    render(){
        const { username, password, confirmPassword, email, errors} = this.state;

        return(
            <div className = "signUpContainer">
                <form className = "SignUp" onSubmit = {this.handleSubmit}>
                    <h3><em>Sign Up</em></h3>

                    <hr/>
                    
                    <div className = "form-group">
                        <label htmlFor="username">Username</label>
                        <input  
                            onChange = {this.handleChange}
                            type = "text" 
                            className="form-control" 
                            name = "username"  
                            value = {username}
                            required
                        />
                    </div>

                    <div className = "form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            onChange = {this.handleChange} 
                            type = "text" 
                            className="form-control" 
                            name= "email" 
                            value ={email}
                            required
                        />
                    </div>

                    <div className = "form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            onChange = {this.handleChange} 
                            type = "password" 
                            className="form-control" 
                            name = "password" 
                            value = {password}
                            required
                        />
                    </div>

                    <div className = "form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input 
                            onChange = {this.handleChange} 
                            type = "password" 
                            className="form-control" 
                            name= "confirmPassword" 
                            value = {confirmPassword}
                            required
                        />
                    </div>
             
                    <br></br>

                    <button type="submit" className="btn btn-success">
                        Sign Up
                    </button>

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
export default SignUp;