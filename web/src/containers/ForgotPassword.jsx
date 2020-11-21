import React, {Component} from 'react';
import { forgotPassword } from '../routes/authRoutes';
import './css/ForgotPassword.css';
class ForgotPassword extends Component{
    constructor(){
        super();

        this.state = {
            email: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();
        const { email } = this.state;
     
        await forgotPassword({email});

        this.setState({submitted: true});
    }

    render(){
        const { email, submitted } = this.state;

        return(
            <div className="forgotPassword">
                <div>
                    <div>
                    {submitted?
                    (<h1>
                        If email is registered it has been sent
                    </h1>) :
                    (
                    <form className="emailForm" onSubmit={this.handleSubmit}>
                        <h3>Forgot Password ?</h3>
                        <div className = "form-group">
                        <input
                            name = 'email'
                            type='text'
                            value={email}
                            onChange={this.handleChange}
                            placeholder = "Email"
                            required
                        />

                        </div>

      
                        <button className="btn btn-submit">
                            Reset Password
                        </button>
                    </form>)
                }
                    </div>
                
                </div>
                
            </div>
        )
    }
}

export default ForgotPassword;