import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../store/userActions';
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
        const{ username, email, password, confirmPassword} = this.state;
        
        if(password !== confirmPassword) {
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
            const { dispatch, history } = this.props;

            dispatch(setUser(user));

            history.push('/');
        } else{
            this.setState({errors: userResponse.errors});
        }
    }

    render(){
        const { username, password, confirmPassword, email, errors} = this.state;
        const { signedIn } = this.props;

        if(signedIn){
            return <Redirect to = '/'/>
        }

        return(
            <div className = "signUpContainer">
                <form className = "SignUp text-center" onSubmit = {this.handleSubmit}>
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

const mapStateToProps = (state) => ({signedIn : state.signedIn});
const mapDispatchToProps = (dispatch) => ({dispatch});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);