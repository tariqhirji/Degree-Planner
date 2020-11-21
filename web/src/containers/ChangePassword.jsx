import React, { Component } from 'react';
import { changePassword } from '../routes/authRoutes';

class ChangePassword extends Component{
    constructor(){
        super();

        this.state = {
            newPassword: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name] : e.target.value});
    }

    async handleSubmit(e){
        e.preventDefault();

        const { token } = this.props.match.params;
        const { newPassword } = this.state;

        const userResponse = await changePassword({token, newPassword});
        const { user} = userResponse;

        if(user){
            this.props.history.push('/');
        }
    }

    render(){
        const { newPassword } = this.state;

        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        name = 'newPassword'
                        type ='password'
                        value = {newPassword}
                        onChange={this.handleChange}
                        required
                    />

                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default ChangePassword;