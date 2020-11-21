import React from 'react';
import { Link } from 'react-router-dom';
import './css/DeadPage.css';

function DeadPage(props){
    const navigateBack = (e) => {
        e.preventDefault();
        props.history.goBack();
    }

    return(
        <div className='dead-page text-center'>
            <h1 className='mt-5'>404</h1>

            <p className='mt-3'>
                The Page You're Looking For Does Not Exist
            </p>

            <i className ='fas fa-unlink mt-2'/>

            <ul className='mt-5'>
                <Link to='/'>
                    <li>Home</li>
                </Link>

                <li>|</li>

                <Link to='/' onClick={navigateBack}>
                    <li>Back</li>
                </Link>
            </ul>            
        </div>
    )
}

export default DeadPage;