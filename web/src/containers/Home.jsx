import React, {Component} from 'react';
import Sidebar from '../components/Sidebar'
import './css/Home.css';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            courses: []
        }
    }

    componentDidMount(){

    }

    render(){
        return (
            <div className="Home">
                <Sidebar />


            </div>
        )
    }
};

export default Home;