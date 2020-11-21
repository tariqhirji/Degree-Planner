import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import './css/Requisites.css';

class Requisites extends Component{
    constructor(){
        super();
        this.state = {reqs: []}
    }

    componentDidMount(){
        const { list } = this.props;

        const reqs = list.map(s =>
            JSON.parse(s)
        );

        this.setState({reqs});
    }

    componentDidUpdate(prevProps){
        if(this.props.list.toString() !== prevProps.list.toString()){
            const { list } = this.props;
    
            const reqs = list.map(s =>
                JSON.parse(s)
            );
    
            this.setState({reqs});
        }
    }

    render(){
        const { reqs } = this.state; 
    
        const handleClick = (id) => {
            this.props.history.push(`/course/${id}`);
        }

        return(
            <div className='reqs'>
                {this.props.type==="preq"?
                    <p>Prerequisites: &nbsp;
                        {reqs.map((r, i) => (
                            i === reqs.length - 1?
                            (<span key={i} onClick={() => handleClick(r._id)}>
                                {r.name}
                            </span>) : 
                            <span key={i} onClick={() => handleClick(r._id)}>
                                {r.name + ','}
                            </span>
                        ))}
                    </p> : 
                    <p>Antirequisites: 
                        {reqs.map((r, i) => (
                            i === reqs.length - 1?
                            (<span key={i} onClick={() => handleClick(r._id)}>
                                {r.name}
                            </span>) : 
                            <span key={i} onClick={() => handleClick(r._id)}>
                                {r.name + ', '}
                            </span>
                        ))}    
                    </p>}
            </div>
        )
    }
}

export default withRouter(Requisites);