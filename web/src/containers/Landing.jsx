import React from 'react'
import LandingCarousel from '../components/LandingCarousel'
import LandingLogo2 from '../img/landing2.svg'
import './css/Landing.css'

export default function Landing() {
    return (
        <div className="container-fluid Landing p-0">
            <div className="row LandingRow justify-content-center align-content-center text-center no-gutters">

                <div className="col-7 h-100">
                    <LandingCarousel />
                </div>

                <div className="col-5 align-self-center">
                    <div className="LandingContent">
                        <img src={LandingLogo2} alt="Find your way" className="LandingSVG"/>
                        <h4>Discover all of your possible degree paths, <br/>Sign up for free today! </h4>
                    </div>
                </div>


            </div>
        </div>
    )
}