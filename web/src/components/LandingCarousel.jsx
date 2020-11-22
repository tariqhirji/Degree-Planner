import React from 'react'
import tree from '../img/tree.jpg';
import dept from '../img/dept.jpg';
import course from '../img/course.jpg';
import details from '../img/details.jpg';

import './css/LandingCarousel.css'


export default function LandingCarousel() {
    return (
        <div className="LandingCarousel">
            <div id="carouselCaptions" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselCaptions" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselCaptions" data-slide-to="2"></li>
                    <li data-target="#carouselCaptions" data-slide-to="3"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={tree} className="d-block w-100" alt="carousel 1"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Visualize your degree!</h5>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={dept} className="d-block w-100" alt="carousel 2"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Explore courses from any department</h5>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={course} className="d-block w-100" alt="carousel 3"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Manage your courses and plan ahead</h5>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={details} className="d-block w-100" alt="carousel 4"/>
                        <div className="carousel-caption d-none d-md-block">
                            <h5>Navigate through courses and prerequisites</h5>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselCaptions" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>

                    <a className="carousel-control-next" href="#carouselCaptions" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
