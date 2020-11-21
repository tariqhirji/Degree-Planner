import React, { Component } from 'react'
import './css/ProfileCard.css'

class ProfileCard extends Component {

    render() {
        return (
            <div className="ProfileCard">
                <div className="card">
                    <div className="card-header">
                        <h1>My Profile</h1>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 mb-4">
                                <h1>First, Last</h1>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileCard;
