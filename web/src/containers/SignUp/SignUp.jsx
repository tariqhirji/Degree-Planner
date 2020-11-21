import React,{Component} from 'react';
import './SignUp.css';
class SignUp extends Component{
    constructor(){
        super();
        this.state = {};

    }

    render(){
        return(
            <div className = "signUpContainer">
                <form className = "SignUp">
                    <h3><em>Sign Up</em></h3>
                    <hr></hr>
                    <div className = "form-group">
                        <label for="username">UserName</label>
                        <input type = "text" className="form-control" id = "username" required></input>
                    </div>
                    <div className = "form-group">
                        <label for="email">Email</label>
                        <input type = "text" className="form-control" id = "email" required></input>
                    </div>
                    <div className = "form-group">
                        <label for="username">Password</label>
                        <input type = "text" className="form-control" id = "password" required></input>
                    </div>
                    <div className = "form-group">
                        <label for="username">Confirm Password</label>
                        <input type = "text" className="form-control" id = "confirmpassword" required></input>
                    </div>

                    <br></br>
                    <button type="submit" className="btn btn-success">Sign Up</button>
                </form>
            </div>
        )
    }
}
export default SignUp;