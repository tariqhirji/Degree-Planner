import React, {Component} from 'react';
import { forgotPassword } from '../routes/authRoutes';
import './css/ForgotPassword.css'

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
            <div className="container-fluid ForgotPassword p-0">
                <div className="row align-content-center text-center h-100 w-100 no-gutters">
                    <div className="col-12 justify-content-center">
                        <div className="card ForgotPasswordCard mx-auto rounded border border-dark align-items-center">
                            <div className="card-body">
                                <h2 className="card-title my-5">Forgot your password?</h2>
                                <h5 className="card-text my-5">Enter your registered email below and we will<br/> send you a link to reset your password</h5>
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={this.handleChange}
                                            required
                                            placeholder="Email"
                                            className="my-4 form-control"
                                        />
                                        <br/>
                                        <button className="btn submitBtn" type="button">
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            // <div>
            //     {submitted?
            //         (<h1>
            //             If email is registered it has been sent
            //         </h1>) :
            //         (<form onSubmit={this.handleSubmit}>
            //             <input
            //                 name = 'email'
            //                 type='text'
            //                 value={email}
            //                 onChange={this.handleChange}
            //                 required
            //             />
      
            //             <button>
            //                 Submit
            //             </button>
            //         </form>)
            //     }
            // </div>
        )
    }
}

export default ForgotPassword;