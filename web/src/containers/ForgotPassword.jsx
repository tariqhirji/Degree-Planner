import React, {Component} from 'react';
import { forgotPassword } from '../routes/authRoutes';

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
            <div>
                {submitted?
                    (<h1>
                        If email is registered it has been sent
                    </h1>) :
                    (<form onSubmit={this.handleSubmit}>
                        <input
                            name = 'email'
                            type='text'
                            value={email}
                            onChange={this.handleChange}
                            required
                        />
      
                        <button>
                            Submit
                        </button>
                    </form>)
                }
            </div>
        )
    }
}

export default ForgotPassword;