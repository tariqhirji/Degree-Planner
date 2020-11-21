import React from 'react'
import stock1 from '../img/stock1.jpg'
import stock2 from '../img/stock2.jpeg'
import stock3 from '../img/stock3.jpg'
import './css/LandingCarousel.css'


export default function LandingCarousel() {
    return (
        <div className="LandingCarousel">
            <div id="carouselCaptions" class="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselCaptions" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselCaptions" data-slide-to="1"></li>
                    <li data-target="#carouselCaptions" data-slide-to="2"></li>
                </ol>

                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src={stock1} class="d-block w-100" alt="carousel 1"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>First slide label</h5>
                            <p>Lorem ipsum blah blah blah blah</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={stock2} class="d-block w-100" alt="carousel 2"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum blah blah blah blah</p>
                        </div>
                    </div>

                    <div className="carousel-item">
                        <img src={stock3} class="d-block w-100" alt="carousel 3"/>
                        <div class="carousel-caption d-none d-md-block">
                            <h5>Third slide label</h5>
                            <p>Lorem ipsum blah blah blah blah</p>
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
