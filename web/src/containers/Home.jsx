import React, {Component} from 'react';
import { getCoursePathData } from '../routes/courseRoutes';
import { initTreeChart } from '../utils/initTreeChart';
import Sidebar from '../components/Sidebar';
import ReactCharts from 'echarts-for-react';
import './css/Home.css';

class Home extends Component {
    constructor(){
        super();

        this.state = {
            options: {}
        }
    }

    async componentDidMount(){
        const courses = await getCoursePathData({dept: 'FNEL'});
    
        const options = initTreeChart(courses, "FNEL");
    
        this.setState({options});
    }

    render(){
        const { options } = this.state;

        const style = {
            height: '90%',
            marginLeft: '240px'
        }

        return (
            <div className="Home">
                < Sidebar />

                <ReactCharts
                    option = {options}
                    style = {style}
                />
            </div>
        )
    }
};

export default Home;