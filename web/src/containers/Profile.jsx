import React from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ProfileCard from '../components/ProfileCard'
import Sidebar from '../components/Sidebar'
import './css/Profile.css'

function Profile({signedIn}){
    if(!signedIn){
        return <Redirect to='/'/>
    }

    return (
        <div className="Profile">
            <Sidebar />
            <div className="ProfileContent" style={{width: 'calc(100% - 240px)'}}>
                <div className="container h-100 w-100">
                    <div className="row justify-content-center align-items-center h-100 w-100">
                        <div className="col-12">
                            <ProfileCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({signedIn: state.signedIn});

export default connect(mapStateToProps)(Profile);
